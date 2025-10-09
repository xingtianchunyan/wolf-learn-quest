import { createLogger   } from '@/lib/logger';
import { SECURITY_CONFIG, SecurityLevel   } from '@/config/security.config';
import { enhancedInputValidator   } from './enhancedInputValidation';
import { enhancedPermissionSystem, Permission   } from './enhancedPermissionSystem';
import { securityEnhancement   } from './securityEnhancement';

/**
* 文件级注释：全面安全审计系统
* 提供深度安全分析、漏洞检测和安全建议
* 涵盖输入验证、权限控制、API安全、数据保护等方面
 */

const logger = createLogger('comprehensive-security-audit');

/**
 * 安全漏洞严重级别
 */
export enum VulnerabilitySeverity  { CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  INFO = 'info'
}

/**
 * 安全漏洞类型
 */
export enum VulnerabilityType  { INPUT_VALIDATION = 'input_validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  SESSION_MANAGEMENT = 'session_management',
  CRYPTOGRAPHY = 'cryptography',
  ERROR_HANDLING = 'error_handling',
  LOGGING = 'logging',
  CONFIGURATION = 'configuration',
  INJECTION = 'injection',
  XSS = 'xss',
  CSRF = 'csrf',
  SECURITY_HEADERS = 'security_headers',
  DATA_EXPOSURE = 'data_exposure',
  BUSINESS_LOGIC = 'business_logic'
}

/**
 * 安全漏洞接口
 */
export interface SecurityVulnerability  { id: string;
  type: VulnerabilityType;
  severity: VulnerabilitySeverity;
  title: string;
  description: string;
  location: string;
  evidence?: any;
  impact: string;
  recommendation: string;
  cweId?: string;
  cvssScore?: number;
  exploitability: 'easy' | 'medium' | 'hard';
  detectedAt: string
}

/**
 * 安全审计结果接口
 */
export interface SecurityAuditResult  {
  auditId: string;
  timestamp: string;
  overallScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  vulnerabilities: SecurityVulnerability[];
  summary: {
    totalVulnerabilities: number;
    criticalCount: number;
    highCount: number;
    mediumCount: number;
    lowCount: number;
    infoCount: number
}
  categories: { [key in VulnerabilityType]: {
      score: number;
      vulnerabilities: SecurityVulnerability[];
      recommendations: string[]
}
};
  complianceStatus: { owasp: {
      score: number;
      issues: string[]
};
    gdpr: { compliant: boolean;
      issues: string[]
};
    iso27001: { score: number;
      issues: string[]
}
};
  recommendations: { immediate: string[];
    shortTerm: string[];
    longTerm: string[]
};
  nextAuditDate: string
}

/**
 * 审计配置接口
 */
export interface AuditConfig  { includeCodeAnalysis: boolean;
  includeConfigurationCheck: boolean;
  includeRuntimeAnalysis: boolean;
  includePenetrationTesting: boolean;
  includeComplianceCheck: boolean;
  depth: 'basic' | 'standard' | 'comprehensive';
  excludeCategories: VulnerabilityType[];
  customRules: Array<{
    name: string;
    check: () => Promise<SecurityVulnerability[]>
}>
}

/**
 * 全面安全审计类
 */
export class ComprehensiveSecurityAudit  { private static instance: ComprehensiveSecurityAudit;
  private vulnerabilities: SecurityVulnerability[] = [];

  private constructor() { }

  /**
 * 获取单例实例
 */
public static getInstance(): ComprehensiveSecurityAudit { if (!ComprehensiveSecurityAudit.instance)  {
      ComprehensiveSecurityAudit.instance = new ComprehensiveSecurityAudit()
}
    return ComprehensiveSecurityAudit.instance
}

