/**
 * 组件文档自动生成脚本
 * @author SOLO Coding
 * @description 为React组件自动添加完整的JSDoc文档和使用示例
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 文档生成器类
 */
class ComponentDocGenerator {
  constructor() {
    this.srcPath = path.join(process.cwd(), 'src');
    this.componentsPath = path.join(this.srcPath, 'components');
    this.processedFiles = [];
    this.skippedFiles = [];
  }

  /**
   * 主执行函数
   */
  async run() {
    console.log('🔍 开始为组件添加文档...\n');

    const componentFiles = await this.getComponentFiles(this.componentsPath);

    for (const filePath of componentFiles) {
      await this.processComponentFile(filePath);
    }

    this.printSummary();
  }

  /**
   * 获取所有组件文件
   * @param {string} dir - 目录路径
   * @returns {Promise<string[]>} 组件文件路径数组
   */
  async getComponentFiles(dir) {
    const files = [];

    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (!this.shouldSkipDirectory(item)) {
          files.push(...(await this.getComponentFiles(fullPath)));
        }
      } else if (this.isComponentFile(fullPath)) {
        files.push(fullPath);
      }
    }

    return files;
  }

  /**
   * 判断是否为组件文件
   * @param {string} filePath - 文件路径
   * @returns {boolean} 是否为组件文件
   */
  isComponentFile(filePath) {
    const fileName = path.basename(filePath);

    // 跳过某些文件
    if (this.shouldSkipFile(fileName)) {
      return false;
    }

    // 只处理 .tsx 文件
    return fileName.endsWith('.tsx');
  }

  /**
   * 判断是否应跳过文件
   * @param {string} fileName - 文件名
   * @returns {boolean} 是否跳过
   */
  shouldSkipFile(fileName) {
    const skipPatterns = [
      /^index\.(ts|tsx)$/,
      /\.d\.ts$/,
      /\.test\.(ts|tsx)$/,
      /\.spec\.(ts|tsx)$/,
      /^vite-env\.d\.ts$/,
    ];

    return skipPatterns.some(pattern => pattern.test(fileName));
  }

  /**
   * 判断是否应跳过目录
   * @param {string} dirName - 目录名
   * @returns {boolean} 是否跳过
   */
  shouldSkipDirectory(dirName) {
    const skipDirs = [
      'node_modules',
      '.git',
      'dist',
      'build',
      '__tests__',
      'test',
      'tests',
    ];
    return skipDirs.includes(dirName);
  }

  /**
   * 处理单个组件文件
   * @param {string} filePath - 文件路径
   */
  async processComponentFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');

      // 检查是否已有完整文档
      if (this.hasCompleteDocumentation(content)) {
        this.skippedFiles.push({
          path: filePath,
          reason: '已有完整文档',
        });
        return;
      }

      const updatedContent = this.addDocumentation(content, filePath);

      if (updatedContent !== content) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        this.processedFiles.push(filePath);
        console.log(`✅ 已更新: ${path.relative(process.cwd(), filePath)}`);
      } else {
        this.skippedFiles.push({
          path: filePath,
          reason: '无需更新',
        });
      }
    } catch (error) {
      console.error(`❌ 处理失败 ${filePath}:`, error.message);
      this.skippedFiles.push({
        path: filePath,
        reason: `错误: ${error.message}`,
      });
    }
  }

  /**
   * 检查是否已有完整文档
   * @param {string} content - 文件内容
   * @returns {boolean} 是否已有完整文档
   */
  hasCompleteDocumentation(content) {
    // 检查是否有文件级注释
    const hasFileComment = /\/\*\*[\s\S]*?\*\//.test(content);

    // 检查是否有组件注释
    const hasComponentComment =
      content.includes('@component') ||
      content.includes('@description') ||
      content.includes('文件级注释');

    return hasFileComment && hasComponentComment;
  }

  /**
   * 为组件添加文档
   * @param {string} content - 原始内容
   * @param {string} filePath - 文件路径
   * @returns {string} 更新后的内容
   */
  addDocumentation(content, filePath) {
    const fileName = path.basename(filePath, '.tsx');
    const relativePath = path.relative(this.componentsPath, filePath);

    // 分析组件信息
    const componentInfo = this.analyzeComponent(content, fileName);

    // 生成文件级注释
    const fileComment = this.generateFileComment(componentInfo, relativePath);

    // 生成组件注释
    const componentComment = this.generateComponentComment(componentInfo);

    // 插入文档
    let updatedContent = content;

    // 添加文件级注释（如果没有）
    if (!this.hasFileComment(content)) {
      updatedContent = fileComment + '\n\n' + updatedContent;
    }

    // 添加组件注释（如果没有）
    updatedContent = this.insertComponentComment(
      updatedContent,
      componentComment,
      componentInfo
    );

    return updatedContent;
  }

  /**
   * 检查是否有文件级注释
   * @param {string} content - 文件内容
   * @returns {boolean} 是否有文件级注释
   */
  hasFileComment(content) {
    const lines = content.split('\n');
    const firstNonEmptyLine = lines.find(line => line.trim() !== '');
    return firstNonEmptyLine && firstNonEmptyLine.trim().startsWith('/**');
  }

  /**
   * 分析组件信息
   * @param {string} content - 文件内容
   * @param {string} fileName - 文件名
   * @returns {Object} 组件信息
   */
  analyzeComponent(content, fileName) {
    const info = {
      name: fileName,
      isDefaultExport: false,
      hasProps: false,
      propsInterface: null,
      imports: [],
      hooks: [],
      description: '',
      category: this.getComponentCategory(fileName),
    };

    // 检查默认导出
    info.isDefaultExport = /export\s+default\s+/.test(content);

    // 检查Props接口
    const propsMatch = content.match(/interface\s+(\w+Props)\s*\{[\s\S]*?\}/);
    if (propsMatch) {
      info.hasProps = true;
      info.propsInterface = propsMatch[1];
    }

    // 提取导入
    const importMatches = content.match(/import\s+.*?from\s+['"].*?['"];?/g);
    if (importMatches) {
      info.imports = importMatches;
    }

    // 检查使用的Hooks
    const hookMatches = content.match(/use[A-Z]\w*/g);
    if (hookMatches) {
      info.hooks = [...new Set(hookMatches)];
    }

    // 生成描述
    info.description = this.generateComponentDescription(
      fileName,
      info.category
    );

    return info;
  }

  /**
   * 获取组件分类
   * @param {string} fileName - 文件名
   * @returns {string} 组件分类
   */
  getComponentCategory(fileName) {
    const categories = {
      ui: [
        'Button',
        'Input',
        'Card',
        'Dialog',
        'Sheet',
        'Toast',
        'Badge',
        'Avatar',
      ],
      game: ['Game', 'Player', 'Room', 'Skill', 'Vote', 'Role'],
      admin: ['Admin', 'Monitor', 'Dashboard', 'Performance'],
      chat: ['Chat', 'Message', 'Channel'],
      error: ['Error', 'Boundary'],
      layout: ['Layout', 'Navbar', 'Footer', 'Page'],
      lobby: ['Lobby', 'Stats', 'Info'],
      judge: ['Judge', 'Management', 'Panel'],
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => fileName.includes(keyword))) {
        return category;
      }
    }

    return 'common';
  }

  /**
   * 生成组件描述
   * @param {string} fileName - 文件名
   * @param {string} category - 组件分类
   * @returns {string} 组件描述
   */
  generateComponentDescription(fileName, category) {
    const descriptions = {
      ui: '提供用户界面交互功能',
      game: '处理游戏逻辑和状态管理',
      admin: '提供管理员功能和监控界面',
      chat: '处理聊天和通信功能',
      error: '处理错误展示和边界保护',
      layout: '提供页面布局和导航功能',
      lobby: '处理大厅和玩家信息展示',
      judge: '提供裁判功能和游戏管理',
      common: '提供通用功能组件',
    };

    return descriptions[category] || '提供特定功能的React组件';
  }

  /**
   * 生成文件级注释
   * @param {Object} componentInfo - 组件信息
   * @param {string} relativePath - 相对路径
   * @returns {string} 文件级注释
   */
  generateFileComment(componentInfo, relativePath) {
    return `/**
 * 文件级注释：${componentInfo.name} 组件
 * 
 * 该文件实现了一个${componentInfo.description}，主要功能包括：
 * - 组件渲染和状态管理
 * - 用户交互处理
 * - 数据展示和更新
 * - 响应式设计支持
 * 
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 * @category ${componentInfo.category}
 * @filepath ${relativePath}
 */`;
  }

  /**
   * 生成组件注释
   * @param {Object} componentInfo - 组件信息
   * @returns {string} 组件注释
   */
  generateComponentComment(componentInfo) {
    const propsDoc = componentInfo.hasProps
      ? `\n * @param {${componentInfo.propsInterface}} props - 组件属性`
      : '\n * @param {Object} props - 组件属性（可选）';

    const hooksDoc =
      componentInfo.hooks.length > 0
        ? `\n * @hooks ${componentInfo.hooks.join(', ')}`
        : '';

    return `/**
 * ${componentInfo.name} 组件
 * 
 * ${componentInfo.description}
 * 
 * @component${propsDoc}
 * @returns {JSX.Element} 渲染的组件${hooksDoc}
 * 
 * @example
 * // 使用示例
 * <${componentInfo.name}${componentInfo.hasProps ? ' {...props}' : ''} />
 */`;
  }

  /**
   * 插入组件注释
   * @param {string} content - 文件内容
   * @param {string} comment - 组件注释
   * @param {Object} componentInfo - 组件信息
   * @returns {string} 更新后的内容
   */
  insertComponentComment(content, comment, componentInfo) {
    // 查找组件定义位置
    const componentPattern = new RegExp(
      `(const\\s+${componentInfo.name}|function\\s+${componentInfo.name}|export\\s+(?:default\\s+)?(?:const\\s+|function\\s+)?${componentInfo.name})`,
      'i'
    );

    const match = content.match(componentPattern);
    if (!match) {
      return content;
    }

    const componentIndex = content.indexOf(match[0]);

    // 检查是否已有组件注释
    const beforeComponent = content.substring(0, componentIndex);
    const lines = beforeComponent.split('\n');
    const lastNonEmptyLine = lines.reverse().find(line => line.trim() !== '');

    if (lastNonEmptyLine && lastNonEmptyLine.trim().endsWith('*/')) {
      return content; // 已有注释
    }

    // 插入注释
    const beforeMatch = content.substring(0, componentIndex);
    const afterMatch = content.substring(componentIndex);

    return beforeMatch + comment + '\n' + afterMatch;
  }

  /**
   * 打印处理摘要
   */
  printSummary() {
    console.log('\n📊 文档生成摘要');
    console.log('==================================================');
    console.log(`✅ 已处理文件: ${this.processedFiles.length}`);
    console.log(`⏭️  跳过文件: ${this.skippedFiles.length}`);

    if (this.processedFiles.length > 0) {
      console.log('\n📝 已更新的文件:');
      this.processedFiles.forEach(file => {
        console.log(`  - ${path.relative(process.cwd(), file)}`);
      });
    }

    if (this.skippedFiles.length > 0) {
      console.log('\n⏭️  跳过的文件:');
      this.skippedFiles.forEach(({ path: filePath, reason }) => {
        console.log(
          `  - ${path.relative(process.cwd(), filePath)} (${reason})`
        );
      });
    }

    console.log('\n✨ 组件文档生成完成！');
  }
}

/**
 * 主函数
 */
async function main() {
  const generator = new ComponentDocGenerator();
  await generator.run();
}

// 执行脚本
if (
  import.meta.url.endsWith(process.argv[1]) ||
  process.argv[1].endsWith('addComponentDocs.js')
) {
  main().catch(console.error);
}

export { ComponentDocGenerator };
