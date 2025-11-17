#!/bin/bash

# 设置颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}开始初始化服务器环境...${NC}"

# 更新系统
sudo apt-get update -y

# 1. 安装 Nginx
echo -e "${YELLOW}正在安装 Nginx...${NC}"
sudo apt-get install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# 2. 安装指定版本的 Node.js (20.19.5)
echo -e "${YELLOW}正在安装 Node.js 20.19.5...${NC}"
NODE_VERSION="20.19.5"
ARCH="x64"
wget https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-${ARCH}.tar.xz
sudo tar -xvf node-v${NODE_VERSION}-linux-${ARCH}.tar.xz -C /usr/local --strip-components=1
rm node-v${NODE_VERSION}-linux-${ARCH}.tar.xz
node -v && npm -v

# 3. 安装 pnpm
echo -e "${YELLOW}正在安装 pnpm...${NC}"
sudo npm install -g pnpm

# 4. 安装 PM2
echo -e "${YELLOW}正在安装 PM2...${NC}"
sudo npm install -g pm2

# 5. 创建部署用户 (如果不存在)
DEPLOY_USER="deployer"
if ! id "${DEPLOY_USER}" &>/dev/null; then
    sudo adduser ${DEPLOY_USER} --disabled-password --gecos ""
    sudo usermod -aG sudo ${DEPLOY_USER}
    echo -e "${GREEN}部署用户 '${DEPLOY_USER}' 已创建。${NC}"
fi

# 6. 为 deployer 用户配置 SSH
echo -e "${YELLOW}为 '${DEPLOY_USER}' 配置 SSH...${NC}"
sudo -u ${DEPLOY_USER} mkdir -p /home/${DEPLOY_USER}/.ssh
sudo chmod 700 /home/${DEPLOY_USER}/.ssh

if [ ! -f /home/${DEPLOY_USER}/.ssh/id_rsa ]; then
    sudo -u ${DEPLOY_USER} ssh-keygen -t rsa -b 4096 -f /home/${DEPLOY_USER}/.ssh/id_rsa -N ""
    echo -e "${GREEN}SSH 密钥对已为 '${DEPLOY_USER}' 生成。${NC}"
fi

sudo -u ${DEPLOY_USER} cat /home/${DEPLOY_USER}/.ssh/id_rsa.pub | sudo -u ${DEPLOY_USER} tee /home/${DEPLOY_USER}/.ssh/authorized_keys
sudo -u ${DEPLOY_USER} chmod 600 /home/${DEPLOY_USER}/.ssh/authorized_keys

# 7. 创建项目目录
sudo mkdir -p /opt/1panel/www/site/naa
sudo chown -R ${DEPLOY_USER}:${DEPLOY_USER} /opt/1panel/www/site

# 8. 创建 .env.production 模板文件 
echo -e "${YELLOW}创建 .env.production 模板文件...${NC}"
ENV_FILE="/opt/1panel/www/site/naa/.env.production"
sudo -u ${DEPLOY_USER} touch ${ENV_FILE}
sudo -u ${DEPLOY_USER} chmod 600 ${ENV_FILE}
echo "# 生产环境变量" | sudo -u ${DEPLOY_USER} tee ${ENV_FILE}
echo "# 其他必要的密钥" | sudo -u ${DEPLOY_USER} tee -a ${ENV_FILE}
echo -e "${GREEN}环境变量模板文件已创建于 ${ENV_FILE}，请手动修改其中的值！${NC}"

echo -e "${GREEN}--------------------------------------------------${NC}"
echo -e "${GREEN}服务器初始化脚本执行完成！${NC}"
echo -e "${YELLOW}接下来的手动操作：${NC}"
echo -e "1. 编辑 /opt/1panel/www/site/naa/.env.production 文件"
echo -e "2. 复制下面的 PRIVATE KEY，添加到 GitHub 仓库的 Secrets 中 (名称: SERVER_SSH_KEY)。"
echo -e "3. 将你的服务器 IP 添加到 GitHub 仓库的 Secrets 中 (名称: SERVER_HOST)。"
echo -e "4. 将部署用户名 '${DEPLOY_USER}' 添加到 GitHub 仓库的 Secrets 中 (名称: SERVER_USERNAME)。"
echo -e "${GREEN}--------------------------------------------------${NC}"
sudo -u ${DEPLOY_USER} cat /home/${DEPLOY_USER}/.ssh/id_rsa
echo -e "${GREEN}--------------------------------------------------${NC}"