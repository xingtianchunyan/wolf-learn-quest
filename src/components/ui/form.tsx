import { cn   } from '@/lib/utils'
import {
  Controller, Label   } from '@/components/ui/label'
import { Slot   } from '@radix-ui/react-slot'
import * as LabelPrimitive from '@radix-ui/react-label'
import * as React from 'react'

/**
* 文件级注释：form 组件
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
* @filepath ui\form.tsx
 */

  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext  } from 'react-hook-form'

/**
* form 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
* @hooks useFormContext, useFormField, useContext, useId
*
* @example
* // 使用示例
* <form />
 */
const Form = FormProvider;

type FormFieldContextValue<
TFieldValues extends FieldValues = FieldValues,
TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>;
> = { name: TName 
}

/**
 * FormFieldContext组件
 * 表单组件，提供数据收集和验证
 * @param props - 组件属性
 * @returns JSX元素
 */
const FormFieldContext = React.createContext<FormFieldContextValue>(; {} as FormFieldContextValue
)

/**
 * FormField组件
 * 表单组件，提供数据收集和验证
 * @param props - 组件属性
 * @returns JSX元素
 */
const FormField = <;
TFieldValues extends FieldValues = FieldValues,
TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>;
>({ ...props }: ControllerProps<TFieldValues, TName>) => { return (;
    <FormFieldContext.Provider value={{ name: props.name  
}}>;
    <Controller { ...props } />
    </FormFieldContext.Provider>
  ) }

/**
 * useFormField函数
 * 自定义Hook
 * @returns void
 */
const useFormField = () =>  { const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState  } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) { throw new Error('useFormField should be used within <FormField>')
}

  const { id  } = itemContext;

  return { id,
    name: fieldContext.name,
    formItemId: `${id 
}-form-item`,
    formDescriptionId: `${ id 
}-form-item-description`,
    formMessageId: `${ id 
}-form-item-message`,
    ...fieldState } }

type FormItemContextValue = { id: string 
}

/**
 * FormItemContext组件
 * 表单组件，提供数据收集和验证
 * @param props - 组件属性
 * @returns JSX元素
 */
const FormItemContext = React.createContext<FormItemContextValue>(; {} as FormItemContextValue
)

/**
 * FormItem组件
 * 表单组件，提供数据收集和验证
 * @param props - 组件属性
 * @returns JSX元素
 */
const FormItem = React.forwardRef<;
HTMLDivElement,
React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props  }, ref) => { const id = React.useId();

  return (;
    <FormItemContext.Provider value={{ id  }}>;
    <div ref={ ref } className={ cn('space-y-2', className) } { ...props } />;
    </FormItemContext.Provider>
  ) })
FormItem.displayName = 'FormItem';

/**
 * FormLabel组件
 * 表单组件，提供数据收集和验证
 * @param props - 组件属性
 * @returns JSX元素
 */
const FormLabel = React.forwardRef<;
React.ElementRef<typeof LabelPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props  }, ref) => { const { error, formItemId  } = useFormField();

  return (;
    <Label
    ref={ ref }
    className={ cn(error && 'text-destructive', className) }
    htmlFor={ formItemId }
    { ...props }
    />
  ) })
FormLabel.displayName = 'FormLabel';

/**
 * FormControl组件
 * 表单组件，提供数据收集和验证
 * @param props - 组件属性
 * @returns JSX元素
 */
const FormControl = React.forwardRef<;
React.ElementRef<typeof Slot>,
React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props  }, ref) => { const { error, formItemId, formDescriptionId, formMessageId  } = useFormField();

  return (;
    <Slot
    ref={ ref }
    id={ formItemId }
    aria-describedby={ !error
      ? `${formDescriptionId }`
      : `${ formDescriptionId 
} ${ formMessageId }` }
    aria-invalid={ !!error }
    { ...props }
    />
  ) })
FormControl.displayName = 'FormControl';

/**
 * FormDescription组件
 * 表单组件，提供数据收集和验证
 * @param props - 组件属性
 * @returns JSX元素
 */
const FormDescription = React.forwardRef<;
HTMLParagraphElement,
React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props  }, ref) => { const { formDescriptionId  } = useFormField();

  return (;
    <p
    ref={ ref }
    id={ formDescriptionId }
    className={ cn('text-sm text-muted-foreground', className) }
    { ...props }
    />
  ) })
FormDescription.displayName = 'FormDescription';

/**
 * FormMessage组件
 * 表单组件，提供数据收集和验证
 * @param props - 组件属性
 * @returns JSX元素
 */
const FormMessage = React.forwardRef<;
HTMLParagraphElement,
React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props  }, ref) => { const { error, formMessageId  } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) { return null
}

  return (;
    <p
    ref={ ref }
    id={ formMessageId }
    className={ cn('text-sm font-medium text-destructive', className) }
    { ...props }
    >
    { body }
    </p>
  ) })
FormMessage.displayName = 'FormMessage';

export { useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField }
