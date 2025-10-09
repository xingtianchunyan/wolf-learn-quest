/**
 * 文件级注释：命名规范检查脚本
 * 自动检查项目中的文件和代码是否符合命名规范
 * 提供详细的检查报告和修复建议
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 命名规范配置
 */
const NAMING_RULES = {
  // 文件命名规则
  files: {
    component: /^[A-Z][a-zA-Z0-9]*\.tsx?$/,
    hook: /^use[A-Z][a-zA-Z0-9]*\.(ts|tsx)$/,
    service: /^[A-Z][a-zA-Z0-9]*Service\.ts$/,
    util: /^[a-z][a-zA-Z0-9]*\.ts$/,
    config: /^[a-z][a-zA-Z0-9]*\.config\.ts$/,
    types: /^[a-z][a-zA-Z0-9]*[Tt]ypes?\.ts$/,
    ui: /^[a-z][a-z0-9-]*\.tsx$/,
  },

  // 代码命名规则
  code: {
    variable: /^[a-z][a-zA-Z0-9]*$/,
    constant: /^[A-Z][A-Z0-9_]*$/,
    function: /^[a-z][a-zA-Z0-9]*$/,
    class: /^[A-Z][a-zA-Z0-9]*$/,
    interface: /^I?[A-Z][a-zA-Z0-9]*$/,
    enum: /^[A-Z][a-zA-Z0-9]*$/,
    enumMember: /^[A-Z][A-Z0-9_]*$/,
  },
};

/**
 * 检查结果类
 */
class NamingCheckResult {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.suggestions = [];
    this.stats = {
      totalFiles: 0,
      checkedFiles: 0,
      errorCount: 0,
      warningCount: 0,
    };
  }

  /**
   * 添加错误
   * @param {string} type - 错误类型
   * @param {string} file - 文件路径
   * @param {string} message - 错误信息
   * @param {string} suggestion - 修复建议
   */
  addError(type, file, message, suggestion = '') {
    this.errors.push({ type, file, message, suggestion });
    this.stats.errorCount++;
  }

  /**
   * 添加警告
   * @param {string} type - 警告类型
   * @param {string} file - 文件路径
   * @param {string} message - 警告信息
   * @param {string} suggestion - 修复建议
   */
  addWarning(type, file, message, suggestion = '') {
    this.warnings.push({ type, file, message, suggestion });
    this.stats.warningCount++;
  }

  /**
   * 添加建议
   * @param {string} type - 建议类型
   * @param {string} file - 文件路径
   * @param {string} message - 建议信息
   */
  addSuggestion(type, file, message) {
    this.suggestions.push({ type, file, message });
  }
}

/**
 * 命名规范检查器类
 */
class NamingConventionChecker {
  constructor() {
    this.result = new NamingCheckResult();
    this.srcPath = path.join(__dirname, '..', 'src');
  }

  /**
   * 执行完整的命名规范检查
   * @returns {NamingCheckResult} 检查结果
   */
  async checkAll() {
    console.log('🔍 开始检查命名规范...\n');

    await this.checkFileNaming();
    await this.checkCodeNaming();

    this.generateReport();
    return this.result;
  }

  /**
   * 检查文件命名规范
   */
  async checkFileNaming() {
    console.log('📁 检查文件命名规范...');

    const files = await this.getAllFiles(this.srcPath);
    this.result.stats.totalFiles = files.length;

    for (const file of files) {
      this.result.stats.checkedFiles++;
      await this.checkSingleFile(file);
    }
  }

  /**
   * 检查单个文件的命名规范
   * @param {string} filePath - 文件路径
   */
  async checkSingleFile(filePath) {
    const fileName = path.basename(filePath);
    const relativePath = path.relative(this.srcPath, filePath);
    const dir = path.dirname(relativePath);

    // 跳过特殊文件
    if (this.shouldSkipFile(fileName)) {
      return;
    }

    // 检查组件文件
    if (this.isComponentFile(filePath)) {
      if (!NAMING_RULES.files.component.test(fileName)) {
        this.result.addError(
          'component-naming',
          relativePath,
          `组件文件应使用 PascalCase 命名: ${fileName}`,
          this.suggestComponentName(fileName)
        );
      }
    }

    // 检查 Hook 文件
    else if (this.isHookFile(filePath)) {
      if (!NAMING_RULES.files.hook.test(fileName)) {
        this.result.addError(
          'hook-naming',
          relativePath,
          `Hook 文件应以 'use' 开头并使用 camelCase: ${fileName}`,
          this.suggestHookName(fileName)
        );
      }
    }

    // 检查服务文件
    else if (this.isServiceFile(filePath)) {
      if (!NAMING_RULES.files.service.test(fileName)) {
        this.result.addError(
          'service-naming',
          relativePath,
          `服务文件应以 'Service' 结尾并使用 PascalCase: ${fileName}`,
          this.suggestServiceName(fileName)
        );
      }
    }

    // 检查 UI 组件文件
    else if (this.isUIComponentFile(filePath)) {
      if (!NAMING_RULES.files.ui.test(fileName)) {
        this.result.addWarning(
          'ui-naming',
          relativePath,
          `UI 组件文件应使用 kebab-case: ${fileName}`,
          this.suggestUIName(fileName)
        );
      }
    }

    // 检查配置文件
    else if (this.isConfigFile(filePath)) {
      if (!NAMING_RULES.files.config.test(fileName)) {
        this.result.addError(
          'config-naming',
          relativePath,
          `配置文件应以 '.config.ts' 结尾: ${fileName}`,
          this.suggestConfigName(fileName)
        );
      }
    }
  }

