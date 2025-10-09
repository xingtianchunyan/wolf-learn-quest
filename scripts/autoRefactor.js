/**
 * 自动化重构工具
 * @author SOLO Coding
 * @description 自动执行常见的代码重构操作，提升代码质量
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 自动重构器类
 */
class AutoRefactor {
  constructor() {
    this.srcPath = path.join(process.cwd(), 'src');
    this.backupPath = path.join(process.cwd(), '.refactor-backup');
    this.refactorLog = [];
    this.dryRun = false;
  }

  /**
   * 主执行函数
   * @param {Object} options - 选项
   * @param {boolean} options.dryRun - 是否为试运行
   * @param {string[]} options.rules - 要应用的规则
   */
  async run(options = {}) {
    this.dryRun = options.dryRun || false;
    const rules = options.rules || [
      'removeUnusedImports',
      'extractConstants',
      'simplifyConditionals',
      'removeDeadCode',
      'optimizeLoops',
      'extractFunctions',
      'addTypeAnnotations',
    ];

    console.log(`🔧 开始自动重构${this.dryRun ? ' (试运行模式)' : ''}...\n`);

    if (!this.dryRun) {
      // 创建备份
      await this.createBackup();
    }

    // 获取所有文件
    const files = this.getFilesRecursively(this.srcPath, [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
    ]);

    // 应用重构规则
    for (const rule of rules) {
      console.log(`📝 应用规则: ${rule}`);
      await this.applyRule(rule, files);
    }

    // 生成报告
    await this.generateReport();

    console.log(
      `✨ 自动重构完成！${this.dryRun ? ' (试运行模式，未实际修改文件)' : ''}`
    );
  }

  /**
   * 创建备份
   */
  async createBackup() {
    console.log('💾 创建代码备份...');

    if (fs.existsSync(this.backupPath)) {
      fs.rmSync(this.backupPath, { recursive: true, force: true });
    }

    fs.mkdirSync(this.backupPath, { recursive: true });

    // 复制src目录到备份目录
    await this.copyDirectory(this.srcPath, path.join(this.backupPath, 'src'));

    console.log('✅ 备份创建完成');
  }

