/**
 * 文件级注释：安全增强功能集成测试
 * 
 * 该文件包含对安全增强系统的全面集成测试，验证：
 * - 权限控制系统
 * - 安全审计功能
 * - 输入验证机制
 * - API安全防护
 * - 数据加密和脱敏
 * - 安全策略执行
 * 
 * 测试覆盖：
 * - 基于角色的访问控制(RBAC)
 * - 权限验证中间件
 * - 安全审计日志
 * - 输入过滤和验证
 * - XSS和CSRF防护
 * - 数据泄露防护
 * 
 * @author SOLO Coding
 * @version 3.0.0
 */

import { describe, it, expect, beforeEach, afterEach, vi, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import React from 'react';

// 导入被测试的模块
import { ComprehensiveSecurityAudit } from '@/utils/comprehensiveSecurityAudit';
import { PermissionManager } from '@/utils/permissionManager';
import { usePermissions } from '@/hooks/usePermissions';
import { SecurityMiddleware } from '@/middleware/securityMiddleware';
import { InputValidator } from '@/utils/inputValidator';
import { DataEncryption } from '@/utils/dataEncryption';

/**
 * 接口注释：安全测试配置
 */
interface SecurityTestConfig {
  testType: 'permission' | 'audit' | 'validation' | 'encryption' | 'middleware';
  scenario: string;
  expectedResult: 'allow' | 'deny' | 'log' | 'encrypt' | 'validate';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  testData: Record<string, any>;
}

/**
 * 接口注释：权限测试用户
 */
interface TestUser {
  id: string;
  username: string;
  roles: string[];
  permissions: string[];
  isActive: boolean;
  lastLogin?: number;
  securityLevel: number;
}

/**
 * 接口注释：安全审计事件
 */
interface SecurityAuditEvent {
  eventType: string;
  userId: string;
  resource: string;
  action: string;
  result: 'success' | 'failure' | 'blocked';
  riskScore: number;
  timestamp: number;
  metadata: Record<string, any>;
}

/**
 * 类级注释：安全增强功能集成测试套件
 * 
 * 提供全面的安全系统测试，包含：
 * - 权限控制验证
 * - 安全审计测试
 * - 输入验证测试
 * - 数据保护测试
 * - 安全策略测试
 */
describe('安全增强功能集成测试', () => {
  let securityAudit: ComprehensiveSecurityAudit;
  let permissionManager: PermissionManager;
  let inputValidator: InputValidator;
  let dataEncryption: DataEncryption;
  let mockAuditLogger: any;
  let testUsers: TestUser[];
  let securityTestConfigs: SecurityTestConfig[];

  /**
   * 函数级注释：测试前置设置
   */
  beforeAll(() => {
    // 模拟审计日志
    mockAuditLogger = vi.fn();
    
    // 模拟加密服务
    Object.defineProperty(window, 'crypto', {
      value: {
        getRandomValues: vi.fn().mockImplementation((arr) => {
          for (let i = 0; i < arr.length; i++) {
            arr[i] = Math.floor(Math.random() * 256);
          }
          return arr;
        }),
        subtle: {
          encrypt: vi.fn().mockResolvedValue(new ArrayBuffer(32)),
          decrypt: vi.fn().mockResolvedValue(new ArrayBuffer(32)),
          generateKey: vi.fn().mockResolvedValue({}),
          importKey: vi.fn().mockResolvedValue({})
        }
      },
      writable: true
    });

    // 模拟本地存储
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  /**
   * 函数级注释：每个测试前的设置
   */
  beforeEach(() => {
    // 初始化安全组件
    securityAudit = ComprehensiveSecurityAudit.getInstance();
    permissionManager = PermissionManager.getInstance();
    inputValidator = new InputValidator();
    dataEncryption = new DataEncryption();

    // 清除所有模拟调用
    vi.clearAllMocks();

    // 定义测试用户
    testUsers = [
      {
        id: 'admin-001',
        username: 'admin',
        roles: ['admin', 'moderator'],
        permissions: ['read', 'write', 'delete', 'manage_users', 'view_audit'],
        isActive: true,
        securityLevel: 5
      },
      {
        id: 'mod-001',
        username: 'moderator',
        roles: ['moderator'],
        permissions: ['read', 'write', 'moderate_content'],
        isActive: true,
        securityLevel: 3
      },
      {
        id: 'user-001',
        username: 'regular_user',
        roles: ['user'],
        permissions: ['read'],
        isActive: true,
        securityLevel: 1
      },
      {
        id: 'guest-001',
        username: 'guest',
        roles: ['guest'],
        permissions: [],
        isActive: true,
        securityLevel: 0
      },
      {
        id: 'banned-001',
        username: 'banned_user',
        roles: ['user'],
        permissions: ['read'],
        isActive: false,
        securityLevel: 0
      }
    ];

    // 定义安全测试配置
    securityTestConfigs = [
      {
        testType: 'permission',
        scenario: '管理员访问用户管理',
        expectedResult: 'allow',
        riskLevel: 'low',
        testData: { userId: 'admin-001', resource: 'users', action: 'manage' }
      },
      {
        testType: 'permission',
        scenario: '普通用户尝试删除数据',
        expectedResult: 'deny',
        riskLevel: 'high',
        testData: { userId: 'user-001', resource: 'data', action: 'delete' }
      },
      {
        testType: 'validation',
        scenario: 'SQL注入攻击检测',
        expectedResult: 'deny',
        riskLevel: 'critical',
        testData: { input: "'; DROP TABLE users; --" }
      },
      {
        testType: 'validation',
        scenario: 'XSS攻击检测',
        expectedResult: 'deny',
        riskLevel: 'high',
        testData: { input: '<script>alert("xss")</script>' }
      },
      {
        testType: 'encryption',
        scenario: '敏感数据加密',
        expectedResult: 'encrypt',
        riskLevel: 'medium',
        testData: { data: '用户密码123456', type: 'password' }
      }
    ];

    // 初始化权限管理器
    testUsers.forEach(user => {
      permissionManager.setUserPermissions(user.id, user.permissions);
      permissionManager.setUserRoles(user.id, user.roles);
    });
  });

  /**
   * 函数级注释：每个测试后的清理
   */
  afterEach(() => {
    vi.clearAllTimers();
    permissionManager.reset();
    securityAudit.reset();
  });

  /**
   * 函数级注释：测试后置清理
   */
  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('权限控制系统测试', () => {
    /**
     * 函数级注释：测试基于角色的访问控制
     */
    it('应该正确执行基于角色的访问控制', async () => {
      // 测试管理员权限
      const adminAccess = await permissionManager.checkPermission(
        'admin-001',
        'users',
        'manage'
      );
      expect(adminAccess).toBe(true);

      // 测试普通用户权限
      const userAccess = await permissionManager.checkPermission(
        'user-001',
        'users',
        'manage'
      );
      expect(userAccess).toBe(false);

      // 测试访客权限
      const guestAccess = await permissionManager.checkPermission(
        'guest-001',
        'content',
        'read'
      );
      expect(guestAccess).toBe(false);
    });

    /**
     * 函数级注释：测试权限继承
     */
    it('应该正确处理权限继承', async () => {
      // 设置角色层次结构
      permissionManager.setRoleHierarchy({
        'admin': ['moderator', 'user'],
        'moderator': ['user'],
        'user': ['guest']
      });

      // 测试权限继承
      const adminCanRead = await permissionManager.checkPermission(
        'admin-001',
        'content',
        'read'
      );
      expect(adminCanRead).toBe(true);

      const modCanRead = await permissionManager.checkPermission(
        'mod-001',
        'content',
        'read'
      );
      expect(modCanRead).toBe(true);
    });

    /**
     * 函数级注释：测试动态权限更新
     */
    it('应该支持动态权限更新', async () => {
      // 初始权限检查
      let canWrite = await permissionManager.checkPermission(
        'user-001',
        'content',
        'write'
      );
      expect(canWrite).toBe(false);

      // 动态添加权限
      permissionManager.grantPermission('user-001', 'write');

      // 重新检查权限
      canWrite = await permissionManager.checkPermission(
        'user-001',
        'content',
        'write'
      );
      expect(canWrite).toBe(true);

      // 撤销权限
      permissionManager.revokePermission('user-001', 'write');

      // 再次检查权限
      canWrite = await permissionManager.checkPermission(
        'user-001',
        'content',
        'write'
      );
      expect(canWrite).toBe(false);
    });

    /**
     * 函数级注释：测试权限缓存
     */
    it('应该正确缓存权限检查结果', async () => {
      const startTime = performance.now();

      // 第一次权限检查
      await permissionManager.checkPermission('admin-001', 'users', 'manage');
      const firstCheckTime = performance.now() - startTime;

      const secondStartTime = performance.now();

      // 第二次相同权限检查（应该使用缓存）
      await permissionManager.checkPermission('admin-001', 'users', 'manage');
      const secondCheckTime = performance.now() - secondStartTime;

      // 缓存的检查应该更快
      expect(secondCheckTime).toBeLessThan(firstCheckTime);
    });
  });

  describe('安全审计系统测试', () => {
    /**
     * 函数级注释：测试安全事件记录
     */
    it('应该记录所有安全相关事件', async () => {
      const auditEvent: SecurityAuditEvent = {
        eventType: 'permission_check',
        userId: 'user-001',
        resource: 'admin_panel',
        action: 'access',
        result: 'blocked',
        riskScore: 8,
        timestamp: Date.now(),
        metadata: {
          userAgent: 'test-agent',
          ipAddress: '192.168.1.1',
          reason: 'insufficient_permissions'
        }
      };

      await securityAudit.logSecurityEvent(auditEvent);

      // 验证事件被记录
      const auditLogs = securityAudit.getAuditLogs({
        userId: 'user-001',
        eventType: 'permission_check'
      });

      expect(auditLogs).toHaveLength(1);
      expect(auditLogs[0]).toMatchObject(auditEvent);
    });

    /**
     * 函数级注释：测试风险评分计算
     */
    it('应该正确计算安全风险评分', async () => {
      const highRiskEvent = {
        eventType: 'failed_login',
        userId: 'user-001',
        resource: 'authentication',
        action: 'login',
        result: 'failure' as const,
        riskScore: 0, // 将被计算
        timestamp: Date.now(),
        metadata: {
          attemptCount: 5,
          ipAddress: '192.168.1.1',
          userAgent: 'suspicious-agent'
        }
      };

      const riskScore = await securityAudit.calculateRiskScore(highRiskEvent);
      expect(riskScore).toBeGreaterThan(7); // 高风险评分

      const lowRiskEvent = {
        ...highRiskEvent,
        result: 'success' as const,
        metadata: {
          attemptCount: 1,
          ipAddress: '192.168.1.1',
          userAgent: 'normal-agent'
        }
      };

      const lowRiskScore = await securityAudit.calculateRiskScore(lowRiskEvent);
      expect(lowRiskScore).toBeLessThan(3); // 低风险评分
    });

    /**
     * 函数级注释：测试异常行为检测
     */
    it('应该检测异常用户行为', async () => {
      // 模拟异常行为：短时间内大量失败登录
      const failedAttempts = Array(10).fill(null).map((_, index) => ({
        eventType: 'failed_login',
        userId: 'user-001',
        resource: 'authentication',
        action: 'login',
        result: 'failure' as const,
        riskScore: 5,
        timestamp: Date.now() + index * 1000,
        metadata: { attemptCount: index + 1 }
      }));

      for (const attempt of failedAttempts) {
        await securityAudit.logSecurityEvent(attempt);
      }

      // 检测异常行为
      const anomalies = await securityAudit.detectAnomalies('user-001');
      expect(anomalies).toHaveLength(1);
      expect(anomalies[0].type).toBe('brute_force_attack');
    });

    /**
     * 函数级注释：测试安全报告生成
     */
    it('应该生成详细的安全报告', async () => {
      // 记录多种安全事件
      const events = [
        {
          eventType: 'permission_check',
          userId: 'admin-001',
          resource: 'users',
          action: 'read',
          result: 'success' as const,
          riskScore: 1,
          timestamp: Date.now(),
          metadata: {}
        },
        {
          eventType: 'data_access',
          userId: 'user-001',
          resource: 'sensitive_data',
          action: 'read',
          result: 'blocked' as const,
          riskScore: 7,
          timestamp: Date.now(),
          metadata: {}
        }
      ];

      for (const event of events) {
        await securityAudit.logSecurityEvent(event);
      }

      // 生成安全报告
      const report = await securityAudit.generateSecurityReport({
        startDate: Date.now() - 24 * 60 * 60 * 1000, // 24小时前
        endDate: Date.now(),
        includeRiskAnalysis: true
      });

      expect(report.totalEvents).toBe(2);
      expect(report.riskDistribution).toBeDefined();
      expect(report.topRiskyUsers).toBeDefined();
      expect(report.securityRecommendations).toBeDefined();
    });
  });

  describe('输入验证系统测试', () => {
    /**
     * 函数级注释：测试SQL注入防护
     */
    it('应该检测和阻止SQL注入攻击', () => {
      const maliciousInputs = [
        "'; DROP TABLE users; --",
        "1' OR '1'='1",
        "admin'--",
        "1; DELETE FROM users WHERE 1=1; --",
        "' UNION SELECT * FROM passwords --"
      ];

      maliciousInputs.forEach(input => {
        const result = inputValidator.validateInput(input, 'sql');
        expect(result.isValid).toBe(false);
        expect(result.threats).toContain('sql_injection');
      });
    });

    /**
     * 函数级注释：测试XSS攻击防护
     */
    it('应该检测和阻止XSS攻击', () => {
      const xssInputs = [
        '<script>alert("xss")</script>',
        '<img src="x" onerror="alert(1)">',
        'javascript:alert("xss")',
        '<svg onload="alert(1)">',
        '<iframe src="javascript:alert(1)"></iframe>'
      ];

      xssInputs.forEach(input => {
        const result = inputValidator.validateInput(input, 'html');
        expect(result.isValid).toBe(false);
        expect(result.threats).toContain('xss');
      });
    });

    /**
     * 函数级注释：测试CSRF防护
     */
    it('应该验证CSRF令牌', () => {
      const validToken = inputValidator.generateCSRFToken();
      const invalidToken = 'invalid-token';

      // 验证有效令牌
      const validResult = inputValidator.validateCSRFToken(validToken);
      expect(validResult).toBe(true);

      // 验证无效令牌
      const invalidResult = inputValidator.validateCSRFToken(invalidToken);
      expect(invalidResult).toBe(false);
    });

    /**
     * 函数级注释：测试输入清理
     */
    it('应该正确清理用户输入', () => {
      const dirtyInput = '<script>alert("xss")</script>Hello <b>World</b>';
      const cleanedInput = inputValidator.sanitizeInput(dirtyInput, {
        allowedTags: ['b', 'i', 'em', 'strong'],
        allowedAttributes: {}
      });

      expect(cleanedInput).not.toContain('<script>');
      expect(cleanedInput).toContain('<b>World</b>');
      expect(cleanedInput).toContain('Hello');
    });

    /**
     * 函数级注释：测试文件上传验证
     */
    it('应该验证文件上传安全性', () => {
      const validFile = {
        name: 'document.pdf',
        type: 'application/pdf',
        size: 1024 * 1024, // 1MB
        content: new ArrayBuffer(1024)
      };

      const maliciousFile = {
        name: 'malware.exe',
        type: 'application/x-executable',
        size: 10 * 1024 * 1024, // 10MB
        content: new ArrayBuffer(1024)
      };

      const validResult = inputValidator.validateFileUpload(validFile);
      expect(validResult.isValid).toBe(true);

      const maliciousResult = inputValidator.validateFileUpload(maliciousFile);
      expect(maliciousResult.isValid).toBe(false);
      expect(maliciousResult.threats).toContain('dangerous_file_type');
    });
  });

  describe('数据加密和保护测试', () => {
    /**
     * 函数级注释：测试敏感数据加密
     */
    it('应该正确加密敏感数据', async () => {
      const sensitiveData = '用户密码123456';
      
      const encryptedData = await dataEncryption.encrypt(sensitiveData);
      expect(encryptedData).not.toBe(sensitiveData);
      expect(encryptedData.length).toBeGreaterThan(0);

      const decryptedData = await dataEncryption.decrypt(encryptedData);
      expect(decryptedData).toBe(sensitiveData);
    });

    /**
     * 函数级注释：测试数据脱敏
     */
    it('应该正确脱敏敏感信息', () => {
      const testData = {
        email: 'user@example.com',
        phone: '13812345678',
        idCard: '123456789012345678',
        creditCard: '1234567890123456'
      };

      const maskedData = dataEncryption.maskSensitiveData(testData);

      expect(maskedData.email).toBe('u***@example.com');
      expect(maskedData.phone).toBe('138****5678');
      expect(maskedData.idCard).toBe('123456*****345678');
      expect(maskedData.creditCard).toBe('1234****3456');
    });

    /**
     * 函数级注释：测试密钥管理
     */
    it('应该安全管理加密密钥', async () => {
      // 生成新密钥
      const keyId = await dataEncryption.generateKey();
      expect(keyId).toBeDefined();

      // 验证密钥存在
      const keyExists = await dataEncryption.keyExists(keyId);
      expect(keyExists).toBe(true);

      // 轮换密钥
      const newKeyId = await dataEncryption.rotateKey(keyId);
      expect(newKeyId).not.toBe(keyId);

      // 删除旧密钥
      await dataEncryption.deleteKey(keyId);
      const oldKeyExists = await dataEncryption.keyExists(keyId);
      expect(oldKeyExists).toBe(false);
    });

    /**
     * 函数级注释：测试数据完整性验证
     */
    it('应该验证数据完整性', async () => {
      const originalData = '重要数据内容';
      
      // 生成数据签名
      const signature = await dataEncryption.sign(originalData);
      expect(signature).toBeDefined();

      // 验证数据完整性
      const isValid = await dataEncryption.verify(originalData, signature);
      expect(isValid).toBe(true);

      // 验证被篡改的数据
      const tamperedData = '被篡改的数据';
      const isTamperedValid = await dataEncryption.verify(tamperedData, signature);
      expect(isTamperedValid).toBe(false);
    });
  });

  describe('安全中间件测试', () => {
    /**
     * 函数级注释：测试请求限流
     */
    it('应该实施请求限流', async () => {
      const middleware = new SecurityMiddleware();
      const mockRequest = {
        ip: '192.168.1.1',
        headers: { 'user-agent': 'test-agent' },
        url: '/api/test'
      };

      // 正常请求应该通过
      let result = await middleware.rateLimitCheck(mockRequest);
      expect(result.allowed).toBe(true);

      // 超过限制的请求应该被阻止
      for (let i = 0; i < 100; i++) {
        await middleware.rateLimitCheck(mockRequest);
      }

      result = await middleware.rateLimitCheck(mockRequest);
      expect(result.allowed).toBe(false);
      expect(result.reason).toBe('rate_limit_exceeded');
    });

    /**
     * 函数级注释：测试IP白名单/黑名单
     */
    it('应该正确处理IP白名单和黑名单', async () => {
      const middleware = new SecurityMiddleware();

      // 添加IP到黑名单
      middleware.addToBlacklist('192.168.1.100');

      const blacklistedRequest = {
        ip: '192.168.1.100',
        headers: {},
        url: '/api/test'
      };

      const result = await middleware.ipFilterCheck(blacklistedRequest);
      expect(result.allowed).toBe(false);
      expect(result.reason).toBe('ip_blacklisted');

      // 添加IP到白名单
      middleware.addToWhitelist('192.168.1.1');

      const whitelistedRequest = {
        ip: '192.168.1.1',
        headers: {},
        url: '/api/test'
      };

      const whitelistResult = await middleware.ipFilterCheck(whitelistedRequest);
      expect(whitelistResult.allowed).toBe(true);
    });

    /**
     * 函数级注释：测试请求头验证
     */
    it('应该验证请求头安全性', async () => {
      const middleware = new SecurityMiddleware();

      const suspiciousRequest = {
        ip: '192.168.1.1',
        headers: {
          'user-agent': 'sqlmap/1.0',
          'x-forwarded-for': '127.0.0.1',
          'referer': 'http://malicious-site.com'
        },
        url: '/api/test'
      };

      const result = await middleware.headerSecurityCheck(suspiciousRequest);
      expect(result.allowed).toBe(false);
      expect(result.threats).toContain('suspicious_user_agent');
    });

    /**
     * 函数级注释：测试CORS安全配置
     */
    it('应该正确配置CORS安全策略', () => {
      const middleware = new SecurityMiddleware();

      const corsConfig = middleware.getCORSConfig();
      expect(corsConfig.origin).toBeDefined();
      expect(corsConfig.credentials).toBe(true);
      expect(corsConfig.allowedHeaders).toContain('Authorization');
      expect(corsConfig.exposedHeaders).not.toContain('X-Powered-By');
    });
  });

  describe('React权限Hook测试', () => {
    /**
     * 函数级注释：测试usePermissions Hook
     */
    it('应该提供权限检查功能', async () => {
      const { result } = renderHook(() => usePermissions('admin-001'));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // 测试权限检查
      expect(result.current.hasPermission('read')).toBe(true);
      expect(result.current.hasPermission('write')).toBe(true);
      expect(result.current.hasPermission('delete')).toBe(true);

      // 测试角色检查
      expect(result.current.hasRole('admin')).toBe(true);
      expect(result.current.hasRole('user')).toBe(false);
    });

    /**
     * 函数级注释：测试权限组件渲染
     */
    it('应该根据权限条件渲染组件', () => {
      const ProtectedComponent: React.FC<{ userId: string }> = ({ userId }) => {
        const { hasPermission } = usePermissions(userId);

        return (
          <div>
            {hasPermission('read') && <div data-testid="read-content">可读内容</div>}
            {hasPermission('write') && <div data-testid="write-content">可写内容</div>}
            {hasPermission('delete') && <div data-testid="delete-content">可删除内容</div>}
          </div>
        );
      };

      // 测试管理员权限
      const { rerender } = render(<ProtectedComponent userId="admin-001" />);
      expect(screen.getByTestId('read-content')).toBeInTheDocument();
      expect(screen.getByTestId('write-content')).toBeInTheDocument();
      expect(screen.getByTestId('delete-content')).toBeInTheDocument();

      // 测试普通用户权限
      rerender(<ProtectedComponent userId="user-001" />);
      expect(screen.getByTestId('read-content')).toBeInTheDocument();
      expect(screen.queryByTestId('write-content')).not.toBeInTheDocument();
      expect(screen.queryByTestId('delete-content')).not.toBeInTheDocument();
    });
  });

  describe('安全策略执行测试', () => {
    /**
     * 函数级注释：测试密码策略
     */
    it('应该执行密码安全策略', () => {
      const passwordPolicy = inputValidator.getPasswordPolicy();

      const weakPasswords = ['123456', 'password', 'abc123', '111111'];
      const strongPasswords = ['MyStr0ng!Pass', 'C0mpl3x@2023', 'S3cur3#P@ssw0rd'];

      weakPasswords.forEach(password => {
        const result = inputValidator.validatePassword(password);
        expect(result.isValid).toBe(false);
        expect(result.score).toBeLessThan(3);
      });

      strongPasswords.forEach(password => {
        const result = inputValidator.validatePassword(password);
        expect(result.isValid).toBe(true);
        expect(result.score).toBeGreaterThan(3);
      });
    });

    /**
     * 函数级注释：测试会话安全策略
     */
    it('应该执行会话安全策略', async () => {
      const sessionManager = securityAudit.getSessionManager();

      // 创建会话
      const sessionId = await sessionManager.createSession('user-001', {
        ipAddress: '192.168.1.1',
        userAgent: 'test-agent'
      });

      expect(sessionId).toBeDefined();

      // 验证会话
      const isValid = await sessionManager.validateSession(sessionId);
      expect(isValid).toBe(true);

      // 测试会话超时
      vi.advanceTimersByTime(30 * 60 * 1000); // 30分钟后
      const isExpired = await sessionManager.validateSession(sessionId);
      expect(isExpired).toBe(false);
    });

    /**
     * 函数级注释：测试数据访问策略
     */
    it('应该执行数据访问安全策略', async () => {
      const dataAccessPolicy = securityAudit.getDataAccessPolicy();

      // 测试敏感数据访问
      const sensitiveDataAccess = await dataAccessPolicy.checkAccess({
        userId: 'user-001',
        resource: 'user_passwords',
        action: 'read'
      });
      expect(sensitiveDataAccess.allowed).toBe(false);

      // 测试管理员访问
      const adminAccess = await dataAccessPolicy.checkAccess({
        userId: 'admin-001',
        resource: 'user_passwords',
        action: 'read'
      });
      expect(adminAccess.allowed).toBe(true);
      expect(adminAccess.conditions).toContain('audit_required');
    });
  });

  describe('集成安全场景测试', () => {
    /**
     * 函数级注释：测试完整的安全工作流
     */
    it('应该完整执行安全验证工作流', async () => {
      // 模拟用户登录请求
      const loginRequest = {
        username: 'admin',
        password: 'MyStr0ng!Pass',
        ip: '192.168.1.1',
        userAgent: 'Mozilla/5.0...'
      };

      // 1. 输入验证
      const inputValidation = inputValidator.validateLoginInput(loginRequest);
      expect(inputValidation.isValid).toBe(true);

      // 2. 权限检查
      const user = testUsers.find(u => u.username === loginRequest.username);
      const hasLoginPermission = await permissionManager.checkPermission(
        user!.id,
        'authentication',
        'login'
      );
      expect(hasLoginPermission).toBe(true);

      // 3. 安全审计记录
      await securityAudit.logSecurityEvent({
        eventType: 'login_attempt',
        userId: user!.id,
        resource: 'authentication',
        action: 'login',
        result: 'success',
        riskScore: 2,
        timestamp: Date.now(),
        metadata: {
          ip: loginRequest.ip,
          userAgent: loginRequest.userAgent
        }
      });

      // 4. 验证审计日志
      const auditLogs = securityAudit.getAuditLogs({
        userId: user!.id,
        eventType: 'login_attempt'
      });
      expect(auditLogs).toHaveLength(1);
    });

    /**
     * 函数级注释：测试安全攻击防护
     */
    it('应该防护多种安全攻击', async () => {
      const attackScenarios = [
        {
          type: 'brute_force',
          description: '暴力破解攻击',
          execute: async () => {
            // 模拟多次失败登录
            for (let i = 0; i < 10; i++) {
              await securityAudit.logSecurityEvent({
                eventType: 'failed_login',
                userId: 'user-001',
                resource: 'authentication',
                action: 'login',
                result: 'failure',
                riskScore: 6,
                timestamp: Date.now() + i * 1000,
                metadata: { attemptCount: i + 1 }
              });
            }
          }
        },
        {
          type: 'sql_injection',
          description: 'SQL注入攻击',
          execute: async () => {
            const maliciousInput = "'; DROP TABLE users; --";
            const validation = inputValidator.validateInput(maliciousInput, 'sql');
            expect(validation.isValid).toBe(false);
            expect(validation.threats).toContain('sql_injection');
          }
        },
        {
          type: 'privilege_escalation',
          description: '权限提升攻击',
          execute: async () => {
            // 尝试未授权的管理员操作
            const unauthorizedAccess = await permissionManager.checkPermission(
              'user-001',
              'admin_panel',
              'access'
            );
            expect(unauthorizedAccess).toBe(false);
          }
        }
      ];

      for (const scenario of attackScenarios) {
        await scenario.execute();
      }

      // 验证攻击被检测和记录
      const securityReport = await securityAudit.generateSecurityReport({
        startDate: Date.now() - 60 * 60 * 1000,
        endDate: Date.now(),
        includeRiskAnalysis: true
      });

      expect(securityReport.detectedAttacks).toBeGreaterThan(0);
      expect(securityReport.blockedRequests).toBeGreaterThan(0);
    });

    /**
     * 函数级注释：测试安全监控和告警
     */
    it('应该监控安全状态并发出告警', async () => {
      const mockAlertHandler = vi.fn();
      securityAudit.setAlertHandler(mockAlertHandler);

      // 触发高风险事件
      await securityAudit.logSecurityEvent({
        eventType: 'data_breach_attempt',
        userId: 'unknown',
        resource: 'sensitive_data',
        action: 'unauthorized_access',
        result: 'blocked',
        riskScore: 9,
        timestamp: Date.now(),
        metadata: {
          ip: '192.168.1.100',
          dataType: 'user_passwords'
        }
      });

      // 验证告警被触发
      expect(mockAlertHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          severity: 'critical',
          type: 'security_breach_attempt'
        })
      );
    });
  });
});