/**
 * JSDoc自动添加脚本
 * 为缺少文档的组件和函数自动添加JSDoc注释
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 简化的JSDoc生成器
 */
class SimpleJSDocGenerator {
  constructor() {
    this.srcDir = path.join(__dirname, 'src');
    this.processedFiles = 0;
    this.addedDocs = 0;
  }

  /**
   * 运行JSDoc生成
   */
  async generate() {
    console.log('🚀 开始JSDoc自动生成...\n');

    try {
      // 获取需要处理的文件
      const files = await this.getTargetFiles();
      console.log(`📁 发现 ${files.length} 个目标文件`);

      // 处理每个文件
      for (const file of files) {
        await this.processFile(file);
      }

      console.log('\n✅ JSDoc生成完成！');
      console.log(`📊 处理统计:`);
      console.log(`  - 处理文件: ${this.processedFiles} 个`);
      console.log(`  - 添加文档: ${this.addedDocs} 个`);
    } catch (error) {
      console.error('❌ JSDoc生成失败:', error);
    }
  }

  /**
   * 获取目标文件
   */
  async getTargetFiles() {
    const files = [];
    const extensions = ['.tsx', '.ts'];

    // 扫描组件目录
    const componentDirs = [
      path.join(this.srcDir, 'components'),
      path.join(this.srcDir, 'pages'),
      path.join(this.srcDir, 'utils'),
      path.join(this.srcDir, 'hooks'),
    ];

    for (const dir of componentDirs) {
      try {
        const dirFiles = await this.scanDirectory(dir, extensions);
        files.push(...dirFiles);
      } catch (error) {
        console.log(`  ⚠️  目录不存在: ${dir}`);
      }
    }

    return files;
  }

