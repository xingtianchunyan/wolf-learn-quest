/**
 * @fileoverview 自动化脚本管理器 - 统一管理和执行自动化任务
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
 * 自动化任务配置接口
 */
class AutomationTask {
  constructor(name, description, command, dependencies = [], options = {}) {
    this.name = name;
    this.description = description;
    this.command = command;
    this.dependencies = dependencies;
    this.options = {
      timeout: 300000, // 5分钟默认超时
      retries: 0,
      parallel: false,
      ...options
    };
  }
}

/**
 * 自动化管理器类
 */
class AutomationManager {
  constructor() {
    this.tasks = new Map();
    this.executionHistory = [];
    this.isRunning = false;
    this.setupTasks();
  }

  /**
   * 设置预定义任务
   */
  setupTasks() {
    // 代码质量任务
    this.addTask(new AutomationTask(
      'quality-check',
      '代码质量检查',
      'npm run quality:analyze',
      [],
      { timeout: 180000 }
    ));

    this.addTask(new AutomationTask(
      'lint-fix',
      '自动修复代码风格问题',
      'npm run lint:fix',
      [],
      { timeout: 120000 }
    ));

    this.addTask(new AutomationTask(
      'format-code',
      '格式化代码',
      'npm run format:code',
      [],
      { timeout: 120000 }
    ));

    // 测试任务
    this.addTask(new AutomationTask(
      'test-unit',
      '运行单元测试',
      'npm run test:unit',
      [],
      { timeout: 300000 }
    ));

    this.addTask(new AutomationTask(
      'test-e2e',
      '运行端到端测试',
      'npm run test:e2e',
      ['build'],
      { timeout: 600000 }
    ));

    this.addTask(new AutomationTask(
      'test-coverage',
      '生成测试覆盖率报告',
      'npm run test:coverage',
      ['test-unit'],
      { timeout: 300000 }
    ));

    // 构建任务
    this.addTask(new AutomationTask(
      'build',
      '构建应用',
      'npm run build',
      ['quality-check'],
      { timeout: 300000 }
    ));

    this.addTask(new AutomationTask(
      'build-analyze',
      '分析构建包大小',
      'npm run analyze',
      ['build'],
      { timeout: 120000 }
    ));

    // 部署任务
    this.addTask(new AutomationTask(
      'deploy-preview',
      '部署到预览环境',
      'npm run deploy:preview',
      ['build', 'test-unit'],
      { timeout: 600000 }
    ));

    this.addTask(new AutomationTask(
      'deploy-production',
      '部署到生产环境',
      'npm run deploy:production',
      ['build', 'test-unit', 'test-e2e'],
      { timeout: 600000 }
    ));

    // 维护任务
    this.addTask(new AutomationTask(
      'dependency-update',
      '更新依赖包',
      'npm run deps:update',
      [],
      { timeout: 300000 }
    ));

    this.addTask(new AutomationTask(
      'security-audit',
      '安全审计',
      'npm audit --audit-level=moderate',
      [],
      { timeout: 120000 }
    ));

    this.addTask(new AutomationTask(
      'cleanup',
      '清理临时文件',
      'npm run clean',
      [],
      { timeout: 60000 }
    ));

    // 文档任务
    this.addTask(new AutomationTask(
      'docs-generate',
      '生成文档',
      'npm run docs:generate',
      [],
      { timeout: 180000 }
    ));

    this.addTask(new AutomationTask(
      'docs-deploy',
      '部署文档',
      'npm run docs:deploy',
      ['docs-generate'],
      { timeout: 300000 }
    ));

    // 数据库任务
    this.addTask(new AutomationTask(
      'db-migrate',
      '数据库迁移',
      'npm run db:migrate',
      [],
      { timeout: 180000 }
    ));

    this.addTask(new AutomationTask(
      'db-seed',
      '数据库种子数据',
      'npm run db:seed',
      ['db-migrate'],
      { timeout: 120000 }
    ));

    this.addTask(new AutomationTask(
      'db-backup',
      '数据库备份',
      'npm run db:backup',
      [],
      { timeout: 300000 }
    ));
  }

  /**
   * 添加任务
   */
  addTask(task) {
    this.tasks.set(task.name, task);
  }

  /**
   * 获取任务
   */
  getTask(name) {
    return this.tasks.get(name);
  }

  /**
   * 获取所有任务
   */
  getAllTasks() {
    return Array.from(this.tasks.values());
  }

