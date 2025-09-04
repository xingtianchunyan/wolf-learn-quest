#!/usr/bin/env node

/**
 * 本地提交摘要生成脚本
 * 用于在本地环境中生成类似GitHub Actions的提交摘要
 * 
 * @author AI Assistant
 * @version 1.0.0
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径（ES模块中的__dirname替代方案）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 提交摘要生成器类
 * 负责分析Git提交并生成可视化摘要
 */
class CommitSummaryGenerator {
  constructor() {
    this.outputDir = path.join(process.cwd(), 'commit-reports');
    this.ensureOutputDir();
  }

  /**
   * 确保输出目录存在
   */
  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * 执行Git命令并返回结果
   * @param {string} command - Git命令
   * @returns {string} 命令执行结果
   */
  execGitCommand(command) {
    try {
      return execSync(command, { encoding: 'utf8' }).trim();
    } catch (error) {
      console.warn(`警告: Git命令执行失败: ${command}`);
      return '';
    }
  }

  /**
   * 获取提交基本信息
   * @returns {Object} 提交信息对象
   */
  getCommitInfo() {
    return {
      hash: this.execGitCommand('git rev-parse --short HEAD'),
      message: this.execGitCommand('git log -1 --pretty=format:"%s"'),
      author: this.execGitCommand('git log -1 --pretty=format:"%an"'),
      date: this.execGitCommand('git log -1 --pretty=format:"%ad" --date=format:"%Y-%m-%d %H:%M:%S"'),
      email: this.execGitCommand('git log -1 --pretty=format:"%ae"')
    };
  }

  /**
   * 获取文件变更统计
   * @returns {Object} 变更统计对象
   */
  getChangeStats() {
    try {
      const diffOutput = this.execGitCommand('git diff --numstat HEAD~1 HEAD');
      if (!diffOutput) {
        return { filesChanged: 0, linesAdded: 0, linesDeleted: 0, totalChanges: 0 };
      }

      const lines = diffOutput.split('\n').filter(line => line.trim());
      let linesAdded = 0;
      let linesDeleted = 0;

      lines.forEach(line => {
        const [added, deleted] = line.split('\t');
        linesAdded += parseInt(added) || 0;
        linesDeleted += parseInt(deleted) || 0;
      });

      return {
        filesChanged: lines.length,
        linesAdded,
        linesDeleted,
        totalChanges: linesAdded + linesDeleted
      };
    } catch (error) {
      return { filesChanged: 0, linesAdded: 0, linesDeleted: 0, totalChanges: 0 };
    }
  }

  /**
   * 获取文件变更详情
   * @returns {Array} 文件变更数组
   */
  getFileChanges() {
    try {
      const diffOutput = this.execGitCommand('git diff --numstat HEAD~1 HEAD');
      if (!diffOutput) return [];

      return diffOutput.split('\n')
        .filter(line => line.trim())
        .map(line => {
          const [added, deleted, file] = line.split('\t');
          return {
            file,
            added: parseInt(added) || 0,
            deleted: parseInt(deleted) || 0,
            type: this.getFileType(file)
          };
        });
    } catch (error) {
      return [];
    }
  }

  /**
   * 根据文件扩展名确定文件类型
   * @param {string} filename - 文件名
   * @returns {Object} 文件类型信息
   */
  getFileType(filename) {
    const ext = path.extname(filename).toLowerCase();
    const typeMap = {
      '.ts': { label: 'TypeScript', emoji: '🔷', class: 'ts' },
      '.tsx': { label: 'TypeScript', emoji: '🔷', class: 'ts' },
      '.js': { label: 'JavaScript', emoji: '🟨', class: 'js' },
      '.jsx': { label: 'JavaScript', emoji: '🟨', class: 'js' },
      '.css': { label: '样式', emoji: '🎨', class: 'css' },
      '.scss': { label: '样式', emoji: '🎨', class: 'css' },
      '.sass': { label: '样式', emoji: '🎨', class: 'css' },
      '.md': { label: '文档', emoji: '📝', class: 'md' },
      '.json': { label: '配置', emoji: '⚙️', class: 'json' },
      '.sql': { label: '数据库', emoji: '🗄️', class: 'sql' },
    };

    return typeMap[ext] || { label: '其他', emoji: '📄', class: 'other' };
  }

