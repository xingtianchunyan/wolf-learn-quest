/**
 * JSDoc自动生成工具
 * 为缺少文档的组件和函数自动添加JSDoc注释
 * @author 自动化工具
 * @version 1.0.0
 */
import  { promises as fs  } from 'fs';
import path from 'path';

/**
 * JSDoc生成器配置接口
 */
interface JSDocGeneratorConfig  {
  /** 源代码目录 */
  srcDir: string;
  /** 是否备份原文件 */
  backup: boolean;
  /** 是否处理私有成员 */
  includePrivate: boolean;
  /** 文件扩展名过滤 */
  extensions: string[]
}

/**
 * 组件信息接口
 */
interface ComponentInfo  {
  /** 组件名称 */
  name: string;
  /** 文件路径 */
  filePath: string;
  /** 是否已有文档 */
  hasDocumentation: boolean;
  /** 组件属性 */
  props: PropInfo[];
  /** 组件类型 */
  type: 'function' | 'class' | 'arrow';
  /** 开始行号 */
  startLine: number;
  /** 结束行号 */
  endLine: number
}

/**
 * 属性信息接口
 */
interface PropInfo  {
  /** 属性名称 */
  name: string;
  /** 属性类型 */
  type: string;
  /** 是否必需 */
  required: boolean;
  /** 默认值 */
  defaultValue?: string;
  /** 属性描述 */
  description?: string
}

/**
 * 函数信息接口
 */
interface FunctionInfo  {
  /** 函数名称 */
  name: string;
  /** 文件路径 */
  filePath: string;
  /** 是否已有文档 */
  hasDocumentation: boolean;
  /** 参数列表 */
  parameters: ParameterInfo[];
  /** 返回类型 */
  returnType: string;
  /** 函数类型 */
  type: 'function' | 'arrow' | 'method';
  /** 开始行号 */
  startLine: number;
  /** 结束行号 */
  endLine: number
}

/**
 * 参数信息接口
 */
interface ParameterInfo  {
  /** 参数名称 */
  name: string;
  /** 参数类型 */
  type: string;
  /** 是否可选 */
  optional: boolean;
  /** 默认值 */
  defaultValue?: string;
  /** 参数描述 */
  description?: string
}

/**
 * 处理结果接口
 */
interface ProcessResult  {
  /** 处理的文件数 */
  filesProcessed: number;
  /** 添加的组件文档数 */
  componentsDocumented: number;
  /** 添加的函数文档数 */
  functionsDocumented: number;
  /** 错误列表 */
  errors: string[];
  /** 处理详情 */
  details: ProcessDetail[]
}

/**
 * 处理详情接口
 */
interface ProcessDetail  {
  /** 文件路径 */
  filePath: string;
  /** 处理类型 */
  type: 'component' | 'function';
  /** 项目名称 */
  name: string;
  /** 操作类型 */
  action: 'added' | 'skipped' | 'error';
  /** 消息 */
  message: string
}

/**
 * JSDoc自动生成器类
 * 负责扫描代码文件并自动添加JSDoc注释
 */
export class JSDocGenerator  {
  private config: JSDocGeneratorConfig;
  private components: ComponentInfo[] = [];
  private functions: FunctionInfo[] = [];

  /**
   * 构造函数
   * @param config - 生成器配置
   */
constructor(config: Partial<JSDocGeneratorConfig> = {
})  {
    this.config = {
      srcDir: config.srcDir || 'src',
      backup: config.backup ?? true,
      includePrivate: config.includePrivate ?? false,
      extensions: config.extensions || ['.tsx', '.ts', '.jsx', '.js'],
      ...config
    }
}