  /**
   * 扫描目录
   */
  async scanDirectory(dir, extensions) {
    const files = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const subFiles = await this.scanDirectory(fullPath, extensions);
        files.push(...subFiles);
      } else if (
        entry.isFile() &&
        extensions.some(ext => entry.name.endsWith(ext))
      ) {
        files.push(fullPath);
      }
    }

    return files;
  }

  /**
   * 处理文件
   */
  async processFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n');
      let modified = false;
      let addedCount = 0;

      // 查找需要添加文档的组件和函数
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // 检查React组件
        if (this.isComponentDefinition(line)) {
          const componentName = this.extractComponentName(line);
          if (componentName && !this.hasJSDocAbove(lines, i)) {
            const jsdoc = this.generateComponentJSDoc(componentName, filePath);
            lines.splice(i, 0, ...jsdoc);
            i += jsdoc.length; // 跳过插入的行
            modified = true;
            addedCount++;
            console.log(`  ✅ ${componentName} - 添加组件文档`);
          }
        }

        // 检查函数定义
        else if (this.isFunctionDefinition(line)) {
          const functionName = this.extractFunctionName(line);
          if (
            functionName &&
            !this.hasJSDocAbove(lines, i) &&
            !this.isComponentFunction(functionName)
          ) {
            const jsdoc = this.generateFunctionJSDoc(functionName, line);
            lines.splice(i, 0, ...jsdoc);
            i += jsdoc.length; // 跳过插入的行
            modified = true;
            addedCount++;
            console.log(`  ✅ ${functionName} - 添加函数文档`);
          }
        }
      }

      // 如果有修改，写入文件
      if (modified) {
        // 备份原文件
        await fs.writeFile(`${filePath}.backup`, content);

        // 写入新内容
        await fs.writeFile(filePath, lines.join('\n'));

        this.processedFiles++;
        this.addedDocs += addedCount;

        const relativePath = path.relative(this.srcDir, filePath);
        console.log(`📝 ${relativePath} - 添加了 ${addedCount} 个文档`);
      }
    } catch (error) {
      console.warn(`⚠️  处理文件失败: ${filePath} - ${error}`);
    }
  }

  /**
   * 检查是否是组件定义
   */
  isComponentDefinition(line) {
    // React组件通常以大写字母开头
    const patterns = [
      /^export\s+(?:default\s+)?(?:const|function)\s+[A-Z][a-zA-Z0-9]*/,
      /^(?:const|function)\s+[A-Z][a-zA-Z0-9]*/,
      /^export\s+(?:default\s+)?[A-Z][a-zA-Z0-9]*/,
    ];

    return patterns.some(pattern => pattern.test(line));
  }

  /**
   * 检查是否是函数定义
   */
  isFunctionDefinition(line) {
    const patterns = [
      /^export\s+(?:async\s+)?function\s+[a-z][a-zA-Z0-9]*/,
      /^(?:async\s+)?function\s+[a-z][a-zA-Z0-9]*/,
      /^export\s+const\s+[a-z][a-zA-Z0-9]*\s*=\s*(?:async\s+)?\(/,
      /^const\s+[a-z][a-zA-Z0-9]*\s*=\s*(?:async\s+)?\(/,
    ];

    return patterns.some(pattern => pattern.test(line));
  }

  /**
   * 提取组件名称
   */
  extractComponentName(line) {
    const patterns = [
      /(?:const|function)\s+([A-Z][a-zA-Z0-9]*)/,
      /export\s+(?:default\s+)?(?:const|function)\s+([A-Z][a-zA-Z0-9]*)/,
      /export\s+(?:default\s+)?([A-Z][a-zA-Z0-9]*)/,
    ];

    for (const pattern of patterns) {
      const match = line.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return null;
  }

  /**
   * 提取函数名称
   */
  extractFunctionName(line) {
    const patterns = [
      /function\s+([a-z][a-zA-Z0-9]*)/,
      /const\s+([a-z][a-zA-Z0-9]*)\s*=/,
      /export\s+(?:async\s+)?function\s+([a-z][a-zA-Z0-9]*)/,
      /export\s+const\s+([a-z][a-zA-Z0-9]*)\s*=/,
    ];

    for (const pattern of patterns) {
      const match = line.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return null;
  }

  /**
   * 检查是否是组件函数（以大写字母开头）
   */
  isComponentFunction(functionName) {
    return functionName && functionName[0] === functionName[0].toUpperCase();
  }

  /**
   * 检查上方是否已有JSDoc
   */
  hasJSDocAbove(lines, currentIndex) {
    // 检查前几行是否有JSDoc注释
    for (let i = currentIndex - 1; i >= Math.max(0, currentIndex - 5); i--) {
      const line = lines[i].trim();

      if (line === '*/') {
        // 向上查找 /**
        for (let j = i - 1; j >= 0; j--) {
          if (lines[j].trim().startsWith('/**')) {
            return true;
          }
          if (lines[j].trim() && !lines[j].trim().startsWith('*')) {
            break;
          }
        }
      }

      // 如果遇到非空行且不是注释，停止查找
      if (
        line &&
        !line.startsWith('//') &&
        !line.startsWith('*') &&
        line !== '*/'
      ) {
        break;
      }
    }

    return false;
  }

  /**
   * 生成组件JSDoc
   */
  generateComponentJSDoc(componentName, filePath) {
    const description = this.generateComponentDescription(componentName);

    return [
      '/**',
      ` * ${componentName}组件`,
      ` * ${description}`,
      ' * @param props - 组件属性',
      ' * @returns JSX元素',
      ' */',
    ];
  }

  /**
   * 生成函数JSDoc
   */
  generateFunctionJSDoc(functionName, line) {
    const description = this.generateFunctionDescription(functionName);
    const isAsync = line.includes('async');

    const jsdoc = ['/**', ` * ${functionName}函数`, ` * ${description}`];

    // 添加参数说明（简化版）
    if (line.includes('(') && line.includes(')')) {
      const paramsMatch = line.match(/\(([^)]*)\)/);
      if (paramsMatch && paramsMatch[1].trim()) {
        const params = paramsMatch[1]
          .split(',')
          .map(p => p.trim().split(/[:\s]/)[0]);
        jsdoc.push(' *');
        params.forEach(param => {
          if (param && param !== '...') {
            jsdoc.push(` * @param ${param} - ${param}参数`);
          }
        });
      }
    }

    // 添加返回值说明
    jsdoc.push(` * @returns ${isAsync ? 'Promise<void>' : 'void'}`);
    jsdoc.push(' */');

    return jsdoc;
  }

  /**
   * 生成组件描述
   */
  generateComponentDescription(componentName) {
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

    return `${componentName}组件的功能描述`;
  }

  /**
   * 生成函数描述
   */
  generateFunctionDescription(functionName) {
    const descriptions = {
      get: '获取数据',
      set: '设置数据',
      create: '创建新项',
      update: '更新数据',
      delete: '删除数据',
      fetch: '获取远程数据',
      save: '保存数据',
      load: '加载数据',
      init: '初始化',
      handle: '处理事件',
      validate: '验证数据',
      format: '格式化数据',
      parse: '解析数据',
      transform: '转换数据',
      use: '自定义Hook',
      with: '高阶组件',
    };

    for (const [key, desc] of Object.entries(descriptions)) {
      if (functionName.toLowerCase().includes(key)) {
        return desc;
      }
    }

    return `${functionName}函数的功能描述`;
  }
}

// 运行JSDoc生成
async function main() {
  const generator = new SimpleJSDocGenerator();
  await generator.generate();
}

main().catch(console.error);
