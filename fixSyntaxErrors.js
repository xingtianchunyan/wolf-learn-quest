/**
 * 修复JSDoc自动添加导致的语法错误脚本
 *
 * 主要修复问题：
 * - import语句中的注释
 * - 多余的逗号
 * - 不完整的语句
 * - 格式问题
 *
 * @author AI Assistant
 * @version 1.0.0
 */

import fs from 'fs';
import path from 'path';

/**
 * 语法错误修复器类
 */
class SyntaxErrorFixer {
  /**
   * 构造函数
   */
  constructor() {
    this.fixedFiles = 0;
    this.totalErrors = 0;
  }

  /**
   * 修复所有文件
   */
  async fixAllFiles() {
    console.log('🔧 开始修复语法错误...\n');

    const srcDir = 'src';
    await this.processDirectory(srcDir);

    console.log(`\n✅ 修复完成！`);
    console.log(`📊 统计信息:`);
    console.log(`  - 修复文件: ${this.fixedFiles} 个`);
    console.log(`  - 修复错误: ${this.totalErrors} 个`);
  }

  /**
   * 处理目录
   * @param {string} dir - 目录路径
   */
  async processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        await this.processDirectory(filePath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        await this.fixFile(filePath);
      }
    }
  }

  /**
   * 修复单个文件
   * @param {string} filePath - 文件路径
   */
  async fixFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;

      let fixedContent = content;
      let errorCount = 0;

      // 1. 修复import语句中的注释
      fixedContent = this.fixImportStatements(fixedContent);
      if (fixedContent !== content) errorCount++;

      // 2. 修复多余的逗号
      fixedContent = this.fixTrailingCommas(fixedContent);
      if (fixedContent !== originalContent) errorCount++;

      // 3. 修复不完整的语句
      fixedContent = this.fixIncompleteStatements(fixedContent);
      if (fixedContent !== originalContent) errorCount++;

      // 4. 修复JSDoc注释格式
      fixedContent = this.fixJSDocComments(fixedContent);
      if (fixedContent !== originalContent) errorCount++;

      // 5. 修复枚举定义
      fixedContent = this.fixEnumDefinitions(fixedContent);
      if (fixedContent !== originalContent) errorCount++;

      // 6. 修复接口定义
      fixedContent = this.fixInterfaceDefinitions(fixedContent);
      if (fixedContent !== originalContent) errorCount++;

      // 如果有修改，保存文件
      if (fixedContent !== originalContent) {
        // 创建备份
        const backupPath = `${filePath}.backup`;
        if (!fs.existsSync(backupPath)) {
          fs.writeFileSync(backupPath, originalContent);
        }

        fs.writeFileSync(filePath, fixedContent);
        this.fixedFiles++;
        this.totalErrors += errorCount;

        console.log(`✅ ${filePath} - 修复了 ${errorCount} 个问题`);
      }
    } catch (error) {
      console.error(`❌ 修复文件失败: ${filePath}`, error.message);
    }
  }

  /**
   * 修复import语句中的注释
   * @param {string} content - 文件内容
   * @returns {string} 修复后的内容
   */
  fixImportStatements(content) {
    // 修复import语句中间的注释
    let fixed = content;

    // 匹配被注释破坏的import语句
    const importPattern = /import\s*{\s*([^}]*)\s*}\s*from\s*['"][^'"]*['"];?/g;

    fixed = fixed.replace(importPattern, match => {
      // 移除import语句内部的注释
      let cleanImport = match;

      // 移除多行注释
      cleanImport = cleanImport.replace(/\/\*[\s\S]*?\*\//g, '');

      // 移除单行注释
      cleanImport = cleanImport.replace(/\/\/.*$/gm, '');

      // 清理多余的空白和换行
      cleanImport = cleanImport.replace(/\s+/g, ' ').trim();

      // 确保正确的格式
      const importMatch = cleanImport.match(
        /import\s*{\s*([^}]*)\s*}\s*from\s*(['"][^'"]*['"])/
      );
      if (importMatch) {
        const imports = importMatch[1]
          .split(',')
          .map(item => item.trim())
          .filter(
            item => item && !item.startsWith('/**') && !item.startsWith('*')
          )
          .join(', ');

        return `import { ${imports} } from ${importMatch[2]};`;
      }

      return cleanImport;
    });

    // 修复被分割的import语句
    fixed = fixed.replace(
      /import\s*{\s*([^}]*)\s*import\s*{\s*([^}]*)\s*}\s*from/g,
      'import { $1, $2 } from'
    );

    return fixed;
  }

  /**
   * 修复多余的逗号
   * @param {string} content - 文件内容
   * @returns {string} 修复后的内容
   */
  fixTrailingCommas(content) {
    let fixed = content;

    // 修复对象和接口定义中的多余逗号
    fixed = fixed.replace(/,(\s*[}\]])/g, '$1');

    // 修复函数参数中的多余逗号
    fixed = fixed.replace(/,(\s*\))/g, '$1');

    // 修复数组中的多余逗号
    fixed = fixed.replace(/,(\s*\])/g, '$1');

    return fixed;
  }

  /**
   * 修复不完整的语句
   * @param {string} content - 文件内容
   * @returns {string} 修复后的内容
   */
  fixIncompleteStatements(content) {
    let fixed = content;

    // 修复不完整的函数定义
    fixed = fixed.replace(
      /export\s+const\s+(\w+)\s*=\s*\(;/g,
      'export const $1 = ('
    );

    // 修复不完整的变量声明
    fixed = fixed.replace(/const\s+(\w+)\s*=\s*{;/g, 'const $1 = {');

    // 修复不完整的返回语句
    fixed = fixed.replace(/return\s*{;/g, 'return {');

    return fixed;
  }

  /**
   * 修复JSDoc注释格式
   * @param {string} content - 文件内容
   * @returns {string} 修复后的内容
   */
  fixJSDocComments(content) {
    let fixed = content;

    // 修复JSDoc注释的结束标记
    fixed = fixed.replace(/\*\s*\//g, ' */');

    // 修复JSDoc注释的开始标记
    fixed = fixed.replace(/\/\*\*(?!\s)/g, '/**\n *');

    // 确保JSDoc注释在正确的位置
    fixed = fixed.replace(
      /(\w+)\s*\/\*\*([^*]|\*(?!\/))*\*\/\s*:/g,
      (match, name, comment) => {
        return `/**${comment}*/\n  ${name}:`;
      }
    );

    return fixed;
  }

  /**
   * 修复枚举定义
   * @param {string} content - 文件内容
   * @returns {string} 修复后的内容
   */
  fixEnumDefinitions(content) {
    let fixed = content;

    // 修复枚举成员定义
    fixed = fixed.replace(/(\w+)\s*=\s*'([^']*)',;/g, "$1 = '$2',");
    fixed = fixed.replace(/(\w+)\s*=\s*"([^"]*)",;/g, '$1 = "$2",');

    // 修复枚举成员后的分号
    fixed = fixed.replace(/(\w+)\s*=\s*'([^']*)';,/g, "$1 = '$2',");
    fixed = fixed.replace(/(\w+)\s*=\s*"([^"]*)";,/g, '$1 = "$2",');

    return fixed;
  }

  /**
   * 修复接口定义
   * @param {string} content - 文件内容
   * @returns {string} 修复后的内容
   */
  fixInterfaceDefinitions(content) {
    let fixed = content;

    // 修复接口属性定义
    fixed = fixed.replace(/(\w+):\s*([^;,}]+);,/g, '$1: $2;');
    fixed = fixed.replace(/(\w+)\?\s*:\s*([^;,}]+);,/g, '$1?: $2;');

    // 修复接口方法定义
    fixed = fixed.replace(/(\w+)\s*\([^)]*\)\s*:\s*([^;,}]+);,/g, '$1($2);');

    return fixed;
  }
}

/**
 * 主函数
 */
async function main() {
  const fixer = new SyntaxErrorFixer();
  await fixer.fixAllFiles();
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ 修复失败:', error);
    process.exit(1);
  });
}

export { SyntaxErrorFixer };
