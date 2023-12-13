module.exports = {
  apps: [
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