  /**
   * 运行JSDoc生成
   * @returns 处理结果
   */
async generateJSDoc(): Promise<ProcessResult>  { console.log('🚀 开始JSDoc自动生成...\n');

    const result: ProcessResult = {
      filesProcessed: 0,
      componentsDocumented: 0,
      functionsDocumented: 0,
      errors: [],
      details: []
};

    try {
      // 1. 扫描源文件
      await this.scanSourceFiles();

      // 2. 处理组件
      await this.processComponents(result);

      // 3. 处理函数
      await this.processFunctions(result);

      console.log('✅ JSDoc生成完成！');
      this.printSummary(result)
} catch (error) {
      console.error('❌ JSDoc生成失败:', error);
      result.errors.push(`生成失败: ${error
}`)
}

    return result
}

  /**
 * 扫描源文件
 */
private async scanSourceFiles(): Promise<void>  {
    console.log('🔍 扫描源文件...');

    const files = await this.getAllFiles(this.config.srcDir);
    const targetFiles = files.filter(file => 
      this.config.extensions.some(ext => file.endsWith(ext))
    );

    console.log(`  发现 ${targetFiles.length} 个目标文件`);

    for (const file of targetFiles) {
      try {
        await this.analyzeFile(file)
} catch (error) {
        console.warn(`⚠️  分析文件失败: ${file
} - ${error}`)
}
    }

    console.log(`  发现 ${this.components.length} 个组件`);
    console.log(`  发现 ${this.functions.length} 个函数`)
}

  /**
   * 分析文件
   * @param filePath - 文件路径
   */
private async analyzeFile(filePath: string): Promise<void>  {
    const content = await fs.readFile(filePath, 'utf-8');
    
    // 分析组件
    const components = this.extractComponents(content, filePath);
    this.components.push(...components);

    // 分析函数
    const functions = this.extractFunctions(content, filePath);
    this.functions.push(...functions)
}

  /**
   * 提取组件信息
   * @param content - 文件内容
   * @param filePath - 文件路径
   * @returns 组件信息数组
   */
private extractComponents(content: string, filePath: string): ComponentInfo[]  {
    const components: ComponentInfo[] = [];
    const lines = content.split('\n');

    // 查找React组件
    const componentRegex = /^(?:export\s+)?(?:default\s+)?(?:const|function)\s+([A-Z][a-zA-Z0-9]*)/gm;
    let match;

    while ((match = componentRegex.exec(content)) !== null) {
      const componentName = match[1];
      const startIndex = match.index;
      const startLine = content.substring(0, startIndex).split('\n').length;

      // 检查是否已有JSDoc
      const hasDocumentation = this.hasJSDocComment(content, startIndex);

      // 提取属性
      const props = this.extractComponentProps(content, componentName);

      // 确定组件类型
      const type = this.getComponentType(content, componentName);

      components.push({
        name: componentName,
        filePath,
        hasDocumentation,
        props,
        type,
        startLine,
        endLine: startLine + 10 // 估算值
})
}

    return components
}

