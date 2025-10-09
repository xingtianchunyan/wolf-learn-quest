/**
 * 文件级注释：测试环境设置
 * 
 * 该文件配置测试环境，包括：
 * - 全局测试工具配置
 * - DOM 测试库设置
 * - 模拟对象配置
 * - 测试环境变量
 * 
 * @author SOLO Coding
 * @version 1.0.0
 */

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// 模拟 ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// 模拟 IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// 模拟 matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// 模拟 localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// 模拟 sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
});

// 模拟 fetch
global.fetch = vi.fn();

// 模拟 console 方法以减少测试输出噪音
global.console = {
  ...console,
  // 保留 error 和 warn 用于调试
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
};

// 设置测试环境变量
process.env.NODE_ENV = 'test';