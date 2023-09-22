module.exports = {
  apps: [
    {
      name: "nna-web",
      cwd: './apps/web',
      script: "./node_modules/next/dist/bin/next",
      args: "start -p 6030",
      watch: true,
      autorestart: true,
      ignore_watch: ["node_modules"],
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: 'nna-api',
      cwd: './apps/api/dist',
      script: 'main.js -p 6010',
      autorestart: true,
      watch: true,
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'production',
      },
      exec_mode: 'fork',
    },
  ],
};