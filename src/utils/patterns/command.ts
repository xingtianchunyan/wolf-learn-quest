/**
 * 文件级注释：命令模式实现
 * 提供命令模式的完整实现，支持撤销、重做、宏命令等功能
 */

import { useCallback, useState, useRef } from 'react';

/**
 * 命令接口
 */
export interface Command {
  execute(): void | Promise<void>;
  undo?(): void | Promise<void>;
  canUndo?(): boolean;
  description?: string;
}

/**
 * 异步命令接口
 */
export interface AsyncCommand extends Command {
  execute(): Promise<void>;
  undo?(): Promise<void>;
}

/**
 * 命令执行结果
 */
export interface CommandResult {
  success: boolean;
  error?: Error;
  data?: any;
}

/**
 * 命令调用器类
 * 负责执行命令、维护历史记录和支持撤销/重做
 */
export class CommandInvoker {
  private history: Command[] = [];
  private currentIndex: number = -1;
  private maxHistorySize: number = 100;

  /**
   * 构造函数
   * @param maxHistorySize - 最大历史记录数量
   */
  constructor(maxHistorySize: number = 100) {
    this.maxHistorySize = maxHistorySize;
  }

  /**
   * 执行命令
   * @param command - 要执行的命令
   * @returns 执行结果
   */
  async execute(command: Command): Promise<CommandResult> {
    try {
      await command.execute();

      // 清除当前位置之后的历史记录
      this.history = this.history.slice(0, this.currentIndex + 1);

      // 添加新命令到历史记录
      this.history.push(command);
      this.currentIndex++;

      // 限制历史记录大小
      if (this.history.length > this.maxHistorySize) {
        this.history.shift();
        this.currentIndex--;
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  /**
   * 撤销上一个命令
   * @returns 撤销结果
   */
  async undo(): Promise<CommandResult> {
    if (!this.canUndo()) {
      return { success: false, error: new Error('无法撤销') };
    }

    const command = this.history[this.currentIndex];

    try {
      if (command.undo) {
        await command.undo();
      }
      this.currentIndex--;
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  /**
   * 重做下一个命令
   * @returns 重做结果
   */
  async redo(): Promise<CommandResult> {
    if (!this.canRedo()) {
      return { success: false, error: new Error('无法重做') };
    }

    this.currentIndex++;
    const command = this.history[this.currentIndex];

    try {
      await command.execute();
      return { success: true };
    } catch (error) {
      this.currentIndex--;
      return { success: false, error: error as Error };
    }
  }

  /**
   * 检查是否可以撤销
   * @returns 是否可以撤销
   */
  canUndo(): boolean {
    return (
      this.currentIndex >= 0 &&
      this.history[this.currentIndex]?.canUndo?.() !== false
    );
  }

  /**
   * 检查是否可以重做
   * @returns 是否可以重做
   */
  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  /**
   * 清空历史记录
   */
  clear(): void {
    this.history = [];
    this.currentIndex = -1;
  }

  /**
   * 获取历史记录
   * @returns 历史记录数组
   */
  getHistory(): Command[] {
    return [...this.history];
  }
}

/**
 * 宏命令类
 * 用于组合多个命令一起执行
 */
export class MacroCommand implements Command {
  private commands: Command[] = [];
  public description: string;

  /**
   * 构造函数
   * @param commands - 命令数组
   * @param description - 宏命令描述
   */
  constructor(commands: Command[] = [], description: string = '宏命令') {
    this.commands = commands;
    this.description = description;
  }

  /**
   * 添加命令
   * @param command - 要添加的命令
   */
  addCommand(command: Command): void {
    this.commands.push(command);
  }

  /**
   * 执行所有命令
   */
  async execute(): Promise<void> {
    for (const command of this.commands) {
      await command.execute();
    }
  }

  /**
   * 撤销所有命令（逆序）
   */
  async undo(): Promise<void> {
    for (let i = this.commands.length - 1; i >= 0; i--) {
      const command = this.commands[i];
      if (command.undo) {
        await command.undo();
      }
    }
  }

  /**
   * 检查是否可以撤销
   * @returns 是否可以撤销
   */
  canUndo(): boolean {
    return this.commands.every(cmd => cmd.canUndo?.() !== false);
  }
}

/**
 * 简单命令实现
 */
export class SimpleCommand implements Command {
  private executeFunc: () => void | Promise<void>;
  private undoFunc?: () => void | Promise<void>;
  public description: string;

  /**
   * 构造函数
   * @param executeFunc - 执行函数
   * @param undoFunc - 撤销函数
   * @param description - 命令描述
   */
  constructor(
    executeFunc: () => void | Promise<void>,
    undoFunc?: () => void | Promise<void>,
    description: string = '简单命令'
  ) {
    this.executeFunc = executeFunc;
    this.undoFunc = undoFunc;
    this.description = description;
  }

  /**
   * 执行命令
   */
  async execute(): Promise<void> {
    await this.executeFunc();
  }

  /**
   * 撤销命令
   */
  async undo(): Promise<void> {
    if (this.undoFunc) {
      await this.undoFunc();
    }
  }

  /**
   * 检查是否可以撤销
   * @returns 是否可以撤销
   */
  canUndo(): boolean {
    return !!this.undoFunc;
  }
}

/**
 * React Hook：使用命令模式
 * @param maxHistorySize - 最大历史记录数量
 * @returns 命令调用器和相关方法
 */
export function useCommandInvoker(maxHistorySize: number = 100) {
  const invokerRef = useRef<CommandInvoker>();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  if (!invokerRef.current) {
    invokerRef.current = new CommandInvoker(maxHistorySize);
  }

  const updateState = useCallback(() => {
    if (invokerRef.current) {
      setCanUndo(invokerRef.current.canUndo());
      setCanRedo(invokerRef.current.canRedo());
    }
  }, []);

  const execute = useCallback(
    async (command: Command) => {
      if (invokerRef.current) {
        const result = await invokerRef.current.execute(command);
        updateState();
        return result;
      }
      return { success: false, error: new Error('调用器未初始化') };
    },
    [updateState]
  );

  const undo = useCallback(async () => {
    if (invokerRef.current) {
      const result = await invokerRef.current.undo();
      updateState();
      return result;
    }
    return { success: false, error: new Error('调用器未初始化') };
  }, [updateState]);

  const redo = useCallback(async () => {
    if (invokerRef.current) {
      const result = await invokerRef.current.redo();
      updateState();
      return result;
    }
    return { success: false, error: new Error('调用器未初始化') };
  }, [updateState]);

  const clear = useCallback(() => {
    if (invokerRef.current) {
      invokerRef.current.clear();
      updateState();
    }
  }, [updateState]);

  return {
    execute,
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
    invoker: invokerRef.current,
  };
}

/**
 * 创建简单命令的工厂函数
 * @param executeFunc - 执行函数
 * @param undoFunc - 撤销函数
 * @param description - 命令描述
 * @returns 命令实例
 */
export function createCommand(
  executeFunc: () => void | Promise<void>,
  undoFunc?: () => void | Promise<void>,
  description?: string
): Command {
  return new SimpleCommand(executeFunc, undoFunc, description);
}

/**
 * 创建宏命令的工厂函数
 * @param commands - 命令数组
 * @param description - 宏命令描述
 * @returns 宏命令实例
 */
export function createMacroCommand(
  commands: Command[] = [],
  description?: string
): MacroCommand {
  return new MacroCommand(commands, description);
}
