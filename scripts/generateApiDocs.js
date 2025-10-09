/**
 * API文档自动生成脚本
 * @author SOLO Coding
 * @description 自动生成API接口文档，包括WebSocket事件和错误码说明
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * API文档生成器类
 */
class ApiDocGenerator {
  constructor() {
    this.srcPath = path.join(process.cwd(), 'src');
    this.apiPath = path.join(process.cwd(), 'api');
    this.docsPath = path.join(process.cwd(), 'docs');
    this.apiEndpoints = [];
    this.wsEvents = [];
    this.errorCodes = [];
    this.interfaces = [];
  }

  /**
   * 主执行函数
   */
  async run() {
    console.log('📚 开始生成API文档...\n');
    
    // 确保docs目录存在
    if (!fs.existsSync(this.docsPath)) {
      fs.mkdirSync(this.docsPath, { recursive: true });
    }

    // 扫描API文件
    await this.scanApiFiles();
    
    // 扫描WebSocket事件
    await this.scanWebSocketEvents();
    
    // 扫描错误码
    await this.scanErrorCodes();
    
    // 扫描接口定义
    await this.scanInterfaces();
    
    // 生成文档
    await this.generateDocumentation();
    
    console.log('✨ API文档生成完成！');
  }

  /**
   * 扫描API文件
   */
  async scanApiFiles() {
    console.log('🔍 扫描API端点...');
    
    if (!fs.existsSync(this.apiPath)) {
      console.log('⚠️  API目录不存在，跳过API端点扫描');
      return;
    }

    const files = this.getFilesRecursively(this.apiPath, ['.js', '.ts']);
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      this.extractApiEndpoints(content, file);
    }
    
