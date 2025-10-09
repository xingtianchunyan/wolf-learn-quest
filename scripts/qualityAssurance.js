/**
 * 代码质量保证工具
 * 集成ESLint、Prettier、TypeScript检查和自动修复功能
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

class QualityAssurance {
  constructor() {
    this.results = {
      eslint: { errors: 0, warnings: 0, fixed: 0 },
      prettier: { formatted: 0 },
      typescript: { errors: 0 },
      tests: { passed: 0, failed: 0 },
    };
  }

  /**
   * 运行ESLint检查和修复
   */
  async runESLint() {
    console.log('🔍 运行ESLint检查...');

    try {
      // 先尝试自动修复
      const fixResult = execSync('npm run lint:fix', {
        encoding: 'utf8',
        stdio: 'pipe',
      });
      console.log('✅ ESLint自动修复完成');

      // 再次检查剩余问题
      const checkResult = execSync('npm run lint', {
        encoding: 'utf8',
        stdio: 'pipe',
      });
      console.log('✅ ESLint检查通过');
      this.results.eslint.errors = 0;
      this.results.eslint.warnings = 0;
    } catch (error) {
      const output = error.stdout || error.stderr || '';
      const errorMatch = output.match(/(\d+) errors?/);
      const warningMatch = output.match(/(\d+) warnings?/);

      this.results.eslint.errors = errorMatch ? parseInt(errorMatch[1]) : 0;
      this.results.eslint.warnings = warningMatch
        ? parseInt(warningMatch[1])
        : 0;

      console.log(
        `⚠️  ESLint发现 ${this.results.eslint.errors} 个错误，${this.results.eslint.warnings} 个警告`
      );
    }
  }

  /**
   * 运行Prettier格式化
   */
  async runPrettier() {
    console.log('🎨 运行Prettier格式化...');

    try {
      const result = execSync('npm run format', {
        encoding: 'utf8',
        stdio: 'pipe',
      });
      console.log('✅ Prettier格式化完成');
      this.results.prettier.formatted = 1;
    } catch (error) {
      console.log('⚠️  Prettier格式化失败:', error.message);
    }
  }

  /**
   * 运行TypeScript类型检查
   */
  async runTypeScript() {
    console.log('🔧 运行TypeScript类型检查...');

    try {
      const result = execSync('npm run type-check', {
        encoding: 'utf8',
        stdio: 'pipe',
      });
      console.log('✅ TypeScript类型检查通过');
      this.results.typescript.errors = 0;
    } catch (error) {
      const output = error.stdout || error.stderr || '';
      const errorMatch = output.match(/Found (\d+) errors?/);
      this.results.typescript.errors = errorMatch ? parseInt(errorMatch[1]) : 1;
      console.log(
        `⚠️  TypeScript发现 ${this.results.typescript.errors} 个类型错误`
      );
    }
  }

  /**
   * 运行测试
   */
  async runTests() {
    console.log('🧪 运行测试...');

    try {
      const result = execSync('npm test', {
        encoding: 'utf8',
        stdio: 'pipe',
      });
      console.log('✅ 所有测试通过');
      this.results.tests.passed = 1;
    } catch (error) {
      console.log('⚠️  测试失败');
      this.results.tests.failed = 1;
    }
  }

  /**
   * 生成质量报告
   */
  generateReport() {
    console.log('\n📊 代码质量报告');
    console.log('='.repeat(50));

    console.log('\n🔍 ESLint检查结果:');
    console.log(`  - 错误: ${this.results.eslint.errors}`);
    console.log(`  - 警告: ${this.results.eslint.warnings}`);

    console.log('\n🎨 Prettier格式化:');
    console.log(
      `  - 状态: ${this.results.prettier.formatted ? '✅ 完成' : '❌ 失败'}`
    );

    console.log('\n🔧 TypeScript类型检查:');
    console.log(`  - 错误: ${this.results.typescript.errors}`);

    console.log('\n🧪 测试结果:');
    console.log(
      `  - 状态: ${this.results.tests.passed ? '✅ 通过' : '❌ 失败'}`
    );

    // 计算总体质量分数
    const totalIssues =
      this.results.eslint.errors +
      this.results.typescript.errors +
      this.results.tests.failed;
    const qualityScore = Math.max(
      0,
      100 - totalIssues * 10 - this.results.eslint.warnings * 2
    );

    console.log('\n🏆 总体质量分数:');
    console.log(`  - 分数: ${qualityScore}/100`);

    if (qualityScore >= 90) {
      console.log('  - 等级: 🌟 优秀');
    } else if (qualityScore >= 70) {
      console.log('  - 等级: 👍 良好');
    } else if (qualityScore >= 50) {
      console.log('  - 等级: ⚠️  一般');
    } else {
      console.log('  - 等级: ❌ 需要改进');
    }

    console.log('\n' + '='.repeat(50));
  }

  /**
   * 创建质量配置文件
   */
  createQualityConfig() {
    const config = {
      eslint: {
        enabled: true,
        autoFix: true,
        maxErrors: 0,
        maxWarnings: 10,
      },
      prettier: {
        enabled: true,
        autoFormat: true,
      },
      typescript: {
        enabled: true,
        strict: true,
        maxErrors: 0,
      },
      tests: {
        enabled: true,
        coverage: {
          threshold: 80,
        },
      },
      preCommitHooks: {
        enabled: true,
        runLint: true,
        runTests: true,
        runTypeCheck: true,
      },
    };

    const configPath = path.join(process.cwd(), 'quality.config.json');
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`✅ 质量配置文件已创建: ${configPath}`);
  }

  /**
   * 更新package.json脚本
   */
  updatePackageScripts() {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    // 添加质量检查脚本
    packageJson.scripts = {
      ...packageJson.scripts,
      'quality:check': 'node scripts/qualityAssurance.js',
      'quality:fix': 'npm run lint:fix && npm run format',
      'type-check': 'tsc --noEmit',
      'pre-commit': 'npm run quality:fix && npm run type-check && npm test',
    };

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    console.log('✅ package.json脚本已更新');
  }

  /**
   * 运行完整的质量检查
   */
  async runFullCheck() {
    console.log('🚀 开始代码质量检查...\n');

    await this.runPrettier();
    await this.runESLint();
    await this.runTypeScript();
    await this.runTests();

    this.generateReport();
    this.createQualityConfig();
    this.updatePackageScripts();

    console.log('\n✨ 代码质量检查完成！');
  }
}

// 运行质量检查
const qa = new QualityAssurance();
qa.runFullCheck().catch(console.error);
