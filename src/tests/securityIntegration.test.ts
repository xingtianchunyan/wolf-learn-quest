/**
 * 文件级注释：安全系统集成测试
 * 
 * 该文件实现了安全系统的集成测试，旨在：
 * - 验证API安全中间件功能
 * - 测试输入验证系统
 * - 验证权限控制系统
 * - 测试安全配置管理
 * - 验证安全审计功能
 * 
 * 测试覆盖：
 * - ApiSecurityMiddleware功能测试
 * - EnhancedInputValidator测试
 * - EnhancedPermissionSystem测试
 * - ApiSecurityConfigManager测试
 * - ComprehensiveSecurityAudit测试
 * 
 * @author SOLO Coding
 * @version 1.0.0
 */

import { describe, it, expect, beforeEach, afterEach, vi, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';

// 导入被测试的模块
import { ApiSecurityMiddleware } from '../utils/apiSecurityMiddleware';
import { EnhancedInputValidator, ValidationConfig, DataType, ValidationRuleType } from '../utils/enhancedInputValidation';
import { EnhancedPermissionSystem, PermissionType, ResourceType } from '../utils/enhancedPermissionSystem';
import { ApiSecurityConfigManager, SecurityLevel, AuthenticationType } from '../utils/apiSecurityConfig';
import { ComprehensiveSecurityAudit } from '../utils/comprehensiveSecurityAudit';

/**
 * 接口注释：测试用户接口
 * 定义测试中使用的用户结构
 */
interface TestUser {
  id: string;
  username: string;
  email: string;
  roles: string[];
  permissions: string[];
}

/**
 * 接口注释：测试请求接口
 * 定义测试请求的结构
 */
interface TestRequest {
  method: string;
  path: string;
  headers?: Record<string, string>;
  body?: any;
  query?: Record<string, string>;
}

/**
 * 类级注释：安全系统集成测试套件
 * 
 * 测试安全系统的各个组件和集成功能
 */
describe('安全系统集成测试', () => {
  let app: express.Application;
  let apiSecurityMiddleware: ApiSecurityMiddleware;
  let inputValidator: EnhancedInputValidator;
  let permissionSystem: EnhancedPermissionSystem;
  let configManager: ApiSecurityConfigManager;
  let securityAudit: ComprehensiveSecurityAudit;

  /**
   * 函数级注释：测试前置设置
   * 在所有测试前初始化测试环境
   */
  beforeAll(async () => {
    // 初始化Express应用
    app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // 初始化安全组件
    apiSecurityMiddleware = ApiSecurityMiddleware.getInstance();
    inputValidator = EnhancedInputValidator.getInstance();
    permissionSystem = EnhancedPermissionSystem.getInstance();
    configManager = ApiSecurityConfigManager.getInstance();
    securityAudit = ComprehensiveSecurityAudit.getInstance();

    // 设置测试路由
    setupTestRoutes();
  });

  /**
   * 函数级注释：设置测试路由
   * 设置用于测试的API路由
   */
  function setupTestRoutes() {
    // 公开路由
    app.get('/api/public', (req, res) => {
      res.json({ message: '公开接口' });
    });

    // 需要认证的路由
    app.get('/api/protected', 
      apiSecurityMiddleware.createSecurityMiddleware(),
      (req, res) => {
        res.json({ message: '受保护的接口', user: (req as any).user });
      }
    );

    // 需要特定权限的路由
    app.post('/api/admin', 
      apiSecurityMiddleware.createSecurityMiddleware(),
      (req, res) => {
        res.json({ message: '管理员接口' });
      }
    );

    // 文件上传路由
    app.post('/api/upload',
      apiSecurityMiddleware.createSecurityMiddleware(),
      (req, res) => {
        res.json({ message: '文件上传成功' });
      }
    );

    // 数据验证路由
    app.post('/api/validate',
      (req, res) => {
        res.json({ message: '数据验证通过', data: req.body });
      }
    );
  }

  /**
   * 函数级注释：每个测试前的设置
   * 在每个测试前重置状态
   */
  beforeEach(async () => {
    // 重置配置为默认值
    await configManager.updateConfig({
      securityLevel: SecurityLevel.MEDIUM,
      authentication: {
        type: AuthenticationType.JWT,
        required: true
      }
    });

    // 清除权限缓存
    permissionSystem.clearCache();
    
    // 重置验证器
    vi.clearAllMocks();
  });

  /**
   * 测试组：API安全中间件测试
   */
  describe('API安全中间件测试', () => {
    /**
     * 函数级注释：测试速率限制
     * 验证API速率限制功能
     */
    it('应该能够限制请求频率', async () => {
      // 更新配置启用严格的速率限制
      await configManager.updateConfig({
        rateLimit: {
          enabled: true,
          windowMs: 60000, // 1分钟
          maxRequests: 3,   // 最多3个请求
          limitBy: 'ip'
        }
      });

      // 发送多个请求
      const responses = [];
      for (let i = 0; i < 5; i++) {
        const response = await request(app)
          .get('/api/public')
          .set('X-Forwarded-For', '192.168.1.100');
        responses.push(response);
      }

      // 验证前3个请求成功
      expect(responses[0].status).toBe(200);
      expect(responses[1].status).toBe(200);
      expect(responses[2].status).toBe(200);

      // 验证后续请求被限制
      expect(responses[3].status).toBe(429);
      expect(responses[4].status).toBe(429);
    });

    /**
     * 函数级注释：测试JWT认证
     * 验证JWT认证功能
     */
    it('应该能够验证JWT令牌', async () => {
      // 生成有效的JWT令牌
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

      // 测试无令牌访问
      const noTokenResponse = await request(app)
        .get('/api/protected');
      expect(noTokenResponse.status).toBe(401);

      // 测试无效令牌
      const invalidTokenResponse = await request(app)
        .get('/api/protected')
        .set('Authorization', 'Bearer invalid-token');
      expect(invalidTokenResponse.status).toBe(401);

      // 测试有效令牌（需要模拟JWT验证）
      // 注意：在实际测试中需要使用真实的JWT库和密钥
    });

    /**
     * 函数级注释：测试CORS配置
     * 验证CORS配置功能
     */
    it('应该能够处理CORS请求', async () => {
      // 更新CORS配置
      await configManager.updateConfig({
        cors: {
          enabled: true,
          origin: ['http://localhost:3000', 'https://example.com'],
          methods: ['GET', 'POST'],
          allowedHeaders: ['Content-Type', 'Authorization'],
          credentials: true
        }
      });

      // 测试预检请求
      const preflightResponse = await request(app)
        .options('/api/public')
        .set('Origin', 'http://localhost:3000')
        .set('Access-Control-Request-Method', 'POST')
        .set('Access-Control-Request-Headers', 'Content-Type');

      expect(preflightResponse.status).toBe(204);
      expect(preflightResponse.headers['access-control-allow-origin']).toBe('http://localhost:3000');
      expect(preflightResponse.headers['access-control-allow-methods']).toContain('POST');
    });

    /**
     * 函数级注释：测试安全头
     * 验证安全头设置功能
     */
    it('应该能够设置安全头', async () => {
      // 更新安全头配置
      await configManager.updateConfig({
        securityHeaders: {
          enabled: true,
          contentSecurityPolicy: {
            enabled: true,
            directives: {
              'default-src': ["'self'"],
              'script-src': ["'self'", "'unsafe-inline'"]
            }
          },
          hsts: {
            enabled: true,
            maxAge: 31536000,
            includeSubDomains: true
          }
        }
      });

      const response = await request(app)
        .get('/api/public');

      expect(response.headers['content-security-policy']).toBeDefined();
      expect(response.headers['strict-transport-security']).toBeDefined();
      expect(response.headers['x-frame-options']).toBeDefined();
      expect(response.headers['x-content-type-options']).toBeDefined();
    });
  });

  /**
   * 测试组：输入验证系统测试
   */
  describe('输入验证系统测试', () => {
    /**
     * 函数级注释：测试基本数据类型验证
     * 验证基本数据类型的验证功能
     */
    it('应该能够验证基本数据类型', async () => {
      const config: ValidationConfig = {
        fields: [
          {
            name: 'username',
            type: DataType.STRING,
            required: true,
            rules: [
              {
                type: ValidationRuleType.LENGTH,
                params: { min: 3, max: 20 }
              }
            ]
          },
          {
            name: 'age',
            type: DataType.INTEGER,
            required: true,
            rules: [
              {
                type: ValidationRuleType.RANGE,
                params: { min: 0, max: 120 }
              }
            ]
          },
          {
            name: 'email',
            type: DataType.EMAIL,
            required: true,
            rules: []
          }
        ]
      };

      // 测试有效数据
      const validData = {
        username: 'testuser',
        age: 25,
        email: 'test@example.com'
      };

      const validResult = await inputValidator.validateInput(validData, config);
      expect(validResult.isValid).toBe(true);
      expect(validResult.errors).toHaveLength(0);

      // 测试无效数据
      const invalidData = {
        username: 'ab', // 太短
        age: 150,       // 超出范围
        email: 'invalid-email' // 无效邮箱
      };

      const invalidResult = await inputValidator.validateInput(invalidData, config);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors.length).toBeGreaterThan(0);
    });

    /**
     * 函数级注释：测试XSS防护
     * 验证XSS攻击防护功能
     */
    it('应该能够检测和防护XSS攻击', async () => {
      const config: ValidationConfig = {
        fields: [
          {
            name: 'content',
            type: DataType.STRING,
            required: true,
            rules: []
          }
        ],
        global: {
          enableXSSProtection: true
        }
      };

      // 测试XSS攻击载荷
      const xssPayloads = [
        '<script>alert("XSS")</script>',
        'javascript:alert("XSS")',
        '<img src="x" onerror="alert(\'XSS\')">',
        '<iframe src="javascript:alert(\'XSS\')"></iframe>'
      ];

      for (const payload of xssPayloads) {
        const result = await inputValidator.validateInput(
          { content: payload },
          config
        );

        expect(result.isValid).toBe(false);
        expect(result.errors.some(error => 
          error.message.includes('XSS')
        )).toBe(true);
      }
    });

    /**
     * 函数级注释：测试SQL注入防护
     * 验证SQL注入攻击防护功能
     */
    it('应该能够检测和防护SQL注入攻击', async () => {
      const config: ValidationConfig = {
        fields: [
          {
            name: 'query',
            type: DataType.STRING,
            required: true,
            rules: []
          }
        ],
        global: {
          enableSQLInjectionProtection: true
        }
      };

      // 测试SQL注入载荷
      const sqlInjectionPayloads = [
        "'; DROP TABLE users; --",
        "1' OR '1'='1",
        "UNION SELECT * FROM users",
        "1; DELETE FROM users WHERE 1=1"
      ];

      for (const payload of sqlInjectionPayloads) {
        const result = await inputValidator.validateInput(
          { query: payload },
          config
        );

        expect(result.isValid).toBe(false);
        expect(result.errors.some(error => 
          error.message.includes('SQL注入')
        )).toBe(true);
      }
    });

    /**
     * 函数级注释：测试文件上传验证
     * 验证文件上传的安全验证
     */
    it('应该能够验证文件上传', async () => {
      const config: ValidationConfig = {
        fields: [
          {
            name: 'file',
            type: DataType.FILE,
            required: true,
            rules: [
              {
                type: ValidationRuleType.FILE,
                params: {
                  allowedTypes: ['jpg', 'png', 'gif'],
                  maxSize: 5 * 1024 * 1024, // 5MB
                  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif']
                }
              }
            ]
          }
        ]
      };

      // 测试有效文件
      const validFile = {
        name: 'test.jpg',
        size: 1024 * 1024, // 1MB
        type: 'image/jpeg'
      };

      const validResult = await inputValidator.validateInput(
        { file: validFile },
        config
      );
      expect(validResult.isValid).toBe(true);

      // 测试无效文件类型
      const invalidFile = {
        name: 'test.exe',
        size: 1024,
        type: 'application/x-executable'
      };

      const invalidResult = await inputValidator.validateInput(
        { file: invalidFile },
        config
      );
      expect(invalidResult.isValid).toBe(false);
    });

    /**
     * 函数级注释：测试自定义验证规则
     * 验证自定义验证规则功能
     */
    it('应该能够使用自定义验证规则', async () => {
      // 注册自定义验证器
      inputValidator.registerCustomValidator('strong_password', (value: string) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(value);
      });

      const config: ValidationConfig = {
        fields: [
          {
            name: 'password',
            type: DataType.STRING,
            required: true,
            rules: [
              {
                type: ValidationRuleType.CUSTOM,
                params: { validatorName: 'strong_password' },
                message: '密码必须包含大小写字母、数字和特殊字符，且长度至少8位'
              }
            ]
          }
        ]
      };

      // 测试弱密码
      const weakResult = await inputValidator.validateInput(
        { password: '123456' },
        config
      );
      expect(weakResult.isValid).toBe(false);

      // 测试强密码
      const strongResult = await inputValidator.validateInput(
        { password: 'StrongP@ss123' },
        config
      );
      expect(strongResult.isValid).toBe(true);
    });
  });

  /**
   * 测试组：权限控制系统测试
   */
  describe('权限控制系统测试', () => {
    /**
     * 函数级注释：测试基本权限检查
     * 验证基本的权限检查功能
     */
    it('应该能够检查基本权限', async () => {
      // 初始化权限数据
      await permissionSystem.initializePermissions([
        {
          id: 'read_users',
          name: '读取用户',
          type: PermissionType.READ,
          resource: ResourceType.USER,
          description: '允许读取用户信息'
        },
        {
          id: 'write_users',
          name: '写入用户',
          type: PermissionType.WRITE,
          resource: ResourceType.USER,
          description: '允许修改用户信息'
        }
      ]);

      await permissionSystem.initializeRoles([
        {
          id: 'user',
          name: '普通用户',
          permissions: ['read_users'],
          description: '普通用户角色'
        },
        {
          id: 'admin',
          name: '管理员',
          permissions: ['read_users', 'write_users'],
          description: '管理员角色'
        }
      ]);

      // 测试用户权限
      const userPermissions = {
        userId: 'user1',
        roles: ['user'],
        directPermissions: []
      };

      const readResult = await permissionSystem.checkPermission(
        'read_users',
        userPermissions,
        { resourceId: 'user1' }
      );
      expect(readResult.granted).toBe(true);

      const writeResult = await permissionSystem.checkPermission(
        'write_users',
        userPermissions,
        { resourceId: 'user1' }
      );
      expect(writeResult.granted).toBe(false);

      // 测试管理员权限
      const adminPermissions = {
        userId: 'admin1',
        roles: ['admin'],
        directPermissions: []
      };

      const adminWriteResult = await permissionSystem.checkPermission(
        'write_users',
        adminPermissions,
        { resourceId: 'user1' }
      );
      expect(adminWriteResult.granted).toBe(true);
    });

    /**
     * 函数级注释：测试条件权限
     * 验证基于条件的权限检查
     */
    it('应该能够处理条件权限', async () => {
      // 初始化带条件的权限
      await permissionSystem.initializePermissions([
        {
          id: 'edit_own_profile',
          name: '编辑自己的资料',
          type: PermissionType.WRITE,
          resource: ResourceType.USER,
          description: '允许编辑自己的用户资料',
          conditions: [
            {
              field: 'userId',
              operator: 'equals',
              value: '{{context.userId}}'
            }
          ]
        }
      ]);

      const userPermissions = {
        userId: 'user1',
        roles: [],
        directPermissions: ['edit_own_profile']
      };

      // 测试编辑自己的资料（应该允许）
      const ownProfileResult = await permissionSystem.checkPermission(
        'edit_own_profile',
        userPermissions,
        { 
          resourceId: 'user1',
          userId: 'user1'
        }
      );
      expect(ownProfileResult.granted).toBe(true);

      // 测试编辑他人的资料（应该拒绝）
      const otherProfileResult = await permissionSystem.checkPermission(
        'edit_own_profile',
        userPermissions,
        { 
          resourceId: 'user2',
          userId: 'user1'
        }
      );
      expect(otherProfileResult.granted).toBe(false);
    });

    /**
     * 函数级注释：测试角色继承
     * 验证角色继承功能
     */
    it('应该能够处理角色继承', async () => {
      // 设置角色继承关系
      await permissionSystem.setRoleInheritance('admin', ['user']);
      await permissionSystem.setRoleInheritance('super_admin', ['admin']);

      await permissionSystem.initializeRoles([
        {
          id: 'user',
          name: '普通用户',
          permissions: ['read_users'],
          description: '普通用户角色'
        },
        {
          id: 'admin',
          name: '管理员',
          permissions: ['write_users'],
          description: '管理员角色'
        },
        {
          id: 'super_admin',
          name: '超级管理员',
          permissions: ['delete_users'],
          description: '超级管理员角色'
        }
      ]);

      const superAdminPermissions = {
        userId: 'superadmin1',
        roles: ['super_admin'],
        directPermissions: []
      };

      // 超级管理员应该继承所有下级角色的权限
      const readResult = await permissionSystem.checkPermission(
        'read_users',
        superAdminPermissions,
        {}
      );
      expect(readResult.granted).toBe(true);

      const writeResult = await permissionSystem.checkPermission(
        'write_users',
        superAdminPermissions,
        {}
      );
      expect(writeResult.granted).toBe(true);

      const deleteResult = await permissionSystem.checkPermission(
        'delete_users',
        superAdminPermissions,
        {}
      );
      expect(deleteResult.granted).toBe(true);
    });
  });

  /**
   * 测试组：安全配置管理测试
   */
  describe('安全配置管理测试', () => {
    /**
     * 函数级注释：测试配置验证
     * 验证安全配置的验证功能
     */
    it('应该能够验证安全配置', async () => {
      // 测试有效配置
      const validConfig = {
        securityLevel: SecurityLevel.HIGH,
        authentication: {
          type: AuthenticationType.JWT,
          required: true,
          jwt: {
            secret: 'very-long-and-secure-secret-key-for-testing',
            algorithm: 'HS256',
            expiresIn: '24h'
          }
        }
      };

      const validResult = await configManager.validateConfig({
        ...configManager.getCurrentConfig(),
        ...validConfig
      });
      expect(validResult.isValid).toBe(true);

      // 测试无效配置
      const invalidConfig = {
        authentication: {
          type: AuthenticationType.JWT,
          required: true,
          jwt: {
            secret: 'short', // 太短的密钥
            algorithm: 'HS256',
            expiresIn: '24h'
          }
        }
      };

      const invalidResult = await configManager.validateConfig({
        ...configManager.getCurrentConfig(),
        ...invalidConfig
      });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.warnings.length).toBeGreaterThan(0);
    });

    /**
     * 函数级注释：测试配置热更新
     * 验证配置的热更新功能
     */
    it('应该能够热更新配置', async () => {
      let configUpdateReceived = false;
      let updatedConfig: any = null;

      // 添加配置监听器
      configManager.addConfigListener('config_updated', (config) => {
        configUpdateReceived = true;
        updatedConfig = config;
      });

      // 更新配置
      const newConfig = {
        securityLevel: SecurityLevel.HIGH,
        rateLimit: {
          enabled: true,
          windowMs: 30000,
          maxRequests: 50,
          limitBy: 'ip' as const
        }
      };

      const result = await configManager.updateConfig(newConfig);
      expect(result.isValid).toBe(true);

      // 验证监听器被触发
      expect(configUpdateReceived).toBe(true);
      expect(updatedConfig.securityLevel).toBe(SecurityLevel.HIGH);
      expect(updatedConfig.rateLimit.maxRequests).toBe(50);
    });

    /**
     * 函数级注释：测试配置回滚
     * 验证配置的回滚功能
     */
    it('应该能够回滚配置', async () => {
      const originalConfig = configManager.getCurrentConfig();
      const originalVersion = originalConfig.version;

      // 更新配置
      await configManager.updateConfig({
        securityLevel: SecurityLevel.CRITICAL
      });

      const updatedConfig = configManager.getCurrentConfig();
      expect(updatedConfig.securityLevel).toBe(SecurityLevel.CRITICAL);

      // 回滚配置
      const rollbackResult = await configManager.rollbackConfig(originalVersion);
      expect(rollbackResult).toBe(true);

      const rolledBackConfig = configManager.getCurrentConfig();
      expect(rolledBackConfig.securityLevel).toBe(originalConfig.securityLevel);
    });
  });

  /**
   * 测试组：安全审计测试
   */
  describe('安全审计测试', () => {
    /**
     * 函数级注释：测试全面安全审计
     * 验证全面的安全审计功能
     */
    it('应该能够执行全面的安全审计', async () => {
      const auditConfig = {
        checkInputValidation: true,
        checkAuthentication: true,
        checkAuthorization: true,
        checkSessionManagement: true,
        checkEncryption: true,
        checkInjectionAttacks: true,
        includeRecommendations: true
      };

      const auditResult = await securityAudit.performComprehensiveAudit(auditConfig);

      expect(auditResult.overallScore).toBeGreaterThanOrEqual(0);
      expect(auditResult.overallScore).toBeLessThanOrEqual(100);
      expect(auditResult.vulnerabilities).toBeDefined();
      expect(auditResult.recommendations).toBeDefined();
      expect(auditResult.auditSummary).toBeDefined();
    });

    /**
     * 函数级注释：测试漏洞检测
     * 验证安全漏洞检测功能
     */
    it('应该能够检测安全漏洞', async () => {
      // 模拟一个有安全问题的配置
      await configManager.updateConfig({
        authentication: {
          type: AuthenticationType.NONE,
          required: false
        },
        encryption: {
          enabled: false,
          algorithm: 'aes-256-gcm' as any,
          key: '',
          encryptRequest: false,
          encryptResponse: false
        }
      });

      const auditResult = await securityAudit.performComprehensiveAudit({
        checkAuthentication: true,
        checkEncryption: true
      });

      // 应该检测到认证和加密相关的漏洞
      const authVulnerabilities = auditResult.vulnerabilities.filter(v => 
        v.type.includes('AUTHENTICATION') || v.type.includes('AUTH')
      );
      const encryptionVulnerabilities = auditResult.vulnerabilities.filter(v => 
        v.type.includes('ENCRYPTION') || v.type.includes('CRYPTO')
      );

      expect(authVulnerabilities.length).toBeGreaterThan(0);
      expect(encryptionVulnerabilities.length).toBeGreaterThan(0);
    });

    /**
     * 函数级注释：测试安全建议
     * 验证安全建议生成功能
     */
    it('应该能够生成安全建议', async () => {
      const auditResult = await securityAudit.performComprehensiveAudit({
        includeRecommendations: true
      });

      expect(auditResult.recommendations).toBeDefined();
      expect(auditResult.recommendations.length).toBeGreaterThan(0);

      // 验证建议的结构
      auditResult.recommendations.forEach(recommendation => {
        expect(recommendation.title).toBeDefined();
        expect(recommendation.description).toBeDefined();
        expect(recommendation.priority).toBeDefined();
        expect(recommendation.category).toBeDefined();
      });
    });
  });

  /**
   * 测试组：集成测试
   */
  describe('安全系统集成测试', () => {
    /**
     * 函数级注释：测试完整的安全流程
     * 验证从请求到响应的完整安全流程
     */
    it('应该能够完成完整的安全流程', async () => {
      // 配置高安全级别
      await configManager.updateConfig({
        securityLevel: SecurityLevel.HIGH,
        authentication: {
          type: AuthenticationType.JWT,
          required: true
        },
        inputValidation: {
          enabled: true,
          xssProtection: true,
          sqlInjectionProtection: true
        },
        rateLimit: {
          enabled: true,
          windowMs: 60000,
          maxRequests: 10,
          limitBy: 'ip'
        }
      });

      // 测试恶意请求被阻止
      const maliciousResponse = await request(app)
        .post('/api/validate')
        .send({
          content: '<script>alert("XSS")</script>',
          query: "'; DROP TABLE users; --"
        });

      // 应该被安全中间件拦截
      expect(maliciousResponse.status).toBeGreaterThanOrEqual(400);
    });

    /**
     * 函数级注释：测试安全事件记录
     * 验证安全事件的记录和监控
     */
    it('应该能够记录安全事件', async () => {
      // 触发一些安全事件
      await request(app)
        .get('/api/protected')
        .set('Authorization', 'Bearer invalid-token');

      await request(app)
        .post('/api/validate')
        .send({ content: '<script>alert("test")</script>' });

      // 获取安全统计
      const securityStats = apiSecurityMiddleware.getSecurityStats();
      
      expect(securityStats.totalRequests).toBeGreaterThan(0);
      expect(securityStats.blockedRequests).toBeGreaterThan(0);
    });

    /**
     * 函数级注释：测试性能影响
     * 验证安全功能对性能的影响在可接受范围内
     */
    it('安全功能不应显著影响性能', async () => {
      const requestCount = 100;
      const startTime = Date.now();

      // 发送大量请求
      const promises = [];
      for (let i = 0; i < requestCount; i++) {
        promises.push(
          request(app)
            .get('/api/public')
            .set('X-Test-Request', i.toString())
        );
      }

      await Promise.all(promises);
      const endTime = Date.now();
      const totalTime = endTime - startTime;
      const averageTime = totalTime / requestCount;

      // 平均每个请求不应超过50ms
      expect(averageTime).toBeLessThan(50);
    });
  });

  /**
   * 测试组：边界情况和错误处理
   */
  describe('边界情况和错误处理', () => {
    /**
     * 函数级注释：测试极端输入
     * 验证系统对极端输入的处理
     */
    it('应该能够处理极端输入', async () => {
      const extremeInputs = [
        '', // 空字符串
        'a'.repeat(10000), // 超长字符串
        null,
        undefined,
        {},
        [],
        { nested: { very: { deep: { object: true } } } }
      ];

      for (const input of extremeInputs) {
        const response = await request(app)
          .post('/api/validate')
          .send({ data: input });

        // 应该能够处理而不崩溃
        expect(response.status).toBeLessThan(500);
      }
    });

    /**
     * 函数级注释：测试并发安全
     * 验证系统在高并发情况下的安全性
     */
    it('应该能够在高并发情况下保持安全', async () => {
      const concurrentRequests = 50;
      const promises = [];

      for (let i = 0; i < concurrentRequests; i++) {
        promises.push(
          request(app)
            .get('/api/public')
            .set('X-Concurrent-Test', i.toString())
        );
      }

      const responses = await Promise.all(promises);

      // 所有请求都应该得到正确处理
      responses.forEach(response => {
        expect(response.status).toBeLessThan(500);
      });
    });

    /**
     * 函数级注释：测试内存泄漏防护
     * 验证系统不会因为安全功能导致内存泄漏
     */
    it('应该不会导致内存泄漏', async () => {
      const initialMemory = process.memoryUsage().heapUsed;

      // 执行大量安全操作
      for (let i = 0; i < 1000; i++) {
        await inputValidator.validateInput(
          { test: `test data ${i}` },
          {
            fields: [{
              name: 'test',
              type: DataType.STRING,
              required: true,
              rules: []
            }]
          }
        );
      }

      // 强制垃圾回收
      if (global.gc) {
        global.gc();
      }

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;

      // 内存增长应该在合理范围内（不超过5MB）
      expect(memoryIncrease).toBeLessThan(5 * 1024 * 1024);
    });
  });
});