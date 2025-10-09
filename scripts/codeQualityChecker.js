/**
 * 代码质量检查工具
 *
 * 功能：
 * - ESLint 代码规范检查
 * - Prettier 代码格式检查
 * - TypeScript 类型检查
 * - 代码复杂度分析
 * - 重复代码检测
 * - 测试覆盖率检查
 * - 依赖安全检查
 *
 * @author AI Assistant
 * @version 1.0.0
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * 代码质量检查器类
 */
class CodeQualityChecker {
  /**
   * 构造函数
   * @param {Object} config - 配置选项
   */
  constructor(config = {}) {
    this.config = {
      verbose: false,
      fix: false,
      skipTests: false,
      outputFormat: 'console', // console, json, html
      ...config,
    };

    this.results = {
      eslint: null,
      prettier: null,
      typescript: null,
      complexity: null,
      duplication: null,
      coverage: null,
      security: null,
      overall: null,
    };
  }

  /**
   * 运行所有质量检查
   */
  async runAllChecks() {
    console.log('🔍 开始代码质量检查...\n');

    try {
      // 1. ESLint 检查
      await this.runESLintCheck();

      // 2. Prettier 检查
      await this.runPrettierCheck();

      // 3. TypeScript 检查
      await this.runTypeScriptCheck();

      // 4. 代码复杂度分析
      await this.runComplexityAnalysis();

      // 5. 重复代码检测
      await this.runDuplicationCheck();

      // 6. 测试覆盖率检查
      if (!this.config.skipTests) {
        await this.runCoverageCheck();
      }

      // 7. 依赖安全检查
      await this.runSecurityCheck();

      // 8. 生成综合报告
      this.generateOverallReport();

      // 9. 输出结果
      this.outputResults();
    } catch (error) {
      console.error('❌ 质量检查过程中出现错误:', error.message);
      process.exit(1);
    }
  }