    console.log(`✅ 发现 ${this.apiEndpoints.length} 个API端点`);
  }

  /**
   * 扫描WebSocket事件
   */
  async scanWebSocketEvents() {
    console.log('🔍 扫描WebSocket事件...');
    
    const files = this.getFilesRecursively(this.srcPath, ['.js', '.ts', '.tsx']);
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      this.extractWebSocketEvents(content, file);
    }
    
    console.log(`✅ 发现 ${this.wsEvents.length} 个WebSocket事件`);
  }

  /**
   * 扫描错误码
   */
  async scanErrorCodes() {
    console.log('🔍 扫描错误码定义...');
    
    const files = this.getFilesRecursively(this.srcPath, ['.js', '.ts', '.tsx']);
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      this.extractErrorCodes(content, file);
    }
    
    console.log(`✅ 发现 ${this.errorCodes.length} 个错误码`);
  }

  /**
   * 扫描接口定义
   */
  async scanInterfaces() {
    console.log('🔍 扫描接口定义...');
    
    const files = this.getFilesRecursively(this.srcPath, ['.ts', '.tsx']);
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      this.extractInterfaces(content, file);
    }
    
    console.log(`✅ 发现 ${this.interfaces.length} 个接口定义`);
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
   * 提取API端点
   * @param {string} content - 文件内容
   * @param {string} filePath - 文件路径
   */
  extractApiEndpoints(content, filePath) {
    // 匹配Express路由定义
    const routePatterns = [
      /app\.(get|post|put|delete|patch)\s*\(\s*['"`]([^'"`]+)['"`]/g,
      /router\.(get|post|put|delete|patch)\s*\(\s*['"`]([^'"`]+)['"`]/g,
      /\.route\s*\(\s*['"`]([^'"`]+)['"`]\s*\)\s*\.(get|post|put|delete|patch)/g
    ];

    for (const pattern of routePatterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const method = match[1] || match[3];
        const path = match[2] || match[1];
        
        if (method && path) {
          this.apiEndpoints.push({
            method: method.toUpperCase(),
            path: path,
            file: path.relative(process.cwd(), filePath),
            description: this.extractRouteDescription(content, match.index)
          });
        }
      }
    }
  }

  /**
   * 提取路由描述
   * @param {string} content - 文件内容
   * @param {number} index - 匹配位置
   * @returns {string} 路由描述
   */
  extractRouteDescription(content, index) {
    const lines = content.substring(0, index).split('\n');
    const currentLine = lines.length - 1;
    
    // 查找前面的注释
    for (let i = currentLine - 1; i >= Math.max(0, currentLine - 5); i--) {
      const line = lines[i].trim();
      if (line.startsWith('//') || line.startsWith('*')) {
        return line.replace(/^(\/\/|\*)\s*/, '');
      }
    }
    
    return '待补充描述';
  }

  /**
   * 提取WebSocket事件
   * @param {string} content - 文件内容
   * @param {string} filePath - 文件路径
   */
  extractWebSocketEvents(content, filePath) {
    // 匹配WebSocket事件
    const eventPatterns = [
      /socket\.emit\s*\(\s*['"`]([^'"`]+)['"`]/g,
      /socket\.on\s*\(\s*['"`]([^'"`]+)['"`]/g,
      /io\.emit\s*\(\s*['"`]([^'"`]+)['"`]/g,
      /\.emit\s*\(\s*['"`]([^'"`]+)['"`]/g,
      /\.on\s*\(\s*['"`]([^'"`]+)['"`]/g
    ];

    for (const pattern of eventPatterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const eventName = match[1];
        
        if (eventName && !this.wsEvents.find(e => e.name === eventName)) {
          this.wsEvents.push({
            name: eventName,
            file: path.relative(process.cwd(), filePath),
            description: this.extractEventDescription(content, match.index),
            type: this.getEventType(content, match[0])
          });
        }
      }
    }
  }

  /**
   * 获取事件类型
   * @param {string} content - 文件内容
   * @param {string} matchText - 匹配文本
   * @returns {string} 事件类型
   */
  getEventType(content, matchText) {
    if (matchText.includes('.emit')) {
      return 'emit';
    } else if (matchText.includes('.on')) {
      return 'listen';
    }
    return 'unknown';
  }

  /**
   * 提取事件描述
   * @param {string} content - 文件内容
   * @param {number} index - 匹配位置
   * @returns {string} 事件描述
   */
  extractEventDescription(content, index) {
    const lines = content.substring(0, index).split('\n');
    const currentLine = lines.length - 1;
    
    // 查找前面的注释
    for (let i = currentLine - 1; i >= Math.max(0, currentLine - 3); i--) {
      const line = lines[i].trim();
      if (line.startsWith('//') || line.startsWith('*')) {
        return line.replace(/^(\/\/|\*)\s*/, '');
      }
    }
    
    return '待补充描述';
  }

  /**
   * 提取错误码
   * @param {string} content - 文件内容
   * @param {string} filePath - 文件路径
   */
  extractErrorCodes(content, filePath) {
    // 匹配错误码定义
    const errorPatterns = [
      /ERROR_(\w+)\s*[:=]\s*['"`]?([^'"`\s,}]+)['"`]?/g,
      /(\w+_ERROR)\s*[:=]\s*['"`]?([^'"`\s,}]+)['"`]?/g,
      /status\s*:\s*(\d{3})/g,
      /statusCode\s*:\s*(\d{3})/g
    ];

    for (const pattern of errorPatterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const code = match[1] || match[2];
        const value = match[2] || match[1];
        
        if (code && !this.errorCodes.find(e => e.code === code)) {
          this.errorCodes.push({
            code: code,
            value: value,
            file: path.relative(process.cwd(), filePath),
            description: this.extractErrorDescription(content, match.index)
          });
        }
      }
    }
  }

  /**
   * 提取错误描述
   * @param {string} content - 文件内容
   * @param {number} index - 匹配位置
   * @returns {string} 错误描述
   */
  extractErrorDescription(content, index) {
    const lines = content.substring(0, index).split('\n');
    const currentLine = lines.length - 1;
    
    // 查找前面的注释
    for (let i = currentLine - 1; i >= Math.max(0, currentLine - 3); i--) {
      const line = lines[i].trim();
      if (line.startsWith('//') || line.startsWith('*')) {
        return line.replace(/^(\/\/|\*)\s*/, '');
      }
    }
    
    return '待补充描述';
  }

  /**
   * 提取接口定义
   * @param {string} content - 文件内容
   * @param {string} filePath - 文件路径
   */
  extractInterfaces(content, filePath) {
    // 匹配接口定义
    const interfacePattern = /interface\s+(\w+)\s*\{([^}]+)\}/g;
    
    let match;
    while ((match = interfacePattern.exec(content)) !== null) {
      const name = match[1];
      const body = match[2];
      
      if (name && !this.interfaces.find(i => i.name === name)) {
        this.interfaces.push({
          name: name,
          body: body.trim(),
          file: path.relative(process.cwd(), filePath),
          properties: this.extractInterfaceProperties(body)
        });
      }
    }
  }

  /**
   * 提取接口属性
   * @param {string} body - 接口体
   * @returns {Array} 属性数组
   */
  extractInterfaceProperties(body) {
    const properties = [];
    const lines = body.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('*')) {
        const propMatch = trimmed.match(/(\w+)(\??):\s*([^;]+)/);
        if (propMatch) {
          properties.push({
            name: propMatch[1],
            optional: propMatch[2] === '?',
            type: propMatch[3].trim()
          });
        }
      }
    }
    
    return properties;
  }

  /**
   * 生成文档
   */
  async generateDocumentation() {
    console.log('📝 生成文档文件...');
    
    // 生成API端点文档
    await this.generateApiEndpointsDoc();
    
    // 生成WebSocket事件文档
    await this.generateWebSocketDoc();
    
    // 生成错误码文档
    await this.generateErrorCodesDoc();
    
    // 生成接口文档
    await this.generateInterfacesDoc();
    
    // 生成总览文档
    await this.generateOverviewDoc();
  }

  /**
   * 生成API端点文档
   */
  async generateApiEndpointsDoc() {
    const content = `# API端点文档

## 概述
本文档描述了系统中所有的API端点，包括请求方法、路径和描述。

## API端点列表

${this.apiEndpoints.map(endpoint => `
### ${endpoint.method} ${endpoint.path}

**描述**: ${endpoint.description}

**文件位置**: \`${endpoint.file}\`

**请求示例**:
\`\`\`bash
curl -X ${endpoint.method} "http://localhost:3000${endpoint.path}"
\`\`\`

---
`).join('')}

## 注意事项

1. 所有API请求都应该包含适当的认证头
2. 请求和响应格式为JSON
3. 错误响应遵循统一的错误码规范

## 更新日志

- ${new Date().toISOString().split('T')[0]}: 自动生成API文档
`;

    fs.writeFileSync(path.join(this.docsPath, 'api-endpoints.md'), content, 'utf8');
    console.log('✅ API端点文档已生成');
  }

  /**
   * 生成WebSocket事件文档
   */
  async generateWebSocketDoc() {
    const emitEvents = this.wsEvents.filter(e => e.type === 'emit');
    const listenEvents = this.wsEvents.filter(e => e.type === 'listen');

    const content = `# WebSocket事件文档

## 概述
本文档描述了系统中所有的WebSocket事件，包括发送和监听的事件。

## 发送事件 (Emit Events)

${emitEvents.map(event => `
### ${event.name}

**描述**: ${event.description}

**文件位置**: \`${event.file}\`

**使用示例**:
\`\`\`javascript
socket.emit('${event.name}', data);
\`\`\`

---
`).join('')}

## 监听事件 (Listen Events)

${listenEvents.map(event => `
### ${event.name}

**描述**: ${event.description}

**文件位置**: \`${event.file}\`

**使用示例**:
\`\`\`javascript
socket.on('${event.name}', (data) => {
  // 处理事件数据
});
\`\`\`

---
`).join('')}

## 事件数据格式

所有WebSocket事件都应该遵循以下数据格式：

\`\`\`typescript
interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: number;
  userId?: string;
  roomId?: string;
}
\`\`\`

## 更新日志

- ${new Date().toISOString().split('T')[0]}: 自动生成WebSocket事件文档
`;

    fs.writeFileSync(path.join(this.docsPath, 'websocket-events.md'), content, 'utf8');
    console.log('✅ WebSocket事件文档已生成');
  }

  /**
   * 生成错误码文档
   */
  async generateErrorCodesDoc() {
    const content = `# 错误码文档

## 概述
本文档描述了系统中所有的错误码定义和说明。

## 错误码列表

${this.errorCodes.map(error => `
### ${error.code}

**值**: \`${error.value}\`

**描述**: ${error.description}

**文件位置**: \`${error.file}\`

---
`).join('')}

## HTTP状态码

| 状态码 | 说明 | 使用场景 |
|--------|------|----------|
| 200 | 成功 | 请求成功处理 |
| 400 | 请求错误 | 参数错误或格式不正确 |
| 401 | 未授权 | 需要登录或token无效 |
| 403 | 禁止访问 | 权限不足 |
| 404 | 未找到 | 资源不存在 |
| 500 | 服务器错误 | 内部服务器错误 |

## 错误响应格式

\`\`\`typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: number;
}
\`\`\`

## 更新日志

- ${new Date().toISOString().split('T')[0]}: 自动生成错误码文档
`;

    fs.writeFileSync(path.join(this.docsPath, 'error-codes.md'), content, 'utf8');
    console.log('✅ 错误码文档已生成');
  }

  /**
   * 生成接口文档
   */
  async generateInterfacesDoc() {
    const content = `# 接口定义文档

## 概述
本文档描述了系统中所有的TypeScript接口定义。

## 接口列表

${this.interfaces.map(iface => `
### ${iface.name}

**文件位置**: \`${iface.file}\`

**属性**:
${iface.properties.map(prop => `
- **${prop.name}**${prop.optional ? ' (可选)' : ''}: \`${prop.type}\`
`).join('')}

**完整定义**:
\`\`\`typescript
interface ${iface.name} {
${iface.body}
}
\`\`\`

---
`).join('')}

## 通用接口

### 基础响应接口

\`\`\`typescript
interface BaseResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: number;
}
\`\`\`

### 分页接口

\`\`\`typescript
interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface PaginatedResponse<T> extends BaseResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
\`\`\`

## 更新日志

- ${new Date().toISOString().split('T')[0]}: 自动生成接口定义文档
`;

    fs.writeFileSync(path.join(this.docsPath, 'interfaces.md'), content, 'utf8');
    console.log('✅ 接口定义文档已生成');
  }

  /**
   * 生成总览文档
   */
  async generateOverviewDoc() {
    const content = `# API文档总览

## 文档结构

本API文档包含以下几个部分：

### 📋 [API端点文档](./api-endpoints.md)
- **内容**: 所有REST API端点的详细说明
- **数量**: ${this.apiEndpoints.length} 个端点
- **包含**: 请求方法、路径、参数说明和示例

### 🔌 [WebSocket事件文档](./websocket-events.md)
- **内容**: 所有WebSocket事件的详细说明
- **数量**: ${this.wsEvents.length} 个事件
- **包含**: 发送事件、监听事件和数据格式

### ❌ [错误码文档](./error-codes.md)
- **内容**: 所有错误码的定义和说明
- **数量**: ${this.errorCodes.length} 个错误码
- **包含**: HTTP状态码和自定义错误码

### 🔧 [接口定义文档](./interfaces.md)
- **内容**: 所有TypeScript接口的定义
- **数量**: ${this.interfaces.length} 个接口
- **包含**: 数据结构和类型定义

## 快速开始

### 1. 认证
所有API请求都需要包含认证信息：

\`\`\`bash
curl -H "Authorization: Bearer YOUR_TOKEN" \\
     -H "Content-Type: application/json" \\
     "http://localhost:3000/api/endpoint"
\`\`\`

### 2. WebSocket连接
建立WebSocket连接：

\`\`\`javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'YOUR_TOKEN'
  }
});
\`\`\`

### 3. 错误处理
所有错误响应都遵循统一格式：

\`\`\`json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述"
  },
  "timestamp": 1640995200000
}
\`\`\`

## 开发指南

### API设计原则
1. **RESTful设计**: 遵循REST API设计规范
2. **统一响应格式**: 所有API响应都使用统一的数据格式
3. **错误处理**: 提供详细的错误信息和错误码
4. **版本控制**: 通过URL路径进行API版本控制

### WebSocket事件规范
1. **事件命名**: 使用小写字母和下划线
2. **数据格式**: 统一使用JSON格式
3. **错误处理**: 通过特定的错误事件传递错误信息

## 更新说明

本文档由自动化脚本生成，会定期更新以反映最新的API变更。

**最后更新**: ${new Date().toISOString().split('T')[0]}

**生成统计**:
- API端点: ${this.apiEndpoints.length}
- WebSocket事件: ${this.wsEvents.length}
- 错误码: ${this.errorCodes.length}
- 接口定义: ${this.interfaces.length}

## 联系方式

如有问题或建议，请联系开发团队。
`;

    fs.writeFileSync(path.join(this.docsPath, 'README.md'), content, 'utf8');
    console.log('✅ API文档总览已生成');
  }
}

/**
 * 主函数
 */
async function main() {
  const generator = new ApiDocGenerator();
  await generator.run();
}

// 执行脚本
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1].endsWith('generateApiDocs.js')) {
  main().catch(console.error);
}

export { ApiDocGenerator }