  /**
   * 检查代码命名规范
   */
  async checkCodeNaming() {
    console.log('💻 检查代码命名规范...');

    const tsFiles = await this.getTSFiles(this.srcPath);

    for (const file of tsFiles) {
      await this.checkCodeInFile(file);
    }
  }

  /**
   * 检查文件中的代码命名
   * @param {string} filePath - 文件路径
   */
  async checkCodeInFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const relativePath = path.relative(this.srcPath, filePath);

      // 检查接口命名
      this.checkInterfaceNaming(content, relativePath);

      // 检查枚举命名
      this.checkEnumNaming(content, relativePath);

      // 检查类命名
      this.checkClassNaming(content, relativePath);

      // 检查函数命名
      this.checkFunctionNaming(content, relativePath);
    } catch (error) {
      console.warn(`⚠️  无法读取文件: ${filePath}`);
    }
  }

  /**
   * 检查接口命名
   * @param {string} content - 文件内容
   * @param {string} filePath - 文件路径
   */
  checkInterfaceNaming(content, filePath) {
    const interfaceRegex =
      /(?:^|\s)interface\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?:\s+extends|\s*\{)/g;
    let match;

    while ((match = interfaceRegex.exec(content)) !== null) {
      const interfaceName = match[1];

      // 跳过关键字
      if (
        ['extends', 'implements', 'interface', 'type', 'enum'].includes(
          interfaceName
        )
      ) {
        continue;
      }

      if (!NAMING_RULES.code.interface.test(interfaceName)) {
        this.result.addError(
          'interface-naming',
          filePath,
          `接口应使用 PascalCase: ${interfaceName}`,
          this.suggestPascalCase(interfaceName)
        );
      }
    }
  }

  /**
   * 检查枚举命名
   * @param {string} content - 文件内容
   * @param {string} filePath - 文件路径
   */
  checkEnumNaming(content, filePath) {
    const enumRegex = /enum\s+([A-Za-z_][A-Za-z0-9_]*)/g;
    let match;

    while ((match = enumRegex.exec(content)) !== null) {
      const enumName = match[1];
      if (!NAMING_RULES.code.enum.test(enumName)) {
        this.result.addError(
          'enum-naming',
          filePath,
          `枚举应使用 PascalCase: ${enumName}`,
          this.suggestPascalCase(enumName)
        );
      }
    }
  }

  /**
   * 检查类命名
   * @param {string} content - 文件内容
   * @param {string} filePath - 文件路径
   */
  checkClassNaming(content, filePath) {
    const classRegex =
      /(?:^|\s)class\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?:\s+extends|\s+implements|\s*\{)/g;
    let match;

    while ((match = classRegex.exec(content)) !== null) {
      const className = match[1];

      // 跳过关键字
      if (
        ['extends', 'implements', 'interface', 'type', 'enum'].includes(
          className
        )
      ) {
        continue;
      }

      if (!NAMING_RULES.code.class.test(className)) {
        this.result.addError(
          'class-naming',
          filePath,
          `类应使用 PascalCase: ${className}`,
          this.suggestPascalCase(className)
        );
      }
    }
  }

  /**
   * 检查函数命名
   * @param {string} content - 文件内容
   * @param {string} filePath - 文件路径
   */
  checkFunctionNaming(content, filePath) {
    const functionRegex =
      /(?:function\s+|const\s+|let\s+|var\s+)([A-Za-z_][A-Za-z0-9_]*)\s*(?:=\s*(?:async\s+)?(?:function|\(|\w+\s*=>))/g;
    let match;

    while ((match = functionRegex.exec(content)) !== null) {
      const functionName = match[1];

      // 跳过组件名（PascalCase）
      if (this.isPascalCase(functionName)) {
        continue;
      }

      if (!NAMING_RULES.code.function.test(functionName)) {
        this.result.addWarning(
          'function-naming',
          filePath,
          `函数应使用 camelCase: ${functionName}`,
          this.suggestCamelCase(functionName)
        );
      }
    }
  }

  /**
   * 获取所有文件
   * @param {string} dir - 目录路径
   * @returns {Promise<string[]>} 文件路径数组
   */
  async getAllFiles(dir) {
    const files = [];

    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (!this.shouldSkipDirectory(item)) {
          files.push(...(await this.getAllFiles(fullPath)));
        }
      } else {
        files.push(fullPath);
      }
    }

    return files;
  }

  /**
   * 获取所有 TypeScript 文件
   * @param {string} dir - 目录路径
   * @returns {Promise<string[]>} TypeScript 文件路径数组
   */
  async getTSFiles(dir) {
    const allFiles = await this.getAllFiles(dir);
    return allFiles.filter(file => /\.(ts|tsx)$/.test(file));
  }

  /**
   * 判断是否应跳过文件
   * @param {string} fileName - 文件名
   * @returns {boolean} 是否跳过
   */
  shouldSkipFile(fileName) {
    const skipPatterns = [
      /^index\.(ts|tsx)$/,
      /\.d\.ts$/,
      /\.test\.(ts|tsx)$/,
      /\.spec\.(ts|tsx)$/,
      /^vite-env\.d\.ts$/,
    ];

    return skipPatterns.some(pattern => pattern.test(fileName));
  }

  /**
   * 判断是否应跳过目录
   * @param {string} dirName - 目录名
   * @returns {boolean} 是否跳过
   */
  shouldSkipDirectory(dirName) {
    const skipDirs = [
      'node_modules',
      '.git',
      'dist',
      'build',
      '__tests__',
      'test',
      'tests',
    ];
    return skipDirs.includes(dirName);
  }

  /**
   * 判断是否为组件文件
   * @param {string} filePath - 文件路径
   * @returns {boolean} 是否为组件文件
   */
  isComponentFile(filePath) {
    const fileName = path.basename(filePath);
    const dir = path.dirname(filePath);

    // UI 组件目录下的文件不算作普通组件
    if (dir.includes('ui')) {
      return false;
    }

    return fileName.endsWith('.tsx') && !fileName.startsWith('use');
  }

  /**
   * 判断是否为 Hook 文件
   * @param {string} filePath - 文件路径
   * @returns {boolean} 是否为 Hook 文件
   */
  isHookFile(filePath) {
    const fileName = path.basename(filePath);
    const relativePath = path.relative(this.srcPath, filePath);

    // 必须以 'use' 开头
    if (!fileName.startsWith('use')) {
      return false;
    }

    // 必须是 .ts 或 .tsx 文件
    if (!/\.(ts|tsx)$/.test(fileName)) {
      return false;
    }

    // 在 hooks 目录下或者文件名明确是 Hook
    return (
      relativePath.includes('hooks/') ||
      relativePath.includes('components/ui/use-') ||
      (fileName.startsWith('use') &&
        fileName.length > 3 &&
        fileName[3] === fileName[3].toUpperCase())
    );
  }

  /**
   * 判断是否为服务文件
   * @param {string} filePath - 文件路径
   * @returns {boolean} 是否为服务文件
   */
  isServiceFile(filePath) {
    const fileName = path.basename(filePath);
    const dir = path.dirname(filePath);

    return dir.includes('services') && fileName.endsWith('.ts');
  }

  /**
   * 判断是否为 UI 组件文件
   * @param {string} filePath - 文件路径
   * @returns {boolean} 是否为 UI 组件文件
   */
  isUIComponentFile(filePath) {
    const dir = path.dirname(filePath);
    const relativePath = path.relative(this.srcPath, filePath);
    return relativePath.includes('components/ui/') && filePath.endsWith('.tsx');
  }

  /**
   * 判断是否为配置文件
   * @param {string} filePath - 文件路径
   * @returns {boolean} 是否为配置文件
   */
  isConfigFile(filePath) {
    const fileName = path.basename(filePath);
    return fileName.includes('.config.') && fileName.endsWith('.ts');
  }

  /**
   * 判断是否为 PascalCase
   * @param {string} name - 名称
   * @returns {boolean} 是否为 PascalCase
   */
  isPascalCase(name) {
    return /^[A-Z][a-zA-Z0-9]*$/.test(name);
  }

  /**
   * 建议组件名称
   * @param {string} fileName - 文件名
   * @returns {string} 建议的名称
   */
  suggestComponentName(fileName) {
    const nameWithoutExt = fileName.replace(/\.(ts|tsx)$/, '');
    return this.suggestPascalCase(nameWithoutExt) + '.tsx';
  }

  /**
   * 建议 Hook 名称
   * @param {string} fileName - 文件名
   * @returns {string} 建议的名称
   */
  suggestHookName(fileName) {
    const nameWithoutExt = fileName.replace(/\.(ts|tsx)$/, '');
    const ext = fileName.endsWith('.tsx') ? '.tsx' : '.ts';

    if (!nameWithoutExt.startsWith('use')) {
      return 'use' + this.suggestPascalCase(nameWithoutExt) + ext;
    }

    return this.suggestCamelCase(nameWithoutExt) + ext;
  }

  /**
   * 建议服务名称
   * @param {string} fileName - 文件名
   * @returns {string} 建议的名称
   */
  suggestServiceName(fileName) {
    const nameWithoutExt = fileName.replace(/\.ts$/, '');

    if (!nameWithoutExt.endsWith('Service')) {
      return this.suggestPascalCase(nameWithoutExt) + 'Service.ts';
    }

    return this.suggestPascalCase(nameWithoutExt) + '.ts';
  }

  /**
   * 建议 UI 组件名称
   * @param {string} fileName - 文件名
   * @returns {string} 建议的名称
   */
  suggestUIName(fileName) {
    const nameWithoutExt = fileName.replace(/\.tsx$/, '');
    return this.toKebabCase(nameWithoutExt) + '.tsx';
  }

  /**
   * 建议配置文件名称
   * @param {string} fileName - 文件名
   * @returns {string} 建议的名称
   */
  suggestConfigName(fileName) {
    const nameWithoutExt = fileName.replace(/\.ts$/, '');

    if (!nameWithoutExt.includes('.config')) {
      return this.suggestCamelCase(nameWithoutExt) + '.config.ts';
    }

    return fileName;
  }

  /**
   * 建议 PascalCase 名称
   * @param {string} name - 原始名称
   * @returns {string} PascalCase 名称
   */
  suggestPascalCase(name) {
    return name
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/\s/g, '');
  }

  /**
   * 建议 camelCase 名称
   * @param {string} name - 原始名称
   * @returns {string} camelCase 名称
   */
  suggestCamelCase(name) {
    const pascalCase = this.suggestPascalCase(name);
    return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
  }

  /**
   * 转换为 kebab-case
   * @param {string} name - 原始名称
   * @returns {string} kebab-case 名称
   */
  toKebabCase(name) {
    return name
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '')
      .replace(/[-_]+/g, '-');
  }

  /**
   * 生成检查报告
   */
  generateReport() {
    console.log('\n📊 命名规范检查报告');
    console.log('='.repeat(50));

    console.log(`\n📈 统计信息:`);
    console.log(`  总文件数: ${this.result.stats.totalFiles}`);
    console.log(`  检查文件数: ${this.result.stats.checkedFiles}`);
    console.log(`  错误数: ${this.result.stats.errorCount}`);
    console.log(`  警告数: ${this.result.stats.warningCount}`);

    if (this.result.errors.length > 0) {
      console.log(`\n❌ 错误 (${this.result.errors.length}):`);
      this.result.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. [${error.type}] ${error.file}`);
        console.log(`     ${error.message}`);
        if (error.suggestion) {
          console.log(`     建议: ${error.suggestion}`);
        }
        console.log('');
      });
    }

    if (this.result.warnings.length > 0) {
      console.log(`\n⚠️  警告 (${this.result.warnings.length}):`);
      this.result.warnings.forEach((warning, index) => {
        console.log(`  ${index + 1}. [${warning.type}] ${warning.file}`);
        console.log(`     ${warning.message}`);
        if (warning.suggestion) {
          console.log(`     建议: ${warning.suggestion}`);
        }
        console.log('');
      });
    }

    if (this.result.suggestions.length > 0) {
      console.log(`\n💡 建议 (${this.result.suggestions.length}):`);
      this.result.suggestions.forEach((suggestion, index) => {
        console.log(`  ${index + 1}. [${suggestion.type}] ${suggestion.file}`);
        console.log(`     ${suggestion.message}`);
        console.log('');
      });
    }

    if (this.result.errors.length === 0 && this.result.warnings.length === 0) {
      console.log('\n✅ 恭喜！所有文件都符合命名规范！');
    } else {
      console.log('\n🔧 请根据上述建议修复命名问题。');
    }

    console.log(
      '\n📚 详细的命名规范请参考: .trae/documents/NAMING_CONVENTIONS.md'
    );
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    const checker = new NamingConventionChecker();
    const result = await checker.checkAll();

    // 如果有错误，退出码为 1
    if (result.errors.length > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ 检查过程中发生错误:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (
  import.meta.url.endsWith(process.argv[1]) ||
  process.argv[1].endsWith('checkNamingConventions.js')
) {
  main();
}

export { NamingConventionChecker, NAMING_RULES };
