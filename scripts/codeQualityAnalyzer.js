/**
 * 代码质量分析工具
 * @author SOLO Coding
 * @description 分析代码质量，包括复杂度、重复代码、代码覆盖率等指标
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 代码质量分析器类
 */
class CodeQualityAnalyzer {
  constructor() {
    this.srcPath = path.join(process.cwd(), 'src');
    this.reportsPath = path.join(process.cwd(), 'reports');
    this.metrics = {
      files: [],
      complexity: {},
      duplicates: [],
      codeSmells: [],
      maintainabilityIndex: 0,
      technicalDebt: 0
    };
  }

  /**
   * 主执行函数
   */
  async run() {
    console.log('🔍 开始代码质量分析...\n');
    
    // 确保报告目录存在
    if (!fs.existsSync(this.reportsPath)) {
      fs.mkdirSync(this.reportsPath, { recursive: true });
    }

    // 扫描所有文件
    await this.scanFiles();
    
    // 分析代码复杂度
    await this.analyzeComplexity();
    
    // 检测重复代码
    await this.detectDuplicates();
    
    // 检测代码异味
    await this.detectCodeSmells();
    
    // 计算可维护性指数
    await this.calculateMaintainabilityIndex();
    
    // 生成报告
    await this.generateReports();
    
    console.log('✨ 代码质量分析完成！');
  }

  /**
   * 扫描所有文件
   */
  async scanFiles() {
    console.log('📁 扫描项目文件...');
    
    const files = this.getFilesRecursively(this.srcPath, ['.ts', '.tsx', '.js', '.jsx']);
    
    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(this.srcPath, filePath);
      
      const fileMetrics = {
        path: relativePath,
        fullPath: filePath,
        lines: content.split('\n').length,
        codeLines: this.countCodeLines(content),
        commentLines: this.countCommentLines(content),
        blankLines: this.countBlankLines(content),
        size: content.length,
        functions: this.countFunctions(content),
        classes: this.countClasses(content),
        imports: this.countImports(content),
        exports: this.countExports(content)
      };
      
      this.metrics.files.push(fileMetrics);
    }
    
