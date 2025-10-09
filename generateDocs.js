/**
 * 简化的文档生成脚本
 * 为项目组件生成基础文档
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 简单的文档生成器
 */
class SimpleDocGenerator {
  constructor() {
    this.srcDir = path.join(__dirname, 'src');
    this.docsDir = path.join(__dirname, 'docs');
    this.components = [];
  }

  /**
   * 运行文档生成
   */
  async generate() {
    console.log('📚 开始生成项目文档...\n');

    try {
      // 1. 创建文档目录
      await fs.mkdir(this.docsDir, { recursive: true });

      // 2. 扫描组件
      await this.scanComponents();

      // 3. 生成组件文档
      await this.generateComponentDocs();

      // 4. 生成主README
      await this.generateMainReadme();

      console.log('✅ 文档生成完成！');
      console.log(`📖 查看文档: ${path.join(this.docsDir, 'README.md')}`);
    } catch (error) {
      console.error('❌ 文档生成失败:', error);
    }
  }

  /**
   * 扫描组件文件
   */
  async scanComponents() {
    console.log('🔍 扫描组件文件...');

    const componentDirs = [
      path.join(this.srcDir, 'components'),
      path.join(this.srcDir, 'pages'),
    ];

    for (const dir of componentDirs) {
      try {
        await this.scanDirectory(dir);
      } catch (error) {
        console.log(`  ⚠️  目录不存在: ${dir}`);
      }
    }

    console.log(`  发现 ${this.components.length} 个组件`);
  }

