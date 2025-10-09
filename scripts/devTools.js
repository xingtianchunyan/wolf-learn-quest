/**
 * 开发工具集成脚本
 * @author SOLO Coding
 * @description 集成所有开发工具，提供统一的命令行接口
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CodeQualityAnalyzer } from './codeQualityAnalyzer.js';
import { AutoRefactor } from './autoRefactor.js';
import { CodeFormatter } from './codeFormatter.js';
import { DependencyAnalyzer } from './dependencyAnalyzer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 开发工具管理器类
 */
class DevToolsManager {
  constructor() {
    this.tools = {
      quality: new CodeQualityAnalyzer(),
      refactor: new AutoRefactor(),
      format: new CodeFormatter(),
      dependency: new DependencyAnalyzer(),
    };

    this.config = this.loadConfig();
  }

  /**
   * 加载配置
   * @returns {Object} 配置对象
   */
  loadConfig() {
    const configPath = path.join(process.cwd(), '.devtools.json');

    if (fs.existsSync(configPath)) {
      try {
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
      } catch (error) {
        console.warn('⚠️  配置文件格式错误，使用默认配置');
      }
    }

    // 默认配置
    const defaultConfig = {
      quality: {
        enabled: true,
        thresholds: {
          maintainabilityIndex: 50,
          cyclomaticComplexity: 10,
          cognitiveComplexity: 15,
          halsteadComplexity: 20,
        },
        excludePatterns: ['**/*.test.*', '**/*.spec.*', '**/node_modules/**'],
      },
      refactor: {
        enabled: true,
        rules: [
          'removeUnusedImports',
          'extractConstants',
          'simplifyConditionals',
          'removeDeadCode',
          'optimizeLoops',
          'extractFunctions',
          'addTypeAnnotations',
        ],
        autoApply: false,
      },
      format: {
        enabled: true,
        rules: {
          indentSize: 2,
          indentType: 'spaces',
          maxLineLength: 100,
          trailingComma: true,
          semicolons: true,
          singleQuotes: true,
          bracketSpacing: true,
          arrowParens: 'avoid',
        },
        fileTypes: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json'],
      },
      dependency: {
        enabled: true,
        checkCircular: true,
        checkUnused: true,
        checkMissing: true,
        generateGraph: true,
      },
      reports: {
        outputDir: 'reports',
        formats: ['json', 'markdown', 'html'],
        includeTimestamp: true,
      },
    };

    // 保存默认配置
    this.saveConfig(defaultConfig);
    return defaultConfig;
  }

  /**
   * 保存配置
   * @param {Object} config - 配置对象
   */
  saveConfig(config) {
    const configPath = path.join(process.cwd(), '.devtools.json');
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
  }

  /**
   * 运行所有工具
   * @param {Object} options - 选项
   */
  async runAll(options = {}) {
    console.log('🚀 开始运行所有开发工具...\n');

    const results = {};
    const startTime = Date.now();

    try {
      // 1. 代码质量分析
      if (this.config.quality.enabled) {
        console.log('📊 运行代码质量分析...');
        results.quality = await this.runQualityAnalysis(options);
      }

      // 2. 依赖分析
      if (this.config.dependency.enabled) {
        console.log('\n🔍 运行依赖分析...');
        results.dependency = await this.runDependencyAnalysis(options);
      }

      // 3. 代码重构（如果启用自动应用）
      if (
        this.config.refactor.enabled &&
        (this.config.refactor.autoApply || options.refactor)
      ) {
        console.log('\n🔧 运行自动重构...');
        results.refactor = await this.runAutoRefactor(options);
      }

      // 4. 代码格式化
      if (this.config.format.enabled && (options.format || options.all)) {
        console.log('\n🎨 运行代码格式化...');
        results.format = await this.runCodeFormat(options);
      }

      // 5. 生成综合报告
      await this.generateComprehensiveReport(results, Date.now() - startTime);

      console.log('\n✨ 所有工具运行完成！');
    } catch (error) {
      console.error('❌ 工具运行失败:', error.message);
      throw error;
    }

    return results;
  }

