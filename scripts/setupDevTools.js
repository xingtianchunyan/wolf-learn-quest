/**
 * 开发工具自动配置脚本
 *
 * 功能：
 * - 配置 Git Hooks
 * - 设置 VS Code 配置
 * - 创建调试配置
 * - 配置 CI/CD 工作流
 * - 设置代码质量工具
 *
 * @author AI Assistant
 * @version 1.0.0
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * 开发工具配置器类
 */
class DevToolsSetup {
  /**
   * 构造函数
   * @param {Object} options - 配置选项
   */
  constructor(options = {}) {
    this.options = {
      setupGitHooks: true,
      setupVSCode: true,
      setupDebugger: true,
      setupCI: true,
      setupQuality: true,
      ...options,
    };
  }

  /**
   * 运行所有配置
   */
  async setupAll() {
    console.log('🛠️ 开始配置开发工具...\n');

    try {
      if (this.options.setupGitHooks) {
        await this.setupGitHooks();
      }

      if (this.options.setupVSCode) {
        await this.setupVSCodeConfig();
      }

      if (this.options.setupDebugger) {
        await this.setupDebugConfig();
      }

      if (this.options.setupCI) {
        await this.setupCIConfig();
      }

      if (this.options.setupQuality) {
        await this.setupQualityTools();
      }

      console.log('\n✅ 开发工具配置完成！');
      this.printUsageInstructions();
    } catch (error) {
      console.error('❌ 配置过程中出现错误:', error.message);
      process.exit(1);
    }
  }

  /**
   * 配置 Git Hooks
   */
  async setupGitHooks() {
    console.log('🔗 配置 Git Hooks...');

    const hooksDir = '.git/hooks';
    if (!fs.existsSync(hooksDir)) {
      console.log('⚠️ Git 仓库未初始化，跳过 Git Hooks 配置');
      return;
    }

    // Pre-commit hook
    const preCommitHook = `#!/bin/sh
# Pre-commit hook for code quality checks

echo "🔍 运行 pre-commit 检查..."

# 1. 运行 ESLint
echo "📋 检查代码规范..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ ESLint 检查失败，请修复后再提交"
  exit 1
fi

# 2. 运行 Prettier
echo "🎨 检查代码格式..."
npm run format:check
if [ $? -ne 0 ]; then
  echo "❌ 代码格式不符合规范，运行 npm run format 修复"
  exit 1
fi

# 3. 运行 TypeScript 检查
echo "🔧 检查类型..."
npm run type-check
if [ $? -ne 0 ]; then
  echo "❌ TypeScript 检查失败，请修复类型错误"
  exit 1
fi

# 4. 运行测试
echo "🧪 运行测试..."
npm run test:run
if [ $? -ne 0 ]; then
  echo "❌ 测试失败，请修复后再提交"
  exit 1
fi

echo "✅ Pre-commit 检查通过"
`;

    // Pre-push hook
    const prePushHook = `#!/bin/sh
# Pre-push hook for comprehensive checks

echo "🚀 运行 pre-push 检查..."

# 1. 运行完整的代码质量检查
echo "📊 运行代码质量检查..."
node scripts/codeQualityChecker.js
if [ $? -ne 0 ]; then
  echo "❌ 代码质量检查失败"
  exit 1
fi

# 2. 运行构建测试
echo "🏗️ 测试构建..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ 构建失败"
  exit 1
fi

echo "✅ Pre-push 检查通过"
`;

    // 写入 hooks
    fs.writeFileSync(path.join(hooksDir, 'pre-commit'), preCommitHook);
    fs.writeFileSync(path.join(hooksDir, 'pre-push'), prePushHook);

    // 设置执行权限 (Windows 下可能不需要)
    try {
      execSync('chmod +x .git/hooks/pre-commit');
      execSync('chmod +x .git/hooks/pre-push');
    } catch (error) {
      // Windows 下忽略权限设置错误
    }

    console.log('✅ Git Hooks 配置完成');
  }

