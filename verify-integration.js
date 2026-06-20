/**
 * 文件级注释：集成验证脚本
 *
 * 该脚本用于验证项目的集成状态：
 * - 检查关键文件是否存在
 * - 验证配置文件的正确性
 * - 确认测试文件的完整性
 *
 * @author SOLO Coding
 * @version 1.0.0
 */

import fs from 'fs';
import path from 'path';

/**
 * 类级注释：集成验证器
 *
 * 负责执行各种集成验证检查
 */
class IntegrationVerifier {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.successes = [];
  }

  /**
   * 函数级注释：检查文件是否存在
   * @param {string} filePath - 文件路径
   * @param {string} description - 文件描述
   */
  checkFileExists(filePath, description) {
    try {
      if (fs.existsSync(filePath)) {
        this.successes.push(`✅ ${description}: ${filePath}`);
        return true;
      } else {
        this.errors.push(`❌ ${description} 不存在: ${filePath}`);
        return false;
      }
    } catch (error) {
      this.errors.push(`❌ 检查 ${description} 时出错: ${error.message}`);
      return false;
    }
  }

  /**
   * 函数级注释：检查目录是否存在
   * @param {string} dirPath - 目录路径
   * @param {string} description - 目录描述
   */
  checkDirectoryExists(dirPath, description) {
    try {
      if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
        const files = fs.readdirSync(dirPath);
        this.successes.push(
          `✅ ${description}: ${dirPath} (${files.length} 个文件)`
        );
        return true;
      } else {
        this.errors.push(`❌ ${description} 不存在: ${dirPath}`);
        return false;
      }
    } catch (error) {
      this.errors.push(`❌ 检查 ${description} 时出错: ${error.message}`);
      return false;
    }
  }

  /**
   * 函数级注释：验证核心文件
   */
  verifyCore() {
    console.log('🔍 验证核心文件...');

    // 检查核心配置文件
    this.checkFileExists('package.json', '包配置文件');
    this.checkFileExists('tsconfig.json', 'TypeScript配置');
    this.checkFileExists('vite.config.ts', 'Vite配置');
    this.checkFileExists('tailwind.config.ts', 'Tailwind配置');
    this.checkFileExists('eslint.config.js', 'ESLint配置');

    // 检查部署配置
    this.checkFileExists('deployment.config.js', '部署配置');
    this.checkFileExists('vercel.json', 'Vercel配置');
    this.checkFileExists('Dockerfile', 'Docker配置');
    this.checkFileExists('ecosystem.config.js', 'PM2配置');
  }

  /**
   * 函数级注释：验证源代码结构
   */
  verifySourceStructure() {
    console.log('🏗️ 验证源代码结构...');

    // 检查核心目录
    this.checkDirectoryExists('src', '源代码目录');
    this.checkDirectoryExists('src/components', '组件目录');
    this.checkDirectoryExists('src/hooks', 'Hooks目录');
    this.checkDirectoryExists('src/utils', '工具目录');
    this.checkDirectoryExists('src/services', '服务目录');
    this.checkDirectoryExists('src/contexts', '上下文目录');
    this.checkDirectoryExists('src/middleware', '中间件目录');
    this.checkDirectoryExists('src/config', '配置目录');
    this.checkDirectoryExists('src/types', '类型目录');

    // 检查测试目录
    this.checkDirectoryExists('src/test', '原有测试目录');
    this.checkDirectoryExists('src/tests', '新增测试目录');
  }

  /**
   * 函数级注释：验证测试文件
   */
  verifyTestFiles() {
    console.log('🧪 验证测试文件...');

    // 检查新增的测试文件
    const testFiles = [
      'src/tests/integration/comprehensive.system.test.ts',
      'src/tests/realSystemIntegration.test.ts',
      'src/tests/securityIntegration.test.ts',
      'src/tests/optimizedSystemsIntegration.test.ts',
      'src/tests/coreOptimizationIntegration.test.ts',
      'src/tests/errorHandlingIntegration.test.ts',
      'src/tests/unifiedErrorSystem.test.ts',
    ];

    testFiles.forEach(file => {
      this.checkFileExists(file, `测试文件 ${path.basename(file)}`);
    });

    // 检查测试配置
    this.checkFileExists('src/test-setup.ts', '测试设置文件');
  }

  /**
   * 函数级注释：验证文档
   */
  verifyDocumentation() {
    console.log('📚 验证文档...');

    this.checkFileExists('README.md', '项目说明文档');
    this.checkDirectoryExists('docs', '文档目录');
    this.checkFileExists(
      'docs/FINAL_INTEGRATION_VERIFICATION_REPORT.md',
      '最终验证报告'
    );
  }

  /**
   * 函数级注释：运行所有验证
   */
  runAllVerifications() {
    console.log('🚀 开始集成验证...\n');

    this.verifyCore();
    console.log('');

    this.verifySourceStructure();
    console.log('');

    this.verifyTestFiles();
    console.log('');

    this.verifyDocumentation();
    console.log('');

    this.printResults();
  }

  /**
   * 函数级注释：打印验证结果
   */
  printResults() {
    console.log('📊 验证结果汇总:');
    console.log('='.repeat(50));

    if (this.successes.length > 0) {
      console.log('\n✅ 成功项目:');
      this.successes.forEach(success => console.log(`  ${success}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️ 警告项目:');
      this.warnings.forEach(warning => console.log(`  ${warning}`));
    }

    if (this.errors.length > 0) {
      console.log('\n❌ 错误项目:');
      this.errors.forEach(error => console.log(`  ${error}`));
    }

    console.log('\n📈 统计信息:');
    console.log(`  成功: ${this.successes.length}`);
    console.log(`  警告: ${this.warnings.length}`);
    console.log(`  错误: ${this.errors.length}`);

    const total =
      this.successes.length + this.warnings.length + this.errors.length;
    const successRate =
      total > 0 ? ((this.successes.length / total) * 100).toFixed(1) : 0;

    console.log(`  成功率: ${successRate}%`);

    if (this.errors.length === 0) {
      console.log('\n🎉 集成验证通过！项目已准备好进入生产环境。');
    } else {
      console.log('\n⚠️ 发现问题，请修复后重新验证。');
    }
  }
}

// 运行验证
const verifier = new IntegrationVerifier();
verifier.runAllVerifications();
