/**
 * @fileoverview 表单管理Hook
 * 提供统一的表单状态管理、验证、提交和错误处理功能
 *
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 */
import  { useState, useCallback, useRef, useEffect  } from 'react';
import { createLogger  } from '@/lib/logger';

const logger = createLogger('use-form');

/**
 * 表单字段验证规则接口
 */
export interface ValidationRule<T = any>  {
  /** 是否必填 */
  required?: boolean;
  /** 最小长度 */
  minLength?: number;
  /** 最大长度 */
  maxLength?: number;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 正则表达式 */
  pattern?: RegExp;
  /** 自定义验证函数 */
  validator?: (value: T, formData: Record<string, any>) => string | null;
  /** 错误消息 */
  message?: string
}

/**
 * 表单字段配置接口
 */
export interface FieldConfig<T = any>  {
  /** 默认值 */
  defaultValue?: T;
  /** 验证规则 */
  rules?: ValidationRule<T>[];
  /** 是否在失去焦点时验证 */
  validateOnBlur?: boolean;
  /** 是否在值改变时验证 */
  validateOnChange?: boolean;
  /** 字段依赖项 */
  dependencies?: string[];
  /** 数据转换函数 */
  transform?: (value: any) => T;
  /** 格式化函数 */
  format?: (value: T) => string;
  /** 解析函数 */
  parse?: (value: string) => T
}

/**
 * 表单配置接口
 */
export interface FormConfig<
  T extends Record<string, any> = Record<string, any>,
> {
  /** 字段配置 */
  fields?: Record<keyof T, FieldConfig>;
  /** 初始值 */
  initialValues?: Partial<T>;
  /** 是否在提交时验证 */
  validateOnSubmit?: boolean;
  /** 是否在值改变时验证 */
  validateOnChange?: boolean;
  /** 是否在失去焦点时验证 */
  validateOnBlur?: boolean;
  /** 提交函数 */
  onSubmit?: (values: T) => Promise<void> | void;
  /** 值改变回调 */
  onChange?: (values: T, changedField: keyof T) => void;
  /** 验证失败回调 */
  onValidationError?: (errors: Record<keyof T, string>) => void;
  /** 重置回调 */
  onReset?: () => void;
  /** 是否保留脏状态 */
  keepDirtyOnReinitialize?: boolean
}

/**
 * 表单字段状态接口
 */
export interface FieldState<T = any>  {
  /** 字段值 */
  value: T;
  /** 错误信息 */
  error: string | null;
  /** 是否已被修改 */
  dirty: boolean;
  /** 是否已被访问 */
  touched: boolean;
  /** 是否正在验证 */
  validating: boolean;
  /** 是否有效 */
  valid: boolean
}

/**
 * 表单状态接口
 */
export interface FormState<
  T extends Record<string, any> = Record<string, any>,
> {
  /** 表单值 */
  values: T;
  /** 字段错误 */
  errors: Record<keyof T, string | null>;
  /** 脏字段 */
  dirty: Record<keyof T, boolean>;
  /** 已访问字段 */
  touched: Record<keyof T, boolean>;
  /** 正在验证的字段 */
  validating: Record<keyof T, boolean>;
  /** 是否正在提交 */
  submitting: boolean;
  /** 提交次数 */
  submitCount: number;
  /** 是否有效 */
  valid: boolean;
  /** 是否有任何字段被修改 */
  isDirty: boolean;
  /** 是否有任何字段被访问 */
  isTouched: boolean;
  /** 是否正在进行任何验证 */
  isValidating: boolean
}

/**
 * 表单操作接口
 */
export interface FormActions<
  T extends Record<string, any> = Record<string, any>,
