module.exports = {
  apps: [
    {
      name: 'naa-api',
      cwd: './apps/api/dist',
      script: './main.js',
      args: ['-p', '6010'],
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
