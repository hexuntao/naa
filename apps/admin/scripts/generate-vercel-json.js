const fs = require('fs');
const path = require('path');

// 1. 从环境变量中获取 API 地址
const apiUrl = process.env.APP_URL || `http://localhost:${process.env.API_PORT}`;

// 2. 定义 vercel.json 的内容
const vercelConfig = {
  rewrites: [
    {
      source: '/api/(.*)',
      destination: `${apiUrl}/api/$1`,
    },
  ],
};

// 3. 将配置写入到当前目录的上一级目录，即 apps/admin/vercel.json
//    __dirname 在这里是 'naa/apps/admin/scripts'
const targetPath = path.join(__dirname, '..', 'vercel.json');

// 确保目标目录存在（虽然通常都存在，但这是个好习惯）
const targetDir = path.dirname(targetPath);
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(targetPath, JSON.stringify(vercelConfig, null, 2));

console.log('✅ vercel.json 生成成功!');
console.log(`API 代理: ${apiUrl}`);
