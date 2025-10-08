import { createLogger  } from '@/lib/logger';
import { RoleType, GamePhase, RoleStatus  } from '@/types/skillSystem.types';
import { Shield, Lock, AlertTriangle  } from 'lucide-react';
import React, { ComponentType, ReactNode  } from 'react';

/**
* 权限控制高阶组件
* 为组件提供统一的权限验证和访问控制功能
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
 */

const logger = createLogger('permission-hoc');

/**
* 权限类型枚举
 */
export enum PermissionType { /** 角色权限  */
  ROLE = 'role',
  /** 游戏阶段权限  */
  PHASE = 'phase',
  /** 状态权限  */
  STATUS = 'status',
  /** 自定义权限  */
  CUSTOM = 'custom';,
}

/**
* 权限规则接口
 */
export interface PermissionRule { /** 权限类型  */
  type: PermissionType;
  /** 允许的值列表  */
  allowed?: any[];
  /** 禁止的值列表  */
  denied?: any[];
  /** 自定义验证函数  */
  validator?: (context: PermissionContext) => boolean | Promise<boolean>;
  /** 权限描述  */
  description?: string;,
}

/**
* 权限上下文接口
 */
export interface PermissionContext { /** 用户ID  */
  userId?: string;
  /** 用户角色  */
  userRole?: RoleType;
  /** 角色状态  */
  roleStatus?: RoleStatus;
  /** 当前游戏阶段  */
  gamePhase?: GamePhase;
  /** 游戏ID  */
  gameId?: string;
  /** 是否为游戏管理员  */
  isGameAdmin?: boolean;
  /** 自定义权限数据  */
  customData?: Record<string, any>;,
}

/**
* 权限配置接口
 */
export interface PermissionConfig { /** 权限规则列表  */
  rules: PermissionRule[];
  /** 权限验证模式：'all' 表示所有规则都必须通过，'any' 表示任一规则通过即可  */
  mode?: 'all' | 'any';
  /** 是否显示无权限提示  */
  showNoPermissionMessage?: boolean;
  /** 自定义无权限组件  */
  noPermissionComponent?: ComponentType<NoPermissionProps>;
  /** 权限检查失败回调  */
  onPermissionDenied?: (context: PermissionContext, failedRules: PermissionRule[]) => void;
  /** 是否在开发环境跳过权限检查  */
  skipInDevelopment?: boolean;,
}

/**
* 无权限组件属性接口
 */
export interface NoPermissionProps { /** 权限上下文  */
  context: PermissionContext;
  /** 失败的权限规则  */
  failedRules: PermissionRule[];
  /** 权限配置  */
  config: PermissionConfig;,
}

/**
* 带权限控制的组件属性接口
 */
export interface WithPermissionProps { /** 权限上下文  */
  permissionContext?: PermissionContext;
  /** 权限配置覆盖  */
  permissionConfig?: Partial<PermissionConfig>;,
}

/**
* 默认无权限组件
 */
const DefaultNoPermissionComponent: React.FC<NoPermissionProps> = ({ context,
  failedRules,
  config,
}) => { const getPermissionIcon = () => {
    if (failedRules.some(rule => rule.type === PermissionType.ROLE)) {
      return <Shield className='h-12 w-12 text-red-400' />;,
}
    if (failedRules.some(rule => rule.type === PermissionType.STATUS)) { return <AlertTriangle className='h-12 w-12 text-yellow-400' />;,
}
    return <Lock className='h-12 w-12 text-gray-400' />;,
};

  const getPermissionMessage = () => { const roleRule = failedRules.find(rule => rule.type === PermissionType.ROLE);
    const phaseRule = failedRules.find(rule => rule.type === PermissionType.PHASE);
    const statusRule = failedRules.find(rule => rule.type === PermissionType.STATUS);

    if (roleRule) {
      return '您的角色无权访问此功能';,
}
    if (phaseRule) { return '当前游戏阶段无法使用此功能';,
}
    if (statusRule) { return '您当前的状态无法使用此功能';,
}
    return '您没有权限访问此功能';,
};

  const getPermissionDetails = () => { return failedRules.map(rule => rule.description).filter(Boolean).join('；');,
};

  return (;
    <div className='min-h-[200px] flex items-center justify-center p-6 bg-gray-50 border border-gray-200 rounded-lg'>;
    <div className='text-center max-w-md'>;
    <div className='mb-4 flex justify-center'>;
    { getPermissionIcon() }
    </div>

    <h3 className='text-lg font-medium text-gray-800 mb-2'>;
    访问受限
    </h3>

    <p className='text-gray-600 mb-4'>;
    { getPermissionMessage() }
    </p>

    { getPermissionDetails() && (
      <div className='mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800'>;
      <p className='font-medium mb-1'>详细说明：</p>;
      <p>{getPermissionDetails() }</p>
      </div>
    )}

    <div className='text-sm text-gray-500'>;
    <p>当前角色：{ context.userRole || '未知' }</p>
    <p>当前状态：{ context.roleStatus || '未知' }</p>
    <p>游戏阶段：{ context.gamePhase || '未知' }</p>
    </div>
    </div>
    </div>
  );,
};

