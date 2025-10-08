/**
 * PM2 生产环境配置文件
 * 用于自托管部署的进程管理配置
 */

module.exports = {
  apps: [
    {
      // 应用基本信息
      name: 'wolf-learn-quest',
      script: 'serve',
      args: '-s dist -l 8080',
      
      // 进程管理
      instances: 'max', // 使用所有CPU核心
      exec_mode: 'cluster', // 集群模式
      
      // 环境配置
      env: {
        NODE_ENV: 'production',
        PORT: 8080
      },
      
      // 日志配置
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // 监控配置
      monitoring: true,
      pmx: true,
      
      // 自动重启配置
      autorestart: true,
      watch: false, // 生产环境不监听文件变化
      max_memory_restart: '1G',
      
      // 重启策略
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
      
      // 健康检查
      health_check_grace_period: 3000,
      health_check_fatal_exceptions: true,
      
      // 进程配置
      kill_timeout: 5000,
      listen_timeout: 3000,
      
      // 环境变量
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
        PM2_SERVE_PATH: './dist',
        PM2_SERVE_PORT: 8080,
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html'
      }
    }
  ],
  
  // 部署配置
  deploy: {
    production: {
      // 服务器配置
      user: 'deploy',
      host: ['your-server.com'],
      ref: 'origin/main',
      repo: 'https://github.com/your-username/wolf-learn-quest.git',
      path: '/var/www/wolf-learn-quest',
      
      // 部署钩子
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      
      // SSH配置
      ssh_options: 'StrictHostKeyChecking=no',
      
      // 环境变量
      env: {
        NODE_ENV: 'production'
      }
    },
    
    staging: {
      user: 'deploy',
      host: ['staging-server.com'],
      ref: 'origin/develop',
      repo: 'https://github.com/your-username/wolf-learn-quest.git',
      path: '/var/www/wolf-learn-quest-staging',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env staging',
      env: {
        NODE_ENV: 'staging'
      }
    }
  }
}