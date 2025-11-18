const fs = require('fs');
const path = require('path');

const apiUrl = process.env.APP_URL || `http://localhost:${process.env.API_PORT}`;

const vercelConfig = {
  // 规则按顺序匹配，越具体的规则越靠前
  rewrites: [
    // 规则1: API 代理
    {
      source: '/api/(.*)',
      destination: `${apiUrl}/api/$1`,
    },
    // 规则2: SPA Fallback (新增)
    // 这个规则会匹配所有不是静态文件、不是API请求的路径
    {
      source: '/((?!\\.\\w+$).*)',
      destination: '/index.html',
    },
  ],
};

const targetPath = path.join(__dirname, '..', 'vercel.json');

const targetDir = path.dirname(targetPath);
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(targetPath, JSON.stringify(vercelConfig, null, 2));

console.log(targetDir);
console.log('✅ vercel.json 生成成功!');
console.log(`API 代理: ${apiUrl}`);