  /**
   * 复制目录
   * @param {string} src - 源目录
   * @param {string} dest - 目标目录
   */
  async copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);

    for (const item of items) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      const stat = fs.statSync(srcPath);

      if (stat.isDirectory()) {
        await this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  /**
   * 递归获取文件
   * @param {string} dir - 目录路径
   * @param {string[]} extensions - 文件扩展名
   * @returns {string[]} 文件路径数组
   */
  getFilesRecursively(dir, extensions) {
    const files = [];

    if (!fs.existsSync(dir)) {
      return files;
    }

    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (!this.shouldSkipDirectory(item)) {
          files.push(...this.getFilesRecursively(fullPath, extensions));
        }
      } else if (extensions.some(ext => fullPath.endsWith(ext))) {
        files.push(fullPath);
      }
    }

    return files;
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
   * 应用重构规则
   * @param {string} ruleName - 规则名称
   * @param {string[]} files - 文件列表
   */
  async applyRule(ruleName, files) {
    const ruleMethod = this[ruleName];
    if (!ruleMethod) {
      console.log(`⚠️  未找到规则: ${ruleName}`);
      return;
    }

    let changedFiles = 0;

    for (const filePath of files) {
      const originalContent = fs.readFileSync(filePath, 'utf8');
      const newContent = await ruleMethod.call(this, originalContent, filePath);

      if (newContent !== originalContent) {
        if (!this.dryRun) {
          fs.writeFileSync(filePath, newContent, 'utf8');
        }

        changedFiles++;
        this.refactorLog.push({
          rule: ruleName,
          file: path.relative(this.srcPath, filePath),
          changes: this.getChangeSummary(originalContent, newContent),
        });
      }
    }

    console.log(`  ✅ ${ruleName}: 修改了 ${changedFiles} 个文件`);
  }

  /**
   * 获取变更摘要
   * @param {string} original - 原始内容
   * @param {string} modified - 修改后内容
   * @returns {string} 变更摘要
   */
  getChangeSummary(original, modified) {
    const originalLines = original.split('\n').length;
    const modifiedLines = modified.split('\n').length;
    const lineDiff = modifiedLines - originalLines;

    return `行数变化: ${lineDiff > 0 ? '+' : ''}${lineDiff}`;
  }

  /**
   * 移除未使用的导入
   * @param {string} content - 文件内容
   * @param {string} filePath - 文件路径
   * @returns {string} 修改后的内容
   */
  async removeUnusedImports(content, filePath) {
    const lines = content.split('\n');
    const imports = [];
    const usedIdentifiers = new Set();

    // 收集所有导入
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const importMatch = line.match(
        /import\s+(?:{([^}]+)}|(\w+)|\*\s+as\s+(\w+))\s+from\s+['"]([^'"]+)['"]/
      );

      if (importMatch) {
        imports.push({
          lineIndex: i,
          fullLine: line,
          namedImports: importMatch[1]
            ? importMatch[1].split(',').map(s => s.trim())
            : [],
          defaultImport: importMatch[2],
          namespaceImport: importMatch[3],
          module: importMatch[4],
        });
      }
    }

    // 收集使用的标识符
    const codeContent = lines.slice(imports.length).join('\n');
    const identifierPattern = /\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/g;
    let match;

    while ((match = identifierPattern.exec(codeContent)) !== null) {
      usedIdentifiers.add(match[0]);
    }

    // 过滤未使用的导入
    const filteredLines = [...lines];

    for (let i = imports.length - 1; i >= 0; i--) {
      const imp = imports[i];
      let hasUsedImports = false;

      // 检查默认导入
      if (imp.defaultImport && usedIdentifiers.has(imp.defaultImport)) {
        hasUsedImports = true;
      }

      // 检查命名空间导入
      if (imp.namespaceImport && usedIdentifiers.has(imp.namespaceImport)) {
        hasUsedImports = true;
      }

      // 检查命名导入
      const usedNamedImports = imp.namedImports.filter(name =>
        usedIdentifiers.has(name)
      );
      if (usedNamedImports.length > 0) {
        hasUsedImports = true;

        // 如果只有部分命名导入被使用，更新导入语句
        if (usedNamedImports.length < imp.namedImports.length) {
          const newImportLine = imp.fullLine.replace(
            `{${imp.namedImports.join(', ')}}`,
            `{${usedNamedImports.join(', ')}}`
          );
          filteredLines[imp.lineIndex] = newImportLine;
        }
      }

      // 移除完全未使用的导入
      if (!hasUsedImports) {
        filteredLines.splice(imp.lineIndex, 1);
      }
    }

    return filteredLines.join('\n');
  }

  /**
   * 提取常量
   * @param {string} content - 文件内容
   * @param {string} filePath - 文件路径
   * @returns {string} 修改后的内容
   */
  async extractConstants(content, filePath) {
    let modifiedContent = content;

    // 提取魔法数字
    const magicNumbers = /\b(\d{2,})\b/g;
    const numberOccurrences = new Map();

    let match;
    while ((match = magicNumbers.exec(content)) !== null) {
      const number = match[1];
      if (number !== '100' && number !== '200' && number !== '404') {
        // 排除常见的HTTP状态码
        numberOccurrences.set(number, (numberOccurrences.get(number) || 0) + 1);
      }
    }

    // 提取重复出现的字符串
    const stringLiterals = /['"`]([^'"`]{10,})['"`]/g;
    const stringOccurrences = new Map();

    while ((match = stringLiterals.exec(content)) !== null) {
      const str = match[1];
      if (!str.includes(' ') || str.length > 50) continue; // 跳过太长或包含空格的字符串
      stringOccurrences.set(str, (stringOccurrences.get(str) || 0) + 1);
    }

    // 生成常量定义
    const constants = [];

    // 处理数字常量
    for (const [number, count] of numberOccurrences) {
      if (count >= 3) {
        const constantName = `CONSTANT_${number}`;
        constants.push(`const ${constantName} = ${number};`);

        const regex = new RegExp(`\\b${number}\\b`, 'g');
        modifiedContent = modifiedContent.replace(regex, constantName);
      }
    }

    // 处理字符串常量
    for (const [str, count] of stringOccurrences) {
      if (count >= 2) {
        const constantName = `CONSTANT_${str.toUpperCase().replace(/[^A-Z0-9]/g, '_')}`;
        constants.push(`const ${constantName} = '${str}';`);

        const regex = new RegExp(
          `['"\`]${str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"\`]`,
          'g'
        );
        modifiedContent = modifiedContent.replace(regex, constantName);
      }
    }

    // 插入常量定义
    if (constants.length > 0) {
      const lines = modifiedContent.split('\n');
      const importEndIndex = this.findImportEndIndex(lines);

      lines.splice(
        importEndIndex + 1,
        0,
        '',
        '// 提取的常量',
        ...constants,
        ''
      );
      modifiedContent = lines.join('\n');
    }

    return modifiedContent;
  }

  /**
   * 找到导入语句结束的位置
   * @param {string[]} lines - 代码行数组
   * @returns {number} 导入结束位置
   */
  findImportEndIndex(lines) {
    let lastImportIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('import ') || line.startsWith('export ')) {
        lastImportIndex = i;
      } else if (
        line !== '' &&
        !line.startsWith('//') &&
        !line.startsWith('/*')
      ) {
        break;
      }
    }

    return lastImportIndex;
  }

  /**
   * 简化条件语句
   * @param {string} content - 文件内容
   * @param {string} filePath - 文件路径
   * @returns {string} 修改后的内容
   */
  async simplifyConditionals(content, filePath) {
    let modifiedContent = content;

    // 简化 if (condition === true) 为 if (condition)
    modifiedContent = modifiedContent.replace(
      /if\s*\(\s*([^)]+)\s*===\s*true\s*\)/g,
      'if ($1)'
    );

    // 简化 if (condition === false) 为 if (!condition)
    modifiedContent = modifiedContent.replace(
      /if\s*\(\s*([^)]+)\s*===\s*false\s*\)/g,
      'if (!$1)'
    );

    // 简化 if (condition !== false) 为 if (condition)
    modifiedContent = modifiedContent.replace(
      /if\s*\(\s*([^)]+)\s*!==\s*false\s*\)/g,
      'if ($1)'
    );

    // 简化 if (condition !== true) 为 if (!condition)
    modifiedContent = modifiedContent.replace(
      /if\s*\(\s*([^)]+)\s*!==\s*true\s*\)/g,
      'if (!$1)'
    );

    // 简化三元运算符 condition ? true : false 为 condition
    modifiedContent = modifiedContent.replace(
      /([^?]+)\s*\?\s*true\s*:\s*false/g,
      '$1'
    );

    // 简化三元运算符 condition ? false : true 为 !condition
    modifiedContent = modifiedContent.replace(
      /([^?]+)\s*\?\s*false\s*:\s*true/g,
      '!($1)'
    );

    return modifiedContent;
  }

  /**
   * 移除死代码
   * @param {string} content - 文件内容
   * @param {string} filePath - 文件路径
   * @returns {string} 修改后的内容
   */
  async removeDeadCode(content, filePath) {
    let modifiedContent = content;

    // 移除 console.log 语句（保留 console.error 和 console.warn）
    modifiedContent = modifiedContent.replace(
      /^\s*console\.log\([^)]*\);\s*$/gm,
      ''
    );

    // 移除空的 if 语句
    modifiedContent = modifiedContent.replace(/if\s*\([^)]+\)\s*{\s*}/g, '');

    // 移除空的 else 语句
    modifiedContent = modifiedContent.replace(/else\s*{\s*}/g, '');

    // 移除多余的空行（超过2行连续空行）
    modifiedContent = modifiedContent.replace(/\n\s*\n\s*\n/g, '\n\n');

    // 移除注释掉的代码行（以 // 开头且包含代码特征）
    const lines = modifiedContent.split('\n');
    const filteredLines = lines.filter(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('//')) {
        // 保留文档注释和说明性注释
        return !trimmed.match(
          /\/\/\s*(const|let|var|function|if|for|while|return)/
        );
      }
      return true;
    });

    return filteredLines.join('\n');
  }

  /**
   * 优化循环
   * @param {string} content - 文件内容
   * @param {string} filePath - 文件路径
   * @returns {string} 修改后的内容
   */
  async optimizeLoops(content, filePath) {
    let modifiedContent = content;

    // 优化 for 循环中的数组长度缓存
    modifiedContent = modifiedContent.replace(
      /for\s*\(\s*let\s+(\w+)\s*=\s*0;\s*\1\s*<\s*([^.]+)\.length;\s*\1\+\+\s*\)/g,
      'for (let $1 = 0, len = $2.length; $1 < len; $1++)'
    );

    // 建议使用 forEach 替代简单的 for 循环
    // 这里只是标记，不自动替换，因为可能改变语义
    const forLoopPattern = /for\s*\(\s*let\s+\w+\s*=\s*0[^}]+{\s*([^}]+)\s*}/g;
    let match;

    while ((match = forLoopPattern.exec(content)) !== null) {
      const loopBody = match[1];
      if (loopBody.includes('break') || loopBody.includes('continue')) {
        continue; // 不能简单替换包含 break/continue 的循环
      }

      // 在这里可以添加更复杂的循环优化逻辑
    }

    return modifiedContent;
  }

  /**
   * 提取函数
   * @param {string} content - 文件内容
   * @param {string} filePath - 文件路径
   * @returns {string} 修改后的内容
   */
  async extractFunctions(content, filePath) {
    // 这是一个复杂的重构，这里提供基础实现
    // 实际项目中可能需要更复杂的AST分析

    let modifiedContent = content;
    const lines = content.split('\n');
    const extractedFunctions = [];

    // 查找重复的代码块（简化版本）
    const codeBlocks = new Map();

    for (let i = 0; i < lines.length - 3; i++) {
      const block = lines
        .slice(i, i + 4)
        .join('\n')
        .trim();

      if (block && !this.isCommentBlock(block) && block.length > 50) {
        const hash = this.hashCode(block);

        if (codeBlocks.has(hash)) {
          const existing = codeBlocks.get(hash);

          // 如果发现重复代码块，提取为函数
          const functionName = `extracted_${Math.abs(hash).toString(16)}`;
          const functionDef = `\nconst ${functionName} = () => {\n${block}\n};\n`;

          if (!extractedFunctions.includes(functionDef)) {
            extractedFunctions.push(functionDef);
          }
        } else {
          codeBlocks.set(hash, { startLine: i, block });
        }
      }
    }

    // 插入提取的函数
    if (extractedFunctions.length > 0) {
      const importEndIndex = this.findImportEndIndex(lines);
      lines.splice(
        importEndIndex + 1,
        0,
        '',
        '// 提取的函数',
        ...extractedFunctions
      );
      modifiedContent = lines.join('\n');
    }

    return modifiedContent;
  }

  /**
   * 判断是否为注释块
   * @param {string} block - 代码块
   * @returns {boolean} 是否为注释块
   */
  isCommentBlock(block) {
    const lines = block.split('\n');
    const commentLines = lines.filter(line => {
      const trimmed = line.trim();
      return (
        trimmed.startsWith('//') ||
        trimmed.startsWith('*') ||
        trimmed.startsWith('/*')
      );
    });

    return commentLines.length > lines.length * 0.5;
  }

  /**
   * 计算字符串哈希值
   * @param {string} str - 字符串
   * @returns {number} 哈希值
   */
  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  }

  /**
   * 添加类型注解
   * @param {string} content - 文件内容
   * @param {string} filePath - 文件路径
   * @returns {string} 修改后的内容
   */
  async addTypeAnnotations(content, filePath) {
    // 只处理 .ts 和 .tsx 文件
    if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) {
      return content;
    }

    let modifiedContent = content;

    // 为函数参数添加基本类型注解
    modifiedContent = modifiedContent.replace(
      /function\s+(\w+)\s*\(\s*(\w+)\s*\)/g,
      'function $1($2: any)'
    );

    // 为箭头函数参数添加类型注解
    modifiedContent = modifiedContent.replace(
      /const\s+(\w+)\s*=\s*\(\s*(\w+)\s*\)\s*=>/g,
      'const $1 = ($2: any) =>'
    );

    // 为变量添加类型注解（基于初始值推断）
    modifiedContent = modifiedContent.replace(
      /const\s+(\w+)\s*=\s*(\d+);/g,
      'const $1: number = $2;'
    );

    modifiedContent = modifiedContent.replace(
      /const\s+(\w+)\s*=\s*['"`]([^'"`]*)['"`];/g,
      "const $1: string = '$2';"
    );

    modifiedContent = modifiedContent.replace(
      /const\s+(\w+)\s*=\s*(true|false);/g,
      'const $1: boolean = $2;'
    );

    return modifiedContent;
  }

  /**
   * 生成重构报告
   */
  async generateReport() {
    console.log('\n📊 生成重构报告...');

    const report = {
      timestamp: new Date().toISOString(),
      dryRun: this.dryRun,
      summary: {
        totalFiles: this.refactorLog.length,
        rulesSummary: this.getRulesSummary(),
      },
      details: this.refactorLog,
    };

    // 生成JSON报告
    const reportsPath = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsPath)) {
      fs.mkdirSync(reportsPath, { recursive: true });
    }

    fs.writeFileSync(
      path.join(reportsPath, 'refactor-report.json'),
      JSON.stringify(report, null, 2),
      'utf8'
    );

    // 生成Markdown报告
    const markdownReport = this.generateMarkdownReport(report);
    fs.writeFileSync(
      path.join(reportsPath, 'refactor-report.md'),
      markdownReport,
      'utf8'
    );

    // 打印摘要
    console.log('\n📋 重构摘要:');
    for (const [rule, count] of Object.entries(report.summary.rulesSummary)) {
      console.log(`  ${rule}: ${count} 个文件`);
    }

    console.log(`\n📁 报告已保存到 reports/ 目录`);
  }

  /**
   * 获取规则摘要
   * @returns {Object} 规则摘要
   */
  getRulesSummary() {
    const summary = {};

    for (const log of this.refactorLog) {
      summary[log.rule] = (summary[log.rule] || 0) + 1;
    }

    return summary;
  }

  /**
   * 生成Markdown报告
   * @param {Object} report - 报告数据
   * @returns {string} Markdown内容
   */
  generateMarkdownReport(report) {
    return `# 自动重构报告

## 概述

**执行时间**: ${new Date(report.timestamp).toLocaleString()}
**模式**: ${report.dryRun ? '试运行' : '实际执行'}
**修改文件数**: ${report.summary.totalFiles}

## 规则执行摘要

${Object.entries(report.summary.rulesSummary)
  .map(
    ([rule, count]) => `
- **${rule}**: ${count} 个文件
`
  )
  .join('')}

## 详细变更

${report.details
  .map(
    detail => `
### ${detail.file}

**规则**: ${detail.rule}
**变更**: ${detail.changes}

---
`
  )
  .join('')}

## 建议

1. 在应用重构后，运行完整的测试套件确保功能正常
2. 检查代码格式是否符合项目规范
3. 验证类型检查是否通过
4. 考虑进一步的手动优化

---

*报告由自动重构工具生成*`;
  }
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const rules = args.includes('--rules')
    ? args[args.indexOf('--rules') + 1]?.split(',')
    : undefined;

  const refactor = new AutoRefactor();
  await refactor.run({ dryRun, rules });
}

// 执行脚本
if (
  import.meta.url.endsWith(process.argv[1]) ||
  process.argv[1].endsWith('autoRefactor.js')
) {
  main().catch(console.error);
}

export { AutoRefactor };
