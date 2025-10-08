/**
 * 依赖分析工具
 * @author SOLO Coding
 * @description 分析项目依赖关系，检测循环依赖、未使用依赖等问题
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 依赖分析器类
 */
class DependencyAnalyzer {
  constructor() {
    this.srcPath = path.join(process.cwd(), 'src');
    this.packageJsonPath = path.join(process.cwd(), 'package.json');
    this.dependencyGraph = new Map();
    this.reverseDependencyGraph = new Map();
    this.circularDependencies = [];
    this.unusedDependencies = [];
    this.missingDependencies = [];
    this.fileImports = new Map();
  }

  /**
   * 主执行函数
   */
  async run() {
    console.log('🔍 开始依赖分析...\n');
    
    // 1. 分析文件依赖关系
    await this.analyzeFileDependencies();
    
    // 2. 检测循环依赖
    this.detectCircularDependencies();
    
    // 3. 分析包依赖
    await this.analyzePackageDependencies();
    
    // 4. 生成依赖图
    await this.generateDependencyGraph();
    
    // 5. 生成报告
    await this.generateReport();
    
    console.log('✨ 依赖分析完成！');
  }

  /**
   * 分析文件依赖关系
   */
  async analyzeFileDependencies() {
    console.log('📁 分析文件依赖关系...');
    
    const files = this.getFilesRecursively(this.srcPath, ['.ts', '.tsx', '.js', '.jsx']);
    
    for (const filePath of files) {
      const imports = this.extractImports(filePath);
      this.fileImports.set(filePath, imports);
      
      // 构建依赖图
      this.dependencyGraph.set(filePath, imports.localImports);
      
      // 构建反向依赖图
      for (const importPath of imports.localImports) {
        if (!this.reverseDependencyGraph.has(importPath)) {
          this.reverseDependencyGraph.set(importPath, []);
        }
        this.reverseDependencyGraph.get(importPath).push(filePath);
      }
    }
    
    console.log(`✅ 分析了 ${files.length} 个文件`);
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
    const skipDirs = ['node_modules', '.git', 'dist', 'build', '__tests__', 'test', 'tests'];
    return skipDirs.includes(dirName);
  }

  /**
   * 提取文件的导入信息
   * @param {string} filePath - 文件路径
   * @returns {Object} 导入信息
   */
  extractImports(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const imports = {
      localImports: [],
      externalImports: [],
      typeImports: [],
      dynamicImports: []
    };
    
    // 匹配各种导入语句
    const importPatterns = [
      // import ... from '...'
      /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([^'"]+)['"]/g,
      // import('...')
      /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
      // require('...')
      /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g
    ];
    
    for (const pattern of importPatterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const importPath = match[1];
        const resolvedPath = this.resolveImportPath(importPath, filePath);
        
        if (this.isLocalImport(importPath)) {
          if (resolvedPath && fs.existsSync(resolvedPath)) {
            imports.localImports.push(resolvedPath);
          } else {
            this.missingDependencies.push({
              file: filePath,
              import: importPath,
              resolvedPath
            });
          }
        } else {
          imports.externalImports.push(importPath);
        }
      }
    }
    
    // 匹配类型导入
    const typeImportPattern = /import\s+type\s+(?:\{[^}]*\}|\w+)\s+from\s+['"]([^'"]+)['"]/g;
    let typeMatch;
    while ((typeMatch = typeImportPattern.exec(content)) !== null) {
      imports.typeImports.push(typeMatch[1]);
    }
    
    return imports;
  }

  /**
   * 判断是否为本地导入
   * @param {string} importPath - 导入路径
   * @returns {boolean} 是否为本地导入
   */
  isLocalImport(importPath) {
    return importPath.startsWith('./') || importPath.startsWith('../') || importPath.startsWith('@/');
  }