  /**
   * 提取函数信息
   * @param content - 文件内容
   * @param filePath - 文件路径
   * @returns 函数信息数组
   */
private extractFunctions(content: string, filePath: string): FunctionInfo[]  {
    const functions: FunctionInfo[] = [];

    // 查找函数定义
    const functionRegex = /^(?:export\s+)?(?:async\s+)?function\s+([a-zA-Z][a-zA-Z0-9]*)\s*\(/gm;
    let match;

    while ((match = functionRegex.exec(content)) !== null) {
      const functionName = match[1];
      const startIndex = match.index;
      const startLine = content.substring(0, startIndex).split('\n').length;

      // 跳过React组件
      if (functionName[0] === functionName[0].toUpperCase()) {
        continue
}

      // 检查是否已有JSDoc
      const hasDocumentation = this.hasJSDocComment(content, startIndex);

      // 提取参数
      const parameters = this.extractFunctionParameters(content, functionName, startIndex);

      // 提取返回类型
      const returnType = this.extractReturnType(content, startIndex);

      functions.push({
        name: functionName,
        filePath,
        hasDocumentation,
        parameters,
        returnType,
        type: 'function',
        startLine,
        endLine: startLine + 5 // 估算值
})
}

    return functions
}

  /**
   * 处理组件
   * @param result - 处理结果
   */
private async processComponents(result: ProcessResult): Promise<void>  {
    console.log('\n📝 处理组件文档...');

    const undocumentedComponents = this.components.filter(c => !c.hasDocumentation);
    console.log(`  需要添加文档的组件: ${undocumentedComponents.length
} 个`);

    for (const component of undocumentedComponents) {
      try {
        await this.addComponentDocumentation(component);
        result.componentsDocumented++;
        result.details.push({
          filePath: component.filePath,
          type: 'component',
          name: component.name,
          action: 'added',
          message: '添加JSDoc注释成功'
});
        console.log(`  ✅ ${component.name} - 添加文档成功`)
} catch (error) {
        result.errors.push(`组件 ${component.name}: ${error
}`);
        result.details.push({
          filePath: component.filePath,
          type: 'component',
          name: component.name,
          action: 'error',
          message: `添加文档失败: ${error
}`
        });
        console.log(`  ❌ ${component.name} - 添加文档失败: ${error
}`)
}
    }
  }

  /**
   * 处理函数
   * @param result - 处理结果
   */
private async processFunctions(result: ProcessResult): Promise<void>  {
    console.log('\n🔧 处理函数文档...');

    const undocumentedFunctions = this.functions.filter(f => !f.hasDocumentation);
    console.log(`  需要添加文档的函数: ${undocumentedFunctions.length
} 个`);

    for (const func of undocumentedFunctions) {
      try {
        await this.addFunctionDocumentation(func);
        result.functionsDocumented++;
        result.details.push({
          filePath: func.filePath,
          type: 'function',
          name: func.name,
          action: 'added',
          message: '添加JSDoc注释成功'
});
        console.log(`  ✅ ${func.name} - 添加文档成功`)
} catch (error) {
        result.errors.push(`函数 ${func.name}: ${error
}`);
        result.details.push({
          filePath: func.filePath,
          type: 'function',
          name: func.name,
          action: 'error',
          message: `添加文档失败: ${error
}`
        });
        console.log(`  ❌ ${func.name} - 添加文档失败: ${error
}`)
}
    }
  }

  /**
   * 添加组件文档
   * @param component - 组件信息
   */
private async addComponentDocumentation(component: ComponentInfo): Promise<void>  {
    const content = await fs.readFile(component.filePath, 'utf-8');
    const lines = content.split('\n');

    // 生成JSDoc注释
    const jsdoc = this.generateComponentJSDoc(component);

    // 找到组件定义行
    const componentLineIndex = component.startLine - 1;
    
    // 插入JSDoc注释
    lines.splice(componentLineIndex, 0, ...jsdoc.split('\n'));

    // 备份原文件
    if (this.config.backup) {
      await fs.writeFile(`${component.filePath}.backup`, content)
}

    // 写入新内容
    await fs.writeFile(component.filePath, lines.join('\n'))
}

  /**
   * 添加函数文档
   * @param func - 函数信息
   */
private async addFunctionDocumentation(func: FunctionInfo): Promise<void>  {
    const content = await fs.readFile(func.filePath, 'utf-8');
    const lines = content.split('\n');

    // 生成JSDoc注释
    const jsdoc = this.generateFunctionJSDoc(func);

    // 找到函数定义行
    const functionLineIndex = func.startLine - 1;
    
    // 插入JSDoc注释
    lines.splice(functionLineIndex, 0, ...jsdoc.split('\n'));

    // 备份原文件
    if (this.config.backup) {
      await fs.writeFile(`${func.filePath}.backup`, content)
}

    // 写入新内容
    await fs.writeFile(func.filePath, lines.join('\n'))
}

  /**
   * 生成组件JSDoc注释
   * @param component - 组件信息
   * @returns JSDoc字符串
   */
private generateComponentJSDoc(component: ComponentInfo): string  {
    let jsdoc = '/**\n';
    jsdoc += ` * ${component.name}组件\n`;
    jsdoc += ` * ${this.generateComponentDescription(component.name)}\n`;
    
    if (component.props.length > 0) {
      jsdoc += ' * \n';
      for (const prop of component.props) {
        jsdoc += ` * @param props.${prop.name} - ${prop.description || `${prop.name  }属性`}\n`
}
    }
    
    jsdoc += ' * @returns JSX元素\n';
    jsdoc += ' */';
    
    return jsdoc
}

  /**
   * 生成函数JSDoc注释
   * @param func - 函数信息
   * @returns JSDoc字符串
   */
private generateFunctionJSDoc(func: FunctionInfo): string  {
    let jsdoc = '/**\n';
    jsdoc += ` * ${func.name}函数\n`;
    jsdoc += ` * ${this.generateFunctionDescription(func.name)}\n`;
    
    if (func.parameters.length > 0) {
      jsdoc += ' * \n';
      for (const param of func.parameters) {
        jsdoc += ` * @param ${param.name} - ${param.description || `${param.name  }参数`}\n`
}
    }
    
    jsdoc += ` * @returns ${func.returnType || 'void'}\n`;
    jsdoc += ' */';
    
    return jsdoc
}

  /**
   * 检查是否有JSDoc注释
   * @param content - 文件内容
   * @param startIndex - 开始位置
   * @returns 是否有JSDoc注释
   */
private hasJSDocComment(content: string, startIndex: number): boolean  {
    const beforeContent = content.substring(0, startIndex);
    const lines = beforeContent.split('\n');
    
    // 检查前几行是否有JSDoc注释
    for (let i = lines.length - 1; i >= Math.max(0, lines.length - 5); i--) {
      const line = lines[i].trim();
      if (line === '*/
')  {
        // 向上查找 /**
        for (let j = i - 1; j >= 0; j--) {
          if (lines[j].trim().startsWith('/**')) {
            return true
}
          if (lines[j].trim() && !lines[j].trim().startsWith('*')) {
            break
}
        }
      }
    }
    
    return false
}

  /**
   * 提取组件属性
   * @param content - 文件内容
   * @param componentName - 组件名称
   * @returns 属性数组
   */
private extractComponentProps(content: string, componentName: string): PropInfo[]  {
    const props: PropInfo[] = [];
    
    // 查找Props接口定义
    const propsInterfaceRegex = new RegExp(`interface\\s+${componentName}Props\\s*{([^}]+)}`, 's');
    const match = content.match(propsInterfaceRegex);
    
    if (match) {
      const propsContent = match[1];
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
              description: `${propMatch[1]
}属性`
            })
}
        }
      }
    }
    
    return props
}

  /**
   * 提取函数参数
   * @param content - 文件内容
   * @param functionName - 函数名称
   * @param startIndex - 开始位置
   * @returns 参数数组
   */
