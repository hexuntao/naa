module.exports = {
  apps: [
    {
      name: 'naa-api',
      cwd: './apps/api',
      script: 'pnpm',
      args: ['start:prod'],
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'logs', 'uploads'],
      exec_mode: 'cluster',
      instances: 'max',
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,
      error_file: './logs/naa-api-error.log',
      out_file: './logs/naa-api-out.log',
      log_file: './logs/naa-api-combined.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true,
      env: {
        NODE_ENV: 'production',
        PM2_SERVE_PATH: './public',
        PM2_SERVE_PORT: 8080,
      },
      env_development: {
        NODE_ENV: 'development',
        WATCH: true,
        DEBUG: 'naa:*',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_test: {
        NODE_ENV: 'test',
      },
      // 确保 PM2 能加载 .env.production 文件
      env_file: '/opt/1panel/www/site/naa/.env.production',
    },
  ],
};