  /**
  * 执行全面安全审计
  * @param config - 审计配置
  * @returns 安全审计结果
   */
  public async performComprehensiveAudit(
    config: Partial<AuditConfig> = {
}
  ): Promise<SecurityAuditResult> { const auditConfig: AuditConfig = {
      includeCodeAnalysis: true,
      includeConfigurationCheck: true,
      includeRuntimeAnalysis: true,
      includePenetrationTesting: false,
      includeComplianceCheck: true,
      depth: 'comprehensive',
      excludeCategories: [],
      customRules: [],
      ...config  };

    logger.info('开始全面安全审计', { config: auditConfig  
});

    this.vulnerabilities = [];
    const auditId = this.generateAuditId();
    const timestamp = new Date().toISOString();

    try { // 1. 输入验证审计
      if (!auditConfig.excludeCategories.includes(VulnerabilityType.INPUT_VALIDATION)) {
        await this.auditInputValidation()
}

      // 2. 认证和授权审计
      if (!auditConfig.excludeCategories.includes(VulnerabilityType.AUTHENTICATION)) { await this.auditAuthentication()
}

      if (!auditConfig.excludeCategories.includes(VulnerabilityType.AUTHORIZATION)) { await this.auditAuthorization()
}

      // 3. 会话管理审计
      if (!auditConfig.excludeCategories.includes(VulnerabilityType.SESSION_MANAGEMENT)) { await this.auditSessionManagement()
}

      // 4. 加密和数据保护审计
      if (!auditConfig.excludeCategories.includes(VulnerabilityType.CRYPTOGRAPHY)) { await this.auditCryptography()
}

      // 5. 注入攻击防护审计
      if (!auditConfig.excludeCategories.includes(VulnerabilityType.INJECTION)) { await this.auditInjectionProtection()
}

      // 6. XSS防护审计
      if (!auditConfig.excludeCategories.includes(VulnerabilityType.XSS)) { await this.auditXSSProtection()
}

      // 7. CSRF防护审计
      if (!auditConfig.excludeCategories.includes(VulnerabilityType.CSRF)) { await this.auditCSRFProtection()
}

      // 8. 安全头审计
      if (!auditConfig.excludeCategories.includes(VulnerabilityType.SECURITY_HEADERS)) { await this.auditSecurityHeaders()
}

      // 9. 错误处理审计
      if (!auditConfig.excludeCategories.includes(VulnerabilityType.ERROR_HANDLING)) { await this.auditErrorHandling()
}

      // 10. 配置安全审计
      if (auditConfig.includeConfigurationCheck &&
      !auditConfig.excludeCategories.includes(VulnerabilityType.CONFIGURATION)) { await this.auditConfiguration()
}

      // 11. 数据暴露审计
      if (!auditConfig.excludeCategories.includes(VulnerabilityType.DATA_EXPOSURE)) { await this.auditDataExposure()
}

      // 12. 业务逻辑审计
      if (!auditConfig.excludeCategories.includes(VulnerabilityType.BUSINESS_LOGIC)) { await this.auditBusinessLogic()
}

      // 13. 自定义规则审计
      for (const customRule of auditConfig.customRules) { try {
          const customVulnerabilities = await customRule.check();
          this.vulnerabilities.push(...customVulnerabilities)
} catch (error) { logger.error(`自定义规则执行失败: ${customRule.name 
}`, error)
}
      }

      // 生成审计结果
      const result = this.generateAuditResult(auditId, timestamp);

      logger.info('安全审计完成', { auditId,
        totalVulnerabilities: result.vulnerabilities.length,
        overallScore: result.overallScore,
        riskLevel: result.riskLevel 
});

      return result
} catch (error) { logger.error('安全审计过程中发生错误', error);
      throw new Error(`安全审计失败: ${error instanceof Error ? error.message : String(error) 
}`)
}
  }