  /**
   * 解析任务依赖
   */
  resolveDependencies(taskName, resolved = new Set(), visiting = new Set()) {
    if (visiting.has(taskName)) {
      throw new Error(`检测到循环依赖: ${Array.from(visiting).join(' -> ')} -> ${taskName}`);
    }

    if (resolved.has(taskName)) {
      return [];
    }

    const task = this.getTask(taskName);
    if (!task) {
      throw new Error(`任务不存在: ${taskName}`);
    }

    visiting.add(taskName);

    const dependencies = [];
    for (const dep of task.dependencies) {
      dependencies.push(...this.resolveDependencies(dep, resolved, visiting));
    }

    visiting.delete(taskName);
    resolved.add(taskName);
    dependencies.push(task);

    return dependencies;
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
   * 执行单个任务
   */
  async executeTask(taskName, options = {}) {
    const task = this.getTask(taskName);
    if (!task) {
      throw new Error(`任务不存在: ${taskName}`);
    }

    console.log(`📋 开始执行任务: ${task.name} - ${task.description}`);
    
    const startTime = Date.now();
    let result;
    let retries = 0;

    while (retries <= task.options.retries) {
      if (retries > 0) {
        console.log(`🔄 重试任务 (${retries}/${task.options.retries}): ${task.name}`);
      }

      result = await this.executeCommand(task.command, {
        ...task.options,
        ...options
      });

      if (result.success) {
        break;
      }

      retries++;
      if (retries <= task.options.retries) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 等待2秒后重试
      }
    }

    const totalDuration = Date.now() - startTime;
    
    const executionRecord = {
      taskName: task.name,
      description: task.description,
      command: task.command,
      startTime,
      endTime: Date.now(),
      duration: totalDuration,
      success: result.success,
      retries,
      error: result.error,
      exitCode: result.exitCode
    };

    this.executionHistory.push(executionRecord);

    if (result.success) {
      console.log(`✅ 任务完成: ${task.name} (${totalDuration}ms)`);
    } else {
      console.error(`❌ 任务失败: ${task.name} (${totalDuration}ms)`);
      if (retries > 0) {
        console.error(`重试次数: ${retries}`);
      }
    }

    return executionRecord;
  }

  /**
   * 执行任务序列
   */
  async executeSequence(taskNames, options = {}) {
    if (this.isRunning) {
      throw new Error('自动化管理器正在运行中，请等待当前任务完成');
    }

    this.isRunning = true;
    const startTime = Date.now();
    const results = [];

    try {
      console.log(`🎯 开始执行任务序列: ${taskNames.join(', ')}`);

      // 解析所有任务的依赖
      const allTasks = [];
      const resolved = new Set();

      for (const taskName of taskNames) {
        const dependencies = this.resolveDependencies(taskName, resolved);
        allTasks.push(...dependencies);
      }

      // 去重并保持顺序
      const uniqueTasks = [];
      const seen = new Set();
      for (const task of allTasks) {
        if (!seen.has(task.name)) {
          uniqueTasks.push(task);
          seen.add(task.name);
        }
      }

      console.log(`📝 执行计划: ${uniqueTasks.map(t => t.name).join(' -> ')}`);

      // 执行任务
      for (const task of uniqueTasks) {
        const result = await this.executeTask(task.name, options);
        results.push(result);

        if (!result.success && !options.continueOnError) {
          console.error(`💥 任务失败，停止执行: ${task.name}`);
          break;
        }
      }

      const totalDuration = Date.now() - startTime;
      const successCount = results.filter(r => r.success).length;
      const failureCount = results.length - successCount;

      console.log(`\n📊 执行摘要:`);
      console.log(`总任务数: ${results.length}`);
      console.log(`成功: ${successCount}`);
      console.log(`失败: ${failureCount}`);
      console.log(`总耗时: ${totalDuration}ms`);

      return {
        success: failureCount === 0,
        results,
        totalDuration,
        successCount,
        failureCount
      };

    } finally {
      this.isRunning = false;
    }
  }

  /**
   * 执行预定义的工作流
   */
  async executeWorkflow(workflowName, options = {}) {
    const workflows = {
      'pre-commit': ['lint-fix', 'format-code', 'test-unit'],
      'pre-push': ['quality-check', 'test-unit', 'build'],
      'deploy-preview': ['quality-check', 'test-unit', 'build', 'deploy-preview'],
      'deploy-production': ['quality-check', 'test-unit', 'test-e2e', 'build', 'deploy-production'],
      'maintenance': ['dependency-update', 'security-audit', 'cleanup'],
      'full-test': ['quality-check', 'test-unit', 'test-coverage', 'test-e2e'],
      'docs-update': ['docs-generate', 'docs-deploy'],
      'db-setup': ['db-migrate', 'db-seed'],
      'release': ['quality-check', 'test-unit', 'test-e2e', 'build', 'build-analyze', 'deploy-production']
    };

    const tasks = workflows[workflowName];
    if (!tasks) {
      throw new Error(`未知的工作流: ${workflowName}`);
    }

    console.log(`🔄 执行工作流: ${workflowName}`);
    return await this.executeSequence(tasks, options);
  }

  /**
   * 获取执行历史
   */
  getExecutionHistory(limit = 50) {
    return this.executionHistory.slice(-limit);
  }

