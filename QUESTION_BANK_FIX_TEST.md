# 题库组件修复验证指南

## 问题描述
法官页面准备阶段弹窗中的题库组件无法正确显示手动编辑的题目。

## 修复内容

### 1. 主要修复
- **文件**: `src/components/judge/QuestionBankDialog.tsx`
- **问题**: 查询使用了 `generated_questions!inner(file_name)`，导致手动编辑的题目被过滤掉
- **修复**: 将 `inner join` 改为 `left join`，确保手动编辑的题目也能被查询到

### 2. 改进内容
- 添加详细的调试日志
- 改善错误处理和用户反馈
- 优化题目分类逻辑
- 添加完整的函数级注释

## 验证步骤

### 前置条件
1. 确保开发服务器运行在 http://localhost:8080/
2. 确保数据库中存在手动编辑的题目
3. 拥有法官权限的用户账号

### 测试步骤

#### 步骤1: 检查数据库中的手动编辑题目
```sql
-- 在 Supabase 控制台中执行
SELECT 
  id, 
  question, 
  category, 
  generated_questions_id,
  created_at
FROM questions 
WHERE category = '手动编辑' 
OR generated_questions_id IS NULL
ORDER BY created_at DESC;
```

#### 步骤2: 访问法官页面
1. 登录系统
2. 创建或进入一个游戏房间
3. 确保当前用户是法官
4. 进入法官页面 (`/room/{roomId}/judge`)

#### 步骤3: 打开准备阶段弹窗
1. 在法官页面点击"准备阶段管理"按钮
2. 在弹窗中点击"题库管理"标签

#### 步骤4: 验证题库显示
1. 检查"题目来源"列表中是否显示"手动编辑"选项
2. 点击"手动编辑"来源，查看是否显示手动编辑的题目
3. 检查浏览器控制台，应该看到类似以下的调试信息：
   ```
   题目获取成功: {
     总题目数: X,
     手动编辑题目数: Y,
     AI生成题目数: Z,
     题目来源: [...]
   }
   ```

#### 步骤5: 测试手动添加题目
1. 切换到"手动编辑"标签
2. 填写题目信息：
   - 题干
   - 选项A、B（必填）
   - 选项C、D（可选）
   - 正确答案
   - 解释（可选）
   - 难度等级
3. 点击"添加题目"按钮
4. 检查是否显示成功提示
5. 切换回"生成题目"标签，验证新添加的题目是否出现在"手动编辑"来源中

#### 步骤6: 测试题目选择和链接
1. 选择一些手动编辑的题目
2. 点击"链接到系统"按钮
3. 验证题目是否成功链接到房间

## 预期结果

### 修复前
- 手动编辑的题目不显示在题库中
- "手动编辑"来源显示0道题目
- 无法选择和使用手动编辑的题目

### 修复后
- 手动编辑的题目正常显示在题库中
- "手动编辑"来源显示正确的题目数量
- 可以正常选择、预览和使用手动编辑的题目
- 控制台显示详细的调试信息
- 错误信息更加详细和有用

## 调试信息

### 控制台日志
修复后，在浏览器控制台中应该能看到以下类型的日志：

```javascript
// 题目获取成功时
题目获取成功: {
  总题目数: 15,
  手动编辑题目数: 5,
  AI生成题目数: 10,
  题目来源: [
    { id: 'manual', name: '手动编辑', count: 5, type: 'manual' },
    { id: 'xxx-xxx', name: '某个文件.pdf', count: 10, type: 'file' }
  ]
}

// 手动添加题目时
正在保存手动编辑的题目: { question: '...', option_a: '...', ... }
手动题目保存成功: { id: 'xxx-xxx', question: '...', ... }
```

### 错误排查

如果仍然无法看到手动编辑的题目，请检查：

1. **数据库权限**: 确保当前用户有权限访问 `questions` 表
2. **数据完整性**: 检查手动编辑的题目是否正确保存到数据库
3. **网络请求**: 在浏览器开发者工具的 Network 标签中检查 API 请求是否成功
4. **控制台错误**: 查看是否有 JavaScript 错误或 Supabase 错误

## 技术细节

### 修复的核心代码变更

```typescript
// 修复前（错误）
const { data, error } = await supabase
  .from('questions')
  .select(`
    *,
    generated_questions!inner(file_name)  // inner join 会过滤掉手动编辑的题目
  `)
  .order('id', { ascending: true });

// 修复后（正确）
const { data, error } = await supabase
  .from('questions')
  .select(`
    *,
    generated_questions(file_name)  // left join 包含所有题目
  `)
  .order('id', { ascending: true });
```

### 数据库表关系
- `questions` 表：存储所有题目（手动编辑和AI生成）
- `generated_questions` 表：存储AI生成题目的元信息
- 手动编辑的题目：`generated_questions_id` 为 `NULL`
- AI生成的题目：`generated_questions_id` 指向对应的生成记录

通过使用 left join 而不是 inner join，我们确保了所有题目都能被查询到，无论它们是否有关联的生成记录。