  /**
 * 审计输入验证
 */
private async auditInputValidation(): Promise<void>  { logger.debug('开始输入验证审计');
    // 检查输入验证配置
    const inputConfig = SECURITY_CONFIG.inputValidation;

    // 检查最大字符串长度设置
    if (inputConfig.maxStringLength > 50000) {
      this.addVulnerability({
        type: VulnerabilityType.INPUT_VALIDATION,
        severity: VulnerabilitySeverity.MEDIUM,
        title: '输入长度限制过大',
        description: '最大字符串长度设置过大，可能导致DoS攻击',
        location: 'security.config.ts',
        evidence: { maxStringLength: inputConfig.maxStringLength  
},
        impact: '可能导致内存耗尽或处理超时',
        recommendation: '建议将最大字符串长度限制在10000字符以内',
        exploitability: 'easy' 
})
}

    // 检查文件上传安全
    if (!inputConfig.allowedFileTypes || inputConfig.allowedFileTypes.length === 0) { this.addVulnerability({
        type: VulnerabilityType.INPUT_VALIDATION,
        severity: VulnerabilitySeverity.HIGH,
        title: '文件上传类型未限制',
        description: '未设置允许的文件类型，可能导致恶意文件上传',
        location: 'security.config.ts',
        impact: '攻击者可能上传恶意脚本或可执行文件',
        recommendation: '设置严格的文件类型白名单',
        exploitability: 'medium' 
})
}

    // 检查是否包含危险文件类型
    const dangerousTypes = ['exe', 'bat', 'cmd', 'sh', 'php', 'jsp', 'asp'];
    const allowedDangerousTypes = inputConfig.allowedFileTypes?.filter(type =>;
    dangerousTypes.includes(type.toLowerCase())
  );

  if (allowedDangerousTypes && allowedDangerousTypes.length > 0) { this.addVulnerability({
      type: VulnerabilityType.INPUT_VALIDATION,
      severity: VulnerabilitySeverity.CRITICAL,
      title: '允许危险文件类型上传',
      description: '允许上传可执行文件类型',
      location: 'security.config.ts',
      evidence: { dangerousTypes: allowedDangerousTypes  
},
      impact: '可能导致远程代码执行',
      recommendation: '移除所有可执行文件类型',
      cweId: 'CWE-434',
      exploitability: 'easy' 
})
}

  // 检查输入清理是否启用
  if (!inputConfig.enableSanitization) { this.addVulnerability({
      type: VulnerabilityType.INPUT_VALIDATION,
      severity: VulnerabilitySeverity.HIGH,
      title: '输入清理未启用',
      description: '输入数据清理功能未启用',
      location: 'security.config.ts',
      impact: '可能导致XSS或注入攻击',
      recommendation: '启用输入数据清理功能',
      exploitability: 'medium' 
})
}
}

/**
 * 审计认证机制
 */
private async auditAuthentication(): Promise<void>  { logger.debug('开始认证机制审计');
  const globalConfig = SECURITY_CONFIG.global;

  // 检查密码强度要求
  if (globalConfig.passwordMinLength < 8) {
    this.addVulnerability({
      type: VulnerabilityType.AUTHENTICATION,
      severity: VulnerabilitySeverity.MEDIUM,
      title: '密码长度要求过低',
      description: '最小密码长度设置过低',
      location: 'security.config.ts',
      evidence: { minLength: globalConfig.passwordMinLength  
},
      impact: '弱密码容易被暴力破解',
      recommendation: '设置最小密码长度为12位或更多',
      cweId: 'CWE-521',
      exploitability: 'medium' 
})
}

  // 检查登录尝试限制
  if (globalConfig.maxLoginAttempts > 10) { this.addVulnerability({
      type: VulnerabilityType.AUTHENTICATION,
      severity: VulnerabilitySeverity.MEDIUM,
      title: '登录尝试限制过宽松',
      description: '最大登录尝试次数设置过高',
      location: 'security.config.ts',
      evidence: { maxAttempts: globalConfig.maxLoginAttempts  
},
      impact: '容易受到暴力破解攻击',
      recommendation: '将最大登录尝试次数限制在5次以内',
      exploitability: 'medium' 
})
}

  // 检查锁定时间
  if (globalConfig.lockoutDuration < 300000) { // 5分钟
  this.addVulnerability({
    type: VulnerabilityType.AUTHENTICATION,
    severity: VulnerabilitySeverity.LOW,
    title: '账户锁定时间过短',
    description: '账户锁定时间设置过短',
    location: 'security.config.ts',
    evidence: { lockoutDuration: globalConfig.lockoutDuration  
},
    impact: '攻击者可以快速重试攻击',
    recommendation: '设置至少15分钟的锁定时间',
    exploitability: 'medium' 
})
}

// 检查双因素认证
if (!globalConfig.enableTwoFactor) { this.addVulnerability({
    type: VulnerabilityType.AUTHENTICATION,
    severity: VulnerabilitySeverity.MEDIUM,
    title: '未启用双因素认证',
    description: '双因素认证功能未启用',
    location: 'security.config.ts',
    impact: '单一认证因子容易被绕过',
    recommendation: '为敏感操作启用双因素认证',
    exploitability: 'medium' 
})
}

// 检查会话超时
if (globalConfig.sessionTimeout > 7200000) { // 2小时
this.addVulnerability({
  type: VulnerabilityType.AUTHENTICATION,
  severity: VulnerabilitySeverity.LOW,
  title: '会话超时时间过长',
  description: '会话超时时间设置过长',
  location: 'security.config.ts',
  evidence: { sessionTimeout: globalConfig.sessionTimeout  
},
  impact: '增加会话劫持风险',
  recommendation: '设置合理的会话超时时间（建议1小时）',
  exploitability: 'hard' 
})
}
}

/**
 * 审计授权机制
 */
private async auditAuthorization(): Promise<void>  { logger.debug('开始授权机制审计');
  // 检查权限系统是否正确实现
  try {
    // 测试权限检查
    const testResult = await enhancedPermissionSystem.checkPermission(;
      Permission.ADMIN,
      { userId: 'test-user'  
}
    );

    if (testResult.granted) { this.addVulnerability({
        type: VulnerabilityType.AUTHORIZATION,
        severity: VulnerabilitySeverity.CRITICAL,
        title: '权限检查可能存在绕过',
        description: '测试用户获得了管理员权限',
        location: 'enhancedPermissionSystem',
        impact: '可能导致权限提升攻击',
        recommendation: '检查权限验证逻辑的正确性',
        cweId: 'CWE-269',
        exploitability: 'medium' 
})
}
  } catch (error) { // 权限检查正常抛出错误是预期行为 }

  // 检查默认权限设置
  // 这里可以添加更多权限相关的检查 }

/**
 * 审计会话管理
 */
private async auditSessionManagement(): Promise<void>  { logger.debug('开始会话管理审计');
  // 检查会话ID生成
  // 检查会话ID的随机性和唯一性
  const sessionConfig = SECURITY_CONFIG.global;

  // 检查会话超时配置
  if (sessionConfig.sessionTimeout > 3600000) { // 1小时
  this.addVulnerability({
    type: VulnerabilityType.SESSION_MANAGEMENT,
    severity: VulnerabilitySeverity.MEDIUM,
    title: '会话超时时间过长',
    description: '会话超时时间超过推荐值',
    location: 'security.config.ts',
    evidence: { sessionTimeout: sessionConfig.sessionTimeout  
},
    impact: '增加会话劫持风险',
    recommendation: '将会话超时设置为30-60分钟',
    cweId: 'CWE-613',
    exploitability: 'medium' 
})
}

// 检查会话存储安全
// 检查是否使用安全的会话存储机制
if (typeof window !== 'undefined' && window.sessionStorage) { // 检查会话存储中是否包含敏感信息
  try {
    const sessionKeys = Object.keys(sessionStorage);
    const sensitiveKeys = sessionKeys.filter(key =>;
    key.toLowerCase().includes('password') ||
    key.toLowerCase().includes('token') ||
    key.toLowerCase().includes('secret')
  );

  if (sensitiveKeys.length > 0) {
    this.addVulnerability({
      type: VulnerabilityType.SESSION_MANAGEMENT,
      severity: VulnerabilitySeverity.HIGH,
      title: '会话存储包含敏感信息',
      description: '在浏览器会话存储中发现敏感信息',
      location: 'sessionStorage',
      evidence: { sensitiveKeys  
},
      impact: '敏感信息可能被恶意脚本访问',
      recommendation: '避免在客户端存储敏感信息',
      cweId: 'CWE-922',
      exploitability: 'easy' 
})
}
} catch (error) { // 忽略访问错误 }
}

// 检查会话固定攻击防护
// 检查登录后是否重新生成会话ID
if (!sessionConfig.regenerateSessionOnLogin) { this.addVulnerability({
    type: VulnerabilityType.SESSION_MANAGEMENT,
    severity: VulnerabilitySeverity.MEDIUM,
    title: '缺少会话重新生成机制',
    description: '登录后未重新生成会话ID',
    location: 'security.config.ts',
    impact: '可能受到会话固定攻击',
    recommendation: '在用户登录后重新生成会话ID',
    cweId: 'CWE-384',
    exploitability: 'medium' 
})
}
}

/**
 * 审计加密和数据保护
 */
private async auditCryptography(): Promise<void>  { logger.debug('开始加密和数据保护审计');
  // 检查HTTPS配置
  if (!SECURITY_CONFIG.global.enableHTTPS) {
    this.addVulnerability({
      type: VulnerabilityType.CRYPTOGRAPHY,
      severity: VulnerabilitySeverity.HIGH,
      title: 'HTTPS未启用',
      description: 'HTTPS传输加密未启用',
      location: 'security.config.ts',
      impact: '数据传输可能被窃听或篡改',
      recommendation: '启用HTTPS并强制重定向',
      cweId: 'CWE-319',
      exploitability: 'easy' 
})
}

  // 检查安全头配置
  const headers = SECURITY_CONFIG.securityHeaders;

  if (!headers['Strict-Transport-Security']) { this.addVulnerability({
      type: VulnerabilityType.CRYPTOGRAPHY,
      severity: VulnerabilitySeverity.MEDIUM,
      title: '缺少HSTS头',
      description: 'HTTP严格传输安全头未设置',
      location: 'security.config.ts',
      impact: '可能受到协议降级攻击',
      recommendation: '设置Strict-Transport-Security头',
      exploitability: 'medium' 
})
}
}

/**
 * 审计注入攻击防护
 */
private async auditInjectionProtection(): Promise<void>  { logger.debug('开始注入攻击防护审计');
  // 检查SQL注入防护
  const testSQLInput = ''; DROP TABLE users; --';
  const sqlResult = securityEnhancement.detectSQLInjection(testSQLInput);

  if (!sqlResult.detected) {
    this.addVulnerability({
      type: VulnerabilityType.INJECTION,
      severity: VulnerabilitySeverity.HIGH,
      title: 'SQL注入检测可能失效',
      description: 'SQL注入检测未能识别明显的注入模式',
      location: 'securityEnhancement.ts',
      evidence: { testInput: testSQLInput  
},
      impact: '可能导致数据库被攻击',
      recommendation: '增强SQL注入检测规则',
      cweId: 'CWE-89',
      exploitability: 'medium' 
})
}

  // 检查命令注入防护
  // 检查LDAP注入防护
  // 检查NoSQL注入防护 }

/**
 * 审计XSS防护
 */
private async auditXSSProtection(): Promise<void>  { logger.debug('开始XSS防护审计');
  // 检查XSS防护配置
  const testXSSInput = '<script>alert('xss')</script>';

  try {
    const validationResult = enhancedInputValidator.validate(;
      { test: testXSSInput  
},
      {},
      { enableSecurityChecks: true  
}
    );

    if (validationResult.isValid) { this.addVulnerability({
        type: VulnerabilityType.XSS,
        severity: VulnerabilitySeverity.HIGH,
        title: 'XSS防护可能失效',
        description: 'XSS攻击载荷未被检测',
        location: 'enhancedInputValidation.ts',
        evidence: { testInput: testXSSInput  
},
        impact: '可能导致跨站脚本攻击',
        recommendation: '增强XSS检测和过滤规则',
        cweId: 'CWE-79',
        exploitability: 'easy' 
})
}
  } catch (error) { logger.error('XSS防护测试失败', error)
}

  // 检查CSP配置
  const csp = SECURITY_CONFIG.securityHeaders['Content-Security-Policy'];
  if (!csp || csp.includes(''unsafe-inline'')) { this.addVulnerability({
      type: VulnerabilityType.XSS,
      severity: VulnerabilitySeverity.MEDIUM,
      title: 'CSP配置不安全',
      description: 'Content Security Policy配置允许内联脚本',
      location: 'security.config.ts',
      evidence: { csp  
},
      impact: '降低XSS攻击防护效果',
      recommendation: '移除unsafe-inline指令，使用nonce或hash',
      exploitability: 'medium' 
})
}
}

/**
 * 审计CSRF防护
 */
private async auditCSRFProtection(): Promise<void>  { logger.debug('开始CSRF防护审计');
  // 检查CSRF令牌生成和验证
  try {
    const token = securityEnhancement.generateCSRFToken('test-user', 'test-session');
    const validation = securityEnhancement.validateCSRFToken(token, 'test-user', 'test-session');

    if (!validation.valid) {
      this.addVulnerability({
        type: VulnerabilityType.CSRF,
        severity: VulnerabilitySeverity.MEDIUM,
        title: 'CSRF令牌验证异常',
        description: '生成的CSRF令牌无法通过验证',
        location: 'securityEnhancement.ts',
        impact: '可能导致CSRF防护失效',
        recommendation: '检查CSRF令牌生成和验证逻辑',
        exploitability: 'medium' 
})
}
  } catch (error) { this.addVulnerability({
      type: VulnerabilityType.CSRF,
      severity: VulnerabilitySeverity.HIGH,
      title: 'CSRF防护系统异常',
      description: 'CSRF令牌系统运行异常',
      location: 'securityEnhancement.ts',
      evidence: { error: error instanceof Error ? error.message : String(error)  
},
      impact: 'CSRF防护可能完全失效',
      recommendation: '修复CSRF防护系统错误',
      exploitability: 'easy' 
})
}
}

/**
 * 审计安全头
 */
private async auditSecurityHeaders(): Promise<void>  { logger.debug('开始安全头审计');
  const headers = SECURITY_CONFIG.securityHeaders;
  const requiredHeaders = [;
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
    'Content-Security-Policy',
    'Referrer-Policy' ];

  for (const header of requiredHeaders) {
    if (!headers[header]) {
      this.addVulnerability({
        type: VulnerabilityType.SECURITY_HEADERS,
        severity: VulnerabilitySeverity.MEDIUM,
        title: `缺少安全头: ${header 
}`,
        description: `重要的安全头${ header 
}未设置`,
        location: 'security.config.ts',
        impact: '降低浏览器安全防护效果',
        recommendation: `设置${ header 
}安全头`,
        exploitability: 'medium' 
})
}
  }

  // 检查X-Frame-Options设置
  if (headers['X-Frame-Options'] !== 'DENY' && headers['X-Frame-Options'] !== 'SAMEORIGIN') { this.addVulnerability({
      type: VulnerabilityType.SECURITY_HEADERS,
      severity: VulnerabilitySeverity.MEDIUM,
      title: 'X-Frame-Options配置不安全',
      description: 'X-Frame-Options未设置为DENY或SAMEORIGIN',
      location: 'security.config.ts',
      evidence: { value: headers['X-Frame-Options']  
},
      impact: '可能受到点击劫持攻击',
      recommendation: '设置X-Frame-Options为DENY或SAMEORIGIN',
      exploitability: 'medium' 
})
}
}

/**
 * 审计错误处理
 */
private async auditErrorHandling(): Promise<void>  { logger.debug('开始错误处理审计');
  // 检查错误信息泄露
  // 检查错误处理是否会泄露敏感信息
  const errorConfig = SECURITY_CONFIG.global;

  if (errorConfig.showDetailedErrors && process.env.NODE_ENV === 'production') {
    this.addVulnerability({
      type: VulnerabilityType.ERROR_HANDLING,
      severity: VulnerabilitySeverity.MEDIUM,
      title: '生产环境显示详细错误信息',
      description: '在生产环境中启用了详细错误信息显示',
      location: 'security.config.ts',
      impact: '可能泄露系统内部信息',
      recommendation: '在生产环境中禁用详细错误信息',
      cweId: 'CWE-209',
      exploitability: 'easy' 
})
}

  // 检查错误日志记录
  // 检查是否正确记录安全相关错误
  if (!errorConfig.enableSecurityLogging) { this.addVulnerability({
      type: VulnerabilityType.ERROR_HANDLING,
      severity: VulnerabilitySeverity.LOW,
      title: '安全日志记录未启用',
      description: '安全相关事件的日志记录未启用',
      location: 'security.config.ts',
      impact: '难以检测和响应安全事件',
      recommendation: '启用安全事件日志记录',
      exploitability: 'hard' 
})
}

  // 检查错误处理的一致性
  try { // 模拟错误处理测试
    const testError = new Error('测试错误');
    // 这里可以测试错误处理系统的响应 } catch (error) { // 检查错误处理是否一致 }
}

/**
 * 审计数据暴露
 */
private async auditDataExposure(): Promise<void>  { logger.debug('开始数据暴露审计');
  // 检查敏感数据处理
  const dataProtectionConfig = SECURITY_CONFIG.dataProtection;

  if (!dataProtectionConfig.enableEncryption) {
    this.addVulnerability({
      type: VulnerabilityType.DATA_EXPOSURE,
      severity: VulnerabilitySeverity.HIGH,
      title: '数据加密未启用',
      description: '敏感数据加密功能未启用',
      location: 'security.config.ts',
      impact: '敏感数据可能以明文形式存储或传输',
      recommendation: '启用数据加密功能',
      cweId: 'CWE-311',
      exploitability: 'medium' 
})
}

  // 检查日志中是否包含敏感信息
  if (!dataProtectionConfig.sanitizeLogs) { this.addVulnerability({
      type: VulnerabilityType.DATA_EXPOSURE,
      severity: VulnerabilitySeverity.MEDIUM,
      title: '日志清理未启用',
      description: '日志中可能包含敏感信息',
      location: 'security.config.ts',
      impact: '敏感信息可能通过日志泄露',
      recommendation: '启用日志敏感信息清理功能',
      cweId: 'CWE-532',
      exploitability: 'medium' 
})
}

  // 检查API响应是否暴露敏感数据
  if (!dataProtectionConfig.filterSensitiveFields) { this.addVulnerability({
      type: VulnerabilityType.DATA_EXPOSURE,
      severity: VulnerabilitySeverity.MEDIUM,
      title: 'API响应未过滤敏感字段',
      description: 'API响应可能包含敏感信息',
      location: 'security.config.ts',
      impact: '敏感数据可能通过API响应泄露',
      recommendation: '实施API响应敏感字段过滤',
      cweId: 'CWE-200',
      exploitability: 'easy' 
})
}

  // 检查数据备份安全
  if (!dataProtectionConfig.secureBackups) { this.addVulnerability({
      type: VulnerabilityType.DATA_EXPOSURE,
      severity: VulnerabilitySeverity.MEDIUM,
      title: '数据备份安全措施不足',
      description: '数据备份未采用安全措施',
      location: 'security.config.ts',
      impact: '备份数据可能被未授权访问',
      recommendation: '对数据备份实施加密和访问控制',
      exploitability: 'medium' 
})
}
}

/**
 * 审计业务逻辑
 */
private async auditBusinessLogic(): Promise<void>  { logger.debug('开始业务逻辑审计');
  // 检查业务逻辑漏洞
  const businessConfig = SECURITY_CONFIG.businessLogic;

  // 检查权限绕过可能性
  if (!businessConfig.enableStrictValidation) {
    this.addVulnerability({
      type: VulnerabilityType.BUSINESS_LOGIC,
      severity: VulnerabilitySeverity.MEDIUM,
      title: '业务逻辑验证不严格',
      description: '业务逻辑验证可能存在绕过风险',
      location: 'security.config.ts',
      impact: '可能导致业务规则被绕过',
      recommendation: '启用严格的业务逻辑验证',
      cweId: 'CWE-840',
      exploitability: 'medium' 
})
}

  // 检查竞态条件
  if (!businessConfig.enableConcurrencyControl) { this.addVulnerability({
      type: VulnerabilityType.BUSINESS_LOGIC,
      severity: VulnerabilitySeverity.MEDIUM,
      title: '缺少并发控制机制',
      description: '业务操作缺少并发控制',
      location: 'security.config.ts',
      impact: '可能导致竞态条件攻击',
      recommendation: '实施适当的并发控制机制',
      cweId: 'CWE-362',
      exploitability: 'hard' 
})
}

  // 检查业务流程完整性
  if (!businessConfig.validateWorkflow) { this.addVulnerability({
      type: VulnerabilityType.BUSINESS_LOGIC,
      severity: VulnerabilitySeverity.LOW,
      title: '业务流程验证不完整',
      description: '业务流程的完整性验证不足',
      location: 'security.config.ts',
      impact: '可能导致业务流程被恶意操控',
      recommendation: '加强业务流程完整性验证',
      exploitability: 'medium' 
})
}

  // 检查数据一致性验证
  if (!businessConfig.enforceDataConsistency) { this.addVulnerability({
      type: VulnerabilityType.BUSINESS_LOGIC,
      severity: VulnerabilitySeverity.MEDIUM,
      title: '数据一致性验证不足',
      description: '缺少数据一致性验证机制',
      location: 'security.config.ts',
      impact: '可能导致数据不一致或损坏',
      recommendation: '实施数据一致性验证机制',
      exploitability: 'medium' 
})
}

  // 检查业务限制执行
  if (!businessConfig.enforceBusinessLimits) { this.addVulnerability({
      type: VulnerabilityType.BUSINESS_LOGIC,
      severity: VulnerabilitySeverity.LOW,
      title: '业务限制执行不严格',
      description: '业务操作限制可能被绕过',
      location: 'security.config.ts',
      impact: '可能导致业务规则被违反',
      recommendation: '严格执行业务操作限制',
      exploitability: 'medium' 
})
}
}

/**
 * 添加漏洞
 */
private addVulnerability(vulnerability: Omit<SecurityVulnerability, 'id' | 'detectedAt'>): void { const fullVulnerability: SecurityVulnerability =  {
    id: this.generateVulnerabilityId(),
    detectedAt: new Date().toISOString(),
    ...vulnerability  };

  this.vulnerabilities.push(fullVulnerability)
}

/**
 * 生成审计结果
 */
private generateAuditResult(auditId: string, timestamp: string): SecurityAuditResult  { const summary = this.calculateSummary();
  const overallScore = this.calculateOverallScore();
  const riskLevel = this.calculateRiskLevel(overallScore);
  const categories = this.categorizeVulnerabilities();
  const complianceStatus = this.assessCompliance();
  const recommendations = this.generateRecommendations();

  return {
    auditId,
    timestamp,
    overallScore,
    riskLevel,
    vulnerabilities: this.vulnerabilities,
    summary,
    categories,
    complianceStatus,
    recommendations,
    nextAuditDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30天后 
}
}

/**
 * 计算摘要统计
 */
private calculateSummary() { return  {
    totalVulnerabilities: this.vulnerabilities.length,
    criticalCount: this.vulnerabilities.filter(v => v.severity === VulnerabilitySeverity.CRITICAL).length,
    highCount: this.vulnerabilities.filter(v => v.severity === VulnerabilitySeverity.HIGH).length,
    mediumCount: this.vulnerabilities.filter(v => v.severity === VulnerabilitySeverity.MEDIUM).length,
    lowCount: this.vulnerabilities.filter(v => v.severity === VulnerabilitySeverity.LOW).length,
    infoCount: this.vulnerabilities.filter(v => v.severity === VulnerabilitySeverity.INFO).length
}
}

/**
 * 计算总体安全评分
 */
private calculateOverallScore(): number  { if (this.vulnerabilities.length === 0) return 100;
  const weights = {
    [VulnerabilitySeverity.CRITICAL]: 25,
    [VulnerabilitySeverity.HIGH]: 15,
    [VulnerabilitySeverity.MEDIUM]: 8,
    [VulnerabilitySeverity.LOW]: 3,
    [VulnerabilitySeverity.INFO]: 1  
};

  const totalDeduction = this.vulnerabilities.reduce((sum, vuln) => {
  return sum + weights[vuln.severity]
}, 0);

  return Math.max(0, 100 - totalDeduction)

}

/**
 * 计算风险级别
 */
private calculateRiskLevel(score: number): 'low' | 'medium' | 'high' | 'critical'  { if (score >= 80) return 'low';
  if (score >= 60) return 'medium';
  if (score >= 40) return 'high';
  return 'critical'
}

/**
 * 按类型分类漏洞
 */
private categorizeVulnerabilities() { const categories =  { } as SecurityAuditResult['categories'];
  for (const type of Object.values(VulnerabilityType)) { const typeVulns = this.vulnerabilities.filter(v => v.type === type);
    const score = this.calculateCategoryScore(typeVulns);

    categories[type] = {
      score,
      vulnerabilities: typeVulns,
      recommendations: this.generateCategoryRecommendations(type, typeVulns) }
}

  return categories
}

/**
 * 计算分类评分
 */
private calculateCategoryScore(vulnerabilities: SecurityVulnerability[]): number  { if (vulnerabilities.length === 0) return 100;
  const weights = {
    [VulnerabilitySeverity.CRITICAL]: 40,
    [VulnerabilitySeverity.HIGH]: 25,
    [VulnerabilitySeverity.MEDIUM]: 15,
    [VulnerabilitySeverity.LOW]: 5,
    [VulnerabilitySeverity.INFO]: 2  
};

  const totalDeduction = vulnerabilities.reduce((sum, vuln) => {
  return sum + weights[vuln.severity]
}, 0);

  return Math.max(0, 100 - totalDeduction)

}

/**
 * 生成分类建议
 */
private generateCategoryRecommendations(
  type: VulnerabilityType,
  vulnerabilities: SecurityVulnerability[]
): string[] { if (vulnerabilities.length === 0) return [];

  const recommendations = new Set<string>();
  vulnerabilities.forEach(vuln => {
  recommendations.add(vuln.recommendation)
});

  return Array.from(recommendations)

}

/**
 * 评估合规性
 */
private assessCompliance()  { const owaspIssues: string[] = [];
  const gdprIssues: string[] = [];
  const iso27001Issues: string[] = [];

  // OWASP Top 10 检查
  const owaspVulns = this.vulnerabilities.filter(v =>;
  [VulnerabilityType.INJECTION, VulnerabilityType.AUTHENTICATION,
  VulnerabilityType.XSS, VulnerabilityType.AUTHORIZATION].includes(v.type)
);

if (owaspVulns.length > 0) {
  owaspIssues.push(`发现${owaspVulns.length }个OWASP Top 10相关漏洞`)
}

// GDPR 合规检查
const dataProtectionVulns = this.vulnerabilities.filter(v =>;
[VulnerabilityType.DATA_EXPOSURE, VulnerabilityType.CRYPTOGRAPHY].includes(v.type)
);

const gdprCompliant = dataProtectionVulns.length === 0;
if (!gdprCompliant) { gdprIssues.push('数据保护措施不足')
}

// ISO 27001 检查
const securityManagementVulns = this.vulnerabilities.filter(v =>;
v.severity === VulnerabilitySeverity.CRITICAL || v.severity === VulnerabilitySeverity.HIGH;
);

const iso27001Score = Math.max(0, 100 - securityManagementVulns.length * 10);
if (iso27001Score < 80) { iso27001Issues.push('安全管理体系存在重大缺陷')
}

return { owasp: {
    score: Math.max(0, 100 - owaspVulns.length * 15),
    issues: owaspIssues 
},
  gdpr: { compliant: gdprCompliant,
    issues: gdprIssues 
},
  iso27001: { score: iso27001Score,
    issues: iso27001Issues 
}
}
}

/**
 * 生成建议措施
 */
private generateRecommendations()  { const immediate: string[] = [];
  const shortTerm: string[] = [];
  const longTerm: string[] = [];

  const criticalVulns = this.vulnerabilities.filter(v => v.severity === VulnerabilitySeverity.CRITICAL);
  const highVulns = this.vulnerabilities.filter(v => v.severity === VulnerabilitySeverity.HIGH);
  const mediumVulns = this.vulnerabilities.filter(v => v.severity === VulnerabilitySeverity.MEDIUM);

  // 立即行动项（关键漏洞）
  criticalVulns.forEach(vuln => {
  immediate.push(vuln.recommendation)

});

  // 短期目标（高危漏洞）
  highVulns.forEach(vuln => {
  shortTerm.push(vuln.recommendation)

});

  // 长期目标（中危漏洞）
  mediumVulns.forEach(vuln => {
  longTerm.push(vuln.recommendation)

});

  // 通用建议
  if (this.vulnerabilities.length > 10) { immediate.push('建立定期安全审计流程')
}

  if (criticalVulns.length > 0) { immediate.push('立即修复所有关键安全漏洞')
}

  return { immediate: Array.from(new Set(immediate)),
    shortTerm: Array.from(new Set(shortTerm)),
    longTerm: Array.from(new Set(longTerm)) 
}
}

/**
 * 生成审计ID
 */
private generateAuditId(): string { return `audit_${Date.now() 
}_$ { Math.random().toString(36).substr(2, 9) }`
}
/**
 * 生成漏洞ID
 */
private generateVulnerabilityId(): string { return `vuln_${Date.now() 
}_$ { Math.random().toString(36).substr(2, 9) }`
}
/**
* 导出审计报告
* @param result - 审计结果
* @param format - 导出格式
* @returns 报告内容
 */
public exportReport(
  result: SecurityAuditResult,
  format: 'json' | 'html' | 'pdf' = 'json';
): string { switch (format) {
    case 'json':
    return JSON.stringify(result, null, 2);

    case 'html':
    return this.generateHTMLReport(result);

    case 'pdf':
    // PDF生成需要额外的库支持
    throw new Error('PDF导出功能暂未实现');

    default: throw new Error(`不支持的导出格式: ${format 
}`)
}
}

/**
 * 生成HTML报告
 */
private generateHTMLReport(result: SecurityAuditResult): string  { return `;
  <!DOCTYPE html>
  <html lang='zh-CN'>;
  <head>
  <meta charset='UTF-8'>;
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>;
  <title>安全审计报告 - ${result.auditId }</title>
  <style>
  body { font-family: Arial, sans-serif; margin: 20px
}
  .header { background: #f5f5f5; padding: 20px; border-radius: 5px
}
  .summary { display: flex; gap: 20px; margin: 20px 0
}
  .metric { background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px; flex: 1
}
  .vulnerability { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 5px
}
  .critical { border-left: 5px solid #d32f2f
}
  .high { border-left: 5px solid #f57c00
}
  .medium { border-left: 5px solid #fbc02d
}
  .low { border-left: 5px solid #388e3c
}
  .recommendations { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0
}
  </style>
  </head>
  <body>
  <div class='header'>;
  <h1>安全审计报告</h1>
  <p><strong>审计ID: </strong> ${ result.auditId 
}</p>
  <p><strong>生成时间: </strong> ${ new Date(result.timestamp).toLocaleString() 
}</p>
  <p><strong>总体评分: </strong> ${ result.overallScore 
}/100</p>
  <p><strong>风险级别: </strong> ${ result.riskLevel 
}</p>
  </div>

  <div class='summary'>;
  <div class='metric'>;
  <h3>漏洞统计</h3>
  <p>总计: ${ result.summary.totalVulnerabilities 
}</p>
  <p>关键: ${ result.summary.criticalCount 
}</p>
  <p>高危: ${ result.summary.highCount 
}</p>
  <p>中危: ${ result.summary.mediumCount 
}</p>
  <p>低危: ${ result.summary.lowCount 
}</p>
  </div>

  <div class='metric'>;
  <h3>合规性状态</h3>
  <p>OWASP: ${ result.complianceStatus.owasp.score 
}/100</p>
  <p>GDPR: ${ result.complianceStatus.gdpr.compliant ? '合规' : '不合规' 
}</p>
  <p>ISO 27001: ${ result.complianceStatus.iso27001.score 
}/100</p>
  </div>
  </div>

  <h2>发现的漏洞</h2>
  ${ result.vulnerabilities.map(vuln => `;
  <div class='vulnerability ${vuln.severity }'>;
  <h3>${ vuln.title }</h3>
  <p><strong>严重级别: </strong> ${ vuln.severity 
}</p>
  <p><strong>类型: </strong> ${ vuln.type 
}</p>
  <p><strong>位置: </strong> ${ vuln.location 
}</p>
  <p><strong>描述: </strong> ${ vuln.description 
}</p>
  <p><strong>影响: </strong> ${ vuln.impact 
}</p>
  <p><strong>建议: </strong> ${ vuln.recommendation 
}</p>
  </div>
  `).join('')}

  <div class='recommendations'>;
  <h2>修复建议</h2>
  <h3>立即行动</h3>
  <ul>
  ${ result.recommendations.immediate.map(rec => `<li>${rec }</li>`).join('')}
  </ul>

  <h3>短期目标</h3>
  <ul>
  ${ result.recommendations.shortTerm.map(rec => `<li>${rec }</li>`).join('')}
  </ul>

  <h3>长期目标</h3>
  <ul>
  ${ result.recommendations.longTerm.map(rec => `<li>${rec }</li>`).join('')}
  </ul>
  </div>
  </body>
  </html>`
}
}

// 创建全局实例
export const comprehensiveSecurityAudit = ComprehensiveSecurityAudit.getInstance();

// 导出类型
export type { SecurityVulnerability,
  SecurityAuditResult,
  AuditConfig  };