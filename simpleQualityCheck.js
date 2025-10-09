/**
 * 简化版代码质量检查工具
 */

import fs from 'fs';
import path from 'path';

console.log('🚀 开始代码质量配置...\n');

// 1. 创建质量配置文件
const qualityConfig = {
  eslint: {
    enabled: true,
    autoFix: true,
    maxErrors: 0,
    maxWarnings: 10
  },
  prettier: {
    enabled: true,
    autoFormat: true
  },
  typescript: {
    enabled: true,
    strict: true,
    maxErrors: 0
  },
  tests: {
    enabled: true,
    coverage: {
      threshold: 80
    }
  },
  preCommitHooks: {
    enabled: true,
    runLint: true,
    runTests: true,
    runTypeCheck: true
  }
};

const configPath = path.join(process.cwd(), 'quality.config.json');
fs.writeFileSync(configPath, JSON.stringify(qualityConfig, null, 2));
console.log(`✅ 质量配置文件已创建: ${configPath}`);

// 2. 更新package.json脚本
const packagePath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// 添加质量检查脚本
packageJson.scripts = {
  ...packageJson.scripts,
  'quality:check': 'node simpleQualityCheck.js',
  'quality:fix': 'npm run lint:fix && npm run format',
  'type-check': 'tsc --noEmit',
  'pre-commit': 'npm run quality:fix && npm run type-check'
};

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
console.log('✅ package.json脚本已更新');

// 3. 创建Git Hooks配置
const gitHooksDir = path.join(process.cwd(), '.git', 'hooks');
if (fs.existsSync(gitHooksDir)) {
  const preCommitHook = `#!/bin/sh
# 代码质量检查
echo "🔍 运行代码质量检查..."
npm run quality:fix
npm run type-check

if [ $? -ne 0 ]; then
  echo "❌ 代码质量检查失败，请修复后再提交"
  exit 1
fi

echo "✅ 代码质量检查通过"
`;

  const preCommitPath = path.join(gitHooksDir, 'pre-commit');
  fs.writeFileSync(preCommitPath, preCommitHook);
  
  // 在Windows上设置可执行权限
  try {
    fs.chmodSync(preCommitPath, '755');
  } catch (error) {
    console.log('⚠️  无法设置Git Hook权限，请手动设置');
  }
  
  console.log('✅ Git pre-commit hook已配置');
}

// 4. 创建开发工具配置
const vscodeDir = path.join(process.cwd(), '.vscode');
if (!fs.existsSync(vscodeDir)) {
  fs.mkdirSync(vscodeDir);
}

// VS Code设置
const vscodeSettings = {
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "eslint.validate": ["typescript", "typescriptreact"],
  "prettier.requireConfig": true
};

fs.writeFileSync(
  path.join(vscodeDir, 'settings.json'),
  JSON.stringify(vscodeSettings, null, 2)
);
console.log('✅ VS Code设置已配置');

// VS Code扩展推荐
const vscodeExtensions = {
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json"
  ]
};

fs.writeFileSync(
  path.join(vscodeDir, 'extensions.json'),
  JSON.stringify(vscodeExtensions, null, 2)
);
console.log('✅ VS Code扩展推荐已配置');

console.log('\n📊 代码质量工具配置完成！');
console.log('='.repeat(50));
console.log('✅ 质量配置文件: quality.config.json');
console.log('✅ package.json脚本已更新');
console.log('✅ Git pre-commit hook已配置');
console.log('✅ VS Code设置已配置');
console.log('\n🚀 可用命令:');
console.log('  - npm run quality:check  # 运行质量检查');
console.log('  - npm run quality:fix    # 自动修复问题');
console.log('  - npm run type-check     # TypeScript类型检查');
console.log('  - npm run pre-commit     # 提交前检查');
console.log('\n✨ 开发体验已优化！');