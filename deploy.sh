#!/bin/bash

# NAA API 部署脚本
# 使用方法: ./deploy.sh [dev|prod]

set -e

ENVIRONMENT=${1:-prod}
PROJECT_ROOT=$(cd "$(dirname "$0")" && pwd)
LOGS_DIR="$PROJECT_ROOT/logs"
UPLOADS_DIR="$PROJECT_ROOT/uploads"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查必要工具
check_requirements() {
    log_info "检查部署环境..."

    if ! command -v pnpm &> /dev/null; then
        log_error "pnpm 未安装，请先安装 pnpm"
        exit 1
    fi

    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装"
        exit 1
    fi

    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 16 ]; then
        log_error "Node.js 版本过低，需要 >= 16.14.1"
        exit 1
    fi

    log_info "环境检查通过"
}

# 创建必要目录
create_directories() {
    log_info "创建必要目录..."
    mkdir -p "$LOGS_DIR"
    mkdir -p "$UPLOADS_DIR"
    chmod 755 "$LOGS_DIR"
    chmod 755 "$UPLOADS_DIR"
}

# 安装依赖
install_dependencies() {
    log_info "安装依赖..."
    cd "$PROJECT_ROOT"
    pnpm install --frozen-lockfile
}

# 构建项目
build_project() {
    log_info "构建项目..."

    if [ "$ENVIRONMENT" = "prod" ]; then
        pnpm build
        log_info "生产环境构建完成"
    else
        log_info "开发环境跳过构建"
    fi
}

# 检查环境变量
check_env() {
    log_info "检查环境变量..."

    if [ ! -f "$PROJECT_ROOT/.env" ]; then
        log_warn "未找到 .env 文件，正在创建..."
        cp "$PROJECT_ROOT/.env.example" "$PROJECT_ROOT/.env"
        log_warn "请编辑 $PROJECT_ROOT/.env 文件配置环境变量"
        return 1
    fi

    source "$PROJECT_ROOT/.env"

    # 检查关键环境变量
    if [ -z "$DB_HOST" ] || [ -z "$DB_USER" ] || [ -z "$DB_PASSWORD" ]; then
        log_warn "数据库配置不完整，请检查 .env 文件"
    fi

    if [ -z "$REDIS_HOST" ] || [ -z "$REDIS_PASSWORD" ]; then
        log_warn "Redis 配置不完整，请检查 .env 文件"
    fi

    log_info "环境变量检查完成"
}

# 数据库迁移
migrate_database() {
    log_info "检查数据库..."
    # 这里可以添加数据库迁移逻辑
    # 例如: npx typeorm migration:run
}

# 启动服务
start_service() {
    log_info "启动服务..."

    if command -v pm2 &> /dev/null; then
        log_info "使用 PM2 启动服务..."
        pm2 start ecosystem.config.js --env "$ENVIRONMENT"
        pm2 save
        log_info "服务启动完成"
    else
        log_info "直接启动服务..."
        if [ "$ENVIRONMENT" = "prod" ]; then
            pnpm prod:api
        else
            pnpm dev:api
        fi
    fi
}

# 停止服务
stop_service() {
    log_info "停止服务..."

    if command -v pm2 &> /dev/null; then
        pm2 stop naa-api || true
        pm2 delete naa-api || true
        log_info "服务已停止"
    else
        log_warn "PM2 未安装，请手动停止服务"
    fi
}

# 查看服务状态
show_status() {
    log_info "服务状态..."

    if command -v pm2 &> /dev/null; then
        pm2 status naa-api
        pm2 logs naa-api --lines 50
    else
        log_warn "PM2 未安装"
    fi
}

# 清理
cleanup() {
    log_info "清理临时文件..."
    # 可以添加清理逻辑
}

# 主函数
main() {
    log_info "开始部署 NAA API 服务..."
    log_info "环境: $ENVIRONMENT"

    check_requirements
    create_directories

    if [ "$1" != "stop" ] && [ "$1" != "status" ]; then
        check_env
        install_dependencies
        build_project
        migrate_database
    fi

    case "$1" in
        "stop")
            stop_service
            ;;
        "status")
            show_status
            ;;
        "restart")
            stop_service
            start_service
            ;;
        "logs")
            if command -v pm2 &> /dev/null; then
                pm2 logs naa-api
            else
                log_error "PM2 未安装"
            fi
            ;;
        *)
            start_service
            ;;
    esac

    log_info "部署完成"
}

# 执行主函数
main "$@"