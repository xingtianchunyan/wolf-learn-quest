# API文档总览

## 文档结构

本API文档包含以下几个部分：

### 📋 [API端点文档](./api-endpoints.md)
- **内容**: 所有REST API端点的详细说明
- **数量**: 0 个端点
- **包含**: 请求方法、路径、参数说明和示例

### 🔌 [WebSocket事件文档](./websocket-events.md)
- **内容**: 所有WebSocket事件的详细说明
- **数量**: 6 个事件
- **包含**: 发送事件、监听事件和数据格式

### ❌ [错误码文档](./error-codes.md)
- **内容**: 所有错误码的定义和说明
- **数量**: 23 个错误码
- **包含**: HTTP状态码和自定义错误码

### 🔧 [接口定义文档](./interfaces.md)
- **内容**: 所有TypeScript接口的定义
- **数量**: 408 个接口
- **包含**: 数据结构和类型定义

## 快速开始

### 1. 认证
所有API请求都需要包含认证信息：

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     "http://localhost:3000/api/endpoint"
```

### 2. WebSocket连接
建立WebSocket连接：

```javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'YOUR_TOKEN'
  }
});
```

### 3. 错误处理
所有错误响应都遵循统一格式：

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述"
  },
  "timestamp": 1640995200000
}
```

## 开发指南

### API设计原则
1. **RESTful设计**: 遵循REST API设计规范
2. **统一响应格式**: 所有API响应都使用统一的数据格式
3. **错误处理**: 提供详细的错误信息和错误码
4. **版本控制**: 通过URL路径进行API版本控制

### WebSocket事件规范
1. **事件命名**: 使用小写字母和下划线
2. **数据格式**: 统一使用JSON格式
3. **错误处理**: 通过特定的错误事件传递错误信息

## 更新说明

本文档由自动化脚本生成，会定期更新以反映最新的API变更。

**最后更新**: 2025-10-08

**生成统计**:
- API端点: 0
- WebSocket事件: 6
- 错误码: 23
- 接口定义: 408

## 联系方式

如有问题或建议，请联系开发团队。