  /**
   * 配置 VS Code 设置
   */
  async setupVSCodeConfig() {
    console.log('💻 配置 VS Code 设置...');

    const vscodeDir = '.vscode';
    if (!fs.existsSync(vscodeDir)) {
      fs.mkdirSync(vscodeDir);
    }

    // VS Code 设置
    const settings = {
      'editor.formatOnSave': true,
      'editor.codeActionsOnSave': {
        'source.fixAll.eslint': 'explicit',
        'source.organizeImports': 'explicit',
      },
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
      'typescript.preferences.importModuleSpecifier': 'relative',
      'typescript.suggest.autoImports': true,
      'typescript.updateImportsOnFileMove.enabled': 'always',
      'eslint.validate': [
        'javascript',
        'javascriptreact',
        'typescript',
        'typescriptreact',
      ],
      'files.associations': {
        '*.tsx': 'typescriptreact',
        '*.ts': 'typescript',
      },
      'emmet.includeLanguages': {
        typescriptreact: 'html',
      },
      'editor.tabSize': 2,
      'editor.insertSpaces': true,
      'files.trimTrailingWhitespace': true,
      'files.insertFinalNewline': true,
      'search.exclude': {
        '**/node_modules': true,
        '**/dist': true,
        '**/.git': true,
        '**/coverage': true,
      },
    };

    // 推荐扩展
    const extensions = {
      recommendations: [
        'esbenp.prettier-vscode',
        'dbaeumer.vscode-eslint',
        'bradlc.vscode-tailwindcss',
        'ms-vscode.vscode-typescript-next',
        'formulahendry.auto-rename-tag',
        'christian-kohler.path-intellisense',
        'ms-vscode.vscode-json',
        'usernamehw.errorlens',
        'gruntfuggly.todo-tree',
        'streetsidesoftware.code-spell-checker',
      ],
    };

    // 任务配置
    const tasks = {
      version: '2.0.0',
      tasks: [
        {
          label: 'dev',
          type: 'npm',
          script: 'dev',
          group: 'build',
          presentation: {
            echo: true,
            reveal: 'always',
            focus: false,
            panel: 'shared',
          },
          problemMatcher: [],
        },
        {
          label: 'build',
          type: 'npm',
          script: 'build',
          group: {
            kind: 'build',
            isDefault: true,
          },
          presentation: {
            echo: true,
            reveal: 'silent',
            focus: false,
            panel: 'shared',
          },
          problemMatcher: ['$tsc'],
        },
        {
          label: 'test',
          type: 'npm',
          script: 'test',
          group: {
            kind: 'test',
            isDefault: true,
          },
          presentation: {
            echo: true,
            reveal: 'always',
            focus: false,
            panel: 'shared',
          },
        },
        {
          label: 'lint',
          type: 'npm',
          script: 'lint',
          group: 'build',
          presentation: {
            echo: true,
            reveal: 'silent',
            focus: false,
            panel: 'shared',
          },
          problemMatcher: ['$eslint-stylish'],
        },
        {
          label: 'quality-check',
          type: 'shell',
          command: 'node',
          args: ['scripts/codeQualityChecker.js', '--verbose'],
          group: 'build',
          presentation: {
            echo: true,
            reveal: 'always',
            focus: false,
            panel: 'shared',
          },
        },
      ],
    };

    // 写入配置文件
    fs.writeFileSync(
      path.join(vscodeDir, 'settings.json'),
      JSON.stringify(settings, null, 2)
    );

    fs.writeFileSync(
      path.join(vscodeDir, 'extensions.json'),
      JSON.stringify(extensions, null, 2)
    );

    fs.writeFileSync(
      path.join(vscodeDir, 'tasks.json'),
      JSON.stringify(tasks, null, 2)
    );

    console.log('✅ VS Code 配置完成');
  }

