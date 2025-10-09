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
  strength: string;
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
export function validatePhone(phone: string): {
  isValid: boolean;
  error?: string;
} {
  const phoneRegex = /^1[3-9]\d{9}$/;

  if (!phone) {
    return { isValid: false, error: '手机号码不能为空' };
  }

  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: '手机号码格式不正确' };
  }

  return { isValid: true };
}