  /**
   * 运行代码质量分析
   * @param {Object} options - 选项
   * @returns {Object} 分析结果
   */
  async runQualityAnalysis(options) {
    const analyzer = this.tools.quality;
    await analyzer.run();

    return {
      completed: true,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * 运行依赖分析
   * @param {Object} options - 选项
   * @returns {Object} 分析结果
   */
  async runDependencyAnalysis(options) {
    const analyzer = this.tools.dependency;
    await analyzer.run();

    return {
      completed: true,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * 运行自动重构
   * @param {Object} options - 选项
   * @returns {Object} 重构结果
   */
  async runAutoRefactor(options) {
    const refactor = this.tools.refactor;
    await refactor.run({
      dryRun: options.dryRun !== false,
      rules: this.config.refactor.rules,
    });

    return {
      completed: true,
      dryRun: options.dryRun !== false,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * 运行代码格式化
   * @param {Object} options - 选项
   * @returns {Object} 格式化结果
   */
  async runCodeFormat(options) {
    const formatter = this.tools.format;
    await formatter.run({
      dryRun: options.dryRun !== false,
      fileTypes: this.config.format.fileTypes,
    });

    return {
      completed: true,
      dryRun: options.dryRun !== false,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * 生成综合报告
   * @param {Object} results - 运行结果
   * @param {number} totalTime - 总耗时
   */
  async generateComprehensiveReport(results, totalTime) {
    console.log('\n📊 生成综合报告...');

    const reportsPath = path.join(process.cwd(), this.config.reports.outputDir);
    if (!fs.existsSync(reportsPath)) {
      fs.mkdirSync(reportsPath, { recursive: true });
    }

    const report = {
      timestamp: new Date().toISOString(),
      totalTime: totalTime,
      config: this.config,
      results: results,
      summary: this.generateSummary(results),
    };

    // 生成JSON报告
    if (this.config.reports.formats.includes('json')) {
      fs.writeFileSync(
        path.join(reportsPath, 'comprehensive-report.json'),
        JSON.stringify(report, null, 2),
        'utf8'
      );
    }

    // 生成Markdown报告
    if (this.config.reports.formats.includes('markdown')) {
      const markdownReport = this.generateMarkdownReport(report);
      fs.writeFileSync(
        path.join(reportsPath, 'comprehensive-report.md'),
        markdownReport,
        'utf8'
      );
    }

    // 生成HTML报告
    if (this.config.reports.formats.includes('html')) {
      const htmlReport = this.generateHtmlReport(report);
      fs.writeFileSync(
        path.join(reportsPath, 'comprehensive-report.html'),
        htmlReport,
        'utf8'
      );
    }

    console.log('✅ 综合报告已生成');
  }

  /**
   * 生成摘要
   * @param {Object} results - 运行结果
   * @returns {Object} 摘要信息
   */
  generateSummary(results) {
    const summary = {
      toolsRun: Object.keys(results).length,
      allCompleted: Object.values(results).every(result => result.completed),
      hasIssues: false,
      recommendations: [],
    };

    // 检查是否有问题需要关注
    try {
      // 检查质量报告
      const qualityReportPath = path.join(
        process.cwd(),
        'reports',
        'quality-report.json'
      );
      if (fs.existsSync(qualityReportPath)) {
        const qualityReport = JSON.parse(
          fs.readFileSync(qualityReportPath, 'utf8')
        );

        if (
          qualityReport.summary.maintainabilityIndex <
          this.config.quality.thresholds.maintainabilityIndex
        ) {
          summary.hasIssues = true;
          summary.recommendations.push('代码可维护性指数较低，建议进行重构');
        }

        if (qualityReport.summary.codeSmells > 100) {
          summary.hasIssues = true;
          summary.recommendations.push('发现大量代码异味，建议优化代码结构');
        }
      }

      // 检查依赖报告
      const dependencyReportPath = path.join(
        process.cwd(),
        'reports',
        'dependency-analysis.json'
      );
      if (fs.existsSync(dependencyReportPath)) {
        const dependencyReport = JSON.parse(
          fs.readFileSync(dependencyReportPath, 'utf8')
        );

        if (dependencyReport.summary.circularDependencies > 0) {
          summary.hasIssues = true;
          summary.recommendations.push('发现循环依赖，建议重构代码结构');
        }

        if (dependencyReport.summary.unusedDependencies > 10) {
          summary.hasIssues = true;
          summary.recommendations.push(
            '存在大量未使用的依赖，建议清理package.json'
          );
        }
      }
    } catch (error) {
      console.warn('⚠️  生成摘要时出错:', error.message);
    }

    return summary;
  }

  /**
   * 生成Markdown报告
   * @param {Object} report - 报告数据
   * @returns {string} Markdown内容
   */
  generateMarkdownReport(report) {
    return `# 开发工具综合报告

## 概述

**生成时间**: ${new Date(report.timestamp).toLocaleString()}
**总耗时**: ${(report.totalTime / 1000).toFixed(2)} 秒
**运行工具数**: ${report.summary.toolsRun}
**全部完成**: ${report.summary.allCompleted ? '✅' : '❌'}
**发现问题**: ${report.summary.hasIssues ? '⚠️ 是' : '✅ 否'}

## 工具运行状态

${Object.entries(report.results)
  .map(
    ([tool, result]) => `
### ${tool}
- **状态**: ${result.completed ? '✅ 完成' : '❌ 失败'}
- **时间**: ${new Date(result.timestamp).toLocaleString()}
${result.dryRun !== undefined ? `- **模式**: ${result.dryRun ? '试运行' : '实际执行'}` : ''}
`
  )
  .join('')}

## 建议和推荐

${
  report.summary.recommendations.length > 0
    ? report.summary.recommendations.map(rec => `- ${rec}`).join('\n')
    : '✅ 代码质量良好，无特殊建议'
}

## 配置信息

### 代码质量分析
- **启用**: ${report.config.quality.enabled ? '是' : '否'}
- **可维护性阈值**: ${report.config.quality.thresholds.maintainabilityIndex}
- **圈复杂度阈值**: ${report.config.quality.thresholds.cyclomaticComplexity}

### 自动重构
- **启用**: ${report.config.refactor.enabled ? '是' : '否'}
- **自动应用**: ${report.config.refactor.autoApply ? '是' : '否'}
- **规则数量**: ${report.config.refactor.rules.length}

### 代码格式化
- **启用**: ${report.config.format.enabled ? '是' : '否'}
- **缩进大小**: ${report.config.format.rules.indentSize}
- **使用单引号**: ${report.config.format.rules.singleQuotes ? '是' : '否'}

### 依赖分析
- **启用**: ${report.config.dependency.enabled ? '是' : '否'}
- **检查循环依赖**: ${report.config.dependency.checkCircular ? '是' : '否'}
- **检查未使用依赖**: ${report.config.dependency.checkUnused ? '是' : '否'}

## 详细报告

各工具的详细报告请查看以下文件：
- 代码质量分析: \`reports/quality-report.md\`
- 依赖分析: \`reports/dependency-analysis.md\`
- 重构报告: \`reports/refactor-report.md\`
- 格式化报告: \`reports/format-report.md\`

---

*报告由开发工具集成系统生成*`;
  }

  /**
   * 生成HTML报告
   * @param {Object} report - 报告数据
   * @returns {string} HTML内容
   */
  generateHtmlReport(report) {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>开发工具综合报告</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }
        h2 {
            color: #34495e;
            margin-top: 30px;
        }
        .status-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .status-card {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            padding: 15px;
        }
        .status-success {
            border-left: 4px solid #28a745;
        }
        .status-warning {
            border-left: 4px solid #ffc107;
        }
        .status-error {
            border-left: 4px solid #dc3545;
        }
        .metric {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 8px;
            background: #f8f9fa;
            border-radius: 4px;
        }
        .recommendations {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
        }
        .recommendations ul {
            margin: 0;
            padding-left: 20px;
        }
        .config-section {
            background: #e3f2fd;
            border-radius: 6px;
            padding: 15px;
            margin: 10px 0;
        }
        .timestamp {
            color: #6c757d;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🛠️ 开发工具综合报告</h1>
        
        <div class="metric">
            <span><strong>生成时间:</strong></span>
            <span class="timestamp">${new Date(report.timestamp).toLocaleString()}</span>
        </div>
        
        <div class="metric">
            <span><strong>总耗时:</strong></span>
            <span>${(report.totalTime / 1000).toFixed(2)} 秒</span>
        </div>
        
        <div class="metric">
            <span><strong>运行工具数:</strong></span>
            <span>${report.summary.toolsRun}</span>
        </div>
        
        <h2>📊 工具运行状态</h2>
        <div class="status-grid">
            ${Object.entries(report.results)
              .map(
                ([tool, result]) => `
                <div class="status-card ${result.completed ? 'status-success' : 'status-error'}">
                    <h3>${tool}</h3>
                    <p><strong>状态:</strong> ${result.completed ? '✅ 完成' : '❌ 失败'}</p>
                    <p><strong>时间:</strong> ${new Date(result.timestamp).toLocaleString()}</p>
                    ${result.dryRun !== undefined ? `<p><strong>模式:</strong> ${result.dryRun ? '试运行' : '实际执行'}</p>` : ''}
                </div>
            `
              )
              .join('')}
        </div>
        
        ${
          report.summary.recommendations.length > 0
            ? `
        <h2>💡 建议和推荐</h2>
        <div class="recommendations">
            <ul>
                ${report.summary.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
        `
            : `
        <h2>✅ 代码质量良好</h2>
        <p>未发现需要特别关注的问题。</p>
        `
        }
        
        <h2>⚙️ 配置信息</h2>
        
        <div class="config-section">
            <h3>代码质量分析</h3>
            <div class="metric">
                <span>启用:</span>
                <span>${report.config.quality.enabled ? '✅' : '❌'}</span>
            </div>
            <div class="metric">
                <span>可维护性阈值:</span>
                <span>${report.config.quality.thresholds.maintainabilityIndex}</span>
            </div>
        </div>
        
        <div class="config-section">
            <h3>自动重构</h3>
            <div class="metric">
                <span>启用:</span>
                <span>${report.config.refactor.enabled ? '✅' : '❌'}</span>
            </div>
            <div class="metric">
                <span>自动应用:</span>
                <span>${report.config.refactor.autoApply ? '✅' : '❌'}</span>
            </div>
        </div>
        
        <div class="config-section">
            <h3>代码格式化</h3>
            <div class="metric">
                <span>启用:</span>
                <span>${report.config.format.enabled ? '✅' : '❌'}</span>
            </div>
            <div class="metric">
                <span>缩进大小:</span>
                <span>${report.config.format.rules.indentSize}</span>
            </div>
        </div>
        
        <div class="config-section">
            <h3>依赖分析</h3>
            <div class="metric">
                <span>启用:</span>
                <span>${report.config.dependency.enabled ? '✅' : '❌'}</span>
            </div>
            <div class="metric">
                <span>检查循环依赖:</span>
                <span>${report.config.dependency.checkCircular ? '✅' : '❌'}</span>
            </div>
        </div>
        
        <h2>📁 详细报告</h2>
        <p>各工具的详细报告请查看以下文件：</p>
        <ul>
            <li>代码质量分析: <code>reports/quality-report.md</code></li>
            <li>依赖分析: <code>reports/dependency-analysis.md</code></li>
            <li>重构报告: <code>reports/refactor-report.md</code></li>
            <li>格式化报告: <code>reports/format-report.md</code></li>
        </ul>
        
        <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #6c757d; text-align: center;">
            <p><em>报告由开发工具集成系统生成</em></p>
        </footer>
    </div>
</body>
</html>`;
  }

  /**
   * 显示帮助信息
   */
  showHelp() {
    console.log(`
🛠️  开发工具集成系统

用法:
  node scripts/devTools.js [命令] [选项]

命令:
  all           运行所有工具
  quality       运行代码质量分析
  refactor      运行自动重构
  format        运行代码格式化
  dependency    运行依赖分析
  config        显示当前配置
  help          显示帮助信息

选项:
  --dry-run     试运行模式（不实际修改文件）
  --force       强制执行（跳过确认）
  --config      指定配置文件路径

示例:
  node scripts/devTools.js all --dry-run
  node scripts/devTools.js quality
  node scripts/devTools.js refactor --force
  node scripts/devTools.js format --dry-run
    `);
  }

  /**
   * 显示配置
   */
  showConfig() {
    console.log('📋 当前配置:');
    console.log(JSON.stringify(this.config, null, 2));
  }
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  const options = {
    dryRun: args.includes('--dry-run'),
    force: args.includes('--force'),
    refactor: args.includes('--refactor') || command === 'refactor',
    format: args.includes('--format') || command === 'format',
    all: command === 'all',
  };

  const manager = new DevToolsManager();

  try {
    switch (command) {
      case 'all':
        await manager.runAll(options);
        break;

      case 'quality':
        await manager.runQualityAnalysis(options);
        break;

      case 'refactor':
        await manager.runAutoRefactor(options);
        break;

      case 'format':
        await manager.runCodeFormat(options);
        break;

      case 'dependency':
        await manager.runDependencyAnalysis(options);
        break;

      case 'config':
        manager.showConfig();
        break;

      case 'help':
      default:
        manager.showHelp();
        break;
    }
  } catch (error) {
    console.error('❌ 执行失败:', error.message);
    process.exit(1);
  }
}

// 执行脚本
if (
  import.meta.url.endsWith(process.argv[1]) ||
  process.argv[1].endsWith('devTools.js')
) {
  main().catch(console.error);
}

export { DevToolsManager };
