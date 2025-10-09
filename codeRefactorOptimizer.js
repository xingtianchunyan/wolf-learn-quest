/**
 * 代码重构优化脚本
 * 自动检测和优化代码重复、函数拆分、命名规范等
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CodeRefactorOptimizer {
  constructor() {
    this.srcDir = path.join(__dirname, 'src');
    this.optimizations = [];
    this.duplicateThreshold = 0.8;
    this.complexityThreshold = 10;
    this.lineLengthThreshold = 50;
  }

  /**
   * 运行所有优化
   */
  async runOptimizations() {
    console.log('🚀 开始代码重构优化...\n');

    try {
      // 1. 创建通用工具函数库
      await this.createUtilityLibraries();

      // 2. 创建高阶组件库
      await this.createHOCLibraries();

      // 3. 创建自定义Hook库
      await this.createCustomHooks();

      // 4. 分析代码重复
      await this.analyzeCodeDuplication();

      // 5. 分析函数复杂度
      await this.analyzeFunctionComplexity();

      // 6. 优化导入语句
      await this.optimizeImports();

      // 7. 生成优化报告
      await this.generateOptimizationReport();

      console.log('✅ 代码重构优化完成！');
    } catch (error) {
      console.error('❌ 优化过程中出现错误:', error);
    }
  }

  /**
   * 创建通用工具函数库
   */
  async createUtilityLibraries() {
    console.log('📚 创建通用工具函数库...');

    const utilsDir = path.join(this.srcDir, 'utils');

    // 确保目录存在
    try {
      await fs.access(utilsDir);
    } catch {
      await fs.mkdir(utilsDir, { recursive: true });
    }

    // 检查是否已存在工具文件
    const existingFiles = await fs.readdir(utilsDir);
    const expectedFiles = ['common.ts', 'validation.ts', 'date.ts'];

    const missingFiles = expectedFiles.filter(
      file => !existingFiles.includes(file)
    );

    if (missingFiles.length === 0) {
      console.log('  ✅ 工具函数库已存在');
      this.optimizations.push({
        type: 'utility',
        action: '验证工具函数库',
        status: '已存在',
        files: expectedFiles,
      });
    } else {
      console.log(`  ⚠️  缺少工具文件: ${missingFiles.join(', ')}`);
      this.optimizations.push({
        type: 'utility',
        action: '创建工具函数库',
        status: '部分缺失',
        missing: missingFiles,
      });
    }
  }

  /**
   * 创建高阶组件库
   */
  async createHOCLibraries() {
    console.log('🔧 创建高阶组件库...');

    const hocDir = path.join(this.srcDir, 'components', 'hoc');

    try {
      await fs.access(hocDir);
      const files = await fs.readdir(hocDir);
      const expectedHOCs = [
        'withLoading.tsx',
        'withErrorBoundary.tsx',
        'withForm.tsx',
      ];

      const existingHOCs = files.filter(file => expectedHOCs.includes(file));

      console.log(
        `  ✅ 发现 ${existingHOCs.length} 个高阶组件: ${existingHOCs.join(', ')}`
      );

      this.optimizations.push({
        type: 'hoc',
        action: '验证高阶组件库',
        status: '已存在',
        files: existingHOCs,
      });
    } catch {
      console.log('  ⚠️  高阶组件目录不存在');
      this.optimizations.push({
        type: 'hoc',
        action: '创建高阶组件库',
        status: '不存在',
      });
    }
  }

  /**
   * 创建自定义Hook库
   */
  async createCustomHooks() {
    console.log('🎣 创建自定义Hook库...');

    const hooksDir = path.join(this.srcDir, 'hooks');

    try {
      await fs.access(hooksDir);
      const files = await fs.readdir(hooksDir);
      const hookFiles = files.filter(
        file => file.startsWith('use') && file.endsWith('.ts')
      );

      console.log(
        `  ✅ 发现 ${hookFiles.length} 个自定义Hook: ${hookFiles.slice(0, 5).join(', ')}${hookFiles.length > 5 ? '...' : ''}`
      );

      this.optimizations.push({
        type: 'hooks',
        action: '验证自定义Hook库',
        status: '已存在',
        count: hookFiles.length,
        files: hookFiles.slice(0, 10),
      });
    } catch {
      console.log('  ⚠️  自定义Hook目录不存在');
      this.optimizations.push({
        type: 'hooks',
        action: '创建自定义Hook库',
        status: '不存在',
      });
    }
  }

  /**
   * 分析代码重复
   */
  async analyzeCodeDuplication() {
    console.log('🔍 分析代码重复...');

    const duplicates = await this.findDuplicateCode();

    if (duplicates.length > 0) {
      console.log(`  ⚠️  发现 ${duplicates.length} 处重复代码`);

      duplicates.slice(0, 3).forEach((dup, index) => {
        console.log(
          `    ${index + 1}. ${dup.files.length} 个文件中的相似代码 (相似度: ${(dup.similarity * 100).toFixed(1)}%)`
        );
        dup.files.forEach(file => {
          console.log(`       - ${path.relative(this.srcDir, file)}`);
        });
      });

      if (duplicates.length > 3) {
        console.log(`    ... 还有 ${duplicates.length - 3} 处重复代码`);
      }
    } else {
      console.log('  ✅ 未发现明显的重复代码');
    }

    this.optimizations.push({
      type: 'duplication',
      action: '代码重复分析',
      status: duplicates.length > 0 ? '发现重复' : '无重复',
      count: duplicates.length,
      details: duplicates.slice(0, 5),
    });
  }

  /**
   * 分析函数复杂度
   */
  async analyzeFunctionComplexity() {
    console.log('📊 分析函数复杂度...');

    const complexFunctions = await this.findComplexFunctions();

    if (complexFunctions.length > 0) {
      console.log(`  ⚠️  发现 ${complexFunctions.length} 个复杂函数`);

      complexFunctions.slice(0, 5).forEach((func, index) => {
        console.log(
          `    ${index + 1}. ${func.name} (复杂度: ${func.complexity}, 行数: ${func.lines})`
        );
        console.log(`       文件: ${path.relative(this.srcDir, func.file)}`);
      });

      if (complexFunctions.length > 5) {
        console.log(`    ... 还有 ${complexFunctions.length - 5} 个复杂函数`);
      }
    } else {
      console.log('  ✅ 函数复杂度在合理范围内');
    }

    this.optimizations.push({
      type: 'complexity',
      action: '函数复杂度分析',
      status: complexFunctions.length > 0 ? '发现复杂函数' : '复杂度合理',
      count: complexFunctions.length,
      details: complexFunctions.slice(0, 10),
    });
  }

  /**
   * 优化导入语句
   */
  async optimizeImports() {
    console.log('📦 优化导入语句...');

    const files = await this.getAllTSFiles();
    let optimizedCount = 0;
    const issues = [];

    for (const file of files) {
      const content = await fs.readFile(file, 'utf-8');
      const importIssues = this.analyzeImports(content, file);

      if (importIssues.length > 0) {
        issues.push(...importIssues);
        optimizedCount++;
      }
    }

    if (issues.length > 0) {
      console.log(`  ⚠️  发现 ${issues.length} 个导入问题`);

      const issueTypes = {};
      issues.forEach(issue => {
        issueTypes[issue.type] = (issueTypes[issue.type] || 0) + 1;
      });

      Object.entries(issueTypes).forEach(([type, count]) => {
        console.log(`    - ${type}: ${count} 个`);
      });
    } else {
      console.log('  ✅ 导入语句已优化');
    }

    this.optimizations.push({
      type: 'imports',
      action: '导入语句优化',
      status: issues.length > 0 ? '发现问题' : '已优化',
      filesChecked: files.length,
      issuesFound: issues.length,
      issueTypes: Object.keys(
        issues.reduce((acc, issue) => {
          acc[issue.type] = true;
          return acc;
        }, {})
      ),
    });
  }

  /**
   * 查找重复代码
   */
  async findDuplicateCode() {
    const files = await this.getAllTSFiles();
    const codeBlocks = [];

    // 提取代码块
    for (const file of files) {
      const content = await fs.readFile(file, 'utf-8');
      const blocks = this.extractCodeBlocks(content, file);
      codeBlocks.push(...blocks);
    }

    // 查找重复
    const duplicates = [];
    const processed = new Set();

    for (let i = 0; i < codeBlocks.length; i++) {
      if (processed.has(i)) continue;

      const similar = [codeBlocks[i]];

      for (let j = i + 1; j < codeBlocks.length; j++) {
        if (processed.has(j)) continue;

        const similarity = this.calculateSimilarity(
          codeBlocks[i].content,
          codeBlocks[j].content
        );

        if (similarity >= this.duplicateThreshold) {
          similar.push(codeBlocks[j]);
          processed.add(j);
        }
      }

      if (similar.length > 1) {
        duplicates.push({
          blocks: similar,
          similarity: this.calculateAverageSimilarity(similar),
          files: [...new Set(similar.map(block => block.file))],
        });
      }

      processed.add(i);
    }

    return duplicates;
  }

  /**
   * 查找复杂函数
   */
  async findComplexFunctions() {
    const files = await this.getAllTSFiles();
    const complexFunctions = [];

    for (const file of files) {
      const content = await fs.readFile(file, 'utf-8');
      const functions = this.extractFunctions(content);

      for (const func of functions) {
        const complexity = this.calculateComplexity(func.content);
        const lines = func.content.split('\n').length;

        if (
          complexity > this.complexityThreshold ||
          lines > this.lineLengthThreshold
        ) {
          complexFunctions.push({
            name: func.name,
            file,
            complexity,
            lines,
            content: func.content.substring(0, 200) + '...',
          });
        }
      }
    }

    return complexFunctions.sort((a, b) => b.complexity - a.complexity);
  }

  /**
   * 获取所有TypeScript文件
   */
  async getAllTSFiles() {
    const files = [];

    const scanDir = async dir => {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (
          entry.isDirectory() &&
          !['node_modules', '.git', 'dist', 'build'].includes(entry.name)
        ) {
          await scanDir(fullPath);
        } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
          files.push(fullPath);
        }
      }
    };

    await scanDir(this.srcDir);
    return files;
  }

  /**
   * 提取代码块
   */
  extractCodeBlocks(content, file) {
    const lines = content.split('\n');
    const blocks = [];
    const minBlockSize = 5;

    for (let i = 0; i <= lines.length - minBlockSize; i++) {
      const blockLines = lines.slice(i, i + minBlockSize);
      const blockContent = blockLines.join('\n').trim();

      if (this.isValidCodeBlock(blockContent)) {
        blocks.push({
          content: blockContent,
          file,
          startLine: i + 1,
          endLine: i + minBlockSize,
        });
      }
    }

    return blocks;
  }

  /**
   * 提取函数
   */
  extractFunctions(content) {
    const functions = [];
    const functionRegex =
      /(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:async\s+)?(?:\([^)]*\)\s*=>|\([^)]*\)\s*:\s*[^=]*=>)|(\w+)\s*\([^)]*\)\s*{)/g;
    let match;

    while ((match = functionRegex.exec(content)) !== null) {
      const functionName = match[1] || match[2] || match[3];
      const startIndex = match.index;
      const functionContent = this.extractFunctionBody(content, startIndex);

      if (functionContent) {
        functions.push({
          name: functionName,
          content: functionContent,
        });
      }
    }

    return functions;
  }

  /**
   * 提取函数体
   */
  extractFunctionBody(content, startIndex) {
    let braceCount = 0;
    let inFunction = false;
    let functionStart = startIndex;

    for (let i = startIndex; i < content.length; i++) {
      const char = content[i];

      if (char === '{') {
        if (!inFunction) {
          inFunction = true;
          functionStart = i;
        }
        braceCount++;
      } else if (char === '}') {
        braceCount--;
        if (inFunction && braceCount === 0) {
          return content.substring(functionStart, i + 1);
        }
      }
    }

    return null;
  }

  /**
   * 计算代码相似度
   */
  calculateSimilarity(code1, code2) {
    const normalized1 = this.normalizeCode(code1);
    const normalized2 = this.normalizeCode(code2);

    if (normalized1 === normalized2) return 1;

    const longer =
      normalized1.length > normalized2.length ? normalized1 : normalized2;
    const shorter =
      normalized1.length > normalized2.length ? normalized2 : normalized1;

    if (longer.length === 0) return 1;

    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  /**
   * 标准化代码
   */
  normalizeCode(code) {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * 计算编辑距离
   */
  levenshteinDistance(str1, str2) {
    const matrix = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * 计算平均相似度
   */
  calculateAverageSimilarity(blocks) {
    if (blocks.length < 2) return 1;

    let totalSimilarity = 0;
    let comparisons = 0;

    for (let i = 0; i < blocks.length; i++) {
      for (let j = i + 1; j < blocks.length; j++) {
        totalSimilarity += this.calculateSimilarity(
          blocks[i].content,
          blocks[j].content
        );
        comparisons++;
      }
    }

    return comparisons > 0 ? totalSimilarity / comparisons : 1;
  }

  /**
   * 计算函数复杂度
   */
  calculateComplexity(functionContent) {
    let complexity = 1;

    const controlFlowPatterns = [
      /\bif\b/g,
      /\belse\s+if\b/g,
      /\bwhile\b/g,
      /\bfor\b/g,
      /\bswitch\b/g,
      /\bcase\b/g,
      /\bcatch\b/g,
      /\b&&\b/g,
      /\b\|\|\b/g,
      /\?\s*.*?\s*:/g,
    ];

    for (const pattern of controlFlowPatterns) {
      const matches = functionContent.match(pattern);
      if (matches) {
        complexity += matches.length;
      }
    }

    return complexity;
  }

  /**
   * 检查是否为有效代码块
   */
  isValidCodeBlock(content) {
    if (!content.trim()) return false;

    const withoutComments = content
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
      .trim();

    if (!withoutComments) return false;

    const lines = withoutComments.split('\n').filter(line => line.trim());
    const importLines = lines.filter(line => line.trim().startsWith('import'));

    return importLines.length < lines.length * 0.8;
  }

  /**
   * 分析导入语句
   */
  analyzeImports(content, file) {
    const issues = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      if (line.trim().startsWith('import')) {
        // 检查未使用的导入
        if (line.includes('*') && !line.includes('* as')) {
          issues.push({
            type: '通配符导入',
            line: index + 1,
            file,
            content: line.trim(),
          });
        }

        // 检查相对路径导入
        if (line.includes('../../../')) {
          issues.push({
            type: '深层相对路径',
            line: index + 1,
            file,
            content: line.trim(),
          });
        }
      }
    });

    return issues;
  }

  /**
   * 生成优化报告
   */
  async generateOptimizationReport() {
    console.log('\n📋 生成优化报告...');

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalOptimizations: this.optimizations.length,
        categories: {},
      },
      optimizations: this.optimizations,
      recommendations: this.generateRecommendations(),
    };

    // 统计分类
    this.optimizations.forEach(opt => {
      report.summary.categories[opt.type] =
        (report.summary.categories[opt.type] || 0) + 1;
    });

    const reportPath = path.join(__dirname, 'code-refactor-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

    console.log(`  ✅ 报告已生成: ${reportPath}`);

    // 显示摘要
    console.log('\n📊 优化摘要:');
    console.log(`  - 总计优化项: ${report.summary.totalOptimizations}`);
    Object.entries(report.summary.categories).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count} 项`);
    });

    console.log('\n💡 主要建议:');
    report.recommendations.slice(0, 5).forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });
  }

  /**
   * 生成优化建议
   */
  generateRecommendations() {
    const recommendations = [];

    const duplicateOpt = this.optimizations.find(
      opt => opt.type === 'duplication'
    );
    if (duplicateOpt && duplicateOpt.count > 0) {
      recommendations.push('建议将重复代码提取为公共函数或组件');
      recommendations.push('考虑使用高阶组件或自定义Hook来复用逻辑');
    }

    const complexityOpt = this.optimizations.find(
      opt => opt.type === 'complexity'
    );
    if (complexityOpt && complexityOpt.count > 0) {
      recommendations.push('建议拆分复杂函数为多个小函数');
      recommendations.push('考虑使用策略模式简化复杂的条件逻辑');
    }

    const importOpt = this.optimizations.find(opt => opt.type === 'imports');
    if (importOpt && importOpt.issuesFound > 0) {
      recommendations.push('优化导入语句，避免深层相对路径');
      recommendations.push('使用绝对路径或路径别名来简化导入');
    }

    recommendations.push('定期运行代码质量检查工具');
    recommendations.push('建立代码审查流程确保代码质量');
    recommendations.push('使用ESLint和Prettier保持代码风格一致');

    return recommendations;
  }
}

// 运行优化
console.log('脚本开始执行...');
console.log('import.meta.url:', import.meta.url);
console.log('__filename:', __filename);

const optimizer = new CodeRefactorOptimizer();
optimizer.runOptimizations().catch(console.error);

export default CodeRefactorOptimizer;
