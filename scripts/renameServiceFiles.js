/**
 * 文件级注释：服务文件重命名脚本
 * 批量将camelCase的服务文件重命名为PascalCase格式
 * 确保符合项目命名规范
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 将camelCase转换为PascalCase
 * @param {string} str - camelCase字符串
 * @returns {string} PascalCase字符串
 */
function toPascalCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 服务文件重命名器类
 */
class ServiceFileRenamer {
  constructor() {
    this.servicesPath = path.join(__dirname, '..', 'src', 'services');
    this.renamedFiles = [];
    this.errors = [];
  }

  /**
   * 执行批量重命名
   */
  async renameAll() {
    console.log('🔄 开始重命名服务文件...\n');

    try {
      const files = fs.readdirSync(this.servicesPath);
      const serviceFiles = files.filter(
        file =>
          file.endsWith('Service.ts') &&
          file !== 'index.ts' &&
          !file.startsWith('__')
      );

      console.log(`📁 找到 ${serviceFiles.length} 个服务文件`);

      for (const file of serviceFiles) {
        await this.renameFile(file);
      }

      this.generateReport();
    } catch (error) {
      console.error('❌ 重命名过程中发生错误:', error.message);
      process.exit(1);
    }
  }

  /**
   * 重命名单个文件
   * @param {string} fileName - 文件名
   */
  async renameFile(fileName) {
    const oldPath = path.join(this.servicesPath, fileName);

    // 检查是否需要重命名（是否为camelCase）
    const nameWithoutExt = fileName.replace('.ts', '');
    const firstChar = nameWithoutExt.charAt(0);

    if (firstChar === firstChar.toUpperCase()) {
      console.log(`✅ ${fileName} 已经是PascalCase，跳过`);
      return;
    }

    const newFileName = toPascalCase(fileName);
    const newPath = path.join(this.servicesPath, newFileName);

    try {
      // 检查新文件是否已存在
      if (fs.existsSync(newPath)) {
        console.log(`⚠️  ${newFileName} 已存在，跳过重命名 ${fileName}`);
        return;
      }

      // 执行重命名
      fs.renameSync(oldPath, newPath);

      this.renamedFiles.push({
        old: fileName,
        new: newFileName,
      });

      console.log(`✅ ${fileName} → ${newFileName}`);
    } catch (error) {
      this.errors.push({
        file: fileName,
        error: error.message,
      });
      console.error(`❌ 重命名失败 ${fileName}:`, error.message);
    }
  }

  /**
   * 生成重命名报告
   */
  generateReport() {
    console.log('\n📊 重命名报告');
    console.log('='.repeat(50));

    console.log(`\n📈 统计信息:`);
    console.log(`  成功重命名: ${this.renamedFiles.length} 个文件`);
    console.log(`  失败: ${this.errors.length} 个文件`);

    if (this.renamedFiles.length > 0) {
      console.log(`\n✅ 成功重命名的文件:`);
      this.renamedFiles.forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.old} → ${item.new}`);
      });
    }

    if (this.errors.length > 0) {
      console.log(`\n❌ 重命名失败的文件:`);
      this.errors.forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.file}: ${item.error}`);
      });
    }

    if (this.errors.length === 0) {
      console.log('\n🎉 所有服务文件重命名完成！');
    } else {
      console.log('\n⚠️  部分文件重命名失败，请手动处理。');
    }
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    const renamer = new ServiceFileRenamer();
    await renamer.renameAll();

    // 如果有错误，退出码为 1
    if (renamer.errors.length > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ 脚本执行失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (
  import.meta.url.endsWith(process.argv[1]) ||
  process.argv[1].endsWith('renameServiceFiles.js')
) {
  main();
}

export { ServiceFileRenamer };
