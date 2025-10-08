/**
 * @fileoverview 部署管理器 - 统一管理应用部署流程
 * @author SOLO Coding
 * @version 1.0.0
 */

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

/**
 * 部署环境配置接口
 */
class DeploymentEnvironment {
  constructor(name, config) {
    this.name = name;
    this.url = config.url;
    this.branch = config.branch || 'main';
    this.buildCommand = config.buildCommand || 'npm run build';
    this.deployCommand = config.deployCommand;
    this.healthCheckUrl = config.healthCheckUrl;
    this.envVars = config.envVars || {};
    this.preDeployHooks = config.preDeployHooks || [];
    this.postDeployHooks = config.postDeployHooks || [];
    this.rollbackCommand = config.rollbackCommand;
    this.timeout = config.timeout || 600000; // 10分钟默认超时
  }
}

/**
 * 部署管理器类
 */
class DeploymentManager {
  constructor() {
    this.environments = new Map();
    this.deploymentHistory = [];
    this.setupEnvironments();
  }

  /**
   * 设置部署环境
   */
  setupEnvironments() {
    // 开发环境
    this.addEnvironment('development', new DeploymentEnvironment('development', {
      url: 'http://localhost:3000',
      branch: 'develop',
      buildCommand: 'npm run build:dev',
      deployCommand: 'npm run start:dev',
      healthCheckUrl: 'http://localhost:3000/health',
      envVars: {
        NODE_ENV: 'development',
        DEBUG: 'true'
      }
    }));

    // 测试环境
    this.addEnvironment('staging', new DeploymentEnvironment('staging', {
      url: 'https://staging.example.com',
      branch: 'staging',
      buildCommand: 'npm run build:staging',
      deployCommand: 'vercel --target staging',
      healthCheckUrl: 'https://staging.example.com/health',
      envVars: {
        NODE_ENV: 'staging',
        API_URL: 'https://api-staging.example.com'
      },
      preDeployHooks: ['test:unit', 'test:integration'],
      postDeployHooks: ['test:smoke', 'notify:slack']
    }));

    // 生产环境
    this.addEnvironment('production', new DeploymentEnvironment('production', {
      url: 'https://example.com',
      branch: 'main',
      buildCommand: 'npm run build:production',
      deployCommand: 'vercel --prod',
      healthCheckUrl: 'https://example.com/health',
      envVars: {
        NODE_ENV: 'production',
        API_URL: 'https://api.example.com'
      },
      preDeployHooks: ['test:unit', 'test:integration', 'test:e2e', 'security:audit'],
      postDeployHooks: ['test:smoke', 'monitor:setup', 'notify:slack', 'backup:create'],
      rollbackCommand: 'vercel rollback',
      timeout: 900000 // 15分钟
    }));

    // 预览环境
    this.addEnvironment('preview', new DeploymentEnvironment('preview', {
      url: 'https://preview-{branch}.example.com',
      branch: 'feature/*',
      buildCommand: 'npm run build',
      deployCommand: 'vercel',
      healthCheckUrl: 'https://preview-{branch}.example.com/health',
      envVars: {
        NODE_ENV: 'preview'
      },
      preDeployHooks: ['test:unit'],
      postDeployHooks: ['test:smoke']
    }));
  }

  /**
   * 添加部署环境
   */
  addEnvironment(name, environment) {
    this.environments.set(name, environment);
  }

  /**
   * 获取部署环境
   */
  getEnvironment(name) {
    return this.environments.get(name);
  }

  /**
   * 获取所有环境
   */
  getAllEnvironments() {
    return Array.from(this.environments.values());
  }

  /**
   * 执行命令
   */
  async executeCommand(command, options = {}) {
    const startTime = Date.now();
    
    try {
      console.log(`🚀 执行命令: ${command}`);
      
      const result = execSync(command, {
        cwd: projectRoot,
        stdio: 'inherit',
        timeout: options.timeout || 300000,
        env: { ...process.env, ...options.env },
        ...options
      });

      const duration = Date.now() - startTime;
      console.log(`✅ 命令执行成功 (${duration}ms): ${command}`);
      
      return {
        success: true,
        duration,
        command,
        output: result?.toString() || ''
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`❌ 命令执行失败 (${duration}ms): ${command}`);
      console.error(`错误信息: ${error.message}`);
      
      return {
        success: false,
        duration,
        command,
        error: error.message,
        exitCode: error.status
      };
    }
  }

