module.exports = {
  apps: [
    {
      name: 'naa-api',
      cwd: './apps/api/dist',
      script: './main.js',
      args: ['-p', '6010'],
      autorestart: true,
      watch: true,
      ignore_watch: ['node_modules', 'public', 'logs'],
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_test: {
        NODE_ENV: 'test',
      },
    },
    {
      name: 'naa-docs',
      cwd: './apps/docs/node_modules/.bin/next',
      script: 'pnpm start',
      args: 'start',
      max_memory_restart: '1G',
      autorestart: true,
      watch: true,
      ignore_watch: ['node_modules', 'public'],
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_test: {
        NODE_ENV: 'test',
      },
    },
  ],
};
