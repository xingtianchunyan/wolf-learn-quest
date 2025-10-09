/**
 * 文件级注释：依赖分析器
 * 分析项目依赖，检测过时包和安全漏洞
 */

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { debugTools } from './debugTools.js';

/**
 * 依赖分析器类
 */
class DependencyAnalyzer {
  constructor() {
    this.projectRoot = path.join(
      path.dirname(new URL(import.meta.url).pathname),
      '..'
    );
    this.packageJsonPath = path.join(this.projectRoot, 'package.json');
  }

  /**
   * 分析过时的依赖
   */
  async analyzeOutdated() {
    debugTools.info('分析过时的依赖...');

    return new Promise((resolve, reject) => {
      const process = spawn('npm', ['outdated', '--json'], {
        shell: true,
        cwd: this.projectRoot,
      });

      let output = '';
      process.stdout.on('data', data => {
        output += data.toString();
      });

      process.on('close', code => {
        try {
          const outdated = output ? JSON.parse(output) : {};
          debugTools.info(`发现 ${Object.keys(outdated).length} 个过时的依赖`);
          resolve(outdated);
        } catch (error) {
          debugTools.warn('解析过时依赖信息失败', error);
          resolve({});
        }
      });

      process.on('error', reject);
    });
  }

  /**
   * 安全审计
   */
  async securityAudit() {
    debugTools.info('执行安全审计...');

    return new Promise((resolve, reject) => {
      const process = spawn('npm', ['audit', '--json'], {
        shell: true,
        cwd: this.projectRoot,
      });

      let output = '';
      process.stdout.on('data', data => {
        output += data.toString();
      });

      process.on('close', code => {
        try {
          const audit = output ? JSON.parse(output) : {};
          debugTools.info(
            `安全审计完成，发现 ${audit.metadata?.vulnerabilities?.total || 0} 个漏洞`
          );
          resolve(audit);
        } catch (error) {
          debugTools.warn('解析安全审计信息失败', error);
          resolve({});
        }
      });

      process.on('error', reject);
    });
  }

  /**
   * 生成依赖报告
   */
  async generateReport() {
    debugTools.info('生成依赖分析报告...');

    const [outdated, audit] = await Promise.all([
      this.analyzeOutdated(),
      this.securityAudit(),
    ]);

    const report = {
      timestamp: new Date().toISOString(),
      outdated,
      security: audit,
      recommendations: this.generateRecommendations(outdated, audit),
    };

    const reportPath = path.join(
      this.projectRoot,
      'reports',
      'dependency-analysis.json'
    );
    const reportsDir = path.dirname(reportPath);

    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    debugTools.info(`依赖分析报告已保存到: ${reportPath}`);

    return report;
  }

  /**
   * 生成建议
   * @param {Object} outdated - 过时依赖信息
   * @param {Object} audit - 安全审计信息
   * @returns {Array} 建议列表
   */
  generateRecommendations(outdated, audit) {
    const recommendations = [];

    // 过时依赖建议
    Object.keys(outdated).forEach(pkg => {
      const info = outdated[pkg];
      recommendations.push({
        type: 'outdated',
        package: pkg,
        current: info.current,
        wanted: info.wanted,
        latest: info.latest,
        action: `更新 ${pkg} 从 ${info.current} 到 ${info.latest}`,
      });
    });

    // 安全漏洞建议
    if (audit.vulnerabilities) {
      Object.keys(audit.vulnerabilities).forEach(level => {
        const count = audit.vulnerabilities[level];
        if (count > 0) {
          recommendations.push({
            type: 'security',
            level,
            count,
            action: `修复 ${count} 个 ${level} 级别的安全漏洞`,
          });
        }
      });
    }

    return recommendations;
  }
}

// 如果直接运行此脚本
if (import.meta.url.endsWith(process.argv[1])) {
  const analyzer = new DependencyAnalyzer();
  analyzer.generateReport().catch(console.error);
}

export { DependencyAnalyzer };