/**
* 权限验证函数
*
* @param rules - 权限规则列表
* @param context - 权限上下文
* @param mode - 验证模式
* @returns 验证结果和失败的规则
 */
async function validatePermissions(
  rules: PermissionRule[],
  context: PermissionContext,
  mode: 'all' | 'any' = 'all';
): Promise<{ hasPermission: boolean; failedRules: PermissionRule[]  }> { const failedRules: PermissionRule[] = [];

  for (const rule of rules) {
    let ruleResult = false;

    try {
      switch (rule.type) {
        case PermissionType.ROLE:
        if (rule.allowed && context.userRole) {
          ruleResult = rule.allowed.includes(context.userRole);,
}
        if (rule.denied && context.userRole) { ruleResult = !rule.denied.includes(context.userRole);,
}
        break;

        case PermissionType.PHASE:
        if (rule.allowed && context.gamePhase) { ruleResult = rule.allowed.includes(context.gamePhase);,
}
        if (rule.denied && context.gamePhase) { ruleResult = !rule.denied.includes(context.gamePhase);,
}
        break;

        case PermissionType.STATUS:
        if (rule.allowed && context.roleStatus) { ruleResult = rule.allowed.includes(context.roleStatus);,
}
        if (rule.denied && context.roleStatus) { ruleResult = !rule.denied.includes(context.roleStatus);,
}
        break;

        case PermissionType.CUSTOM:
        if (rule.validator) { ruleResult = await rule.validator(context);,
}
        break;

        default:
        logger.warn('未知的权限类型', { type: rule.type  });
        ruleResult = false;,
}
    } catch (error) { logger.error('权限验证过程中发生错误', {
        rule,
        context,
        error,
});
      ruleResult = false;,
}

    if (!ruleResult) { failedRules.push(rule);,
}

    // 如果是 'any' 模式且有一个规则通过，则立即返回成功
    if (mode === 'any' && ruleResult) { return { hasPermission: true, failedRules: []  };,
}
  }

  // 'all' 模式：所有规则都必须通过
  // 'any' 模式：如果到这里说明没有规则通过
  const hasPermission = mode === 'all' ? failedRules.length === 0 : false;

  return { hasPermission, failedRules  };,
}

/**
* 权限控制高阶组件
*
* @param config - 权限配置
* @returns 高阶组件函数
 */
export function withPermission<P extends object>(
  config: PermissionConfig
) { return function <T extends ComponentType<P>>(;
    WrappedComponent: T
  ): ComponentType<P & WithPermissionProps> {

    const PermissionHOC: React.FC<P & WithPermissionProps> = props => {
      const { permissionContext, permissionConfig, ...restProps  } = props;

      // 合并配置
      const finalConfig: PermissionConfig = { mode: 'all',
        showNoPermissionMessage: true,
        skipInDevelopment: false,
        ...config,
        ...permissionConfig,
        rules: [...config.rules, ...(permissionConfig?.rules || [])],
};

      const [hasPermission, setHasPermission] = React.useState<boolean | null>(null);
      const [failedRules, setFailedRules] = React.useState<PermissionRule[]>([]);

      // 权限检查
      React.useEffect(() => { async function checkPermissions() {
          // 开发环境跳过检查
          if (finalConfig.skipInDevelopment && process.env.NODE_ENV === 'development') {
            logger.debug('开发环境跳过权限检查');
            setHasPermission(true);
            return;,
}

          if (!permissionContext) { logger.warn('缺少权限上下文');
            setHasPermission(false);
            setFailedRules(finalConfig.rules);
            return;,
}

          logger.debug('开始权限验证', { context: permissionContext,
            rules: finalConfig.rules,
            mode: finalConfig.mode,
});

          const result = await validatePermissions(;
            finalConfig.rules,
            permissionContext,
            finalConfig.mode
          );

          setHasPermission(result.hasPermission);
          setFailedRules(result.failedRules);

          if (!result.hasPermission) { logger.warn('权限验证失败', {
              context: permissionContext,
              failedRules: result.failedRules,
});

            if (finalConfig.onPermissionDenied) { finalConfig.onPermissionDenied(permissionContext, result.failedRules);,
}
          } else { logger.debug('权限验证通过');,
}
        }

        checkPermissions();,
}, [permissionContext, finalConfig]);

      // 加载状态
      if (hasPermission === null) { return (;
          <div className='flex items-center justify-center min-h-[100px]'>;
          <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600'></div>;
          <span className='ml-2 text-sm text-gray-600'>验证权限中...</span>;
          </div>
        );,
}

      // 无权限状态
      if (!hasPermission) { if (!finalConfig.showNoPermissionMessage) {
          return null;,
}

        const NoPermissionComponent = finalConfig.noPermissionComponent || DefaultNoPermissionComponent;

        return (;
          <NoPermissionComponent
          context={ permissionContext || { }}
          failedRules={ failedRules }
          config={ finalConfig }
          />
        );,
}

      return <WrappedComponent { ...(restProps as P) } />;,
};

    // 设置显示名称
    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    PermissionHOC.displayName = `withPermission(${ wrappedComponentName })`;

    return PermissionHOC;,
};,
}