  /**
   * 解析导入路径
   * @param {string} importPath - 导入路径
   * @param {string} fromFile - 导入文件路径
   * @returns {string|null} 解析后的路径
   */
  resolveImportPath(importPath, fromFile) {
    if (!this.isLocalImport(importPath)) {
      return null;
    }
    
    const fromDir = path.dirname(fromFile);
    let resolvedPath;
    
    if (importPath.startsWith('@/')) {
      // 处理别名导入
      resolvedPath = path.join(this.srcPath, importPath.substring(2));
    } else {
      // 处理相对导入
      resolvedPath = path.resolve(fromDir, importPath);
    }
    
    // 尝试不同的文件扩展名
    const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];
    
    // 如果路径已经有扩展名
    if (path.extname(resolvedPath)) {
      return fs.existsSync(resolvedPath) ? resolvedPath : null;
    }
    
    // 尝试添加扩展名
    for (const ext of extensions) {
      const pathWithExt = resolvedPath + ext;
      if (fs.existsSync(pathWithExt)) {
        return pathWithExt;
      }
    }
    
    // 尝试index文件
    for (const ext of extensions) {
      const indexPath = path.join(resolvedPath, `index${ext}`);
      if (fs.existsSync(indexPath)) {
        return indexPath;
      }
    }
    
