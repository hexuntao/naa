#!/bin/bash

set -e # 任何命令出错时立即退出

# --- 配置区域 ---
# 你的 naa 项目的绝对路径
PROJECT_PATH="/www/wwwroot/naa" 
# ---------------

echo "🚀 开始部署... $(date)"

# 进入项目目录
cd "$PROJECT_PATH"

# 拉取最新代码
echo "📥 拉取GitHub最新代码 ..."
git pull origin main

# 安装/更新依赖
echo "📦 更新依赖 pnpm..."
pnpm install

# 构建项目
echo "🔨 构建项目..."
pnpm build

# 使用 PM2 平滑重启应用
echo "🔄 启动 PM2..."
pm2 reload ecosystem.config.js

echo "✅ 部署完成 $(date)"