> {
  /** 设置字段值 */
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  /** 设置多个字段值 */
  setValues: (values: Partial<T>) => void;
  /** 设置字段错误 */
  setError: <K extends keyof T>(field: K, error: string | null) => void;
  /** 设置多个字段错误 */
  setErrors: (errors: Partial<Record<keyof T, string | null>>) => void;
  /** 设置字段为已访问 */
  setTouched: <K extends keyof T>(field: K, touched?: boolean) => void;
  /** 设置多个字段为已访问 */
  setTouchedFields: (fields: Partial<Record<keyof T, boolean>>) => void;
  /** 验证字段 */
  validateField: <K extends keyof T>(field: K) => Promise<boolean>;
  /** 验证所有字段 */
  validateForm: () => Promise<boolean>;
  /** 提交表单 */
  submit: () => Promise<void>;
  /** 重置表单 */
  reset: (values?: Partial<T>) => void;
  /** 清除错误 */
  clearErrors: () => void;
  /** 清除字段错误 */
  clearFieldError: <K extends keyof T>(field: K) => void;
  /** 获取字段状态 */
  getFieldState: <K extends keyof T>(field: K) => FieldState<T[K]>;
  /** 获取字段属性 */
  getFieldProps: <K extends keyof T>(
    field: K
  ) => {
  value: T[K];
    onChange: (value: T[K]) => void;
    onBlur: () => void;
    error: string | null;
    name: string
}

}

/**
 * 默认验证消息
 */
const DEFAULT_MESSAGES =  {
  required: '此字段为必填项',
  minLength: '长度不能少于 {min
} 个字符',
  maxLength: '长度不能超过 {max
} 个字符',
  min: '值不能小于 {min
}',
  max: '值不能大于 {max
}',
  pattern: '格式不正确',
  email: '请输入有效的邮箱地址',
  url: '请输入有效的URL地址',
  number: '请输入有效的数字' 
};

/**
 * 内置验证规则
 */
