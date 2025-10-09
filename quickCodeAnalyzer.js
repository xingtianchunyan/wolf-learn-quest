/**
 * 快速代码分析工具
 * 快速分析项目代码质量和结构
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class QuickCodeAnalyzer {
  constructor() {
    this.srcDir = path.join(__dirname, 'src');
    this.results = {
      files: {
        total: 0,
        typescript: 0,
        react: 0,
        vue: 0,
      },
      components: {
        total: 0,
        withTests: 0,
        documented: 0,
      },
      hooks: {
        total: 0,
        custom: 0,
      },
      utils: {
        total: 0,
        categories: [],
      },
      complexity: {
        highComplexity: [],
        longFiles: [],
      },
      imports: {
        issues: [],
        suggestions: [],
      },
    };
  }

  /**
   * 运行快速分析
   */
  async runAnalysis() {
    console.log('🚀 开始快速代码分析...\n');

    try {
      // 1. 分析文件结构
      await this.analyzeFileStructure();

      // 2. 分析组件
      await this.analyzeComponents();

      // 3. 分析Hook
      await this.analyzeHooks();

      // 4. 分析工具函数
      await this.analyzeUtils();

      // 5. 检查代码复杂度
      await this.checkComplexity();

      // 6. 分析导入
      await this.analyzeImports();

      // 7. 生成报告
      await this.generateReport();

      console.log('✅ 快速分析完成！');
    } catch (error) {
      console.error('❌ 分析过程中出现错误:', error);
    }
  }

  /**
   * 分析文件结构
   */
  async analyzeFileStructure() {
    console.log('📁 分析文件结构...');

    const files = await this.getAllFiles();
    this.results.files.total = files.length;

    for (const file of files) {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        this.results.files.typescript++;
      }
      if (file.endsWith('.tsx') || file.includes('component')) {
        this.results.files.react++;
      }
      if (file.endsWith('.vue')) {
        this.results.files.vue++;
      }
    }

    console.log(`  ✅ 总文件数: ${this.results.files.total}`);
    console.log(`  - TypeScript文件: ${this.results.files.typescript}`);
    console.log(`  - React组件: ${this.results.files.react}`);
    console.log(`  - Vue组件: ${this.results.files.vue}`);
  }

  /**
   * 分析组件
   */
  async analyzeComponents() {
    console.log('\n🧩 分析组件...');

    const componentDirs = [
      path.join(this.srcDir, 'components'),
      path.join(this.srcDir, 'pages'),
    ];

    let totalComponents = 0;
    let documentedComponents = 0;
    let componentsWithTests = 0;

    for (const dir of componentDirs) {
      try {
        const components = await this.getComponentsInDir(dir);
        totalComponents += components.length;

        for (const component of components) {
          const content = await fs.readFile(component, 'utf-8');

          // 检查是否有文档注释
          if (content.includes('/**') || content.includes('* @')) {
            documentedComponents++;
          }

          // 检查是否有测试文件
          const testFile = component.replace(/\.(tsx?|vue)$/, '.test.$1');
          try {
            await fs.access(testFile);
            componentsWithTests++;
          } catch {
            // 测试文件不存在
          }
        }
      } catch (error) {
        // 目录不存在
      }
    }

    this.results.components.total = totalComponents;
    this.results.components.documented = documentedComponents;
    this.results.components.withTests = componentsWithTests;

    console.log(`  ✅ 总组件数: ${totalComponents}`);
    console.log(
      `  - 有文档的组件: ${documentedComponents} (${((documentedComponents / totalComponents) * 100).toFixed(1)}%)`
    );
    console.log(
      `  - 有测试的组件: ${componentsWithTests} (${((componentsWithTests / totalComponents) * 100).toFixed(1)}%)`
    );
  }

  /**
   * 分析Hook
   */
  async analyzeHooks() {
    console.log('\n🎣 分析Hook...');

    const hooksDir = path.join(this.srcDir, 'hooks');

    try {
      const files = await fs.readdir(hooksDir, { recursive: true });
      const hookFiles = files.filter(
        file =>
          typeof file === 'string' &&
          file.startsWith('use') &&
          file.endsWith('.ts')
      );

      this.results.hooks.total = hookFiles.length;
      this.results.hooks.custom = hookFiles.filter(
        file =>
          !['useState', 'useEffect', 'useContext'].some(builtin =>
            file.includes(builtin)
          )
      ).length;

      console.log(`  ✅ 总Hook数: ${hookFiles.length}`);
      console.log(`  - 自定义Hook: ${this.results.hooks.custom}`);

      // 显示前几个Hook
      if (hookFiles.length > 0) {
        console.log(
          `  - 示例: ${hookFiles.slice(0, 5).join(', ')}${hookFiles.length > 5 ? '...' : ''}`
        );
      }
    } catch (error) {
      console.log('  ⚠️  Hook目录不存在');
    }
  }

  /**
   * 分析工具函数
   */
  async analyzeUtils() {
    console.log('\n🔧 分析工具函数...');

    const utilsDir = path.join(this.srcDir, 'utils');

    try {
      const files = await fs.readdir(utilsDir);
      const utilFiles = files.filter(file => file.endsWith('.ts'));

      this.results.utils.total = utilFiles.length;
      this.results.utils.categories = utilFiles.map(file =>
        file.replace('.ts', '')
      );

      console.log(`  ✅ 工具文件数: ${utilFiles.length}`);
      console.log(`  - 分类: ${this.results.utils.categories.join(', ')}`);
    } catch (error) {
      console.log('  ⚠️  工具函数目录不存在');
    }
  }

  /**
   * 检查代码复杂度
   */
  async checkComplexity() {
    console.log('\n📊 检查代码复杂度...');

    const files = await this.getAllFiles();
    const tsFiles = files.filter(
      file => file.endsWith('.ts') || file.endsWith('.tsx')
    );

    let longFiles = 0;
    let complexFiles = 0;

    for (const file of tsFiles.slice(0, 20)) {
      // 限制检查文件数量
      try {
        const content = await fs.readFile(file, 'utf-8');
        const lines = content.split('\n').length;

        if (lines > 300) {
          longFiles++;
          this.results.complexity.longFiles.push({
            file: path.relative(this.srcDir, file),
            lines,
          });
        }

        // 简单复杂度检查
        const complexity = this.calculateSimpleComplexity(content);
        if (complexity > 20) {
          complexFiles++;
          this.results.complexity.highComplexity.push({
            file: path.relative(this.srcDir, file),
            complexity,
          });
        }
      } catch (error) {
        // 忽略读取错误
      }
    }

    console.log(`  ✅ 检查了 ${Math.min(tsFiles.length, 20)} 个文件`);
    console.log(`  - 长文件 (>300行): ${longFiles}`);
    console.log(`  - 复杂文件: ${complexFiles}`);
  }

  /**
   * 分析导入
   */
  async analyzeImports() {
    console.log('\n📦 分析导入语句...');

    const files = await this.getAllFiles();
    const tsFiles = files.filter(
      file => file.endsWith('.ts') || file.endsWith('.tsx')
    );

    let totalImports = 0;
    let relativeImports = 0;
    let deepImports = 0;

    for (const file of tsFiles.slice(0, 30)) {
      // 限制检查文件数量
      try {
        const content = await fs.readFile(file, 'utf-8');
        const imports = content.match(/^import .+$/gm) || [];

        totalImports += imports.length;

        for (const imp of imports) {
          if (imp.includes('./') || imp.includes('../')) {
            relativeImports++;

            if (imp.includes('../../../')) {
              deepImports++;
              this.results.imports.issues.push({
                file: path.relative(this.srcDir, file),
                import: imp.trim(),
                issue: '深层相对路径',
              });
            }
          }
        }
      } catch (error) {
        // 忽略读取错误
      }
    }

    console.log(`  ✅ 检查了 ${Math.min(tsFiles.length, 30)} 个文件`);
    console.log(`  - 总导入数: ${totalImports}`);
    console.log(`  - 相对导入: ${relativeImports}`);
    console.log(`  - 深层导入: ${deepImports}`);

    if (deepImports > 0) {
      this.results.imports.suggestions.push('建议使用路径别名替代深层相对路径');
    }
  }

  /**
   * 获取所有文件
   */
  async getAllFiles() {
    const files = [];

    const scanDir = async dir => {
      try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          if (
            entry.isDirectory() &&
            !['node_modules', '.git', 'dist', 'build'].includes(entry.name)
          ) {
            await scanDir(fullPath);
          } else if (
            entry.isFile() &&
            /\.(ts|tsx|vue|js|jsx)$/.test(entry.name)
          ) {
            files.push(fullPath);
          }
        }
      } catch (error) {
        // 忽略无法访问的目录
      }
    };

    await scanDir(this.srcDir);
    return files;
  }

  /**
   * 获取目录中的组件
   */
  async getComponentsInDir(dir) {
    const components = [];

    try {
      const entries = await fs.readdir(dir, {
        withFileTypes: true,
        recursive: true,
      });

      for (const entry of entries) {
        if (entry.isFile() && /\.(tsx|vue)$/.test(entry.name)) {
          components.push(path.join(dir, entry.name));
        }
      }
    } catch (error) {
      // 目录不存在或无法访问
    }

    return components;
  }

  /**
   * 计算简单复杂度
   */
  calculateSimpleComplexity(content) {
    let complexity = 1;

    const patterns = [
      /\bif\b/g,
      /\belse\b/g,
      /\bwhile\b/g,
      /\bfor\b/g,
      /\bswitch\b/g,
      /\bcase\b/g,
      /\bcatch\b/g,
      /\b&&\b/g,
      /\b\|\|\b/g,
    ];

    for (const pattern of patterns) {
      const matches = content.match(pattern);
      if (matches) {
        complexity += matches.length;
      }
    }

    return complexity;
  }

  /**
   * 生成报告
   */
  async generateReport() {
    console.log('\n📋 生成分析报告...');

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.results.files.total,
        typescriptFiles: this.results.files.typescript,
        components: this.results.components.total,
        hooks: this.results.hooks.total,
        utils: this.results.utils.total,
      },
      quality: {
        documentationCoverage:
          this.results.components.total > 0
            ? (
                (this.results.components.documented /
                  this.results.components.total) *
                100
              ).toFixed(1) + '%'
            : '0%',
        testCoverage:
          this.results.components.total > 0
            ? (
                (this.results.components.withTests /
                  this.results.components.total) *
                100
              ).toFixed(1) + '%'
            : '0%',
        complexityIssues: this.results.complexity.highComplexity.length,
        importIssues: this.results.imports.issues.length,
      },
      details: this.results,
      recommendations: this.generateRecommendations(),
    };

    const reportPath = path.join(__dirname, 'quick-analysis-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

    console.log(`  ✅ 报告已生成: ${reportPath}`);

    // 显示摘要
    console.log('\n📊 分析摘要:');
    console.log(`  - 总文件数: ${report.summary.totalFiles}`);
    console.log(`  - TypeScript文件: ${report.summary.typescriptFiles}`);
    console.log(`  - 组件数: ${report.summary.components}`);
    console.log(`  - Hook数: ${report.summary.hooks}`);
    console.log(`  - 工具函数: ${report.summary.utils}`);

    console.log('\n📈 质量指标:');
    console.log(`  - 文档覆盖率: ${report.quality.documentationCoverage}`);
    console.log(`  - 测试覆盖率: ${report.quality.testCoverage}`);
    console.log(`  - 复杂度问题: ${report.quality.complexityIssues} 个`);
    console.log(`  - 导入问题: ${report.quality.importIssues} 个`);

    console.log('\n💡 主要建议:');
    report.recommendations.slice(0, 5).forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });
  }

  /**
   * 生成建议
   */
  generateRecommendations() {
    const recommendations = [];

    if (
      this.results.components.documented / this.results.components.total <
      0.5
    ) {
      recommendations.push('建议为组件添加JSDoc文档注释');
    }

    if (
      this.results.components.withTests / this.results.components.total <
      0.3
    ) {
      recommendations.push('建议增加组件单元测试覆盖率');
    }

    if (this.results.complexity.longFiles.length > 0) {
      recommendations.push('建议拆分过长的文件为多个模块');
    }

    if (this.results.complexity.highComplexity.length > 0) {
      recommendations.push('建议简化复杂的函数逻辑');
    }

    if (this.results.imports.issues.length > 0) {
      recommendations.push('建议使用路径别名优化导入语句');
    }

    recommendations.push('定期运行代码质量检查');
    recommendations.push('建立代码审查流程');
    recommendations.push('使用ESLint和Prettier保持代码风格');

    return recommendations;
  }
}

// 运行分析
console.log('脚本开始执行...');
const analyzer = new QuickCodeAnalyzer();
analyzer.runAnalysis().catch(console.error);

export default QuickCodeAnalyzer;
