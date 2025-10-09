/**
 * 文件级注释：验证工具函数库
 * 提供各种数据验证功能
 */

/**
 * 邮箱验证结果接口
 */
export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * 密码验证结果接口
 */
export interface PasswordValidationResult {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  error?: string;
}

/**
 * 手机号验证结果接口
 */
export interface PhoneValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * 验证邮箱格式
 * @param email - 邮箱地址
 * @returns 验证结果
 */
export function validateEmail(email: string): EmailValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { isValid: false, error: '邮箱地址不能为空' };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, error: '邮箱格式不正确' };
  }

  return { isValid: true };
}

/**
 * 验证密码强度
 * @param password - 密码
 * @returns 验证结果
 */
export function validatePassword(password: string): PasswordValidationResult {
  if (!password) {
    return { isValid: false, strength: 'weak', error: '密码不能为空' };
  }

  if (password.length < 8) {
    return { isValid: false, strength: 'weak', error: '密码长度至少8位' };
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const score = [hasLower, hasUpper, hasNumber, hasSpecial].filter(
    Boolean
  ).length;

  if (score < 3) {
    return {
      isValid: false,
      strength: 'weak',
      error: '密码需要包含大小写字母、数字和特殊字符中的至少3种',
    };
  }

  const strength = score === 4 ? 'strong' : 'medium';
  return { isValid: true, strength };
}

/**
 * 验证手机号码
 * @param phone - 手机号码
 * @returns 验证结果
 */
export function validatePhone(phone: string): PhoneValidationResult {
  const phoneRegex = /^1[3-9]\d{9}$/;

  if (!phone) {
    return { isValid: false, error: '手机号码不能为空' };
  }

  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: '手机号码格式不正确' };
  }

  return { isValid: true };
}

/**
 * 验证身份证号码
 * @param idCard - 身份证号码
 * @returns 验证结果
 */
export function validateIdCard(idCard: string): {
  isValid: boolean;
  error?: string;
} {
  const idCardRegex =
    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

  if (!idCard) {
    return { isValid: false, error: '身份证号码不能为空' };
  }

  if (!idCardRegex.test(idCard)) {
    return { isValid: false, error: '身份证号码格式不正确' };
  }

  return { isValid: true };
}

/**
 * 验证URL格式
 * @param url - URL地址
 * @returns 验证结果
 */
export function validateUrl(url: string): { isValid: boolean; error?: string } {
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'URL格式不正确' };
  }
}

/**
 * 验证数字范围
 * @param value - 数值
 * @param min - 最小值
 * @param max - 最大值
 * @returns 验证结果
 */
export function validateNumberRange(
  value: number,
  min: number,
  max: number
): { isValid: boolean; error?: string } {
  if (isNaN(value)) {
    return { isValid: false, error: '请输入有效数字' };
  }

  if (value < min || value > max) {
    return { isValid: false, error: `数值应在 ${min} 到 ${max} 之间` };
  }

  return { isValid: true };
}

/**
 * 验证字符串长度
 * @param str - 字符串
 * @param minLength - 最小长度
 * @param maxLength - 最大长度
 * @returns 验证结果
 */
export function validateStringLength(
  str: string,
  minLength: number,
  maxLength: number
): { isValid: boolean; error?: string } {
  if (!str) {
    return { isValid: false, error: '内容不能为空' };
  }

  if (str.length < minLength) {
    return { isValid: false, error: `内容长度不能少于 ${minLength} 个字符` };
  }

  if (str.length > maxLength) {
    return { isValid: false, error: `内容长度不能超过 ${maxLength} 个字符` };
  }

  return { isValid: true };
}