  /**
   * 生成HTML可视化报告
   * @param {Object} data - 报告数据
   */
  generateHTMLReport(data) {
    const { commitInfo, stats, fileChanges } = data;
    const timestamp = new Date().toLocaleString('zh-CN');

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>提交变更可视化报告 - ${commitInfo.hash}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #eee;
        }
        .commit-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .file-list {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .file-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            margin: 5px 0;
            background: white;
            border-radius: 4px;
            border-left: 4px solid #667eea;
        }
        .file-type {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8em;
            font-weight: bold;
            margin-right: 10px;
        }
        .ts { background: #3178c6; color: white; }
        .js { background: #f7df1e; color: black; }
        .css { background: #1572b6; color: white; }
        .md { background: #083fa1; color: white; }
        .json { background: #000; color: white; }
        .sql { background: #336791; color: white; }
        .other { background: #6c757d; color: white; }
        .changes {
            font-family: monospace;
            font-size: 0.9em;
        }
        .added { color: #28a745; font-weight: bold; }
        .deleted { color: #dc3545; font-weight: bold; }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #6c757d;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔍 提交变更可视化报告</h1>
            <p>本地生成的代码变更分析报告</p>
        </div>
        
        <div class="commit-info">
            <h2>📝 提交信息</h2>
            <p><strong>提交哈希:</strong> <code>${commitInfo.hash}</code></p>
            <p><strong>提交信息:</strong> ${commitInfo.message}</p>
            <p><strong>作者:</strong> ${commitInfo.author} &lt;${commitInfo.email}&gt;</p>
            <p><strong>时间:</strong> ${commitInfo.date}</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${stats.filesChanged}</div>
                <div>文件变更</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.linesAdded}</div>
                <div>新增行数</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.linesDeleted}</div>
                <div>删除行数</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.totalChanges}</div>
                <div>总变更量</div>
            </div>
        </div>
        
        <div class="file-list">
            <h2>📂 变更文件详情</h2>
            ${fileChanges.map(change => `
            <div class="file-item">
                <div>
                    <span class="file-type ${change.type.class}">${change.type.label}</span>
                    <code>${change.file}</code>
                </div>
                <div class="changes">
                    <span class="added">+${change.added}</span> / <span class="deleted">-${change.deleted}</span>
                </div>
            </div>`).join('')}
        </div>
        
        <div class="footer">
            <p>📊 报告生成时间: ${timestamp}</p>
            <p>🤖 由本地脚本自动生成</p>
        </div>
    </div>
</body>
</html>`;

    const reportPath = path.join(this.outputDir, `commit-report-${commitInfo.hash}.html`);
    fs.writeFileSync(reportPath, html, 'utf8');
    return reportPath;
  }

  /**
   * 生成Markdown摘要
   * @param {Object} data - 报告数据
   */
  generateMarkdownSummary(data) {
    const { commitInfo, stats, fileChanges } = data;
    
    const markdown = `# 🔍 提交变更摘要

## 📊 统计信息
- 📁 变更文件: **${stats.filesChanged}** 个
- ➕ 新增代码: **${stats.linesAdded}** 行
- ➖ 删除代码: **${stats.linesDeleted}** 行
- 📈 总变更量: **${stats.totalChanges}** 行

## 💬 提交详情
- **哈希**: \`${commitInfo.hash}\`
- **信息**: ${commitInfo.message}
- **作者**: ${commitInfo.author}
- **时间**: ${commitInfo.date}

## 📂 文件变更分布
${fileChanges.map(change => 
  `- ${change.type.emoji} ${change.type.label}: \`${change.file}\` (+${change.added}/-${change.deleted})`
).join('\n')}

---
*📊 详细的可视化报告请查看生成的HTML文件*
`;

    const summaryPath = path.join(this.outputDir, `commit-summary-${commitInfo.hash}.md`);
    fs.writeFileSync(summaryPath, markdown, 'utf8');
    return summaryPath;
  }

  /**
   * 生成完整的提交摘要报告
   */
  async generateReport() {
    console.log('🔍 开始分析提交变更...');
    
    try {
      // 获取数据
      const commitInfo = this.getCommitInfo();
      const stats = this.getChangeStats();
      const fileChanges = this.getFileChanges();
      
      const data = { commitInfo, stats, fileChanges };
      
      // 生成报告
      const htmlPath = this.generateHTMLReport(data);
      const markdownPath = this.generateMarkdownSummary(data);
      
      console.log('\n📊 提交分析完成!');
      console.log(`📁 变更文件数: ${stats.filesChanged}`);
      console.log(`➕ 新增代码行: ${stats.linesAdded}`);
      console.log(`➖ 删除代码行: ${stats.linesDeleted}`);
      console.log(`📈 总变更量: ${stats.totalChanges}`);
      console.log('\n📋 生成的报告文件:');
      console.log(`- HTML报告: ${htmlPath}`);
      console.log(`- Markdown摘要: ${markdownPath}`);
      
      return { htmlPath, markdownPath, data };
    } catch (error) {
      console.error('❌ 生成报告时出错:', error.message);
      throw error;
    }
  }
}

// 主函数
async function main() {
  try {
    const generator = new CommitSummaryGenerator();
    await generator.generateReport();
  } catch (error) {
    console.error('❌ 脚本执行失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本（ES模块中的require.main替代方案）
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`) {
  main();
} else {
  // 在ES模块环境中，也执行main函数
  main();
}

export default CommitSummaryGenerator;