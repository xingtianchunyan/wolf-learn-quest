/**
 * 文件级注释：快速开发脚本
 * 提供快速启动开发环境的工具
 */

import { spawn } from 'child_process';
import { debugTools } from './debugTools.js';

/**
 * 快速开发工具类
 */
class QuickDev {
  constructor() {
    this.processes = new Map();
  }

  /**
   * 启动开发服务器
   */
  async startDevServer() {
    debugTools.info('启动开发服务器...');

    const devProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      shell: true,
    });

    this.processes.set('dev', devProcess);

    devProcess.on('exit', code => {
      debugTools.info(`开发服务器退出，代码: ${code}`);
    });

    return devProcess;
  }

  /**
   * 启动测试监视器
   */
  async startTestWatcher() {
    debugTools.info('启动测试监视器...');

    const testProcess = spawn('npm', ['run', 'test'], {
      stdio: 'inherit',
      shell: true,
    });

    this.processes.set('test', testProcess);

    testProcess.on('exit', code => {
      debugTools.info(`测试监视器退出，代码: ${code}`);
    });

    return testProcess;
  }

  /**
   * 启动类型检查监视器
   */
  async startTypeChecker() {
    debugTools.info('启动类型检查监视器...');

    const typeProcess = spawn('npx', ['tsc', '--noEmit', '--watch'], {
      stdio: 'inherit',
      shell: true,
    });

    this.processes.set('type', typeProcess);

    typeProcess.on('exit', code => {
      debugTools.info(`类型检查器退出，代码: ${code}`);
    });

    return typeProcess;
  }

  /**
   * 停止所有进程
   */
  stopAll() {
    debugTools.info('停止所有开发进程...');

    for (const [name, process] of this.processes) {
      debugTools.info(`停止 ${name} 进程...`);
      process.kill();
    }

    this.processes.clear();
  }

  /**
   * 启动完整开发环境
   */
  async startFullDev() {
    debugTools.info('启动完整开发环境...');

    // 并行启动所有服务
    await Promise.all([
      this.startDevServer(),
      this.startTestWatcher(),
      this.startTypeChecker(),
    ]);

    // 监听退出信号
    process.on('SIGINT', () => {
      this.stopAll();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      this.stopAll();
      process.exit(0);
    });
  }
}

// 如果直接运行此脚本
if (import.meta.url.endsWith(process.argv[1])) {
  const quickDev = new QuickDev();

  const command = process.argv[2] || 'full';

  switch (command) {
    case 'dev':
      quickDev.startDevServer();
      break;
    case 'test':
      quickDev.startTestWatcher();
      break;
    case 'type':
      quickDev.startTypeChecker();
      break;
    case 'full':
    default:
      quickDev.startFullDev();
      break;
  }
}

export { QuickDev };