    console.log(`✅ 扫描完成，共 ${this.metrics.files.length} 个文件`);
  }

  /**
   * 递归获取文件
   * @param {string} dir - 目录路径
   * @param {string[]} extensions - 文件扩展名
   * @returns {string[]} 文件路径数组
   */
  getFilesRecursively(dir, extensions) {
    const files = [];
    
    if (!fs.existsSync(dir)) {
      return files;
    }
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!this.shouldSkipDirectory(item)) {
          files.push(...this.getFilesRecursively(fullPath, extensions));
        }
      } else if (extensions.some(ext => fullPath.endsWith(ext))) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  /**
   * 判断是否应跳过目录
   * @param {string} dirName - 目录名
   * @returns {boolean} 是否跳过
   */
  shouldSkipDirectory(dirName) {
    const skipDirs = ['node_modules', '.git', 'dist', 'build', '__tests__', 'test', 'tests', 'coverage'];
    return skipDirs.includes(dirName);
  }

  /**
   * 计算代码行数
   * @param {string} content - 文件内容
   * @returns {number} 代码行数
   */
  countCodeLines(content) {
    const lines = content.split('\n');
    return lines.filter(line => {
      const trimmed = line.trim();
      return trimmed !== '' && !trimmed.startsWith('//') && !trimmed.startsWith('*') && !trimmed.startsWith('/*');
    }).length;
  }

  /**
   * 计算注释行数
   * @param {string} content - 文件内容
   * @returns {number} 注释行数
   */
  countCommentLines(content) {
    const lines = content.split('\n');
    return lines.filter(line => {
      const trimmed = line.trim();
      return trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*');
    }).length;
  }

  /**
   * 计算空白行数
   * @param {string} content - 文件内容
   * @returns {number} 空白行数
   */
  countBlankLines(content) {
    const lines = content.split('\n');
    return lines.filter(line => line.trim() === '').length;
  }

  /**
   * 计算函数数量
   * @param {string} content - 文件内容
   * @returns {number} 函数数量
   */
  countFunctions(content) {
    const functionPatterns = [
      /function\s+\w+/g,
      /const\s+\w+\s*=\s*\(/g,
      /const\s+\w+\s*=\s*async\s*\(/g,
      /\w+\s*:\s*\(/g,
      /=>\s*{/g
    ];
    
    let count = 0;
    for (const pattern of functionPatterns) {
      const matches = content.match(pattern);
      if (matches) {
        count += matches.length;
      }
    }
    
    return count;
  }

  /**
   * 计算类数量
   * @param {string} content - 文件内容
   * @returns {number} 类数量
   */
  countClasses(content) {
    const classPattern = /class\s+\w+/g;
    const matches = content.match(classPattern);
    return matches ? matches.length : 0;
  }

  /**
   * 计算导入数量
   * @param {string} content - 文件内容
   * @returns {number} 导入数量
   */
  countImports(content) {
    const importPattern = /import\s+.*?from/g;
    const matches = content.match(importPattern);
    return matches ? matches.length : 0;
  }

  /**
   * 计算导出数量
   * @param {string} content - 文件内容
   * @returns {number} 导出数量
   */
  countExports(content) {
    const exportPattern = /export\s+(default\s+|const\s+|function\s+|class\s+)/g;
    const matches = content.match(exportPattern);
    return matches ? matches.length : 0;
  }

  /**
   * 分析代码复杂度
   */
  async analyzeComplexity() {
    console.log('🧮 分析代码复杂度...');
    
    for (const file of this.metrics.files) {
      const content = fs.readFileSync(file.fullPath, 'utf8');
      const complexity = this.calculateCyclomaticComplexity(content);
      
      this.metrics.complexity[file.path] = {
        cyclomatic: complexity,
        cognitive: this.calculateCognitiveComplexity(content),
        halstead: this.calculateHalsteadComplexity(content)
      };
    }
    
    console.log('✅ 复杂度分析完成');
  }

  /**
   * 计算圈复杂度
   * @param {string} content - 文件内容
   * @returns {number} 圈复杂度
   */
  calculateCyclomaticComplexity(content) {
    // 基础复杂度为1
    let complexity = 1;
    
    // 计算决策点
    const decisionPatterns = [
      /if\s*\(/g,
      /else\s+if\s*\(/g,
      /while\s*\(/g,
      /for\s*\(/g,
      /switch\s*\(/g,
      /case\s+/g,
      /catch\s*\(/g,
      /&&/g,
      /\|\|/g,
      /\?/g
    ];
    
    for (const pattern of decisionPatterns) {
      const matches = content.match(pattern);
      if (matches) {
        complexity += matches.length;
      }
    }
    
    return complexity;
  }

  /**
   * 计算认知复杂度
   * @param {string} content - 文件内容
   * @returns {number} 认知复杂度
   */
  calculateCognitiveComplexity(content) {
    let complexity = 0;
    let nestingLevel = 0;
    
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // 增加嵌套级别
      if (trimmed.includes('{')) {
        nestingLevel++;
      }
      
      // 减少嵌套级别
      if (trimmed.includes('}')) {
        nestingLevel = Math.max(0, nestingLevel - 1);
      }
      
      // 计算复杂度
      if (trimmed.match(/if\s*\(|while\s*\(|for\s*\(/)) {
        complexity += 1 + nestingLevel;
      }
      
      if (trimmed.match(/else|catch/)) {
        complexity += 1;
      }
      
      if (trimmed.match(/&&|\|\|/)) {
        complexity += 1;
      }
    }
    
    return complexity;
  }

  /**
   * 计算Halstead复杂度
   * @param {string} content - 文件内容
   * @returns {Object} Halstead指标
   */
  calculateHalsteadComplexity(content) {
    // 简化的Halstead计算
    const operators = content.match(/[+\-*/=<>!&|?:;,(){}[\]]/g) || [];
    const operands = content.match(/\b\w+\b/g) || [];
    
    const uniqueOperators = new Set(operators).size;
    const uniqueOperands = new Set(operands).size;
    
    const vocabulary = uniqueOperators + uniqueOperands;
    const length = operators.length + operands.length;
    
    return {
      vocabulary,
      length,
      difficulty: (uniqueOperators / 2) * (operands.length / uniqueOperands),
      effort: vocabulary * length * Math.log2(vocabulary)
    };
  }

  /**
   * 检测重复代码
   */
  async detectDuplicates() {
    console.log('🔍 检测重复代码...');
    
    const codeBlocks = new Map();
    
    for (const file of this.metrics.files) {
      const content = fs.readFileSync(file.fullPath, 'utf8');
      const lines = content.split('\n');
      
      // 检查连续的代码块
      for (let i = 0; i < lines.length - 5; i++) {
        const block = lines.slice(i, i + 6).join('\n').trim();
        
        if (block && !this.isCommentBlock(block)) {
          const hash = this.hashCode(block);
          
          if (codeBlocks.has(hash)) {
            const existing = codeBlocks.get(hash);
            this.metrics.duplicates.push({
              hash,
              block,
              files: [existing.file, file.path],
              lines: [existing.startLine, i + 1],
              similarity: 1.0
            });
          } else {
            codeBlocks.set(hash, {
              file: file.path,
              startLine: i + 1,
              block
            });
          }
        }
      }
    }
    
    console.log(`✅ 发现 ${this.metrics.duplicates.length} 处重复代码`);
  }

  /**
   * 判断是否为注释块
   * @param {string} block - 代码块
   * @returns {boolean} 是否为注释块
   */
  isCommentBlock(block) {
    const lines = block.split('\n');
    const commentLines = lines.filter(line => {
      const trimmed = line.trim();
      return trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*');
    });
    
    return commentLines.length > lines.length * 0.5;
  }

  /**
   * 计算字符串哈希值
   * @param {string} str - 字符串
   * @returns {number} 哈希值
   */
  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 转换为32位整数
    }
    return hash;
  }

  /**
   * 检测代码异味
   */
  async detectCodeSmells() {
    console.log('👃 检测代码异味...');
    
    for (const file of this.metrics.files) {
      const content = fs.readFileSync(file.fullPath, 'utf8');
      const smells = [];
      
      // 检测长函数
      const longFunctions = this.detectLongFunctions(content);
      smells.push(...longFunctions.map(f => ({
        type: 'Long Function',
        severity: 'medium',
        file: file.path,
        line: f.line,
        description: `函数 ${f.name} 有 ${f.lines} 行，建议拆分`
      })));
      
      // 检测长参数列表
      const longParameterLists = this.detectLongParameterLists(content);
      smells.push(...longParameterLists.map(f => ({
        type: 'Long Parameter List',
        severity: 'low',
        file: file.path,
        line: f.line,
        description: `函数 ${f.name} 有 ${f.params} 个参数，建议使用对象参数`
      })));
      
      // 检测大类
      const largeClasses = this.detectLargeClasses(content);
      smells.push(...largeClasses.map(c => ({
        type: 'Large Class',
        severity: 'high',
        file: file.path,
        line: c.line,
        description: `类 ${c.name} 有 ${c.methods} 个方法，建议拆分`
      })));
      
      // 检测深度嵌套
      const deepNesting = this.detectDeepNesting(content);
      smells.push(...deepNesting.map(n => ({
        type: 'Deep Nesting',
        severity: 'medium',
        file: file.path,
        line: n.line,
        description: `嵌套深度 ${n.depth}，建议重构`
      })));
      
      this.metrics.codeSmells.push(...smells);
    }
    
    console.log(`✅ 发现 ${this.metrics.codeSmells.length} 个代码异味`);
  }

  /**
   * 检测长函数
   * @param {string} content - 文件内容
   * @returns {Array} 长函数列表
   */
  detectLongFunctions(content) {
    const functions = [];
    const lines = content.split('\n');
    let currentFunction = null;
    let braceCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      
      // 检测函数开始
      const functionMatch = trimmed.match(/(?:function\s+(\w+)|const\s+(\w+)\s*=|(\w+)\s*:\s*(?:async\s*)?\()/);
      if (functionMatch && trimmed.includes('{')) {
        currentFunction = {
          name: functionMatch[1] || functionMatch[2] || functionMatch[3] || 'anonymous',
          startLine: i + 1,
          lines: 0
        };
        braceCount = 1;
      }
      
      if (currentFunction) {
        currentFunction.lines++;
        
        // 计算大括号
        braceCount += (line.match(/{/g) || []).length;
        braceCount -= (line.match(/}/g) || []).length;
        
        // 函数结束
        if (braceCount === 0) {
          if (currentFunction.lines > 50) {
            functions.push({
              name: currentFunction.name,
              line: currentFunction.startLine,
              lines: currentFunction.lines
            });
          }
          currentFunction = null;
        }
      }
    }
    
    return functions;
  }

  /**
   * 检测长参数列表
   * @param {string} content - 文件内容
   * @returns {Array} 长参数列表
   */
  detectLongParameterLists(content) {
    const functions = [];
    const functionPattern = /(?:function\s+(\w+)|const\s+(\w+)\s*=.*?)\s*\(([^)]*)\)/g;
    
    let match;
    while ((match = functionPattern.exec(content)) !== null) {
      const name = match[1] || match[2] || 'anonymous';
      const params = match[3].split(',').filter(p => p.trim() !== '').length;
      
      if (params > 5) {
        const lineNumber = content.substring(0, match.index).split('\n').length;
        functions.push({
          name,
          line: lineNumber,
          params
        });
      }
    }
    
    return functions;
  }

  /**
   * 检测大类
   * @param {string} content - 文件内容
   * @returns {Array} 大类列表
   */
  detectLargeClasses(content) {
    const classes = [];
    const classPattern = /class\s+(\w+)/g;
    
    let match;
    while ((match = classPattern.exec(content)) !== null) {
      const className = match[1];
      const classStart = match.index;
      const lineNumber = content.substring(0, classStart).split('\n').length;
      
      // 简单计算类中的方法数量
      const classContent = this.extractClassContent(content, classStart);
      const methodCount = (classContent.match(/\w+\s*\(/g) || []).length;
      
      if (methodCount > 20) {
        classes.push({
          name: className,
          line: lineNumber,
          methods: methodCount
        });
      }
    }
    
    return classes;
  }

  /**
   * 提取类内容
   * @param {string} content - 文件内容
   * @param {number} startIndex - 开始位置
   * @returns {string} 类内容
   */
  extractClassContent(content, startIndex) {
    let braceCount = 0;
    let i = startIndex;
    
    // 找到第一个大括号
    while (i < content.length && content[i] !== '{') {
      i++;
    }
    
    const start = i;
    braceCount = 1;
    i++;
    
    // 找到匹配的结束大括号
    while (i < content.length && braceCount > 0) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') braceCount--;
      i++;
    }
    
    return content.substring(start, i);
  }

  /**
   * 检测深度嵌套
   * @param {string} content - 文件内容
   * @returns {Array} 深度嵌套列表
   */
  detectDeepNesting(content) {
    const nesting = [];
    const lines = content.split('\n');
    let currentDepth = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // 计算嵌套深度
      const openBraces = (line.match(/{/g) || []).length;
      const closeBraces = (line.match(/}/g) || []).length;
      
      currentDepth += openBraces - closeBraces;
      
      if (currentDepth > 4) {
        nesting.push({
          line: i + 1,
          depth: currentDepth
        });
      }
    }
    
    return nesting;
  }

  /**
   * 计算可维护性指数
   */
  async calculateMaintainabilityIndex() {
    console.log('📊 计算可维护性指数...');
    
    let totalMI = 0;
    let fileCount = 0;
    
    for (const file of this.metrics.files) {
      const complexity = this.metrics.complexity[file.path];
      if (complexity) {
        // 简化的可维护性指数计算
        const halstead = complexity.halstead;
        const cyclomatic = complexity.cyclomatic;
        const linesOfCode = file.codeLines;
        
        // MI = 171 - 5.2 * ln(Halstead Volume) - 0.23 * (Cyclomatic Complexity) - 16.2 * ln(Lines of Code)
        const mi = Math.max(0, 
          171 - 5.2 * Math.log(halstead.length || 1) - 
          0.23 * cyclomatic - 
          16.2 * Math.log(linesOfCode || 1)
        );
        
        totalMI += mi;
        fileCount++;
      }
    }
    
    this.metrics.maintainabilityIndex = fileCount > 0 ? totalMI / fileCount : 0;
    
    // 计算技术债务（简化计算）
    this.metrics.technicalDebt = this.metrics.codeSmells.length * 0.5 + 
                                this.metrics.duplicates.length * 1.0;
    
    console.log(`✅ 可维护性指数: ${this.metrics.maintainabilityIndex.toFixed(2)}`);
    console.log(`✅ 技术债务: ${this.metrics.technicalDebt.toFixed(2)} 小时`);
  }

  /**
   * 生成报告
   */
  async generateReports() {
    console.log('📝 生成质量报告...');
    
    // 生成HTML报告
    await this.generateHtmlReport();
    
    // 生成JSON报告
    await this.generateJsonReport();
    
    // 生成Markdown报告
    await this.generateMarkdownReport();
    
    console.log('✅ 报告生成完成');
  }

  /**
   * 生成HTML报告
   */
  async generateHtmlReport() {
    const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>代码质量分析报告</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f5f5f5; padding: 20px; border-radius: 8px; }
        .metric { display: inline-block; margin: 10px; padding: 15px; background: #fff; border: 1px solid #ddd; border-radius: 4px; }
        .metric h3 { margin: 0 0 10px 0; color: #333; }
        .metric .value { font-size: 24px; font-weight: bold; color: #007cba; }
        .section { margin: 30px 0; }
        .table { width: 100%; border-collapse: collapse; }
        .table th, .table td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
        .table th { background-color: #f2f2f2; }
        .severity-high { color: #d73027; }
        .severity-medium { color: #fc8d59; }
        .severity-low { color: #fee08b; }
    </style>
</head>
<body>
    <div class="header">
        <h1>代码质量分析报告</h1>
        <p>生成时间: ${new Date().toLocaleString()}</p>
    </div>

    <div class="section">
        <h2>总体指标</h2>
        <div class="metric">
            <h3>文件数量</h3>
            <div class="value">${this.metrics.files.length}</div>
        </div>
        <div class="metric">
            <h3>代码行数</h3>
            <div class="value">${this.metrics.files.reduce((sum, f) => sum + f.codeLines, 0)}</div>
        </div>
        <div class="metric">
            <h3>可维护性指数</h3>
            <div class="value">${this.metrics.maintainabilityIndex.toFixed(1)}</div>
        </div>
        <div class="metric">
            <h3>技术债务</h3>
            <div class="value">${this.metrics.technicalDebt.toFixed(1)}h</div>
        </div>
    </div>

    <div class="section">
        <h2>代码异味 (${this.metrics.codeSmells.length})</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>类型</th>
                    <th>严重程度</th>
                    <th>文件</th>
                    <th>行号</th>
                    <th>描述</th>
                </tr>
            </thead>
            <tbody>
                ${this.metrics.codeSmells.map(smell => `
                    <tr>
                        <td>${smell.type}</td>
                        <td class="severity-${smell.severity}">${smell.severity}</td>
                        <td>${smell.file}</td>
                        <td>${smell.line}</td>
                        <td>${smell.description}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>重复代码 (${this.metrics.duplicates.length})</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>文件1</th>
                    <th>文件2</th>
                    <th>行号</th>
                    <th>相似度</th>
                </tr>
            </thead>
            <tbody>
                ${this.metrics.duplicates.map(dup => `
                    <tr>
                        <td>${dup.files[0]}</td>
                        <td>${dup.files[1]}</td>
                        <td>${dup.lines[0]} - ${dup.lines[1]}</td>
                        <td>${(dup.similarity * 100).toFixed(1)}%</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
</body>
</html>`;

    fs.writeFileSync(path.join(this.reportsPath, 'code-quality.html'), html, 'utf8');
  }

  /**
   * 生成JSON报告
   */
  async generateJsonReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        files: this.metrics.files.length,
        totalLines: this.metrics.files.reduce((sum, f) => sum + f.lines, 0),
        codeLines: this.metrics.files.reduce((sum, f) => sum + f.codeLines, 0),
        maintainabilityIndex: this.metrics.maintainabilityIndex,
        technicalDebt: this.metrics.technicalDebt,
        codeSmells: this.metrics.codeSmells.length,
        duplicates: this.metrics.duplicates.length
      },
      details: this.metrics
    };

    fs.writeFileSync(
      path.join(this.reportsPath, 'code-quality.json'), 
      JSON.stringify(report, null, 2), 
      'utf8'
    );
  }

  /**
   * 生成Markdown报告
   */
  async generateMarkdownReport() {
    const report = `# 代码质量分析报告

## 概述

**生成时间**: ${new Date().toLocaleString()}

## 总体指标

| 指标 | 数值 |
|------|------|
| 文件数量 | ${this.metrics.files.length} |
| 总行数 | ${this.metrics.files.reduce((sum, f) => sum + f.lines, 0)} |
| 代码行数 | ${this.metrics.files.reduce((sum, f) => sum + f.codeLines, 0)} |
| 注释行数 | ${this.metrics.files.reduce((sum, f) => sum + f.commentLines, 0)} |
| 可维护性指数 | ${this.metrics.maintainabilityIndex.toFixed(2)} |
| 技术债务 | ${this.metrics.technicalDebt.toFixed(2)} 小时 |

## 代码异味

发现 **${this.metrics.codeSmells.length}** 个代码异味：

${this.metrics.codeSmells.map(smell => `
- **${smell.type}** (${smell.severity}) - ${smell.file}:${smell.line}
  - ${smell.description}
`).join('')}

## 重复代码

发现 **${this.metrics.duplicates.length}** 处重复代码：

${this.metrics.duplicates.map(dup => `
- ${dup.files[0]} (行 ${dup.lines[0]}) 与 ${dup.files[1]} (行 ${dup.lines[1]})
  - 相似度: ${(dup.similarity * 100).toFixed(1)}%
`).join('')}

## 建议

### 高优先级
1. 修复所有高严重程度的代码异味
2. 重构重复代码，提取公共函数或组件
3. 拆分过长的函数和类

### 中优先级
1. 减少代码嵌套深度
2. 优化函数参数列表
3. 增加代码注释覆盖率

### 低优先级
1. 统一代码风格
2. 优化导入导出结构
3. 提升整体可维护性指数

---

*报告由代码质量分析工具自动生成*`;

    fs.writeFileSync(path.join(this.reportsPath, 'code-quality.md'), report, 'utf8');
  }
}

/**
 * 主函数
 */
async function main() {
  const analyzer = new CodeQualityAnalyzer();
  await analyzer.run();
}

// 执行脚本
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1].endsWith('codeQualityAnalyzer.js')) {
  main().catch(console.error);
}

export { CodeQualityAnalyzer };