/**
 * 自动更新重命名文件的导入引用脚本
 * @author SOLO Coding
 * @description 批量更新文件中的导入路径
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 更新导入引用的映射表
 */
const importUpdates = [
  {
    from: '@/hooks/use-toast',
    to: '@/hooks/useToast',
  },
  {
    from: '@/components/ui/use-toast',
    to: '@/components/ui/useToast',
  },
  {
    from: '@/hooks/use-mobile',
    to: '@/hooks/useMobile',
  },
  {
    from: './use-toast',
    to: './useToast',
  },
];

/**
 * 更新单个文件中的导入
 * @param {string} filePath - 文件路径
 */
function updateFileImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    importUpdates.forEach(({ from, to }) => {
      const regex = new RegExp(
        `(['"])${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`,
        'g'
      );
      if (regex.test(content)) {
        content = content.replace(regex, `$1${to}$1`);
        hasChanges = true;
      }
    });

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ 已更新: ${path.relative(process.cwd(), filePath)}`);
    }
  } catch (error) {
    console.error(`❌ 更新失败 ${filePath}:`, error.message);
  }
}

/**
 * 递归扫描目录并更新文件
 * @param {string} dir - 目录路径
 */
function scanAndUpdate(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 跳过 node_modules 等目录
      if (!['node_modules', '.git', 'dist', 'build'].includes(file)) {
        scanAndUpdate(filePath);
      }
    } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
      updateFileImports(filePath);
    }
  });
}

/**
 * 主函数
 */
function main() {
  console.log('🔄 开始更新导入引用...\n');

  const srcPath = path.join(process.cwd(), 'src');
  scanAndUpdate(srcPath);

  console.log('\n✨ 导入引用更新完成！');
}

// 执行脚本
if (
  import.meta.url.endsWith(process.argv[1]) ||
  process.argv[1].endsWith('updateImports.js')
) {
  main();
}

export { updateFileImports, scanAndUpdate };