  /**
   * 配置调试设置
   */
  async setupDebugConfig() {
    console.log('🐛 配置调试设置...');

    const vscodeDir = '.vscode';
    if (!fs.existsSync(vscodeDir)) {
      fs.mkdirSync(vscodeDir);
    }

    // 调试配置
    const launch = {
      version: '0.2.0',
      configurations: [
        {
          name: 'Launch Chrome',
          type: 'chrome',
          request: 'launch',
          url: 'http://localhost:5173',
          webRoot: '${workspaceFolder}/src',
          sourceMaps: true,
          userDataDir: '${workspaceFolder}/.vscode/chrome-debug-profile',
        },
        {
          name: 'Attach to Chrome',
          type: 'chrome',
          request: 'attach',
          port: 9222,
          webRoot: '${workspaceFolder}/src',
        },
        {
          name: 'Debug Tests',
          type: 'node',
          request: 'launch',
          program: '${workspaceFolder}/node_modules/vitest/vitest.mjs',
          args: ['run', '--reporter=verbose'],
          cwd: '${workspaceFolder}',
          console: 'integratedTerminal',
          internalConsoleOptions: 'neverOpen',
        },
        {
          name: 'Debug Current Test File',
          type: 'node',
          request: 'launch',
          program: '${workspaceFolder}/node_modules/vitest/vitest.mjs',
          args: ['run', '${relativeFile}'],
          cwd: '${workspaceFolder}',
          console: 'integratedTerminal',
          internalConsoleOptions: 'neverOpen',
        },
      ],
    };

    fs.writeFileSync(
      path.join(vscodeDir, 'launch.json'),
      JSON.stringify(launch, null, 2)
    );

    // 创建调试工具脚本
    const debugScript = `/**
 * 调试工具脚本
 * 
 * 提供各种调试功能：
 * - 性能监控
 * - 错误追踪
 * - 状态检查
 * 
 * @author AI Assistant
 */

/**
 * 性能监控工具
 */
export class PerformanceMonitor {
  /**
   * 开始性能监控
   * @param {string} label - 监控标签
   */
  static start(label) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(\`\${label}-start\`);
    }
    console.time(label);
  }

  /**
   * 结束性能监控
   * @param {string} label - 监控标签
   */
  static end(label) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(\`\${label}-end\`);
      window.performance.measure(label, \`\${label}-start\`, \`\${label}-end\`);
      
      const measure = window.performance.getEntriesByName(label)[0];
      console.log(\`⏱️ \${label}: \${measure.duration.toFixed(2)}ms\`);
    }
    console.timeEnd(label);
  }
}

/**
 * 错误追踪工具
 */
export class ErrorTracker {
  /**
   * 记录错误
   * @param {Error} error - 错误对象
   * @param {Object} context - 上下文信息
   */
  static track(error, context = {}) {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Node.js',
      url: typeof window !== 'undefined' ? window.location.href : 'N/A'
    };

    console.error('🚨 错误追踪:', errorInfo);
    
    // 在开发环境下可以发送到错误追踪服务
    if (process.env.NODE_ENV === 'development') {
      // 这里可以集成 Sentry 等错误追踪服务
    }
  }
}

/**
 * 状态检查工具
 */
export class StateChecker {
  /**
   * 检查组件状态
   * @param {string} componentName - 组件名称
   * @param {Object} state - 状态对象
   */
  static checkState(componentName, state) {
    console.group(\`🔍 \${componentName} 状态检查\`);
    console.log('状态:', state);
    console.log('状态类型:', typeof state);
    console.log('是否为空:', state == null);
    console.log('键数量:', Object.keys(state || {}).length);
    console.groupEnd();
  }

  /**
   * 检查 Props
   * @param {string} componentName - 组件名称
   * @param {Object} props - Props 对象
   */
  static checkProps(componentName, props) {
    console.group(\`📋 \${componentName} Props 检查\`);
    console.log('Props:', props);
    console.log('Props 类型:', typeof props);
    console.log('Props 键:', Object.keys(props || {}));
    console.groupEnd();
  }
}

/**
 * 开发工具助手
 */
export class DevHelper {
  /**
   * 显示组件树
   * @param {ReactElement} element - React 元素
   * @param {number} depth - 深度
   */
  static logComponentTree(element, depth = 0) {
    if (!element) return;
    
    const indent = '  '.repeat(depth);
    const name = element.type?.name || element.type || 'Unknown';
    
    console.log(\`\${indent}📦 \${name}\`);
    
    if (element.props?.children) {
      const children = Array.isArray(element.props.children) 
        ? element.props.children 
        : [element.props.children];
      
      children.forEach(child => {
        if (typeof child === 'object' && child !== null) {
          DevHelper.logComponentTree(child, depth + 1);
        }
      });
    }
  }

  /**
   * 性能分析
   */
  static analyzePerformance() {
    if (typeof window === 'undefined') return;
    
    const navigation = window.performance.getEntriesByType('navigation')[0];
    const paint = window.performance.getEntriesByType('paint');
    
    console.group('🚀 性能分析');
    console.log('页面加载时间:', navigation.loadEventEnd - navigation.fetchStart, 'ms');
    console.log('DOM 解析时间:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'ms');
    
    paint.forEach(entry => {
      console.log(\`\${entry.name}:\`, entry.startTime, 'ms');
    });
    
    console.groupEnd();
  }
}

// 全局调试工具
if (typeof window !== 'undefined') {
  window.DevTools = {
    PerformanceMonitor,
    ErrorTracker,
    StateChecker,
    DevHelper
  };
}
`;

    fs.writeFileSync('src/utils/debugTools.ts', debugScript);

    console.log('✅ 调试配置完成');
  }