  /**
   * 扫描目录
   */
  async scanDirectory(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await this.scanDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
        const componentInfo = await this.analyzeComponent(fullPath);
        if (componentInfo) {
          this.components.push(componentInfo);
        }
      }
    }
  }

  /**
   * 分析组件
   */
  async analyzeComponent(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const componentName = path.basename(filePath, '.tsx');

      // 检查是否是React组件
      if (
        !content.includes('export') ||
        (!content.includes('function') && !content.includes('const'))
      ) {
        return null;
      }

      const hasDocumentation = content.includes('/**');
      const props = this.extractProps(content);
      const category = this.getComponentCategory(filePath);

      return {
        name: componentName,
        filePath: path.relative(this.srcDir, filePath),
        category,
        hasDocumentation,
        props,
        description: this.generateDescription(componentName, category),
      };
    } catch (error) {
      console.warn(`⚠️  无法分析组件 ${filePath}`);
      return null;
    }
  }

  /**
   * 提取组件属性
   */
  extractProps(content) {
    const props = [];

    // 查找interface定义
    const interfaceMatch = content.match(/interface\s+\w*Props\s*{([^}]+)}/s);
    if (interfaceMatch) {
      const propsContent = interfaceMatch[1];
      const lines = propsContent.split('\n');

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('*')) {
          const propMatch = trimmed.match(/(\w+)(\?)?:\s*([^;]+)/);
          if (propMatch) {
            props.push({
              name: propMatch[1],
              type: propMatch[3].trim(),
              required: !propMatch[2],
              description: `${propMatch[1]} 属性`,
            });
          }
        }
      }
    }

    return props;
  }

  /**
   * 获取组件分类
   */
  getComponentCategory(filePath) {
    const relativePath = path.relative(this.srcDir, filePath);

    if (relativePath.includes('components/common')) return '通用组件';
    if (relativePath.includes('components/game')) return '游戏组件';
    if (relativePath.includes('components/admin')) return '管理组件';
    if (relativePath.includes('components/debug')) return '调试组件';
    if (relativePath.includes('components/dialogs')) return '对话框组件';
    if (relativePath.includes('components/error')) return '错误处理组件';
    if (relativePath.includes('components/forms')) return '表单组件';
    if (relativePath.includes('components/ui')) return 'UI组件';
    if (relativePath.includes('pages')) return '页面组件';

    return '其他组件';
  }

  /**
   * 生成组件描述
   */
  generateDescription(componentName, category) {
    const descriptions = {
      Button: '通用按钮组件，支持多种样式和状态',
      Input: '输入框组件，支持验证和格式化',
      Modal: '模态框组件，用于显示弹出内容',
      Dialog: '对话框组件，用于用户交互确认',
      Form: '表单组件，提供数据收集和验证',
      Table: '表格组件，用于数据展示和操作',
      Card: '卡片组件，用于内容分组展示',
      Layout: '布局组件，定义页面结构',
      Header: '页头组件，显示导航和标题',
      Footer: '页脚组件，显示版权和链接',
      Loading: '加载组件，显示加载状态',
      Error: '错误组件，显示错误信息',
      Game: '游戏相关组件',
      Player: '玩家相关组件',
      Room: '房间相关组件',
      Chat: '聊天相关组件',
      Vote: '投票相关组件',
      Skill: '技能相关组件',
      Role: '角色相关组件',
      Debug: '调试相关组件',
      Admin: '管理相关组件',
      Performance: '性能相关组件',
      Monitor: '监控相关组件',
    };

    for (const [key, desc] of Object.entries(descriptions)) {
      if (componentName.includes(key)) {
        return desc;
      }
    }

    return `${componentName} - ${category}`;
  }

  /**
   * 生成组件文档
   */
  async generateComponentDocs() {
    console.log('📝 生成组件文档...');

    const componentDocsDir = path.join(this.docsDir, 'components');
    await fs.mkdir(componentDocsDir, { recursive: true });

    // 按分类分组
    const categories = {};
    for (const component of this.components) {
      if (!categories[component.category]) {
        categories[component.category] = [];
      }
      categories[component.category].push(component);
    }

    // 为每个分类生成文档
    for (const [category, components] of Object.entries(categories)) {
      const categoryDoc = this.generateCategoryDoc(category, components);
      const fileName = category.replace(/[^a-zA-Z0-9]/g, '_') + '.md';
      await fs.writeFile(path.join(componentDocsDir, fileName), categoryDoc);
    }

    console.log(`  生成了 ${Object.keys(categories).length} 个分类文档`);
  }

  /**
   * 生成分类文档
   */
  generateCategoryDoc(category, components) {
    let content = `# ${category}\n\n`;
    content += `本分类包含 ${components.length} 个组件。\n\n`;

    for (const component of components) {
      content += `## ${component.name}\n\n`;
      content += `**描述**: ${component.description}\n\n`;
      content += `**文件位置**: \`${component.filePath}\`\n\n`;
      content += `**文档状态**: ${component.hasDocumentation ? '✅ 已文档化' : '❌ 需要文档'}\n\n`;

      if (component.props.length > 0) {
        content += `**属性**:\n\n`;
        content += `| 属性名 | 类型 | 必需 | 描述 |\n`;
        content += `|--------|------|------|------|\n`;

        for (const prop of component.props) {
          content += `| ${prop.name} | \`${prop.type}\` | ${prop.required ? '是' : '否'} | ${prop.description} |\n`;
        }
        content += '\n';
      }

      content += `**使用示例**:\n\n`;
      content += `\`\`\`tsx\n`;
      content += `import ${component.name} from '${component.filePath.replace('.tsx', '')}';\n\n`;
      content += `<${component.name}`;
      if (component.props.length > 0) {
        const requiredProps = component.props
          .filter(p => p.required)
          .slice(0, 2);
        if (requiredProps.length > 0) {
          content += `\n`;
          for (const prop of requiredProps) {
            content += `  ${prop.name}={/* 设置${prop.description} */}\n`;
          }
        }
      }
      content += ` />\n`;
      content += `\`\`\`\n\n`;
      content += '---\n\n';
    }

    return content;
  }

  /**
   * 生成主README
   */
  async generateMainReadme() {
    console.log('📖 生成主README...');

    const stats = this.getStatistics();

    let content = `# 项目文档\n\n`;
    content += `本文档由自动化工具生成，包含项目所有组件的详细说明。\n\n`;

    content += `## 📊 项目统计\n\n`;
    content += `- **总组件数**: ${stats.totalComponents}\n`;
    content += `- **已文档化**: ${stats.documentedComponents} (${stats.documentationCoverage}%)\n`;
    content += `- **需要文档**: ${stats.undocumentedComponents}\n`;
    content += `- **组件分类**: ${stats.categories.length} 个\n\n`;

    content += `## 📁 组件分类\n\n`;
    const categories = this.groupByCategory();
    for (const [category, components] of Object.entries(categories)) {
      const fileName = category.replace(/[^a-zA-Z0-9]/g, '_') + '.md';
      content += `- [${category}](./components/${fileName}) (${components.length} 个组件)\n`;
    }
    content += '\n';

    content += `## 🚀 快速开始\n\n`;
    content += `### 查看组件文档\n\n`;
    content += `1. 浏览上面的分类链接\n`;
    content += `2. 查看具体组件的使用方法和属性说明\n`;
    content += `3. 参考示例代码进行开发\n\n`;

    content += `### 添加组件文档\n\n`;
    content += `为组件添加JSDoc注释：\n\n`;
    content += `\`\`\`tsx\n`;
    content += `/**\n`;
    content += ` * 组件功能描述\n`;
    content += ` * @param props - 组件属性\n`;
    content += ` * @returns JSX元素\n`;
    content += ` */\n`;
    content += `function MyComponent(props: MyComponentProps) {\n`;
    content += `  return <div>{/* 组件内容 */}</div>;\n`;
    content += `}\n`;
    content += `\`\`\`\n\n`;

    content += `### 更新文档\n\n`;
    content += `运行以下命令重新生成文档：\n\n`;
    content += `\`\`\`bash\n`;
    content += `node generateDocs.js\n`;
    content += `\`\`\`\n\n`;

    content += `## 📈 文档覆盖率详情\n\n`;
    content += `| 分类 | 总数 | 已文档化 | 覆盖率 |\n`;
    content += `|------|------|----------|--------|\n`;

    for (const [category, components] of Object.entries(categories)) {
      const documented = components.filter(c => c.hasDocumentation).length;
      const coverage =
        components.length > 0
          ? Math.round((documented / components.length) * 100)
          : 0;
      content += `| ${category} | ${components.length} | ${documented} | ${coverage}% |\n`;
    }
    content += '\n';

    content += `## 🔧 开发指南\n\n`;
    content += `### 组件开发规范\n\n`;
    content += `1. **命名规范**: 使用PascalCase命名组件\n`;
    content += `2. **文件结构**: 每个组件一个文件，文件名与组件名一致\n`;
    content += `3. **属性定义**: 使用TypeScript接口定义组件属性\n`;
    content += `4. **文档注释**: 为所有公共组件添加JSDoc注释\n`;
    content += `5. **示例代码**: 在文档中提供使用示例\n\n`;

    content += `### 最佳实践\n\n`;
    content += `- 保持组件单一职责\n`;
    content += `- 使用TypeScript确保类型安全\n`;
    content += `- 添加适当的错误处理\n`;
    content += `- 编写可复用的组件\n`;
    content += `- 定期更新文档\n\n`;

    content += `---\n\n`;
    content += `*文档生成时间: ${new Date().toLocaleString()}*\n`;
    content += `*生成工具: 自动化文档生成器*\n`;

    await fs.writeFile(path.join(this.docsDir, 'README.md'), content);
  }

  /**
   * 按分类分组
   */
  groupByCategory() {
    const categories = {};
    for (const component of this.components) {
      if (!categories[component.category]) {
        categories[component.category] = [];
      }
      categories[component.category].push(component);
    }
    return categories;
  }

  /**
   * 获取统计信息
   */
  getStatistics() {
    const totalComponents = this.components.length;
    const documentedComponents = this.components.filter(
      c => c.hasDocumentation
    ).length;
    const undocumentedComponents = totalComponents - documentedComponents;
    const documentationCoverage =
      totalComponents > 0
        ? Math.round((documentedComponents / totalComponents) * 100)
        : 0;
    const categories = [...new Set(this.components.map(c => c.category))];

    return {
      totalComponents,
      documentedComponents,
      undocumentedComponents,
      documentationCoverage,
      categories,
    };
  }
}

// 运行文档生成
async function main() {
  const generator = new SimpleDocGenerator();
  await generator.generate();
}

main().catch(console.error);