  /**
   * 运行 ESLint 检查
   */
  async runESLintCheck() {
    console.log('📋 运行 ESLint 检查...');

    try {
      const fixFlag = this.config.fix ? '--fix' : '';
      const command = `npx eslint src --ext .ts,.tsx --format json ${fixFlag}`;

      const output = execSync(command, {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      this.results.eslint = {
        status: 'passed',
        issues: 0,
        errors: 0,
        warnings: 0,
        details: JSON.parse(output || '[]'),
      };

      console.log('✅ ESLint 检查通过');
    } catch (error) {
      const output = error.stdout || '[]';
      const results = JSON.parse(output);

      let totalErrors = 0;
      let totalWarnings = 0;

      results.forEach(file => {
        totalErrors += file.errorCount;
        totalWarnings += file.warningCount;
      });

      this.results.eslint = {
        status: totalErrors > 0 ? 'failed' : 'warning',
        issues: totalErrors + totalWarnings,
        errors: totalErrors,
        warnings: totalWarnings,
        details: results,
      };

      if (totalErrors > 0) {
        console.log(
          `❌ ESLint 发现 ${totalErrors} 个错误, ${totalWarnings} 个警告`
        );
      } else {
        console.log(`⚠️ ESLint 发现 ${totalWarnings} 个警告`);
      }
    }
  }

  /**
   * 运行 Prettier 检查
   */
  async runPrettierCheck() {
    console.log('🎨 运行 Prettier 检查...');

    try {
      const checkCommand = 'npx prettier --check src';
      execSync(checkCommand, { encoding: 'utf8' });

      this.results.prettier = {
        status: 'passed',
        issues: 0,
        message: '代码格式符合规范',
      };

      console.log('✅ Prettier 检查通过');
    } catch (error) {
      const unformattedFiles = error.stdout
        .split('\n')
        .filter(line => line.trim());

      this.results.prettier = {
        status: 'failed',
        issues: unformattedFiles.length,
        files: unformattedFiles,
        message: `${unformattedFiles.length} 个文件格式不符合规范`,
      };

      console.log(`❌ Prettier 发现 ${unformattedFiles.length} 个格式问题`);

      if (this.config.fix) {
        console.log('🔧 自动修复格式问题...');
        execSync('npx prettier --write src', { encoding: 'utf8' });
        console.log('✅ 格式问题已修复');
      }
    }
  }

  /**
   * 运行 TypeScript 检查
   */
  async runTypeScriptCheck() {
    console.log('🔧 运行 TypeScript 检查...');

    try {
      const output = execSync('npx tsc --noEmit', {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      this.results.typescript = {
        status: 'passed',
        issues: 0,
        message: '类型检查通过',
      };

      console.log('✅ TypeScript 检查通过');
    } catch (error) {
      const errorOutput = error.stderr || error.stdout || '';
      const errorLines = errorOutput
        .split('\n')
        .filter(line => line.includes('error TS') || line.includes('Found '));

      this.results.typescript = {
        status: 'failed',
        issues: errorLines.length,
        errors: errorLines,
        message: `发现 ${errorLines.length} 个类型错误`,
      };

      console.log(`❌ TypeScript 发现 ${errorLines.length} 个类型错误`);
    }
  }

  /**
   * 运行代码复杂度分析
   */
  async runComplexityAnalysis() {
    console.log('📊 运行代码复杂度分析...');

    try {
      const complexFiles = [];
      const srcDir = 'src';

      // 递归扫描所有 TypeScript 文件
      const scanDirectory = dir => {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);

          if (stat.isDirectory()) {
            scanDirectory(filePath);
          } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            const content = fs.readFileSync(filePath, 'utf8');
            const complexity = this.calculateComplexity(content);
            const lineCount = content.split('\n').length;

            if (complexity > 10 || lineCount > 300) {
              complexFiles.push({
                file: filePath,
                complexity,
                lines: lineCount,
                issues: [],
              });

              if (complexity > 10) {
                complexFiles[complexFiles.length - 1].issues.push(
                  `高复杂度: ${complexity}`
                );
              }
              if (lineCount > 300) {
                complexFiles[complexFiles.length - 1].issues.push(
                  `文件过长: ${lineCount} 行`
                );
              }
            }
          }
        });
      };

      scanDirectory(srcDir);

      this.results.complexity = {
        status: complexFiles.length === 0 ? 'passed' : 'warning',
        issues: complexFiles.length,
        files: complexFiles,
        message:
          complexFiles.length === 0
            ? '代码复杂度良好'
            : `发现 ${complexFiles.length} 个复杂度问题`,
      };

      if (complexFiles.length === 0) {
        console.log('✅ 代码复杂度检查通过');
      } else {
        console.log(`⚠️ 发现 ${complexFiles.length} 个复杂度问题`);
      }
    } catch (error) {
      console.log('❌ 复杂度分析失败:', error.message);
      this.results.complexity = {
        status: 'error',
        message: error.message,
      };
    }
  }