    return null;
  }

  /**
   * 检测循环依赖
   */
  detectCircularDependencies() {
    console.log('🔄 检测循环依赖...');
    
    const visited = new Set();
    const recursionStack = new Set();
    const cycles = [];
    
    for (const [file] of this.dependencyGraph) {
      if (!visited.has(file)) {
        this.dfsDetectCycle(file, visited, recursionStack, [], cycles);
      }
    }
    
    this.circularDependencies = cycles;
    console.log(`✅ 发现 ${cycles.length} 个循环依赖`);
  }

  /**
   * 深度优先搜索检测循环
   * @param {string} file - 当前文件
   * @param {Set} visited - 已访问文件
   * @param {Set} recursionStack - 递归栈
   * @param {string[]} path - 当前路径
   * @param {Array} cycles - 循环依赖数组
   */
  dfsDetectCycle(file, visited, recursionStack, path, cycles) {
    visited.add(file);
    recursionStack.add(file);
    path.push(file);
    
    const dependencies = this.dependencyGraph.get(file) || [];
    
    for (const dep of dependencies) {
      if (!visited.has(dep)) {
        this.dfsDetectCycle(dep, visited, recursionStack, path, cycles);
      } else if (recursionStack.has(dep)) {
        // 发现循环
        const cycleStart = path.indexOf(dep);
        const cycle = path.slice(cycleStart).concat([dep]);
        cycles.push(cycle);
      }
    }
    
    recursionStack.delete(file);
    path.pop();
  }

  /**
   * 分析包依赖
   */
  async analyzePackageDependencies() {
    console.log('📦 分析包依赖...');
    
    if (!fs.existsSync(this.packageJsonPath)) {
      console.log('⚠️  未找到 package.json 文件');
      return;
    }
    
    const packageJson = JSON.parse(fs.readFileSync(this.packageJsonPath, 'utf8'));
    const allDependencies = {
      ...packageJson.dependencies || {},
      ...packageJson.devDependencies || {},
      ...packageJson.peerDependencies || {}
    };
    
    // 收集所有外部导入
    const usedPackages = new Set();
    
    for (const [, imports] of this.fileImports) {
      for (const externalImport of imports.externalImports) {
        const packageName = this.extractPackageName(externalImport);
        usedPackages.add(packageName);
      }
    }
    
    // 查找未使用的依赖
    for (const packageName of Object.keys(allDependencies)) {
      if (!usedPackages.has(packageName)) {
        this.unusedDependencies.push(packageName);
      }
    }
    
    console.log(`✅ 发现 ${this.unusedDependencies.length} 个未使用的依赖`);
  }

  /**
   * 提取包名
   * @param {string} importPath - 导入路径
   * @returns {string} 包名
   */
  extractPackageName(importPath) {
    if (importPath.startsWith('@')) {
      // 作用域包
      const parts = importPath.split('/');
      return parts.slice(0, 2).join('/');
    } else {
      // 普通包
      return importPath.split('/')[0];
    }
  }

  /**
   * 生成依赖图
   */
  async generateDependencyGraph() {
    console.log('📊 生成依赖图...');
    
    const graphData = {
      nodes: [],
      edges: []
    };
    
    // 添加节点
    for (const [file] of this.dependencyGraph) {
      const relativePath = path.relative(this.srcPath, file);
      graphData.nodes.push({
        id: file,
        label: relativePath,
        type: this.getFileType(file),
        size: this.getFileSize(file)
      });
    }
    
    // 添加边
    for (const [file, dependencies] of this.dependencyGraph) {
      for (const dep of dependencies) {
        graphData.edges.push({
          source: file,
          target: dep,
          type: 'dependency'
        });
      }
    }
    
    // 保存图数据
    const reportsPath = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsPath)) {
      fs.mkdirSync(reportsPath, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(reportsPath, 'dependency-graph.json'),
      JSON.stringify(graphData, null, 2),
      'utf8'
    );
    
    // 生成DOT格式（用于Graphviz）
    const dotContent = this.generateDotGraph(graphData);
    fs.writeFileSync(
      path.join(reportsPath, 'dependency-graph.dot'),
      dotContent,
      'utf8'
    );
    
    console.log('✅ 依赖图已生成');
  }

  /**
   * 获取文件类型
   * @param {string} filePath - 文件路径
   * @returns {string} 文件类型
   */
  getFileType(filePath) {
    const ext = path.extname(filePath);
    const basename = path.basename(filePath, ext);
    
    if (basename.includes('.test') || basename.includes('.spec')) {
      return 'test';
    }
    
    if (basename.includes('.d')) {
      return 'types';
    }
    
    switch (ext) {
      case '.tsx':
        return 'react-component';
      case '.ts':
        return 'typescript';
      case '.jsx':
        return 'react-component';
      case '.js':
        return 'javascript';
      default:
        return 'other';
    }
  }

  /**
   * 获取文件大小
   * @param {string} filePath - 文件路径
   * @returns {number} 文件大小（字节）
   */
  getFileSize(filePath) {
    try {
      return fs.statSync(filePath).size;
    } catch {
      return 0;
    }
  }

  /**
   * 生成DOT格式图
   * @param {Object} graphData - 图数据
   * @returns {string} DOT内容
   */
  generateDotGraph(graphData) {
    let dot = 'digraph DependencyGraph {\n';
    dot += '  rankdir=TB;\n';
    dot += '  node [shape=box, style=rounded];\n\n';
    
    // 添加节点
    for (const node of graphData.nodes) {
      const color = this.getNodeColor(node.type);
      const label = node.label.replace(/\\/g, '/');
      dot += `  "${node.id}" [label="${label}", fillcolor="${color}", style=filled];\n`;
    }
    
    dot += '\n';
    
    // 添加边
    for (const edge of graphData.edges) {
      dot += `  "${edge.source}" -> "${edge.target}";\n`;
    }
    
    dot += '}\n';
    
    return dot;
  }

  /**
   * 获取节点颜色
   * @param {string} type - 节点类型
   * @returns {string} 颜色
   */
  getNodeColor(type) {
    const colors = {
      'react-component': '#61dafb',
      'typescript': '#3178c6',
      'javascript': '#f7df1e',
      'test': '#ff6b6b',
      'types': '#9b59b6',
      'other': '#95a5a6'
    };
    
    return colors[type] || colors.other;
  }

  /**
   * 生成分析报告
   */
  async generateReport() {
    console.log('📊 生成依赖分析报告...');
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.dependencyGraph.size,
        circularDependencies: this.circularDependencies.length,
        unusedDependencies: this.unusedDependencies.length,
        missingDependencies: this.missingDependencies.length,
        averageDependenciesPerFile: this.calculateAverageDependencies(),
        mostDependentFiles: this.getMostDependentFiles(10),
        mostUsedFiles: this.getMostUsedFiles(10)
      },
      circularDependencies: this.circularDependencies.map(cycle => 
        cycle.map(file => path.relative(this.srcPath, file))
      ),
      unusedDependencies: this.unusedDependencies,
      missingDependencies: this.missingDependencies.map(dep => ({
        file: path.relative(this.srcPath, dep.file),
        import: dep.import,
        resolvedPath: dep.resolvedPath ? path.relative(this.srcPath, dep.resolvedPath) : null
      })),
      fileAnalysis: this.generateFileAnalysis()
    };
    
    // 生成JSON报告
    const reportsPath = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsPath)) {
      fs.mkdirSync(reportsPath, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(reportsPath, 'dependency-analysis.json'),
      JSON.stringify(report, null, 2),
      'utf8'
    );
    
    // 生成Markdown报告
    const markdownReport = this.generateMarkdownReport(report);
    fs.writeFileSync(
      path.join(reportsPath, 'dependency-analysis.md'),
      markdownReport,
      'utf8'
    );
    
    // 打印摘要
    console.log('\n📋 依赖分析摘要:');
    console.log(`  总文件数: ${report.summary.totalFiles}`);
    console.log(`  循环依赖: ${report.summary.circularDependencies}`);
    console.log(`  未使用依赖: ${report.summary.unusedDependencies}`);
    console.log(`  缺失依赖: ${report.summary.missingDependencies}`);
    console.log(`  平均依赖数: ${report.summary.averageDependenciesPerFile.toFixed(2)}`);
    
    console.log(`\n📁 报告已保存到 reports/ 目录`);
  }

  /**
   * 计算平均依赖数
   * @returns {number} 平均依赖数
   */
  calculateAverageDependencies() {
    let totalDependencies = 0;
    
    for (const [, dependencies] of this.dependencyGraph) {
      totalDependencies += dependencies.length;
    }
    
    return this.dependencyGraph.size > 0 ? totalDependencies / this.dependencyGraph.size : 0;
  }

  /**
   * 获取依赖最多的文件
   * @param {number} limit - 限制数量
   * @returns {Array} 文件列表
   */
  getMostDependentFiles(limit) {
    const files = Array.from(this.dependencyGraph.entries())
      .map(([file, dependencies]) => ({
        file: path.relative(this.srcPath, file),
        dependencies: dependencies.length
      }))
      .sort((a, b) => b.dependencies - a.dependencies)
      .slice(0, limit);
    
    return files;
  }

  /**
   * 获取被使用最多的文件
   * @param {number} limit - 限制数量
   * @returns {Array} 文件列表
   */
  getMostUsedFiles(limit) {
    const files = Array.from(this.reverseDependencyGraph.entries())
      .map(([file, dependents]) => ({
        file: path.relative(this.srcPath, file),
        usedBy: dependents.length
      }))
      .sort((a, b) => b.usedBy - a.usedBy)
      .slice(0, limit);
    
    return files;
  }

  /**
   * 生成文件分析
   * @returns {Array} 文件分析数据
   */
  generateFileAnalysis() {
    const analysis = [];
    
    for (const [file, imports] of this.fileImports) {
      const relativePath = path.relative(this.srcPath, file);
      const dependencies = this.dependencyGraph.get(file) || [];
      const dependents = this.reverseDependencyGraph.get(file) || [];
      
      analysis.push({
        file: relativePath,
        type: this.getFileType(file),
        size: this.getFileSize(file),
        localImports: imports.localImports.length,
        externalImports: imports.externalImports.length,
        typeImports: imports.typeImports.length,
        dependencies: dependencies.length,
        dependents: dependents.length,
        complexity: this.calculateFileComplexity(file)
      });
    }
    
    return analysis.sort((a, b) => b.complexity - a.complexity);
  }

  /**
   * 计算文件复杂度
   * @param {string} filePath - 文件路径
   * @returns {number} 复杂度分数
   */
  calculateFileComplexity(filePath) {
    const dependencies = this.dependencyGraph.get(filePath) || [];
    const dependents = this.reverseDependencyGraph.get(filePath) || [];
    const size = this.getFileSize(filePath);
    
    // 复杂度 = 依赖数 * 2 + 被依赖数 * 3 + 文件大小 / 1000
    return dependencies.length * 2 + dependents.length * 3 + size / 1000;
  }

  /**
   * 生成Markdown报告
   * @param {Object} report - 报告数据
   * @returns {string} Markdown内容
   */
  generateMarkdownReport(report) {
    return `# 依赖分析报告

## 概述

**分析时间**: ${new Date(report.timestamp).toLocaleString()}
**总文件数**: ${report.summary.totalFiles}
**循环依赖**: ${report.summary.circularDependencies}
**未使用依赖**: ${report.summary.unusedDependencies}
**缺失依赖**: ${report.summary.missingDependencies}
**平均依赖数**: ${report.summary.averageDependenciesPerFile.toFixed(2)}

## 循环依赖

${report.circularDependencies.length > 0 ? 
  report.circularDependencies.map((cycle, index) => `
### 循环 ${index + 1}

\`\`\`
${cycle.join(' → ')} → ${cycle[0]}
\`\`\`
`).join('') : 
  '✅ 未发现循环依赖'
}