export const validators =  {
  required: (message?: string): ValidationRule => ({
    required: true,
    message: message || DEFAULT_MESSAGES.required 
}),

  minLength: (min: number, message?: string): ValidationRule => ({
    minLength: min,
    message: message || DEFAULT_MESSAGES.minLength.replace('{min
}', String(min)) }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    maxLength: max,
    message: message || DEFAULT_MESSAGES.maxLength.replace('{max
}', String(max)) }),

  min: (min: number, message?: string): ValidationRule => ({
    min,
    message: message || DEFAULT_MESSAGES.min.replace('{min
}', String(min)) }),

  max: (max: number, message?: string): ValidationRule => ({
    max,
    message: message || DEFAULT_MESSAGES.max.replace('{max
}', String(max)) }),

  pattern: (pattern: RegExp, message?: string): ValidationRule => ({
    pattern,
    message: message || DEFAULT_MESSAGES.pattern 
}),

  email: (message?: string): ValidationRule => ({
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: message || DEFAULT_MESSAGES.email 
}),

  url: (message?: string): ValidationRule => ({
    pattern: /^https?:\/\/.+/,
    message: message || DEFAULT_MESSAGES.url 
}),

  number: (message?: string): ValidationRule => ({
    pattern: /^\d+(\.\d+)?$/,
    message: message || DEFAULT_MESSAGES.number 
}),

  custom: <T>(
    validator: (value: T, formData: Record<string, any>) => string | null
  ): ValidationRule<T> => ({
    validator }) };

/**
 * 验证单个字段
 */
function validateField<T>(
  value: T,
  rules: ValidationRule<T>[] = [],
  formData: Record<string, any> = {}
): string | null {
  for (const rule of rules) {
    // 必填验证
    if (
      rule.required &&
      (value === null || value === undefined || value === '')
    ) {
      return rule.message || DEFAULT_MESSAGES.required
}

    // 如果值为空且不是必填，跳过其他验证
    if (value === null || value === undefined || value === '') {
      continue
}

    const stringValue = String(value);
    const numericValue = Number(value);

    // 最小长度验证
    if (rule.minLength !== undefined && stringValue.length < rule.minLength) {
      return (
        rule.message ||
        DEFAULT_MESSAGES.minLength.replace('{min}', String(rule.minLength))
      )
}

    // 最大长度验证
    if (rule.maxLength !== undefined && stringValue.length > rule.maxLength) {
      return (
        rule.message ||
        DEFAULT_MESSAGES.maxLength.replace('{max}', String(rule.maxLength))
      )
}

    // 最小值验证
    if (
      rule.min !== undefined &&
      !isNaN(numericValue) &&
      numericValue < rule.min
    ) {
      return (
        rule.message || DEFAULT_MESSAGES.min.replace('{min}', String(rule.min))
      )
}

    // 最大值验证
    if (
      rule.max !== undefined &&
      !isNaN(numericValue) &&
      numericValue > rule.max
    ) {
      return (
        rule.message || DEFAULT_MESSAGES.max.replace('{max}', String(rule.max))
      )
}

    // 正则表达式验证
    if (rule.pattern && !rule.pattern.test(stringValue)) {
      return rule.message || DEFAULT_MESSAGES.pattern
}

    // 自定义验证
    if (rule.validator) {
      const error = rule.validator(value, formData);
      if (error) {
        return error
}
    }
  }

  return null
}

/**
 * 表单管理Hook
 * @param config - 表单配置
 * @returns 表单状态和操作函数
 */
export function useForm<T extends Record<string, any> = Record<string, any>>(
  config: FormConfig<T> = {
}
): [FormState<T>, FormActions<T>] {
  const {
    fields = {},
    initialValues = {},
    validateOnSubmit = true,
    validateOnChange = false,
    validateOnBlur = true,
    onSubmit,
    onChange,
    onValidationError,
    onReset,
    keepDirtyOnReinitialize = false } = config;

  // 初始化状态
  const getInitialState = useCallback((): FormState<T> => {
    const values = {} as T;
    const errors = {} as Record<keyof T, string | null>;
    const dirty = {} as Record<keyof T, boolean>;
    const touched = {} as Record<keyof T, boolean>;
    const validating = {} as Record<keyof T, boolean>;

    // 初始化字段值
    Object.keys(fields).forEach(key => {
  const fieldKey = key as keyof T;
      const fieldConfig = fields[fieldKey];

      values[fieldKey] = (initialValues[fieldKey] ??
        fieldConfig?.defaultValue) as T[keyof T];
      errors[fieldKey] = null;
      dirty[fieldKey] = false;
      touched[fieldKey] = false;
      validating[fieldKey] = false

});

    // 添加初始值中存在但字段配置中不存在的字段
    Object.keys(initialValues).forEach(key => {
      const fieldKey = key as keyof T;
      if (!(fieldKey in values)) {
        values[fieldKey] = initialValues[fieldKey] as T[keyof T];
        errors[fieldKey] = null;
        dirty[fieldKey] = false;
        touched[fieldKey] = false;
        validating[fieldKey] = false
}
    });

    return {
      values,
      errors,
      dirty,
      touched,
      validating,
      submitting: false,
      submitCount: 0,
      valid: true,
      isDirty: false,
      isTouched: false,
      isValidating: false 
}
}, [fields, initialValues]);

  const [state, setState] = useState<FormState<T>>(getInitialState);
  const submitPromiseRef = useRef<Promise<void> | null>(null);

  /**
 * 更新状态
 */
const updateState = useCallback((updates: Partial<FormState<T>>) => { setState(prev =>  {
      const newState = { ...prev, ...updates  };

      // 计算派生状态
      newState.isDirty = Object.values(newState.dirty).some(Boolean);
      newState.isTouched = Object.values(newState.touched).some(Boolean);
      newState.isValidating = Object.values(newState.validating).some(Boolean);
      newState.valid = Object.values(newState.errors).every(error => !error);

      return newState
})
}, []);

  /**
 * 设置字段值
 */
const setValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      const fieldConfig = fields[field];

      // 数据转换
      let transformedValue = value;
      if (fieldConfig?.transform) {
        transformedValue = fieldConfig.transform(value)
}

      updateState({
        values: { ...state.values, [field]: transformedValue 
},
        dirty: { ...state.dirty, [field]: true 
} });

      // 触发onChange回调
      if (onChange) {
        onChange({ ...state.values, [field]: transformedValue 
}, field)
}

      // 值改变时验证
      if (validateOnChange || fieldConfig?.validateOnChange) {
        setTimeout(() => validateField(field), 0)
}

      logger.debug('设置字段值', {
        field: String(field),
        value: transformedValue 
})
},
    [fields, state.values, state.dirty, updateState, onChange, validateOnChange]
  );

  /**
 * 设置多个字段值
 */
const setValues = useCallback(
    (values: Partial<T>) => { const newValues = { ...state.values  
};
      const newDirty = { ...state.dirty  };

      Object.entries(values).forEach(([key, value]) => {
        const field = key as keyof T;
        const fieldConfig = fields[field];

        // 数据转换
        let transformedValue = value;
        if (fieldConfig?.transform) {
          transformedValue = fieldConfig.transform(value)
}

        newValues[field] = transformedValue as T[keyof T];
        newDirty[field] = true
});

      updateState({
        values: newValues,
        dirty: newDirty 
});

      // 触发onChange回调
      if (onChange) {
        Object.keys(values).forEach(key => {
  onChange(newValues, key as keyof T)
})

}

      logger.debug('设置多个字段值', { fields: Object.keys(values) 
})
},
    [fields, state.values, state.dirty, updateState, onChange]
  );

  /**
 * 设置字段错误
 */
const setError = useCallback(
    <K extends keyof T>(field: K, error: string | null) => {
      updateState({
        errors: { ...state.errors, [field]: error 
} })
},
    [state.errors, updateState]
  );

  /**
 * 设置多个字段错误
 */
const setErrors = useCallback(
    (errors: Partial<Record<keyof T, string | null>>) => {
      updateState({
        errors: { ...state.errors, ...errors } })
},
    [state.errors, updateState]
  );

  /**
 * 设置字段为已访问
 */
const setTouched = useCallback(
    <K extends keyof T>(field: K, touched: boolean = true) => {
      updateState({
        touched: { ...state.touched, [field]: touched 
} })
},
    [state.touched, updateState]
  );

  /**
 * 设置多个字段为已访问
 */
const setTouchedFields = useCallback(
    (fields: Partial<Record<keyof T, boolean>>) => {
      updateState({
        touched: { ...state.touched, ...fields } })
},
    [state.touched, updateState]
  );

  /**
 * 验证字段
 */
const validateFieldAction = useCallback(
    async <K extends keyof T>(field: K): Promise<boolean> => {
      const fieldConfig = fields[field];
      const value = state.values[field];

      updateState({
        validating: { ...state.validating, [field]: true 
} });

      try {
        const error = validateField(value, fieldConfig?.rules, state.values);

        updateState({
          errors: { ...state.errors, [field]: error 
},
          validating: { ...state.validating, [field]: false 
} });

        const isValid = !error;

        logger.debug('字段验证完成', {
          field: String(field),
          valid: isValid,
          error });

        return isValid
} catch (err) {
        const error = err instanceof Error ? err.message : '验证失败';

        updateState({
          errors: { ...state.errors, [field]: error 
},
          validating: { ...state.validating, [field]: false 
} });

        logger.error('字段验证异常', {
          field: String(field),
          error });

        return false
}
    },
    [fields, state.values, state.errors, state.validating, updateState]
  );

  /**
 * 验证所有字段
 */
const validateForm = useCallback(async (): Promise<boolean> =>  {
    const fieldKeys = Object.keys(fields) as (keyof T)[];
    const validationPromises = fieldKeys.map(field =>
      validateFieldAction(field)
    );

    const results = await Promise.all(validationPromises);
    const isValid = results.every(Boolean);

    if (!isValid && onValidationError) {
      const errors = {} as Record<keyof T, string>;
      fieldKeys.forEach((field, index) => {
        if (!results[index] && state.errors[field]) {
          errors[field] = state.errors[field] as string
}
      });
      onValidationError(errors)
}

    logger.debug('表单验证完成', { valid: isValid 
});

    return isValid
}, [fields, validateFieldAction, onValidationError, state.errors]);

  /**
 * 提交表单
 */
const submit = useCallback(async (): Promise<void> =>  {
    if (submitPromiseRef.current) {
      return submitPromiseRef.current
}

    updateState({
      submitting: true,
      submitCount: state.submitCount + 1 
});

/**
 * submitPromise函数
 * submitPromise函数的功能描述
 *
 * @param async - async参数
 * @returns Promise<void>
 */
const submitPromise = (async () =>  {
      try {
        // 验证表单
        if (validateOnSubmit) {
          const isValid = await validateForm();
          if (!isValid) {
            logger.warn('表单验证失败，取消提交');
            return
}
        }

        // 执行提交
        if (onSubmit) {
          await onSubmit(state.values)
}

        logger.info('表单提交成功')
} catch (error) {
        logger.error('表单提交失败', { error });
        throw error
} finally {
        updateState({ submitting: false 
});
        submitPromiseRef.current = null
}
    })();

    submitPromiseRef.current = submitPromise;
    return submitPromise
}, [
    state.values,
    state.submitCount,
    validateOnSubmit,
    validateForm,
    onSubmit,
    updateState ]);

  /**
 * 重置表单
 */
const reset = useCallback(
    (values?: Partial<T>) => {
      const newInitialValues = values
        ? { ...initialValues, ...values }
        : initialValues;
      const newState = getInitialState();

      if (values) {
        Object.entries(values).forEach(([key, value]) => {
  const field = key as keyof T;
          newState.values[field] = value as T[keyof T]
})

}

      // 保留脏状态
      if (keepDirtyOnReinitialize) {
        Object.keys(state.dirty).forEach(key => {
          const field = key as keyof T;
          if (state.dirty[field]) {
            newState.dirty[field] = true
}
        })
}

      setState(newState);

      if (onReset) {
        onReset()
}

      logger.debug('表单重置')
},
    [
      initialValues,
      getInitialState,
      keepDirtyOnReinitialize,
      state.dirty,
      onReset ]
  );

  /**
 * 清除错误
 */
const clearErrors = useCallback(() =>  {
    const clearedErrors = {} as Record<keyof T, string | null>;
    Object.keys(state.errors).forEach(key => {
  clearedErrors[key as keyof T] = null

});

    updateState({ errors: clearedErrors 
})
}, [state.errors, updateState]);

  /**
 * 清除字段错误
 */
const clearFieldError = useCallback(
    <K extends keyof T>(field: K) => {
      updateState({
        errors: { ...state.errors, [field]: null 
} })
},
    [state.errors, updateState]
  );

  /**
 * 获取字段状态
 */
const getFieldState = useCallback(
    <K extends keyof T>(field: K): FieldState<T[K]> => {
      return {
        value: state.values[field],
        error: state.errors[field],
        dirty: state.dirty[field],
        touched: state.touched[field],
        validating: state.validating[field],
        valid: !state.errors[field] 
}
},
    [state]
  );

  /**
 * 获取字段属性
 */
const getFieldProps = useCallback(
    <K extends keyof T>(field: K) => {
      return {
        value: state.values[field],
        onChange: (value: T[K]) => setValue(field, value),
        onBlur: () => {
          setTouched(field, true);

          const fieldConfig = fields[field];
          if (validateOnBlur || fieldConfig?.validateOnBlur) {
            validateFieldAction(field)
}
        },
        error: state.errors[field],
        name: String(field) 
}
},
    [state, setValue, setTouched, fields, validateOnBlur, validateFieldAction]
  );

  /**
 * 依赖项验证
 */
useEffect(() =>  {
    Object.entries(fields).forEach(([key, fieldConfig]) => {
      const field = key as keyof T;

      if (fieldConfig?.dependencies?.length) {
        const shouldValidate = fieldConfig.dependencies.some(
          dep => state.dirty[dep as keyof T]
        );

        if (shouldValidate) {
          validateFieldAction(field)
}
      }
    })
}, [fields, state.dirty, validateFieldAction]);

  const actions: FormActions<T> = { setValue,
    setValues,
    setError,
    setErrors,
    setTouched,
    setTouchedFields,
    validateField: validateFieldAction,
    validateForm,
    submit,
    reset,
    clearErrors,
    clearFieldError,
    getFieldState,
    getFieldProps  };

  return [state, actions]
}

/**
 * 简化版表单Hook
 */
export function useSimpleForm<T extends Record<string, any>>(
  initialValues: T,
  onSubmit?: (values: T) => Promise<void> | void
) {
  return useForm<T>({
    initialValues,
    onSubmit,
    validateOnSubmit: false,
    validateOnChange: false,
    validateOnBlur: false 
})
}

/**
 * 带验证的表单Hook
 */
export function useValidatedForm<T extends Record<string, any>>(
  config: FormConfig<T>
) {
  return useForm<T>({
    ...config,
    validateOnSubmit: true,
    validateOnChange: true,
    validateOnBlur: true 
})
}
