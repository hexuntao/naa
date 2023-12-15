module.exports = {
  apps: [
    {
      name: 'nna-api',
      cwd: './apps/api/dist',
      script: './main.js',
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