private extractFunctionParameters(content: string, functionName: string, startIndex: number): ParameterInfo[]  {
    const parameters: ParameterInfo[] = [];
    
    // 查找函数参数
    const functionRegex = new RegExp(`function\\s+${functionName}\\s*\\(([^)]*)\\)`, 's');
    const match = content.substring(startIndex).match(functionRegex);
    
    if (match && match[1]) {
      const paramsString = match[1].trim();
      if (paramsString) {
        const params = paramsString.split(',');
        
        for (const param of params) {
          const trimmed = param.trim();
          const paramMatch = trimmed.match(/(\w+)(\?)?:\s*([^=]+)(?:=(.+))?/);
          
          if (paramMatch) {
            parameters.push({
              name: paramMatch[1],
              type: paramMatch[3].trim(),
              optional: !!paramMatch[2],
              defaultValue: paramMatch[4]?.trim(),
              description: `${paramMatch[1]
}参数`
            })
}
        }
      }
    }
    
    return parameters
}

  /**
   * 提取返回类型
   * @param content - 文件内容
   * @param startIndex - 开始位置
   * @returns 返回类型
   */
private extractReturnType(content: string, startIndex: number): string  {
    const functionContent = content.substring(startIndex);
    const returnTypeMatch = functionContent.match(/\):\s*([^{]+)/);
    
    if (returnTypeMatch) {
      return returnTypeMatch[1].trim()
}
    
    return 'void'
}

  /**
   * 获取组件类型
   * @param content - 文件内容
   * @param componentName - 组件名称
   * @returns 组件类型
   */