## 未使用的依赖

${report.unusedDependencies.length > 0 ?
  report.unusedDependencies.map(dep => `- ${dep}`).join('\n') :
  '✅ 所有依赖都在使用中'
}

## 缺失的依赖

${report.missingDependencies.length > 0 ?
  report.missingDependencies.map(dep => `
- **文件**: ${dep.file}
- **导入**: ${dep.import}
- **解析路径**: ${dep.resolvedPath || '无法解析'}
`).join('\n') :
  '✅ 未发现缺失依赖'
}

## 依赖最多的文件

${report.summary.mostDependentFiles.map((file, index) => `
${index + 1}. **${file.file}** (${file.dependencies} 个依赖)
`).join('')}

## 被使用最多的文件

${report.summary.mostUsedFiles.map((file, index) => `
${index + 1}. **${file.file}** (被 ${file.usedBy} 个文件使用)
`).join('')}

## 文件复杂度分析

${report.fileAnalysis.slice(0, 20).map((file, index) => `
${index + 1}. **${file.file}**
   - 类型: ${file.type}
   - 大小: ${(file.size / 1024).toFixed(2)} KB
   - 本地导入: ${file.localImports}
   - 外部导入: ${file.externalImports}
   - 依赖数: ${file.dependencies}
   - 被依赖数: ${file.dependents}
   - 复杂度: ${file.complexity.toFixed(2)}
`).join('')}

## 建议

### 循环依赖处理
${report.summary.circularDependencies > 0 ? `
- 重构代码以消除循环依赖
- 考虑提取公共模块
- 使用依赖注入模式
` : '- 保持当前良好的依赖结构'}

### 依赖优化
${report.summary.unusedDependencies > 0 ? `
- 移除未使用的依赖包
- 定期清理package.json
` : '- 依赖管理良好'}

### 架构改进
- 考虑将高复杂度文件拆分
- 减少文件间的耦合度
- 建立清晰的模块边界

---

*报告由依赖分析工具生成*`;
  }
}

/**
 * 主函数
 */
async function main() {
  const analyzer = new DependencyAnalyzer();
  await analyzer.run();
}

// 执行脚本
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1].endsWith('dependencyAnalyzer.js')) {
  main().catch(console.error);
}

export { DependencyAnalyzer };