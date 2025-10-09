/**
 * @fileoverview Git钩子设置脚本 - 自动配置Git钩子以确保代码质量
 * @author SOLO Coding
 * @version 1.0.0
 */

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

/**
 * Git钩子管理器类
 */
class GitHooksManager {
  constructor() {
    this.hooksDir = path.join(projectRoot, '.git', 'hooks');
    this.scriptsDir = path.join(projectRoot, 'scripts');
  }

  /**
   * 检查Git仓库是否存在
   */
  async checkGitRepository() {
    try {
      await fs.access(path.join(projectRoot, '.git'));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 创建pre-commit钩子
   */
  async createPreCommitHook() {
    const hookContent = `#!/bin/sh
# Pre-commit hook - 提交前代码质量检查
# 此钩子在每次提交前自动运行，确保代码质量

echo "🔍 运行提交前检查..."

# 检查是否有暂存的文件
if git diff --cached --quiet; then
  echo "⚠️  没有暂存的文件，跳过检查"
  exit 0
fi

# 运行代码格式化
echo "📝 格式化代码..."
npm run format:code
if [ $? -ne 0 ]; then
  echo "❌ 代码格式化失败"
  exit 1
fi

# 运行ESLint检查
echo "🔧 运行ESLint检查..."
npm run lint:check
if [ $? -ne 0 ]; then
  echo "❌ ESLint检查失败，请修复代码风格问题"
  echo "💡 提示：运行 'npm run lint:fix' 自动修复部分问题"
  exit 1
fi

# 运行TypeScript类型检查
echo "🔍 运行TypeScript类型检查..."
npm run type-check
if [ $? -ne 0 ]; then
  echo "❌ TypeScript类型检查失败"
  exit 1
fi

# 运行单元测试
echo "🧪 运行单元测试..."
npm run test:unit
if [ $? -ne 0 ]; then
  echo "❌ 单元测试失败"
  exit 1
fi

# 检查提交信息格式（如果有commitlint配置）
if [ -f ".commitlintrc.js" ] || [ -f ".commitlintrc.json" ]; then
  echo "📝 检查提交信息格式..."
  npx commitlint --edit "$1"
  if [ $? -ne 0 ]; then
    echo "❌ 提交信息格式不符合规范"
    exit 1
  fi
fi

echo "✅ 所有检查通过，准备提交"
`;

    const hookPath = path.join(this.hooksDir, 'pre-commit');
    await fs.writeFile(hookPath, hookContent);
    await this.makeExecutable(hookPath);
    console.log('✅ pre-commit钩子已创建');
  }

  /**
   * 创建pre-push钩子
   */
  async createPrePushHook() {
    const hookContent = `#!/bin/sh
# Pre-push hook - 推送前完整检查
# 此钩子在推送前运行更全面的检查

echo "🚀 运行推送前检查..."

# 获取当前分支
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\\(.*\\),\\1,')
echo "📍 当前分支: $current_branch"

# 运行代码质量分析
echo "📊 运行代码质量分析..."
npm run quality:analyze
if [ $? -ne 0 ]; then
  echo "❌ 代码质量分析失败"
  exit 1
fi

# 运行完整测试套件
echo "🧪 运行完整测试套件..."
npm run test:all
if [ $? -ne 0 ]; then
  echo "❌ 测试失败"
  exit 1
fi

# 尝试构建项目
echo "🏗️  构建项目..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ 项目构建失败"
  exit 1
fi

# 检查依赖安全性
echo "🔒 检查依赖安全性..."
npm audit --audit-level=moderate
if [ $? -ne 0 ]; then
  echo "⚠️  发现安全漏洞，请运行 'npm audit fix' 修复"
  echo "❓ 是否继续推送？(y/N)"
  read -r response
  if [ "$response" != "y" ] && [ "$response" != "Y" ]; then
    exit 1
  fi
fi

# 如果是主分支，进行额外检查
if [ "$current_branch" = "main" ] || [ "$current_branch" = "master" ]; then
  echo "🎯 检测到主分支，进行额外检查..."
  
  # 运行端到端测试
  echo "🌐 运行端到端测试..."
  npm run test:e2e
  if [ $? -ne 0 ]; then
    echo "❌ 端到端测试失败"
    exit 1
  fi
  
  # 检查版本号是否更新
  if git diff HEAD~1 package.json | grep -q '"version"'; then
    echo "📦 检测到版本号更新"
  else
    echo "⚠️  主分支推送但版本号未更新"
    echo "❓ 是否继续推送？(y/N)"
    read -r response
    if [ "$response" != "y" ] && [ "$response" != "Y" ]; then
      exit 1
    fi
  fi
fi

echo "✅ 所有检查通过，准备推送"
`;

    const hookPath = path.join(this.hooksDir, 'pre-push');
    await fs.writeFile(hookPath, hookContent);
    await this.makeExecutable(hookPath);
    console.log('✅ pre-push钩子已创建');
  }

  /**
   * 创建commit-msg钩子
   */
  async createCommitMsgHook() {
    const hookContent = `#!/bin/sh
# Commit message hook - 提交信息格式检查
# 确保提交信息符合约定式提交规范

commit_regex='^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\\(.+\\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
  echo "❌ 提交信息格式不正确！"
  echo ""
  echo "📝 提交信息应该遵循约定式提交规范："
  echo "   <类型>[可选的作用域]: <描述>"
  echo ""
  echo "🏷️  可用的类型："
  echo "   feat:     新功能"
  echo "   fix:      修复bug"
  echo "   docs:     文档更新"
  echo "   style:    代码格式调整（不影响功能）"
  echo "   refactor: 代码重构"
  echo "   test:     测试相关"
  echo "   chore:    构建过程或辅助工具的变动"
  echo "   perf:     性能优化"
  echo "   ci:       CI/CD相关"
  echo "   build:    构建系统或外部依赖的变动"
  echo "   revert:   回滚提交"
  echo ""
  echo "✅ 正确示例："
  echo "   feat: 添加用户登录功能"
  echo "   fix(auth): 修复登录验证问题"
  echo "   docs: 更新API文档"
  echo "   style: 统一代码缩进格式"
  echo ""
  exit 1
fi

# 检查提交信息长度
commit_msg=$(cat "$1")
if [ \${#commit_msg} -gt 72 ]; then
  echo "⚠️  提交信息过长（超过72个字符）"
  echo "💡 建议将详细说明放在提交信息的正文部分"
fi

echo "✅ 提交信息格式正确"
`;

    const hookPath = path.join(this.hooksDir, 'commit-msg');
    await fs.writeFile(hookPath, hookContent);
    await this.makeExecutable(hookPath);
    console.log('✅ commit-msg钩子已创建');
  }

  /**
   * 创建post-commit钩子
   */
  async createPostCommitHook() {
    const hookContent = `#!/bin/sh
# Post-commit hook - 提交后操作
# 在提交完成后执行一些自动化任务

echo "📝 提交完成，执行后续操作..."

# 获取最新提交信息
commit_msg=$(git log -1 --pretty=%B)
commit_hash=$(git log -1 --pretty=%H)
commit_author=$(git log -1 --pretty=%an)

echo "📋 提交信息: $commit_msg"
echo "🔗 提交哈希: $commit_hash"
echo "👤 提交作者: $commit_author"

# 如果是功能提交，自动生成变更日志
if echo "$commit_msg" | grep -q "^feat"; then
  echo "🆕 检测到新功能提交，更新变更日志..."
  npm run changelog:update 2>/dev/null || echo "⚠️  变更日志更新脚本不存在"
fi

# 如果是文档提交，自动重新生成文档
if echo "$commit_msg" | grep -q "^docs"; then
  echo "📚 检测到文档提交，重新生成文档..."
  npm run docs:generate 2>/dev/null || echo "⚠️  文档生成脚本不存在"
fi

# 更新代码统计
echo "📊 更新代码统计..."
npm run stats:update 2>/dev/null || echo "⚠️  代码统计脚本不存在"

echo "✅ 后续操作完成"
`;

    const hookPath = path.join(this.hooksDir, 'post-commit');
    await fs.writeFile(hookPath, hookContent);
    await this.makeExecutable(hookPath);
    console.log('✅ post-commit钩子已创建');
  }

  /**
   * 创建prepare-commit-msg钩子
   */
  async createPrepareCommitMsgHook() {
    const hookContent = `#!/bin/sh
# Prepare commit message hook - 准备提交信息
# 自动为提交信息添加有用的信息

commit_file="$1"
commit_source="$2"
commit_sha="$3"

# 如果是合并提交，不做处理
if [ "$commit_source" = "merge" ]; then
  exit 0
fi

# 获取当前分支名
branch_name=$(git symbolic-ref --short HEAD 2>/dev/null)

# 如果分支名包含issue号，自动添加到提交信息
if echo "$branch_name" | grep -qE "^(feature|fix|hotfix)/[0-9]+"; then
  issue_number=$(echo "$branch_name" | grep -oE "[0-9]+" | head -1)
  if [ -n "$issue_number" ]; then
    # 在提交信息末尾添加issue引用
    echo "" >> "$commit_file"
    echo "Refs: #$issue_number" >> "$commit_file"
  fi
fi

# 添加变更文件统计
changed_files=$(git diff --cached --name-only | wc -l)
if [ "$changed_files" -gt 0 ]; then
  echo "" >> "$commit_file"
  echo "# 变更统计:" >> "$commit_file"
  echo "# 修改文件数: $changed_files" >> "$commit_file"
  
  # 显示变更的文件类型
  git diff --cached --name-only | sed 's/.*\\.//' | sort | uniq -c | while read count ext; do
    echo "# $ext 文件: $count 个" >> "$commit_file"
  done
fi

# 添加提交模板提示
if [ ! -s "$commit_file" ] || [ "$commit_source" = "template" ]; then
  cat >> "$commit_file" << 'EOF'

# 提交信息格式：<类型>[作用域]: <描述>
#
# 类型说明：
# feat:     新功能
# fix:      修复bug
# docs:     文档更新
# style:    代码格式调整
# refactor: 代码重构
# test:     测试相关
# chore:    构建或辅助工具变动
# perf:     性能优化
# ci:       CI/CD相关
# build:    构建系统变动
# revert:   回滚提交
#
# 示例：
# feat(auth): 添加用户登录功能
# fix: 修复页面加载问题
# docs: 更新API文档
EOF
fi
`;

    const hookPath = path.join(this.hooksDir, 'prepare-commit-msg');
    await fs.writeFile(hookPath, hookContent);
    await this.makeExecutable(hookPath);
    console.log('✅ prepare-commit-msg钩子已创建');
  }

  /**
   * 使文件可执行
   */
  async makeExecutable(filePath) {
    try {
      // 在Windows上，Git Bash会处理执行权限
      if (process.platform !== 'win32') {
        execSync(`chmod +x "${filePath}"`);
      }
    } catch (error) {
      console.warn(`⚠️  无法设置执行权限: ${error.message}`);
    }
  }

  /**
   * 备份现有钩子
   */
  async backupExistingHooks() {
    const hooks = ['pre-commit', 'pre-push', 'commit-msg', 'post-commit', 'prepare-commit-msg'];
    const backupDir = path.join(this.hooksDir, 'backup');
    
    let hasBackups = false;

    for (const hook of hooks) {
      const hookPath = path.join(this.hooksDir, hook);
      try {
        await fs.access(hookPath);
        // 钩子存在，创建备份
        if (!hasBackups) {
          await fs.mkdir(backupDir, { recursive: true });
          hasBackups = true;
        }
        
        const backupPath = path.join(backupDir, `${hook}.backup.${Date.now()}`);
        await fs.copyFile(hookPath, backupPath);
        console.log(`📦 已备份现有钩子: ${hook} -> ${path.basename(backupPath)}`);
      } catch {
        // 钩子不存在，跳过
      }
    }

    if (hasBackups) {
      console.log(`💾 钩子备份保存在: ${backupDir}`);
    }
  }

  /**
   * 安装所有钩子
   */
  async installHooks() {
    console.log('🔧 开始安装Git钩子...');

    // 检查Git仓库
    if (!(await this.checkGitRepository())) {
      throw new Error('当前目录不是Git仓库');
    }

    // 确保hooks目录存在
    await fs.mkdir(this.hooksDir, { recursive: true });

    // 备份现有钩子
    await this.backupExistingHooks();

    // 安装新钩子
    await this.createPreCommitHook();
    await this.createPrePushHook();
    await this.createCommitMsgHook();
    await this.createPostCommitHook();
    await this.createPrepareCommitMsgHook();

    console.log('✅ 所有Git钩子安装完成！');
    console.log('');
    console.log('📋 已安装的钩子：');
    console.log('  • pre-commit      - 提交前代码质量检查');
    console.log('  • pre-push        - 推送前完整检查');
    console.log('  • commit-msg      - 提交信息格式检查');
    console.log('  • post-commit     - 提交后自动化任务');
    console.log('  • prepare-commit-msg - 提交信息模板');
    console.log('');
    console.log('💡 提示：');
    console.log('  • 钩子会在相应的Git操作时自动运行');
    console.log('  • 如需跳过钩子检查，可使用 --no-verify 参数');
    console.log('  • 备份文件保存在 .git/hooks/backup/ 目录');
  }

  /**
   * 卸载钩子
   */
  async uninstallHooks() {
    console.log('🗑️  开始卸载Git钩子...');

    const hooks = ['pre-commit', 'pre-push', 'commit-msg', 'post-commit', 'prepare-commit-msg'];
    
    for (const hook of hooks) {
      const hookPath = path.join(this.hooksDir, hook);
      try {
        await fs.unlink(hookPath);
        console.log(`✅ 已删除钩子: ${hook}`);
      } catch {
        console.log(`⚠️  钩子不存在: ${hook}`);
      }
    }

    console.log('✅ Git钩子卸载完成');
  }

  /**
   * 检查钩子状态
   */
  async checkHooksStatus() {
    console.log('🔍 检查Git钩子状态...');

    const hooks = [
      { name: 'pre-commit', description: '提交前检查' },
      { name: 'pre-push', description: '推送前检查' },
      { name: 'commit-msg', description: '提交信息检查' },
      { name: 'post-commit', description: '提交后任务' },
      { name: 'prepare-commit-msg', description: '提交信息准备' }
    ];

    console.log('');
    console.log('📋 钩子状态：');
    
    for (const hook of hooks) {
      const hookPath = path.join(this.hooksDir, hook.name);
      try {
        const stats = await fs.stat(hookPath);
        const status = stats.isFile() ? '✅ 已安装' : '❌ 未安装';
        const size = `(${stats.size} bytes)`;
        console.log(`  ${hook.name.padEnd(20)} ${status.padEnd(10)} ${size.padEnd(15)} - ${hook.description}`);
      } catch {
        console.log(`  ${hook.name.padEnd(20)} ❌ 未安装${' '.repeat(25)} - ${hook.description}`);
      }
    }
  }

  /**
   * 显示帮助信息
   */
  showHelp() {
    console.log(`
🪝 Git钩子管理器 - 使用说明

命令格式:
  node scripts/setupGitHooks.js <command>

可用命令:
  install     - 安装所有Git钩子
  uninstall   - 卸载所有Git钩子
  status      - 检查钩子安装状态
  help        - 显示此帮助信息

钩子说明:
  pre-commit       - 在提交前运行代码质量检查
  pre-push         - 在推送前运行完整测试
  commit-msg       - 检查提交信息格式
  post-commit      - 在提交后执行自动化任务
  prepare-commit-msg - 为提交信息添加模板和信息

特性:
  • 自动备份现有钩子
  • 支持约定式提交规范
  • 集成代码质量检查
  • 自动化测试和构建
  • 智能分支检测

示例:
  node scripts/setupGitHooks.js install
  node scripts/setupGitHooks.js status
  node scripts/setupGitHooks.js uninstall
`);
  }
}

// 命令行接口
async function main() {
  const manager = new GitHooksManager();
  const command = process.argv[2];

  try {
    switch (command) {
      case 'install':
        await manager.installHooks();
        break;

      case 'uninstall':
        await manager.uninstallHooks();
        break;

      case 'status':
        await manager.checkHooksStatus();
        break;

      case 'help':
      case undefined:
        manager.showHelp();
        break;

      default:
        console.error(`❌ 未知命令: ${command}`);
        manager.showHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error(`💥 执行失败: ${error.message}`);
    process.exit(1);
  }
}

// 如果直接运行此脚本
const isMainModule = process.argv[1] && process.argv[1].endsWith('setupGitHooks.js');
if (isMainModule) {
  main();
}

export { GitHooksManager };