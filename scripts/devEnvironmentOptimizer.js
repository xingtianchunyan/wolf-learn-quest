/**
 * 文件级注释：开发环境优化器
 * 自动配置和优化开发环境，提升开发体验
 * 包括代码质量工具、调试配置、自动化流程等
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 开发环境优化器类
 */
class DevEnvironmentOptimizer {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.optimizations = [];
    this.errors = [];
  }

  /**
   * 执行所有优化
   */
  async optimizeAll() {
    console.log('🚀 开始优化开发环境...\n');

    try {
      await this.optimizeVSCodeSettings();
      await this.optimizeGitHooks();
      await this.optimizeDebugConfig();
      await this.optimizeWorkflowScripts();
      await this.optimizeDependencyManagement();

      this.generateReport();
    } catch (error) {
      console.error('❌ 优化过程中发生错误:', error.message);
      process.exit(1);
    }
  }

  /**
   * 优化VSCode设置
   */
  async optimizeVSCodeSettings() {
    console.log('⚙️  优化VSCode设置...');

    const vscodeDir = path.join(this.projectRoot, '.vscode');

    // 确保.vscode目录存在
    if (!fs.existsSync(vscodeDir)) {
      fs.mkdirSync(vscodeDir, { recursive: true });
    }

    // 创建settings.json
    const settingsPath = path.join(vscodeDir, 'settings.json');
    const settings = {
      'typescript.preferences.importModuleSpecifier': 'relative',
      'typescript.suggest.autoImports': true,
      'typescript.updateImportsOnFileMove.enabled': 'always',
      'editor.formatOnSave': true,
      'editor.codeActionsOnSave': {
        'source.fixAll.eslint': 'explicit',
        'source.organizeImports': 'explicit',
      },
      'eslint.validate': [
        'javascript',
        'javascriptreact',
        'typescript',
        'typescriptreact',
      ],
      'files.associations': {
        '*.css': 'tailwindcss',
      },
      'emmet.includeLanguages': {
        javascript: 'javascriptreact',
        typescript: 'typescriptreact',
      },
      'tailwindCSS.experimental.classRegex': [
        ['cva\\(([^)]*)\\)', '["\'`]([^"\'`]*).*?["\'`]'],
        ['cx\\(([^)]*)\\)', "(?:'|\"|`)([^']*)(?:'|\"|`)"],
      ],
      'search.exclude': {
        '**/node_modules': true,
        '**/dist': true,
        '**/coverage': true,
        '**/.git': true,
      },
      'files.watcherExclude': {
        '**/node_modules/**': true,
        '**/dist/**': true,
        '**/coverage/**': true,
      },
    };

    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    this.optimizations.push('VSCode设置已优化');

    // 创建extensions.json
    const extensionsPath = path.join(vscodeDir, 'extensions.json');
    const extensions = {
      recommendations: [
        'bradlc.vscode-tailwindcss',
        'esbenp.prettier-vscode',
        'dbaeumer.vscode-eslint',
        'ms-vscode.vscode-typescript-next',
        'formulahendry.auto-rename-tag',
        'christian-kohler.path-intellisense',
        'ms-vscode.vscode-json',
        'usernamehw.errorlens',
        'gruntfuggly.todo-tree',
        'ms-vscode.test-adapter-converter',
      ],
    };

    fs.writeFileSync(extensionsPath, JSON.stringify(extensions, null, 2));
    this.optimizations.push('VSCode扩展推荐已配置');

    // 创建launch.json用于调试
    const launchPath = path.join(vscodeDir, 'launch.json');
    const launch = {
      version: '0.2.0',
      configurations: [
        {
          name: '启动开发服务器',
          type: 'node',
          request: 'launch',
          program: '${workspaceFolder}/node_modules/.bin/vite',
          args: ['dev'],
          console: 'integratedTerminal',
          env: {
            NODE_ENV: 'development',
          },
        },
        {
          name: '运行测试',
          type: 'node',
          request: 'launch',
          program: '${workspaceFolder}/node_modules/.bin/vitest',
          args: ['run'],
          console: 'integratedTerminal',
        },
        {
          name: '调试测试',
          type: 'node',
          request: 'launch',
          program: '${workspaceFolder}/node_modules/.bin/vitest',
          args: ['--inspect-brk'],
          console: 'integratedTerminal',
          port: 9229,
        },
      ],
    };

    fs.writeFileSync(launchPath, JSON.stringify(launch, null, 2));
    this.optimizations.push('VSCode调试配置已创建');
  }

  /**
   * 优化Git Hooks
   */
  async optimizeGitHooks() {
    console.log('🔗 优化Git Hooks...');

    const hooksDir = path.join(this.projectRoot, '.git', 'hooks');

    if (!fs.existsSync(hooksDir)) {
      console.warn('⚠️  Git hooks目录不存在，跳过Git hooks优化');
      return;
    }

    // 创建pre-commit hook
    const preCommitPath = path.join(hooksDir, 'pre-commit');
    const preCommitScript = `#!/bin/sh
# Pre-commit hook for code quality checks

echo "🔍 运行代码质量检查..."

# 运行类型检查
npm run type-check
if [ $? -ne 0 ]; then
  echo "❌ TypeScript类型检查失败"
  exit 1
fi

# 运行命名规范检查
npm run check:naming
if [ $? -ne 0 ]; then
  echo "❌ 命名规范检查失败"
  exit 1
fi

# 运行ESLint
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ ESLint检查失败"
  exit 1
fi

echo "✅ 所有检查通过，允许提交"
`;

    fs.writeFileSync(preCommitPath, preCommitScript);
    fs.chmodSync(preCommitPath, '755');
    this.optimizations.push('Pre-commit hook已配置');

    // 创建pre-push hook
    const prePushPath = path.join(hooksDir, 'pre-push');
    const prePushScript = `#!/bin/sh
# Pre-push hook for comprehensive testing

echo "🧪 运行完整测试套件..."

# 运行所有测试
npm run test:run
if [ $? -ne 0 ]; then
  echo "❌ 测试失败，推送被阻止"
  exit 1
fi

echo "✅ 所有测试通过，允许推送"
`;

    fs.writeFileSync(prePushPath, prePushScript);
    fs.chmodSync(prePushPath, '755');
    this.optimizations.push('Pre-push hook已配置');
  }

  /**
   * 优化调试配置
   */
  async optimizeDebugConfig() {
    console.log('🐛 优化调试配置...');

    // 创建调试工具脚本
    const debugToolsPath = path.join(
      this.projectRoot,
      'scripts',
      'debugTools.js'
    );
    const debugToolsContent = `/**
 * 文件级注释：调试工具集
 * 提供统一的调试工具和日志管理
 */

/**
 * 调试工具类
 */
class DebugTools {
  constructor() {
    this.isDebugMode = process.env.NODE_ENV === 'development';
    this.logLevel = process.env.LOG_LEVEL || 'info';
  }

  /**
   * 调试日志
   * @param {string} message - 日志消息
   * @param {any} data - 附加数据
   */
  debug(message, data = null) {
    if (this.isDebugMode) {
      console.log(\`🐛 [\${new Date().toISOString()}] DEBUG: \${message}\`, data || '');
    }
  }

  /**
   * 信息日志
   * @param {string} message - 日志消息
   * @param {any} data - 附加数据
   */
  info(message, data = null) {
    console.log(\`ℹ️  [\${new Date().toISOString()}] INFO: \${message}\`, data || '');
  }

  /**
   * 警告日志
   * @param {string} message - 日志消息
   * @param {any} data - 附加数据
   */
  warn(message, data = null) {
    console.warn(\`⚠️  [\${new Date().toISOString()}] WARN: \${message}\`, data || '');
  }

  /**
   * 错误日志
   * @param {string} message - 日志消息
   * @param {any} error - 错误对象
   */
  error(message, error = null) {
    console.error(\`❌ [\${new Date().toISOString()}] ERROR: \${message}\`, error || '');
  }

  /**
   * 性能测量
   * @param {string} label - 测量标签
   * @param {Function} fn - 要测量的函数
   */
  async measure(label, fn) {
    const start = performance.now();
    try {
      const result = await fn();
      const end = performance.now();
      this.debug(\`Performance [\${label}]: \${(end - start).toFixed(2)}ms\`);
      return result;
    } catch (error) {
      const end = performance.now();
      this.error(\`Performance [\${label}] failed after \${(end - start).toFixed(2)}ms\`, error);
      throw error;
    }
  }

  /**
   * 内存使用情况
   */
  memoryUsage() {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const usage = process.memoryUsage();
      this.debug('Memory Usage:', {
        rss: \`\${Math.round(usage.rss / 1024 / 1024)}MB\`,
        heapTotal: \`\${Math.round(usage.heapTotal / 1024 / 1024)}MB\`,
        heapUsed: \`\${Math.round(usage.heapUsed / 1024 / 1024)}MB\`,
        external: \`\${Math.round(usage.external / 1024 / 1024)}MB\`
      });
    }
  }
}

// 导出单例实例
export const debugTools = new DebugTools();
export default debugTools;
`;

    fs.writeFileSync(debugToolsPath, debugToolsContent);
    this.optimizations.push('调试工具已创建');
  }

  /**
   * 优化工作流脚本
   */
  async optimizeWorkflowScripts() {
    console.log('⚡ 优化工作流脚本...');

    // 创建快速开发脚本
    const quickDevPath = path.join(this.projectRoot, 'scripts', 'quickDev.js');
    const quickDevContent = `/**
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
      shell: true
    });

    this.processes.set('dev', devProcess);
    
    devProcess.on('exit', (code) => {
      debugTools.info(\`开发服务器退出，代码: \${code}\`);
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
      shell: true
    });

    this.processes.set('test', testProcess);
    
    testProcess.on('exit', (code) => {
      debugTools.info(\`测试监视器退出，代码: \${code}\`);
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
      shell: true
    });

    this.processes.set('type', typeProcess);
    
    typeProcess.on('exit', (code) => {
      debugTools.info(\`类型检查器退出，代码: \${code}\`);
    });

    return typeProcess;
  }

  /**
   * 停止所有进程
   */
  stopAll() {
    debugTools.info('停止所有开发进程...');
    
    for (const [name, process] of this.processes) {
      debugTools.info(\`停止 \${name} 进程...\`);
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
      this.startTypeChecker()
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
`;

    fs.writeFileSync(quickDevPath, quickDevContent);
    this.optimizations.push('快速开发脚本已创建');

    // 更新package.json添加新的脚本
    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    packageJson.scripts = {
      ...packageJson.scripts,
      'dev:full': 'node scripts/quickDev.js full',
      'dev:watch': 'node scripts/quickDev.js dev',
      'test:watch': 'node scripts/quickDev.js test',
      'type:watch': 'node scripts/quickDev.js type',
      'debug:tools': 'node scripts/debugTools.js',
      'env:optimize': 'node scripts/devEnvironmentOptimizer.js',
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    this.optimizations.push('Package.json脚本已更新');
  }

  /**
   * 优化依赖管理
   */
  async optimizeDependencyManagement() {
    console.log('📦 优化依赖管理...');

    // 创建依赖分析脚本
    const depAnalyzerPath = path.join(
      this.projectRoot,
      'scripts',
      'dependencyAnalyzer.js'
    );
    const depAnalyzerContent = `/**
 * 文件级注释：依赖分析器
 * 分析项目依赖，检测过时包和安全漏洞
 */

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { debugTools } from './debugTools.js';

/**
 * 依赖分析器类
 */
class DependencyAnalyzer {
  constructor() {
    this.projectRoot = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
    this.packageJsonPath = path.join(this.projectRoot, 'package.json');
  }

  /**
   * 分析过时的依赖
   */
  async analyzeOutdated() {
    debugTools.info('分析过时的依赖...');
    
    return new Promise((resolve, reject) => {
      const process = spawn('npm', ['outdated', '--json'], {
        shell: true,
        cwd: this.projectRoot
      });

      let output = '';
      process.stdout.on('data', (data) => {
        output += data.toString();
      });

      process.on('close', (code) => {
        try {
          const outdated = output ? JSON.parse(output) : {};
          debugTools.info(\`发现 \${Object.keys(outdated).length} 个过时的依赖\`);
          resolve(outdated);
        } catch (error) {
          debugTools.warn('解析过时依赖信息失败', error);
          resolve({});
        }
      });

      process.on('error', reject);
    });
  }

  /**
   * 安全审计
   */
  async securityAudit() {
    debugTools.info('执行安全审计...');
    
    return new Promise((resolve, reject) => {
      const process = spawn('npm', ['audit', '--json'], {
        shell: true,
        cwd: this.projectRoot
      });

      let output = '';
      process.stdout.on('data', (data) => {
        output += data.toString();
      });

      process.on('close', (code) => {
        try {
          const audit = output ? JSON.parse(output) : {};
          debugTools.info(\`安全审计完成，发现 \${audit.metadata?.vulnerabilities?.total || 0} 个漏洞\`);
          resolve(audit);
        } catch (error) {
          debugTools.warn('解析安全审计信息失败', error);
          resolve({});
        }
      });

      process.on('error', reject);
    });
  }

  /**
   * 生成依赖报告
   */
  async generateReport() {
    debugTools.info('生成依赖分析报告...');
    
    const [outdated, audit] = await Promise.all([
      this.analyzeOutdated(),
      this.securityAudit()
    ]);

    const report = {
      timestamp: new Date().toISOString(),
      outdated,
      security: audit,
      recommendations: this.generateRecommendations(outdated, audit)
    };

    const reportPath = path.join(this.projectRoot, 'reports', 'dependency-analysis.json');
    const reportsDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    debugTools.info(\`依赖分析报告已保存到: \${reportPath}\`);
    
    return report;
  }

  /**
   * 生成建议
   * @param {Object} outdated - 过时依赖信息
   * @param {Object} audit - 安全审计信息
   * @returns {Array} 建议列表
   */
  generateRecommendations(outdated, audit) {
    const recommendations = [];

    // 过时依赖建议
    Object.keys(outdated).forEach(pkg => {
      const info = outdated[pkg];
      recommendations.push({
        type: 'outdated',
        package: pkg,
        current: info.current,
        wanted: info.wanted,
        latest: info.latest,
        action: \`更新 \${pkg} 从 \${info.current} 到 \${info.latest}\`
      });
    });

    // 安全漏洞建议
    if (audit.vulnerabilities) {
      Object.keys(audit.vulnerabilities).forEach(level => {
        const count = audit.vulnerabilities[level];
        if (count > 0) {
          recommendations.push({
            type: 'security',
            level,
            count,
            action: \`修复 \${count} 个 \${level} 级别的安全漏洞\`
          });
        }
      });
    }

    return recommendations;
  }
}

// 如果直接运行此脚本
if (import.meta.url.endsWith(process.argv[1])) {
  const analyzer = new DependencyAnalyzer();
  analyzer.generateReport().catch(console.error);
}

export { DependencyAnalyzer };
`;

    fs.writeFileSync(depAnalyzerPath, depAnalyzerContent);
    this.optimizations.push('依赖分析器已创建');
  }

  /**
   * 生成优化报告
   */
  generateReport() {
    console.log('\n📊 开发环境优化报告');
    console.log('='.repeat(50));

    console.log(`\n✅ 完成的优化 (${this.optimizations.length}):`);
    this.optimizations.forEach((optimization, index) => {
      console.log(`  ${index + 1}. ${optimization}`);
    });

    if (this.errors.length > 0) {
      console.log(`\n❌ 优化错误 (${this.errors.length}):`);
      this.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    }

    console.log('\n🎉 开发环境优化完成！');
    console.log('\n📚 使用以下命令启动优化后的开发环境:');
    console.log('  npm run dev:full    # 启动完整开发环境');
    console.log('  npm run dev:watch   # 仅启动开发服务器');
    console.log('  npm run test:watch  # 仅启动测试监视器');
    console.log('  npm run type:watch  # 仅启动类型检查器');
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    const optimizer = new DevEnvironmentOptimizer();
    await optimizer.optimizeAll();
  } catch (error) {
    console.error('❌ 优化失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (
  import.meta.url.endsWith(process.argv[1]) ||
  process.argv[1].endsWith('devEnvironmentOptimizer.js')
) {
  main();
}

export { DevEnvironmentOptimizer };