  /**
   * 计算代码复杂度（简化版圈复杂度）
   * @param {string} content - 文件内容
   * @returns {number} 复杂度值
   */
  calculateComplexity(content) {
    let complexity = 1; // 基础复杂度

    // 计算控制流语句
    const patterns = [
      /\bif\s*\(/g,
      /\belse\s+if\s*\(/g,
      /\bwhile\s*\(/g,
      /\bfor\s*\(/g,
      /\bswitch\s*\(/g,
      /\bcase\s+/g,
      /\bcatch\s*\(/g,
      /\?\s*.*\s*:/g, // 三元操作符
      /&&/g,
      /\|\|/g,
    ];

    patterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        complexity += matches.length;
      }
    });

    return complexity;
  }

  /**
   * 运行重复代码检测
   */
  async runDuplicationCheck() {
    console.log('🔍 运行重复代码检测...');

    try {
      const duplicates = [];
      const codeBlocks = new Map();
      const srcDir = 'src';

      // 扫描所有文件，查找重复代码块
      const scanForDuplicates = dir => {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);

          if (stat.isDirectory()) {
            scanForDuplicates(filePath);
          } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split('\n');

            // 检查连续的代码块（5行以上）
            for (let i = 0; i < lines.length - 4; i++) {
              const block = lines
                .slice(i, i + 5)
                .map(line => line.trim())
                .filter(
                  line =>
                    line && !line.startsWith('//') && !line.startsWith('*')
                )
                .join('\n');

              if (block.length > 50) {
                // 忽略太短的块
                if (codeBlocks.has(block)) {
                  const existing = codeBlocks.get(block);
                  duplicates.push({
                    block: block.substring(0, 100) + '...',
                    files: [existing.file, filePath],
                    lines: [existing.line, i + 1],
                  });
                } else {
                  codeBlocks.set(block, { file: filePath, line: i + 1 });
                }
              }
            }
          }
        });
      };

      scanForDuplicates(srcDir);

      this.results.duplication = {
        status: duplicates.length === 0 ? 'passed' : 'warning',
        issues: duplicates.length,
        duplicates,
        message:
          duplicates.length === 0
            ? '未发现重复代码'
            : `发现 ${duplicates.length} 处重复代码`,
      };

      if (duplicates.length === 0) {
        console.log('✅ 重复代码检测通过');
      } else {
        console.log(`⚠️ 发现 ${duplicates.length} 处重复代码`);
      }
    } catch (error) {
      console.log('❌ 重复代码检测失败:', error.message);
      this.results.duplication = {
        status: 'error',
        message: error.message,
      };
    }
  }

  /**
   * 运行测试覆盖率检查
   */
  async runCoverageCheck() {
    console.log('🧪 运行测试覆盖率检查...');

    try {
      const output = execSync('npm run test:coverage', {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      // 解析覆盖率报告
      const coverageMatch = output.match(/All files\s+\|\s+([\d.]+)/);
      const coverage = coverageMatch ? parseFloat(coverageMatch[1]) : 0;

      this.results.coverage = {
        status:
          coverage >= 80 ? 'passed' : coverage >= 60 ? 'warning' : 'failed',
        coverage,
        message: `测试覆盖率: ${coverage}%`,
      };

      if (coverage >= 80) {
        console.log(`✅ 测试覆盖率良好: ${coverage}%`);
      } else if (coverage >= 60) {
        console.log(`⚠️ 测试覆盖率偏低: ${coverage}%`);
      } else {
        console.log(`❌ 测试覆盖率过低: ${coverage}%`);
      }
    } catch (error) {
      console.log('❌ 测试覆盖率检查失败:', error.message);
      this.results.coverage = {
        status: 'error',
        message: '无法获取测试覆盖率',
      };
    }
  }

  /**
   * 运行依赖安全检查
   */
  async runSecurityCheck() {
    console.log('🔒 运行依赖安全检查...');

    try {
      const output = execSync('npm audit --json', {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      const auditResult = JSON.parse(output);
      const vulnerabilities = auditResult.metadata?.vulnerabilities || {};
      const totalVulns = Object.values(vulnerabilities).reduce(
        (sum, count) => sum + count,
        0
      );

      this.results.security = {
        status: totalVulns === 0 ? 'passed' : 'warning',
        vulnerabilities: totalVulns,
        details: vulnerabilities,
        message:
          totalVulns === 0 ? '未发现安全漏洞' : `发现 ${totalVulns} 个安全漏洞`,
      };

      if (totalVulns === 0) {
        console.log('✅ 依赖安全检查通过');
      } else {
        console.log(`⚠️ 发现 ${totalVulns} 个安全漏洞`);
      }
    } catch (error) {
      console.log('❌ 安全检查失败:', error.message);
      this.results.security = {
        status: 'error',
        message: '无法执行安全检查',
      };
    }
  }

  /**
   * 生成综合报告
   */
  generateOverallReport() {
    const checks = Object.values(this.results).filter(r => r !== null);
    const passed = checks.filter(r => r.status === 'passed').length;
    const warnings = checks.filter(r => r.status === 'warning').length;
    const failed = checks.filter(r => r.status === 'failed').length;
    const errors = checks.filter(r => r.status === 'error').length;

    let overallStatus = 'passed';
    if (failed > 0 || errors > 0) {
      overallStatus = 'failed';
    } else if (warnings > 0) {
      overallStatus = 'warning';
    }

    this.results.overall = {
      status: overallStatus,
      total: checks.length,
      passed,
      warnings,
      failed,
      errors,
      score: Math.round((passed / checks.length) * 100),
    };
  }

  /**
   * 输出检查结果
   */
  outputResults() {
    console.log('\n📊 代码质量检查报告');
    console.log('='.repeat(50));

    const { overall } = this.results;

    // 总体状态
    const statusIcon = {
      passed: '✅',
      warning: '⚠️',
      failed: '❌',
    }[overall.status];

    console.log(`\n${statusIcon} 总体状态: ${overall.status.toUpperCase()}`);
    console.log(`📈 质量评分: ${overall.score}/100`);
    console.log(`✅ 通过: ${overall.passed}/${overall.total}`);
    console.log(`⚠️ 警告: ${overall.warnings}/${overall.total}`);
    console.log(`❌ 失败: ${overall.failed}/${overall.total}`);

    // 详细结果
    console.log('\n📋 详细结果:');

    Object.entries(this.results).forEach(([check, result]) => {
      if (result && check !== 'overall') {
        const icon = {
          passed: '✅',
          warning: '⚠️',
          failed: '❌',
          error: '💥',
        }[result.status];

        console.log(
          `${icon} ${check.toUpperCase()}: ${result.message || result.status}`
        );

        if (this.config.verbose && result.issues > 0) {
          if (result.files) {
            result.files.slice(0, 3).forEach(file => {
              console.log(
                `   - ${file.file || file}: ${file.issues?.join(', ') || ''}`
              );
            });
            if (result.files.length > 3) {
              console.log(`   ... 还有 ${result.files.length - 3} 个文件`);
            }
          }
        }
      }
    });

    // 建议
    console.log('\n💡 改进建议:');
    this.generateRecommendations();

    // 保存报告
    if (this.config.outputFormat === 'json') {
      this.saveJsonReport();
    }
  }

  /**
   * 生成改进建议
   */
  generateRecommendations() {
    const recommendations = [];

    if (this.results.eslint?.status === 'failed') {
      recommendations.push(
        '修复 ESLint 错误，运行 npm run lint:fix 自动修复部分问题'
      );
    }

    if (this.results.prettier?.status === 'failed') {
      recommendations.push('修复代码格式，运行 npm run format 自动格式化代码');
    }

    if (this.results.typescript?.status === 'failed') {
      recommendations.push('修复 TypeScript 类型错误，确保类型安全');
    }

    if (this.results.complexity?.issues > 0) {
      recommendations.push('重构复杂函数，将大函数拆分为小函数');
    }

    if (this.results.duplication?.issues > 0) {
      recommendations.push('消除重复代码，提取公共函数或组件');
    }

    if (this.results.coverage?.coverage < 80) {
      recommendations.push('增加测试覆盖率，目标达到 80% 以上');
    }

    if (this.results.security?.vulnerabilities > 0) {
      recommendations.push('修复安全漏洞，运行 npm audit fix');
    }

    if (recommendations.length === 0) {
      console.log('🎉 代码质量良好，继续保持！');
    } else {
      recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. ${rec}`);
      });
    }
  }

  /**
   * 保存 JSON 格式报告
   */
  saveJsonReport() {
    const reportPath = 'quality-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 详细报告已保存到: ${reportPath}`);
  }
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  const config = {
    verbose: args.includes('--verbose') || args.includes('-v'),
    fix: args.includes('--fix'),
    skipTests: args.includes('--skip-tests'),
    outputFormat: args.includes('--json') ? 'json' : 'console',
  };

  const checker = new CodeQualityChecker(config);
  await checker.runAllChecks();

  // 根据结果设置退出码
  const exitCode = checker.results.overall?.status === 'failed' ? 1 : 0;
  process.exit(exitCode);
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ 执行失败:', error);
    process.exit(1);
  });
}

export { CodeQualityChecker };
