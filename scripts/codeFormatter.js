/**
 * 代码格式化工具
 * @author SOLO Coding
 * @description 统一代码格式，确保代码风格一致性
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 代码格式化器类
 */
class CodeFormatter {
  constructor() {
    this.srcPath = path.join(process.cwd(), 'src');
    this.formatRules = {
      indentSize: 2,
      indentType: 'spaces', // 'spaces' or 'tabs'
      maxLineLength: 100,
      trailingComma: true,
      semicolons: true,
      singleQuotes: true,
      bracketSpacing: true,
      arrowParens: 'avoid',
    };
    this.formatLog = [];
  }

  /**
   * 主执行函数
   * @param {Object} options - 选项
   * @param {boolean} options.dryRun - 是否为试运行
   * @param {string[]} options.fileTypes - 要格式化的文件类型
   */
  async run(options = {}) {
    const dryRun = options.dryRun || false;
    const fileTypes = options.fileTypes || [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.css',
      '.scss',
      '.json',
    ];

    console.log(`🎨 开始代码格式化${dryRun ? ' (试运行模式)' : ''}...\n`);

    // 获取所有文件
    const files = this.getFilesRecursively(this.srcPath, fileTypes);

    // 格式化文件
    for (const filePath of files) {
      await this.formatFile(filePath, dryRun);
    }

    // 生成报告
    await this.generateReport(dryRun);

    console.log(
      `✨ 代码格式化完成！${dryRun ? ' (试运行模式，未实际修改文件)' : ''}`
    );
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
   * 格式化单个文件
   * @param {string} filePath - 文件路径
   * @param {boolean} dryRun - 是否为试运行
   */
  async formatFile(filePath, dryRun) {
    try {
      const originalContent = fs.readFileSync(filePath, 'utf8');
      const extension = path.extname(filePath);

      let formattedContent;

      switch (extension) {
        case '.ts':
        case '.tsx':
        case '.js':
        case '.jsx':
          formattedContent = this.formatJavaScript(originalContent);
          break;
        case '.css':
        case '.scss':
          formattedContent = this.formatCSS(originalContent);
          break;
        case '.json':
          formattedContent = this.formatJSON(originalContent);
          break;
        default:
          return; // 跳过不支持的文件类型
      }

      if (formattedContent !== originalContent) {
        if (!dryRun) {
          fs.writeFileSync(filePath, formattedContent, 'utf8');
        }

        this.formatLog.push({
          file: path.relative(this.srcPath, filePath),
          type: extension,
          changes: this.getChangeSummary(originalContent, formattedContent),
        });

        console.log(`✅ 格式化: ${path.relative(this.srcPath, filePath)}`);
      }
    } catch (error) {
      console.error(
        `❌ 格式化失败: ${path.relative(this.srcPath, filePath)} - ${error.message}`
      );
    }
  }

  /**
   * 格式化JavaScript/TypeScript代码
   * @param {string} content - 文件内容
   * @returns {string} 格式化后的内容
   */
  formatJavaScript(content) {
    let formatted = content;

    // 1. 统一缩进
    formatted = this.normalizeIndentation(formatted);

    // 2. 统一引号
    if (this.formatRules.singleQuotes) {
      formatted = this.normalizeSingleQuotes(formatted);
    }

    // 3. 统一分号
    if (this.formatRules.semicolons) {
      formatted = this.addSemicolons(formatted);
    }

    // 4. 格式化对象和数组
    formatted = this.formatObjectsAndArrays(formatted);

    // 5. 格式化函数
    formatted = this.formatFunctions(formatted);

    // 6. 格式化导入语句
    formatted = this.formatImports(formatted);

    // 7. 移除多余空行
    formatted = this.removeExtraBlankLines(formatted);

    // 8. 格式化注释
    formatted = this.formatComments(formatted);

    return formatted;
  }

  /**
   * 统一缩进
   * @param {string} content - 内容
   * @returns {string} 格式化后的内容
   */
  normalizeIndentation(content) {
    const lines = content.split('\n');
    const indentChar =
      this.formatRules.indentType === 'tabs'
        ? '\t'
        : ' '.repeat(this.formatRules.indentSize);
    let indentLevel = 0;

    return lines
      .map(line => {
        const trimmed = line.trim();

        if (trimmed === '') {
          return '';
        }

        // 减少缩进级别
        if (
          trimmed.startsWith('}') ||
          trimmed.startsWith(']') ||
          trimmed.startsWith(')')
        ) {
          indentLevel = Math.max(0, indentLevel - 1);
        }

        const formattedLine = indentChar.repeat(indentLevel) + trimmed;

        // 增加缩进级别
        if (
          trimmed.endsWith('{') ||
          trimmed.endsWith('[') ||
          trimmed.endsWith('(')
        ) {
          indentLevel++;
        }

        return formattedLine;
      })
      .join('\n');
  }

  /**
   * 统一使用单引号
   * @param {string} content - 内容
   * @returns {string} 格式化后的内容
   */
  normalizeSingleQuotes(content) {
    // 将双引号替换为单引号（排除字符串内部的引号）
    return content.replace(/"([^"\\]*(\\.[^"\\]*)*)"/g, "'$1'");
  }

  /**
   * 添加分号
   * @param {string} content - 内容
   * @returns {string} 格式化后的内容
   */
  addSemicolons(content) {
    const lines = content.split('\n');

    return lines
      .map(line => {
        const trimmed = line.trim();

        // 需要分号的语句
        if (
          trimmed &&
          !trimmed.endsWith(';') &&
          !trimmed.endsWith('{') &&
          !trimmed.endsWith('}') &&
          !trimmed.endsWith(',') &&
          !trimmed.startsWith('//') &&
          !trimmed.startsWith('/*') &&
          !trimmed.startsWith('*') &&
          !trimmed.includes('//') &&
          (trimmed.includes('=') ||
            trimmed.startsWith('return') ||
            trimmed.startsWith('throw') ||
            trimmed.startsWith('break') ||
            trimmed.startsWith('continue'))
        ) {
          return line + ';';
        }

        return line;
      })
      .join('\n');
  }

  /**
   * 格式化对象和数组
   * @param {string} content - 内容
   * @returns {string} 格式化后的内容
   */
  formatObjectsAndArrays(content) {
    let formatted = content;

    // 在对象大括号内添加空格
    if (this.formatRules.bracketSpacing) {
      formatted = formatted.replace(/{\s*([^}]+)\s*}/g, '{ $1 }');
    }

    // 格式化数组
    formatted = formatted.replace(/\[\s*([^\]]+)\s*\]/g, '[$1]');

    // 添加尾随逗号
    if (this.formatRules.trailingComma) {
      formatted = formatted.replace(/([^,\s])\s*\n\s*}/g, '$1,\n}');
      formatted = formatted.replace(/([^,\s])\s*\n\s*\]/g, '$1,\n]');
    }

    return formatted;
  }

  /**
   * 格式化函数
   * @param {string} content - 内容
   * @returns {string} 格式化后的内容
   */
  formatFunctions(content) {
    let formatted = content;

    // 格式化箭头函数
    if (this.formatRules.arrowParens === 'avoid') {
      formatted = formatted.replace(/\(\s*(\w+)\s*\)\s*=>/g, '$1 =>');
    }

    // 在函数参数周围添加适当的空格
    formatted = formatted.replace(
      /function\s*\(\s*([^)]*)\s*\)/g,
      'function($1)'
    );
    formatted = formatted.replace(/\(\s*([^)]*)\s*\)\s*=>/g, '($1) =>');

    return formatted;
  }

  /**
   * 格式化导入语句
   * @param {string} content - 内容
   * @returns {string} 格式化后的内容
   */
  formatImports(content) {
    const lines = content.split('\n');
    const imports = [];
    const otherLines = [];

    // 分离导入语句和其他代码
    for (const line of lines) {
      if (line.trim().startsWith('import ')) {
        imports.push(line);
      } else {
        otherLines.push(line);
      }
    }

    // 排序导入语句
    imports.sort((a, b) => {
      // 先按模块类型排序（内置模块 -> 第三方模块 -> 相对模块）
      const aIsRelative = a.includes('./') || a.includes('../');
      const bIsRelative = b.includes('./') || b.includes('../');

      if (aIsRelative !== bIsRelative) {
        return aIsRelative ? 1 : -1;
      }

      // 然后按字母顺序排序
      return a.localeCompare(b);
    });

    // 重新组合
    const result = [];
    if (imports.length > 0) {
      result.push(...imports);
      result.push(''); // 在导入后添加空行
    }
    result.push(...otherLines);

    return result.join('\n');
  }

  /**
   * 移除多余空行
   * @param {string} content - 内容
   * @returns {string} 格式化后的内容
   */
  removeExtraBlankLines(content) {
    // 将多个连续空行替换为单个空行
    return content.replace(/\n\s*\n\s*\n/g, '\n\n');
  }

  /**
   * 格式化注释
   * @param {string} content - 内容
   * @returns {string} 格式化后的内容
   */
  formatComments(content) {
    let formatted = content;

    // 确保单行注释后有空格
    formatted = formatted.replace(/\/\/([^\s])/g, '// $1');

    // 格式化多行注释
    formatted = formatted.replace(/\/\*([^*])/g, '/* $1');
    formatted = formatted.replace(/([^*])\*\//g, '$1 */');

    return formatted;
  }

  /**
   * 格式化CSS代码
   * @param {string} content - 文件内容
   * @returns {string} 格式化后的内容
   */
  formatCSS(content) {
    let formatted = content;

    // 1. 统一缩进
    formatted = this.normalizeIndentation(formatted);

    // 2. 格式化选择器
    formatted = formatted.replace(/,\s*/g, ',\n');

    // 3. 格式化属性
    formatted = formatted.replace(/:\s*/g, ': ');
    formatted = formatted.replace(/;\s*/g, ';\n');

    // 4. 格式化大括号
    formatted = formatted.replace(/{\s*/g, ' {\n');
    formatted = formatted.replace(/}\s*/g, '\n}\n');

    // 5. 移除多余空行
    formatted = this.removeExtraBlankLines(formatted);

    return formatted;
  }

  /**
   * 格式化JSON代码
   * @param {string} content - 文件内容
   * @returns {string} 格式化后的内容
   */
  formatJSON(content) {
    try {
      const parsed = JSON.parse(content);
      return JSON.stringify(parsed, null, this.formatRules.indentSize);
    } catch (error) {
      console.warn('JSON格式化失败，保持原样');
      return content;
    }
  }

  /**
   * 获取变更摘要
   * @param {string} original - 原始内容
   * @param {string} formatted - 格式化后内容
   * @returns {Object} 变更摘要
   */
  getChangeSummary(original, formatted) {
    const originalLines = original.split('\n').length;
    const formattedLines = formatted.split('\n').length;
    const lineDiff = formattedLines - originalLines;

    // 计算字符差异
    const charDiff = formatted.length - original.length;

    return {
      linesDiff: lineDiff,
      charsDiff: charDiff,
      originalLines,
      formattedLines,
    };
  }

  /**
   * 生成格式化报告
   * @param {boolean} dryRun - 是否为试运行
   */
  async generateReport(dryRun) {
    console.log('\n📊 生成格式化报告...');

    const report = {
      timestamp: new Date().toISOString(),
      dryRun,
      summary: {
        totalFiles: this.formatLog.length,
        fileTypes: this.getFileTypesSummary(),
        totalLineChanges: this.formatLog.reduce(
          (sum, log) => sum + Math.abs(log.changes.linesDiff),
          0
        ),
        totalCharChanges: this.formatLog.reduce(
          (sum, log) => sum + Math.abs(log.changes.charsDiff),
          0
        ),
      },
      formatRules: this.formatRules,
      details: this.formatLog,
    };

    // 生成JSON报告
    const reportsPath = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsPath)) {
      fs.mkdirSync(reportsPath, { recursive: true });
    }

    fs.writeFileSync(
      path.join(reportsPath, 'format-report.json'),
      JSON.stringify(report, null, 2),
      'utf8'
    );

    // 生成Markdown报告
    const markdownReport = this.generateMarkdownReport(report);
    fs.writeFileSync(
      path.join(reportsPath, 'format-report.md'),
      markdownReport,
      'utf8'
    );

    // 打印摘要
    console.log('\n📋 格式化摘要:');
    console.log(`  格式化文件数: ${report.summary.totalFiles}`);
    console.log(`  总行数变化: ${report.summary.totalLineChanges}`);
    console.log(`  总字符变化: ${report.summary.totalCharChanges}`);

    for (const [type, count] of Object.entries(report.summary.fileTypes)) {
      console.log(`  ${type}: ${count} 个文件`);
    }

    console.log(`\n📁 报告已保存到 reports/ 目录`);
  }

  /**
   * 获取文件类型摘要
   * @returns {Object} 文件类型摘要
   */
  getFileTypesSummary() {
    const summary = {};

    for (const log of this.formatLog) {
      summary[log.type] = (summary[log.type] || 0) + 1;
    }

    return summary;
  }

  /**
   * 生成Markdown报告
   * @param {Object} report - 报告数据
   * @returns {string} Markdown内容
   */
  generateMarkdownReport(report) {
    return `# 代码格式化报告

## 概述

**执行时间**: ${new Date(report.timestamp).toLocaleString()}
**模式**: ${report.dryRun ? '试运行' : '实际执行'}
**格式化文件数**: ${report.summary.totalFiles}
**总行数变化**: ${report.summary.totalLineChanges}
**总字符变化**: ${report.summary.totalCharChanges}

## 格式化规则

- **缩进大小**: ${report.formatRules.indentSize}
- **缩进类型**: ${report.formatRules.indentType}
- **最大行长度**: ${report.formatRules.maxLineLength}
- **尾随逗号**: ${report.formatRules.trailingComma ? '是' : '否'}
- **分号**: ${report.formatRules.semicolons ? '是' : '否'}
- **单引号**: ${report.formatRules.singleQuotes ? '是' : '否'}
- **括号间距**: ${report.formatRules.bracketSpacing ? '是' : '否'}
- **箭头函数括号**: ${report.formatRules.arrowParens}

## 文件类型统计

${Object.entries(report.summary.fileTypes)
  .map(
    ([type, count]) => `
- **${type}**: ${count} 个文件
`
  )
  .join('')}

## 详细变更

${report.details
  .map(
    detail => `
### ${detail.file}

**类型**: ${detail.type}
**行数变化**: ${detail.changes.linesDiff > 0 ? '+' : ''}${detail.changes.linesDiff}
**字符变化**: ${detail.changes.charsDiff > 0 ? '+' : ''}${detail.changes.charsDiff}
**原始行数**: ${detail.changes.originalLines}
**格式化后行数**: ${detail.changes.formattedLines}

---
`
  )
  .join('')}

## 建议

1. 配置编辑器自动格式化功能
2. 设置保存时自动格式化
3. 在CI/CD中添加格式检查
4. 团队成员统一使用相同的格式化配置

---

*报告由代码格式化工具生成*`;
  }
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const fileTypes = args.includes('--types')
    ? args[args.indexOf('--types') + 1]?.split(',')
    : undefined;

  const formatter = new CodeFormatter();
  await formatter.run({ dryRun, fileTypes });
}

// 执行脚本
if (
  import.meta.url.endsWith(process.argv[1]) ||
  process.argv[1].endsWith('codeFormatter.js')
) {
  main().catch(console.error);
}

export { CodeFormatter };