/**
* 权限装饰器
* 用于类组件的装饰器语法
*
* @param config - 权限配置
* @returns 装饰器函数
 */
export function Permission(config: PermissionConfig) { return function <T extends ComponentType<any>>(target: T): T {
    return withPermission(config)(target) as T;,
};,
}

/**
* 快速权限包装函数
* 用于快速包装组件
*
* @param component - 要包装的组件
* @param config - 权限配置
* @returns 包装后的组件
 */
export function wrapWithPermission<P extends object>(
  component: ComponentType<P>,
  config: PermissionConfig
): ComponentType<P & WithPermissionProps> { return withPermission(config)(component);,
}

/**
* 预设权限规则
 */
export const PermissionRules = { /**
  * 仅狼人可访问
   */
  werewolfOnly: {
    type: PermissionType.ROLE,
    allowed: [RoleType.WEREWOLF],
    description: '仅狼人角色可以访问',
} as PermissionRule,

  /**
  * 仅村民可访问
   */
  villagerOnly: { type: PermissionType.ROLE,
    allowed: [RoleType.VILLAGER, RoleType.SEER, RoleType.WITCH, RoleType.GUARD, RoleType.HUNTER],
    description: '仅村民阵营可以访问',
} as PermissionRule,

  /**
  * 仅夜晚阶段可访问
   */
  nightOnly: { type: PermissionType.PHASE,
    allowed: ['night'],
    description: '仅在夜晚阶段可以访问',
} as PermissionRule,

  /**
  * 仅白天阶段可访问
   */
  dayOnly: { type: PermissionType.PHASE,
    allowed: ['day'],
    description: '仅在白天阶段可以访问',
} as PermissionRule,

  /**
  * 仅存活状态可访问
   */
  aliveOnly: { type: PermissionType.STATUS,
    allowed: [RoleStatus.NORMAL, RoleStatus.WEAK],
    description: '仅存活状态可以访问',
} as PermissionRule,

  /**
  * 排除已淘汰状态
   */
  notEliminated: { type: PermissionType.STATUS,
    denied: [RoleStatus.ELIMINATED],
    description: '已淘汰玩家无法访问',
} as PermissionRule,
};

/**
* 预设权限配置
 */
export const PermissionPresets = { /**
  * 狼人夜晚技能权限
   */
  werewolfNightSkill: {
    rules: [PermissionRules.werewolfOnly,
      PermissionRules.nightOnly,
      PermissionRules.aliveOnly,
],
    mode: 'all',
} as PermissionConfig,

  /**
  * 村民白天投票权限
   */
  villagerDayVote: { rules: [PermissionRules.dayOnly,
      PermissionRules.aliveOnly,
],
    mode: 'all',
} as PermissionConfig,

  /**
  * 特殊角色夜晚技能权限
   */
  specialRoleNightSkill: { rules: [{
        type: PermissionType.ROLE,
        allowed: [RoleType.SEER, RoleType.WITCH, RoleType.GUARD],
        description: '仅特殊角色可以使用夜晚技能',
},
      PermissionRules.nightOnly,
      PermissionRules.aliveOnly,
],
    mode: 'all',
} as PermissionConfig,

  /**
  * 游戏管理员权限
   */
  gameAdmin: { rules: [{
        type: PermissionType.CUSTOM,
        validator: context => !!context.isGameAdmin,
        description: '仅游戏管理员可以访问',
},
],
    mode: 'all',
} as PermissionConfig,
};

/**
* 自定义 Hook：使用权限检查
*
* @param rules - 权限规则
* @param context - 权限上下文
* @param mode - 验证模式
* @returns 权限状态和检查函数
 */
export function usePermission(
  rules: PermissionRule[],
  context: PermissionContext,
  mode: 'all' | 'any' = 'all';
) { const [hasPermission, setHasPermission] = React.useState<boolean | null>(null);
  const [failedRules, setFailedRules] = React.useState<PermissionRule[]>([]);
  const [isChecking, setIsChecking] = React.useState(false);

  const checkPermission = React.useCallback(async () => {
    setIsChecking(true);
    try {
      const result = await validatePermissions(rules, context, mode);
      setHasPermission(result.hasPermission);
      setFailedRules(result.failedRules);,
} catch (error) { logger.error('权限检查失败', { error  });
      setHasPermission(false);
      setFailedRules(rules);,
} finally { setIsChecking(false);,
}
  }, [rules, context, mode]);

  React.useEffect(() => { checkPermission();,
}, [checkPermission]);

  return { hasPermission,
    failedRules,
    isChecking,
    recheckPermission: checkPermission,
};,
}