  /**
   * 清除执行历史
   */
  clearExecutionHistory() {
    this.executionHistory = [];
  }

  /**
   * 生成执行报告
   */
  async generateReport(outputPath = 'reports/automation-report.json') {
    const report = {
      timestamp: new Date().toISOString(),
      tasks: this.getAllTasks().map(task => ({
        name: task.name,
        description: task.description,
        command: task.command,
        dependencies: task.dependencies,
        options: task.options
      })),
      executionHistory: this.getExecutionHistory(),
      statistics: this.calculateStatistics()
    };

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(report, null, 2));
    
    console.log(`📄 自动化报告已生成: ${outputPath}`);
    return report;
  }

  /**
   * 计算统计信息
   */
  calculateStatistics() {
    const history = this.getExecutionHistory();
    
    if (history.length === 0) {
      return {
        totalExecutions: 0,
        successRate: 0,
        averageDuration: 0,
        taskStats: {}
      };
    }

    const successCount = history.filter(h => h.success).length;
    const totalDuration = history.reduce((sum, h) => sum + h.duration, 0);
    
    const taskStats = {};
    for (const record of history) {
      if (!taskStats[record.taskName]) {
        taskStats[record.taskName] = {
          executions: 0,
          successes: 0,
          failures: 0,
          totalDuration: 0,
          averageDuration: 0
        };
      }
      
      const stats = taskStats[record.taskName];
      stats.executions++;
      stats.totalDuration += record.duration;
      stats.averageDuration = stats.totalDuration / stats.executions;
      
      if (record.success) {
        stats.successes++;
      } else {
        stats.failures++;
      }
    }

    return {
      totalExecutions: history.length,
      successRate: (successCount / history.length) * 100,
      averageDuration: totalDuration / history.length,
      taskStats
    };
  }

  /**
   * 显示帮助信息
   */
  showHelp() {
    console.log(`
🤖 自动化管理器 - 使用说明

命令格式:
  node scripts/automationManager.js <command> [options]

可用命令:
  list                    - 列出所有可用任务
  run <task>             - 执行单个任务
  sequence <task1,task2> - 执行任务序列
  workflow <name>        - 执行预定义工作流
  history               - 显示执行历史
  report                - 生成执行报告
  help                  - 显示此帮助信息

可用工作流:
  pre-commit            - 提交前检查
  pre-push              - 推送前检查
  deploy-preview        - 部署到预览环境
  deploy-production     - 部署到生产环境
  maintenance           - 维护任务
  full-test             - 完整测试
  docs-update           - 更新文档
  db-setup              - 数据库设置
  release               - 发布流程

选项:
  --continue-on-error   - 出错时继续执行
  --timeout <ms>        - 设置超时时间
  --dry-run             - 仅显示执行计划，不实际执行

示例:
  node scripts/automationManager.js run quality-check
  node scripts/automationManager.js sequence "lint-fix,test-unit,build"
  node scripts/automationManager.js workflow pre-commit
  node scripts/automationManager.js workflow deploy-production --continue-on-error
`);
  }
}

// 命令行接口
async function main() {
  const manager = new AutomationManager();
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    manager.showHelp();
    return;
  }

  const command = args[0];
  const options = {};
  
  // 解析选项
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--continue-on-error') {
      options.continueOnError = true;
    } else if (args[i] === '--timeout' && i + 1 < args.length) {
      options.timeout = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--dry-run') {
      options.dryRun = true;
    }
  }

  try {
    switch (command) {
      case 'list':
        console.log('📋 可用任务:');
        manager.getAllTasks().forEach(task => {
          console.log(`  ${task.name.padEnd(20)} - ${task.description}`);
        });
        break;

      case 'run':
        if (args.length < 2) {
          console.error('❌ 请指定要执行的任务名称');
          return;
        }
        await manager.executeTask(args[1], options);
        break;

      case 'sequence':
        if (args.length < 2) {
          console.error('❌ 请指定要执行的任务序列');
          return;
        }
        const tasks = args[1].split(',').map(t => t.trim());
        await manager.executeSequence(tasks, options);
        break;

      case 'workflow':
        if (args.length < 2) {
          console.error('❌ 请指定要执行的工作流名称');
          return;
        }
        await manager.executeWorkflow(args[1], options);
        break;

      case 'history':
        const history = manager.getExecutionHistory();
        console.log('📜 执行历史:');
        history.forEach(record => {
          const status = record.success ? '✅' : '❌';
          const duration = `${record.duration}ms`;
          console.log(`  ${status} ${record.taskName.padEnd(20)} ${duration.padStart(8)} - ${record.description}`);
        });
        break;

      case 'report':
        await manager.generateReport();
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
const isMainModule = process.argv[1] && process.argv[1].endsWith('automationManager.js');
if (isMainModule) {
  main().catch(error => {
    console.error('💥 程序异常:', error);
    process.exit(1);
  });
}

export { AutomationManager, AutomationTask };