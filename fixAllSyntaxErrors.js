/**
 * 修复JSDoc自动添加导致的语法错误
 * 专门处理import语句、接口定义、枚举等语法问题
 */

import fs from 'fs';
import path from 'path';

class SyntaxErrorFixer {
  constructor() {
    this.fixedFiles = 0;
    this.totalErrors = 0;
    this.errorTypes = {
      importStatements: 0,
      extraCommas: 0,
      incompleteStatements: 0,
      jsdocFormat: 0,
      enumDefinitions: 0,
      interfaceDefinitions: 0,
    };
  }

  /**
   * 修复import语句中的问题
   */
  fixImportStatements(content) {
    let fixed = content;
    let changes = 0;

    // 修复被分割的import语句
    fixed = fixed.replace(
      /import\s*{\s*([^}]*)\s*,\s*\n\s*import\s*{/g,
      (match, p1) => {
        changes++;
        return `import {\n  ${p1.trim()},`;
      }
    );

    // 修复import语句中间的JSDoc注释
    fixed = fixed.replace(
      /import\s*{\s*([^}]*?)\s*\/\*\*[\s\S]*?\*\/\s*([^}]*?)\s*}\s*from/g,
      (match, before, after) => {
        changes++;
        return `import { ${before.trim()}, ${after.trim()} } from`;
      }
    );

    // 修复不完整的import语句
    fixed = fixed.replace(/import\s*{\s*([^}]*?),\s*$/gm, (match, imports) => {
      changes++;
      return `import { ${imports.trim()} } from`;
    });

    // 修复多余的逗号在import语句末尾
    fixed = fixed.replace(
      /import\s*{\s*([^}]*?),\s*}\s*from/g,
      (match, imports) => {
        changes++;
        return `import { ${imports.trim()} } from`;
      }
    );

    this.errorTypes.importStatements += changes;
    return fixed;
  }

  /**
   * 修复多余的逗号和分号
   */
  fixExtraCommas(content) {
    let fixed = content;
    let changes = 0;

    // 修复对象/接口定义中的多余逗号
    fixed = fixed.replace(/,\s*}/g, match => {
      changes++;
      return ' }';
    });

    // 修复数组中的多余逗号
    fixed = fixed.replace(/,\s*]/g, match => {
      changes++;
      return ' ]';
    });

    // 修复函数参数中的多余逗号
    fixed = fixed.replace(/,\s*\)/g, match => {
      changes++;
      return ')';
    });

    // 修复语句末尾的多余逗号
    fixed = fixed.replace(/,\s*;/g, match => {
      changes++;
      return ';';
    });

    this.errorTypes.extraCommas += changes;
    return fixed;
  }

  /**
   * 修复不完整的语句
   */
  fixIncompleteStatements(content) {
    let fixed = content;
    let changes = 0;

    // 修复不完整的函数声明
    fixed = fixed.replace(
      /export\s+const\s+(\w+)\s*=\s*\(\s*;/g,
      (match, funcName) => {
        changes++;
        return `export const ${funcName} = (`;
      }
    );

    // 修复不完整的对象属性
    fixed = fixed.replace(/:\s*;/g, match => {
      changes++;
      return ': unknown;';
    });

    this.errorTypes.incompleteStatements += changes;
    return fixed;
  }

  /**
   * 修复JSDoc格式问题
   */
  fixJSDocFormat(content) {
    let fixed = content;
    let changes = 0;

    // 修复JSDoc注释格式
    fixed = fixed.replace(
      /\/\*\*\s*\n\s*\*\s*([^\n]*)\s*\n\s*\*\/\s*\n\s*([^\/\*\n]*)\s*\n/g,
      (match, comment, code) => {
        if (code.trim()) {
          changes++;
          return `/**\n * ${comment.trim()}\n */\n${code.trim()}\n`;
        }
        return match;
      }
    );

    // 修复单行JSDoc注释
    fixed = fixed.replace(/\/\*\*\s*([^*]*?)\s*\*\//g, (match, comment) => {
      if (comment.trim()) {
        changes++;
        return `/** ${comment.trim()} */`;
      }
      return match;
    });

    this.errorTypes.jsdocFormat += changes;
    return fixed;
  }

  /**
   * 修复枚举定义问题
   */
  fixEnumDefinitions(content) {
    let fixed = content;
    let changes = 0;

    // 修复枚举成员后的多余逗号
    fixed = fixed.replace(/enum\s+\w+\s*{[^}]*,\s*}/g, match => {
      changes++;
      return match.replace(/,(\s*})/, '$1');
    });

    this.errorTypes.enumDefinitions += changes;
    return fixed;
  }

  /**
   * 修复接口定义问题
   */
  fixInterfaceDefinitions(content) {
    let fixed = content;
    let changes = 0;

    // 修复接口属性后的多余逗号
    fixed = fixed.replace(/interface\s+\w+\s*{[^}]*,\s*}/g, match => {
      changes++;
      return match.replace(/,(\s*})/, '$1');
    });

    this.errorTypes.interfaceDefinitions += changes;
    return fixed;
  }

  /**
   * 修复单个文件
   */
  fixFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let fixed = content;

      // 应用所有修复
      fixed = this.fixImportStatements(fixed);
      fixed = this.fixExtraCommas(fixed);
      fixed = this.fixIncompleteStatements(fixed);
      fixed = this.fixJSDocFormat(fixed);
      fixed = this.fixEnumDefinitions(fixed);
      fixed = this.fixInterfaceDefinitions(fixed);

      // 如果有修改，写回文件
      if (fixed !== content) {
        fs.writeFileSync(filePath, fixed, 'utf8');
        this.fixedFiles++;
        console.log(`✅ 修复文件: ${path.relative(process.cwd(), filePath)}`);
        return true;
      }

      return false;
    } catch (error) {
      console.error(`❌ 修复文件失败: ${filePath}`, error.message);
      return false;
    }
  }

  /**
   * 扫描并修复目录中的所有TypeScript文件
   */
  fixDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (
        stat.isDirectory() &&
        !file.startsWith('.') &&
        file !== 'node_modules'
      ) {
        this.fixDirectory(fullPath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        this.fixFile(fullPath);
      }
    }
  }

  /**
   * 运行修复程序
   */
  run() {
    console.log('🔧 开始修复语法错误...\n');

    const srcPath = path.join(process.cwd(), 'src');
    if (fs.existsSync(srcPath)) {
      this.fixDirectory(srcPath);
    }

    // 输出统计信息
    console.log('\n📊 修复统计:');
    console.log(`- 修复文件数: ${this.fixedFiles}`);
    console.log(`- Import语句修复: ${this.errorTypes.importStatements}`);
    console.log(`- 多余逗号修复: ${this.errorTypes.extraCommas}`);
    console.log(`- 不完整语句修复: ${this.errorTypes.incompleteStatements}`);
    console.log(`- JSDoc格式修复: ${this.errorTypes.jsdocFormat}`);
    console.log(`- 枚举定义修复: ${this.errorTypes.enumDefinitions}`);
    console.log(`- 接口定义修复: ${this.errorTypes.interfaceDefinitions}`);

    const totalFixes = Object.values(this.errorTypes).reduce(
      (sum, count) => sum + count,
      0
    );
    console.log(`\n✨ 总计修复 ${totalFixes} 个语法错误`);
  }
}

// 运行修复程序
const fixer = new SyntaxErrorFixer();
fixer.run();