private getComponentType(content: string, componentName: string): 'function' | 'class' | 'arrow'  {
    if (content.includes(`function ${componentName}`)) {
      return 'function'
} else if (content.includes(`const ${componentName} =`)) {
      return 'arrow'
} else if (content.includes(`class ${componentName}`)) {
      return 'class'
}
    
    return 'function'
}

  /**
   * 生成组件描述
   * @param componentName - 组件名称
   * @returns 组件描述
   */
private generateComponentDescription(componentName: string): string { const descriptions: Record<string, string> =  {
      'Button': '通用按钮组件，支持多种样式和状态',
      'Input': '输入框组件，支持验证和格式化',
      'Modal': '模态框组件，用于显示弹出内容',
      'Dialog': '对话框组件，用于用户交互确认',
      'Form': '表单组件，提供数据收集和验证',
      'Table': '表格组件，用于数据展示和操作',
      'Card': '卡片组件，用于内容分组展示',
      'Layout': '布局组件，定义页面结构',
      'Header': '页头组件，显示导航和标题',
      'Footer': '页脚组件，显示版权和链接',
      'Loading': '加载组件，显示加载状态',
      'Error': '错误组件，显示错误信息'
};

    for (const [key, desc] of Object.entries(descriptions)) {
      if (componentName.includes(key)) {
        return desc
}
    }

    return `${componentName}组件的功能描述`
}

  /**
   * 生成函数描述
   * @param functionName - 函数名称
   * @returns 函数描述
   */
private generateFunctionDescription(functionName: string): string { const descriptions: Record<string, string> =  {
      'get': '获取数据',
      'set': '设置数据',
      'create': '创建新项',
      'update': '更新数据',
      'delete': '删除数据',
      'fetch': '获取远程数据',
      'save': '保存数据',
      'load': '加载数据',
      'init': '初始化',
      'handle': '处理事件',
      'validate': '验证数据',
      'format': '格式化数据',
      'parse': '解析数据',
      'transform': '转换数据'
};

    for (const [key, desc] of Object.entries(descriptions)) {
      if (functionName.toLowerCase().includes(key)) {
        return desc
}
    }

    return `${functionName}函数的功能描述`
}

  /**
   * 获取所有文件
   * @param dir - 目录路径
   * @returns 文件路径数组
   */
private async getAllFiles(dir: string): Promise<string[]>  {
    const files: string[] = [];
    
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true 
});
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          const subFiles = await this.getAllFiles(fullPath);
          files.push(...subFiles)
} else {
          files.push(fullPath)
}
      }
    } catch (error) {
      // 目录不存在或无权限访问
    }
    
    return files
}

  /**
   * 打印处理摘要
   * @param result - 处理结果
   */
private printSummary(result: ProcessResult): void  {
    console.log('\n📊 处理摘要:');
    console.log(`  - 处理文件数: ${result.filesProcessed
}`);
    console.log(`  - 添加组件文档: ${result.componentsDocumented
} 个`);
    console.log(`  - 添加函数文档: ${result.functionsDocumented
} 个`);
    console.log(`  - 错误数量: ${result.errors.length
} 个`);
    
    if (result.errors.length > 0) {
      console.log('\n❌ 错误详情:');
      result.errors.forEach(error => console.log(`  - ${error}`))
}
  }
}