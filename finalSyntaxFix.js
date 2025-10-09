/**
 * 最终语法错误修复脚本
 * 处理剩余的语法问题
 */

import fs from 'fs';
import path from 'path';

class FinalSyntaxFixer {
  constructor() {
    this.fixedFiles = 0;
    this.totalFixes = 0;
  }

  /**
   * 修复单个文件的所有语法问题
   */
  fixFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;

      // 1. 修复接口/类型定义中的格式问题
      content = content.replace(/}\s*;\s*}/g, '}\n}');

      // 2. 修复函数参数和返回类型的格式
      content = content.replace(
        /\)\s*:\s*{\s*([^}]+)\s*}\s*=>\s*{/g,
        '): { $1 } => {'
      );

      // 3. 修复对象字面量的格式
      content = content.replace(/{\s*([^}]+)\s*}\s*;/g, '{ $1 };');

      // 4. 修复多余的空格和分号
      content = content.replace(/\s+;/g, ';');
      content = content.replace(/;\s*}/g, '\n}');

      // 5. 修复import语句末尾的问题
      content = content.replace(/}\s*from/g, ' } from');

      // 6. 修复函数声明中的问题
      content = content.replace(/=>\s*{\s*([^{]+)\s*}/g, '=> {\n  $1\n}');

      // 7. 修复枚举定义
      content = content.replace(
        /enum\s+(\w+)\s*{\s*([^}]+)\s*}\s*;/g,
        (match, enumName, enumBody) => {
          const cleanBody = enumBody.replace(/,\s*$/, '').trim();
          return `enum ${enumName} {\n  ${cleanBody}\n}`;
        }
      );

      // 8. 修复接口定义
      content = content.replace(
        /interface\s+(\w+)\s*{\s*([^}]+)\s*}\s*;/g,
        (match, interfaceName, interfaceBody) => {
          const cleanBody = interfaceBody.replace(/,\s*$/, '').trim();
          return `interface ${interfaceName} {\n  ${cleanBody}\n}`;
        }
      );

      // 9. 修复JSDoc注释后的代码格式
      content = content.replace(/\*\/\s*([^\/\n]+)\s*{/g, '*/\n$1 {');

      // 10. 修复return语句的格式
      content = content.replace(
        /return\s*{\s*([^}]+)\s*}\s*;/g,
        'return {\n    $1\n  };'
      );

      // 11. 修复条件语句的格式
      content = content.replace(
        /if\s*\([^)]+\)\s*{\s*([^}]+)\s*}\s*;/g,
        match => {
          return match.replace(/}\s*;/, ' }');
        }
      );

      // 12. 修复多余的逗号和分号组合
      content = content.replace(/,\s*;\s*}/g, '\n}');
      content = content.replace(/;\s*,/g, ',');

      // 13. 修复函数参数中的多余逗号
      content = content.replace(/,\s*\)/g, ')');

      // 14. 修复对象属性的格式
      content = content.replace(/:\s*([^,}\n]+)\s*}/g, ': $1\n}');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        this.fixedFiles++;
        this.totalFixes++;
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
    console.log('🔧 开始最终语法修复...\n');

    const srcPath = path.join(process.cwd(), 'src');
    if (fs.existsSync(srcPath)) {
      this.fixDirectory(srcPath);
    }

    console.log(`\n✨ 最终修复完成，共修复 ${this.fixedFiles} 个文件`);
  }
}

// 运行修复程序
const fixer = new FinalSyntaxFixer();
fixer.run();
