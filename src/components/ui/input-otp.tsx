import { cn  } from '@/lib/utils'
import { Dot  } from 'lucide-react'
import { OTPInput, OTPInputContext  } from 'input-otp'
import * as React from 'react'

/**
* 文件级注释：input-otp 组件
*
* 该文件实现了一个提供通用功能组件，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category common
* @filepath ui\input-otp.tsx
 */

const InputOTP = React.forwardRef<;
React.ElementRef<typeof OTPInput>,
React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props  }, ref) => (;
  <OTPInput
  ref={ ref }
  containerClassName={ cn(;
    'flex items-center gap-2 has-[:disabled]:opacity-50',
    containerClassName
  ) }
  className={ cn('disabled:cursor-not-allowed', className) }
  { ...props }
  />
))
InputOTP.displayName = 'InputOTP';

const InputOTPGroup = React.forwardRef<;
React.ElementRef<'div'>,
React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props  }, ref) => (;
  <div ref={ ref } className={ cn('flex items-center', className) } { ...props } />;
))
InputOTPGroup.displayName = 'InputOTPGroup';

const InputOTPSlot = React.forwardRef<;
React.ElementRef<'div'>,
React.ComponentPropsWithoutRef<'div'> & { index: number  }
>(({ index, className, ...props  }, ref) => { const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive  } = inputOTPContext.slots[index];

  return (;
    <div
    ref={ ref }
    className={ cn(;
      'relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
      isActive && 'z-10 ring-2 ring-ring ring-offset-background',
      className
    ) }
    { ...props }
    >
    { char }
    { hasFakeCaret && (
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>;
      <div className='h-4 w-px animate-caret-blink bg-foreground duration-1000' />;
      </div>
    ) }
    </div>
  ),
})
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = React.forwardRef<;
React.ElementRef<'div'>,
React.ComponentPropsWithoutRef<'div'>
>(({ ...props  }, ref) => (;
  <div ref={ ref } role='separator' { ...props }>;
  <Dot />
  </div>
))
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator  }