  /**
   * 检查环境变量
   */
  async checkEnvironmentVariables(environment) {
    console.log(`🔍 检查环境变量...`);
    
    const requiredVars = Object.keys(environment.envVars);
    const missingVars = [];

    for (const varName of requiredVars) {
      if (!process.env[varName] && !environment.envVars[varName]) {
        missingVars.push(varName);
      }
    }

    if (missingVars.length > 0) {
      console.warn(`⚠️  缺少环境变量: ${missingVars.join(', ')}`);
      return false;
    }

    console.log(`✅ 环境变量检查通过`);
    return true;
  }

  /**
   * 检查Git状态
   */
  async checkGitStatus(environment) {
    console.log(`🔍 检查Git状态...`);

    try {
      // 检查是否有未提交的更改
      const status = execSync('git status --porcelain', { 
        cwd: projectRoot, 
        encoding: 'utf8' 
      });

      if (status.trim()) {
        console.warn(`⚠️  存在未提交的更改:`);
        console.warn(status);
        return false;
      }

      // 检查当前分支
      const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { 
        cwd: projectRoot, 
        encoding: 'utf8' 
      }).trim();

      if (environment.branch !== '*' && !this.matchesBranchPattern(currentBranch, environment.branch)) {
        console.warn(`⚠️  当前分支 '${currentBranch}' 不匹配目标分支 '${environment.branch}'`);
        return false;
      }

      // 检查是否与远程同步
      try {
        execSync('git fetch', { cwd: projectRoot, stdio: 'pipe' });
        const behind = execSync(`git rev-list --count HEAD..origin/${currentBranch}`, { 
          cwd: projectRoot, 
          encoding: 'utf8' 
        }).trim();

        if (parseInt(behind) > 0) {
          console.warn(`⚠️  本地分支落后远程 ${behind} 个提交`);
          return false;
        }
      } catch (error) {
        console.warn(`⚠️  无法检查远程同步状态: ${error.message}`);
      }

      console.log(`✅ Git状态检查通过`);
      return true;
    } catch (error) {
      console.error(`❌ Git状态检查失败: ${error.message}`);
      return false;
    }
  }

  /**
   * 匹配分支模式
   */
  matchesBranchPattern(branch, pattern) {
    if (pattern === '*') return true;
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      return regex.test(branch);
    }
    return branch === pattern;
  }

  /**
   * 运行钩子
   */
  async runHooks(hooks, environment, phase) {
    if (hooks.length === 0) return true;

    console.log(`🪝 运行${phase}钩子...`);

    for (const hook of hooks) {
      console.log(`  📌 执行钩子: ${hook}`);
      
      let command;
      if (hook.startsWith('npm run ') || hook.startsWith('npx ')) {
        command = hook;
      } else {
        command = `npm run ${hook}`;
      }

      const result = await this.executeCommand(command, {
        timeout: environment.timeout / 2,
        env: environment.envVars
      });

      if (!result.success) {
        console.error(`❌ 钩子执行失败: ${hook}`);
        return false;
      }
    }

    console.log(`✅ ${phase}钩子执行完成`);
    return true;
  }

  /**
   * 健康检查
   */
  async healthCheck(url, maxRetries = 5, retryDelay = 10000) {
    console.log(`🏥 执行健康检查: ${url}`);

    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url, { 
          method: 'GET',
          timeout: 10000
        });

        if (response.ok) {
          console.log(`✅ 健康检查通过 (尝试 ${i + 1}/${maxRetries})`);
          return true;
        } else {
          console.warn(`⚠️  健康检查失败: HTTP ${response.status} (尝试 ${i + 1}/${maxRetries})`);
        }
      } catch (error) {
        console.warn(`⚠️  健康检查失败: ${error.message} (尝试 ${i + 1}/${maxRetries})`);
      }

      if (i < maxRetries - 1) {
        console.log(`⏳ 等待 ${retryDelay / 1000} 秒后重试...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }

    console.error(`❌ 健康检查失败，已尝试 ${maxRetries} 次`);
    return false;
  }

  /**
   * 创建部署备份
   */
  async createBackup(environment) {
    console.log(`💾 创建部署备份...`);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(projectRoot, 'backups', `${environment.name}-${timestamp}`);

    try {
      await fs.mkdir(backupDir, { recursive: true });

      // 备份构建产物
      const distDir = path.join(projectRoot, 'dist');
      try {
        await fs.access(distDir);
        const backupDistDir = path.join(backupDir, 'dist');
        await this.executeCommand(`cp -r "${distDir}" "${backupDistDir}"`);
        console.log(`📦 已备份构建产物到: ${backupDistDir}`);
      } catch {
        console.log(`⚠️  构建产物目录不存在，跳过备份`);
      }

      // 备份配置文件
      const configFiles = ['package.json', 'package-lock.json', 'vercel.json', '.env.example'];
      for (const file of configFiles) {
        const filePath = path.join(projectRoot, file);
        try {
          await fs.access(filePath);
          await fs.copyFile(filePath, path.join(backupDir, file));
          console.log(`📄 已备份配置文件: ${file}`);
        } catch {
          // 文件不存在，跳过
        }
      }

      // 记录Git信息
      const gitInfo = {
        commit: execSync('git rev-parse HEAD', { cwd: projectRoot, encoding: 'utf8' }).trim(),
        branch: execSync('git rev-parse --abbrev-ref HEAD', { cwd: projectRoot, encoding: 'utf8' }).trim(),
        timestamp: new Date().toISOString(),
        environment: environment.name
      };

      await fs.writeFile(
        path.join(backupDir, 'git-info.json'),
        JSON.stringify(gitInfo, null, 2)
      );

      console.log(`✅ 备份创建完成: ${backupDir}`);
      return backupDir;
    } catch (error) {
      console.error(`❌ 备份创建失败: ${error.message}`);
      return null;
    }
  }

  /**
   * 执行部署
   */
  async deploy(environmentName, options = {}) {
    const environment = this.getEnvironment(environmentName);
    if (!environment) {
      throw new Error(`未知的部署环境: ${environmentName}`);
    }

    const deploymentId = `${environmentName}-${Date.now()}`;
    const startTime = Date.now();

    console.log(`🚀 开始部署到 ${environmentName} 环境...`);
    console.log(`📋 部署ID: ${deploymentId}`);

    const deploymentRecord = {
      id: deploymentId,
      environment: environmentName,
      startTime,
      endTime: null,
      duration: null,
      success: false,
      steps: [],
      error: null,
      backupPath: null,
      rollbackAvailable: false
    };

    try {
      // 1. 预检查
      console.log(`\n📋 步骤 1/8: 预检查`);
      
      if (!options.skipGitCheck) {
        const gitOk = await this.checkGitStatus(environment);
        if (!gitOk && !options.force) {
          throw new Error('Git状态检查失败，使用 --force 强制部署');
        }
      }

      const envOk = await this.checkEnvironmentVariables(environment);
      if (!envOk && !options.force) {
        throw new Error('环境变量检查失败，使用 --force 强制部署');
      }

      deploymentRecord.steps.push({ name: 'precheck', success: true, duration: Date.now() - startTime });

      // 2. 创建备份
      if (!options.skipBackup) {
        console.log(`\n📋 步骤 2/8: 创建备份`);
        const backupPath = await this.createBackup(environment);
        if (backupPath) {
          deploymentRecord.backupPath = backupPath;
          deploymentRecord.rollbackAvailable = true;
        }
      }

      // 3. 运行预部署钩子
      console.log(`\n📋 步骤 3/8: 预部署钩子`);
      const preHooksOk = await this.runHooks(environment.preDeployHooks, environment, '预部署');
      if (!preHooksOk) {
        throw new Error('预部署钩子执行失败');
      }
      deploymentRecord.steps.push({ name: 'pre-hooks', success: true });

      // 4. 构建应用
      console.log(`\n📋 步骤 4/8: 构建应用`);
      const buildResult = await this.executeCommand(environment.buildCommand, {
        timeout: environment.timeout,
        env: environment.envVars
      });
      if (!buildResult.success) {
        throw new Error('应用构建失败');
      }
      deploymentRecord.steps.push({ name: 'build', success: true, duration: buildResult.duration });

      // 5. 部署应用
      console.log(`\n📋 步骤 5/8: 部署应用`);
      const deployResult = await this.executeCommand(environment.deployCommand, {
        timeout: environment.timeout,
        env: environment.envVars
      });
      if (!deployResult.success) {
        throw new Error('应用部署失败');
      }
      deploymentRecord.steps.push({ name: 'deploy', success: true, duration: deployResult.duration });

      // 6. 健康检查
      if (environment.healthCheckUrl && !options.skipHealthCheck) {
        console.log(`\n📋 步骤 6/8: 健康检查`);
        const healthOk = await this.healthCheck(environment.healthCheckUrl);
        if (!healthOk) {
          throw new Error('健康检查失败');
        }
        deploymentRecord.steps.push({ name: 'health-check', success: true });
      }

      // 7. 运行后部署钩子
      console.log(`\n📋 步骤 7/8: 后部署钩子`);
      const postHooksOk = await this.runHooks(environment.postDeployHooks, environment, '后部署');
      if (!postHooksOk) {
        console.warn('⚠️  后部署钩子执行失败，但部署已完成');
      }
      deploymentRecord.steps.push({ name: 'post-hooks', success: postHooksOk });

      // 8. 完成
      console.log(`\n📋 步骤 8/8: 部署完成`);
      
      deploymentRecord.success = true;
      deploymentRecord.endTime = Date.now();
      deploymentRecord.duration = deploymentRecord.endTime - deploymentRecord.startTime;

      console.log(`\n🎉 部署成功完成！`);
      console.log(`📊 部署统计:`);
      console.log(`  环境: ${environmentName}`);
      console.log(`  耗时: ${deploymentRecord.duration}ms`);
      console.log(`  URL: ${environment.url}`);
      if (deploymentRecord.backupPath) {
        console.log(`  备份: ${deploymentRecord.backupPath}`);
      }

      return deploymentRecord;

    } catch (error) {
      deploymentRecord.success = false;
      deploymentRecord.error = error.message;
      deploymentRecord.endTime = Date.now();
      deploymentRecord.duration = deploymentRecord.endTime - deploymentRecord.startTime;

      console.error(`\n💥 部署失败: ${error.message}`);
      
      if (deploymentRecord.rollbackAvailable && options.autoRollback) {
        console.log(`🔄 自动回滚...`);
        await this.rollback(environmentName, deploymentId);
      }

      throw error;
    } finally {
      this.deploymentHistory.push(deploymentRecord);
    }
  }

  /**
   * 回滚部署
   */
  async rollback(environmentName, deploymentId = null) {
    const environment = this.getEnvironment(environmentName);
    if (!environment) {
      throw new Error(`未知的部署环境: ${environmentName}`);
    }

    console.log(`🔄 开始回滚 ${environmentName} 环境...`);

    try {
      if (environment.rollbackCommand) {
        console.log(`📋 执行回滚命令...`);
        const result = await this.executeCommand(environment.rollbackCommand, {
          timeout: environment.timeout,
          env: environment.envVars
        });

        if (!result.success) {
          throw new Error('回滚命令执行失败');
        }
      } else {
        console.warn(`⚠️  环境 ${environmentName} 未配置回滚命令`);
      }

      // 健康检查
      if (environment.healthCheckUrl) {
        console.log(`🏥 执行回滚后健康检查...`);
        const healthOk = await this.healthCheck(environment.healthCheckUrl);
        if (!healthOk) {
          console.warn(`⚠️  回滚后健康检查失败`);
        }
      }

      console.log(`✅ 回滚完成`);
      return true;
    } catch (error) {
      console.error(`❌ 回滚失败: ${error.message}`);
      return false;
    }
  }

  /**
   * 获取部署历史
   */
  getDeploymentHistory(limit = 20) {
    return this.deploymentHistory.slice(-limit);
  }

  /**
   * 生成部署报告
   */
  async generateDeploymentReport(outputPath = 'reports/deployment-report.json') {
    const report = {
      timestamp: new Date().toISOString(),
      environments: this.getAllEnvironments().map(env => ({
        name: env.name,
        url: env.url,
        branch: env.branch,
        lastDeployment: this.getLastDeployment(env.name)
      })),
      deploymentHistory: this.getDeploymentHistory(),
      statistics: this.calculateDeploymentStatistics()
    };

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(report, null, 2));
    
    console.log(`📄 部署报告已生成: ${outputPath}`);
    return report;
  }

  /**
   * 获取最后一次部署
   */
  getLastDeployment(environmentName) {
    const deployments = this.deploymentHistory.filter(d => d.environment === environmentName);
    return deployments.length > 0 ? deployments[deployments.length - 1] : null;
  }

  /**
   * 计算部署统计
   */
  calculateDeploymentStatistics() {
    const history = this.getDeploymentHistory();
    
    if (history.length === 0) {
      return {
        totalDeployments: 0,
        successRate: 0,
        averageDuration: 0,
        environmentStats: {}
      };
    }

    const successCount = history.filter(h => h.success).length;
    const totalDuration = history.reduce((sum, h) => sum + (h.duration || 0), 0);
    
    const environmentStats = {};
    for (const record of history) {
      if (!environmentStats[record.environment]) {
        environmentStats[record.environment] = {
          deployments: 0,
          successes: 0,
          failures: 0,
          totalDuration: 0,
          averageDuration: 0
        };
      }
      
      const stats = environmentStats[record.environment];
      stats.deployments++;
      stats.totalDuration += record.duration || 0;
      stats.averageDuration = stats.totalDuration / stats.deployments;
      
      if (record.success) {
        stats.successes++;
      } else {
        stats.failures++;
      }
    }

    return {
      totalDeployments: history.length,
      successRate: (successCount / history.length) * 100,
      averageDuration: totalDuration / history.length,
      environmentStats
    };
  }

  /**
   * 显示帮助信息
   */
  showHelp() {
    console.log(`
🚀 部署管理器 - 使用说明

命令格式:
  node scripts/deployManager.js <command> [options]

可用命令:
  deploy <env>          - 部署到指定环境
  rollback <env>        - 回滚指定环境
  status <env>          - 检查环境状态
  list                  - 列出所有环境
  history              - 显示部署历史
  report               - 生成部署报告
  help                 - 显示此帮助信息

可用环境:
  development          - 开发环境
  staging              - 测试环境
  production           - 生产环境
  preview              - 预览环境

部署选项:
  --force              - 强制部署（跳过检查）
  --skip-git-check     - 跳过Git状态检查
  --skip-backup        - 跳过备份创建
  --skip-health-check  - 跳过健康检查
  --auto-rollback      - 失败时自动回滚

示例:
  node scripts/deployManager.js deploy staging
  node scripts/deployManager.js deploy production --force
  node scripts/deployManager.js rollback production
  node scripts/deployManager.js status staging
  node scripts/deployManager.js history
`);
  }
}

// 命令行接口
async function main() {
  const manager = new DeploymentManager();
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    manager.showHelp();
    return;
  }

  const command = args[0];
  const options = {};
  
  // 解析选项
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--force') {
      options.force = true;
    } else if (args[i] === '--skip-git-check') {
      options.skipGitCheck = true;
    } else if (args[i] === '--skip-backup') {
      options.skipBackup = true;
    } else if (args[i] === '--skip-health-check') {
      options.skipHealthCheck = true;
    } else if (args[i] === '--auto-rollback') {
      options.autoRollback = true;
    }
  }

  try {
    switch (command) {
      case 'deploy':
        if (args.length < 2) {
          console.error('❌ 请指定部署环境');
          return;
        }
        await manager.deploy(args[1], options);
        break;

      case 'rollback':
        if (args.length < 2) {
          console.error('❌ 请指定回滚环境');
          return;
        }
        await manager.rollback(args[1]);
        break;

      case 'status':
        if (args.length < 2) {
          console.error('❌ 请指定检查环境');
          return;
        }
        const env = manager.getEnvironment(args[1]);
        if (env && env.healthCheckUrl) {
          await manager.healthCheck(env.healthCheckUrl);
        } else {
          console.log('❌ 环境不存在或未配置健康检查');
        }
        break;

      case 'list':
        console.log('📋 可用环境:');
        manager.getAllEnvironments().forEach(env => {
          console.log(`  ${env.name.padEnd(15)} - ${env.url} (${env.branch})`);
        });
        break;

      case 'history':
        const history = manager.getDeploymentHistory();
        console.log('📜 部署历史:');
        history.forEach(record => {
          const status = record.success ? '✅' : '❌';
          const duration = record.duration ? `${record.duration}ms` : 'N/A';
          const date = new Date(record.startTime).toLocaleString();
          console.log(`  ${status} ${record.environment.padEnd(12)} ${duration.padStart(8)} ${date}`);
        });
        break;

      case 'report':
        await manager.generateDeploymentReport();
        break;

      case 'help':
        manager.showHelp();
        break;

      default:
        console.error(`❌ 未知命令: ${command}`);
        manager.showHelp();
    }
  } catch (error) {
    console.error(`💥 执行失败: ${error.message}`);
    process.exit(1);
  }
}

// 如果直接运行此脚本
const isMainModule = process.argv[1] && process.argv[1].endsWith('deployManager.js');
if (isMainModule) {
  main().catch(error => {
    console.error('💥 程序异常:', error);
    process.exit(1);
  });
}

export { DeploymentManager, DeploymentEnvironment };