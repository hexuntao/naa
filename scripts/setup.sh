#!/bin/bash

# 设置颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}开始初始化服务器环境 (兼容性增强版)...${NC}"

# 检测包管理器
if command -v apt-get &> /dev/null; then
    PKG_MANAGER="apt-get"
    PKG_UPDATE="apt-get update -y"
    PKG_INSTALL="apt-get install -y"
elif command -v yum &> /dev/null; then
    PKG_MANAGER="yum"
    PKG_UPDATE="yum update -y"
    PKG_INSTALL="yum install -y"
elif command -v apk &> /dev/null; then
    PKG_MANAGER="apk"
    PKG_UPDATE="apk update"
    PKG_INSTALL="apk add"
else
    echo -e "${RED}错误: 不支持的包管理器。请手动安装依赖。${NC}"
    exit 1
fi

# 更新系统
echo -e "${YELLOW}正在更新系统...${NC}"
eval "$PKG_UPDATE"

# 安装基础工具 (wget, tar)
echo -e "${YELLOW}正在安装基础工具...${NC}"
eval "$PKG_INSTALL wget tar"

# 1. 安装 Nginx
echo -e "${YELLOW}正在安装 Nginx...${NC}"
if [ "$PKG_MANAGER" == "apk" ]; then
    # Alpine Linux
    eval "$PKG_INSTALL nginx"
    rc-update add nginx default
    rc-service nginx start
else
    # Debian/Ubuntu/CentOS
    eval "$PKG_INSTALL nginx"
    systemctl start nginx
    systemctl enable nginx
fi


# 2. 安装指定版本的 Node.js (20.19.5)
echo -e "${YELLOW}正在安装 Node.js 20.19.5...${NC}"
NODE_VERSION="20.19.5"
ARCH="x64"
NODE_TAR="node-v${NODE_VERSION}-linux-${ARCH}.tar.xz"

wget "https://nodejs.org/dist/v${NODE_VERSION}/${NODE_TAR}"
tar -xvf ${NODE_TAR} -C /usr/local --strip-components=1
rm ${NODE_TAR}

# 创建符号链接以确保 node 和 npm 在系统 PATH 中
ln -sf /usr/local/bin/node /usr/bin/node
ln -sf /usr/local/bin/npm /usr/bin/npm
ln -sf /usr/local/bin/npx /usr/bin/npx

node -v && npm -v

# 3. 安装 pnpm
echo -e "${YELLOW}正在安装 pnpm...${NC}"
npm install -g pnpm

# 4. 安装 PM2
echo -e "${YELLOW}正在安装 PM2...${NC}"
npm install -g pm2

# 5. 创建部署用户 (兼容多种系统)
DEPLOY_USER="deployer"
if ! id "${DEPLOY_USER}" &>/dev/null; then
    if [ "$PKG_MANAGER" == "apk" ]; then
        # Alpine
        adduser -D -s /bin/bash ${DEPLOY_USER}
    else
        # Debian/Ubuntu/CentOS
        useradd -m -s /bin/bash ${DEPLOY_USER}
    fi
    echo -e "${GREEN}部署用户 '${DEPLOY_USER}' 已创建。${NC}"
fi

# 6. 将用户添加到管理员组
if getent group sudo >/dev/null; then
    usermod -aG sudo ${DEPLOY_USER}
    echo -e "${GREEN}用户 '${DEPLOY_USER}' 已添加到 'sudo' 组。${NC}"
elif getent group wheel >/dev/null; then
    usermod -aG wheel ${DEPLOY_USER}
    echo -e "${GREEN}用户 '${DEPLOY_USER}' 已添加到 'wheel' 组。${NC}"
else
    echo -e "${RED}警告: 未找到 'sudo' 或 'wheel' 组，请手动为 '${DEPLOY_USER}' 用户配置管理员权限。${NC}"
fi

# 7. 为 deployer 用户配置 SSH
echo -e "${YELLOW}为 '${DEPLOY_USER}' 配置 SSH...${NC}
# 确保目录存在且权限正确
mkdir -p /home/${DEPLOY_USER}/.ssh
chmod 700 /home/${DEPLOY_USER}/.ssh
chown ${DEPLOY_USER}:${DEPLOY_USER} /home/${DEPLOY_USER}/.ssh

if [ ! -f /home/${DEPLOY_USER}/.ssh/id_rsa ]; then
    sudo -u ${DEPLOY_USER} ssh-keygen -t rsa -b 4096 -f /home/${DEPLOY_USER}/.ssh/id_rsa -N ""
    echo -e "${GREEN}SSH 密钥对已为 '${DEPLOY_USER}' 生成。${NC}"
fi

sudo -u ${DEPLOY_USER} cat /home/${DEPLOY_USER}/.ssh/id_rsa.pub | sudo -u ${DEPLOY_USER} tee /home/${DEPLOY_USER}/.ssh/authorized_keys
chmod 600 /home/${DEPLOY_USER}/.ssh/authorized_keys
chown ${DEPLOY_USER}:${DEPLOY_USER} /home/${DEPLOY_USER}/.ssh/authorized_keys

# 8. 创建项目目录 (使用你日志中的路径)
PROJECT_DIR="/opt/1panel/www/site/naa"
mkdir -p ${PROJECT_DIR}
chown -R ${DEPLOY_USER}:${DEPLOY_USER} ${PROJECT_DIR}

# 9. 创建 .env.production 模板文件
echo -e "${YELLOW}创建 .env.production 模板文件...${NC}"
ENV_FILE="${PROJECT_DIR}/.env.production"
touch ${ENV_FILE}
chmod 600 ${ENV_FILE}
chown ${DEPLOY_USER}:${DEPLOY_USER} ${ENV_FILE}
echo "# 生产环境变量 (Supabase)" | tee ${ENV_FILE}
echo "# 从 Supabase 项目设置 -> Database -> Connection string -> Pooling 获取" | tee -a ${ENV_FILE}
echo "# 其他必要的密钥" | tee -a ${ENV_FILE}
echo "NEXTAUTH_URL=\"https://your-domain.com\"" | tee -a ${ENV_FILE}
echo "NEXTAUTH_SECRET=\"a-very-strong-secret-key\"" | tee -a ${ENV_FILE}
echo -e "${GREEN}环境变量模板文件已创建于 ${ENV_FILE}，请手动修改其中的值！${NC}"

echo -e "${GREEN}--------------------------------------------------${NC}"
echo -e "${GREEN}服务器初始化脚本执行完成！${NC}"
echo -e "${YELLOW}接下来的手动操作：${NC}"
echo -e "1. 编辑 ${ENV_FILE} 文件，填入从 Supabase 获取的真实连接字符串和密钥。"
echo -e "2. 复制下面的 PRIVATE KEY，添加到 GitHub 仓库的 Secrets 中 (名称: SERVER_SSH_KEY)。"
echo -e "3. 将你的服务器 IP 添加到 GitHub 仓库的 Secrets 中 (名称: SERVER_HOST)。"
echo -e "4. 将部署用户名 '${DEPLOY_USER}' 添加到 GitHub 仓库的 Secrets 中 (名称: SERVER_USERNAME)。"
echo -e "${GREEN}--------------------------------------------------${NC}"
sudo -u ${DEPLOY_USER} cat /home/${DEPLOY_USER}/.ssh/id_rsa
echo -e "${GREEN}--------------------------------------------------${NC}"