  /**
   * 配置 CI/CD
   */
  async setupCIConfig() {
    console.log('🔄 配置 CI/CD 工作流...');

    const githubDir = '.github/workflows';
    if (!fs.existsSync('.github')) {
      fs.mkdirSync('.github');
    }
    if (!fs.existsSync(githubDir)) {
      fs.mkdirSync(githubDir);
    }

    // GitHub Actions 工作流
    const ciWorkflow = `name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  quality-check:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run ESLint
      run: npm run lint
      
    - name: Run Prettier check
      run: npm run format:check
      
    - name: Run TypeScript check
      run: npm run type-check
      
    - name: Run tests
      run: npm run test:run
      
    - name: Run code quality check
      run: node scripts/codeQualityChecker.js --json
      
    - name: Upload quality report
      uses: actions/upload-artifact@v4
      if: always()
      with:
        name: quality-report
        path: quality-report.json

  build:
    needs: quality-check
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build project
      run: npm run build
      
    - name: Upload build artifacts
      uses: actions/upload-artifact@v4
      with:
        name: build-files
        path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Download build artifacts
      uses: actions/download-artifact@v4
      with:
        name: build-files
        path: dist/
        
    - name: Deploy to staging
      run: echo "部署到预发布环境"
      # 这里添加实际的部署脚本
`;

    fs.writeFileSync(path.join(githubDir, 'ci.yml'), ciWorkflow);

    console.log('✅ CI/CD 配置完成');
  }

  /**
   * 配置质量工具
   */
  async setupQualityTools() {
    console.log('🔧 配置代码质量工具...');

    // 创建质量检查配置文件
    const qualityConfig = {
      rules: {
        complexity: {
          max: 10,
          warn: 8,
        },
        fileLength: {
          max: 300,
          warn: 250,
        },
        duplication: {
          minLines: 5,
          minTokens: 50,
        },
        coverage: {
          minimum: 80,
          warn: 60,
        },
      },
      ignore: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/node_modules/**',
        '**/dist/**',
        '**/*.config.*',
      ],
    };

    fs.writeFileSync(
      'quality.config.json',
      JSON.stringify(qualityConfig, null, 2)
    );

    // 创建代码质量检查脚本的快捷方式
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    // 添加新的脚本命令
    packageJson.scripts = {
      ...packageJson.scripts,
      quality: 'node scripts/codeQualityChecker.js',
      'quality:fix': 'node scripts/codeQualityChecker.js --fix',
      'quality:verbose': 'node scripts/codeQualityChecker.js --verbose',
      'quality:json': 'node scripts/codeQualityChecker.js --json',
      'dev:setup': 'node scripts/setupDevTools.js',
      'pre-commit':
        'npm run lint && npm run format:check && npm run type-check && npm run test:run',
      'pre-push': 'npm run quality && npm run build',
    };

    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

    console.log('✅ 质量工具配置完成');
  }

  /**
   * 打印使用说明
   */
  printUsageInstructions() {
    console.log('\n📖 使用说明:');
    console.log('='.repeat(50));

    console.log('\n🔧 代码质量检查:');
    console.log('  npm run quality          # 运行完整质量检查');
    console.log('  npm run quality:fix      # 自动修复可修复的问题');
    console.log('  npm run quality:verbose  # 详细输出');
    console.log('  npm run quality:json     # 生成 JSON 报告');

    console.log('\n🔗 Git Hooks:');
    console.log('  pre-commit   # 提交前自动运行代码检查');
    console.log('  pre-push     # 推送前运行完整质量检查');

    console.log('\n💻 VS Code:');
    console.log('  - 自动格式化和 ESLint 修复');
    console.log('  - 推荐扩展已配置');
    console.log('  - 调试配置已就绪');

    console.log('\n🐛 调试工具:');
    console.log('  - F5 启动 Chrome 调试');
    console.log('  - 使用 DevTools.* 进行调试');
    console.log('  - 性能监控和错误追踪');

    console.log('\n🔄 CI/CD:');
    console.log('  - GitHub Actions 工作流已配置');
    console.log('  - 自动质量检查和构建');
    console.log('  - 部署流程已准备');

    console.log('\n💡 提示:');
    console.log('  - 定期运行 npm run quality 检查代码质量');
    console.log('  - 使用 VS Code 获得最佳开发体验');
    console.log('  - 查看 .vscode/ 目录了解更多配置');
  }
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);

  const options = {
    setupGitHooks: !args.includes('--no-git'),
    setupVSCode: !args.includes('--no-vscode'),
    setupDebugger: !args.includes('--no-debug'),
    setupCI: !args.includes('--no-ci'),
    setupQuality: !args.includes('--no-quality'),
  };

  const setup = new DevToolsSetup(options);
  await setup.setupAll();
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ 配置失败:', error);
    process.exit(1);
  });
}

export { DevToolsSetup };
