/**
 * 代码重构优化工具
 * 消除重复代码、函数拆分、命名规范统一
 */

import fs from 'fs';
import path from 'path';

class CodeRefactoring {
  constructor() {
    this.duplicateCode = [];
    this.largeFunctions = [];
    this.namingIssues = [];
    this.refactoredFiles = 0;
  }

  /**
   * 扫描重复代码
   */
  scanDuplicateCode(dirPath) {
    const files = fs.readdirSync(dirPath);
    const codeBlocks = new Map();

    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        this.scanDuplicateCode(fullPath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n');

        // 检查5行以上的代码块
        for (let i = 0; i < lines.length - 5; i++) {
          const block = lines.slice(i, i + 5).join('\n').trim();
          if (block.length > 100) { // 忽略太短的代码块
            if (codeBlocks.has(block)) {
              codeBlocks.get(block).push({ file: fullPath, line: i + 1 });
            } else {
              codeBlocks.set(block, [{ file: fullPath, line: i + 1 }]);
            }
          }
        }
      }
    }

    // 找出重复的代码块
    for (const [block, locations] of codeBlocks) {
      if (locations.length > 1) {
        this.duplicateCode.push({ block, locations });
      }
    }
  }

  /**
   * 扫描大型函数
   */
  scanLargeFunctions(dirPath) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        this.scanLargeFunctions(fullPath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n');

        let inFunction = false;
        let functionStart = 0;
        let functionName = '';
        let braceCount = 0;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          // 检测函数开始
          const functionMatch = line.match(/(?:function\s+(\w+)|const\s+(\w+)\s*=|(\w+)\s*\(.*\)\s*[:{])/);
          if (functionMatch && !inFunction) {
            functionName = functionMatch[1] || functionMatch[2] || functionMatch[3];
            functionStart = i + 1;
            inFunction = true;
            braceCount = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
          } else if (inFunction) {
            braceCount += (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
            
            if (braceCount <= 0) {
              const functionLength = i - functionStart + 1;
              if (functionLength > 50) { // 超过50行的函数
                this.largeFunctions.push({
                  file: fullPath,
                  name: functionName,
                  startLine: functionStart,
                  endLine: i + 1,
                  length: functionLength
                });
              }
              inFunction = false;
            }
          }
        }
      }
    }
  }

  /**
   * 检查命名规范
   */
  checkNamingConventions(dirPath) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        this.checkNamingConventions(fullPath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // 检查变量命名（应该是camelCase）
        const variableMatches = content.matchAll(/(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g);
        for (const match of variableMatches) {
          const varName = match[1];
          if (!/^[a-z][a-zA-Z0-9]*$/.test(varName) && !varName.startsWith('_')) {
            this.namingIssues.push({
              file: fullPath,
              type: 'variable',
              name: varName,
              suggestion: this.toCamelCase(varName)
            });
          }
        }

        // 检查函数命名（应该是camelCase）
        const functionMatches = content.matchAll(/(?:function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)|const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=)/g);
        for (const match of functionMatches) {
          const funcName = match[1] || match[2];
          if (!/^[a-z][a-zA-Z0-9]*$/.test(funcName) && !funcName.startsWith('_')) {
            this.namingIssues.push({
              file: fullPath,
              type: 'function',
              name: funcName,
              suggestion: this.toCamelCase(funcName)
            });
          }
        }

        // 检查接口命名（应该是PascalCase）
        const interfaceMatches = content.matchAll(/interface\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g);
        for (const match of interfaceMatches) {
          const interfaceName = match[1];
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(interfaceName)) {
            this.namingIssues.push({
              file: fullPath,
              type: 'interface',
              name: interfaceName,
              suggestion: this.toPascalCase(interfaceName)
            });
          }
        }
      }
    }
  }

  /**
   * 转换为camelCase
   */
  toCamelCase(str) {
    return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase())
              .replace(/^[A-Z]/, char => char.toLowerCase());
  }

  /**
   * 转换为PascalCase
   */
  toPascalCase(str) {
    return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase())
              .replace(/^[a-z]/, char => char.toUpperCase());
  }

  /**
   * 创建公共工具函数库
   */
  createUtilityLibrary() {
    const utilsDir = path.join(process.cwd(), 'src', 'utils', 'common');
    if (!fs.existsSync(utilsDir)) {
      fs.mkdirSync(utilsDir, { recursive: true });
    }

    // 创建常用工具函数
    const commonUtils = `/**
 * 通用工具函数库
 * 提供项目中常用的工具函数
 */

/**
 * 深度克隆对象
 * @param obj - 要克隆的对象
 * @returns 克隆后的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  
  return obj;
}

/**
 * 防抖函数
 * @param func - 要防抖的函数
 * @param delay - 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * 节流函数
 * @param func - 要节流的函数
 * @param delay - 延迟时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

/**
 * 格式化日期
 * @param date - 日期对象或时间戳
 * @param format - 格式字符串
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  const d = new Date(date);
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 生成随机ID
 * @param length - ID长度
 * @returns 随机ID字符串
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 检查对象是否为空
 * @param obj - 要检查的对象
 * @returns 是否为空
 */
export function isEmpty(obj: any): boolean {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
}`;

    fs.writeFileSync(path.join(utilsDir, 'index.ts'), commonUtils);
    console.log('✅ 公共工具函数库已创建');
  }

  /**
   * 创建高阶组件库
   */
  createHOCLibrary() {
    const hocDir = path.join(process.cwd(), 'src', 'components', 'hoc');
    if (!fs.existsSync(hocDir)) {
      fs.mkdirSync(hocDir, { recursive: true });
    }

    // 创建错误边界HOC
    const errorBoundaryHOC = `/**
 * 错误边界高阶组件
 * 用于捕获和处理组件错误
 */

import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * 错误边界高阶组件
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return class ErrorBoundary extends Component<P & ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: P & ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('错误边界捕获到错误:', error, errorInfo);
      this.props.onError?.(error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return this.props.fallback || fallback || (
          <div className="error-boundary">
            <h2>出现了错误</h2>
            <p>请刷新页面重试</p>
          </div>
        );
      }

      return <WrappedComponent {...(this.props as P)} />;
    }
  };
}`;

    fs.writeFileSync(path.join(hocDir, 'withErrorBoundary.tsx'), errorBoundaryHOC);
    console.log('✅ 高阶组件库已创建');
  }

  /**
   * 生成重构报告
   */
  generateReport() {
    console.log('\n📊 代码重构分析报告');
    console.log('='.repeat(60));

    console.log(`\n🔍 重复代码检测:`);
    console.log(`  - 发现 ${this.duplicateCode.length} 处重复代码`);
    if (this.duplicateCode.length > 0) {
      this.duplicateCode.slice(0, 3).forEach((item, index) => {
        console.log(`  ${index + 1}. 重复出现在 ${item.locations.length} 个位置`);
        item.locations.forEach(loc => {
          console.log(`     - ${path.relative(process.cwd(), loc.file)}:${loc.line}`);
        });
      });
    }

    console.log(`\n📏 大型函数检测:`);
    console.log(`  - 发现 ${this.largeFunctions.length} 个大型函数（>50行）`);
    if (this.largeFunctions.length > 0) {
      this.largeFunctions.slice(0, 5).forEach((func, index) => {
        console.log(`  ${index + 1}. ${func.name} (${func.length}行) - ${path.relative(process.cwd(), func.file)}`);
      });
    }

    console.log(`\n📝 命名规范检测:`);
    console.log(`  - 发现 ${this.namingIssues.length} 个命名问题`);
    if (this.namingIssues.length > 0) {
      const issuesByType = this.namingIssues.reduce((acc, issue) => {
        acc[issue.type] = (acc[issue.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      Object.entries(issuesByType).forEach(([type, count]) => {
        console.log(`     - ${type}: ${count} 个问题`);
      });
    }

    console.log(`\n✨ 重构建议:`);
    if (this.duplicateCode.length > 0) {
      console.log(`  - 提取 ${this.duplicateCode.length} 处重复代码为公共函数`);
    }
    if (this.largeFunctions.length > 0) {
      console.log(`  - 拆分 ${this.largeFunctions.length} 个大型函数`);
    }
    if (this.namingIssues.length > 0) {
      console.log(`  - 修复 ${this.namingIssues.length} 个命名规范问题`);
    }

    console.log('\n' + '='.repeat(60));
  }

  /**
   * 运行完整的重构分析
   */
  run() {
    console.log('🔧 开始代码重构分析...\n');

    const srcPath = path.join(process.cwd(), 'src');
    if (fs.existsSync(srcPath)) {
      this.scanDuplicateCode(srcPath);
      this.scanLargeFunctions(srcPath);
      this.checkNamingConventions(srcPath);
    }

    this.createUtilityLibrary();
    this.createHOCLibrary();
    this.generateReport();

    console.log('\n✅ 代码重构分析完成！');
  }
}

// 运行重构分析
const refactoring = new CodeRefactoring();
refactoring.run();