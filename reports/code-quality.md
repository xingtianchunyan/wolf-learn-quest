# 代码质量分析报告

## 概述

**生成时间**: 2025/10/9 01:55:52

## 总体指标

| 指标         | 数值         |
| ------------ | ------------ |
| 文件数量     | 298          |
| 总行数       | 100384       |
| 代码行数     | 72102        |
| 注释行数     | 17299        |
| 可维护性指数 | 49.19        |
| 技术债务     | 6208.00 小时 |

## 代码异味

发现 **6184** 个代码异味：

- **Long Parameter List** (low) - App.tsx:19
  - 函数 queryClient 有 8 个参数，建议使用对象参数

- **Long Function** (medium) - components\admin\MonitoringDashboard.tsx:86
  - 函数 getStatusText 有 126 行，建议拆分

- **Long Function** (medium) - components\admin\PerformanceDashboard.tsx:192
  - 函数 handleClearData 有 229 行，建议拆分

- **Long Function** (medium) - components\admin\SkillSystemMonitor.tsx:246
  - 函数 getHealthIcon 有 278 行，建议拆分

- **Deep Nesting** (medium) - components\admin\SkillSystemMonitor.tsx:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\admin\SkillSystemMonitor.tsx:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\admin\SkillSystemMonitor.tsx:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\admin\SkillSystemMonitor.tsx:132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\admin\SkillSystemMonitor.tsx:133
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\admin\SkillSystemMonitor.tsx:134
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\admin\SkillSystemMonitor.tsx:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\admin\SkillSystemMonitor.tsx:136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\admin\SkillSystemMonitor.tsx:137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\admin\SkillSystemMonitor.tsx:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\admin\SkillSystemMonitor.tsx:139
  - 嵌套深度 5，建议重构

- **Large Class** (high) - components\common\hoc\withErrorBoundary.tsx:163
  - 类 ErrorBoundaryHOC 有 39 个方法，建议拆分

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:169
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:179
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:180
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:189
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:190
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:191
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:192
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:197
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:198
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:199
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:200
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:201
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:202
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:209
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:210
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:211
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:212
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:218
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:219
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:224
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:229
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:230
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:243
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:244
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:245
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:246
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:248
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:249
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:250
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:251
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:252
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:253
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:254
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:255
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:256
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:257
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:258
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:259
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:260
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:261
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:262
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:263
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:264
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:265
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:266
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:267
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:268
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:271
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:272
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:273
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:283
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:284
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:285
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:286
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:287
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:288
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:293
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:294
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:295
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:297
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:310
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:311
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:312
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:313
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:214
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:215
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:218
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:219
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:220
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:221
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:222
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:223
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:224
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:225
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:227
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:235
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:236
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:237
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:238
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:239
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:240
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:241
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:242
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:199
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:200
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:202
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:203
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:208
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:209
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:211
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:212
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:218
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:227
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:292
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:293
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:294
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:295
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:296
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:297
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:300
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:301
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:302
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:303
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:304
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:307
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:308
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:309
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:310
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:311
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:312
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:313
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:319
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:321
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:322
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:323
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:324
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:325
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:326
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:327
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:328
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:329
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:330
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:331
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:332
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:351
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:352
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\dialogs\GameRulesDialog.tsx:93
  - 函数 trigger 有 248 行，建议拆分

- **Long Function** (medium) - components\dialogs\LoginDialog.tsx:199
  - 函数 handleLogout 有 156 行，建议拆分

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:133
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:134
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:146
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:147
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:148
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:149
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:154
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:155
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:157
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:164
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:165
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:166
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:167
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:172
  - 嵌套深度 5，建议重构

- **Large Class** (high) - components\error\ErrorBoundary.tsx:84
  - 类 ErrorBoundary 有 57 个方法，建议拆分

- **Deep Nesting** (medium) - components\error\ErrorBoundary.tsx:384
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorBoundary.tsx:385
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorBoundary.tsx:386
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\error\ErrorDisplayComponent.tsx:230
  - 函数 getImpactIcon 有 259 行，建议拆分

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:319
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:320
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:327
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:328
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:329
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:330
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:340
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:341
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:342
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:343
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:344
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:345
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:346
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:347
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:348
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:349
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:350
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:351
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:352
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:353
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:357
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:358
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:359
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:360
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:361
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:362
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:363
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:364
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:365
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:366
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:367
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:420
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:421
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorDisplayComponent.tsx:422
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - components\ErrorBoundary.tsx:146
  - 函数 result 有 9 个参数，建议使用对象参数

- **Large Class** (high) - components\ErrorBoundary.tsx:73
  - 类 ErrorBoundary 有 48 个方法，建议拆分

- **Deep Nesting** (medium) - components\ErrorBoundary.tsx:151
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ErrorBoundary.tsx:152
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ErrorBoundary.tsx:153
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:176
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:177
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:178
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:179
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:180
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:181
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:182
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:183
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:184
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:185
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:186
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:187
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:188
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:189
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:190
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:191
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:192
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:193
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:194
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\displays\GamePlayerStatusDisplay.tsx:179
  - 函数 getPlayerCardClass 有 102 行，建议拆分

- **Deep Nesting** (medium) - components\game\displays\GamePlayerStatusDisplay.tsx:232
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\displays\GamePlayerStatusDisplay.tsx:233
  - 嵌套深度 6，建议重构

- **Long Function** (medium) - components\game\displays\GameStateDisplay.tsx:102
  - 函数 canAdvancePhase 有 170 行，建议拆分

- **Long Function** (medium) - components\game\displays\RoleSkillInfo.tsx:105
  - 函数 getFactionColor 有 70 行，建议拆分

- **Long Function** (medium) - components\game\displays\SkillEffectsDisplay.tsx:115
  - 函数 getProgressPercentage 有 66 行，建议拆分

- **Long Function** (medium) - components\game\feedback\OperationFeedback.tsx:117
  - 函数 renderIcon 有 78 行，建议拆分

- **Deep Nesting** (medium) - components\game\feedback\OperationFeedback.tsx:91
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\feedback\OperationFeedback.tsx:92
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\interfaces\EnhancedSkillManager.tsx:178
  - 函数 triggerHunterDying 有 229 行，建议拆分

- **Deep Nesting** (medium) - components\game\interfaces\EnhancedSkillManager.tsx:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\EnhancedSkillManager.tsx:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\EnhancedSkillManager.tsx:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\EnhancedSkillManager.tsx:120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\EnhancedSkillManager.tsx:123
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\EnhancedSkillManager.tsx:124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\EnhancedSkillManager.tsx:125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\EnhancedSkillManager.tsx:190
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\EnhancedSkillManager.tsx:191
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\EnhancedSkillManager.tsx:192
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\interfaces\NightSkillInterface.tsx:165
  - 函数 getSkillStatusColor 有 153 行，建议拆分

- **Long Parameter List** (low) - components\game\interfaces\NightSkillInterface.tsx:126
  - 函数 result 有 6 个参数，建议使用对象参数

- **Long Function** (medium) - components\game\interfaces\RoleSpecificSkills.tsx:203
  - 函数 parseInvestigationResult 有 84 行，建议拆分

- **Deep Nesting** (medium) - components\game\interfaces\RoleSpecificSkills.tsx:260
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\RoleSpecificSkills.tsx:261
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\RoleSpecificSkills.tsx:262
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\RoleSpecificSkills.tsx:263
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\RoleSpecificSkills.tsx:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\RoleSpecificSkills.tsx:335
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\RoleSpecificSkills.tsx:336
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\interfaces\SkillConflictResolver.tsx:172
  - 函数 getResolutionRuleText 有 185 行，建议拆分

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:249
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:250
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:251
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:252
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:266
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:267
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:268
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:274
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:275
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:276
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:277
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:278
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:279
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:280
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:281
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:282
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:283
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:83
  - 函数 handleUsePoison 有 114 行，建议拆分

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:90
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:91
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:92
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:93
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:94
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:96
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:128
  - 函数 OptimizedEnhancedSkillPanel 有 14 个参数，建议使用对象参数

- **Long Parameter List** (low) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:354
  - 函数 result 有 7 个参数，建议使用对象参数

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:190
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:191
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:192
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:193
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:194
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:199
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:200
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:201
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:202
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:203
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:204
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:205
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:372
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:373
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:376
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:377
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:378
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:486
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:487
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:488
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:489
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:490
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:494
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:495
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:496
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:497
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:498
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:499
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:500
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:501
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:521
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:522
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:523
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:524
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:650
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:651
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:818
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:819
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\optimized\PerformanceMonitor.tsx:368
  - 函数 getTrendIcon 有 331 行，建议拆分

- **Long Parameter List** (low) - components\game\optimized\PerformanceMonitor.tsx:148
  - 函数 PerformanceMonitor 有 8 个参数，建议使用对象参数

- **Long Function** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:495
  - 函数 offset 有 76 行，建议拆分

- **Long Parameter List** (low) - components\game\optimized\SkillEffectsVirtualList.tsx:119
  - 函数 SkillEffectsVirtualList 有 8 个参数，建议使用对象参数

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:291
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:292
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:293
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:294
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:295
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:296
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:297
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:418
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:469
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:470
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:471
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - components\game\panels\EnhancedSkillPanel.tsx:117
  - 函数 EnhancedSkillPanel 有 10 个参数，建议使用对象参数

- **Long Parameter List** (low) - components\game\panels\EnhancedSkillPanel.tsx:244
  - 函数 result 有 7 个参数，建议使用对象参数

- **Deep Nesting** (medium) - components\game\panels\EnhancedSkillPanel.tsx:477
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\EnhancedSkillPanel.tsx:478
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\EnhancedSkillPanel.tsx:567
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\EnhancedSkillPanel.tsx:568
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\EnhancedSkillPanel.tsx:569
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\panels\GameInfoPanel.tsx:72
  - 函数 getGameStatusDisplay 有 114 行，建议拆分

- **Long Parameter List** (low) - components\game\panels\GameSettingsPanel.tsx:61
  - 函数 success 有 6 个参数，建议使用对象参数

- **Deep Nesting** (medium) - components\game\panels\GameSettingsPanel.tsx:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSettingsPanel.tsx:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSettingsPanel.tsx:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSettingsPanel.tsx:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSettingsPanel.tsx:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSettingsPanel.tsx:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSettingsPanel.tsx:78
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\panels\GameSkillPanel.tsx:130
  - 函数 handleUseSkill 有 120 行，建议拆分

- **Long Parameter List** (low) - components\game\panels\GameSkillPanel.tsx:87
  - 函数 canUseSkill 有 6 个参数，建议使用对象参数

- **Deep Nesting** (medium) - components\game\panels\GameSkillPanel.tsx:113
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSkillPanel.tsx:114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSkillPanel.tsx:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSkillPanel.tsx:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSkillPanel.tsx:117
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\panels\PlayerStatusManager.tsx:176
  - 函数 getStatusChangeAnimation 有 115 行，建议拆分

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:112
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:113
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:114
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:115
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:144
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:145
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:146
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:147
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:246
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:248
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:249
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:250
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\panels\RoleStatusPanel.tsx:72
  - 函数 togglePlayerExpansion 有 141 行，建议拆分

- **Deep Nesting** (medium) - components\game\panels\RoleStatusPanel.tsx:123
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\RoleStatusPanel.tsx:124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\RoleStatusPanel.tsx:125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\RoleStatusPanel.tsx:126
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\RoleStatusPanel.tsx:172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\RoleStatusPanel.tsx:173
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\RoleStatusPanel.tsx:175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\RoleStatusPanel.tsx:176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\RoleStatusPanel.tsx:178
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\RoleStatusPanel.tsx:179
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\RoleStatusPanel.tsx:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\RoleStatusPanel.tsx:182
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\panels\SkillSystemManager.tsx:108
  - 函数 stats 有 134 行，建议拆分

- **Long Function** (medium) - components\game\panels\SkillUsePanel.tsx:167
  - 函数 handleSkillUse 有 77 行，建议拆分

- **Long Parameter List** (low) - components\game\panels\SkillUsePanel.tsx:117
  - 函数 result 有 6 个参数，建议使用对象参数

- **Long Parameter List** (low) - components\game\panels\SkillUsePanel.tsx:171
  - 函数 frontendValidation 有 6 个参数，建议使用对象参数

- **Long Parameter List** (low) - components\game\panels\SkillUsePanel.tsx:185
  - 函数 result 有 6 个参数，建议使用对象参数

- **Long Function** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:79
  - 函数 fetchData 有 52 行，建议拆分

- **Long Function** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:186
  - 函数 getStatusMessage 有 127 行，建议拆分

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:259
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:261
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:262
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:282
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:283
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:284
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:285
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:286
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:287
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:288
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:289
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:290
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:291
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:292
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:293
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\panels\StudentSystemPanel.tsx:500
  - 函数 getGameStatusInfo 有 100 行，建议拆分

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:162
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:180
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:386
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:387
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:388
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:389
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:391
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:449
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:450
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:451
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:452
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:453
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:454
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:455
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:456
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:457
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:458
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:459
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:460
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:461
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:462
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:463
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:464
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:465
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:466
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:468
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:469
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:470
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:471
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:476
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:477
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:478
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\skill\SkillConflictVisualization.tsx:137
  - 函数 getResolutionExplanation 有 163 行，建议拆分

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:94
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:95
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:96
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:99
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:100
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:101
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:102
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:103
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:104
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\smart-hints\SmartHintSystem.tsx:299
  - 函数 getPriorityBadge 有 102 行，建议拆分

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:121
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:122
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:123
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:126
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:164
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:165
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:169
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:178
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:179
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:180
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:184
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:189
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:190
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:191
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:192
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:193
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:194
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:195
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:208
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:209
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:210
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:211
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:212
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:213
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:214
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:224
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:225
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:227
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:246
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentPreviousQuestionDisplay.tsx:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentPreviousQuestionDisplay.tsx:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentPreviousQuestionDisplay.tsx:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentPreviousQuestionDisplay.tsx:78
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\student\StudentQuestionDisplay.tsx:67
  - 函数 getOptionText 有 92 行，建议拆分

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:113
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:118
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\judge\management\AnswerRecordPanel.tsx:137
  - 函数 getStatusMessage 有 137 行，建议拆分

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:85
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:86
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:87
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:88
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:89
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:90
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:91
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:93
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:94
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:95
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:96
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:97
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:98
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:219
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:220
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:221
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:222
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:236
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:237
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:242
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:243
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:244
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:245
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:246
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:247
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:248
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:249
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:250
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:251
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:252
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:253
  - 嵌套深度 6，建议重构

- **Long Function** (medium) - components\judge\management\JudgeActionPanel.tsx:127
  - 函数 handleQuitJudge 有 168 行，建议拆分

- **Deep Nesting** (medium) - components\judge\management\JudgeActionPanel.tsx:150
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\JudgeActionPanel.tsx:151
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\JudgeActionPanel.tsx:152
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\JudgeActionPanel.tsx:153
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\judge\management\PlayerStatusPanel.tsx:120
  - 函数 isPlayerOnline 有 108 行，建议拆分

- **Long Function** (medium) - components\judge\management\PreparationPhaseDialog.tsx:103
  - 函数 handleStartGame 有 109 行，建议拆分

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:81
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:82
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:83
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:126
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:127
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\judge\management\QuestionBankDialog.tsx:166
  - 函数 formattedQuestions 有 69 行，建议拆分

- **Long Function** (medium) - components\judge\management\QuestionBankDialog.tsx:423
  - 函数 updateManualQuestion 有 88 行，建议拆分

- **Long Parameter List** (low) - components\judge\management\QuestionBankDialog.tsx:405
  - 函数 questionsToSave 有 11 个参数，建议使用对象参数

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:195
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:196
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:197
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:198
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:199
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:200
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:201
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:202
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:203
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:204
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:205
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:206
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:207
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:208
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:209
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:210
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:211
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:254
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:255
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:310
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\judge\management\QuestionBankPanel.tsx:293
  - 函数 fileName 有 54 行，建议拆分

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:380
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:381
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:382
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:383
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:443
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:444
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:445
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:446
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:458
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:459
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:460
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:461
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:462
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:463
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:464
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:465
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:466
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:467
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:468
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:469
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:480
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:481
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:482
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:483
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:484
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:485
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:486
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:487
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:488
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:489
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:490
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\judge\management\QuestionOrderEditor.tsx:70
  - 函数 getDifficultyLabel 有 88 行，建议拆分

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:113
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:116
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:117
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:121
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:122
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:123
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:126
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:133
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:134
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:143
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\judge\management\QuestionPreview.tsx:77
  - 函数 getPhaseLabel 有 143 行，建议拆分

- **Long Function** (medium) - components\judge\management\TeacherSystemPanel.tsx:102
  - 函数 getGameStatusInfo 有 92 行，建议拆分

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:66
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:68
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:69
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:151
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:152
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:153
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:154
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\judge\monitoring\DyingStatusResolutionPanel.tsx:65
  - 函数 getDyingReasonText 有 134 行，建议拆分

- **Long Function** (medium) - components\judge\monitoring\EnhancedGameStateDisplay.tsx:108
  - 函数 getGameStatusDisplay 有 98 行，建议拆分

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:147
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:148
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:149
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:150
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:151
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:152
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:153
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:154
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:155
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:157
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:161
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:162
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:164
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:165
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:169
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:189
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:190
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:191
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:192
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:207
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:208
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:229
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:236
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:245
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:246
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:247
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:248
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:249
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:250
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:254
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:255
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\judge\monitoring\SkillSystemDashboard.tsx:125
  - 函数 getSystemStatus 有 317 行，建议拆分

- **Long Function** (medium) - components\lobby\AvatarUpload.tsx:96
  - 函数 fileName 有 65 行，建议拆分

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:65
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:66
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:68
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:88
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:90
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:121
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:144
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\lobby\PlayerInfo.tsx:66
  - 函数 fetchPlayerData 有 54 行，建议拆分

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:68
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:69
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:73
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:90
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\PlayerInfo.tsx:111
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\room\PlayersList.tsx:104
  - 函数 getReadyButtonText 有 187 行，建议拆分

- **Long Function** (medium) - components\room\RoleSelection.tsx:174
  - 函数 getRoleDesignById 有 233 行，建议拆分

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:147
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:148
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:236
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:251
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:252
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:258
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:259
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:261
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:262
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:263
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:280
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:281
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:282
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:283
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:284
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:285
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:286
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:287
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:288
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:313
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:321
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:322
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:335
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\room\RoomInfoCard.tsx:71
  - 函数 fetchRoomInfo 有 60 行，建议拆分

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:88
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:89
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:90
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:91
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:102
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:103
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:120
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - components\ui\alert.tsx:35
  - 函数 alertVariants 有 8 个参数，建议使用对象参数

- **Long Parameter List** (low) - components\ui\badge.tsx:35
  - 函数 badgeVariants 有 10 个参数，建议使用对象参数

- **Long Parameter List** (low) - components\ui\button.tsx:37
  - 函数 buttonVariants 有 18 个参数，建议使用对象参数

- **Long Parameter List** (low) - components\ui\button.tsx:73
  - 函数 Button 有 8 个参数，建议使用对象参数

- **Long Function** (medium) - components\ui\carousel.tsx:112
  - 函数 scrollNext 有 66 行，建议拆分

- **Long Function** (medium) - components\ui\chart.tsx:217
  - 函数 key 有 87 行，建议拆分

- **Deep Nesting** (medium) - components\ui\chart.tsx:114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:115
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:116
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:117
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:118
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:119
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:236
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:237
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:238
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:239
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:240
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:241
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:242
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:243
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:244
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:245
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:246
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:248
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:249
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:250
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:251
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:252
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:253
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:254
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:255
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:258
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:259
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:272
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:332
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:333
  - 嵌套深度 6，建议重构

- **Long Parameter List** (low) - components\ui\sheet.tsx:60
  - 函数 sheetVariants 有 10 个参数，建议使用对象参数

- **Deep Nesting** (medium) - components\ui\skill-progress-indicator.tsx:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\skill-progress-indicator.tsx:171
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - components\ui\toggle.tsx:36
  - 函数 toggleVariants 有 13 个参数，建议使用对象参数

- **Long Function** (medium) - components\voting\EnhancedVotingManager.tsx:190
  - 函数 handleProcessResults 有 169 行，建议拆分

- **Deep Nesting** (medium) - components\voting\EnhancedVotingManager.tsx:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\EnhancedVotingManager.tsx:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\EnhancedVotingManager.tsx:172
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\voting\VotingPanel.tsx:171
  - 函数 handleCreateSession 有 311 行，建议拆分

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:290
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:291
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:292
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:293
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:294
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:295
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:313
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:342
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:343
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:344
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:353
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:354
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:355
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:359
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:360
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:363
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:364
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:365
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:366
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:367
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:409
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:410
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - contexts\JudgePageContext.tsx:209
  - 函数 refreshLinkedQuestions 有 63 行，建议拆分

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:110
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:111
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:112
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:113
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:118
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:119
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:120
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:121
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:122
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:133
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:134
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:135
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - contexts\PermissionContext.tsx:133
  - 函数 effects 有 60 行，建议拆分

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:85
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:121
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:153
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:154
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:155
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:156
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:157
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:158
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:159
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:160
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:161
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:162
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:177
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:178
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillData.ts:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillData.ts:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillData.ts:76
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillData.ts:77
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillData.ts:78
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillData.ts:79
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillData.ts:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:37
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:38
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:39
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:40
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:43
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:44
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:45
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:46
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:47
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:48
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:49
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:50
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:51
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:52
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - hooks\skill\useSkillValidation.ts:27
  - 函数 validateSkillFrontend 有 6 个参数，建议使用对象参数

- **Long Parameter List** (low) - hooks\skill\useSkillValidation.ts:90
  - 函数 useSkillEnhanced 有 8 个参数，建议使用对象参数

- **Long Parameter List** (low) - hooks\skill\useSkillValidation.ts:104
  - 函数 frontendValidation 有 6 个参数，建议使用对象参数

- **Long Parameter List** (low) - hooks\skill\useSkillValidation.ts:217
  - 函数 canUseSkill 有 6 个参数，建议使用对象参数

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:144
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:147
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:148
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:149
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:177
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:178
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:73
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:78
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:79
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:80
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:81
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:116
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:117
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:118
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:119
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useAutoProcessDayVote.ts:26
  - 函数 processKey 有 87 行，建议拆分

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:42
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:43
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:44
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:47
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:48
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:49
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:57
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:58
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:59
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:61
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:62
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:63
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:64
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:65
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:66
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:85
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:90
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:91
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:95
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:96
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:97
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:98
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:99
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:100
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:101
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:44
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:45
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:46
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:47
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:48
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:49
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:50
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:51
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:41
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:42
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:43
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:44
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:45
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:46
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:47
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:82
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:83
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:85
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:88
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:90
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:98
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useEnhancedErrorHandler.ts:148
  - 函数 retryKey 有 64 行，建议拆分

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:164
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:165
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:177
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:178
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:179
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:180
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:191
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:192
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:193
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:194
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:262
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:263
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:264
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:265
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:266
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:267
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:268
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:269
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:270
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:271
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:272
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:273
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:274
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - hooks\useEnhancedSkillSystem.ts:63
  - 函数 skillUsesSubscription 有 6 个参数，建议使用对象参数

- **Long Parameter List** (low) - hooks\useEnhancedSkillSystem.ts:95
  - 函数 skillEffectsSubscription 有 6 个参数，建议使用对象参数

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:81
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:82
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:83
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:85
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:144
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEveningRefresh.ts:28
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEveningRefresh.ts:29
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEveningRefresh.ts:30
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useGameState.ts:44
  - 函数 fetchGameData 有 64 行，建议拆分

- **Long Function** (medium) - hooks\useGameState.ts:238
  - 函数 settings 有 79 行，建议拆分

- **Deep Nesting** (medium) - hooks\useGameState.ts:53
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:54
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:55
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:65
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:66
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:71
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:72
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:73
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:74
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:75
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:76
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:77
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:78
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:79
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:80
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:81
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:82
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:83
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:84
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:85
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:88
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:89
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:90
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:91
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:92
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:93
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:94
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:95
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:96
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:133
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:134
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:161
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:162
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:164
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:165
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:218
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:219
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:227
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:228
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:229
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:230
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:231
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:272
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:273
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:330
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:331
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:357
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:358
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:359
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:396
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:397
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:398
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:399
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:427
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:428
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:429
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:430
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:443
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:444
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:445
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:446
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:485
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:486
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:487
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:488
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:81
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:82
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:87
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:88
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:89
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:90
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:91
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:179
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:180
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:186
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:187
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useMultiChannelChat.ts:95
  - 函数 fetchMessages 有 57 行，建议拆分

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:117
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:118
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:119
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:120
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:121
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:122
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:133
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:134
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:135
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:136
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:137
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:210
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:211
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:212
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:213
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:235
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useOptimizedSupabaseQuery.ts:95
  - 函数 perfLabel 有 68 行，建议拆分

- **Long Function** (medium) - hooks\useOptimizedSupabaseQuery.ts:177
  - 函数 refetch 有 78 行，建议拆分

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:142
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\usePerformanceMonitoring.ts:26
  - 函数 shouldSample 有 186 行，建议拆分

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:45
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:46
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:47
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:144
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:147
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:148
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\usePerformanceOptimizationNew.ts:156
  - 函数 resetMetrics 有 54 行，建议拆分

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:87
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:88
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:89
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:90
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:105
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:106
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:107
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:173
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:191
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:192
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\usePermissions.ts:20
  - 函数 checkPermissions 有 51 行，建议拆分

- **Deep Nesting** (medium) - hooks\usePermissions.ts:22
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:23
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:24
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:25
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:52
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:53
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:54
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:55
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:59
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:60
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:61
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:62
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:32
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:33
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:34
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:35
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:36
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:37
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:38
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:39
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:56
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:57
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:58
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:59
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:85
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:88
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\usePlayerRoom.ts:56
  - 函数 leaveCurrentRoom 有 59 行，建议拆分

- **Deep Nesting** (medium) - hooks\usePlayerRoom.ts:42
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerRoom.ts:43
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerRoom.ts:44
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerRoom.ts:45
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\usePlayersRealtime.ts:24
  - 函数 fetchPlayers 有 115 行，建议拆分

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:35
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:36
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:37
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:46
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:47
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:48
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:53
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:54
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:55
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:56
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:57
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:58
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:59
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:60
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:61
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:62
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:63
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:64
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:65
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:66
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:67
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:68
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:69
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:73
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:74
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:75
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:76
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:77
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:78
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:79
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:80
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:81
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:82
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:83
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:84
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:85
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:86
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:87
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:88
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:89
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:90
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:91
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:92
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:93
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:94
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:95
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:96
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:97
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:98
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:42
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:43
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:44
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:45
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:46
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:47
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:48
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:49
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:50
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:51
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:52
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:53
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useRoleSelection.ts:30
  - 函数 fetchRoleSelections 有 53 行，建议拆分

- **Deep Nesting** (medium) - hooks\useRoleSelection.ts:45
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleSelection.ts:46
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleSelection.ts:47
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useRoleStates.ts:31
  - 函数 fetchRoleStates 有 57 行，建议拆分

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:61
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:62
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:63
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:64
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:65
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:66
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:68
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:69
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:73
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:77
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useRoomAnswers.ts:30
  - 函数 fetchAnswers 有 53 行，建议拆分

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:60
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:61
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:62
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:63
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:64
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:65
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:66
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:68
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:69
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:72
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useRoomChat.ts:25
  - 函数 fetchMessages 有 51 行，建议拆分

- **Long Function** (medium) - hooks\useRoomChat.ts:115
  - 函数 sendMessage 有 54 行，建议拆分

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:41
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:42
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:43
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:44
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:45
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:46
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:47
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:48
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:53
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:54
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:55
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:56
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:57
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:58
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:59
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:60
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:61
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:62
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:126
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:144
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomCleanup.ts:13
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomCleanup.ts:14
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomRealtime.ts:33
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomRealtime.ts:34
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomRealtime.ts:35
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomRealtime.ts:36
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomRealtime.ts:37
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomRealtime.ts:38
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomRealtime.ts:39
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:45
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:46
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:47
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:48
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:49
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:50
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:51
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:52
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:53
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:54
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:55
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:56
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:57
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:58
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:59
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:60
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:61
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:62
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:63
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:82
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:83
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:91
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:95
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:96
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:97
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:73
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:78
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:79
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:80
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:81
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:164
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:85
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:88
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:90
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:184
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:185
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:186
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:187
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:188
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:189
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:190
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:191
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:192
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:193
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:194
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:195
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:273
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:274
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:275
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:280
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:281
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:282
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:283
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:284
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:285
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:291
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:292
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:293
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:294
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:295
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:297
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:301
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:302
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:396
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:397
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUnifiedErrorHandling.ts:398
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useUXOptimization.ts:267
  - 函数 getSmartSuggestions 有 111 行，建议拆分

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:233
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:234
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:235
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:236
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:237
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:238
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:319
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:326
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useVoteResults.ts:39
  - 函数 fetchVoteResults 有 135 行，建议拆分

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:101
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:102
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:119
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useVotingSystem.ts:481
  - 函数 getVotersForTarget 有 134 行，建议拆分

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:277
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:278
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:279
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:280
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:281
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:282
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:283
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:284
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:285
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:286
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:287
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:288
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:289
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:290
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:291
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:292
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:293
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:294
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:295
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:319
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:326
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:327
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:328
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:329
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:330
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:331
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:507
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:508
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:509
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:510
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:516
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:517
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:518
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:526
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:527
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:528
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:529
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:530
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:531
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:532
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:533
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:534
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:535
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:536
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:537
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:542
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:543
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:544
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:547
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:548
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:549
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:550
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useWitchPotionManager.ts:147
  - 函数 useAttackPotion 有 101 行，建议拆分

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:173
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:174
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:179
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:180
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:18
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:19
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:20
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:21
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:22
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:23
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:24
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:25
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:26
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:27
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:28
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:30
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:31
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:32
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:33
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:34
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:35
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:36
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:37
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:38
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:39
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:40
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:42
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:43
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:44
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:45
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:46
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:47
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:48
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:49
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:50
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:51
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:52
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:55
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:56
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:57
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:58
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:59
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:60
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:62
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:63
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:64
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:65
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:66
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:73
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:82
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:83
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:85
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:88
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:90
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:113
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:121
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:122
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:126
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:133
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:144
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:147
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:148
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:149
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:150
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:151
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:152
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:157
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:158
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:159
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:160
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:161
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:162
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:164
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:165
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:169
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:173
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:174
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:177
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:179
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:180
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:184
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:185
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:186
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:187
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:188
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:191
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:192
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:193
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:194
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:195
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:196
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:201
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:202
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:203
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:204
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:205
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:207
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:208
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:209
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:210
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:211
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:212
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:213
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:214
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:215
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:218
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:219
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:224
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:225
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:227
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:229
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:236
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:237
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:238
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:239
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:240
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:241
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:242
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:243
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:244
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:245
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:246
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:250
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:251
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:252
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:253
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:254
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:255
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:261
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:262
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:263
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:264
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:265
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:266
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:267
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:268
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:272
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:273
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:274
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:275
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:276
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:277
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:278
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:279
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:280
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:282
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:283
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:284
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:285
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:286
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:287
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:288
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:289
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:290
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:291
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:294
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:295
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:297
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:301
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:302
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:311
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:312
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:313
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:321
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:322
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:323
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:326
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:327
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:329
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:330
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:331
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:335
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:336
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:339
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:340
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:341
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:342
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:343
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:344
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:349
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:350
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:351
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:352
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:353
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:354
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:355
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:357
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:358
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:359
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:360
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:362
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:363
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:364
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:365
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:366
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:367
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:368
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:369
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:370
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:371
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:372
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:373
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:375
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:376
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:377
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:378
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:379
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:380
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:381
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:382
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:383
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:384
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:385
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:386
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:389
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:391
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:392
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:393
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:394
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:399
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:400
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:401
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:402
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:403
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:404
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:405
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:406
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:407
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:408
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:409
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:410
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:411
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:412
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:414
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:415
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:416
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:417
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:418
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:420
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:421
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:422
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:423
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:424
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:425
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:426
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:427
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:429
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:430
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:431
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:432
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:433
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:434
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:435
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:436
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:437
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:438
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:439
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:441
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:442
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:447
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:448
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:449
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:450
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:451
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:452
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:454
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:455
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:456
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:457
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:458
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:459
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:461
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:462
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:463
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:464
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:465
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:466
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:469
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:470
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:471
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:472
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:473
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:474
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:479
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:480
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:481
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:482
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:483
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:484
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:485
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:486
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:487
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:488
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:489
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:490
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:492
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:493
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:494
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:495
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:496
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:497
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:498
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:499
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:500
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:501
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:502
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:503
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:505
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:506
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:507
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:508
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:509
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:510
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:511
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:512
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:513
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:514
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:515
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:516
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:519
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:520
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:521
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:522
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:523
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:524
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:526
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:527
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:528
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:529
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:530
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:531
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:536
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:537
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:538
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:539
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:540
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:541
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:542
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:543
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:544
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:545
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:546
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:548
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:549
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:550
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:551
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:552
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:553
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:554
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:555
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:556
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:557
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:558
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:560
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:561
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:562
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:563
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:564
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:565
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:566
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:567
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:568
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:569
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:570
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:573
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:574
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:575
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:576
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:577
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:578
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:580
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:581
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:582
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:583
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:584
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:585
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:587
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:588
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:589
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:590
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:591
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:592
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:594
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:595
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:596
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:597
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:598
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:599
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:604
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:605
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:606
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:607
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:608
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:609
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:610
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:611
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:613
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:614
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:615
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:616
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:617
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:618
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:619
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:620
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:622
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:623
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:624
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:625
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:626
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:627
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:628
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:629
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:632
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:633
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:634
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:635
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:636
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:637
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:642
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:643
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:644
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:645
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:646
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:647
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:649
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:650
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:651
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:652
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:653
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:654
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:656
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:657
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:658
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:659
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:660
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:661
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:664
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:665
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:666
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:667
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:668
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:669
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:671
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:672
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:673
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:674
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:675
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:676
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:681
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:682
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:683
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:684
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:685
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:686
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:687
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:688
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:689
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:690
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:691
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:693
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:694
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:695
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:696
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:697
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:698
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:699
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:700
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:701
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:702
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:703
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:705
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:706
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:707
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:708
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:709
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:710
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:711
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:712
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:713
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:714
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:715
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:718
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:719
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:720
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:721
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:722
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:723
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:725
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:726
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:727
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:728
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:729
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:730
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:735
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:736
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:737
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:738
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:739
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:740
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:741
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:742
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:743
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:744
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:746
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:747
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:748
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:749
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:750
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:751
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:752
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:753
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:754
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:755
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:757
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:758
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:759
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:760
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:761
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:762
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:763
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:764
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:765
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:766
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:769
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:770
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:771
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:772
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:773
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:774
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:776
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:777
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:778
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:779
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:780
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:781
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:786
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:787
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:788
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:789
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:790
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:791
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:792
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:793
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:794
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:795
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:796
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:797
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:798
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:799
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:800
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:801
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:803
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:804
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:805
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:806
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:807
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:808
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:809
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:810
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:811
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:812
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:813
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:814
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:815
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:816
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:817
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:818
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:820
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:821
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:822
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:823
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:824
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:825
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:826
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:827
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:828
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:829
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:830
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:831
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:832
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:833
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:834
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:835
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:838
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:839
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:840
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:841
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:842
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:843
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:845
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:846
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:847
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:848
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:849
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:850
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:852
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:853
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:854
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:855
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:856
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:857
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:859
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:860
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:861
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:862
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:863
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:864
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:866
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:867
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:868
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:869
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:870
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:871
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:876
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:877
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:878
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:879
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:880
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:881
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:882
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:883
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:884
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:885
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:886
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:887
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:888
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:889
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:890
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:891
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:892
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:894
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:895
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:896
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:897
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:898
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:899
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:900
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:901
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:902
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:903
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:904
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:905
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:906
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:907
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:908
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:909
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:910
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:912
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:913
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:914
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:915
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:916
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:917
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:918
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:919
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:920
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:921
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:922
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:923
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:924
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:925
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:926
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:927
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:928
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:931
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:932
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:933
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:934
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:935
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:936
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:941
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:942
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:943
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:944
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:945
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:946
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:947
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:948
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:949
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:950
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:951
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:952
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:953
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:954
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:956
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:957
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:958
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:959
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:960
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:961
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:962
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:963
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:964
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:965
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:966
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:967
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:968
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:969
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:971
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:972
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:973
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:974
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:975
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:976
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:977
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:978
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:979
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:980
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:981
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:982
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:983
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:984
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:987
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:988
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:989
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:990
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:991
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:992
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:994
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:995
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:996
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:997
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:998
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:999
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1004
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1005
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1006
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1007
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1008
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1009
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1011
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1012
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1013
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1014
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1015
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1016
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1018
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1019
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1020
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1021
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1022
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1023
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1026
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1027
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1028
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1029
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1030
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1031
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1036
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1037
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1038
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1039
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1040
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1041
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1042
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1043
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1044
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1045
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1047
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1048
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1049
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1050
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1051
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1052
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1053
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1054
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1055
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1056
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1058
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1059
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1060
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1061
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1062
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1063
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1064
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1065
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1066
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1067
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1072
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1073
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1074
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1075
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1076
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1077
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1078
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1079
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1081
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1082
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1083
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1084
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1085
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1086
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1087
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1088
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1090
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1091
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1092
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1093
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1094
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1095
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1096
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1097
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1113
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1121
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1122
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1123
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1126
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1133
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1134
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1144
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1151
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1152
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1153
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1154
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1155
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1157
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1158
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1159
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1160
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1161
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1162
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1165
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1169
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1173
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1174
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1177
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1179
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1180
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1184
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1185
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1186
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1187
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1188
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1189
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1190
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1191
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1194
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1195
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1196
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1197
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1198
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1199
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1204
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1205
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1207
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1208
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1209
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1210
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1211
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1212
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1213
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1214
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1215
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1218
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1219
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1224
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1225
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1227
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1236
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1237
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1238
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1239
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1240
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1241
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1248
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1249
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1250
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1251
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1252
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1261
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1262
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1263
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1300
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1301
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1302
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1310
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1326
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1327
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1355
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1357
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1358
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1359
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1360
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1365
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1366
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1367
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1368
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1374
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1375
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1376
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1377
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1378
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1379
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1388
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1389
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1391
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1396
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1397
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1398
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1399
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1404
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1405
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1406
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1407
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1416
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1417
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1418
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1420
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1425
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1426
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1427
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1428
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1429
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1430
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1435
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1436
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1437
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1438
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1439
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1441
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1450
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1451
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1452
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1453
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1454
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1455
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1456
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1457
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1458
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1463
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1464
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1465
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1505
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1506
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1507
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1508
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1509
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1510
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1511
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1516
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1517
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1518
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1519
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1532
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1533
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1534
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1535
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1540
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1541
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1542
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1543
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1544
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1553
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1554
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1555
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1556
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1557
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1562
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1563
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1564
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1565
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1574
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1575
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1576
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1577
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1578
  - 嵌套深度 5，建议重构

- **Large Class** (high) - lib\debugUtils.ts:46
  - 类 PerformanceMonitor 有 27 个方法，建议拆分

- **Large Class** (high) - lib\performanceReporter.ts:20
  - 类 PerformanceReporter 有 74 个方法，建议拆分

- **Deep Nesting** (medium) - lib\performanceReporter.ts:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:90
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:91
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:92
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:121
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:122
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:123
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:143
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - middleware\apiSecurityMiddleware.ts:472
  - 函数 validationResult 有 11 个参数，建议使用对象参数

- **Large Class** (high) - middleware\apiSecurityMiddleware.ts:187
  - 类 ApiSecurityMiddleware 有 294 个方法，建议拆分

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:361
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:362
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:363
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:368
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:369
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:370
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:371
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:426
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:427
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:428
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:434
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:435
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:436
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:437
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:438
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:439
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:440
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:441
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:453
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:454
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:455
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:456
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:457
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:458
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:459
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:460
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:461
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:462
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:463
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:464
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:465
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:466
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:472
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:473
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:474
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:475
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:476
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:477
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:478
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:481
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:482
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:483
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:484
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:485
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:486
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:487
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:488
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:489
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:620
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:621
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:622
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:634
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:635
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:636
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:637
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:638
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:639
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:640
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:641
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:642
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:643
  - 嵌套深度 5，建议重构

- **Large Class** (high) - middleware\permissionMiddleware.ts:170
  - 类 PermissionMiddleware 有 229 个方法，建议拆分

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:239
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:240
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:245
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:246
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:254
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:255
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:256
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:257
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:258
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:259
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:260
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:261
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:262
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:263
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:275
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:276
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:280
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:281
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:282
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:283
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:284
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:604
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:605
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:658
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:659
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:660
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:661
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:662
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:690
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:691
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:692
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:693
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:694
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:749
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:750
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - pages\GameLobby.tsx:552
  - 函数 playAsJudge 有 104 行，建议拆分

- **Deep Nesting** (medium) - pages\GameLobby.tsx:193
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:194
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:203
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:204
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:205
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:207
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:215
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:218
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:219
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:224
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:225
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:259
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:261
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:266
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:267
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:268
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:327
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:328
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:329
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:330
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:349
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:350
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:351
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:352
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:418
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:420
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:421
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:441
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:442
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:443
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:497
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:498
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:499
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:500
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:512
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:513
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:514
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:515
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:532
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:533
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:534
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:535
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:574
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:575
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:576
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:577
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - pages\GamePage.tsx:72
  - 函数 canUse 有 6 个参数，建议使用对象参数

- **Long Function** (medium) - pages\GameRoom.tsx:192
  - 函数 fetchData 有 170 行，建议拆分

- **Long Function** (medium) - pages\GameRoom.tsx:531
  - 函数 handleLeaveRoom 有 153 行，建议拆分

- **Deep Nesting** (medium) - pages\GameRoom.tsx:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:109
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:110
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:111
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:112
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:113
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:114
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:154
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:155
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:157
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:158
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:159
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:160
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:196
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:197
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:198
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:199
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:200
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:201
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:202
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:203
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:204
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:205
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:207
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:208
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:209
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:213
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:214
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:215
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:218
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:219
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:224
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:225
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:227
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:229
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:230
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:231
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:232
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:233
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:234
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:235
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:236
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:237
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:238
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:239
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:240
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:241
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:242
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:243
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:244
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:245
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:246
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:247
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:248
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:249
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:250
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:251
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:252
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:253
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:254
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:255
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:256
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:257
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:258
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:259
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:260
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:261
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:262
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:263
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:264
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:265
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:266
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:267
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:268
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:269
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:270
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:271
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:272
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:273
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:274
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:275
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:276
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:277
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:278
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:279
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:280
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:281
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:282
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:283
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:284
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:285
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:286
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:287
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:288
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:289
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:290
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:291
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:292
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:293
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:294
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:295
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:297
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:300
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:301
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:302
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:306
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:307
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:308
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:309
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:310
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:311
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:312
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:313
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:314
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:315
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:316
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:317
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:318
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:319
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:320
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:321
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:322
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:323
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:324
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:325
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:326
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:327
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:328
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:329
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:330
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:331
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:332
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:333
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:334
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:335
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:336
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:337
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:338
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:339
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:340
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:341
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:342
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:343
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:344
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:345
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:346
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:350
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:351
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:352
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:353
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:374
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:375
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:376
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:377
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:413
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:414
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:415
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:418
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:420
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:421
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:473
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:474
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:475
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:478
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:479
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:480
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:481
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:536
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:537
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:538
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:542
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:543
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:544
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:545
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:73
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:82
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:83
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:84
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:85
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:86
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:87
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:88
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:90
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:91
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:92
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - services\analyticsService.ts:85
  - 函数 statsMap 有 61 行，建议拆分

- **Large Class** (high) - services\analyticsService.ts:35
  - 类 AnalyticsService 有 120 个方法，建议拆分

- **Deep Nesting** (medium) - services\analyticsService.ts:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:94
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:95
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:96
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:97
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:98
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:133
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:134
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:177
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:250
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:251
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:252
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:253
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:254
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:255
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:256
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:261
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:262
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:270
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:271
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:272
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:273
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:274
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:275
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:289
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:290
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:291
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:292
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\analyticsService.ts:293
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\automatedSecurityService.ts:81
  - 类 AutomatedSecurityService 有 174 个方法，建议拆分

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:287
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:288
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:289
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:290
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:291
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:292
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:293
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:294
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:295
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:302
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:505
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:506
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:507
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:508
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:509
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:510
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:511
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:512
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:513
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:514
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:515
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\automatedSecurityService.ts:516
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\cacheService.ts:148
  - 类 CacheService 有 318 个方法，建议拆分

- **Deep Nesting** (medium) - services\cacheService.ts:499
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:500
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:501
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:502
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:505
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:506
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:507
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:508
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:512
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:513
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:514
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:515
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:551
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:552
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:553
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:554
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:557
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:558
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:559
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:560
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:564
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:565
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:566
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:567
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:592
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:593
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:610
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:611
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:884
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:885
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:886
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1016
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1017
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1018
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1019
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1020
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1021
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1022
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1023
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1024
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1025
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1052
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1053
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1054
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1055
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1118
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1119
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1120
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1121
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1122
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1123
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1124
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1187
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1188
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1189
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1190
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1191
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1192
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1193
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1194
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1195
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1196
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1197
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1198
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1199
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1200
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\cacheService.ts:1201
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\configurationService.ts:110
  - 类 ConfigurationService 有 220 个方法，建议拆分

- **Deep Nesting** (medium) - services\configurationService.ts:510
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:511
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:512
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:560
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:561
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:562
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:604
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:605
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:711
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:712
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:713
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:714
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:745
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:746
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:747
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:748
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:751
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:752
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:753
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:803
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:804
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:805
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:806
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:807
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:808
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:809
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:810
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:811
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:812
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:813
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:814
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:815
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:816
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:817
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:818
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:819
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:820
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:821
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:822
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:823
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:824
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:825
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:826
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:827
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:828
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:829
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:830
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:831
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:832
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:833
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:834
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:835
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:836
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:837
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:838
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:839
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:840
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:841
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:842
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:847
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:848
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:849
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:850
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:851
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:852
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:853
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:854
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:855
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:856
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:857
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:858
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:859
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:860
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:861
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:862
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:863
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:864
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:865
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:866
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:867
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:868
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:869
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:870
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:875
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:876
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:877
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:878
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:879
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:880
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:881
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:886
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:887
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:888
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:889
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:890
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:891
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:892
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:897
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:898
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:899
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:900
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:901
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:902
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:903
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:908
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:909
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:910
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:911
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:912
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:913
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:914
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:915
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:916
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:917
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:918
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:919
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:920
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:921
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:922
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:923
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:924
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:925
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:930
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:931
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:932
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:933
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:934
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:935
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:936
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:937
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:938
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:939
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:940
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:941
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:942
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:943
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:944
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:945
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:946
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1031
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1032
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1033
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1034
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1065
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1066
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1082
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1083
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1084
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1085
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1094
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1095
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1096
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1097
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1155
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1157
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1160
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1161
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1162
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\configurationService.ts:1168
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\dyingStatusService.ts:26
  - 类 DyingStatusService 有 30 个方法，建议拆分

- **Long Parameter List** (low) - services\enhancedSkillService.ts:172
  - 函数 validation 有 6 个参数，建议使用对象参数

- **Long Parameter List** (low) - services\enhancedSkillService.ts:333
  - 函数 skillError 有 7 个参数，建议使用对象参数

- **Long Parameter List** (low) - services\enhancedSkillService.ts:360
  - 函数 networkError 有 7 个参数，建议使用对象参数

- **Large Class** (high) - services\enhancedSkillService.ts:71
  - 类 EnhancedSkillService 有 156 个方法，建议拆分

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:218
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:321
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:322
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:323
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:326
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:327
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:328
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:375
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:376
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:377
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:378
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:427
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\enhancedSkillService.ts:428
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - services\errorHandlingService.ts:216
  - 函数 error 有 11 个参数，建议使用对象参数

- **Long Parameter List** (low) - services\errorHandlingService.ts:239
  - 函数 error 有 9 个参数，建议使用对象参数

- **Large Class** (high) - services\errorHandlingService.ts:143
  - 类 ErrorHandlingService 有 236 个方法，建议拆分

- **Deep Nesting** (medium) - services\errorHandlingService.ts:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:218
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:219
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:223
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:224
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:225
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:226
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:227
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:228
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:229
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:230
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:239
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:240
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:241
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:242
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:243
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:244
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:245
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:246
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:247
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:248
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:249
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:250
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:251
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:252
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:267
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:268
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:319
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:439
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:441
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:442
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:443
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:444
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:445
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:639
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:640
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:641
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:642
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:643
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:644
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:645
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:646
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:647
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:648
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:649
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:650
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:651
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:652
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:653
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:654
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:655
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:656
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:657
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:658
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:699
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:700
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:701
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:702
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:703
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:731
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:732
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:733
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:873
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:874
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorHandlingService.ts:875
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\errorMonitoringService.ts:278
  - 类 ErrorMonitoringService 有 225 个方法，建议拆分

- **Deep Nesting** (medium) - services\errorMonitoringService.ts:671
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorMonitoringService.ts:672
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorMonitoringService.ts:702
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorMonitoringService.ts:703
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorMonitoringService.ts:704
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorMonitoringService.ts:723
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorMonitoringService.ts:724
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorMonitoringService.ts:725
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorMonitoringService.ts:726
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorMonitoringService.ts:727
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorMonitoringService.ts:728
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorMonitoringService.ts:729
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\errorMonitoringService.ts:730
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorMonitoringService.ts:882
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\errorMonitoringService.ts:883
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\gameService.ts:13
  - 类 GameService 有 38 个方法，建议拆分

- **Large Class** (high) - services\index.ts:80
  - 类 ServiceManager 有 42 个方法，建议拆分

- **Deep Nesting** (medium) - services\index.ts:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\index.ts:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\index.ts:210
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\index.ts:211
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\index.ts:309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\index.ts:310
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\index.ts:312
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\index.ts:313
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\monitoringService.ts:35
  - 类 MonitoringService 有 78 个方法，建议拆分

- **Deep Nesting** (medium) - services\monitoringService.ts:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:88
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:90
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:91
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\monitoringService.ts:104
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\passiveSkillService.ts:17
  - 类 PassiveSkillService 有 54 个方法，建议拆分

- **Deep Nesting** (medium) - services\passiveSkillService.ts:48
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:49
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:50
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:51
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:52
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:53
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:54
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:55
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:56
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:57
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:60
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:61
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:62
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:113
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:123
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:169
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:173
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:211
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:212
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:213
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:214
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:224
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:242
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\passiveSkillService.ts:243
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\performanceMonitoringService.ts:133
  - 类 PerformanceMonitoringService 有 223 个方法，建议拆分

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:262
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:263
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:264
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:265
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:266
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:267
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:268
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:269
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:270
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:271
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:272
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:273
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:274
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:282
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:283
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:284
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:285
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:286
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:287
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:288
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:289
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:290
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:291
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:292
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:293
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:294
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:295
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:304
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:305
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:306
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:307
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:308
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:309
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:310
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:311
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:312
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:313
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:483
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:484
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:485
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:544
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:545
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:546
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:547
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:548
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:568
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:569
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:575
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:576
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:577
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:578
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:579
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:580
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:581
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:582
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:583
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:584
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:585
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:586
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:587
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:588
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:589
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:590
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:591
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:592
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:593
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:594
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:595
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:596
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:597
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:598
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:599
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:600
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:601
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:602
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:607
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:608
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:749
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\performanceMonitoringService.ts:750
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\roomService.ts:13
  - 类 RoomService 有 61 个方法，建议拆分

- **Long Function** (medium) - services\securityAuditService.ts:287
  - 函数 validationResult 有 55 行，建议拆分

- **Long Function** (medium) - services\securityAuditService.ts:356
  - 函数 permissionResult 有 51 行，建议拆分

- **Large Class** (high) - services\securityAuditService.ts:122
  - 类 SecurityAuditService 有 164 个方法，建议拆分

- **Deep Nesting** (medium) - services\securityAuditService.ts:255
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:256
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:257
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:258
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:259
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:260
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:261
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:262
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:263
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:264
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:300
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:301
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:302
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:303
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:304
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:305
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:319
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:320
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:321
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:322
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:323
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:369
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:370
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:371
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:372
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:373
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:374
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:383
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:384
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:385
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:386
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:387
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:388
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:389
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:391
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:541
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:542
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:553
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:554
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:555
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:556
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:557
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:558
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:559
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:560
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:561
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:562
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:563
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:564
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:565
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:566
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:567
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:568
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:569
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:570
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:571
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:572
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:573
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:574
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:575
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:576
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:577
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:578
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:579
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:580
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:581
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:643
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\securityAuditService.ts:644
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - services\skillSystemService.ts:258
  - 函数 effectsData 有 6 个参数，建议使用对象参数

- **Large Class** (high) - services\skillSystemService.ts:75
  - 类 SkillSystemService 有 139 个方法，建议拆分

- **Deep Nesting** (medium) - services\skillSystemService.ts:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:310
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:311
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:312
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:319
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:321
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:322
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:329
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:330
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:331
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:339
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:340
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:341
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:342
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:349
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:350
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:351
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:352
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:359
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:360
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:361
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\skillSystemService.ts:362
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\systemAnnouncementService.ts:29
  - 类 SystemAnnouncementService 有 41 个方法，建议拆分

- **Deep Nesting** (medium) - services\systemAnnouncementService.ts:187
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\systemAnnouncementService.ts:188
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\systemAnnouncementService.ts:189
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\systemAnnouncementService.ts:190
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\votingService.ts:13
  - 类 VotingService 有 25 个方法，建议拆分

- **Long Function** (medium) - utils\advancedInputValidationSystem.ts:387
  - 函数 effectiveConfig 有 53 行，建议拆分

- **Large Class** (high) - utils\advancedInputValidationSystem.ts:274
  - 类 AdvancedInputValidationSystem 有 248 个方法，建议拆分

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:335
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:336
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:337
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:338
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:393
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:394
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:395
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:545
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:546
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:547
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:548
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:549
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:550
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:551
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:552
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:553
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:554
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:582
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:583
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:584
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:585
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:586
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:587
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:588
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:589
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:590
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:591
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:592
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:593
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:730
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:731
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:732
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:733
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:931
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:932
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:933
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:934
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:935
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:936
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:937
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:1179
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:1180
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:1181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:1182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:1234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:1235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:1236
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:1237
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\advancedRBACSystem.ts:400
  - 类 AdvancedRBACSystem 有 299 个方法，建议拆分

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:493
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:494
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:495
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:524
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:525
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:526
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:527
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:528
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:714
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:715
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:763
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:764
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:765
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:772
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:773
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:774
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:775
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:776
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:777
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:778
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:779
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:803
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:804
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:805
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:806
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:807
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:811
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:812
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:813
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:814
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:815
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:819
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:820
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:821
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:822
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:823
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:942
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:943
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:944
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:945
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:946
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:1039
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:1040
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:1041
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:1042
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:1043
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\apiSecurityConfig.ts:400
  - 类 ApiSecurityConfigManager 有 210 个方法，建议拆分

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:469
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:470
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:471
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:472
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:473
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:474
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:475
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:485
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:486
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:487
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:488
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:510
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:511
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:512
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:513
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:514
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:515
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:516
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:517
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:518
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:519
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:520
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:521
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:523
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:524
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:525
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:526
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:527
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:533
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:534
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:535
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:536
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:537
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:555
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:556
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:557
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:558
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:560
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:561
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:562
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:563
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:564
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:565
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:582
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:583
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:585
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:586
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:588
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:589
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:591
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:592
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:609
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:610
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:612
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:613
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:618
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:619
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:632
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:633
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:634
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:635
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:638
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:639
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:640
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:641
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:642
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:643
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:644
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:657
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:658
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:659
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:660
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:661
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:662
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:663
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:664
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:667
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:668
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:669
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:670
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:712
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:713
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:714
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:715
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:716
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:717
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:771
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:772
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:773
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:774
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:868
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:869
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:870
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:871
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:933
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:934
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:935
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:936
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:937
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:938
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:939
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:1013
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:1014
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:1015
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:1016
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:1017
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:1036
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:1037
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:1040
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:1041
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:1042
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\automatedSecurityChecker.ts:204
  - 类 AutomatedSecurityChecker 有 384 个方法，建议拆分

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:346
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:347
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:357
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:939
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:940
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:941
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:942
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:943
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:944
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:945
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:946
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:947
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:948
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:1002
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:1003
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:1004
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:1006
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:1007
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:1008
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:1056
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:1057
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:1058
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:1059
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:1060
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:1061
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:361
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:362
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:447
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:448
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:449
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:450
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:451
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:452
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:453
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:454
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:455
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:456
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:457
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:458
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:459
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:460
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:461
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:462
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:463
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:464
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\errorHandling.ts:465
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\skillValidation.ts:439
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\skillValidation.ts:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\skillValidation.ts:441
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\componentRenderOptimizer.ts:42
  - 类 ComponentRenderOptimizer 有 35 个方法，建议拆分

- **Deep Nesting** (medium) - utils\componentRenderOptimizer.ts:520
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\componentRenderOptimizer.ts:521
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\componentRenderOptimizer.ts:522
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\componentRenderOptimizer.ts:523
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\componentRenderOptimizer.ts:524
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\componentRenderOptimizer.ts:525
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\comprehensiveSecurityAudit.ts:131
  - 类 ComprehensiveSecurityAudit 有 281 个方法，建议拆分

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:241
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:242
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:243
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:244
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:245
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:441
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:442
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:443
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:444
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:445
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:446
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:447
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:448
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:449
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:498
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:499
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:500
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:501
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:502
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:503
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:504
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:505
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:506
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:507
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:508
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:509
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:510
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:619
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:620
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:621
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:622
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:623
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:624
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:625
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:626
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:627
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:628
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:629
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:665
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:666
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:667
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:668
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:669
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:670
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:671
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:672
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:673
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:708
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:709
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:710
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:711
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:712
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:713
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:714
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:715
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:716
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\enhancedInputValidation.ts:239
  - 类 EnhancedInputValidator 有 328 个方法，建议拆分

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:398
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:399
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:413
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:414
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:415
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:418
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:420
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:421
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:422
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:423
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:424
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:425
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:426
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:427
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:428
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:429
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:430
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:431
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:432
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:433
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:434
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:445
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:446
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:447
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:463
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:464
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:465
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:466
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:467
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:499
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:500
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:501
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:502
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:503
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:504
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:505
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:530
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:531
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:532
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:533
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:534
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:535
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:536
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:537
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:538
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:539
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:540
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:541
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:542
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:543
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:544
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:545
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:546
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:547
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:548
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:549
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:550
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:551
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:552
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:553
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:554
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:555
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:556
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:557
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:558
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:559
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:560
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:561
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:562
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:563
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:564
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:565
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:566
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:567
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:568
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:569
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:570
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:571
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:572
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:573
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:597
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:598
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:599
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:600
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:601
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:602
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:623
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:624
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:626
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:627
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:629
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:630
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:641
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:642
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:643
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:644
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:664
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:665
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:666
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:667
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:668
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:669
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:670
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:671
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:672
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:673
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:674
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:675
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:676
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:677
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:678
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:679
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:680
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:681
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:682
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:683
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:684
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:685
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:686
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:687
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:688
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:689
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:690
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:691
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:692
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:693
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:694
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:695
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:696
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:697
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:698
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:699
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:700
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:701
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:702
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:703
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:704
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:705
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:706
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:707
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:708
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:709
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:710
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:711
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:712
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:713
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:714
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:715
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:716
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:717
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:718
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:719
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:720
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:721
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:722
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:723
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:724
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:725
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:726
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:727
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:728
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:729
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:730
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:731
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:732
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:733
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:734
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:735
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:736
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:737
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:738
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:739
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:740
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:741
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:742
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:743
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:744
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:745
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:746
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:747
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:748
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:749
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:750
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:751
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:752
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:753
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:754
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:755
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:756
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:757
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:758
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:759
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:760
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:761
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:762
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:763
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:764
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:765
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:766
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:767
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:768
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:769
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:770
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:771
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:772
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:773
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:774
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:775
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:776
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:777
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:778
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:779
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:780
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:781
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:782
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:783
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:784
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:785
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:786
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:787
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:788
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:789
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:790
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:791
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:792
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:793
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:794
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:795
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:796
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:797
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:798
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:799
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:800
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:801
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:802
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:803
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:804
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:805
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:806
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:807
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:808
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:809
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:810
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:811
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:812
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:813
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:814
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:815
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:816
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:817
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:818
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:819
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:820
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:821
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:822
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:823
  - 嵌套深度 9，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:824
  - 嵌套深度 9，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:825
  - 嵌套深度 9，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:826
  - 嵌套深度 9，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:827
  - 嵌套深度 9，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:828
  - 嵌套深度 9，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:829
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:830
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:831
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:832
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:833
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:834
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:835
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:836
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:839
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:840
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:841
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:842
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:843
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:844
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:845
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:846
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:847
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:866
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:867
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:868
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:869
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:870
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:871
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:872
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:873
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:874
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:875
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:876
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:877
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:878
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:879
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:880
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:881
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:882
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:883
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:884
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:885
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:886
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:887
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:888
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:889
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:892
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:893
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:894
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:895
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:896
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:897
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:898
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:899
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:900
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:920
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:921
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:922
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:923
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:924
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:925
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:926
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:927
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:928
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:933
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:934
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:935
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:936
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:937
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:938
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:939
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:940
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:941
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:946
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:947
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:948
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:949
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:950
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:951
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:952
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:953
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:954
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:973
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:974
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:975
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:976
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:977
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:978
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:979
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:980
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:981
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:986
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:987
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:988
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:989
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:990
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:991
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:992
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:993
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:994
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:999
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1000
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1001
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1002
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1003
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1004
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1005
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1006
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1007
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1024
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1025
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1026
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1027
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1028
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1029
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1030
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1031
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1032
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1038
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1039
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1040
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1041
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1042
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1043
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1044
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1045
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1046
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1070
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1071
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1072
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1073
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1074
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1075
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1076
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1077
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1078
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1084
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1085
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1086
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1087
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1088
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1089
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1090
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1091
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1092
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1093
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1094
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1097
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1098
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1099
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1100
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1101
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1102
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1103
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1104
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1125
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1126
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1127
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1128
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1129
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1130
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1131
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1139
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1140
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1141
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1142
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1143
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1144
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1145
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1151
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1152
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1153
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1154
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1155
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1156
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1157
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1158
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1159
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1167
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1168
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1169
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1170
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1171
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1172
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1173
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1174
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1175
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1183
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1184
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1185
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1186
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1187
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1188
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1189
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1190
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1191
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1192
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1209
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1210
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1211
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1212
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1213
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1214
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1215
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1216
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1225
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1226
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1227
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1228
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1229
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1230
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1231
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1232
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1238
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1239
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1240
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1241
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1242
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1243
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1244
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1245
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1246
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1252
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1253
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1254
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1255
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1256
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1257
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1258
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1259
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1260
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1261
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1262
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1263
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1264
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1265
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1266
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1267
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1268
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1269
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1270
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1271
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1272
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1273
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1290
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1291
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1292
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1293
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1294
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1295
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1296
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1297
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1307
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1308
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1309
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1310
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1311
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1312
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1313
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1314
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1315
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1316
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1317
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1325
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1326
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1327
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1328
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1329
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1330
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1331
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1332
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1333
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1334
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1335
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1336
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1343
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1344
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1345
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1346
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1347
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1348
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1349
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1350
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1351
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1352
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1353
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1354
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1355
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1371
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1372
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1373
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1434
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1435
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1436
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1437
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1438
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1457
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1458
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1476
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1477
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1495
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1496
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1497
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1498
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1515
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1516
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1610
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1611
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1634
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1635
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\enhancedPermissionSystem.ts:254
  - 类 EnhancedPermissionSystem 有 233 个方法，建议拆分

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:471
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:472
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:617
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:618
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:619
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:620
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:657
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:658
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:659
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:660
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:891
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:892
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\enhancedQueryCacheStrategy.ts:224
  - 类 EnhancedQueryCacheStrategy 有 198 个方法，建议拆分

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:326
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:327
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:328
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:387
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:388
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:613
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:614
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\enhancedRealtimeManager.ts:115
  - 类 EnhancedRealtimeManager 有 238 个方法，建议拆分

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:326
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:327
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:328
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:329
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:330
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:331
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:332
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:333
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:335
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:336
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:337
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:338
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:339
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:340
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:341
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:342
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:343
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:344
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:389
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:391
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:392
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:418
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:445
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:446
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:447
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:448
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:455
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:456
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:457
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:458
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:459
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:460
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:497
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:498
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:499
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:500
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:635
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:636
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:637
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:720
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:721
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:883
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:884
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\enhancedSkillSystemOptimizer.ts:91
  - 类 EnhancedSkillSystemOptimizer 有 125 个方法，建议拆分

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:180
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:235
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:236
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:237
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:238
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:239
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:240
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:241
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:242
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:243
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:244
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:245
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:246
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:322
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:323
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:325
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:326
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:327
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:328
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:406
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:407
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:408
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\enhancedUserErrorInterface.ts:157
  - 类 EnhancedUserErrorInterface 有 60 个方法，建议拆分

- **Deep Nesting** (medium) - utils\enhancedUserErrorInterface.ts:321
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserErrorInterface.ts:322
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserErrorInterface.ts:323
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\enhancedUserNotificationSystem.ts:126
  - 类 EnhancedUserNotificationSystem 有 234 个方法，建议拆分

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:495
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:496
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:497
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:498
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:499
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:500
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:501
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:502
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:503
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:504
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:505
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:506
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:507
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:508
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:678
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:679
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:680
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:681
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:682
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:683
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:684
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:685
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:686
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:687
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:808
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:809
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:895
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:896
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:897
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:898
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:899
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\errorClassifier.ts:55
  - 类 ErrorClassifier 有 89 个方法，建议拆分

- **Long Parameter List** (low) - utils\errorHandlingExamples.ts:33
  - 函数 result 有 6 个参数，建议使用对象参数

- **Large Class** (high) - utils\errorHandlingExamples.ts:88
  - 类 FormValidationExample 有 29 个方法，建议拆分

- **Large Class** (high) - utils\errorHandlingExamples.ts:172
  - 类 GameOperationExample 有 25 个方法，建议拆分

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:65
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:66
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:68
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:69
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:99
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:100
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:101
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:102
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:236
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:237
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:372
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:373
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:374
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:375
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:376
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:377
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:378
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:379
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:380
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:411
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:412
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:413
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:414
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:415
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:420
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:421
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:422
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:423
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\errorMonitoringAndReporting.ts:164
  - 类 ErrorMonitoringAndReportingSystem 有 185 个方法，建议拆分

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:259
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:261
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:262
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:263
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:434
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:435
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:456
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:457
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:458
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:459
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:472
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:473
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:570
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:571
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:572
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:762
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:763
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:764
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\globalErrorMonitor.ts:186
  - 类 GlobalErrorMonitor 有 192 个方法，建议拆分

- **Deep Nesting** (medium) - utils\globalErrorMonitor.ts:393
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\globalErrorMonitor.ts:394
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\globalErrorMonitor.ts:395
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\globalErrorMonitor.ts:396
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\globalErrorMonitor.ts:397
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\globalErrorMonitor.ts:398
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\improvedErrorSystem.ts:203
  - 函数 errorRecord 有 79 行，建议拆分

- **Large Class** (high) - utils\improvedErrorSystem.ts:24
  - 类 ErrorRecoveryStrategy 有 25 个方法，建议拆分

- **Large Class** (high) - utils\improvedErrorSystem.ts:150
  - 类 ImprovedErrorSystem 有 73 个方法，建议拆分

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:218
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:219
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:229
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:391
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:392
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\inputValidationManager.ts:253
  - 类 InputValidationManager 有 268 个方法，建议拆分

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:283
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:284
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:285
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:286
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:287
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:288
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:289
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:290
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:292
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:293
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:294
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:295
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:297
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:301
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:302
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:310
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:311
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:312
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:313
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:389
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:391
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:409
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:410
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:587
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:588
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:589
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:590
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:591
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:592
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:599
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:600
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:606
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:607
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:608
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:609
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:610
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:611
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:612
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:613
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:614
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:615
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:616
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:617
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:618
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:619
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:620
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:621
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:622
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:623
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:754
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:755
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:756
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:757
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:928
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:929
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:930
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:931
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:932
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:933
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:940
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:941
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:942
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:943
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:944
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:945
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:948
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:949
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:950
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:951
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:952
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - utils\intelligentCacheStrategy.ts:612
  - 函数 data 有 6 个参数，建议使用对象参数

- **Large Class** (high) - utils\intelligentCacheStrategy.ts:136
  - 类 IntelligentCacheStrategy 有 305 个方法，建议拆分

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:331
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:334
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:335
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:336
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:337
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:338
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:339
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:340
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:341
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:342
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:343
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:344
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:345
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:346
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:483
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:484
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:485
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:486
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:487
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:488
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:489
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:512
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:513
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:612
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:613
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:614
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:615
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:616
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\masterErrorHandler.ts:174
  - 类 MasterErrorHandler 有 127 个方法，建议拆分

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:294
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:295
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:297
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:300
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\memoryLeakPrevention.ts:87
  - 类 MemoryLeakPrevention 有 130 个方法，建议拆分

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:147
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:236
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:237
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:238
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:239
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:245
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:246
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:248
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:335
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:336
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:337
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:338
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:339
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:340
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:369
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:370
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:371
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:372
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:446
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:447
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:448
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:449
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:450
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:468
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:469
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:470
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:471
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:472
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:481
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:482
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:483
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:484
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:485
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:486
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:487
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\memoryManagementSystem.ts:77
  - 类 MemoryManagementSystem 有 174 个方法，建议拆分

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:379
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:380
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:381
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:520
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:521
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:522
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:523
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:524
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:525
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:528
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:529
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:530
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:531
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:532
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:533
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:534
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:535
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:536
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\optimizedQueryCache.ts:80
  - 类 OptimizedQueryCache 有 168 个方法，建议拆分

- **Deep Nesting** (medium) - utils\optimizedQueryCache.ts:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedQueryCache.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedQueryCache.ts:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedQueryCache.ts:666
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedQueryCache.ts:667
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedQueryCache.ts:668
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedQueryCache.ts:669
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\optimizedRenderingSystem.ts:53
  - 类 OptimizedRenderingSystem 有 54 个方法，建议拆分

- **Deep Nesting** (medium) - utils\optimizedRenderingSystem.ts:88
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedRenderingSystem.ts:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedRenderingSystem.ts:90
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\optimizedRenderingSystem.ts:91
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\optimizedRenderingSystem.ts:92
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\optimizedRenderingSystem.ts:93
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\optimizedRenderingSystem.ts:94
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\patterns\factory.ts:26
  - 类 AbstractFactory 有 33 个方法，建议拆分

- **Large Class** (high) - utils\patterns\factory.ts:173
  - 类 AsyncFactory 有 38 个方法，建议拆分

- **Deep Nesting** (medium) - utils\patterns\factory.ts:378
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\factory.ts:379
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\factory.ts:380
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\patterns\index.ts:209
  - 类 PatternRegistry 有 35 个方法，建议拆分

- **Deep Nesting** (medium) - utils\patterns\index.ts:319
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\index.ts:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\index.ts:321
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\index.ts:322
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\patterns\observer.ts:41
  - 类 EventEmitter 有 86 个方法，建议拆分

- **Deep Nesting** (medium) - utils\patterns\observer.ts:157
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:158
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:159
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:202
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:203
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:207
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:208
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:211
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:212
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:213
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:214
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:224
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:225
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:258
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:259
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:262
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:263
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:264
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:265
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\patterns\singleton.ts:18
  - 类 Singleton 有 36 个方法，建议拆分

- **Large Class** (high) - utils\patterns\singleton.ts:222
  - 类 ThreadSafeSingleton 有 34 个方法，建议拆分

- **Large Class** (high) - utils\patterns\singleton.ts:310
  - 类 SingletonRegistry 有 37 个方法，建议拆分

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:88
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:90
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:91
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:92
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:153
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:154
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:157
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:158
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:293
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:294
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:295
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:391
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:392
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:393
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:476
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:477
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\patterns\strategy.ts:37
  - 类 StrategyContext 有 62 个方法，建议拆分

- **Large Class** (high) - utils\patterns\strategy.ts:265
  - 类 ConditionalStrategySelector 有 24 个方法，建议拆分

- **Large Class** (high) - utils\patterns\strategy.ts:369
  - 类 StrategyChain 有 24 个方法，建议拆分

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:428
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:429
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:430
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:436
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:437
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:438
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\performanceCriticalFixes.ts:52
  - 类 PerformanceCriticalFixes 有 110 个方法，建议拆分

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:131
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:132
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:133
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:134
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:169
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:173
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:174
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:184
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:185
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:186
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:187
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:188
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:189
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:190
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:191
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:192
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:193
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:194
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:195
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:196
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:202
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:203
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:204
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:205
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:206
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:207
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:208
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:244
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:245
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:246
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:248
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:249
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:313
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:314
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:315
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:316
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:326
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:327
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\queryCacheOptimizer.ts:459
  - 函数 mergedConfig 有 55 行，建议拆分

- **Large Class** (high) - utils\queryCacheOptimizer.ts:210
  - 类 QueryCacheOptimizer 有 283 个方法，建议拆分

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:309
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:310
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:311
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:312
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:313
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:314
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:315
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:316
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:317
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:318
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:319
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:338
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:339
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:340
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:341
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:342
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:343
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:344
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:345
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:346
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:347
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:348
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:349
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:373
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:374
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:375
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:376
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:377
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:378
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:379
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:380
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:381
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:382
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:383
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:388
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:389
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:416
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:417
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:418
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:419
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:420
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:421
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:422
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:423
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:424
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:425
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:426
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:427
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:428
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:429
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:644
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:645
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:646
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:647
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:751
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:752
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:753
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:754
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:760
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:761
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:762
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:763
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:769
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:770
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:771
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:772
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:854
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:855
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\realtimeSubscriptionManager.ts:135
  - 类 RealtimeSubscriptionManager 有 280 个方法，建议拆分

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:328
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:329
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:330
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:337
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:338
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:339
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:340
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:343
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:344
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:345
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:349
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:350
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:351
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:352
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:353
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:374
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:375
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:376
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:379
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:380
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:383
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:384
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:385
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:386
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:391
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:392
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:393
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:394
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:418
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:462
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:463
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:464
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:467
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:468
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:474
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:475
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:476
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:477
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:491
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:492
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:493
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:494
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:592
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:593
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:594
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:595
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:598
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:599
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:600
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:604
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:605
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:606
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:607
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:623
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:624
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:625
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:626
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:627
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:628
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:629
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:650
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:651
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:671
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:672
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:673
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:674
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:749
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:750
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:755
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:756
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:833
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:834
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:835
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:836
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:837
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:878
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:879
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:880
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:881
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\securityEnhancement.ts:67
  - 函数 key 有 52 行，建议拆分

- **Large Class** (high) - utils\securityEnhancement.ts:37
  - 类 SecurityEnhancement 有 95 个方法，建议拆分

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:177
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:178
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:179
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:180
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:250
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:251
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:252
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:302
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:348
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:349
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:355
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:356
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\securityMiddleware.ts:61
  - 类 SecurityMiddleware 有 93 个方法，建议拆分

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:133
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:142
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:143
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:144
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:145
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:146
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:147
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:148
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:149
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:150
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:151
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:152
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:153
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:154
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:155
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:156
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:157
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:158
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:159
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:160
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:161
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:162
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:177
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:178
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:184
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:185
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:186
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:187
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:188
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:189
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:190
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:191
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:192
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:198
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:199
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:200
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:201
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:204
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:205
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:207
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:208
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:209
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:210
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:211
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:212
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:213
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:214
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:215
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:216
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:229
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:233
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:234
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:235
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:236
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:237
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:238
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:239
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:240
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:241
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:248
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:249
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:250
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:251
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:258
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:259
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:266
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:267
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:268
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:328
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:329
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:330
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:331
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:335
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:336
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:337
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:342
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:343
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:344
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:345
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:346
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:347
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:357
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:371
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:372
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:376
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:377
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:378
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:379
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:380
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:381
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:384
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:385
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:386
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:387
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:388
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:389
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:391
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:392
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:393
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:398
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:399
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:400
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:401
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:402
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:403
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:404
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:405
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:406
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:407
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:408
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:409
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:415
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:416
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:417
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:418
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:419
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:420
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:421
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:422
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\skillBatchProcessor.ts:28
  - 类 SkillBatchProcessor 有 129 个方法，建议拆分

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:141
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:142
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:259
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:261
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:264
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:265
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:289
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:290
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:331
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:332
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:333
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:334
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:335
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\skillCache.ts:30
  - 类 SkillCacheManager 有 79 个方法，建议拆分

- **Long Parameter List** (low) - utils\skillErrorHandler.ts:299
  - 函数 skillError 有 7 个参数，建议使用对象参数

- **Large Class** (high) - utils\skillErrorHandler.ts:30
  - 类 SkillErrorHandler 有 63 个方法，建议拆分

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:126
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:144
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:145
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\skillSystemCache.ts:23
  - 类 SkillSystemCache 有 101 个方法，建议拆分

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:133
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:134
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:152
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:153
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:154
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:155
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:373
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:374
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:375
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:691
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:692
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:693
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:697
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:698
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:699
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:707
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:708
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:709
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:710
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:711
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:112
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\unifiedCacheManager.ts:223
  - 类 UnifiedCacheManager 有 199 个方法，建议拆分

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:259
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:261
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:262
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:347
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:348
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:349
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:350
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:351
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:352
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:353
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:354
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:355
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:357
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:358
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:359
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:360
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:361
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:362
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:363
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:463
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:464
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:468
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:469
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:470
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:471
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:472
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:473
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:474
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:475
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:813
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:814
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:815
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:816
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:817
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:818
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:819
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:824
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:825
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:826
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:827
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:828
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:829
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:830
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:861
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:862
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:863
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:864
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:865
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:866
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:867
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:870
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:871
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:872
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:873
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:874
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:875
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:876
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:877
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\unifiedErrorHandler.ts:115
  - 类 UnifiedErrorHandler 有 155 个方法，建议拆分

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:207
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:208
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:258
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:259
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:267
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:268
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:274
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:275
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:276
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:277
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:326
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:327
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:328
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:329
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:330
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\unifiedErrorManager.ts:133
  - 类 UnifiedErrorManager 有 184 个方法，建议拆分

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:243
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:244
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:268
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:319
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:320
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:321
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:322
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:323
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:327
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:328
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:329
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:330
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:331
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:599
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:600
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:601
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\unifiedErrorSystem.ts:431
  - 函数 enhancedContext 有 133 行，建议拆分

- **Large Class** (high) - utils\unifiedErrorSystem.ts:240
  - 类 UnifiedErrorSystem 有 251 个方法，建议拆分

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:349
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:350
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:351
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:378
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:379
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:380
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:381
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:382
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:383
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:384
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:385
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:386
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:411
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:412
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:468
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:469
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:470
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:471
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:472
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:626
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:627
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:633
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:634
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:647
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:648
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:649
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:696
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:697
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:698
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:699
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:704
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:705
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:706
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:707
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:746
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:747
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:748
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:749
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:750
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:751
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:752
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:753
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:754
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:755
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:756
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:757
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:758
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:759
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:760
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:761
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:762
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:763
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:764
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:765
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:766
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:767
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:768
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:769
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:770
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:771
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:772
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:824
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:825
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:826
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:1446
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:1447
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\unifiedPermissionManager.ts:275
  - 类 UnifiedPermissionManager 有 263 个方法，建议拆分

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:384
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:385
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:386
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:484
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:485
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:486
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:487
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:488
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:489
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:490
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:494
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:495
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:496
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:497
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:498
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:499
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:500
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:543
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:544
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:545
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:546
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:547
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:548
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:549
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:553
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:554
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:555
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:556
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:557
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:558
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:559
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:813
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:814
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:815
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:816
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:817
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:818
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:819
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:820
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:821
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:822
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:829
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:830
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:831
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:832
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\userNotificationSystem.ts:163
  - 类 UserNotificationSystem 有 215 个方法，建议拆分

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:300
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:658
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:659
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:843
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:844
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:915
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:916
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:917
  - 嵌套深度 5，建议重构

## 重复代码

发现 **3116** 处重复代码：

- components\admin\MonitoringDashboard.tsx (行 58) 与 components\admin\MonitoringDashboard.tsx (行 59)
  - 相似度: 100.0%

- components\admin\MonitoringDashboard.tsx (行 121) 与 components\admin\MonitoringDashboard.tsx (行 136)
  - 相似度: 100.0%

- components\admin\MonitoringDashboard.tsx (行 121) 与 components\admin\MonitoringDashboard.tsx (行 151)
  - 相似度: 100.0%

- components\admin\MonitoringDashboard.tsx (行 215) 与 components\admin\MonitoringDashboard.tsx (行 216)
  - 相似度: 100.0%

- components\admin\MonitoringDashboard.tsx (行 221) 与 components\admin\MonitoringDashboard.tsx (行 222)
  - 相似度: 100.0%

- components\admin\PerformanceDashboard.tsx (行 112) 与 components\admin\PerformanceDashboard.tsx (行 113)
  - 相似度: 100.0%

- components\admin\PerformanceDashboard.tsx (行 278) 与 components\admin\PerformanceDashboard.tsx (行 291)
  - 相似度: 100.0%

- components\admin\PerformanceDashboard.tsx (行 278) 与 components\admin\PerformanceDashboard.tsx (行 307)
  - 相似度: 100.0%

- components\admin\PerformanceDashboard.tsx (行 350) 与 components\admin\PerformanceDashboard.tsx (行 377)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 41) 与 components\admin\SkillSystemMonitor.tsx (行 42)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 342) 与 components\admin\SkillSystemMonitor.tsx (行 352)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 342) 与 components\admin\SkillSystemMonitor.tsx (行 362)
  - 相似度: 100.0%

- components\chat\ChatMessage.tsx (行 70) 与 components\chat\ChatMessage.tsx (行 71)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 93) 与 components\chat\MultiChannelChat.tsx (行 94)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 99) 与 components\chat\MultiChannelChat.tsx (行 100)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 162) 与 components\common\hoc\withErrorBoundary.tsx (行 163)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 168) 与 components\common\hoc\withErrorBoundary.tsx (行 169)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 215) 与 components\common\hoc\withErrorBoundary.tsx (行 216)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 245) 与 components\common\hoc\withErrorBoundary.tsx (行 246)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 251) 与 components\common\hoc\withErrorBoundary.tsx (行 252)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 301) 与 components\common\hoc\withErrorBoundary.tsx (行 302)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 9) 与 components\common\hoc\withLoading.tsx (行 10)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 20) 与 components\common\hoc\withLoading.tsx (行 42)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 31) 与 components\common\hoc\withLoading.tsx (行 49)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 32) 与 components\common\hoc\withLoading.tsx (行 50)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 33) 与 components\common\hoc\withLoading.tsx (行 51)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 144) 与 components\common\hoc\withLoading.tsx (行 96)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 145) 与 components\common\hoc\withLoading.tsx (行 97)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 145) 与 components\common\hoc\withLoading.tsx (行 119)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 145) 与 components\common\hoc\withLoading.tsx (行 145)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 144) 与 components\common\hoc\withLoading.tsx (行 175)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 145) 与 components\common\hoc\withLoading.tsx (行 176)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 391) 与 components\common\hoc\withLoading.tsx (行 392)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 144) 与 components\common\hoc\withPermission.tsx (行 172)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 145) 与 components\common\hoc\withPermission.tsx (行 173)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 224) 与 components\common\hoc\withPermission.tsx (行 225)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 247) 与 components\common\hoc\withPermission.tsx (行 248)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 306) 与 components\common\hoc\withPermission.tsx (行 307)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 312) 与 components\common\hoc\withPermission.tsx (行 313)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 321) 与 components\common\hoc\withPermission.tsx (行 322)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 348) 与 components\common\hoc\withPermission.tsx (行 349)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 257) 与 components\common\hoc\withPermission.tsx (行 362)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 258) 与 components\common\hoc\withPermission.tsx (行 363)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 259) 与 components\common\hoc\withPermission.tsx (行 364)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 260) 与 components\common\hoc\withPermission.tsx (行 365)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 475) 与 components\common\hoc\withPermission.tsx (行 486)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 474) 与 components\common\hoc\withPermission.tsx (行 501)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 475) 与 components\common\hoc\withPermission.tsx (行 502)
  - 相似度: 100.0%

- components\core\LoadingSpinner.tsx (行 20) 与 components\core\LoadingSpinner.tsx (行 21)
  - 相似度: 100.0%

- components\core\PlayerAvatar.tsx (行 54) 与 components\core\PlayerAvatar.tsx (行 55)
  - 相似度: 100.0%

- components\core\StatusBadge.tsx (行 20) 与 components\core\StatusBadge.tsx (行 21)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 184) 与 components\dialogs\GameRulesDialog.tsx (行 185)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 190) 与 components\dialogs\GameRulesDialog.tsx (行 191)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 280) 与 components\dialogs\GameRulesDialog.tsx (行 281)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 304) 与 components\dialogs\GameRulesDialog.tsx (行 305)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 216) 与 components\dialogs\GameRulesDialog.tsx (行 310)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 66) 与 components\dialogs\LoginDialog.tsx (行 67)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 76) 与 components\dialogs\LoginDialog.tsx (行 156)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 85) 与 components\dialogs\LoginDialog.tsx (行 179)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 95) 与 components\dialogs\LoginDialog.tsx (行 191)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 96) 与 components\dialogs\LoginDialog.tsx (行 192)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 97) 与 components\dialogs\LoginDialog.tsx (行 193)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 240) 与 components\dialogs\LoginDialog.tsx (行 241)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 254) 与 components\dialogs\LoginDialog.tsx (行 294)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 255) 与 components\dialogs\LoginDialog.tsx (行 295)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 256) 与 components\dialogs\LoginDialog.tsx (行 296)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 257) 与 components\dialogs\LoginDialog.tsx (行 297)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 266) 与 components\dialogs\LoginDialog.tsx (行 318)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 267) 与 components\dialogs\LoginDialog.tsx (行 319)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 268) 与 components\dialogs\LoginDialog.tsx (行 320)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 270) 与 components\dialogs\LoginDialog.tsx (行 334)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 271) 与 components\dialogs\LoginDialog.tsx (行 335)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 272) 与 components\dialogs\LoginDialog.tsx (行 336)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 273) 与 components\dialogs\LoginDialog.tsx (行 337)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 274) 与 components\dialogs\LoginDialog.tsx (行 338)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 275) 与 components\dialogs\LoginDialog.tsx (行 339)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 336) 与 components\dialogs\LoginDialog.tsx (行 350)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 138) 与 components\error\ErrorBoundary.tsx (行 139)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 213) 与 components\error\ErrorBoundary.tsx (行 214)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 96) 与 components\error\ErrorBoundary.tsx (行 226)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 97) 与 components\error\ErrorBoundary.tsx (行 227)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 213) 与 components\error\ErrorBoundary.tsx (行 234)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 213) 与 components\error\ErrorBoundary.tsx (行 235)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 215) 与 components\error\ErrorBoundary.tsx (行 236)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 494) 与 components\error\ErrorBoundary.tsx (行 495)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 500) 与 components\error\ErrorBoundary.tsx (行 501)
  - 相似度: 100.0%

- components\error\ErrorDisplayComponent.tsx (行 154) 与 components\error\ErrorDisplayComponent.tsx (行 155)
  - 相似度: 100.0%

- components\error\ErrorDisplayComponent.tsx (行 188) 与 components\error\ErrorDisplayComponent.tsx (行 189)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 144) 与 components\error\ErrorDisplayComponent.tsx (行 484)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 32) 与 components\ErrorBoundary.tsx (行 28)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 33) 与 components\ErrorBoundary.tsx (行 29)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 34) 与 components\ErrorBoundary.tsx (行 30)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 35) 与 components\ErrorBoundary.tsx (行 31)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 36) 与 components\ErrorBoundary.tsx (行 32)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 94) 与 components\ErrorBoundary.tsx (行 81)
  - 相似度: 100.0%

- components\ErrorBoundary.tsx (行 117) 与 components\ErrorBoundary.tsx (行 118)
  - 相似度: 100.0%

- components\ErrorBoundary.tsx (行 126) 与 components\ErrorBoundary.tsx (行 127)
  - 相似度: 100.0%

- components\ErrorBoundary.tsx (行 132) 与 components\ErrorBoundary.tsx (行 133)
  - 相似度: 100.0%

- components\ErrorBoundary.tsx (行 163) 与 components\ErrorBoundary.tsx (行 164)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 455) 与 components\ErrorBoundary.tsx (行 425)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 456) 与 components\ErrorBoundary.tsx (行 426)
  - 相似度: 100.0%

- components\ErrorBoundary.tsx (行 445) 与 components\ErrorBoundary.tsx (行 446)
  - 相似度: 100.0%

- components\game\accessibility\AccessibilityEnhancement.tsx (行 26) 与 components\game\accessibility\AccessibilityEnhancement.tsx (行 27)
  - 相似度: 100.0%

- components\game\accessibility\AccessibilityEnhancement.tsx (行 42) 与 components\game\accessibility\AccessibilityEnhancement.tsx (行 43)
  - 相似度: 100.0%

- components\game\accessibility\AccessibilityEnhancement.tsx (行 87) 与 components\game\accessibility\AccessibilityEnhancement.tsx (行 88)
  - 相似度: 100.0%

- components\game\accessibility\AccessibilityEnhancement.tsx (行 112) 与 components\game\accessibility\AccessibilityEnhancement.tsx (行 113)
  - 相似度: 100.0%

- components\game\accessibility\AccessibilityEnhancement.tsx (行 228) 与 components\game\accessibility\AccessibilityEnhancement.tsx (行 229)
  - 相似度: 100.0%

- components\game\accessibility\AccessibilityEnhancement.tsx (行 278) 与 components\game\accessibility\AccessibilityEnhancement.tsx (行 384)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 124) 与 components\game\displays\GamePlayerStatusDisplay.tsx (行 137)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 125) 与 components\game\displays\GamePlayerStatusDisplay.tsx (行 138)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 185) 与 components\game\displays\GamePlayerStatusDisplay.tsx (行 186)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 268) 与 components\game\displays\GameStateDisplay.tsx (行 76)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 268) 与 components\game\displays\GameStateDisplay.tsx (行 131)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 269) 与 components\game\displays\GameStateDisplay.tsx (行 132)
  - 相似度: 100.0%

- components\game\displays\SkillEffectsDisplay.tsx (行 25) 与 components\game\displays\SkillEffectsDisplay.tsx (行 26)
  - 相似度: 100.0%

- components\game\displays\SkillEffectsDisplay.tsx (行 108) 与 components\game\displays\SkillEffectsDisplay.tsx (行 109)
  - 相似度: 100.0%

- components\game\displays\SkillEffectsDisplay.tsx (行 111) 与 components\game\displays\SkillEffectsDisplay.tsx (行 112)
  - 相似度: 100.0%

- components\game\displays\SkillEffectsDisplay.tsx (行 121) 与 components\game\displays\SkillEffectsDisplay.tsx (行 122)
  - 相似度: 100.0%

- components\game\feedback\OperationFeedback.tsx (行 34) 与 components\game\feedback\OperationFeedback.tsx (行 35)
  - 相似度: 100.0%

- components\game\feedback\OperationFeedback.tsx (行 199) 与 components\game\feedback\OperationFeedback.tsx (行 200)
  - 相似度: 100.0%

- components\game\feedback\OperationFeedback.tsx (行 205) 与 components\game\feedback\OperationFeedback.tsx (行 206)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 97) 与 components\game\interfaces\EnhancedSkillManager.tsx (行 134)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 275) 与 components\game\interfaces\EnhancedSkillManager.tsx (行 345)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 273) 与 components\game\interfaces\EnhancedSkillManager.tsx (行 387)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 267) 与 components\game\interfaces\EnhancedSkillManager.tsx (行 402)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 16) 与 components\game\interfaces\GuardProtectionInterface.tsx (行 17)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 15) 与 components\game\interfaces\HunterRevengeInterface.tsx (行 15)
  - 相似度: 100.0%

- components\game\interfaces\HunterRevengeInterface.tsx (行 16) 与 components\game\interfaces\HunterRevengeInterface.tsx (行 17)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 43) 与 components\game\interfaces\HunterRevengeInterface.tsx (行 43)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 52) 与 components\game\interfaces\HunterRevengeInterface.tsx (行 52)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 53) 与 components\game\interfaces\HunterRevengeInterface.tsx (行 53)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 54) 与 components\game\interfaces\HunterRevengeInterface.tsx (行 54)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 64) 与 components\game\interfaces\HunterRevengeInterface.tsx (行 64)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 65) 与 components\game\interfaces\HunterRevengeInterface.tsx (行 65)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 119) 与 components\game\interfaces\NightSkillInterface.tsx (行 120)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 134) 与 components\game\interfaces\NightSkillInterface.tsx (行 135)
  - 相似度: 100.0%

- components\game\displays\RoleSkillInfo.tsx (行 169) 与 components\game\interfaces\NightSkillInterface.tsx (行 312)
  - 相似度: 100.0%

- components\game\displays\RoleSkillInfo.tsx (行 170) 与 components\game\interfaces\NightSkillInterface.tsx (行 313)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 96) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 145)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 97) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 146)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 98) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 147)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 99) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 148)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 108) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 157)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 130) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 179)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 131) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 180)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 132) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 181)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 195) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 196)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 210) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 211)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 189) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 290)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 282) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 366)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 15) 与 components\game\interfaces\SeerInvestigationInterface.tsx (行 15)
  - 相似度: 100.0%

- components\game\interfaces\SeerInvestigationInterface.tsx (行 16) 与 components\game\interfaces\SeerInvestigationInterface.tsx (行 17)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 43) 与 components\game\interfaces\SeerInvestigationInterface.tsx (行 43)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 52) 与 components\game\interfaces\SeerInvestigationInterface.tsx (行 52)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 53) 与 components\game\interfaces\SeerInvestigationInterface.tsx (行 53)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 54) 与 components\game\interfaces\SeerInvestigationInterface.tsx (行 54)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 64) 与 components\game\interfaces\SeerInvestigationInterface.tsx (行 64)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 65) 与 components\game\interfaces\SeerInvestigationInterface.tsx (行 65)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 218) 与 components\game\interfaces\SkillConflictResolver.tsx (行 188)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 401) 与 components\game\interfaces\SkillConflictResolver.tsx (行 351)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 267) 与 components\game\interfaces\SkillConflictResolver.tsx (行 352)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 15) 与 components\game\interfaces\UnifiedWitchSkillInterface.tsx (行 15)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 15) 与 components\game\interfaces\WolfKillInterface.tsx (行 15)
  - 相似度: 100.0%

- components\game\interfaces\WolfKillInterface.tsx (行 16) 与 components\game\interfaces\WolfKillInterface.tsx (行 17)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 43) 与 components\game\interfaces\WolfKillInterface.tsx (行 43)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 52) 与 components\game\interfaces\WolfKillInterface.tsx (行 52)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 53) 与 components\game\interfaces\WolfKillInterface.tsx (行 53)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 54) 与 components\game\interfaces\WolfKillInterface.tsx (行 54)
  - 相似度: 100.0%

- components\game\interfaces\HunterRevengeInterface.tsx (行 62) 与 components\game\interfaces\WolfKillInterface.tsx (行 62)
  - 相似度: 100.0%

- components\game\interfaces\HunterRevengeInterface.tsx (行 63) 与 components\game\interfaces\WolfKillInterface.tsx (行 63)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 64) 与 components\game\interfaces\WolfKillInterface.tsx (行 64)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 65) 与 components\game\interfaces\WolfKillInterface.tsx (行 65)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 181) 与 components\game\optimized\AdvancedSkillAnalytics.tsx (行 182)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 258) 与 components\game\optimized\AdvancedSkillAnalytics.tsx (行 259)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 264) 与 components\game\optimized\AdvancedSkillAnalytics.tsx (行 265)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 417) 与 components\game\optimized\AdvancedSkillAnalytics.tsx (行 418)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 47) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 48)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 156) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 157)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 216) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 217)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 245) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 246)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 258) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 259)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 264) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 265)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 282) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 283)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 323) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 324)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 394) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 418)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 432) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 550)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 20) 与 components\game\optimized\PerformanceMonitor.tsx (行 20)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 21) 与 components\game\optimized\PerformanceMonitor.tsx (行 21)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 98) 与 components\game\optimized\PerformanceMonitor.tsx (行 64)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 99) 与 components\game\optimized\PerformanceMonitor.tsx (行 65)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 100) 与 components\game\optimized\PerformanceMonitor.tsx (行 66)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 101) 与 components\game\optimized\PerformanceMonitor.tsx (行 67)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 102) 与 components\game\optimized\PerformanceMonitor.tsx (行 68)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 433) 与 components\game\optimized\PerformanceMonitor.tsx (行 417)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 434) 与 components\game\optimized\PerformanceMonitor.tsx (行 418)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 435) 与 components\game\optimized\PerformanceMonitor.tsx (行 419)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 436) 与 components\game\optimized\PerformanceMonitor.tsx (行 420)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 472) 与 components\game\optimized\PerformanceMonitor.tsx (行 450)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 473) 与 components\game\optimized\PerformanceMonitor.tsx (行 451)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 474) 与 components\game\optimized\PerformanceMonitor.tsx (行 452)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 536) 与 components\game\optimized\PerformanceMonitor.tsx (行 547)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 621) 与 components\game\optimized\PerformanceMonitor.tsx (行 615)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 772) 与 components\game\optimized\PerformanceMonitor.tsx (行 693)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 773) 与 components\game\optimized\PerformanceMonitor.tsx (行 694)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 774) 与 components\game\optimized\PerformanceMonitor.tsx (行 695)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 20) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 19)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 21) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 20)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 22) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 21)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 23) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 22)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 24) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 23)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 25) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 24)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 26) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 25)
  - 相似度: 100.0%

- components\game\optimized\SkillEffectsVirtualList.tsx (行 185) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 186)
  - 相似度: 100.0%

- components\game\optimized\SkillEffectsVirtualList.tsx (行 266) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 267)
  - 相似度: 100.0%

- components\game\optimized\SkillEffectsVirtualList.tsx (行 451) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 452)
  - 相似度: 100.0%

- components\game\optimized\SkillEffectsVirtualList.tsx (行 459) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 460)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 176) 与 components\game\panels\EnhancedSkillPanel.tsx (行 177)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 197) 与 components\game\panels\EnhancedSkillPanel.tsx (行 198)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 217) 与 components\game\panels\EnhancedSkillPanel.tsx (行 218)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 347) 与 components\game\panels\EnhancedSkillPanel.tsx (行 348)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 269) 与 components\game\panels\EnhancedSkillPanel.tsx (行 401)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 114) 与 components\game\panels\GameInfoPanel.tsx (行 115)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 268) 与 components\game\panels\GameSettingsPanel.tsx (行 99)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 269) 与 components\game\panels\GameSettingsPanel.tsx (行 100)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 133) 与 components\game\panels\GameSettingsPanel.tsx (行 101)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 199) 与 components\game\panels\GameSettingsPanel.tsx (行 102)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 267) 与 components\game\panels\GameSettingsPanel.tsx (行 237)
  - 相似度: 100.0%

- components\game\panels\GameSkillPanel.tsx (行 79) 与 components\game\panels\GameSkillPanel.tsx (行 80)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 269) 与 components\game\panels\GameSkillPanel.tsx (行 155)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 266) 与 components\game\panels\GameSkillPanel.tsx (行 244)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 267) 与 components\game\panels\GameSkillPanel.tsx (行 245)
  - 相似度: 100.0%

- components\game\panels\PlayerStatusManager.tsx (行 159) 与 components\game\panels\PlayerStatusManager.tsx (行 160)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 62) 与 components\game\panels\RoleStatusPanel.tsx (行 63)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 268) 与 components\game\panels\RoleStatusPanel.tsx (行 94)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 269) 与 components\game\panels\RoleStatusPanel.tsx (行 95)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 133) 与 components\game\panels\RoleStatusPanel.tsx (行 96)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 199) 与 components\game\panels\RoleStatusPanel.tsx (行 97)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 163) 与 components\game\panels\RoleStatusPanel.tsx (行 164)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 265) 与 components\game\panels\RoleStatusPanel.tsx (行 206)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 266) 与 components\game\panels\RoleStatusPanel.tsx (行 207)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 267) 与 components\game\panels\RoleStatusPanel.tsx (行 208)
  - 相似度: 100.0%

- components\game\panels\SkillSystemManager.tsx (行 100) 与 components\game\panels\SkillSystemManager.tsx (行 101)
  - 相似度: 100.0%

- components\game\panels\GameSkillPanel.tsx (行 36) 与 components\game\panels\SkillUsePanel.tsx (行 30)
  - 相似度: 100.0%

- components\game\panels\SkillSystemManager.tsx (行 37) 与 components\game\panels\SkillUsePanel.tsx (行 33)
  - 相似度: 100.0%

- components\game\panels\SkillSystemManager.tsx (行 38) 与 components\game\panels\SkillUsePanel.tsx (行 34)
  - 相似度: 100.0%

- components\game\panels\GameSkillPanel.tsx (行 60) 与 components\game\panels\SkillUsePanel.tsx (行 54)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 128) 与 components\game\panels\SkillUsePanel.tsx (行 119)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 129) 与 components\game\panels\SkillUsePanel.tsx (行 120)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 130) 与 components\game\panels\SkillUsePanel.tsx (行 121)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 131) 与 components\game\panels\SkillUsePanel.tsx (行 122)
  - 相似度: 100.0%

- components\game\panels\SkillUsePanel.tsx (行 125) 与 components\game\panels\SkillUsePanel.tsx (行 126)
  - 相似度: 100.0%

- components\game\displays\SkillEffectsDisplay.tsx (行 94) 与 components\game\panels\SkillUsePanel.tsx (行 145)
  - 相似度: 100.0%

- components\game\displays\SkillEffectsDisplay.tsx (行 95) 与 components\game\panels\SkillUsePanel.tsx (行 146)
  - 相似度: 100.0%

- components\game\displays\SkillEffectsDisplay.tsx (行 96) 与 components\game\panels\SkillUsePanel.tsx (行 147)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 129) 与 components\game\panels\SkillUsePanel.tsx (行 188)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 130) 与 components\game\panels\SkillUsePanel.tsx (行 189)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 131) 与 components\game\panels\SkillUsePanel.tsx (行 190)
  - 相似度: 100.0%

- components\game\panels\SkillUsePanel.tsx (行 123) 与 components\game\panels\SkillUsePanel.tsx (行 191)
  - 相似度: 100.0%

- components\game\panels\SkillUsePanel.tsx (行 124) 与 components\game\panels\SkillUsePanel.tsx (行 192)
  - 相似度: 100.0%

- components\game\panels\SkillUsePanel.tsx (行 125) 与 components\game\panels\SkillUsePanel.tsx (行 193)
  - 相似度: 100.0%

- components\game\panels\SkillUsePanel.tsx (行 125) 与 components\game\panels\SkillUsePanel.tsx (行 194)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 41) 与 components\game\panels\StudentAnswerRecordPanel.tsx (行 42)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 122) 与 components\game\panels\StudentAnswerRecordPanel.tsx (行 123)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 128) 与 components\game\panels\StudentAnswerRecordPanel.tsx (行 129)
  - 相似度: 100.0%

- components\game\displays\RoleSkillInfo.tsx (行 169) 与 components\game\panels\StudentAnswerRecordPanel.tsx (行 307)
  - 相似度: 100.0%

- components\game\displays\RoleSkillInfo.tsx (行 170) 与 components\game\panels\StudentAnswerRecordPanel.tsx (行 308)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 27) 与 components\game\panels\StudentSystemPanel.tsx (行 30)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 28) 与 components\game\panels\StudentSystemPanel.tsx (行 31)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 29) 与 components\game\panels\StudentSystemPanel.tsx (行 32)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 30) 与 components\game\panels\StudentSystemPanel.tsx (行 33)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 131) 与 components\game\panels\StudentSystemPanel.tsx (行 132)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 168) 与 components\game\panels\StudentSystemPanel.tsx (行 169)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 206) 与 components\game\panels\StudentSystemPanel.tsx (行 207)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 230) 与 components\game\panels\StudentSystemPanel.tsx (行 231)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 251) 与 components\game\panels\StudentSystemPanel.tsx (行 252)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 269) 与 components\game\panels\StudentSystemPanel.tsx (行 270)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 341) 与 components\game\panels\StudentSystemPanel.tsx (行 342)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 399) 与 components\game\panels\StudentSystemPanel.tsx (行 400)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 493) 与 components\game\panels\StudentSystemPanel.tsx (行 494)
  - 相似度: 100.0%

- components\game\panels\VotingSystemManager.tsx (行 69) 与 components\game\panels\VotingSystemManager.tsx (行 70)
  - 相似度: 100.0%

- components\game\skill\SkillConflictVisualization.tsx (行 221) 与 components\game\skill\SkillConflictVisualization.tsx (行 222)
  - 相似度: 100.0%

- components\game\smart-hints\SmartHintSystem.tsx (行 360) 与 components\game\smart-hints\SmartHintSystem.tsx (行 361)
  - 相似度: 100.0%

- components\game\feedback\OperationFeedback.tsx (行 190) 与 components\game\smart-hints\SmartHintSystem.tsx (行 396)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 27) 与 components\game\student\StudentPreviousQuestionDisplay.tsx (行 19)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 28) 与 components\game\student\StudentPreviousQuestionDisplay.tsx (行 20)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 29) 与 components\game\student\StudentPreviousQuestionDisplay.tsx (行 21)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 30) 与 components\game\student\StudentPreviousQuestionDisplay.tsx (行 22)
  - 相似度: 100.0%

- components\game\student\StudentPreviousQuestionDisplay.tsx (行 15) 与 components\game\student\StudentQuestionDisplay.tsx (行 15)
  - 相似度: 100.0%

- components\game\student\StudentPreviousQuestionDisplay.tsx (行 16) 与 components\game\student\StudentQuestionDisplay.tsx (行 16)
  - 相似度: 100.0%

- components\game\student\StudentPreviousQuestionDisplay.tsx (行 17) 与 components\game\student\StudentQuestionDisplay.tsx (行 17)
  - 相似度: 100.0%

- components\game\student\StudentPreviousQuestionDisplay.tsx (行 18) 与 components\game\student\StudentQuestionDisplay.tsx (行 18)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 27) 与 components\game\student\StudentQuestionDisplay.tsx (行 19)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 28) 与 components\game\student\StudentQuestionDisplay.tsx (行 20)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 29) 与 components\game\student\StudentQuestionDisplay.tsx (行 21)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 30) 与 components\game\student\StudentQuestionDisplay.tsx (行 22)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 34) 与 components\game\student\StudentQuestionDisplay.tsx (行 23)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 35) 与 components\game\student\StudentQuestionDisplay.tsx (行 24)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 36) 与 components\game\student\StudentQuestionDisplay.tsx (行 25)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 37) 与 components\game\student\StudentQuestionDisplay.tsx (行 26)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 38) 与 components\game\student\StudentQuestionDisplay.tsx (行 27)
  - 相似度: 100.0%

- components\game\student\StudentPreviousQuestionDisplay.tsx (行 79) 与 components\game\student\StudentQuestionDisplay.tsx (行 119)
  - 相似度: 100.0%

- components\game\student\StudentQuestionDisplay.tsx (行 144) 与 components\game\student\StudentQuestionDisplay.tsx (行 145)
  - 相似度: 100.0%

- components\game\student\StudentQuestionDisplay.tsx (行 154) 与 components\game\student\StudentTimerDisplay.tsx (行 69)
  - 相似度: 100.0%

- components\home\FeatureCard.tsx (行 20) 与 components\home\FeatureCard.tsx (行 21)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 17) 与 components\judge\management\AnswerRecordPanel.tsx (行 16)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 43) 与 components\judge\management\AnswerRecordPanel.tsx (行 34)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 44) 与 components\judge\management\AnswerRecordPanel.tsx (行 35)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 45) 与 components\judge\management\AnswerRecordPanel.tsx (行 36)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 46) 与 components\judge\management\AnswerRecordPanel.tsx (行 37)
  - 相似度: 100.0%

- components\judge\management\AnswerRecordPanel.tsx (行 72) 与 components\judge\management\AnswerRecordPanel.tsx (行 73)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 161) 与 components\judge\management\AnswerRecordPanel.tsx (行 112)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 162) 与 components\judge\management\AnswerRecordPanel.tsx (行 113)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 163) 与 components\judge\management\AnswerRecordPanel.tsx (行 114)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 164) 与 components\judge\management\AnswerRecordPanel.tsx (行 115)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 165) 与 components\judge\management\AnswerRecordPanel.tsx (行 116)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 166) 与 components\judge\management\AnswerRecordPanel.tsx (行 117)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 167) 与 components\judge\management\AnswerRecordPanel.tsx (行 118)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 168) 与 components\judge\management\AnswerRecordPanel.tsx (行 119)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 169) 与 components\judge\management\AnswerRecordPanel.tsx (行 120)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 170) 与 components\judge\management\AnswerRecordPanel.tsx (行 121)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 171) 与 components\judge\management\AnswerRecordPanel.tsx (行 122)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 172) 与 components\judge\management\AnswerRecordPanel.tsx (行 123)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 173) 与 components\judge\management\AnswerRecordPanel.tsx (行 124)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 174) 与 components\judge\management\AnswerRecordPanel.tsx (行 125)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 175) 与 components\judge\management\AnswerRecordPanel.tsx (行 126)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 176) 与 components\judge\management\AnswerRecordPanel.tsx (行 127)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 177) 与 components\judge\management\AnswerRecordPanel.tsx (行 128)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 178) 与 components\judge\management\AnswerRecordPanel.tsx (行 129)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 179) 与 components\judge\management\AnswerRecordPanel.tsx (行 130)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 180) 与 components\judge\management\AnswerRecordPanel.tsx (行 131)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 181) 与 components\judge\management\AnswerRecordPanel.tsx (行 132)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 182) 与 components\judge\management\AnswerRecordPanel.tsx (行 133)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 183) 与 components\judge\management\AnswerRecordPanel.tsx (行 134)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 190) 与 components\judge\management\AnswerRecordPanel.tsx (行 141)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 191) 与 components\judge\management\AnswerRecordPanel.tsx (行 142)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 192) 与 components\judge\management\AnswerRecordPanel.tsx (行 143)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 193) 与 components\judge\management\AnswerRecordPanel.tsx (行 144)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 194) 与 components\judge\management\AnswerRecordPanel.tsx (行 145)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 195) 与 components\judge\management\AnswerRecordPanel.tsx (行 146)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 196) 与 components\judge\management\AnswerRecordPanel.tsx (行 147)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 203) 与 components\judge\management\AnswerRecordPanel.tsx (行 154)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 204) 与 components\judge\management\AnswerRecordPanel.tsx (行 155)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 205) 与 components\judge\management\AnswerRecordPanel.tsx (行 156)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 206) 与 components\judge\management\AnswerRecordPanel.tsx (行 157)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 207) 与 components\judge\management\AnswerRecordPanel.tsx (行 158)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 208) 与 components\judge\management\AnswerRecordPanel.tsx (行 159)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 209) 与 components\judge\management\AnswerRecordPanel.tsx (行 160)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 210) 与 components\judge\management\AnswerRecordPanel.tsx (行 161)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 211) 与 components\judge\management\AnswerRecordPanel.tsx (行 162)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 212) 与 components\judge\management\AnswerRecordPanel.tsx (行 163)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 213) 与 components\judge\management\AnswerRecordPanel.tsx (行 164)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 214) 与 components\judge\management\AnswerRecordPanel.tsx (行 165)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 215) 与 components\judge\management\AnswerRecordPanel.tsx (行 166)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 216) 与 components\judge\management\AnswerRecordPanel.tsx (行 167)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 217) 与 components\judge\management\AnswerRecordPanel.tsx (行 168)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 218) 与 components\judge\management\AnswerRecordPanel.tsx (行 169)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 219) 与 components\judge\management\AnswerRecordPanel.tsx (行 170)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 220) 与 components\judge\management\AnswerRecordPanel.tsx (行 171)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 221) 与 components\judge\management\AnswerRecordPanel.tsx (行 172)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 222) 与 components\judge\management\AnswerRecordPanel.tsx (行 173)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 223) 与 components\judge\management\AnswerRecordPanel.tsx (行 174)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 224) 与 components\judge\management\AnswerRecordPanel.tsx (行 175)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 225) 与 components\judge\management\AnswerRecordPanel.tsx (行 176)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 226) 与 components\judge\management\AnswerRecordPanel.tsx (行 177)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 227) 与 components\judge\management\AnswerRecordPanel.tsx (行 178)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 228) 与 components\judge\management\AnswerRecordPanel.tsx (行 179)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 229) 与 components\judge\management\AnswerRecordPanel.tsx (行 180)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 230) 与 components\judge\management\AnswerRecordPanel.tsx (行 181)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 231) 与 components\judge\management\AnswerRecordPanel.tsx (行 182)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 232) 与 components\judge\management\AnswerRecordPanel.tsx (行 183)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 233) 与 components\judge\management\AnswerRecordPanel.tsx (行 184)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 234) 与 components\judge\management\AnswerRecordPanel.tsx (行 185)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 235) 与 components\judge\management\AnswerRecordPanel.tsx (行 186)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 236) 与 components\judge\management\AnswerRecordPanel.tsx (行 187)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 237) 与 components\judge\management\AnswerRecordPanel.tsx (行 188)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 238) 与 components\judge\management\AnswerRecordPanel.tsx (行 189)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 239) 与 components\judge\management\AnswerRecordPanel.tsx (行 190)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 240) 与 components\judge\management\AnswerRecordPanel.tsx (行 191)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 300) 与 components\judge\management\AnswerRecordPanel.tsx (行 261)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 301) 与 components\judge\management\AnswerRecordPanel.tsx (行 262)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 302) 与 components\judge\management\AnswerRecordPanel.tsx (行 263)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 303) 与 components\judge\management\AnswerRecordPanel.tsx (行 264)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 304) 与 components\judge\management\AnswerRecordPanel.tsx (行 265)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 305) 与 components\judge\management\AnswerRecordPanel.tsx (行 266)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 306) 与 components\judge\management\AnswerRecordPanel.tsx (行 267)
  - 相似度: 100.0%

- components\game\displays\RoleSkillInfo.tsx (行 169) 与 components\judge\management\AnswerRecordPanel.tsx (行 268)
  - 相似度: 100.0%

- components\game\displays\RoleSkillInfo.tsx (行 170) 与 components\judge\management\AnswerRecordPanel.tsx (行 269)
  - 相似度: 100.0%

- components\game\panels\GameSettingsPanel.tsx (行 15) 与 components\judge\management\JudgeActionPanel.tsx (行 15)
  - 相似度: 100.0%

- components\game\panels\GameSettingsPanel.tsx (行 16) 与 components\judge\management\JudgeActionPanel.tsx (行 16)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 43) 与 components\judge\management\JudgeActionPanel.tsx (行 44)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 68) 与 components\judge\management\JudgeActionPanel.tsx (行 69)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 81) 与 components\judge\management\JudgeActionPanel.tsx (行 82)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 87) 与 components\judge\management\JudgeActionPanel.tsx (行 88)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 93) 与 components\judge\management\JudgeActionPanel.tsx (行 94)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 15) 与 components\judge\management\ManualQuestionEditor.tsx (行 15)
  - 相似度: 100.0%

- components\judge\management\ManualQuestionEditor.tsx (行 27) 与 components\judge\management\ManualQuestionEditor.tsx (行 28)
  - 相似度: 100.0%

- components\judge\management\ManualQuestionEditor.tsx (行 104) 与 components\judge\management\ManualQuestionEditor.tsx (行 122)
  - 相似度: 100.0%

- components\judge\management\ManualQuestionEditor.tsx (行 105) 与 components\judge\management\ManualQuestionEditor.tsx (行 123)
  - 相似度: 100.0%

- components\judge\management\ManualQuestionEditor.tsx (行 104) 与 components\judge\management\ManualQuestionEditor.tsx (行 140)
  - 相似度: 100.0%

- components\judge\management\ManualQuestionEditor.tsx (行 105) 与 components\judge\management\ManualQuestionEditor.tsx (行 141)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 594) 与 components\judge\management\ManualQuestionEditor.tsx (行 180)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 595) 与 components\judge\management\ManualQuestionEditor.tsx (行 181)
  - 相似度: 100.0%

- components\judge\management\PlayerStatusPanel.tsx (行 98) 与 components\judge\management\PlayerStatusPanel.tsx (行 99)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 594) 与 components\judge\management\PlayerStatusPanel.tsx (行 222)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 595) 与 components\judge\management\PlayerStatusPanel.tsx (行 223)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 29) 与 components\judge\management\PreparationPhaseDialog.tsx (行 30)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 96) 与 components\judge\management\PreparationPhaseDialog.tsx (行 97)
  - 相似度: 100.0%

- components\admin\MonitoringDashboard.tsx (行 250) 与 components\judge\management\PreparationPhaseDialog.tsx (行 207)
  - 相似度: 100.0%

- components\judge\management\QuestionBankDialog.tsx (行 28) 与 components\judge\management\QuestionBankDialog.tsx (行 29)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 31) 与 components\judge\management\QuestionBankDialog.tsx (行 30)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 51) 与 components\judge\management\QuestionBankDialog.tsx (行 50)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 52) 与 components\judge\management\QuestionBankDialog.tsx (行 51)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 66) 与 components\judge\management\QuestionBankDialog.tsx (行 79)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 67) 与 components\judge\management\QuestionBankDialog.tsx (行 80)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 68) 与 components\judge\management\QuestionBankDialog.tsx (行 81)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 69) 与 components\judge\management\QuestionBankDialog.tsx (行 82)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 70) 与 components\judge\management\QuestionBankDialog.tsx (行 83)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 71) 与 components\judge\management\QuestionBankDialog.tsx (行 84)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 72) 与 components\judge\management\QuestionBankDialog.tsx (行 85)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 73) 与 components\judge\management\QuestionBankDialog.tsx (行 86)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 74) 与 components\judge\management\QuestionBankDialog.tsx (行 87)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 75) 与 components\judge\management\QuestionBankDialog.tsx (行 88)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 76) 与 components\judge\management\QuestionBankDialog.tsx (行 89)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 77) 与 components\judge\management\QuestionBankDialog.tsx (行 90)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 78) 与 components\judge\management\QuestionBankDialog.tsx (行 91)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 79) 与 components\judge\management\QuestionBankDialog.tsx (行 92)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 80) 与 components\judge\management\QuestionBankDialog.tsx (行 93)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 81) 与 components\judge\management\QuestionBankDialog.tsx (行 94)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 82) 与 components\judge\management\QuestionBankDialog.tsx (行 95)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 83) 与 components\judge\management\QuestionBankDialog.tsx (行 96)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 84) 与 components\judge\management\QuestionBankDialog.tsx (行 97)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 85) 与 components\judge\management\QuestionBankDialog.tsx (行 98)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 86) 与 components\judge\management\QuestionBankDialog.tsx (行 99)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 87) 与 components\judge\management\QuestionBankDialog.tsx (行 100)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 88) 与 components\judge\management\QuestionBankDialog.tsx (行 101)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 89) 与 components\judge\management\QuestionBankDialog.tsx (行 102)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 90) 与 components\judge\management\QuestionBankDialog.tsx (行 103)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 91) 与 components\judge\management\QuestionBankDialog.tsx (行 104)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 92) 与 components\judge\management\QuestionBankDialog.tsx (行 105)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 93) 与 components\judge\management\QuestionBankDialog.tsx (行 106)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 94) 与 components\judge\management\QuestionBankDialog.tsx (行 107)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 95) 与 components\judge\management\QuestionBankDialog.tsx (行 108)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 96) 与 components\judge\management\QuestionBankDialog.tsx (行 109)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 96) 与 components\judge\management\QuestionBankDialog.tsx (行 110)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 97) 与 components\judge\management\QuestionBankDialog.tsx (行 231)
  - 相似度: 100.0%

- components\judge\management\QuestionBankDialog.tsx (行 244) 与 components\judge\management\QuestionBankDialog.tsx (行 245)
  - 相似度: 100.0%

- components\judge\management\QuestionBankDialog.tsx (行 357) 与 components\judge\management\QuestionBankDialog.tsx (行 358)
  - 相似度: 100.0%

- components\judge\management\QuestionBankDialog.tsx (行 422) 与 components\judge\management\QuestionBankDialog.tsx (行 423)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 140) 与 components\judge\management\QuestionBankDialog.tsx (行 425)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 141) 与 components\judge\management\QuestionBankDialog.tsx (行 426)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 142) 与 components\judge\management\QuestionBankDialog.tsx (行 427)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 143) 与 components\judge\management\QuestionBankDialog.tsx (行 428)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 144) 与 components\judge\management\QuestionBankDialog.tsx (行 429)
  - 相似度: 100.0%

- components\admin\MonitoringDashboard.tsx (行 250) 与 components\judge\management\QuestionBankDialog.tsx (行 506)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 136) 与 components\judge\management\QuestionBankPanel.tsx (行 137)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 146) 与 components\judge\management\QuestionBankPanel.tsx (行 147)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 152) 与 components\judge\management\QuestionBankPanel.tsx (行 153)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 171) 与 components\judge\management\QuestionBankPanel.tsx (行 172)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 194) 与 components\judge\management\QuestionBankPanel.tsx (行 195)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 241) 与 components\judge\management\QuestionBankPanel.tsx (行 242)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 256) 与 components\judge\management\QuestionBankPanel.tsx (行 267)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 256) 与 components\judge\management\QuestionBankPanel.tsx (行 280)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 288) 与 components\judge\management\QuestionBankPanel.tsx (行 289)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 322) 与 components\judge\management\QuestionBankPanel.tsx (行 323)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 256) 与 components\judge\management\QuestionBankPanel.tsx (行 355)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 360) 与 components\judge\management\QuestionBankPanel.tsx (行 361)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 370) 与 components\judge\management\QuestionBankPanel.tsx (行 371)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 393) 与 components\judge\management\QuestionBankPanel.tsx (行 394)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 256) 与 components\judge\management\QuestionBankPanel.tsx (行 423)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 428) 与 components\judge\management\QuestionBankPanel.tsx (行 429)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 463) 与 components\judge\management\QuestionBankPanel.tsx (行 484)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 464) 与 components\judge\management\QuestionBankPanel.tsx (行 485)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 465) 与 components\judge\management\QuestionBankPanel.tsx (行 486)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 466) 与 components\judge\management\QuestionBankPanel.tsx (行 487)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 492) 与 components\judge\management\QuestionBankPanel.tsx (行 493)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 588) 与 components\judge\management\QuestionBankPanel.tsx (行 641)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 589) 与 components\judge\management\QuestionBankPanel.tsx (行 642)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 590) 与 components\judge\management\QuestionBankPanel.tsx (行 643)
  - 相似度: 100.0%

- components\game\displays\SkillEffectsDisplay.tsx (行 15) 与 components\judge\management\QuestionOrderEditor.tsx (行 15)
  - 相似度: 100.0%

- components\game\displays\RoleSkillInfo.tsx (行 170) 与 components\judge\management\QuestionOrderEditor.tsx (行 153)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 59) 与 components\judge\management\QuestionPreview.tsx (行 55)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 60) 与 components\judge\management\QuestionPreview.tsx (行 56)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 61) 与 components\judge\management\QuestionPreview.tsx (行 57)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 62) 与 components\judge\management\QuestionPreview.tsx (行 58)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 63) 与 components\judge\management\QuestionPreview.tsx (行 59)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 64) 与 components\judge\management\QuestionPreview.tsx (行 60)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 65) 与 components\judge\management\QuestionPreview.tsx (行 61)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 66) 与 components\judge\management\QuestionPreview.tsx (行 62)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 67) 与 components\judge\management\QuestionPreview.tsx (行 63)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 68) 与 components\judge\management\QuestionPreview.tsx (行 64)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 69) 与 components\judge\management\QuestionPreview.tsx (行 65)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 70) 与 components\judge\management\QuestionPreview.tsx (行 66)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 71) 与 components\judge\management\QuestionPreview.tsx (行 67)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 72) 与 components\judge\management\QuestionPreview.tsx (行 68)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 73) 与 components\judge\management\QuestionPreview.tsx (行 69)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 74) 与 components\judge\management\QuestionPreview.tsx (行 70)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 75) 与 components\judge\management\QuestionPreview.tsx (行 71)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 53) 与 components\judge\management\QuestionPreview.tsx (行 76)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 53) 与 components\judge\management\QuestionPreview.tsx (行 77)
  - 相似度: 100.0%

- components\game\displays\RoleSkillInfo.tsx (行 170) 与 components\judge\management\QuestionPreview.tsx (行 215)
  - 相似度: 100.0%

- components\judge\management\QuestionPreview.tsx (行 15) 与 components\judge\management\QuestionSourceList.tsx (行 15)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 228) 与 components\judge\management\QuestionSourceList.tsx (行 82)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 592) 与 components\judge\management\QuestionSourceList.tsx (行 128)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 593) 与 components\judge\management\QuestionSourceList.tsx (行 129)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 594) 与 components\judge\management\QuestionSourceList.tsx (行 130)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 595) 与 components\judge\management\QuestionSourceList.tsx (行 131)
  - 相似度: 100.0%

- components\judge\management\PlayerStatusPanel.tsx (行 15) 与 components\judge\management\TeacherSystemPanel.tsx (行 15)
  - 相似度: 100.0%

- components\game\student\StudentQuestionDisplay.tsx (行 69) 与 components\judge\management\TeacherSystemPanel.tsx (行 87)
  - 相似度: 100.0%

- components\game\student\StudentQuestionDisplay.tsx (行 70) 与 components\judge\management\TeacherSystemPanel.tsx (行 88)
  - 相似度: 100.0%

- components\game\student\StudentQuestionDisplay.tsx (行 71) 与 components\judge\management\TeacherSystemPanel.tsx (行 89)
  - 相似度: 100.0%

- components\judge\management\TeacherSystemPanel.tsx (行 94) 与 components\judge\management\TeacherSystemPanel.tsx (行 95)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 500) 与 components\judge\management\TeacherSystemPanel.tsx (行 102)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 501) 与 components\judge\management\TeacherSystemPanel.tsx (行 103)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 502) 与 components\judge\management\TeacherSystemPanel.tsx (行 104)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 518) 与 components\judge\management\TeacherSystemPanel.tsx (行 109)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 525) 与 components\judge\management\TeacherSystemPanel.tsx (行 116)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 591) 与 components\judge\management\TeacherSystemPanel.tsx (行 185)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 592) 与 components\judge\management\TeacherSystemPanel.tsx (行 186)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 593) 与 components\judge\management\TeacherSystemPanel.tsx (行 187)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 594) 与 components\judge\management\TeacherSystemPanel.tsx (行 188)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 595) 与 components\judge\management\TeacherSystemPanel.tsx (行 189)
  - 相似度: 100.0%

- components\judge\monitoring\DyingStatusResolutionPanel.tsx (行 15) 与 components\judge\monitoring\DyingStatusResolutionPanel.tsx (行 16)
  - 相似度: 100.0%

- components\judge\monitoring\DyingStatusResolutionPanel.tsx (行 130) 与 components\judge\monitoring\DyingStatusResolutionPanel.tsx (行 131)
  - 相似度: 100.0%

- components\judge\monitoring\DyingStatusResolutionPanel.tsx (行 136) 与 components\judge\monitoring\DyingStatusResolutionPanel.tsx (行 137)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 267) 与 components\judge\monitoring\DyingStatusResolutionPanel.tsx (行 194)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 267) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 201)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 33) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 34)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 63) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 64)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 109) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 103)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 110) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 104)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 74) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 114)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 75) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 115)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 76) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 116)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 77) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 117)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 78) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 118)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 136) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 137)
  - 相似度: 100.0%

- components\game\panels\PlayerStatusManager.tsx (行 286) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 263)
  - 相似度: 100.0%

- components\judge\monitoring\SkillSystemDashboard.tsx (行 123) 与 components\judge\monitoring\SkillSystemDashboard.tsx (行 124)
  - 相似度: 100.0%

- components\game\panels\SkillSystemManager.tsx (行 237) 与 components\judge\monitoring\SkillSystemDashboard.tsx (行 437)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 29) 与 components\judge\types\questionBank.ts (行 3)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 30) 与 components\judge\types\questionBank.ts (行 4)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 34) 与 components\judge\types\questionBank.ts (行 5)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 35) 与 components\judge\types\questionBank.ts (行 6)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 30) 与 components\judge\types\questionBank.ts (行 26)
  - 相似度: 100.0%

- components\game\student\StudentPreviousQuestionDisplay.tsx (行 23) 与 components\judge\types\questionBank.ts (行 27)
  - 相似度: 100.0%

- components\layout\Footer.tsx (行 16) 与 components\layout\Footer.tsx (行 17)
  - 相似度: 100.0%

- components\layout\LanguageSwitcher.tsx (行 16) 与 components\layout\LanguageSwitcher.tsx (行 17)
  - 相似度: 100.0%

- components\layout\LanguageSwitcher.tsx (行 24) 与 components\layout\LanguageSwitcher.tsx (行 25)
  - 相似度: 100.0%

- components\layout\LanguageSwitcher.tsx (行 30) 与 components\layout\LanguageSwitcher.tsx (行 31)
  - 相似度: 100.0%

- components\layout\LanguageSwitcher.tsx (行 165) 与 components\layout\LanguageSwitcher.tsx (行 166)
  - 相似度: 100.0%

- components\layout\LanguageSwitcher.tsx (行 523) 与 components\layout\LanguageSwitcher.tsx (行 524)
  - 相似度: 100.0%

- components\layout\LanguageSwitcher.tsx (行 779) 与 components\layout\LanguageSwitcher.tsx (行 780)
  - 相似度: 100.0%

- components\layout\LanguageSwitcher.tsx (行 793) 与 components\layout\LanguageSwitcher.tsx (行 794)
  - 相似度: 100.0%

- components\lobby\AvatarUpload.tsx (行 28) 与 components\lobby\AvatarUpload.tsx (行 29)
  - 相似度: 100.0%

- components\lobby\AvatarUpload.tsx (行 56) 与 components\lobby\AvatarUpload.tsx (行 57)
  - 相似度: 100.0%

- components\lobby\AvatarUpload.tsx (行 132) 与 components\lobby\AvatarUpload.tsx (行 133)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 77) 与 components\lobby\AvatarUpload.tsx (行 144)
  - 相似度: 100.0%

- components\judge\management\QuestionBankTooltip.tsx (行 67) 与 components\lobby\ExperienceTooltip.tsx (行 64)
  - 相似度: 100.0%

- components\judge\management\QuestionBankTooltip.tsx (行 68) 与 components\lobby\ExperienceTooltip.tsx (行 65)
  - 相似度: 100.0%

- components\judge\management\QuestionBankTooltip.tsx (行 69) 与 components\lobby\ExperienceTooltip.tsx (行 66)
  - 相似度: 100.0%

- components\lobby\ExperienceTooltip.tsx (行 19) 与 components\lobby\PlayerInfo.tsx (行 22)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 92) 与 components\lobby\PlayerInfo.tsx (行 93)
  - 相似度: 100.0%

- components\lobby\PlayerInfoPanel.tsx (行 17) 与 components\lobby\PlayerInfoPanel.tsx (行 18)
  - 相似度: 100.0%

- components\game\panels\VotingSystemManager.tsx (行 102) 与 components\lobby\PlayerInfoPanel.tsx (行 101)
  - 相似度: 100.0%

- components\game\panels\VotingSystemManager.tsx (行 103) 与 components\lobby\PlayerInfoPanel.tsx (行 102)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 124) 与 components\lobby\PlayerStats.tsx (行 49)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 125) 与 components\lobby\PlayerStats.tsx (行 50)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 126) 与 components\lobby\PlayerStats.tsx (行 51)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 127) 与 components\lobby\PlayerStats.tsx (行 52)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 23) 与 components\lobby\RoomListTable.tsx (行 21)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 24) 与 components\lobby\RoomListTable.tsx (行 22)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 25) 与 components\lobby\RoomListTable.tsx (行 23)
  - 相似度: 100.0%

- components\judge\management\QuestionPreview.tsx (行 15) 与 components\room\PlayersList.tsx (行 15)
  - 相似度: 100.0%

- components\judge\management\QuestionSourceList.tsx (行 16) 与 components\room\PlayersList.tsx (行 16)
  - 相似度: 100.0%

- components\judge\management\PlayerStatusPanel.tsx (行 33) 与 components\room\PlayersList.tsx (行 25)
  - 相似度: 100.0%

- components\judge\management\PlayerStatusPanel.tsx (行 34) 与 components\room\PlayersList.tsx (行 26)
  - 相似度: 100.0%

- components\judge\management\PlayerStatusPanel.tsx (行 35) 与 components\room\PlayersList.tsx (行 27)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 267) 与 components\room\PlayersList.tsx (行 286)
  - 相似度: 100.0%

- components\room\RoleSelection.tsx (行 172) 与 components\room\RoleSelection.tsx (行 173)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 269) 与 components\room\RoleSelection.tsx (行 187)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 594) 与 components\room\RoleSelection.tsx (行 401)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 595) 与 components\room\RoleSelection.tsx (行 402)
  - 相似度: 100.0%

- components\room\RoomInfoCard.tsx (行 14) 与 components\room\RoomInfoCard.tsx (行 15)
  - 相似度: 100.0%

- components\room\RoomInfoCard.tsx (行 95) 与 components\room\RoomInfoCard.tsx (行 96)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 89) 与 components\room\RoomInfoCard.tsx (行 137)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 90) 与 components\room\RoomInfoCard.tsx (行 138)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 91) 与 components\room\RoomInfoCard.tsx (行 139)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 92) 与 components\room\RoomInfoCard.tsx (行 140)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 93) 与 components\room\RoomInfoCard.tsx (行 141)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 268) 与 components\room\RoomInfoCard.tsx (行 142)
  - 相似度: 100.0%

- components\room\RoomInfoCard.tsx (行 133) 与 components\room\RoomInfoCard.tsx (行 149)
  - 相似度: 100.0%

- components\room\RoomInfoCard.tsx (行 134) 与 components\room\RoomInfoCard.tsx (行 150)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 268) 与 components\room\RoomInfoCard.tsx (行 157)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 269) 与 components\room\RoomInfoCard.tsx (行 158)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 133) 与 components\room\RoomInfoCard.tsx (行 159)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 199) 与 components\room\RoomInfoCard.tsx (行 160)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 401) 与 components\room\RoomInfoCard.tsx (行 187)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 267) 与 components\room\RoomInfoCard.tsx (行 188)
  - 相似度: 100.0%

- components\ui\accordion.tsx (行 16) 与 components\ui\accordion.tsx (行 17)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 16) 与 components\ui\alert-dialog.tsx (行 17)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 22) 与 components\ui\alert-dialog.tsx (行 23)
  - 相似度: 100.0%

- components\ui\aspect-ratio.tsx (行 16) 与 components\ui\aspect-ratio.tsx (行 17)
  - 相似度: 100.0%

- components\ui\alert.tsx (行 15) 与 components\ui\badge.tsx (行 15)
  - 相似度: 100.0%

- components\ui\alert.tsx (行 16) 与 components\ui\badge.tsx (行 16)
  - 相似度: 100.0%

- components\ui\alert.tsx (行 17) 与 components\ui\badge.tsx (行 17)
  - 相似度: 100.0%

- components\ui\alert.tsx (行 43) 与 components\ui\badge.tsx (行 47)
  - 相似度: 100.0%

- components\ui\alert.tsx (行 44) 与 components\ui\badge.tsx (行 48)
  - 相似度: 100.0%

- components\ui\alert.tsx (行 45) 与 components\ui\badge.tsx (行 49)
  - 相似度: 100.0%

- components\ui\badge.tsx (行 58) 与 components\ui\badge.tsx (行 59)
  - 相似度: 100.0%

- components\ui\breadcrumb.tsx (行 16) 与 components\ui\breadcrumb.tsx (行 17)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 16) 与 components\ui\carousel.tsx (行 17)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 180) 与 components\ui\carousel.tsx (行 181)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 202) 与 components\ui\carousel.tsx (行 203)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 224) 与 components\ui\carousel.tsx (行 225)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 253) 与 components\ui\carousel.tsx (行 254)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 230) 与 components\ui\carousel.tsx (行 259)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 231) 与 components\ui\carousel.tsx (行 260)
  - 相似度: 100.0%

- components\ui\chart.tsx (行 199) 与 components\ui\chart.tsx (行 200)
  - 相似度: 100.0%

- components\ui\checkbox.tsx (行 16) 与 components\ui\checkbox.tsx (行 17)
  - 相似度: 100.0%

- components\ui\collapsible.tsx (行 33) 与 components\ui\collapsible.tsx (行 34)
  - 相似度: 100.0%

- components\ui\command.tsx (行 120) 与 components\ui\command.tsx (行 148)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 16) 与 components\ui\context-menu.tsx (行 17)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 20) 与 components\ui\context-menu.tsx (行 21)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 22) 与 components\ui\context-menu.tsx (行 23)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 24) 与 components\ui\context-menu.tsx (行 25)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 26) 与 components\ui\context-menu.tsx (行 27)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 28) 与 components\ui\context-menu.tsx (行 29)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 98) 与 components\ui\context-menu.tsx (行 162)
  - 相似度: 100.0%

- components\ui\command.tsx (行 157) 与 components\ui\context-menu.tsx (行 183)
  - 相似度: 100.0%

- components\ui\command.tsx (行 158) 与 components\ui\context-menu.tsx (行 184)
  - 相似度: 100.0%

- components\ui\command.tsx (行 159) 与 components\ui\context-menu.tsx (行 185)
  - 相似度: 100.0%

- components\ui\command.tsx (行 160) 与 components\ui\context-menu.tsx (行 186)
  - 相似度: 100.0%

- components\ui\command.tsx (行 161) 与 components\ui\context-menu.tsx (行 187)
  - 相似度: 100.0%

- components\ui\command.tsx (行 162) 与 components\ui\context-menu.tsx (行 188)
  - 相似度: 100.0%

- components\ui\command.tsx (行 163) 与 components\ui\context-menu.tsx (行 189)
  - 相似度: 100.0%

- components\ui\command.tsx (行 164) 与 components\ui\context-menu.tsx (行 190)
  - 相似度: 100.0%

- components\ui\dialog.tsx (行 16) 与 components\ui\dialog.tsx (行 17)
  - 相似度: 100.0%

- components\ui\dialog.tsx (行 37) 与 components\ui\dialog.tsx (行 38)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 51) 与 components\ui\dialog.tsx (行 66)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 77) 与 components\ui\dialog.tsx (行 98)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 78) 与 components\ui\dialog.tsx (行 99)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 79) 与 components\ui\dialog.tsx (行 100)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 80) 与 components\ui\dialog.tsx (行 101)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 81) 与 components\ui\dialog.tsx (行 102)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 82) 与 components\ui\dialog.tsx (行 103)
  - 相似度: 100.0%

- components\ui\drawer.tsx (行 45) 与 components\ui\drawer.tsx (行 46)
  - 相似度: 100.0%

- components\ui\dialog.tsx (行 116) 与 components\ui\drawer.tsx (行 112)
  - 相似度: 100.0%

- components\ui\dialog.tsx (行 117) 与 components\ui\drawer.tsx (行 113)
  - 相似度: 100.0%

- components\ui\dialog.tsx (行 118) 与 components\ui\drawer.tsx (行 114)
  - 相似度: 100.0%

- components\ui\dropdown-menu.tsx (行 16) 与 components\ui\dropdown-menu.tsx (行 17)
  - 相似度: 100.0%

- components\ui\dropdown-menu.tsx (行 20) 与 components\ui\dropdown-menu.tsx (行 21)
  - 相似度: 100.0%

- components\ui\dropdown-menu.tsx (行 22) 与 components\ui\dropdown-menu.tsx (行 23)
  - 相似度: 100.0%

- components\ui\dropdown-menu.tsx (行 24) 与 components\ui\dropdown-menu.tsx (行 25)
  - 相似度: 100.0%

- components\ui\dropdown-menu.tsx (行 26) 与 components\ui\dropdown-menu.tsx (行 27)
  - 相似度: 100.0%

- components\ui\dropdown-menu.tsx (行 28) 与 components\ui\dropdown-menu.tsx (行 29)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 45) 与 components\ui\dropdown-menu.tsx (行 45)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 46) 与 components\ui\dropdown-menu.tsx (行 46)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 98) 与 components\ui\dropdown-menu.tsx (行 101)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 114) 与 components\ui\dropdown-menu.tsx (行 117)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 98) 与 components\ui\dropdown-menu.tsx (行 165)
  - 相似度: 100.0%

- components\ui\form.tsx (行 76) 与 components\ui\form.tsx (行 77)
  - 相似度: 100.0%

- components\ui\form.tsx (行 78) 与 components\ui\form.tsx (行 79)
  - 相似度: 100.0%

- components\ui\form.tsx (行 102) 与 components\ui\form.tsx (行 103)
  - 相似度: 100.0%

- components\ui\form.tsx (行 116) 与 components\ui\form.tsx (行 117)
  - 相似度: 100.0%

- components\ui\form.tsx (行 133) 与 components\ui\form.tsx (行 134)
  - 相似度: 100.0%

- components\ui\form.tsx (行 155) 与 components\ui\form.tsx (行 156)
  - 相似度: 100.0%

- components\ui\hover-card.tsx (行 19) 与 components\ui\hover-card.tsx (行 20)
  - 相似度: 100.0%

- components\ui\input-otp.tsx (行 16) 与 components\ui\input-otp.tsx (行 17)
  - 相似度: 100.0%

- components\ui\card.tsx (行 15) 与 components\ui\input.tsx (行 15)
  - 相似度: 100.0%

- components\ui\card.tsx (行 16) 与 components\ui\input.tsx (行 16)
  - 相似度: 100.0%

- components\ui\label.tsx (行 16) 与 components\ui\label.tsx (行 17)
  - 相似度: 100.0%

- components\ui\menubar.tsx (行 16) 与 components\ui\menubar.tsx (行 17)
  - 相似度: 100.0%

- components\ui\menubar.tsx (行 37) 与 components\ui\menubar.tsx (行 38)
  - 相似度: 100.0%

- components\ui\menubar.tsx (行 39) 与 components\ui\menubar.tsx (行 40)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 42) 与 components\ui\menubar.tsx (行 83)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 43) 与 components\ui\menubar.tsx (行 84)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 44) 与 components\ui\menubar.tsx (行 85)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 45) 与 components\ui\menubar.tsx (行 86)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 46) 与 components\ui\menubar.tsx (行 87)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 95) 与 components\ui\menubar.tsx (行 144)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 96) 与 components\ui\menubar.tsx (行 145)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 97) 与 components\ui\menubar.tsx (行 146)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 98) 与 components\ui\menubar.tsx (行 147)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 111) 与 components\ui\menubar.tsx (行 160)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 112) 与 components\ui\menubar.tsx (行 161)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 113) 与 components\ui\menubar.tsx (行 162)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 114) 与 components\ui\menubar.tsx (行 163)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 135) 与 components\ui\menubar.tsx (行 183)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 136) 与 components\ui\menubar.tsx (行 184)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 137) 与 components\ui\menubar.tsx (行 185)
  - 相似度: 100.0%

- components\ui\dropdown-menu.tsx (行 162) 与 components\ui\menubar.tsx (行 207)
  - 相似度: 100.0%

- components\ui\dropdown-menu.tsx (行 163) 与 components\ui\menubar.tsx (行 208)
  - 相似度: 100.0%

- components\ui\dropdown-menu.tsx (行 164) 与 components\ui\menubar.tsx (行 209)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 98) 与 components\ui\menubar.tsx (行 210)
  - 相似度: 100.0%

- components\ui\command.tsx (行 157) 与 components\ui\menubar.tsx (行 231)
  - 相似度: 100.0%

- components\ui\command.tsx (行 158) 与 components\ui\menubar.tsx (行 232)
  - 相似度: 100.0%

- components\ui\command.tsx (行 159) 与 components\ui\menubar.tsx (行 233)
  - 相似度: 100.0%

- components\ui\command.tsx (行 160) 与 components\ui\menubar.tsx (行 234)
  - 相似度: 100.0%

- components\ui\command.tsx (行 161) 与 components\ui\menubar.tsx (行 235)
  - 相似度: 100.0%

- components\ui\command.tsx (行 162) 与 components\ui\menubar.tsx (行 236)
  - 相似度: 100.0%

- components\ui\command.tsx (行 163) 与 components\ui\menubar.tsx (行 237)
  - 相似度: 100.0%

- components\ui\command.tsx (行 164) 与 components\ui\menubar.tsx (行 238)
  - 相似度: 100.0%

- components\ui\navigation-menu.tsx (行 56) 与 components\ui\navigation-menu.tsx (行 57)
  - 相似度: 100.0%

- components\ui\pagination.tsx (行 16) 与 components\ui\pagination.tsx (行 17)
  - 相似度: 100.0%

- components\ui\radio-group.tsx (行 16) 与 components\ui\radio-group.tsx (行 17)
  - 相似度: 100.0%

- components\ui\select.tsx (行 16) 与 components\ui\select.tsx (行 17)
  - 相似度: 100.0%

- components\ui\select.tsx (行 67) 与 components\ui\select.tsx (行 84)
  - 相似度: 100.0%

- components\ui\select.tsx (行 68) 与 components\ui\select.tsx (行 85)
  - 相似度: 100.0%

- components\ui\sheet.tsx (行 38) 与 components\ui\sheet.tsx (行 39)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 34) 与 components\ui\sheet.tsx (行 50)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 35) 与 components\ui\sheet.tsx (行 51)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 36) 与 components\ui\sheet.tsx (行 52)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 63) 与 components\ui\sheet.tsx (行 105)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 64) 与 components\ui\sheet.tsx (行 106)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 65) 与 components\ui\sheet.tsx (行 107)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 66) 与 components\ui\sheet.tsx (行 108)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 67) 与 components\ui\sheet.tsx (行 109)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 68) 与 components\ui\sheet.tsx (行 110)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 77) 与 components\ui\sheet.tsx (行 119)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 78) 与 components\ui\sheet.tsx (行 120)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 79) 与 components\ui\sheet.tsx (行 121)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 80) 与 components\ui\sheet.tsx (行 122)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 81) 与 components\ui\sheet.tsx (行 123)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 82) 与 components\ui\sheet.tsx (行 124)
  - 相似度: 100.0%

- components\ui\sheet.tsx (行 155) 与 components\ui\sheet.tsx (行 156)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 68) 与 components\ui\sidebar.tsx (行 69)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 113) 与 components\ui\sidebar.tsx (行 114)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 83) 与 components\ui\sidebar.tsx (行 200)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 289) 与 components\ui\sidebar.tsx (行 290)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 315) 与 components\ui\sidebar.tsx (行 316)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 217) 与 components\ui\sidebar.tsx (行 337)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 217) 与 components\ui\sidebar.tsx (行 355)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 217) 与 components\ui\sidebar.tsx (行 373)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 382) 与 components\ui\sidebar.tsx (行 397)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 382) 与 components\ui\sidebar.tsx (行 427)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 217) 与 components\ui\sidebar.tsx (行 436)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 382) 与 components\ui\sidebar.tsx (行 445)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 458) 与 components\ui\sidebar.tsx (行 459)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 217) 与 components\ui\sidebar.tsx (行 472)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 479) 与 components\ui\sidebar.tsx (行 480)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 217) 与 components\ui\sidebar.tsx (行 495)
  - 相似度: 100.0%

- components\ui\button.tsx (行 57) 与 components\ui\sidebar.tsx (行 555)
  - 相似度: 100.0%

- components\ui\button.tsx (行 58) 与 components\ui\sidebar.tsx (行 556)
  - 相似度: 100.0%

- components\ui\button.tsx (行 59) 与 components\ui\sidebar.tsx (行 557)
  - 相似度: 100.0%

- components\ui\button.tsx (行 60) 与 components\ui\sidebar.tsx (行 558)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 601) 与 components\ui\sidebar.tsx (行 602)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 217) 与 components\ui\sidebar.tsx (行 646)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 667) 与 components\ui\sidebar.tsx (行 722)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 729) 与 components\ui\sidebar.tsx (行 730)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 494) 与 components\ui\sidebar.tsx (行 757)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 217) 与 components\ui\sidebar.tsx (行 758)
  - 相似度: 100.0%

- components\ui\skill-progress-indicator.tsx (行 65) 与 components\ui\skill-progress-indicator.tsx (行 66)
  - 相似度: 100.0%

- components\ui\skill-progress-indicator.tsx (行 68) 与 components\ui\skill-progress-indicator.tsx (行 69)
  - 相似度: 100.0%

- components\ui\switch.tsx (行 16) 与 components\ui\switch.tsx (行 17)
  - 相似度: 100.0%

- components\ui\card.tsx (行 15) 与 components\ui\table.tsx (行 15)
  - 相似度: 100.0%

- components\ui\card.tsx (行 16) 与 components\ui\table.tsx (行 16)
  - 相似度: 100.0%

- components\ui\card.tsx (行 15) 与 components\ui\textarea.tsx (行 15)
  - 相似度: 100.0%

- components\ui\input.tsx (行 41) 与 components\ui\textarea.tsx (行 43)
  - 相似度: 100.0%

- components\ui\input.tsx (行 42) 与 components\ui\textarea.tsx (行 44)
  - 相似度: 100.0%

- components\ui\input.tsx (行 43) 与 components\ui\textarea.tsx (行 45)
  - 相似度: 100.0%

- components\ui\alert.tsx (行 43) 与 components\ui\toast.tsx (行 62)
  - 相似度: 100.0%

- components\ui\alert.tsx (行 44) 与 components\ui\toast.tsx (行 63)
  - 相似度: 100.0%

- components\ui\alert.tsx (行 45) 与 components\ui\toast.tsx (行 64)
  - 相似度: 100.0%

- components\ui\toggle.tsx (行 16) 与 components\ui\toggle.tsx (行 17)
  - 相似度: 100.0%

- components\ui\button.tsx (行 57) 与 components\ui\toggle.tsx (行 49)
  - 相似度: 100.0%

- components\ui\button.tsx (行 58) 与 components\ui\toggle.tsx (行 50)
  - 相似度: 100.0%

- components\ui\button.tsx (行 59) 与 components\ui\toggle.tsx (行 51)
  - 相似度: 100.0%

- components\ui\button.tsx (行 60) 与 components\ui\toggle.tsx (行 52)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 22) 与 components\voting\EnhancedVotingManager.tsx (行 9)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 23) 与 components\voting\EnhancedVotingManager.tsx (行 10)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 24) 与 components\voting\EnhancedVotingManager.tsx (行 11)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 25) 与 components\voting\EnhancedVotingManager.tsx (行 12)
  - 相似度: 100.0%

- components\voting\EnhancedVotingManager.tsx (行 160) 与 components\voting\EnhancedVotingManager.tsx (行 194)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 195) 与 components\voting\EnhancedVotingManager.tsx (行 224)
  - 相似度: 100.0%

- components\voting\VotingPanel.tsx (行 148) 与 components\voting\VotingPanel.tsx (行 149)
  - 相似度: 100.0%

- components\game\panels\VotingSystemManager.tsx (行 102) 与 components\voting\VotingPanel.tsx (行 476)
  - 相似度: 100.0%

- components\game\panels\VotingSystemManager.tsx (行 103) 与 components\voting\VotingPanel.tsx (行 477)
  - 相似度: 100.0%

- config\security.config.ts (行 192) 与 config\security.config.ts (行 204)
  - 相似度: 100.0%

- config\security.config.ts (行 192) 与 config\security.config.ts (行 230)
  - 相似度: 100.0%

- config\security.config.ts (行 192) 与 config\security.config.ts (行 242)
  - 相似度: 100.0%

- config\security.config.ts (行 192) 与 config\security.config.ts (行 254)
  - 相似度: 100.0%

- config\security.config.ts (行 266) 与 config\security.config.ts (行 280)
  - 相似度: 100.0%

- config\security.config.ts (行 266) 与 config\security.config.ts (行 294)
  - 相似度: 100.0%

- config\security.config.ts (行 229) 与 config\security.config.ts (行 307)
  - 相似度: 100.0%

- config\security.config.ts (行 266) 与 config\security.config.ts (行 308)
  - 相似度: 100.0%

- config\security.config.ts (行 487) 与 config\security.config.ts (行 488)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 27) 与 contexts\JudgePageContext.tsx (行 8)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 28) 与 contexts\JudgePageContext.tsx (行 9)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 29) 与 contexts\JudgePageContext.tsx (行 10)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 30) 与 contexts\JudgePageContext.tsx (行 11)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 34) 与 contexts\JudgePageContext.tsx (行 12)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 35) 与 contexts\JudgePageContext.tsx (行 13)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 36) 与 contexts\JudgePageContext.tsx (行 14)
  - 相似度: 100.0%

- contexts\JudgePageContext.tsx (行 56) 与 contexts\JudgePageContext.tsx (行 57)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 110) 与 contexts\JudgePageContext.tsx (行 64)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 111) 与 contexts\JudgePageContext.tsx (行 65)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 112) 与 contexts\JudgePageContext.tsx (行 66)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 113) 与 contexts\JudgePageContext.tsx (行 67)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 114) 与 contexts\JudgePageContext.tsx (行 68)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 115) 与 contexts\JudgePageContext.tsx (行 69)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 116) 与 contexts\JudgePageContext.tsx (行 70)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 117) 与 contexts\JudgePageContext.tsx (行 71)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 118) 与 contexts\JudgePageContext.tsx (行 72)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 119) 与 contexts\JudgePageContext.tsx (行 73)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 120) 与 contexts\JudgePageContext.tsx (行 74)
  - 相似度: 100.0%

- contexts\JudgePageContext.tsx (行 152) 与 contexts\JudgePageContext.tsx (行 153)
  - 相似度: 100.0%

- contexts\JudgePageContext.tsx (行 158) 与 contexts\JudgePageContext.tsx (行 159)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 215) 与 contexts\JudgePageContext.tsx (行 239)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 216) 与 contexts\JudgePageContext.tsx (行 240)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 217) 与 contexts\JudgePageContext.tsx (行 241)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 218) 与 contexts\JudgePageContext.tsx (行 242)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 109) 与 contexts\JudgePageContext.tsx (行 250)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 110) 与 contexts\JudgePageContext.tsx (行 251)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 105) 与 contexts\JudgePageContext.tsx (行 252)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 106) 与 contexts\JudgePageContext.tsx (行 253)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 47) 与 contexts\PermissionContext.tsx (行 48)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 102) 与 contexts\PermissionContext.tsx (行 103)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 66) 与 contexts\PermissionContext.tsx (行 183)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 67) 与 contexts\PermissionContext.tsx (行 184)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 68) 与 contexts\PermissionContext.tsx (行 185)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 69) 与 contexts\PermissionContext.tsx (行 186)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 194) 与 contexts\PermissionContext.tsx (行 195)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 228) 与 contexts\PermissionContext.tsx (行 249)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 229) 与 contexts\PermissionContext.tsx (行 250)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 230) 与 contexts\PermissionContext.tsx (行 251)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 231) 与 contexts\PermissionContext.tsx (行 252)
  - 相似度: 100.0%

- hooks\skill\useSkillData.ts (行 38) 与 hooks\skill\useSkillData.ts (行 39)
  - 相似度: 100.0%

- hooks\skill\useSkillRealtime.ts (行 7) 与 hooks\skill\useSkillRealtime.ts (行 8)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 106) 与 hooks\skill\useSkillRealtime.ts (行 52)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 107) 与 hooks\skill\useSkillRealtime.ts (行 53)
  - 相似度: 100.0%

- hooks\skill\useSkillStats.ts (行 62) 与 hooks\skill\useSkillStats.ts (行 63)
  - 相似度: 100.0%

- hooks\skill\useSkillStats.ts (行 85) 与 hooks\skill\useSkillStats.ts (行 86)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 51) 与 hooks\skill\useSkillValidation.ts (行 200)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 52) 与 hooks\skill\useSkillValidation.ts (行 201)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 53) 与 hooks\skill\useSkillValidation.ts (行 202)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 54) 与 hooks\skill\useSkillValidation.ts (行 203)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 55) 与 hooks\skill\useSkillValidation.ts (行 204)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 56) 与 hooks\skill\useSkillValidation.ts (行 205)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 57) 与 hooks\skill\useSkillValidation.ts (行 206)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 58) 与 hooks\skill\useSkillValidation.ts (行 207)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 28) 与 hooks\skill\useSkillValidation.ts (行 218)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 52) 与 hooks\skill\useSkillValidation.ts (行 226)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 53) 与 hooks\skill\useSkillValidation.ts (行 227)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 54) 与 hooks\skill\useSkillValidation.ts (行 228)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 55) 与 hooks\skill\useSkillValidation.ts (行 229)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 56) 与 hooks\skill\useSkillValidation.ts (行 230)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 57) 与 hooks\skill\useSkillValidation.ts (行 231)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 58) 与 hooks\skill\useSkillValidation.ts (行 232)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 10) 与 hooks\useAutoDyingStatusProcessor.ts (行 11)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 49) 与 hooks\useAutoDyingStatusProcessor.ts (行 50)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 55) 与 hooks\useAutoDyingStatusProcessor.ts (行 56)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 90) 与 hooks\useAutoDyingStatusProcessor.ts (行 91)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 59) 与 hooks\useAutoDyingStatusProcessor.ts (行 94)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 96) 与 hooks\useAutoDyingStatusProcessor.ts (行 97)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 107) 与 hooks\useAutoDyingStatusProcessor.ts (行 108)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 197) 与 hooks\useAutoDyingStatusProcessor.ts (行 198)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 206) 与 hooks\useAutoDyingStatusProcessor.ts (行 207)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 108) 与 hooks\useAutoDyingStatusProcessor.ts (行 248)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 109) 与 hooks\useAutoDyingStatusProcessor.ts (行 249)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 10) 与 hooks\useAutoProcessDayVote.ts (行 6)
  - 相似度: 100.0%

- hooks\useAutoProcessDayVote.ts (行 19) 与 hooks\useAutoProcessDayVote.ts (行 20)
  - 相似度: 100.0%

- hooks\useDataCache.ts (行 5) 与 hooks\useDataCache.ts (行 6)
  - 相似度: 100.0%

- hooks\useDataCache.ts (行 11) 与 hooks\useDataCache.ts (行 12)
  - 相似度: 100.0%

- hooks\useDataCache.ts (行 125) 与 hooks\useDataCache.ts (行 126)
  - 相似度: 100.0%

- hooks\useDataCache.ts (行 194) 与 hooks\useDataCache.ts (行 195)
  - 相似度: 100.0%

- hooks\useDataCache.ts (行 200) 与 hooks\useDataCache.ts (行 201)
  - 相似度: 100.0%

- hooks\useDebounce.ts (行 23) 与 hooks\useDebounce.ts (行 24)
  - 相似度: 100.0%

- hooks\useEnhancedErrorHandler.ts (行 162) 与 hooks\useEnhancedErrorHandler.ts (行 163)
  - 相似度: 100.0%

- hooks\useEnhancedErrorHandler.ts (行 176) 与 hooks\useEnhancedErrorHandler.ts (行 177)
  - 相似度: 100.0%

- hooks\useEnhancedErrorHandler.ts (行 166) 与 hooks\useEnhancedErrorHandler.ts (行 180)
  - 相似度: 100.0%

- hooks\useEnhancedErrorHandler.ts (行 260) 与 hooks\useEnhancedErrorHandler.ts (行 261)
  - 相似度: 100.0%

- hooks\useEnhancedErrorHandler.ts (行 266) 与 hooks\useEnhancedErrorHandler.ts (行 267)
  - 相似度: 100.0%

- hooks\useEnhancedErrorHandler.ts (行 277) 与 hooks\useEnhancedErrorHandler.ts (行 278)
  - 相似度: 100.0%

- hooks\useEnhancedSkillSystem.ts (行 126) 与 hooks\useEnhancedSkillSystem.ts (行 127)
  - 相似度: 100.0%

- hooks\useEnhancedSkillSystem.ts (行 182) 与 hooks\useEnhancedSkillSystem.ts (行 183)
  - 相似度: 100.0%

- hooks\useEnhancedSkillSystem.ts (行 188) 与 hooks\useEnhancedSkillSystem.ts (行 189)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 54) 与 hooks\useErrorHandler.ts (行 85)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 55) 与 hooks\useErrorHandler.ts (行 86)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 56) 与 hooks\useErrorHandler.ts (行 87)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 57) 与 hooks\useErrorHandler.ts (行 88)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 58) 与 hooks\useErrorHandler.ts (行 89)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 59) 与 hooks\useErrorHandler.ts (行 90)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 60) 与 hooks\useErrorHandler.ts (行 91)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 61) 与 hooks\useErrorHandler.ts (行 92)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 62) 与 hooks\useErrorHandler.ts (行 93)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 63) 与 hooks\useErrorHandler.ts (行 94)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 64) 与 hooks\useErrorHandler.ts (行 95)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 65) 与 hooks\useErrorHandler.ts (行 96)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 66) 与 hooks\useErrorHandler.ts (行 97)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 67) 与 hooks\useErrorHandler.ts (行 98)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 68) 与 hooks\useErrorHandler.ts (行 99)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 69) 与 hooks\useErrorHandler.ts (行 100)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 70) 与 hooks\useErrorHandler.ts (行 101)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 71) 与 hooks\useErrorHandler.ts (行 102)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 72) 与 hooks\useErrorHandler.ts (行 103)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 73) 与 hooks\useErrorHandler.ts (行 104)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 74) 与 hooks\useErrorHandler.ts (行 105)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 75) 与 hooks\useErrorHandler.ts (行 106)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 76) 与 hooks\useErrorHandler.ts (行 107)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 77) 与 hooks\useErrorHandler.ts (行 108)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 78) 与 hooks\useErrorHandler.ts (行 109)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 79) 与 hooks\useErrorHandler.ts (行 110)
  - 相似度: 100.0%

- hooks\useAutoProcessDayVote.ts (行 4) 与 hooks\useEveningRefresh.ts (行 2)
  - 相似度: 100.0%

- hooks\useAutoProcessDayVote.ts (行 5) 与 hooks\useEveningRefresh.ts (行 3)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 10) 与 hooks\useEveningRefresh.ts (行 4)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 141) 与 hooks\useGameState.ts (行 169)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 108) 与 hooks\useGameState.ts (行 170)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 174) 与 hooks\useGameState.ts (行 175)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 194) 与 hooks\useGameState.ts (行 195)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 236) 与 hooks\useGameState.ts (行 237)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 332) 与 hooks\useGameState.ts (行 358)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 387) 与 hooks\useGameState.ts (行 388)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 332) 与 hooks\useGameState.ts (行 398)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 434) 与 hooks\useGameState.ts (行 435)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 313) 与 hooks\useGameState.ts (行 502)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 507) 与 hooks\useGameState.ts (行 508)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 57) 与 hooks\useGameState.ts (行 525)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 58) 与 hooks\useGameState.ts (行 526)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 25) 与 hooks\useMemoryManager.ts (行 26)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 69) 与 hooks\useMemoryManager.ts (行 70)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 119) 与 hooks\useMemoryManager.ts (行 120)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 159) 与 hooks\useMemoryManager.ts (行 160)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 169) 与 hooks\useMemoryManager.ts (行 170)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 197) 与 hooks\useMemoryManager.ts (行 198)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 10) 与 hooks\useMultiChannelChat.ts (行 11)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 72) 与 hooks\useMultiChannelChat.ts (行 73)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 126) 与 hooks\useMultiChannelChat.ts (行 127)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 169) 与 hooks\useMultiChannelChat.ts (行 170)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 109) 与 hooks\useMultiChannelChat.ts (行 182)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 110) 与 hooks\useMultiChannelChat.ts (行 183)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 105) 与 hooks\useMultiChannelChat.ts (行 184)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 106) 与 hooks\useMultiChannelChat.ts (行 185)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 58) 与 hooks\useOptimizedSupabaseQuery.ts (行 59)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 91) 与 hooks\useOptimizedSupabaseQuery.ts (行 92)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 97) 与 hooks\useOptimizedSupabaseQuery.ts (行 98)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 105) 与 hooks\useOptimizedSupabaseQuery.ts (行 106)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 107) 与 hooks\useOptimizedSupabaseQuery.ts (行 108)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 148) 与 hooks\useOptimizedSupabaseQuery.ts (行 149)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 154) 与 hooks\useOptimizedSupabaseQuery.ts (行 155)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 164) 与 hooks\useOptimizedSupabaseQuery.ts (行 165)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 184) 与 hooks\useOptimizedSupabaseQuery.ts (行 185)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 210) 与 hooks\useOptimizedSupabaseQuery.ts (行 211)
  - 相似度: 100.0%

- hooks\usePerformanceMonitoring.ts (行 52) 与 hooks\usePerformanceMonitoring.ts (行 53)
  - 相似度: 100.0%

- hooks\usePerformanceMonitoring.ts (行 116) 与 hooks\usePerformanceMonitoring.ts (行 117)
  - 相似度: 100.0%

- hooks\usePerformanceMonitoring.ts (行 121) 与 hooks\usePerformanceMonitoring.ts (行 137)
  - 相似度: 100.0%

- hooks\usePerformanceMonitoring.ts (行 122) 与 hooks\usePerformanceMonitoring.ts (行 138)
  - 相似度: 100.0%

- hooks\usePerformanceMonitoring.ts (行 123) 与 hooks\usePerformanceMonitoring.ts (行 139)
  - 相似度: 100.0%

- hooks\usePerformanceMonitoring.ts (行 124) 与 hooks\usePerformanceMonitoring.ts (行 140)
  - 相似度: 100.0%

- hooks\usePerformanceMonitoring.ts (行 125) 与 hooks\usePerformanceMonitoring.ts (行 141)
  - 相似度: 100.0%

- hooks\usePerformanceOptimization.ts (行 50) 与 hooks\usePerformanceOptimization.ts (行 78)
  - 相似度: 100.0%

- hooks\usePerformanceOptimization.ts (行 51) 与 hooks\usePerformanceOptimization.ts (行 79)
  - 相似度: 100.0%

- hooks\usePerformanceOptimization.ts (行 52) 与 hooks\usePerformanceOptimization.ts (行 80)
  - 相似度: 100.0%

- hooks\usePerformanceOptimization.ts (行 63) 与 hooks\usePerformanceOptimization.ts (行 93)
  - 相似度: 100.0%

- hooks\usePerformanceOptimization.ts (行 64) 与 hooks\usePerformanceOptimization.ts (行 94)
  - 相似度: 100.0%

- hooks\usePerformanceOptimization.ts (行 111) 与 hooks\usePerformanceOptimization.ts (行 112)
  - 相似度: 100.0%

- hooks\usePerformanceOptimization.ts (行 133) 与 hooks\usePerformanceOptimization.ts (行 134)
  - 相似度: 100.0%

- hooks\usePerformanceOptimizationNew.ts (行 5) 与 hooks\usePerformanceOptimizationNew.ts (行 6)
  - 相似度: 100.0%

- hooks\usePerformanceOptimizationNew.ts (行 54) 与 hooks\usePerformanceOptimizationNew.ts (行 55)
  - 相似度: 100.0%

- hooks\usePerformanceOptimizationNew.ts (行 63) 与 hooks\usePerformanceOptimizationNew.ts (行 64)
  - 相似度: 100.0%

- hooks\usePerformanceOptimizationNew.ts (行 189) 与 hooks\usePerformanceOptimizationNew.ts (行 190)
  - 相似度: 100.0%

- hooks\usePermissions.ts (行 4) 与 hooks\usePermissions.ts (行 5)
  - 相似度: 100.0%

- hooks\usePlayerPresence.ts (行 5) 与 hooks\usePlayerPresence.ts (行 6)
  - 相似度: 100.0%

- hooks\usePlayerPresence.ts (行 22) 与 hooks\usePlayerPresence.ts (行 23)
  - 相似度: 100.0%

- hooks\usePlayerPresence.ts (行 61) 与 hooks\usePlayerPresence.ts (行 62)
  - 相似度: 100.0%

- hooks\usePlayerRoom.ts (行 4) 与 hooks\usePlayerRoom.ts (行 5)
  - 相似度: 100.0%

- hooks\usePlayerRoom.ts (行 18) 与 hooks\usePlayerRoom.ts (行 19)
  - 相似度: 100.0%

- hooks\usePlayerRoom.ts (行 83) 与 hooks\usePlayerRoom.ts (行 84)
  - 相似度: 100.0%

- components\judge\management\PlayerStatusPanel.tsx (行 33) 与 hooks\usePlayersRealtime.ts (行 4)
  - 相似度: 100.0%

- components\judge\management\PlayerStatusPanel.tsx (行 34) 与 hooks\usePlayersRealtime.ts (行 5)
  - 相似度: 100.0%

- components\judge\management\PlayerStatusPanel.tsx (行 35) 与 hooks\usePlayersRealtime.ts (行 6)
  - 相似度: 100.0%

- components\room\PlayersList.tsx (行 28) 与 hooks\usePlayersRealtime.ts (行 7)
  - 相似度: 100.0%

- hooks\usePlayersRealtime.ts (行 39) 与 hooks\usePlayersRealtime.ts (行 40)
  - 相似度: 100.0%

- hooks\usePlayersRealtime.ts (行 52) 与 hooks\usePlayersRealtime.ts (行 53)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 109) 与 hooks\usePlayersRealtime.ts (行 131)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 110) 与 hooks\usePlayersRealtime.ts (行 132)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 105) 与 hooks\usePlayersRealtime.ts (行 133)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 106) 与 hooks\usePlayersRealtime.ts (行 134)
  - 相似度: 100.0%

- hooks\useRoleDesigns.ts (行 66) 与 hooks\useRoleDesigns.ts (行 67)
  - 相似度: 100.0%

- hooks\useRoleDesigns.ts (行 72) 与 hooks\useRoleDesigns.ts (行 73)
  - 相似度: 100.0%

- hooks\useRoleDesigns.ts (行 93) 与 hooks\useRoleDesigns.ts (行 94)
  - 相似度: 100.0%

- hooks\useRoleDesigns.ts (行 99) 与 hooks\useRoleDesigns.ts (行 100)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 109) 与 hooks\useRoleSelection.ts (行 75)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 110) 与 hooks\useRoleSelection.ts (行 76)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 105) 与 hooks\useRoleSelection.ts (行 77)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 106) 与 hooks\useRoleSelection.ts (行 78)
  - 相似度: 100.0%

- hooks\useRoleSelection.ts (行 87) 与 hooks\useRoleSelection.ts (行 88)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 106) 与 hooks\useRoleStates.ts (行 77)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 107) 与 hooks\useRoleStates.ts (行 78)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 108) 与 hooks\useRoleStates.ts (行 79)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 109) 与 hooks\useRoleStates.ts (行 80)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 110) 与 hooks\useRoleStates.ts (行 81)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 105) 与 hooks\useRoleStates.ts (行 82)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 106) 与 hooks\useRoleStates.ts (行 83)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 106) 与 hooks\useRoomAnswers.ts (行 72)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 107) 与 hooks\useRoomAnswers.ts (行 73)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 108) 与 hooks\useRoomAnswers.ts (行 74)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 109) 与 hooks\useRoomAnswers.ts (行 75)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 110) 与 hooks\useRoomAnswers.ts (行 76)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 105) 与 hooks\useRoomAnswers.ts (行 77)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 106) 与 hooks\useRoomAnswers.ts (行 78)
  - 相似度: 100.0%

- components\chat\ChatMessage.tsx (行 19) 与 hooks\useRoomChat.ts (行 5)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 99) 与 hooks\useRoomChat.ts (行 27)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 100) 与 hooks\useRoomChat.ts (行 28)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 101) 与 hooks\useRoomChat.ts (行 29)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 113) 与 hooks\useRoomChat.ts (行 39)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 114) 与 hooks\useRoomChat.ts (行 40)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 115) 与 hooks\useRoomChat.ts (行 41)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 116) 与 hooks\useRoomChat.ts (行 42)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 117) 与 hooks\useRoomChat.ts (行 43)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 118) 与 hooks\useRoomChat.ts (行 44)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 119) 与 hooks\useRoomChat.ts (行 45)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 126) 与 hooks\useRoomChat.ts (行 50)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 126) 与 hooks\useRoomChat.ts (行 51)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 128) 与 hooks\useRoomChat.ts (行 52)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 129) 与 hooks\useRoomChat.ts (行 53)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 130) 与 hooks\useRoomChat.ts (行 54)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 131) 与 hooks\useRoomChat.ts (行 55)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 132) 与 hooks\useRoomChat.ts (行 56)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 133) 与 hooks\useRoomChat.ts (行 57)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 134) 与 hooks\useRoomChat.ts (行 58)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 135) 与 hooks\useRoomChat.ts (行 59)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 136) 与 hooks\useRoomChat.ts (行 60)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 137) 与 hooks\useRoomChat.ts (行 61)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 138) 与 hooks\useRoomChat.ts (行 62)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 139) 与 hooks\useRoomChat.ts (行 63)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 140) 与 hooks\useRoomChat.ts (行 64)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 141) 与 hooks\useRoomChat.ts (行 65)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 142) 与 hooks\useRoomChat.ts (行 66)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 143) 与 hooks\useRoomChat.ts (行 67)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 144) 与 hooks\useRoomChat.ts (行 68)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 145) 与 hooks\useRoomChat.ts (行 69)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 146) 与 hooks\useRoomChat.ts (行 70)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 147) 与 hooks\useRoomChat.ts (行 71)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 148) 与 hooks\useRoomChat.ts (行 72)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 149) 与 hooks\useRoomChat.ts (行 73)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 150) 与 hooks\useRoomChat.ts (行 74)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 151) 与 hooks\useRoomChat.ts (行 75)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 152) 与 hooks\useRoomChat.ts (行 76)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 159) 与 hooks\useRoomChat.ts (行 83)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 160) 与 hooks\useRoomChat.ts (行 84)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 161) 与 hooks\useRoomChat.ts (行 85)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 162) 与 hooks\useRoomChat.ts (行 86)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 163) 与 hooks\useRoomChat.ts (行 87)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 164) 与 hooks\useRoomChat.ts (行 88)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 165) 与 hooks\useRoomChat.ts (行 89)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 166) 与 hooks\useRoomChat.ts (行 90)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 167) 与 hooks\useRoomChat.ts (行 91)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 168) 与 hooks\useRoomChat.ts (行 92)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 169) 与 hooks\useRoomChat.ts (行 93)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 169) 与 hooks\useRoomChat.ts (行 94)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 171) 与 hooks\useRoomChat.ts (行 95)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 172) 与 hooks\useRoomChat.ts (行 96)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 173) 与 hooks\useRoomChat.ts (行 97)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 174) 与 hooks\useRoomChat.ts (行 98)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 175) 与 hooks\useRoomChat.ts (行 99)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 176) 与 hooks\useRoomChat.ts (行 100)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 177) 与 hooks\useRoomChat.ts (行 101)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 178) 与 hooks\useRoomChat.ts (行 102)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 179) 与 hooks\useRoomChat.ts (行 103)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 180) 与 hooks\useRoomChat.ts (行 104)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 181) 与 hooks\useRoomChat.ts (行 105)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 109) 与 hooks\useRoomChat.ts (行 106)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 110) 与 hooks\useRoomChat.ts (行 107)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 105) 与 hooks\useRoomChat.ts (行 108)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 106) 与 hooks\useRoomChat.ts (行 109)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 203) 与 hooks\useRoomChat.ts (行 117)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 204) 与 hooks\useRoomChat.ts (行 118)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 205) 与 hooks\useRoomChat.ts (行 119)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 206) 与 hooks\useRoomChat.ts (行 120)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 207) 与 hooks\useRoomChat.ts (行 121)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 208) 与 hooks\useRoomChat.ts (行 122)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 209) 与 hooks\useRoomChat.ts (行 123)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 210) 与 hooks\useRoomChat.ts (行 124)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 211) 与 hooks\useRoomChat.ts (行 125)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 212) 与 hooks\useRoomChat.ts (行 126)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 228) 与 hooks\useRoomChat.ts (行 139)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 229) 与 hooks\useRoomChat.ts (行 140)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 230) 与 hooks\useRoomChat.ts (行 141)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 231) 与 hooks\useRoomChat.ts (行 142)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 232) 与 hooks\useRoomChat.ts (行 143)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 233) 与 hooks\useRoomChat.ts (行 144)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 234) 与 hooks\useRoomChat.ts (行 145)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 334) 与 hooks\useRoomChat.ts (行 147)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 241) 与 hooks\useRoomChat.ts (行 151)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 242) 与 hooks\useRoomChat.ts (行 152)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 243) 与 hooks\useRoomChat.ts (行 153)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 244) 与 hooks\useRoomChat.ts (行 154)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 245) 与 hooks\useRoomChat.ts (行 155)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 246) 与 hooks\useRoomChat.ts (行 156)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 247) 与 hooks\useRoomChat.ts (行 157)
  - 相似度: 100.0%

- hooks\useRoomCleanup.ts (行 20) 与 hooks\useRoomCleanup.ts (行 21)
  - 相似度: 100.0%

- hooks\useRoomRealtime.ts (行 11) 与 hooks\useRoomRealtime.ts (行 12)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 107) 与 hooks\useRoomRealtime.ts (行 40)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 108) 与 hooks\useRoomRealtime.ts (行 41)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 109) 与 hooks\useRoomRealtime.ts (行 42)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 110) 与 hooks\useRoomRealtime.ts (行 43)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 105) 与 hooks\useRoomRealtime.ts (行 44)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 106) 与 hooks\useRoomRealtime.ts (行 45)
  - 相似度: 100.0%

- hooks\useRoomRealtime.ts (行 53) 与 hooks\useRoomRealtime.ts (行 54)
  - 相似度: 100.0%

- hooks\useRoomRealtime.ts (行 71) 与 hooks\useRoomRealtime.ts (行 72)
  - 相似度: 100.0%

- hooks\useRoomTransition.ts (行 19) 与 hooks\useRoomTransition.ts (行 20)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 34) 与 hooks\useSkillEffectAutoProcessor.ts (行 35)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 88) 与 hooks\useSkillEffectAutoProcessor.ts (行 89)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 121) 与 hooks\useSkillEffectAutoProcessor.ts (行 122)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 148) 与 hooks\useSkillEffectAutoProcessor.ts (行 149)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 207) 与 hooks\useSkillEffectAutoProcessor.ts (行 208)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 46) 与 hooks\useSkillEffectProcessor.ts (行 47)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 52) 与 hooks\useSkillEffectProcessor.ts (行 53)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 58) 与 hooks\useSkillEffectProcessor.ts (行 59)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 47) 与 hooks\useSkillEffectProcessor.ts (行 64)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 48) 与 hooks\useSkillEffectProcessor.ts (行 65)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 49) 与 hooks\useSkillEffectProcessor.ts (行 66)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 50) 与 hooks\useSkillEffectProcessor.ts (行 67)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 51) 与 hooks\useSkillEffectProcessor.ts (行 68)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 52) 与 hooks\useSkillEffectProcessor.ts (行 69)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 53) 与 hooks\useSkillEffectProcessor.ts (行 70)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 54) 与 hooks\useSkillEffectProcessor.ts (行 71)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 55) 与 hooks\useSkillEffectProcessor.ts (行 72)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 83) 与 hooks\useSkillEffectProcessor.ts (行 100)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 84) 与 hooks\useSkillEffectProcessor.ts (行 101)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 85) 与 hooks\useSkillEffectProcessor.ts (行 102)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 86) 与 hooks\useSkillEffectProcessor.ts (行 103)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 100) 与 hooks\useSkillEffectProcessor.ts (行 118)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 101) 与 hooks\useSkillEffectProcessor.ts (行 119)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 121) 与 hooks\useSkillEffectProcessor.ts (行 122)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 110) 与 hooks\useSkillEffectProcessor.ts (行 127)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 132) 与 hooks\useSkillEffectProcessor.ts (行 151)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 133) 与 hooks\useSkillEffectProcessor.ts (行 152)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 134) 与 hooks\useSkillEffectProcessor.ts (行 153)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 135) 与 hooks\useSkillEffectProcessor.ts (行 154)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 136) 与 hooks\useSkillEffectProcessor.ts (行 155)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 137) 与 hooks\useSkillEffectProcessor.ts (行 156)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 138) 与 hooks\useSkillEffectProcessor.ts (行 157)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 139) 与 hooks\useSkillEffectProcessor.ts (行 158)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 140) 与 hooks\useSkillEffectProcessor.ts (行 159)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 141) 与 hooks\useSkillEffectProcessor.ts (行 160)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 167) 与 hooks\useSkillEffectProcessor.ts (行 168)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 173) 与 hooks\useSkillEffectProcessor.ts (行 174)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 188) 与 hooks\useSkillEffectProcessor.ts (行 189)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 173) 与 hooks\useSkillEffectProcessor.ts (行 194)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 174) 与 hooks\useSkillEffectProcessor.ts (行 195)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 181) 与 hooks\useSkillEffectProcessor.ts (行 202)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 182) 与 hooks\useSkillEffectProcessor.ts (行 203)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 183) 与 hooks\useSkillEffectProcessor.ts (行 204)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 184) 与 hooks\useSkillEffectProcessor.ts (行 205)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 185) 与 hooks\useSkillEffectProcessor.ts (行 206)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 186) 与 hooks\useSkillEffectProcessor.ts (行 207)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 217) 与 hooks\useSkillEffectProcessor.ts (行 218)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 211) 与 hooks\useSkillEffectProcessor.ts (行 221)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 218) 与 hooks\useSkillEffectProcessor.ts (行 228)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 219) 与 hooks\useSkillEffectProcessor.ts (行 229)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 220) 与 hooks\useSkillEffectProcessor.ts (行 230)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 221) 与 hooks\useSkillEffectProcessor.ts (行 231)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 222) 与 hooks\useSkillEffectProcessor.ts (行 232)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 223) 与 hooks\useSkillEffectProcessor.ts (行 233)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 224) 与 hooks\useSkillEffectProcessor.ts (行 234)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 225) 与 hooks\useSkillEffectProcessor.ts (行 235)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 237) 与 hooks\useSkillEffectProcessor.ts (行 238)
  - 相似度: 100.0%

- hooks\useToast.ts (行 51) 与 hooks\useToast.ts (行 52)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 59) 与 hooks\useUnifiedErrorHandling.ts (行 60)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 65) 与 hooks\useUnifiedErrorHandling.ts (行 66)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 71) 与 hooks\useUnifiedErrorHandling.ts (行 72)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 103) 与 hooks\useUnifiedErrorHandling.ts (行 104)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 201) 与 hooks\useUnifiedErrorHandling.ts (行 202)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 320) 与 hooks\useUnifiedErrorHandling.ts (行 321)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 326) 与 hooks\useUnifiedErrorHandling.ts (行 327)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 332) 与 hooks\useUnifiedErrorHandling.ts (行 333)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 359) 与 hooks\useUnifiedErrorHandling.ts (行 360)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 362) 与 hooks\useUnifiedErrorHandling.ts (行 363)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 405) 与 hooks\useUnifiedErrorHandling.ts (行 406)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 423) 与 hooks\useUnifiedErrorHandling.ts (行 424)
  - 相似度: 100.0%

- hooks\useUXOptimization.ts (行 101) 与 hooks\useUXOptimization.ts (行 102)
  - 相似度: 100.0%

- hooks\useUXOptimization.ts (行 104) 与 hooks\useUXOptimization.ts (行 105)
  - 相似度: 100.0%

- hooks\useUXOptimization.ts (行 114) 与 hooks\useUXOptimization.ts (行 115)
  - 相似度: 100.0%

- hooks\useUXOptimization.ts (行 222) 与 hooks\useUXOptimization.ts (行 223)
  - 相似度: 100.0%

- hooks\useUXOptimization.ts (行 253) 与 hooks\useUXOptimization.ts (行 254)
  - 相似度: 100.0%

- hooks\useUXOptimization.ts (行 259) 与 hooks\useUXOptimization.ts (行 260)
  - 相似度: 100.0%

- hooks\useUXOptimization.ts (行 265) 与 hooks\useUXOptimization.ts (行 266)
  - 相似度: 100.0%

- hooks\useVoteResults.ts (行 66) 与 hooks\useVoteResults.ts (行 67)
  - 相似度: 100.0%

- hooks\useVoteResults.ts (行 88) 与 hooks\useVoteResults.ts (行 89)
  - 相似度: 100.0%

- hooks\useVoteResults.ts (行 147) 与 hooks\useVoteResults.ts (行 158)
  - 相似度: 100.0%

- hooks\useVoteResults.ts (行 148) 与 hooks\useVoteResults.ts (行 159)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 133) 与 hooks\useVotingSystem.ts (行 134)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 158) 与 hooks\useVotingSystem.ts (行 159)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 192) 与 hooks\useVotingSystem.ts (行 193)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 308) 与 hooks\useVotingSystem.ts (行 309)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 376) 与 hooks\useVotingSystem.ts (行 377)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 368) 与 hooks\useVotingSystem.ts (行 397)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 369) 与 hooks\useVotingSystem.ts (行 398)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 370) 与 hooks\useVotingSystem.ts (行 399)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 371) 与 hooks\useVotingSystem.ts (行 400)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 368) 与 hooks\useVotingSystem.ts (行 423)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 369) 与 hooks\useVotingSystem.ts (行 424)
  - 相似度: 100.0%

- components\voting\VotingPanel.tsx (行 102) 与 hooks\useVotingSystem.ts (行 595)
  - 相似度: 100.0%

- components\voting\VotingPanel.tsx (行 103) 与 hooks\useVotingSystem.ts (行 596)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 51) 与 hooks\useWitchPotionManager.ts (行 52)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 98) 与 hooks\useWitchPotionManager.ts (行 161)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 99) 与 hooks\useWitchPotionManager.ts (行 162)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 100) 与 hooks\useWitchPotionManager.ts (行 163)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 101) 与 hooks\useWitchPotionManager.ts (行 164)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 102) 与 hooks\useWitchPotionManager.ts (行 165)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 103) 与 hooks\useWitchPotionManager.ts (行 166)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 104) 与 hooks\useWitchPotionManager.ts (行 167)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 118) 与 hooks\useWitchPotionManager.ts (行 181)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 119) 与 hooks\useWitchPotionManager.ts (行 182)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 127) 与 hooks\useWitchPotionManager.ts (行 190)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 128) 与 hooks\useWitchPotionManager.ts (行 191)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 137) 与 hooks\useWitchPotionManager.ts (行 200)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 138) 与 hooks\useWitchPotionManager.ts (行 201)
  - 相似度: 100.0%

- hooks\skill\useSkillRealtime.ts (行 26) 与 hooks\useWitchPotionManager.ts (行 221)
  - 相似度: 100.0%

- hooks\skill\useSkillRealtime.ts (行 27) 与 hooks\useWitchPotionManager.ts (行 222)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 109) 与 hooks\useWitchPotionManager.ts (行 231)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 110) 与 hooks\useWitchPotionManager.ts (行 232)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 64) 与 integrations\supabase\types.ts (行 149)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 65) 与 integrations\supabase\types.ts (行 150)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 169) 与 integrations\supabase\types.ts (行 180)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 170) 与 integrations\supabase\types.ts (行 181)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 218) 与 integrations\supabase\types.ts (行 234)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 219) 与 integrations\supabase\types.ts (行 235)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 220) 与 integrations\supabase\types.ts (行 236)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 221) 与 integrations\supabase\types.ts (行 237)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 222) 与 integrations\supabase\types.ts (行 238)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 193) 与 integrations\supabase\types.ts (行 252)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 194) 与 integrations\supabase\types.ts (行 253)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 272) 与 integrations\supabase\types.ts (行 283)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 273) 与 integrations\supabase\types.ts (行 284)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 274) 与 integrations\supabase\types.ts (行 285)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 275) 与 integrations\supabase\types.ts (行 286)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 276) 与 integrations\supabase\types.ts (行 287)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 303) 与 integrations\supabase\types.ts (行 341)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 304) 与 integrations\supabase\types.ts (行 342)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 356) 与 integrations\supabase\types.ts (行 369)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 422) 与 integrations\supabase\types.ts (行 437)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 423) 与 integrations\supabase\types.ts (行 438)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 549) 与 integrations\supabase\types.ts (行 561)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 550) 与 integrations\supabase\types.ts (行 562)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 551) 与 integrations\supabase\types.ts (行 563)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 552) 与 integrations\supabase\types.ts (行 564)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 553) 与 integrations\supabase\types.ts (行 565)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 554) 与 integrations\supabase\types.ts (行 566)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 296) 与 integrations\supabase\types.ts (行 582)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 614) 与 integrations\supabase\types.ts (行 623)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 615) 与 integrations\supabase\types.ts (行 624)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 616) 与 integrations\supabase\types.ts (行 625)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 64) 与 integrations\supabase\types.ts (行 634)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 65) 与 integrations\supabase\types.ts (行 635)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 64) 与 integrations\supabase\types.ts (行 673)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 65) 与 integrations\supabase\types.ts (行 674)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 694) 与 integrations\supabase\types.ts (行 706)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 695) 与 integrations\supabase\types.ts (行 707)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 696) 与 integrations\supabase\types.ts (行 708)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 65) 与 integrations\supabase\types.ts (行 728)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 521) 与 integrations\supabase\types.ts (行 771)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 521) 与 integrations\supabase\types.ts (行 840)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 521) 与 integrations\supabase\types.ts (行 847)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 296) 与 integrations\supabase\types.ts (行 854)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 779) 与 integrations\supabase\types.ts (行 869)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 105) 与 integrations\supabase\types.ts (行 933)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 106) 与 integrations\supabase\types.ts (行 934)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 957) 与 integrations\supabase\types.ts (行 972)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 958) 与 integrations\supabase\types.ts (行 973)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 959) 与 integrations\supabase\types.ts (行 974)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 868) 与 integrations\supabase\types.ts (行 996)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 779) 与 integrations\supabase\types.ts (行 997)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 64) 与 integrations\supabase\types.ts (行 1028)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 65) 与 integrations\supabase\types.ts (行 1029)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1121) 与 integrations\supabase\types.ts (行 1131)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1166) 与 integrations\supabase\types.ts (行 1180)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1167) 与 integrations\supabase\types.ts (行 1181)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1168) 与 integrations\supabase\types.ts (行 1182)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1169) 与 integrations\supabase\types.ts (行 1183)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1170) 与 integrations\supabase\types.ts (行 1184)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1171) 与 integrations\supabase\types.ts (行 1185)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1143) 与 integrations\supabase\types.ts (行 1196)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1144) 与 integrations\supabase\types.ts (行 1197)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1388) 与 integrations\supabase\types.ts (行 1396)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1388) 与 integrations\supabase\types.ts (行 1404)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1540) 与 integrations\supabase\types.ts (行 1553)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1541) 与 integrations\supabase\types.ts (行 1554)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1542) 与 integrations\supabase\types.ts (行 1555)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1626) 与 integrations\supabase\types.ts (行 1651)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1627) 与 integrations\supabase\types.ts (行 1652)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1628) 与 integrations\supabase\types.ts (行 1653)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1629) 与 integrations\supabase\types.ts (行 1654)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1630) 与 integrations\supabase\types.ts (行 1655)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1631) 与 integrations\supabase\types.ts (行 1656)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1632) 与 integrations\supabase\types.ts (行 1657)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1708) 与 integrations\supabase\types.ts (行 1709)
  - 相似度: 100.0%

- lib\debugUtils.ts (行 78) 与 lib\debugUtils.ts (行 90)
  - 相似度: 100.0%

- lib\debugUtils.ts (行 79) 与 lib\debugUtils.ts (行 91)
  - 相似度: 100.0%

- lib\errorBoundary.tsx (行 8) 与 lib\errorBoundary.tsx (行 9)
  - 相似度: 100.0%

- lib\errorBoundary.tsx (行 14) 与 lib\errorBoundary.tsx (行 15)
  - 相似度: 100.0%

- lib\errorBoundary.tsx (行 20) 与 lib\errorBoundary.tsx (行 21)
  - 相似度: 100.0%

- lib\errorBoundary.tsx (行 33) 与 lib\errorBoundary.tsx (行 34)
  - 相似度: 100.0%

- lib\errorBoundary.tsx (行 46) 与 lib\errorBoundary.tsx (行 47)
  - 相似度: 100.0%

- lib\errorBoundary.tsx (行 114) 与 lib\errorBoundary.tsx (行 115)
  - 相似度: 100.0%

- lib\performanceReporter.ts (行 96) 与 lib\performanceReporter.ts (行 97)
  - 相似度: 100.0%

- lib\performanceReporter.ts (行 111) 与 lib\performanceReporter.ts (行 112)
  - 相似度: 100.0%

- lib\performanceReporter.ts (行 220) 与 lib\performanceReporter.ts (行 221)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 306) 与 middleware\apiSecurityMiddleware.ts (行 307)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 309) 与 middleware\apiSecurityMiddleware.ts (行 310)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 312) 与 middleware\apiSecurityMiddleware.ts (行 313)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 328) 与 middleware\apiSecurityMiddleware.ts (行 329)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 331) 与 middleware\apiSecurityMiddleware.ts (行 332)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 400) 与 middleware\apiSecurityMiddleware.ts (行 401)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 406) 与 middleware\apiSecurityMiddleware.ts (行 407)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 425) 与 middleware\apiSecurityMiddleware.ts (行 426)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 431) 与 middleware\apiSecurityMiddleware.ts (行 432)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 495) 与 middleware\apiSecurityMiddleware.ts (行 496)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 513) 与 middleware\apiSecurityMiddleware.ts (行 514)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 537) 与 middleware\apiSecurityMiddleware.ts (行 538)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 574) 与 middleware\apiSecurityMiddleware.ts (行 575)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 619) 与 middleware\apiSecurityMiddleware.ts (行 620)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 633) 与 middleware\apiSecurityMiddleware.ts (行 634)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 494) 与 middleware\apiSecurityMiddleware.ts (行 645)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 495) 与 middleware\apiSecurityMiddleware.ts (行 646)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 495) 与 middleware\apiSecurityMiddleware.ts (行 647)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 497) 与 middleware\apiSecurityMiddleware.ts (行 648)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 666) 与 middleware\apiSecurityMiddleware.ts (行 667)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 666) 与 middleware\apiSecurityMiddleware.ts (行 679)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 666) 与 middleware\apiSecurityMiddleware.ts (行 680)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 666) 与 middleware\apiSecurityMiddleware.ts (行 692)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 666) 与 middleware\apiSecurityMiddleware.ts (行 693)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 729) 与 middleware\apiSecurityMiddleware.ts (行 730)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 831) 与 middleware\apiSecurityMiddleware.ts (行 832)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 853) 与 middleware\apiSecurityMiddleware.ts (行 854)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 852) 与 middleware\apiSecurityMiddleware.ts (行 881)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 853) 与 middleware\apiSecurityMiddleware.ts (行 882)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 853) 与 middleware\apiSecurityMiddleware.ts (行 883)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 855) 与 middleware\apiSecurityMiddleware.ts (行 884)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 856) 与 middleware\apiSecurityMiddleware.ts (行 885)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 863) 与 middleware\apiSecurityMiddleware.ts (行 892)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 855) 与 middleware\apiSecurityMiddleware.ts (行 913)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 856) 与 middleware\apiSecurityMiddleware.ts (行 914)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 863) 与 middleware\apiSecurityMiddleware.ts (行 921)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 976) 与 middleware\apiSecurityMiddleware.ts (行 977)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 976) 与 middleware\apiSecurityMiddleware.ts (行 994)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 976) 与 middleware\apiSecurityMiddleware.ts (行 995)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 978) 与 middleware\apiSecurityMiddleware.ts (行 996)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 979) 与 middleware\apiSecurityMiddleware.ts (行 997)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 980) 与 middleware\apiSecurityMiddleware.ts (行 998)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 981) 与 middleware\apiSecurityMiddleware.ts (行 999)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 1015) 与 middleware\apiSecurityMiddleware.ts (行 1016)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 1030) 与 middleware\apiSecurityMiddleware.ts (行 1031)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 1036) 与 middleware\apiSecurityMiddleware.ts (行 1037)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 1075) 与 middleware\apiSecurityMiddleware.ts (行 1076)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 242) 与 middleware\permissionMiddleware.ts (行 243)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 306) 与 middleware\permissionMiddleware.ts (行 327)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 306) 与 middleware\permissionMiddleware.ts (行 351)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 306) 与 middleware\permissionMiddleware.ts (行 369)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 306) 与 middleware\permissionMiddleware.ts (行 384)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 494) 与 middleware\permissionMiddleware.ts (行 495)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 560) 与 middleware\permissionMiddleware.ts (行 561)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 602) 与 middleware\permissionMiddleware.ts (行 603)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 652) 与 middleware\permissionMiddleware.ts (行 684)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 934) 与 middleware\permissionMiddleware.ts (行 935)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 951) 与 middleware\permissionMiddleware.ts (行 952)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 997) 与 middleware\permissionMiddleware.ts (行 998)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 23) 与 pages\GameLobby.tsx (行 12)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 24) 与 pages\GameLobby.tsx (行 13)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 25) 与 pages\GameLobby.tsx (行 14)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 30) 与 pages\GameLobby.tsx (行 24)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 31) 与 pages\GameLobby.tsx (行 25)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 32) 与 pages\GameLobby.tsx (行 26)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 33) 与 pages\GameLobby.tsx (行 27)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 34) 与 pages\GameLobby.tsx (行 28)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 35) 与 pages\GameLobby.tsx (行 29)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 36) 与 pages\GameLobby.tsx (行 30)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 37) 与 pages\GameLobby.tsx (行 31)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 38) 与 pages\GameLobby.tsx (行 32)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 39) 与 pages\GameLobby.tsx (行 33)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 49) 与 pages\GameLobby.tsx (行 50)
  - 相似度: 100.0%

- hooks\useRoomRealtime.ts (行 21) 与 pages\GameLobby.tsx (行 119)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 150) 与 pages\GameLobby.tsx (行 151)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 179) 与 pages\GameLobby.tsx (行 180)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 206) 与 pages\GameLobby.tsx (行 207)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 246) 与 pages\GameLobby.tsx (行 247)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 286) 与 pages\GameLobby.tsx (行 377)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 287) 与 pages\GameLobby.tsx (行 378)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 288) 与 pages\GameLobby.tsx (行 379)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 289) 与 pages\GameLobby.tsx (行 380)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 290) 与 pages\GameLobby.tsx (行 381)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 291) 与 pages\GameLobby.tsx (行 382)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 292) 与 pages\GameLobby.tsx (行 383)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 293) 与 pages\GameLobby.tsx (行 384)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 294) 与 pages\GameLobby.tsx (行 385)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 295) 与 pages\GameLobby.tsx (行 386)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 296) 与 pages\GameLobby.tsx (行 387)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 297) 与 pages\GameLobby.tsx (行 388)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 298) 与 pages\GameLobby.tsx (行 389)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 299) 与 pages\GameLobby.tsx (行 390)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 313) 与 pages\GameLobby.tsx (行 404)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 314) 与 pages\GameLobby.tsx (行 405)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 321) 与 pages\GameLobby.tsx (行 412)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 322) 与 pages\GameLobby.tsx (行 413)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 323) 与 pages\GameLobby.tsx (行 414)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 324) 与 pages\GameLobby.tsx (行 415)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 325) 与 pages\GameLobby.tsx (行 416)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 326) 与 pages\GameLobby.tsx (行 417)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 327) 与 pages\GameLobby.tsx (行 418)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 328) 与 pages\GameLobby.tsx (行 419)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 329) 与 pages\GameLobby.tsx (行 420)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 336) 与 pages\GameLobby.tsx (行 427)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 337) 与 pages\GameLobby.tsx (行 428)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 338) 与 pages\GameLobby.tsx (行 429)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 339) 与 pages\GameLobby.tsx (行 430)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 340) 与 pages\GameLobby.tsx (行 431)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 341) 与 pages\GameLobby.tsx (行 432)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 342) 与 pages\GameLobby.tsx (行 433)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 343) 与 pages\GameLobby.tsx (行 434)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 344) 与 pages\GameLobby.tsx (行 435)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 345) 与 pages\GameLobby.tsx (行 436)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 346) 与 pages\GameLobby.tsx (行 437)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 347) 与 pages\GameLobby.tsx (行 438)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 348) 与 pages\GameLobby.tsx (行 439)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 349) 与 pages\GameLobby.tsx (行 440)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 350) 与 pages\GameLobby.tsx (行 441)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 351) 与 pages\GameLobby.tsx (行 442)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 352) 与 pages\GameLobby.tsx (行 443)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 353) 与 pages\GameLobby.tsx (行 444)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 354) 与 pages\GameLobby.tsx (行 445)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 355) 与 pages\GameLobby.tsx (行 446)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 356) 与 pages\GameLobby.tsx (行 447)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 357) 与 pages\GameLobby.tsx (行 448)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 358) 与 pages\GameLobby.tsx (行 449)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 365) 与 pages\GameLobby.tsx (行 456)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 287) 与 pages\GameLobby.tsx (行 467)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 288) 与 pages\GameLobby.tsx (行 468)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 289) 与 pages\GameLobby.tsx (行 469)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 290) 与 pages\GameLobby.tsx (行 470)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 291) 与 pages\GameLobby.tsx (行 471)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 292) 与 pages\GameLobby.tsx (行 472)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 293) 与 pages\GameLobby.tsx (行 473)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 294) 与 pages\GameLobby.tsx (行 474)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 295) 与 pages\GameLobby.tsx (行 475)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 296) 与 pages\GameLobby.tsx (行 476)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 297) 与 pages\GameLobby.tsx (行 477)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 298) 与 pages\GameLobby.tsx (行 478)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 299) 与 pages\GameLobby.tsx (行 479)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 504) 与 pages\GameLobby.tsx (行 505)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 480) 与 pages\GameLobby.tsx (行 557)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 606) 与 pages\GamePage.tsx (行 104)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 606) 与 pages\GamePage.tsx (行 121)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 606) 与 pages\GamePage.tsx (行 135)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 606) 与 pages\GamePage.tsx (行 148)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 607) 与 pages\GamePage.tsx (行 149)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 608) 与 pages\GamePage.tsx (行 150)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 650) 与 pages\GamePage.tsx (行 258)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 651) 与 pages\GamePage.tsx (行 259)
  - 相似度: 100.0%

- pages\GameRoom.tsx (行 84) 与 pages\GameRoom.tsx (行 85)
  - 相似度: 100.0%

- pages\GameRoom.tsx (行 255) 与 pages\GameRoom.tsx (行 320)
  - 相似度: 100.0%

- pages\GameRoom.tsx (行 256) 与 pages\GameRoom.tsx (行 321)
  - 相似度: 100.0%

- pages\GameRoom.tsx (行 359) 与 pages\GameRoom.tsx (行 360)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 480) 与 pages\GameRoom.tsx (行 404)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 269) 与 pages\GameRoom.tsx (行 545)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 598) 与 pages\GameRoom.tsx (行 559)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 605) 与 pages\GameRoom.tsx (行 566)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 606) 与 pages\GameRoom.tsx (行 567)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 605) 与 pages\GameRoom.tsx (行 586)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 606) 与 pages\GameRoom.tsx (行 587)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 607) 与 pages\GameRoom.tsx (行 588)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 608) 与 pages\GameRoom.tsx (行 589)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 649) 与 pages\GameRoom.tsx (行 677)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 650) 与 pages\GameRoom.tsx (行 678)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 651) 与 pages\GameRoom.tsx (行 679)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 96) 与 pages\JudgePage.tsx (行 31)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 97) 与 pages\JudgePage.tsx (行 32)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 606) 与 pages\JudgePage.tsx (行 39)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 114) 与 pages\JudgePage.tsx (行 44)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 115) 与 pages\JudgePage.tsx (行 45)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 116) 与 pages\JudgePage.tsx (行 46)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 117) 与 pages\JudgePage.tsx (行 47)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 118) 与 pages\JudgePage.tsx (行 48)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 119) 与 pages\JudgePage.tsx (行 49)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 120) 与 pages\JudgePage.tsx (行 50)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 606) 与 pages\JudgePage.tsx (行 51)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 122) 与 pages\JudgePage.tsx (行 52)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 123) 与 pages\JudgePage.tsx (行 53)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 124) 与 pages\JudgePage.tsx (行 54)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 125) 与 pages\JudgePage.tsx (行 55)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 126) 与 pages\JudgePage.tsx (行 56)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 127) 与 pages\JudgePage.tsx (行 57)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 128) 与 pages\JudgePage.tsx (行 58)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 129) 与 pages\JudgePage.tsx (行 59)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 130) 与 pages\JudgePage.tsx (行 60)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 131) 与 pages\JudgePage.tsx (行 61)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 132) 与 pages\JudgePage.tsx (行 62)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 133) 与 pages\JudgePage.tsx (行 63)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 134) 与 pages\JudgePage.tsx (行 64)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 606) 与 pages\JudgePage.tsx (行 65)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 606) 与 pages\JudgePage.tsx (行 78)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 607) 与 pages\JudgePage.tsx (行 79)
  - 相似度: 100.0%

- providers\AuthProvider.tsx (行 61) 与 providers\AuthProvider.tsx (行 62)
  - 相似度: 100.0%

- services\analyticsService.ts (行 156) 与 services\analyticsService.ts (行 157)
  - 相似度: 100.0%

- services\analyticsService.ts (行 174) 与 services\analyticsService.ts (行 175)
  - 相似度: 100.0%

- services\analyticsService.ts (行 185) 与 services\analyticsService.ts (行 186)
  - 相似度: 100.0%

- services\analyticsService.ts (行 196) 与 services\analyticsService.ts (行 197)
  - 相似度: 100.0%

- services\analyticsService.ts (行 258) 与 services\analyticsService.ts (行 259)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 129) 与 services\automatedSecurityService.ts (行 130)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 132) 与 services\automatedSecurityService.ts (行 133)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 135) 与 services\automatedSecurityService.ts (行 136)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 138) 与 services\automatedSecurityService.ts (行 139)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 144) 与 services\automatedSecurityService.ts (行 145)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 150) 与 services\automatedSecurityService.ts (行 151)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 186) 与 services\automatedSecurityService.ts (行 187)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 155) 与 services\automatedSecurityService.ts (行 191)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 156) 与 services\automatedSecurityService.ts (行 192)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 212) 与 services\automatedSecurityService.ts (行 213)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 218) 与 services\automatedSecurityService.ts (行 219)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 211) 与 services\automatedSecurityService.ts (行 250)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 251) 与 services\automatedSecurityService.ts (行 252)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 254) 与 services\automatedSecurityService.ts (行 255)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 260) 与 services\automatedSecurityService.ts (行 261)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 220) 与 services\automatedSecurityService.ts (行 262)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 305) 与 services\automatedSecurityService.ts (行 306)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 230) 与 services\automatedSecurityService.ts (行 322)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 231) 与 services\automatedSecurityService.ts (行 323)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 337) 与 services\automatedSecurityService.ts (行 338)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 372) 与 services\automatedSecurityService.ts (行 373)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 375) 与 services\automatedSecurityService.ts (行 376)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 434) 与 services\automatedSecurityService.ts (行 435)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 437) 与 services\automatedSecurityService.ts (行 438)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 575) 与 services\automatedSecurityService.ts (行 576)
  - 相似度: 100.0%

- services\cacheService.ts (行 158) 与 services\cacheService.ts (行 159)
  - 相似度: 100.0%

- services\cacheService.ts (行 282) 与 services\cacheService.ts (行 283)
  - 相似度: 100.0%

- services\cacheService.ts (行 302) 与 services\cacheService.ts (行 303)
  - 相似度: 100.0%

- services\cacheService.ts (行 310) 与 services\cacheService.ts (行 311)
  - 相似度: 100.0%

- services\cacheService.ts (行 301) 与 services\cacheService.ts (行 356)
  - 相似度: 100.0%

- services\cacheService.ts (行 389) 与 services\cacheService.ts (行 390)
  - 相似度: 100.0%

- services\cacheService.ts (行 412) 与 services\cacheService.ts (行 413)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 756) 与 services\cacheService.ts (行 434)
  - 相似度: 100.0%

- services\cacheService.ts (行 498) 与 services\cacheService.ts (行 499)
  - 相似度: 100.0%

- services\cacheService.ts (行 504) 与 services\cacheService.ts (行 505)
  - 相似度: 100.0%

- services\cacheService.ts (行 522) 与 services\cacheService.ts (行 523)
  - 相似度: 100.0%

- services\cacheService.ts (行 550) 与 services\cacheService.ts (行 551)
  - 相似度: 100.0%

- services\cacheService.ts (行 556) 与 services\cacheService.ts (行 557)
  - 相似度: 100.0%

- services\cacheService.ts (行 506) 与 services\cacheService.ts (行 558)
  - 相似度: 100.0%

- services\cacheService.ts (行 507) 与 services\cacheService.ts (行 559)
  - 相似度: 100.0%

- services\cacheService.ts (行 514) 与 services\cacheService.ts (行 566)
  - 相似度: 100.0%

- services\cacheService.ts (行 515) 与 services\cacheService.ts (行 567)
  - 相似度: 100.0%

- services\cacheService.ts (行 516) 与 services\cacheService.ts (行 568)
  - 相似度: 100.0%

- services\cacheService.ts (行 517) 与 services\cacheService.ts (行 569)
  - 相似度: 100.0%

- services\cacheService.ts (行 637) 与 services\cacheService.ts (行 638)
  - 相似度: 100.0%

- services\cacheService.ts (行 636) 与 services\cacheService.ts (行 657)
  - 相似度: 100.0%

- services\cacheService.ts (行 637) 与 services\cacheService.ts (行 658)
  - 相似度: 100.0%

- services\cacheService.ts (行 637) 与 services\cacheService.ts (行 659)
  - 相似度: 100.0%

- services\cacheService.ts (行 776) 与 services\cacheService.ts (行 777)
  - 相似度: 100.0%

- services\cacheService.ts (行 835) 与 services\cacheService.ts (行 836)
  - 相似度: 100.0%

- services\cacheService.ts (行 838) 与 services\cacheService.ts (行 839)
  - 相似度: 100.0%

- services\cacheService.ts (行 841) 与 services\cacheService.ts (行 842)
  - 相似度: 100.0%

- services\cacheService.ts (行 844) 与 services\cacheService.ts (行 845)
  - 相似度: 100.0%

- services\cacheService.ts (行 847) 与 services\cacheService.ts (行 848)
  - 相似度: 100.0%

- services\cacheService.ts (行 888) 与 services\cacheService.ts (行 909)
  - 相似度: 100.0%

- services\cacheService.ts (行 889) 与 services\cacheService.ts (行 910)
  - 相似度: 100.0%

- services\cacheService.ts (行 890) 与 services\cacheService.ts (行 911)
  - 相似度: 100.0%

- services\cacheService.ts (行 1013) 与 services\cacheService.ts (行 1014)
  - 相似度: 100.0%

- services\cacheService.ts (行 1058) 与 services\cacheService.ts (行 1059)
  - 相似度: 100.0%

- services\configurationService.ts (行 118) 与 services\configurationService.ts (行 119)
  - 相似度: 100.0%

- services\configurationService.ts (行 536) 与 services\configurationService.ts (行 537)
  - 相似度: 100.0%

- services\configurationService.ts (行 542) 与 services\configurationService.ts (行 543)
  - 相似度: 100.0%

- services\configurationService.ts (行 563) 与 services\configurationService.ts (行 606)
  - 相似度: 100.0%

- services\configurationService.ts (行 721) 与 services\configurationService.ts (行 722)
  - 相似度: 100.0%

- services\configurationService.ts (行 840) 与 services\configurationService.ts (行 868)
  - 相似度: 100.0%

- services\configurationService.ts (行 840) 与 services\configurationService.ts (行 923)
  - 相似度: 100.0%

- services\configurationService.ts (行 755) 与 services\configurationService.ts (行 949)
  - 相似度: 100.0%

- services\configurationService.ts (行 756) 与 services\configurationService.ts (行 950)
  - 相似度: 100.0%

- services\configurationService.ts (行 769) 与 services\configurationService.ts (行 961)
  - 相似度: 100.0%

- services\configurationService.ts (行 974) 与 services\configurationService.ts (行 975)
  - 相似度: 100.0%

- services\configurationService.ts (行 756) 与 services\configurationService.ts (行 976)
  - 相似度: 100.0%

- services\configurationService.ts (行 989) 与 services\configurationService.ts (行 990)
  - 相似度: 100.0%

- services\configurationService.ts (行 1007) 与 services\configurationService.ts (行 1008)
  - 相似度: 100.0%

- services\configurationService.ts (行 992) 与 services\configurationService.ts (行 1010)
  - 相似度: 100.0%

- services\configurationService.ts (行 993) 与 services\configurationService.ts (行 1011)
  - 相似度: 100.0%

- services\configurationService.ts (行 994) 与 services\configurationService.ts (行 1012)
  - 相似度: 100.0%

- services\configurationService.ts (行 1053) 与 services\configurationService.ts (行 1054)
  - 相似度: 100.0%

- services\configurationService.ts (行 1125) 与 services\configurationService.ts (行 1126)
  - 相似度: 100.0%

- services\configurationService.ts (行 747) 与 services\configurationService.ts (行 1162)
  - 相似度: 100.0%

- services\configurationService.ts (行 748) 与 services\configurationService.ts (行 1163)
  - 相似度: 100.0%

- services\configurationService.ts (行 749) 与 services\configurationService.ts (行 1164)
  - 相似度: 100.0%

- services\configurationService.ts (行 750) 与 services\configurationService.ts (行 1165)
  - 相似度: 100.0%

- services\configurationService.ts (行 751) 与 services\configurationService.ts (行 1166)
  - 相似度: 100.0%

- services\configurationService.ts (行 752) 与 services\configurationService.ts (行 1167)
  - 相似度: 100.0%

- services\dyingStatusService.ts (行 7) 与 services\dyingStatusService.ts (行 8)
  - 相似度: 100.0%

- services\enhancedSkillService.ts (行 149) 与 services\enhancedSkillService.ts (行 158)
  - 相似度: 100.0%

- services\enhancedSkillService.ts (行 150) 与 services\enhancedSkillService.ts (行 159)
  - 相似度: 100.0%

- services\enhancedSkillService.ts (行 164) 与 services\enhancedSkillService.ts (行 165)
  - 相似度: 100.0%

- services\enhancedSkillService.ts (行 182) 与 services\enhancedSkillService.ts (行 183)
  - 相似度: 100.0%

- services\enhancedSkillService.ts (行 204) 与 services\enhancedSkillService.ts (行 205)
  - 相似度: 100.0%

- services\enhancedSkillService.ts (行 247) 与 services\enhancedSkillService.ts (行 248)
  - 相似度: 100.0%

- services\enhancedSkillService.ts (行 253) 与 services\enhancedSkillService.ts (行 254)
  - 相似度: 100.0%

- services\enhancedSkillService.ts (行 337) 与 services\enhancedSkillService.ts (行 364)
  - 相似度: 100.0%

- services\enhancedSkillService.ts (行 426) 与 services\enhancedSkillService.ts (行 427)
  - 相似度: 100.0%

- services\enhancedSkillService.ts (行 432) 与 services\enhancedSkillService.ts (行 433)
  - 相似度: 100.0%

- services\enhancedSkillService.ts (行 573) 与 services\enhancedSkillService.ts (行 574)
  - 相似度: 100.0%

- services\enhancedSkillService.ts (行 582) 与 services\enhancedSkillService.ts (行 604)
  - 相似度: 100.0%

- services\enhancedSkillService.ts (行 583) 与 services\enhancedSkillService.ts (行 605)
  - 相似度: 100.0%

- config\security.config.ts (行 14) 与 services\errorHandlingService.ts (行 36)
  - 相似度: 100.0%

- config\security.config.ts (行 15) 与 services\errorHandlingService.ts (行 37)
  - 相似度: 100.0%

- services\cacheService.ts (行 99) 与 services\errorHandlingService.ts (行 122)
  - 相似度: 100.0%

- services\cacheService.ts (行 100) 与 services\errorHandlingService.ts (行 123)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 227) 与 services\errorHandlingService.ts (行 248)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 228) 与 services\errorHandlingService.ts (行 249)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 229) 与 services\errorHandlingService.ts (行 250)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 230) 与 services\errorHandlingService.ts (行 251)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 271) 与 services\errorHandlingService.ts (行 320)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 272) 与 services\errorHandlingService.ts (行 321)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 458) 与 services\errorHandlingService.ts (行 459)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 484) 与 services\errorHandlingService.ts (行 668)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 707) 与 services\errorHandlingService.ts (行 708)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 795) 与 services\errorHandlingService.ts (行 796)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 886) 与 services\errorHandlingService.ts (行 887)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 934) 与 services\errorHandlingService.ts (行 935)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 959) 与 services\errorHandlingService.ts (行 960)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 148) 与 services\errorHandlingService.ts (行 998)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 13) 与 services\errorMonitoringService.ts (行 14)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 374) 与 services\errorMonitoringService.ts (行 375)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 398) 与 services\errorMonitoringService.ts (行 399)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 440) 与 services\errorMonitoringService.ts (行 441)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 454) 与 services\errorMonitoringService.ts (行 455)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 476) 与 services\errorMonitoringService.ts (行 477)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 440) 与 services\errorMonitoringService.ts (行 526)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 440) 与 services\errorMonitoringService.ts (行 527)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 529) 与 services\errorMonitoringService.ts (行 530)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 326) 与 services\errorMonitoringService.ts (行 570)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 327) 与 services\errorMonitoringService.ts (行 571)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 328) 与 services\errorMonitoringService.ts (行 572)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 329) 与 services\errorMonitoringService.ts (行 573)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 330) 与 services\errorMonitoringService.ts (行 574)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 331) 与 services\errorMonitoringService.ts (行 575)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 332) 与 services\errorMonitoringService.ts (行 576)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 333) 与 services\errorMonitoringService.ts (行 577)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 334) 与 services\errorMonitoringService.ts (行 578)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 335) 与 services\errorMonitoringService.ts (行 579)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 336) 与 services\errorMonitoringService.ts (行 580)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 337) 与 services\errorMonitoringService.ts (行 581)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 338) 与 services\errorMonitoringService.ts (行 582)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 339) 与 services\errorMonitoringService.ts (行 583)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 340) 与 services\errorMonitoringService.ts (行 584)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 341) 与 services\errorMonitoringService.ts (行 585)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 342) 与 services\errorMonitoringService.ts (行 586)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 343) 与 services\errorMonitoringService.ts (行 587)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 344) 与 services\errorMonitoringService.ts (行 588)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 345) 与 services\errorMonitoringService.ts (行 589)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 346) 与 services\errorMonitoringService.ts (行 590)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 347) 与 services\errorMonitoringService.ts (行 591)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 611) 与 services\errorMonitoringService.ts (行 612)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 206) 与 services\errorMonitoringService.ts (行 620)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 207) 与 services\errorMonitoringService.ts (行 621)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 768) 与 services\errorMonitoringService.ts (行 794)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 722) 与 services\errorMonitoringService.ts (行 831)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 841) 与 services\errorMonitoringService.ts (行 842)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 863) 与 services\errorMonitoringService.ts (行 864)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 896) 与 services\errorMonitoringService.ts (行 897)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 994) 与 services\errorMonitoringService.ts (行 1151)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 996) 与 services\errorMonitoringService.ts (行 1153)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 997) 与 services\errorMonitoringService.ts (行 1154)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 148) 与 services\errorMonitoringService.ts (行 1155)
  - 相似度: 100.0%

- services\gameService.ts (行 21) 与 services\gameService.ts (行 22)
  - 相似度: 100.0%

- services\gameService.ts (行 31) 与 services\gameService.ts (行 32)
  - 相似度: 100.0%

- services\gameService.ts (行 34) 与 services\gameService.ts (行 35)
  - 相似度: 100.0%

- services\gameService.ts (行 44) 与 services\gameService.ts (行 45)
  - 相似度: 100.0%

- services\gameService.ts (行 47) 与 services\gameService.ts (行 48)
  - 相似度: 100.0%

- services\gameService.ts (行 27) 与 services\gameService.ts (行 53)
  - 相似度: 100.0%

- services\gameService.ts (行 28) 与 services\gameService.ts (行 54)
  - 相似度: 100.0%

- services\gameService.ts (行 29) 与 services\gameService.ts (行 55)
  - 相似度: 100.0%

- services\gameService.ts (行 76) 与 services\gameService.ts (行 94)
  - 相似度: 100.0%

- services\gameService.ts (行 99) 与 services\gameService.ts (行 100)
  - 相似度: 100.0%

- services\gameService.ts (行 27) 与 services\gameService.ts (行 105)
  - 相似度: 100.0%

- services\gameService.ts (行 28) 与 services\gameService.ts (行 106)
  - 相似度: 100.0%

- services\index.ts (行 137) 与 services\index.ts (行 138)
  - 相似度: 100.0%

- lib\performanceReporter.ts (行 6) 与 services\monitoringService.ts (行 8)
  - 相似度: 100.0%

- lib\performanceReporter.ts (行 7) 与 services\monitoringService.ts (行 9)
  - 相似度: 100.0%

- services\monitoringService.ts (行 59) 与 services\monitoringService.ts (行 60)
  - 相似度: 100.0%

- services\monitoringService.ts (行 79) 与 services\monitoringService.ts (行 91)
  - 相似度: 100.0%

- services\monitoringService.ts (行 109) 与 services\monitoringService.ts (行 110)
  - 相似度: 100.0%

- services\monitoringService.ts (行 122) 与 services\monitoringService.ts (行 123)
  - 相似度: 100.0%

- services\monitoringService.ts (行 140) 与 services\monitoringService.ts (行 141)
  - 相似度: 100.0%

- services\monitoringService.ts (行 150) 与 services\monitoringService.ts (行 151)
  - 相似度: 100.0%

- services\passiveSkillService.ts (行 59) 与 services\passiveSkillService.ts (行 60)
  - 相似度: 100.0%

- services\passiveSkillService.ts (行 122) 与 services\passiveSkillService.ts (行 123)
  - 相似度: 100.0%

- services\performanceMonitoringService.ts (行 262) 与 services\performanceMonitoringService.ts (行 282)
  - 相似度: 100.0%

- services\performanceMonitoringService.ts (行 263) 与 services\performanceMonitoringService.ts (行 283)
  - 相似度: 100.0%

- services\performanceMonitoringService.ts (行 365) 与 services\performanceMonitoringService.ts (行 366)
  - 相似度: 100.0%

- services\performanceMonitoringService.ts (行 488) 与 services\performanceMonitoringService.ts (行 489)
  - 相似度: 100.0%

- services\performanceMonitoringService.ts (行 556) 与 services\performanceMonitoringService.ts (行 557)
  - 相似度: 100.0%

- services\performanceMonitoringService.ts (行 559) 与 services\performanceMonitoringService.ts (行 560)
  - 相似度: 100.0%

- services\performanceMonitoringService.ts (行 647) 与 services\performanceMonitoringService.ts (行 648)
  - 相似度: 100.0%

- services\performanceMonitoringService.ts (行 690) 与 services\performanceMonitoringService.ts (行 691)
  - 相似度: 100.0%

- services\performanceMonitoringService.ts (行 887) 与 services\performanceMonitoringService.ts (行 888)
  - 相似度: 100.0%

- services\roomService.ts (行 72) 与 services\roomService.ts (行 73)
  - 相似度: 100.0%

- services\roomService.ts (行 63) 与 services\roomService.ts (行 78)
  - 相似度: 100.0%

- services\roomService.ts (行 87) 与 services\roomService.ts (行 88)
  - 相似度: 100.0%

- services\roomService.ts (行 75) 与 services\roomService.ts (行 90)
  - 相似度: 100.0%

- services\roomService.ts (行 76) 与 services\roomService.ts (行 91)
  - 相似度: 100.0%

- services\roomService.ts (行 77) 与 services\roomService.ts (行 92)
  - 相似度: 100.0%

- services\roomService.ts (行 63) 与 services\roomService.ts (行 93)
  - 相似度: 100.0%

- services\roomService.ts (行 102) 与 services\roomService.ts (行 103)
  - 相似度: 100.0%

- services\roomService.ts (行 76) 与 services\roomService.ts (行 106)
  - 相似度: 100.0%

- services\roomService.ts (行 77) 与 services\roomService.ts (行 107)
  - 相似度: 100.0%

- services\roomService.ts (行 63) 与 services\roomService.ts (行 108)
  - 相似度: 100.0%

- services\roomService.ts (行 113) 与 services\roomService.ts (行 114)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 6) 与 services\securityAuditService.ts (行 7)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 27) 与 services\securityAuditService.ts (行 28)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 33) 与 services\securityAuditService.ts (行 34)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 44) 与 services\securityAuditService.ts (行 45)
  - 相似度: 100.0%

- config\security.config.ts (行 14) 与 services\securityAuditService.ts (行 55)
  - 相似度: 100.0%

- config\security.config.ts (行 15) 与 services\securityAuditService.ts (行 56)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 36) 与 services\securityAuditService.ts (行 59)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 210) 与 services\securityAuditService.ts (行 211)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 234) 与 services\securityAuditService.ts (行 235)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 237) 与 services\securityAuditService.ts (行 238)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 269) 与 services\securityAuditService.ts (行 270)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 328) 与 services\securityAuditService.ts (行 329)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 354) 与 services\securityAuditService.ts (行 355)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 422) 与 services\securityAuditService.ts (行 423)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 428) 与 services\securityAuditService.ts (行 429)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 434) 与 services\securityAuditService.ts (行 435)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 457) 与 services\securityAuditService.ts (行 458)
  - 相似度: 100.0%

- services\skillSystemService.ts (行 114) 与 services\skillSystemService.ts (行 115)
  - 相似度: 100.0%

- services\skillSystemService.ts (行 120) 与 services\skillSystemService.ts (行 121)
  - 相似度: 100.0%

- services\skillSystemService.ts (行 141) 与 services\skillSystemService.ts (行 142)
  - 相似度: 100.0%

- services\skillSystemService.ts (行 219) 与 services\skillSystemService.ts (行 220)
  - 相似度: 100.0%

- services\skillSystemService.ts (行 281) 与 services\skillSystemService.ts (行 282)
  - 相似度: 100.0%

- services\skillSystemService.ts (行 439) 与 services\skillSystemService.ts (行 440)
  - 相似度: 100.0%

- services\skillSystemService.ts (行 484) 与 services\skillSystemService.ts (行 485)
  - 相似度: 100.0%

- services\skillSystemService.ts (行 500) 与 services\skillSystemService.ts (行 501)
  - 相似度: 100.0%

- services\skillSystemService.ts (行 548) 与 services\skillSystemService.ts (行 549)
  - 相似度: 100.0%

- services\skillSystemService.ts (行 579) 与 services\skillSystemService.ts (行 580)
  - 相似度: 100.0%

- services\skillSystemService.ts (行 589) 与 services\skillSystemService.ts (行 590)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 21) 与 services\systemAnnouncementService.ts (行 21)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 22) 与 services\systemAnnouncementService.ts (行 22)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 23) 与 services\systemAnnouncementService.ts (行 23)
  - 相似度: 100.0%

- services\systemAnnouncementService.ts (行 59) 与 services\systemAnnouncementService.ts (行 76)
  - 相似度: 100.0%

- services\systemAnnouncementService.ts (行 60) 与 services\systemAnnouncementService.ts (行 77)
  - 相似度: 100.0%

- services\systemAnnouncementService.ts (行 61) 与 services\systemAnnouncementService.ts (行 78)
  - 相似度: 100.0%

- services\systemAnnouncementService.ts (行 62) 与 services\systemAnnouncementService.ts (行 79)
  - 相似度: 100.0%

- services\systemAnnouncementService.ts (行 132) 与 services\systemAnnouncementService.ts (行 161)
  - 相似度: 100.0%

- services\systemAnnouncementService.ts (行 133) 与 services\systemAnnouncementService.ts (行 162)
  - 相似度: 100.0%

- services\systemAnnouncementService.ts (行 134) 与 services\systemAnnouncementService.ts (行 163)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 246) 与 services\votingService.ts (行 39)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 247) 与 services\votingService.ts (行 40)
  - 相似度: 100.0%

- services\votingService.ts (行 65) 与 services\votingService.ts (行 78)
  - 相似度: 100.0%

- services\votingService.ts (行 66) 与 services\votingService.ts (行 79)
  - 相似度: 100.0%

- services\votingService.ts (行 65) 与 services\votingService.ts (行 91)
  - 相似度: 100.0%

- types\skill.types.ts (行 5) 与 types\skill.types.ts (行 6)
  - 相似度: 100.0%

- types\skill.types.ts (行 7) 与 types\skill.types.ts (行 8)
  - 相似度: 100.0%

- types\skill.types.ts (行 9) 与 types\skill.types.ts (行 10)
  - 相似度: 100.0%

- types\skill.types.ts (行 11) 与 types\skill.types.ts (行 12)
  - 相似度: 100.0%

- types\skill.types.ts (行 34) 与 types\skill.types.ts (行 35)
  - 相似度: 100.0%

- types\skill.types.ts (行 51) 与 types\skill.types.ts (行 52)
  - 相似度: 100.0%

- types\skill.types.ts (行 64) 与 types\skill.types.ts (行 65)
  - 相似度: 100.0%

- types\skill.types.ts (行 77) 与 types\skill.types.ts (行 78)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 91) 与 types\skillSystem.types.ts (行 265)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 92) 与 types\skillSystem.types.ts (行 266)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 195) 与 utils\advancedInputValidationSystem.ts (行 196)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 198) 与 utils\advancedInputValidationSystem.ts (行 199)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 285) 与 utils\advancedInputValidationSystem.ts (行 286)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 296) 与 utils\advancedInputValidationSystem.ts (行 297)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 398) 与 utils\advancedInputValidationSystem.ts (行 399)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 431) 与 utils\advancedInputValidationSystem.ts (行 432)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 455) 与 utils\advancedInputValidationSystem.ts (行 456)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 461) 与 utils\advancedInputValidationSystem.ts (行 462)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 467) 与 utils\advancedInputValidationSystem.ts (行 468)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 477) 与 utils\advancedInputValidationSystem.ts (行 478)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 617) 与 utils\advancedInputValidationSystem.ts (行 618)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 635) 与 utils\advancedInputValidationSystem.ts (行 636)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 651) 与 utils\advancedInputValidationSystem.ts (行 652)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 657) 与 utils\advancedInputValidationSystem.ts (行 658)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 663) 与 utils\advancedInputValidationSystem.ts (行 664)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 557) 与 utils\advancedInputValidationSystem.ts (行 668)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 737) 与 utils\advancedInputValidationSystem.ts (行 738)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 740) 与 utils\advancedInputValidationSystem.ts (行 741)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 743) 与 utils\advancedInputValidationSystem.ts (行 744)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 956) 与 utils\advancedInputValidationSystem.ts (行 957)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 962) 与 utils\advancedInputValidationSystem.ts (行 963)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 968) 与 utils\advancedInputValidationSystem.ts (行 969)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 974) 与 utils\advancedInputValidationSystem.ts (行 975)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1097) 与 utils\advancedInputValidationSystem.ts (行 1098)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1108) 与 utils\advancedInputValidationSystem.ts (行 1109)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1133) 与 utils\advancedInputValidationSystem.ts (行 1134)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1149) 与 utils\advancedInputValidationSystem.ts (行 1150)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1156) 与 utils\advancedInputValidationSystem.ts (行 1203)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1163) 与 utils\advancedInputValidationSystem.ts (行 1210)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1164) 与 utils\advancedInputValidationSystem.ts (行 1211)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1165) 与 utils\advancedInputValidationSystem.ts (行 1212)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1166) 与 utils\advancedInputValidationSystem.ts (行 1213)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1167) 与 utils\advancedInputValidationSystem.ts (行 1214)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 726) 与 utils\advancedInputValidationSystem.ts (行 1230)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 727) 与 utils\advancedInputValidationSystem.ts (行 1231)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 728) 与 utils\advancedInputValidationSystem.ts (行 1232)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 729) 与 utils\advancedInputValidationSystem.ts (行 1233)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1291) 与 utils\advancedInputValidationSystem.ts (行 1292)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 78) 与 utils\advancedRBACSystem.ts (行 79)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 121) 与 utils\advancedRBACSystem.ts (行 122)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 139) 与 utils\advancedRBACSystem.ts (行 140)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 145) 与 utils\advancedRBACSystem.ts (行 146)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 103) 与 utils\advancedRBACSystem.ts (行 155)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 169) 与 utils\advancedRBACSystem.ts (行 192)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 180) 与 utils\advancedRBACSystem.ts (行 203)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 181) 与 utils\advancedRBACSystem.ts (行 204)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 239) 与 utils\advancedRBACSystem.ts (行 240)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 169) 与 utils\advancedRBACSystem.ts (行 252)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 180) 与 utils\advancedRBACSystem.ts (行 263)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 181) 与 utils\advancedRBACSystem.ts (行 264)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 365) 与 utils\advancedRBACSystem.ts (行 366)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 371) 与 utils\advancedRBACSystem.ts (行 372)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 509) 与 utils\advancedRBACSystem.ts (行 510)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 570) 与 utils\advancedRBACSystem.ts (行 571)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 573) 与 utils\advancedRBACSystem.ts (行 574)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 576) 与 utils\advancedRBACSystem.ts (行 577)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 586) 与 utils\advancedRBACSystem.ts (行 587)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 621) 与 utils\advancedRBACSystem.ts (行 622)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 675) 与 utils\advancedRBACSystem.ts (行 676)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 702) 与 utils\advancedRBACSystem.ts (行 703)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 718) 与 utils\advancedRBACSystem.ts (行 719)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 741) 与 utils\advancedRBACSystem.ts (行 742)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 784) 与 utils\advancedRBACSystem.ts (行 785)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 804) 与 utils\advancedRBACSystem.ts (行 812)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 828) 与 utils\advancedRBACSystem.ts (行 829)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 861) 与 utils\advancedRBACSystem.ts (行 862)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 463) 与 utils\advancedRBACSystem.ts (行 889)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 315) 与 utils\advancedRBACSystem.ts (行 982)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 316) 与 utils\advancedRBACSystem.ts (行 983)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 317) 与 utils\advancedRBACSystem.ts (行 984)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 318) 与 utils\advancedRBACSystem.ts (行 985)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 319) 与 utils\advancedRBACSystem.ts (行 986)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 555) 与 utils\advancedRBACSystem.ts (行 1144)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1213) 与 utils\advancedRBACSystem.ts (行 1214)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1219) 与 utils\advancedRBACSystem.ts (行 1220)
  - 相似度: 100.0%

- config\security.config.ts (行 12) 与 utils\apiSecurityConfig.ts (行 28)
  - 相似度: 100.0%

- config\security.config.ts (行 13) 与 utils\apiSecurityConfig.ts (行 29)
  - 相似度: 100.0%

- config\security.config.ts (行 14) 与 utils\apiSecurityConfig.ts (行 30)
  - 相似度: 100.0%

- config\security.config.ts (行 15) 与 utils\apiSecurityConfig.ts (行 31)
  - 相似度: 100.0%

- services\configurationService.ts (行 1067) 与 utils\apiSecurityConfig.ts (行 566)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 616) 与 utils\apiSecurityConfig.ts (行 617)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 593) 与 utils\apiSecurityConfig.ts (行 620)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 593) 与 utils\apiSecurityConfig.ts (行 645)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 644) 与 utils\apiSecurityConfig.ts (行 670)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 704) 与 utils\apiSecurityConfig.ts (行 705)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 754) 与 utils\apiSecurityConfig.ts (行 755)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 785) 与 utils\apiSecurityConfig.ts (行 786)
  - 相似度: 100.0%

- services\configurationService.ts (行 756) 与 utils\apiSecurityConfig.ts (行 790)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 820) 与 utils\apiSecurityConfig.ts (行 851)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 898) 与 utils\apiSecurityConfig.ts (行 899)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 915) 与 utils\apiSecurityConfig.ts (行 916)
  - 相似度: 100.0%

- services\cacheService.ts (行 1202) 与 utils\apiSecurityConfig.ts (行 940)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 484) 与 utils\apiSecurityConfig.ts (行 976)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 998) 与 utils\apiSecurityConfig.ts (行 1103)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 737) 与 utils\apiSecurityConfig.ts (行 1131)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 738) 与 utils\apiSecurityConfig.ts (行 1132)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 13) 与 utils\automatedSecurityChecker.ts (行 14)
  - 相似度: 100.0%

- services\automatedSecurityService.ts (行 36) 与 utils\automatedSecurityChecker.ts (行 146)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 116) 与 utils\automatedSecurityChecker.ts (行 168)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 117) 与 utils\automatedSecurityChecker.ts (行 169)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 322) 与 utils\automatedSecurityChecker.ts (行 323)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 328) 与 utils\automatedSecurityChecker.ts (行 329)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 353) 与 utils\automatedSecurityChecker.ts (行 354)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 363) 与 utils\automatedSecurityChecker.ts (行 364)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 366) 与 utils\automatedSecurityChecker.ts (行 367)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 392) 与 utils\automatedSecurityChecker.ts (行 393)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 509) 与 utils\automatedSecurityChecker.ts (行 570)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 509) 与 utils\automatedSecurityChecker.ts (行 622)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 509) 与 utils\automatedSecurityChecker.ts (行 678)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 509) 与 utils\automatedSecurityChecker.ts (行 730)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 509) 与 utils\automatedSecurityChecker.ts (行 782)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 509) 与 utils\automatedSecurityChecker.ts (行 834)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 509) 与 utils\automatedSecurityChecker.ts (行 886)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1114) 与 utils\automatedSecurityChecker.ts (行 1115)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1126) 与 utils\automatedSecurityChecker.ts (行 1127)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 670) 与 utils\automatedSecurityChecker.ts (行 1138)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1319) 与 utils\automatedSecurityChecker.ts (行 1320)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 247) 与 utils\automatedSecurityChecker.ts (行 1393)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 248) 与 utils\automatedSecurityChecker.ts (行 1394)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 249) 与 utils\automatedSecurityChecker.ts (行 1395)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 250) 与 utils\automatedSecurityChecker.ts (行 1396)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 251) 与 utils\automatedSecurityChecker.ts (行 1397)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 252) 与 utils\automatedSecurityChecker.ts (行 1398)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 253) 与 utils\automatedSecurityChecker.ts (行 1399)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 1188) 与 utils\automatedSecurityChecker.ts (行 1429)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 118) 与 utils\common\dataValidation.ts (行 265)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 264) 与 utils\common\dataValidation.ts (行 408)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 118) 与 utils\common\dataValidation.ts (行 409)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 264) 与 utils\common\dataValidation.ts (行 448)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 118) 与 utils\common\dataValidation.ts (行 449)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 6) 与 utils\common\errorHandling.ts (行 6)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 204) 与 utils\common\errorHandling.ts (行 205)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 259) 与 utils\common\errorHandling.ts (行 260)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 353) 与 utils\common\errorHandling.ts (行 354)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 416) 与 utils\common\errorHandling.ts (行 417)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 445) 与 utils\common\errorHandling.ts (行 446)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 451) 与 utils\common\errorHandling.ts (行 452)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 6) 与 utils\common\skillValidation.ts (行 6)
  - 相似度: 100.0%

- utils\common\skillValidation.ts (行 85) 与 utils\common\skillValidation.ts (行 86)
  - 相似度: 100.0%

- utils\common\skillValidation.ts (行 211) 与 utils\common\skillValidation.ts (行 212)
  - 相似度: 100.0%

- utils\common\skillValidation.ts (行 234) 与 utils\common\skillValidation.ts (行 235)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 264) 与 utils\common\skillValidation.ts (行 289)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 118) 与 utils\common\skillValidation.ts (行 290)
  - 相似度: 100.0%

- utils\common\skillValidation.ts (行 321) 与 utils\common\skillValidation.ts (行 322)
  - 相似度: 100.0%

- utils\common\skillValidation.ts (行 330) 与 utils\common\skillValidation.ts (行 331)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 116) 与 utils\common\skillValidation.ts (行 394)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 117) 与 utils\common\skillValidation.ts (行 395)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 118) 与 utils\common\skillValidation.ts (行 396)
  - 相似度: 100.0%

- utils\common\skillValidation.ts (行 463) 与 utils\common\skillValidation.ts (行 464)
  - 相似度: 100.0%

- utils\common\skillValidation.ts (行 495) 与 utils\common\skillValidation.ts (行 496)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 98) 与 utils\componentRenderOptimizer.ts (行 99)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 725) 与 utils\componentRenderOptimizer.ts (行 153)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 186) 与 utils\componentRenderOptimizer.ts (行 187)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 192) 与 utils\componentRenderOptimizer.ts (行 193)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 227) 与 utils\componentRenderOptimizer.ts (行 228)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 382) 与 utils\componentRenderOptimizer.ts (行 383)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 399) 与 utils\componentRenderOptimizer.ts (行 400)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 487) 与 utils\componentRenderOptimizer.ts (行 488)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 511) 与 utils\componentRenderOptimizer.ts (行 512)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 527) 与 utils\componentRenderOptimizer.ts (行 528)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 6) 与 utils\comprehensiveSecurityAudit.ts (行 7)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 166) 与 utils\comprehensiveSecurityAudit.ts (行 167)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 172) 与 utils\comprehensiveSecurityAudit.ts (行 173)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 222) 与 utils\comprehensiveSecurityAudit.ts (行 223)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 260) 与 utils\comprehensiveSecurityAudit.ts (行 261)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 304) 与 utils\comprehensiveSecurityAudit.ts (行 305)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 336) 与 utils\comprehensiveSecurityAudit.ts (行 529)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 336) 与 utils\comprehensiveSecurityAudit.ts (行 567)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 336) 与 utils\comprehensiveSecurityAudit.ts (行 648)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 336) 与 utils\comprehensiveSecurityAudit.ts (行 732)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 336) 与 utils\comprehensiveSecurityAudit.ts (行 849)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 336) 与 utils\comprehensiveSecurityAudit.ts (行 931)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 1003) 与 utils\comprehensiveSecurityAudit.ts (行 1054)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 1004) 与 utils\comprehensiveSecurityAudit.ts (行 1055)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 1084) 与 utils\comprehensiveSecurityAudit.ts (行 1085)
  - 相似度: 100.0%

- utils\consoleCleanup.ts (行 4) 与 utils\consoleCleanup.ts (行 5)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 366) 与 utils\enhancedInputValidation.ts (行 367)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 401) 与 utils\enhancedInputValidation.ts (行 402)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 404) 与 utils\enhancedInputValidation.ts (行 405)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1166) 与 utils\enhancedInputValidation.ts (行 462)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 491) 与 utils\enhancedInputValidation.ts (行 492)
  - 相似度: 100.0%

- services\configurationService.ts (行 563) 与 utils\enhancedInputValidation.ts (行 573)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 763) 与 utils\enhancedInputValidation.ts (行 778)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 764) 与 utils\enhancedInputValidation.ts (行 779)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 763) 与 utils\enhancedInputValidation.ts (行 793)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 764) 与 utils\enhancedInputValidation.ts (行 794)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 763) 与 utils\enhancedInputValidation.ts (行 808)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 764) 与 utils\enhancedInputValidation.ts (行 809)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 434) 与 utils\enhancedInputValidation.ts (行 847)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 869) 与 utils\enhancedInputValidation.ts (行 870)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 872) 与 utils\enhancedInputValidation.ts (行 873)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 875) 与 utils\enhancedInputValidation.ts (行 876)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 878) 与 utils\enhancedInputValidation.ts (行 879)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 881) 与 utils\enhancedInputValidation.ts (行 882)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 434) 与 utils\enhancedInputValidation.ts (行 900)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 925)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 938)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 939)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 951)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 952)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 978)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 979)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 991)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 992)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 1004)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 1005)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 953) 与 utils\enhancedInputValidation.ts (行 1006)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 954) 与 utils\enhancedInputValidation.ts (行 1007)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 955) 与 utils\enhancedInputValidation.ts (行 1008)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 956) 与 utils\enhancedInputValidation.ts (行 1009)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 1029)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 1030)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 1043)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 1044)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 953) 与 utils\enhancedInputValidation.ts (行 1045)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 954) 与 utils\enhancedInputValidation.ts (行 1046)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 955) 与 utils\enhancedInputValidation.ts (行 1047)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 956) 与 utils\enhancedInputValidation.ts (行 1048)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 1075)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 1076)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 890) 与 utils\enhancedInputValidation.ts (行 1095)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 1102)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 1103)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 953) 与 utils\enhancedInputValidation.ts (行 1104)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 954) 与 utils\enhancedInputValidation.ts (行 1105)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 955) 与 utils\enhancedInputValidation.ts (行 1106)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 956) 与 utils\enhancedInputValidation.ts (行 1107)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 1129)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 1130)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 1143)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 1144)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 1156)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 1157)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1090) 与 utils\enhancedInputValidation.ts (行 1172)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1090) 与 utils\enhancedInputValidation.ts (行 1188)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1173) 与 utils\enhancedInputValidation.ts (行 1189)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1174) 与 utils\enhancedInputValidation.ts (行 1190)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 956) 与 utils\enhancedInputValidation.ts (行 1194)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 1214)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 1215)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 1230)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 1231)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 1243)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 1244)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1193) 与 utils\enhancedInputValidation.ts (行 1274)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 956) 与 utils\enhancedInputValidation.ts (行 1275)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 897) 与 utils\enhancedInputValidation.ts (行 1295)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 926) 与 utils\enhancedInputValidation.ts (行 1296)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1313) 与 utils\enhancedInputValidation.ts (行 1350)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1314) 与 utils\enhancedInputValidation.ts (行 1351)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1315) 与 utils\enhancedInputValidation.ts (行 1352)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1316) 与 utils\enhancedInputValidation.ts (行 1353)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1273) 与 utils\enhancedInputValidation.ts (行 1355)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1193) 与 utils\enhancedInputValidation.ts (行 1356)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 956) 与 utils\enhancedInputValidation.ts (行 1357)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1376) 与 utils\enhancedInputValidation.ts (行 1377)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1379) 与 utils\enhancedInputValidation.ts (行 1380)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1602) 与 utils\enhancedInputValidation.ts (行 1603)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1608) 与 utils\enhancedInputValidation.ts (行 1609)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 18) 与 utils\enhancedPermissionSystem.ts (行 18)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 19) 与 utils\enhancedPermissionSystem.ts (行 19)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 20) 与 utils\enhancedPermissionSystem.ts (行 20)
  - 相似度: 100.0%

- services\configurationService.ts (行 563) 与 utils\enhancedPermissionSystem.ts (行 473)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 998) 与 utils\enhancedPermissionSystem.ts (行 497)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 541) 与 utils\enhancedPermissionSystem.ts (行 542)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 559) 与 utils\enhancedPermissionSystem.ts (行 560)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 565) 与 utils\enhancedPermissionSystem.ts (行 566)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 546) 与 utils\enhancedPermissionSystem.ts (行 570)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 547) 与 utils\enhancedPermissionSystem.ts (行 571)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 610) 与 utils\enhancedPermissionSystem.ts (行 611)
  - 相似度: 100.0%

- services\configurationService.ts (行 755) 与 utils\enhancedPermissionSystem.ts (行 622)
  - 相似度: 100.0%

- services\configurationService.ts (行 756) 与 utils\enhancedPermissionSystem.ts (行 623)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 701) 与 utils\enhancedPermissionSystem.ts (行 720)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 701) 与 utils\enhancedPermissionSystem.ts (行 739)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 821) 与 utils\enhancedPermissionSystem.ts (行 822)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 827) 与 utils\enhancedPermissionSystem.ts (行 828)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 856) 与 utils\enhancedPermissionSystem.ts (行 857)
  - 相似度: 100.0%

- services\configurationService.ts (行 621) 与 utils\enhancedPermissionSystem.ts (行 895)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 967) 与 utils\enhancedPermissionSystem.ts (行 968)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 1176) 与 utils\enhancedPermissionSystem.ts (行 993)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1619) 与 utils\enhancedPermissionSystem.ts (行 999)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1620) 与 utils\enhancedPermissionSystem.ts (行 1000)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1621) 与 utils\enhancedPermissionSystem.ts (行 1001)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1622) 与 utils\enhancedPermissionSystem.ts (行 1002)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1623) 与 utils\enhancedPermissionSystem.ts (行 1003)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1624) 与 utils\enhancedPermissionSystem.ts (行 1004)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1058) 与 utils\enhancedPermissionSystem.ts (行 1059)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1061) 与 utils\enhancedPermissionSystem.ts (行 1062)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1036) 与 utils\enhancedPermissionSystem.ts (行 1087)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1037) 与 utils\enhancedPermissionSystem.ts (行 1088)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1038) 与 utils\enhancedPermissionSystem.ts (行 1089)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1039) 与 utils\enhancedPermissionSystem.ts (行 1090)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1040) 与 utils\enhancedPermissionSystem.ts (行 1091)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1041) 与 utils\enhancedPermissionSystem.ts (行 1092)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1042) 与 utils\enhancedPermissionSystem.ts (行 1093)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1043) 与 utils\enhancedPermissionSystem.ts (行 1094)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1044) 与 utils\enhancedPermissionSystem.ts (行 1095)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1045) 与 utils\enhancedPermissionSystem.ts (行 1096)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1046) 与 utils\enhancedPermissionSystem.ts (行 1097)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1102) 与 utils\enhancedPermissionSystem.ts (行 1103)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1054) 与 utils\enhancedPermissionSystem.ts (行 1106)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1055) 与 utils\enhancedPermissionSystem.ts (行 1107)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1056) 与 utils\enhancedPermissionSystem.ts (行 1108)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1057) 与 utils\enhancedPermissionSystem.ts (行 1109)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1110) 与 utils\enhancedPermissionSystem.ts (行 1111)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1113) 与 utils\enhancedPermissionSystem.ts (行 1114)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1064) 与 utils\enhancedPermissionSystem.ts (行 1116)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1065) 与 utils\enhancedPermissionSystem.ts (行 1117)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 69) 与 utils\enhancedQueryCacheStrategy.ts (行 70)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 80) 与 utils\enhancedQueryCacheStrategy.ts (行 81)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 258) 与 utils\enhancedQueryCacheStrategy.ts (行 259)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 269) 与 utils\enhancedQueryCacheStrategy.ts (行 270)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 525) 与 utils\enhancedQueryCacheStrategy.ts (行 404)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 499) 与 utils\enhancedQueryCacheStrategy.ts (行 500)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 545) 与 utils\enhancedQueryCacheStrategy.ts (行 574)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 672) 与 utils\enhancedQueryCacheStrategy.ts (行 673)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 683) 与 utils\enhancedQueryCacheStrategy.ts (行 684)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 905) 与 utils\enhancedQueryCacheStrategy.ts (行 906)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 187) 与 utils\enhancedRealtimeManager.ts (行 188)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 255) 与 utils\enhancedRealtimeManager.ts (行 256)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 264) 与 utils\enhancedRealtimeManager.ts (行 265)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 283) 与 utils\enhancedRealtimeManager.ts (行 284)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 296) 与 utils\enhancedRealtimeManager.ts (行 297)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 347) 与 utils\enhancedRealtimeManager.ts (行 348)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 349) 与 utils\enhancedRealtimeManager.ts (行 350)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 355) 与 utils\enhancedRealtimeManager.ts (行 356)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 375) 与 utils\enhancedRealtimeManager.ts (行 376)
  - 相似度: 100.0%

- services\cacheService.ts (行 1202) 与 utils\enhancedRealtimeManager.ts (行 393)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 434) 与 utils\enhancedRealtimeManager.ts (行 435)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 472) 与 utils\enhancedRealtimeManager.ts (行 473)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 474) 与 utils\enhancedRealtimeManager.ts (行 475)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 355) 与 utils\enhancedRealtimeManager.ts (行 480)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 355) 与 utils\enhancedRealtimeManager.ts (行 481)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 357) 与 utils\enhancedRealtimeManager.ts (行 482)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 514) 与 utils\enhancedRealtimeManager.ts (行 515)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 562) 与 utils\enhancedRealtimeManager.ts (行 563)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 588) 与 utils\enhancedRealtimeManager.ts (行 589)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 677) 与 utils\enhancedRealtimeManager.ts (行 678)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 803) 与 utils\enhancedRealtimeManager.ts (行 804)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 6) 与 utils\enhancedSkillSystemOptimizer.ts (行 7)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 178) 与 utils\enhancedSkillSystemOptimizer.ts (行 179)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 200) 与 utils\enhancedSkillSystemOptimizer.ts (行 201)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 282) 与 utils\enhancedSkillSystemOptimizer.ts (行 283)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 288) 与 utils\enhancedSkillSystemOptimizer.ts (行 289)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 294) 与 utils\enhancedSkillSystemOptimizer.ts (行 295)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 310) 与 utils\enhancedSkillSystemOptimizer.ts (行 311)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 331) 与 utils\enhancedSkillSystemOptimizer.ts (行 332)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 361) 与 utils\enhancedSkillSystemOptimizer.ts (行 362)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 388) 与 utils\enhancedSkillSystemOptimizer.ts (行 389)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 411) 与 utils\enhancedSkillSystemOptimizer.ts (行 412)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 417) 与 utils\enhancedSkillSystemOptimizer.ts (行 418)
  - 相似度: 100.0%

- utils\enhancedUserErrorInterface.ts (行 583) 与 utils\enhancedUserErrorInterface.ts (行 584)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 146) 与 utils\enhancedUserErrorInterface.ts (行 601)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 147) 与 utils\enhancedUserErrorInterface.ts (行 602)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 148) 与 utils\enhancedUserErrorInterface.ts (行 603)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 161) 与 utils\enhancedUserNotificationSystem.ts (行 162)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 164) 与 utils\enhancedUserNotificationSystem.ts (行 165)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 581) 与 utils\enhancedUserNotificationSystem.ts (行 582)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 651) 与 utils\enhancedUserNotificationSystem.ts (行 652)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 670) 与 utils\enhancedUserNotificationSystem.ts (行 671)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 703) 与 utils\enhancedUserNotificationSystem.ts (行 704)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 709) 与 utils\enhancedUserNotificationSystem.ts (行 710)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 768) 与 utils\enhancedUserNotificationSystem.ts (行 769)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 784) 与 utils\enhancedUserNotificationSystem.ts (行 785)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 801) 与 utils\enhancedUserNotificationSystem.ts (行 802)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 848) 与 utils\enhancedUserNotificationSystem.ts (行 849)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 862) 与 utils\enhancedUserNotificationSystem.ts (行 863)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 888) 与 utils\enhancedUserNotificationSystem.ts (行 889)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 1188) 与 utils\enhancedUserNotificationSystem.ts (行 991)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 1005) 与 utils\enhancedUserNotificationSystem.ts (行 1006)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 1008) 与 utils\enhancedUserNotificationSystem.ts (行 1009)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 1011) 与 utils\enhancedUserNotificationSystem.ts (行 1012)
  - 相似度: 100.0%

- utils\errorClassifier.ts (行 6) 与 utils\errorClassifier.ts (行 7)
  - 相似度: 100.0%

- utils\errorClassifier.ts (行 258) 与 utils\errorClassifier.ts (行 278)
  - 相似度: 100.0%

- utils\errorClassifier.ts (行 258) 与 utils\errorClassifier.ts (行 297)
  - 相似度: 100.0%

- utils\errorClassifier.ts (行 258) 与 utils\errorClassifier.ts (行 314)
  - 相似度: 100.0%

- utils\errorHandler.ts (行 4) 与 utils\errorHandler.ts (行 5)
  - 相似度: 100.0%

- utils\errorHandler.ts (行 128) 与 utils\errorHandler.ts (行 129)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 144) 与 utils\errorHandlingExamples.ts (行 145)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 150) 与 utils\errorHandlingExamples.ts (行 151)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 133) 与 utils\errorHandlingExamples.ts (行 209)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 134) 与 utils\errorHandlingExamples.ts (行 210)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 228) 与 utils\errorHandlingExamples.ts (行 229)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 300) 与 utils\errorHandlingExamples.ts (行 301)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 205) 与 utils\errorHandlingExamples.ts (行 330)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 108) 与 utils\errorMonitoringAndReporting.ts (行 50)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 196) 与 utils\errorMonitoringAndReporting.ts (行 76)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 78) 与 utils\errorMonitoringAndReporting.ts (行 120)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 225) 与 utils\errorMonitoringAndReporting.ts (行 226)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 286) 与 utils\errorMonitoringAndReporting.ts (行 287)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 309) 与 utils\errorMonitoringAndReporting.ts (行 310)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 315) 与 utils\errorMonitoringAndReporting.ts (行 316)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 408) 与 utils\errorMonitoringAndReporting.ts (行 409)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 438) 与 utils\errorMonitoringAndReporting.ts (行 439)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 1162) 与 utils\errorMonitoringAndReporting.ts (行 524)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 805) 与 utils\errorMonitoringAndReporting.ts (行 806)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 1162) 与 utils\globalErrorMonitor.ts (行 311)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 401) 与 utils\globalErrorMonitor.ts (行 402)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 436) 与 utils\globalErrorMonitor.ts (行 437)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 478) 与 utils\globalErrorMonitor.ts (行 479)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 484) 与 utils\globalErrorMonitor.ts (行 485)
  - 相似度: 100.0%

- services\cacheService.ts (行 433) 与 utils\globalErrorMonitor.ts (行 488)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 756) 与 utils\globalErrorMonitor.ts (行 489)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 502) 与 utils\globalErrorMonitor.ts (行 503)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 505) 与 utils\globalErrorMonitor.ts (行 506)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 596) 与 utils\globalErrorMonitor.ts (行 597)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 609) 与 utils\globalErrorMonitor.ts (行 610)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 702) 与 utils\globalErrorMonitor.ts (行 780)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 812) 与 utils\globalErrorMonitor.ts (行 813)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 98) 与 utils\improvedErrorSystem.ts (行 119)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 118) 与 utils\improvedErrorSystem.ts (行 131)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 98) 与 utils\improvedErrorSystem.ts (行 132)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 168) 与 utils\improvedErrorSystem.ts (行 169)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 540) 与 utils\improvedErrorSystem.ts (行 281)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 351) 与 utils\improvedErrorSystem.ts (行 352)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 388) 与 utils\improvedErrorSystem.ts (行 389)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 947) 与 utils\improvedErrorSystem.ts (行 437)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 473) 与 utils\improvedErrorSystem.ts (行 474)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 1150) 与 utils\improvedErrorSystem.ts (行 477)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 994) 与 utils\improvedErrorSystem.ts (行 478)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 996) 与 utils\improvedErrorSystem.ts (行 480)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 255) 与 utils\inputValidationManager.ts (行 256)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 347) 与 utils\inputValidationManager.ts (行 353)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 394) 与 utils\inputValidationManager.ts (行 395)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 534) 与 utils\inputValidationManager.ts (行 535)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 562) 与 utils\inputValidationManager.ts (行 563)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1271) 与 utils\inputValidationManager.ts (行 622)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 669) 与 utils\inputValidationManager.ts (行 670)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 672) 与 utils\inputValidationManager.ts (行 673)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 695) 与 utils\inputValidationManager.ts (行 696)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 746) 与 utils\inputValidationManager.ts (行 747)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 760) 与 utils\inputValidationManager.ts (行 779)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 846) 与 utils\inputValidationManager.ts (行 788)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 888) 与 utils\inputValidationManager.ts (行 801)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 463) 与 utils\inputValidationManager.ts (行 802)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 941) 与 utils\inputValidationManager.ts (行 846)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 859) 与 utils\inputValidationManager.ts (行 860)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 865) 与 utils\inputValidationManager.ts (行 866)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 895) 与 utils\inputValidationManager.ts (行 896)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 905) 与 utils\inputValidationManager.ts (行 906)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 489) 与 utils\inputValidationManager.ts (行 959)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 968) 与 utils\inputValidationManager.ts (行 984)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 969) 与 utils\inputValidationManager.ts (行 985)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 970) 与 utils\inputValidationManager.ts (行 986)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 971) 与 utils\inputValidationManager.ts (行 987)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 1025) 与 utils\inputValidationManager.ts (行 1026)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 1034) 与 utils\inputValidationManager.ts (行 1035)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 1155) 与 utils\inputValidationManager.ts (行 1156)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 15) 与 utils\intelligentCacheStrategy.ts (行 16)
  - 相似度: 100.0%

- services\cacheService.ts (行 34) 与 utils\intelligentCacheStrategy.ts (行 44)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 157) 与 utils\intelligentCacheStrategy.ts (行 158)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 221) 与 utils\intelligentCacheStrategy.ts (行 222)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 278) 与 utils\intelligentCacheStrategy.ts (行 279)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 296) 与 utils\intelligentCacheStrategy.ts (行 297)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 760) 与 utils\intelligentCacheStrategy.ts (行 309)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 836) 与 utils\intelligentCacheStrategy.ts (行 374)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 394) 与 utils\intelligentCacheStrategy.ts (行 395)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 410) 与 utils\intelligentCacheStrategy.ts (行 411)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 422) 与 utils\intelligentCacheStrategy.ts (行 423)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 454) 与 utils\intelligentCacheStrategy.ts (行 455)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 470) 与 utils\intelligentCacheStrategy.ts (行 471)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 476) 与 utils\intelligentCacheStrategy.ts (行 477)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 503) 与 utils\intelligentCacheStrategy.ts (行 504)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 641) 与 utils\intelligentCacheStrategy.ts (行 642)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 778) 与 utils\intelligentCacheStrategy.ts (行 645)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 760) 与 utils\intelligentCacheStrategy.ts (行 646)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 657) 与 utils\intelligentCacheStrategy.ts (行 658)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 699) 与 utils\intelligentCacheStrategy.ts (行 700)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 715) 与 utils\intelligentCacheStrategy.ts (行 716)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 783) 与 utils\intelligentCacheStrategy.ts (行 784)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 803) 与 utils\intelligentCacheStrategy.ts (行 804)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 785) 与 utils\intelligentCacheStrategy.ts (行 805)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 823) 与 utils\intelligentCacheStrategy.ts (行 824)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 785) 与 utils\intelligentCacheStrategy.ts (行 825)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 786) 与 utils\intelligentCacheStrategy.ts (行 826)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 787) 与 utils\intelligentCacheStrategy.ts (行 827)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 788) 与 utils\intelligentCacheStrategy.ts (行 828)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 919) 与 utils\intelligentCacheStrategy.ts (行 855)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 920) 与 utils\intelligentCacheStrategy.ts (行 856)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 882) 与 utils\intelligentCacheStrategy.ts (行 883)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1025) 与 utils\intelligentCacheStrategy.ts (行 1026)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 567) 与 utils\intelligentCacheStrategy.ts (行 1072)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1081) 与 utils\intelligentCacheStrategy.ts (行 1082)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 766) 与 utils\intelligentCacheStrategy.ts (行 1095)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1184) 与 utils\intelligentCacheStrategy.ts (行 1185)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 16) 与 utils\masterErrorHandler.ts (行 17)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 222) 与 utils\masterErrorHandler.ts (行 223)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 238) 与 utils\masterErrorHandler.ts (行 239)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 275) 与 utils\masterErrorHandler.ts (行 276)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 762) 与 utils\masterErrorHandler.ts (行 763)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 6) 与 utils\memoryLeakPrevention.ts (行 7)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 196) 与 utils\memoryLeakPrevention.ts (行 197)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 277) 与 utils\memoryLeakPrevention.ts (行 278)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 412) 与 utils\memoryLeakPrevention.ts (行 413)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 509) 与 utils\memoryLeakPrevention.ts (行 510)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 544) 与 utils\memoryLeakPrevention.ts (行 545)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 547) 与 utils\memoryLeakPrevention.ts (行 548)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 163) 与 utils\memoryManagementSystem.ts (行 164)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 189) 与 utils\memoryManagementSystem.ts (行 190)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 247) 与 utils\memoryManagementSystem.ts (行 248)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 284) 与 utils\memoryManagementSystem.ts (行 285)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1124) 与 utils\memoryManagementSystem.ts (行 596)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 606) 与 utils\memoryManagementSystem.ts (行 607)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 579) 与 utils\memoryManagementSystem.ts (行 624)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 580) 与 utils\memoryManagementSystem.ts (行 625)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 658) 与 utils\memoryManagementSystem.ts (行 659)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 710) 与 utils\memoryManagementSystem.ts (行 711)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 716) 与 utils\memoryManagementSystem.ts (行 717)
  - 相似度: 100.0%

- services\cacheService.ts (行 60) 与 utils\optimizedQueryCache.ts (行 24)
  - 相似度: 100.0%

- services\cacheService.ts (行 61) 与 utils\optimizedQueryCache.ts (行 25)
  - 相似度: 100.0%

- services\cacheService.ts (行 84) 与 utils\optimizedQueryCache.ts (行 45)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 167) 与 utils\optimizedQueryCache.ts (行 168)
  - 相似度: 100.0%

- services\cacheService.ts (行 339) 与 utils\optimizedQueryCache.ts (行 191)
  - 相似度: 100.0%

- services\cacheService.ts (行 340) 与 utils\optimizedQueryCache.ts (行 192)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 193) 与 utils\optimizedQueryCache.ts (行 194)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 199) 与 utils\optimizedQueryCache.ts (行 200)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 205) 与 utils\optimizedQueryCache.ts (行 206)
  - 相似度: 100.0%

- services\cacheService.ts (行 373) 与 utils\optimizedQueryCache.ts (行 217)
  - 相似度: 100.0%

- services\cacheService.ts (行 199) 与 utils\optimizedQueryCache.ts (行 481)
  - 相似度: 100.0%

- services\cacheService.ts (行 992) 与 utils\optimizedQueryCache.ts (行 491)
  - 相似度: 100.0%

- services\cacheService.ts (行 1002) 与 utils\optimizedQueryCache.ts (行 497)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 520) 与 utils\optimizedQueryCache.ts (行 521)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 725) 与 utils\optimizedQueryCache.ts (行 557)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 565) 与 utils\optimizedQueryCache.ts (行 566)
  - 相似度: 100.0%

- services\cacheService.ts (行 1225) 与 utils\optimizedQueryCache.ts (行 577)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1124) 与 utils\optimizedQueryCache.ts (行 588)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 601) 与 utils\optimizedQueryCache.ts (行 602)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 626) 与 utils\optimizedQueryCache.ts (行 627)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 635) 与 utils\optimizedQueryCache.ts (行 636)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1190) 与 utils\optimizedQueryCache.ts (行 657)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 23) 与 utils\optimizedRenderingSystem.ts (行 22)
  - 相似度: 100.0%

- utils\optimizedRenderingSystem.ts (行 122) 与 utils\optimizedRenderingSystem.ts (行 123)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 725) 与 utils\optimizedRenderingSystem.ts (行 199)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 160) 与 utils\optimizedRenderingSystem.ts (行 206)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 161) 与 utils\optimizedRenderingSystem.ts (行 207)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 595) 与 utils\optimizedRenderingSystem.ts (行 214)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1124) 与 utils\optimizedRenderingSystem.ts (行 215)
  - 相似度: 100.0%

- utils\optimizedRenderingSystem.ts (行 256) 与 utils\optimizedRenderingSystem.ts (行 257)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 236) 与 utils\optimizedRenderingSystem.ts (行 322)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 254) 与 utils\optimizedRenderingSystem.ts (行 345)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 255) 与 utils\optimizedRenderingSystem.ts (行 346)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 256) 与 utils\optimizedRenderingSystem.ts (行 347)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 257) 与 utils\optimizedRenderingSystem.ts (行 348)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 260) 与 utils\optimizedRenderingSystem.ts (行 351)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 261) 与 utils\optimizedRenderingSystem.ts (行 352)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 262) 与 utils\optimizedRenderingSystem.ts (行 353)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 263) 与 utils\optimizedRenderingSystem.ts (行 354)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 264) 与 utils\optimizedRenderingSystem.ts (行 355)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 265) 与 utils\optimizedRenderingSystem.ts (行 356)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 266) 与 utils\optimizedRenderingSystem.ts (行 357)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 267) 与 utils\optimizedRenderingSystem.ts (行 358)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 268) 与 utils\optimizedRenderingSystem.ts (行 359)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 269) 与 utils\optimizedRenderingSystem.ts (行 360)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 270) 与 utils\optimizedRenderingSystem.ts (行 361)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 271) 与 utils\optimizedRenderingSystem.ts (行 362)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 272) 与 utils\optimizedRenderingSystem.ts (行 363)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 273) 与 utils\optimizedRenderingSystem.ts (行 364)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 274) 与 utils\optimizedRenderingSystem.ts (行 365)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 275) 与 utils\optimizedRenderingSystem.ts (行 366)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 299) 与 utils\optimizedRenderingSystem.ts (行 388)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 300) 与 utils\optimizedRenderingSystem.ts (行 389)
  - 相似度: 100.0%

- utils\optimizedRenderingSystem.ts (行 409) 与 utils\optimizedRenderingSystem.ts (行 410)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 342) 与 utils\optimizedRenderingSystem.ts (行 431)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 343) 与 utils\optimizedRenderingSystem.ts (行 432)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 681) 与 utils\optimizedRenderingSystem.ts (行 450)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 388) 与 utils\optimizedRenderingSystem.ts (行 461)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 389) 与 utils\optimizedRenderingSystem.ts (行 462)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 390) 与 utils\optimizedRenderingSystem.ts (行 463)
  - 相似度: 100.0%

- utils\optimizedRenderingSystem.ts (行 470) 与 utils\optimizedRenderingSystem.ts (行 471)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 230) 与 utils\patterns\factory.ts (行 49)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 78) 与 utils\patterns\factory.ts (行 79)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 48) 与 utils\patterns\factory.ts (行 193)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 230) 与 utils\patterns\factory.ts (行 194)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 50) 与 utils\patterns\factory.ts (行 195)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 58) 与 utils\patterns\factory.ts (行 201)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 59) 与 utils\patterns\factory.ts (行 202)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 60) 与 utils\patterns\factory.ts (行 203)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 61) 与 utils\patterns\factory.ts (行 204)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 63) 与 utils\patterns\factory.ts (行 206)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 64) 与 utils\patterns\factory.ts (行 207)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 65) 与 utils\patterns\factory.ts (行 208)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 221) 与 utils\patterns\factory.ts (行 222)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 268) 与 utils\patterns\factory.ts (行 269)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 626) 与 utils\patterns\factory.ts (行 273)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 105) 与 utils\patterns\factory.ts (行 276)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 230) 与 utils\patterns\factory.ts (行 325)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 414) 与 utils\patterns\factory.ts (行 415)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 456) 与 utils\patterns\factory.ts (行 457)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 230) 与 utils\patterns\factory.ts (行 495)
  - 相似度: 100.0%

- utils\patterns\index.ts (行 86) 与 utils\patterns\index.ts (行 87)
  - 相似度: 100.0%

- utils\patterns\index.ts (行 268) 与 utils\patterns\index.ts (行 269)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 230) 与 utils\patterns\index.ts (行 275)
  - 相似度: 100.0%

- utils\patterns\index.ts (行 287) 与 utils\patterns\index.ts (行 288)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 778) 与 utils\patterns\index.ts (行 291)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 760) 与 utils\patterns\index.ts (行 292)
  - 相似度: 100.0%

- utils\patterns\index.ts (行 325) 与 utils\patterns\index.ts (行 326)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 88) 与 utils\patterns\observer.ts (行 89)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 108) 与 utils\patterns\observer.ts (行 109)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 167) 与 utils\patterns\observer.ts (行 168)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 187) 与 utils\patterns\observer.ts (行 188)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 756) 与 utils\patterns\observer.ts (行 234)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 251) 与 utils\patterns\observer.ts (行 252)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 212) 与 utils\patterns\observer.ts (行 263)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 213) 与 utils\patterns\observer.ts (行 264)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 226) 与 utils\patterns\observer.ts (行 265)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 227) 与 utils\patterns\observer.ts (行 266)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 228) 与 utils\patterns\observer.ts (行 267)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 229) 与 utils\patterns\observer.ts (行 268)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 230) 与 utils\patterns\observer.ts (行 269)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 231) 与 utils\patterns\observer.ts (行 270)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 232) 与 utils\patterns\observer.ts (行 271)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 233) 与 utils\patterns\observer.ts (行 272)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 756) 与 utils\patterns\observer.ts (行 273)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 375) 与 utils\patterns\observer.ts (行 376)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 381) 与 utils\patterns\observer.ts (行 382)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 396) 与 utils\patterns\observer.ts (行 397)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 307) 与 utils\patterns\observer.ts (行 467)
  - 相似度: 100.0%

- utils\patterns\singleton.ts (行 28) 与 utils\patterns\singleton.ts (行 29)
  - 相似度: 100.0%

- utils\patterns\singleton.ts (行 129) 与 utils\patterns\singleton.ts (行 130)
  - 相似度: 100.0%

- utils\patterns\singleton.ts (行 150) 与 utils\patterns\singleton.ts (行 151)
  - 相似度: 100.0%

- utils\patterns\singleton.ts (行 169) 与 utils\patterns\singleton.ts (行 170)
  - 相似度: 100.0%

- utils\patterns\singleton.ts (行 359) 与 utils\patterns\singleton.ts (行 360)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 230) 与 utils\patterns\singleton.ts (行 361)
  - 相似度: 100.0%

- utils\patterns\index.ts (行 333) 与 utils\patterns\singleton.ts (行 399)
  - 相似度: 100.0%

- utils\patterns\index.ts (行 274) 与 utils\patterns\strategy.ts (行 69)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 230) 与 utils\patterns\strategy.ts (行 70)
  - 相似度: 100.0%

- utils\patterns\strategy.ts (行 93) 与 utils\patterns\strategy.ts (行 105)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 380) 与 utils\patterns\strategy.ts (行 165)
  - 相似度: 100.0%

- utils\patterns\strategy.ts (行 85) 与 utils\patterns\strategy.ts (行 181)
  - 相似度: 100.0%

- utils\patterns\strategy.ts (行 151) 与 utils\patterns\strategy.ts (行 182)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 317) 与 utils\patterns\strategy.ts (行 294)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 324) 与 utils\patterns\strategy.ts (行 301)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 230) 与 utils\patterns\strategy.ts (行 302)
  - 相似度: 100.0%

- utils\patterns\strategy.ts (行 322) 与 utils\patterns\strategy.ts (行 323)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 348) 与 utils\patterns\strategy.ts (行 345)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 350) 与 utils\patterns\strategy.ts (行 347)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 351) 与 utils\patterns\strategy.ts (行 348)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 352) 与 utils\patterns\strategy.ts (行 349)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 353) 与 utils\patterns\strategy.ts (行 350)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 354) 与 utils\patterns\strategy.ts (行 351)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 355) 与 utils\patterns\strategy.ts (行 352)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 362) 与 utils\patterns\strategy.ts (行 359)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 363) 与 utils\patterns\strategy.ts (行 360)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 230) 与 utils\patterns\strategy.ts (行 407)
  - 相似度: 100.0%

- utils\patterns\strategy.ts (行 434) 与 utils\patterns\strategy.ts (行 435)
  - 相似度: 100.0%

- utils\patterns\strategy.ts (行 449) 与 utils\patterns\strategy.ts (行 450)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 400) 与 utils\patterns\strategy.ts (行 481)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 401) 与 utils\patterns\strategy.ts (行 482)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 402) 与 utils\patterns\strategy.ts (行 483)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 420) 与 utils\patterns\strategy.ts (行 504)
  - 相似度: 100.0%

- utils\patterns\strategy.ts (行 527) 与 utils\patterns\strategy.ts (行 528)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 230) 与 utils\patterns\strategy.ts (行 645)
  - 相似度: 100.0%

- utils\performanceCriticalFixes.ts (行 6) 与 utils\performanceCriticalFixes.ts (行 7)
  - 相似度: 100.0%

- utils\optimizedRenderingSystem.ts (行 36) 与 utils\performanceCriticalFixes.ts (行 35)
  - 相似度: 100.0%

- utils\performanceCriticalFixes.ts (行 118) 与 utils\performanceCriticalFixes.ts (行 119)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 372) 与 utils\performanceCriticalFixes.ts (行 328)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1112) 与 utils\performanceCriticalFixes.ts (行 355)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1113) 与 utils\performanceCriticalFixes.ts (行 356)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 229) 与 utils\queryCacheOptimizer.ts (行 230)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 352) 与 utils\queryCacheOptimizer.ts (行 353)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 363) 与 utils\queryCacheOptimizer.ts (行 364)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 366) 与 utils\queryCacheOptimizer.ts (行 367)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 415) 与 utils\queryCacheOptimizer.ts (行 416)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 538) 与 utils\queryCacheOptimizer.ts (行 539)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 621) 与 utils\queryCacheOptimizer.ts (行 622)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 723) 与 utils\queryCacheOptimizer.ts (行 724)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 451) 与 utils\queryCacheOptimizer.ts (行 773)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 852) 与 utils\queryCacheOptimizer.ts (行 853)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 897) 与 utils\queryCacheOptimizer.ts (行 898)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 820) 与 utils\queryCacheOptimizer.ts (行 954)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 228) 与 utils\realtimeSubscriptionManager.ts (行 172)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 229) 与 utils\realtimeSubscriptionManager.ts (行 173)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 229) 与 utils\realtimeSubscriptionManager.ts (行 174)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 232) 与 utils\realtimeSubscriptionManager.ts (行 233)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 245) 与 utils\realtimeSubscriptionManager.ts (行 246)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 45) 与 utils\realtimeSubscriptionManager.ts (行 311)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 336) 与 utils\realtimeSubscriptionManager.ts (行 337)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 355) 与 utils\realtimeSubscriptionManager.ts (行 356)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 320) 与 utils\realtimeSubscriptionManager.ts (行 366)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 382) 与 utils\realtimeSubscriptionManager.ts (行 383)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 353) 与 utils\realtimeSubscriptionManager.ts (行 394)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 354) 与 utils\realtimeSubscriptionManager.ts (行 395)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 355) 与 utils\realtimeSubscriptionManager.ts (行 396)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 355) 与 utils\realtimeSubscriptionManager.ts (行 397)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 357) 与 utils\realtimeSubscriptionManager.ts (行 398)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 415) 与 utils\realtimeSubscriptionManager.ts (行 416)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 515) 与 utils\realtimeSubscriptionManager.ts (行 516)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 533) 与 utils\realtimeSubscriptionManager.ts (行 534)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 558) 与 utils\realtimeSubscriptionManager.ts (行 559)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 580) 与 utils\realtimeSubscriptionManager.ts (行 581)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 642) 与 utils\realtimeSubscriptionManager.ts (行 643)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 688) 与 utils\realtimeSubscriptionManager.ts (行 689)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 691) 与 utils\realtimeSubscriptionManager.ts (行 692)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 694) 与 utils\realtimeSubscriptionManager.ts (行 695)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 235) 与 utils\realtimeSubscriptionManager.ts (行 697)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 724) 与 utils\realtimeSubscriptionManager.ts (行 725)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 730) 与 utils\realtimeSubscriptionManager.ts (行 731)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 742) 与 utils\realtimeSubscriptionManager.ts (行 743)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 748) 与 utils\realtimeSubscriptionManager.ts (行 749)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 776) 与 utils\realtimeSubscriptionManager.ts (行 802)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 785) 与 utils\realtimeSubscriptionManager.ts (行 811)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 826) 与 utils\realtimeSubscriptionManager.ts (行 827)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 859) 与 utils\realtimeSubscriptionManager.ts (行 860)
  - 相似度: 100.0%

- services\cacheService.ts (行 1202) 与 utils\realtimeSubscriptionManager.ts (行 882)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 24) 与 utils\roleConfiguration.ts (行 32)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 24) 与 utils\roleConfiguration.ts (行 50)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 33) 与 utils\roleConfiguration.ts (行 51)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 41) 与 utils\roleConfiguration.ts (行 61)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 42) 与 utils\roleConfiguration.ts (行 62)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 53) 与 utils\roleConfiguration.ts (行 64)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 54) 与 utils\roleConfiguration.ts (行 65)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 42) 与 utils\roleConfiguration.ts (行 73)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 63) 与 utils\roleConfiguration.ts (行 74)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 53) 与 utils\roleConfiguration.ts (行 75)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 54) 与 utils\roleConfiguration.ts (行 76)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 114) 与 utils\roleConfiguration.ts (行 115)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 126) 与 utils\roleConfiguration.ts (行 149)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 127) 与 utils\roleConfiguration.ts (行 150)
  - 相似度: 100.0%

- utils\roleStateHelpers.ts (行 51) 与 utils\roleStateHelpers.ts (行 52)
  - 相似度: 100.0%

- utils\roleStateHelpers.ts (行 64) 与 utils\roleStateHelpers.ts (行 65)
  - 相似度: 100.0%

- utils\roleStateHelpers.ts (行 75) 与 utils\roleStateHelpers.ts (行 76)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 148) 与 utils\securityEnhancement.ts (行 45)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 82) 与 utils\securityEnhancement.ts (行 83)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 187) 与 utils\securityEnhancement.ts (行 188)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 204) 与 utils\securityEnhancement.ts (行 205)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 240) 与 utils\securityEnhancement.ts (行 241)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 257) 与 utils\securityEnhancement.ts (行 258)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 269) 与 utils\securityEnhancement.ts (行 270)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 359) 与 utils\securityEnhancement.ts (行 360)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 6) 与 utils\securityMiddleware.ts (行 7)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 120) 与 utils\securityMiddleware.ts (行 31)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 89) 与 utils\securityMiddleware.ts (行 90)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 95) 与 utils\securityMiddleware.ts (行 96)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 129) 与 utils\securityMiddleware.ts (行 130)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 99) 与 utils\securityMiddleware.ts (行 133)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 174) 与 utils\securityMiddleware.ts (行 175)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 219) 与 utils\securityMiddleware.ts (行 220)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 274) 与 utils\securityMiddleware.ts (行 275)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 280) 与 utils\securityMiddleware.ts (行 281)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 309) 与 utils\securityMiddleware.ts (行 310)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 256) 与 utils\securityMiddleware.ts (行 314)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 257) 与 utils\securityMiddleware.ts (行 315)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 257) 与 utils\securityMiddleware.ts (行 316)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 259) 与 utils\securityMiddleware.ts (行 317)
  - 相似度: 100.0%

- utils\skillBatchProcessor.ts (行 128) 与 utils\skillBatchProcessor.ts (行 129)
  - 相似度: 100.0%

- utils\skillBatchProcessor.ts (行 149) 与 utils\skillBatchProcessor.ts (行 150)
  - 相似度: 100.0%

- utils\skillBatchProcessor.ts (行 162) 与 utils\skillBatchProcessor.ts (行 163)
  - 相似度: 100.0%

- utils\skillCache.ts (行 5) 与 utils\skillCache.ts (行 6)
  - 相似度: 100.0%

- utils\skillCache.ts (行 11) 与 utils\skillCache.ts (行 12)
  - 相似度: 100.0%

- utils\skillCache.ts (行 17) 与 utils\skillCache.ts (行 18)
  - 相似度: 100.0%

- utils\skillCache.ts (行 23) 与 utils\skillCache.ts (行 24)
  - 相似度: 100.0%

- utils\skillCache.ts (行 29) 与 utils\skillCache.ts (行 30)
  - 相似度: 100.0%

- utils\skillCache.ts (行 114) 与 utils\skillCache.ts (行 147)
  - 相似度: 100.0%

- utils\skillCache.ts (行 114) 与 utils\skillCache.ts (行 182)
  - 相似度: 100.0%

- utils\skillCache.ts (行 214) 与 utils\skillCache.ts (行 233)
  - 相似度: 100.0%

- types\skill.types.ts (行 132) 与 utils\skillDataStandardizer.ts (行 58)
  - 相似度: 100.0%

- types\skill.types.ts (行 133) 与 utils\skillDataStandardizer.ts (行 59)
  - 相似度: 100.0%

- types\skill.types.ts (行 134) 与 utils\skillDataStandardizer.ts (行 60)
  - 相似度: 100.0%

- types\skill.types.ts (行 135) 与 utils\skillDataStandardizer.ts (行 61)
  - 相似度: 100.0%

- utils\skillDataStandardizer.ts (行 96) 与 utils\skillDataStandardizer.ts (行 149)
  - 相似度: 100.0%

- utils\skillDataStandardizer.ts (行 97) 与 utils\skillDataStandardizer.ts (行 150)
  - 相似度: 100.0%

- utils\skillDataStandardizer.ts (行 95) 与 utils\skillDataStandardizer.ts (行 186)
  - 相似度: 100.0%

- utils\skillDataStandardizer.ts (行 96) 与 utils\skillDataStandardizer.ts (行 187)
  - 相似度: 100.0%

- utils\skillDataStandardizer.ts (行 97) 与 utils\skillDataStandardizer.ts (行 188)
  - 相似度: 100.0%

- utils\skillDataStandardizer.ts (行 269) 与 utils\skillDataStandardizer.ts (行 270)
  - 相似度: 100.0%

- utils\skillDataStandardizer.ts (行 353) 与 utils\skillDataStandardizer.ts (行 354)
  - 相似度: 100.0%

- utils\skillDataStandardizer.ts (行 375) 与 utils\skillDataStandardizer.ts (行 376)
  - 相似度: 100.0%

- utils\skillEffectsManager.ts (行 106) 与 utils\skillEffectsManager.ts (行 107)
  - 相似度: 100.0%

- utils\skillEffectsManager.ts (行 130) 与 utils\skillEffectsManager.ts (行 131)
  - 相似度: 100.0%

- utils\skillEffectsManager.ts (行 136) 与 utils\skillEffectsManager.ts (行 137)
  - 相似度: 100.0%

- utils\skillEffectsManager.ts (行 142) 与 utils\skillEffectsManager.ts (行 143)
  - 相似度: 100.0%

- utils\skillErrorHandler.ts (行 84) 与 utils\skillErrorHandler.ts (行 85)
  - 相似度: 100.0%

- utils\skillErrorHandler.ts (行 106) 与 utils\skillErrorHandler.ts (行 107)
  - 相似度: 100.0%

- utils\skillErrorHandler.ts (行 192) 与 utils\skillErrorHandler.ts (行 193)
  - 相似度: 100.0%

- utils\skillErrorHandler.ts (行 210) 与 utils\skillErrorHandler.ts (行 211)
  - 相似度: 100.0%

- utils\skillErrorHandler.ts (行 308) 与 utils\skillErrorHandler.ts (行 309)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 91) 与 utils\skillMappingConfig.ts (行 107)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 92) 与 utils\skillMappingConfig.ts (行 108)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 93) 与 utils\skillMappingConfig.ts (行 109)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 94) 与 utils\skillMappingConfig.ts (行 110)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 95) 与 utils\skillMappingConfig.ts (行 111)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 142) 与 utils\skillMappingConfig.ts (行 158)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 143) 与 utils\skillMappingConfig.ts (行 159)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 144) 与 utils\skillMappingConfig.ts (行 160)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 145) 与 utils\skillMappingConfig.ts (行 161)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 146) 与 utils\skillMappingConfig.ts (行 162)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 211) 与 utils\skillMappingConfig.ts (行 212)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 217) 与 utils\skillMappingConfig.ts (行 218)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 32) 与 utils\skillSystemCache.ts (行 33)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 36) 与 utils\skillSystemCache.ts (行 37)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 86) 与 utils\skillSystemCache.ts (行 87)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 113) 与 utils\skillSystemCache.ts (行 114)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 150) 与 utils\skillSystemCache.ts (行 151)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 181) 与 utils\skillSystemCache.ts (行 182)
  - 相似度: 100.0%

- services\securityAuditService.ts (行 677) 与 utils\skillSystemCache.ts (行 186)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 865) 与 utils\skillSystemCache.ts (行 201)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1094) 与 utils\skillSystemCache.ts (行 204)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 294) 与 utils\skillSystemCache.ts (行 295)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 300) 与 utils\skillSystemCache.ts (行 301)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 312) 与 utils\skillSystemCache.ts (行 313)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 297) 与 utils\skillSystemCache.ts (行 315)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 298) 与 utils\skillSystemCache.ts (行 316)
  - 相似度: 100.0%

- utils\skillSystemHelpers.ts (行 59) 与 utils\skillSystemHelpers.ts (行 60)
  - 相似度: 100.0%

- utils\skillSystemHelpers.ts (行 93) 与 utils\skillSystemHelpers.ts (行 94)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 122) 与 utils\skillSystemValidation.ts (行 123)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 133) 与 utils\skillSystemValidation.ts (行 152)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 134) 与 utils\skillSystemValidation.ts (行 153)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 135) 与 utils\skillSystemValidation.ts (行 154)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 136) 与 utils\skillSystemValidation.ts (行 155)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 137) 与 utils\skillSystemValidation.ts (行 156)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 138) 与 utils\skillSystemValidation.ts (行 157)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 204) 与 utils\skillSystemValidation.ts (行 241)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 205) 与 utils\skillSystemValidation.ts (行 242)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 204) 与 utils\skillSystemValidation.ts (行 265)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 205) 与 utils\skillSystemValidation.ts (行 266)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 444) 与 utils\skillSystemValidation.ts (行 445)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 511) 与 utils\skillSystemValidation.ts (行 512)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 544) 与 utils\skillSystemValidation.ts (行 602)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 545) 与 utils\skillSystemValidation.ts (行 603)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 546) 与 utils\skillSystemValidation.ts (行 604)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 547) 与 utils\skillSystemValidation.ts (行 605)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 548) 与 utils\skillSystemValidation.ts (行 606)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 549) 与 utils\skillSystemValidation.ts (行 607)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 550) 与 utils\skillSystemValidation.ts (行 608)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 551) 与 utils\skillSystemValidation.ts (行 609)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 552) 与 utils\skillSystemValidation.ts (行 610)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 553) 与 utils\skillSystemValidation.ts (行 611)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 554) 与 utils\skillSystemValidation.ts (行 612)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 555) 与 utils\skillSystemValidation.ts (行 613)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 556) 与 utils\skillSystemValidation.ts (行 614)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 557) 与 utils\skillSystemValidation.ts (行 615)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 558) 与 utils\skillSystemValidation.ts (行 616)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 559) 与 utils\skillSystemValidation.ts (行 617)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 560) 与 utils\skillSystemValidation.ts (行 618)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 561) 与 utils\skillSystemValidation.ts (行 619)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 562) 与 utils\skillSystemValidation.ts (行 620)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 563) 与 utils\skillSystemValidation.ts (行 621)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 564) 与 utils\skillSystemValidation.ts (行 622)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 565) 与 utils\skillSystemValidation.ts (行 623)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 566) 与 utils\skillSystemValidation.ts (行 624)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 567) 与 utils\skillSystemValidation.ts (行 625)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 568) 与 utils\skillSystemValidation.ts (行 626)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 569) 与 utils\skillSystemValidation.ts (行 627)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 570) 与 utils\skillSystemValidation.ts (行 628)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 571) 与 utils\skillSystemValidation.ts (行 629)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 572) 与 utils\skillSystemValidation.ts (行 630)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 573) 与 utils\skillSystemValidation.ts (行 631)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 574) 与 utils\skillSystemValidation.ts (行 632)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 584) 与 utils\skillSystemValidation.ts (行 637)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 585) 与 utils\skillSystemValidation.ts (行 638)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 586) 与 utils\skillSystemValidation.ts (行 639)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 587) 与 utils\skillSystemValidation.ts (行 640)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 588) 与 utils\skillSystemValidation.ts (行 641)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 664) 与 utils\skillSystemValidation.ts (行 734)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 663) 与 utils\skillSystemValidation.ts (行 792)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 664) 与 utils\skillSystemValidation.ts (行 793)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 856) 与 utils\skillSystemValidation.ts (行 857)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 464) 与 utils\skillSystemValidation.ts (行 883)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 465) 与 utils\skillSystemValidation.ts (行 884)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 466) 与 utils\skillSystemValidation.ts (行 885)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 467) 与 utils\skillSystemValidation.ts (行 886)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 468) 与 utils\skillSystemValidation.ts (行 887)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 469) 与 utils\skillSystemValidation.ts (行 888)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 470) 与 utils\skillSystemValidation.ts (行 889)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 471) 与 utils\skillSystemValidation.ts (行 890)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 479) 与 utils\skillSystemValidation.ts (行 898)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 480) 与 utils\skillSystemValidation.ts (行 899)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 481) 与 utils\skillSystemValidation.ts (行 900)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 488) 与 utils\skillSystemValidation.ts (行 907)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 489) 与 utils\skillSystemValidation.ts (行 908)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 490) 与 utils\skillSystemValidation.ts (行 909)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 491) 与 utils\skillSystemValidation.ts (行 910)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 492) 与 utils\skillSystemValidation.ts (行 911)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 493) 与 utils\skillSystemValidation.ts (行 912)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 494) 与 utils\skillSystemValidation.ts (行 913)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 504) 与 utils\skillSystemValidation.ts (行 924)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 505) 与 utils\skillSystemValidation.ts (行 925)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 506) 与 utils\skillSystemValidation.ts (行 926)
  - 相似度: 100.0%

- utils\skillUsageRestrictions.ts (行 116) 与 utils\skillUsageRestrictions.ts (行 117)
  - 相似度: 100.0%

- utils\skillUsageRestrictions.ts (行 131) 与 utils\skillUsageRestrictions.ts (行 146)
  - 相似度: 100.0%

- utils\skillUsageRestrictions.ts (行 132) 与 utils\skillUsageRestrictions.ts (行 147)
  - 相似度: 100.0%

- utils\skillUsageRestrictions.ts (行 131) 与 utils\skillUsageRestrictions.ts (行 161)
  - 相似度: 100.0%

- utils\skillUsageRestrictions.ts (行 132) 与 utils\skillUsageRestrictions.ts (行 162)
  - 相似度: 100.0%

- utils\skillUsageRestrictions.ts (行 59) 与 utils\skillUsageRestrictions.ts (行 204)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 24) 与 utils\skillValidationRules.ts (行 43)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 25) 与 utils\skillValidationRules.ts (行 44)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 26) 与 utils\skillValidationRules.ts (行 45)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 27) 与 utils\skillValidationRules.ts (行 46)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 28) 与 utils\skillValidationRules.ts (行 47)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 29) 与 utils\skillValidationRules.ts (行 48)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 30) 与 utils\skillValidationRules.ts (行 49)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 24) 与 utils\skillValidationRules.ts (行 62)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 25) 与 utils\skillValidationRules.ts (行 63)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 57) 与 utils\skillValidationRules.ts (行 75)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 58) 与 utils\skillValidationRules.ts (行 76)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 59) 与 utils\skillValidationRules.ts (行 77)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 60) 与 utils\skillValidationRules.ts (行 78)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 61) 与 utils\skillValidationRules.ts (行 79)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 24) 与 utils\skillValidationRules.ts (行 80)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 25) 与 utils\skillValidationRules.ts (行 81)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 64) 与 utils\skillValidationRules.ts (行 82)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 65) 与 utils\skillValidationRules.ts (行 83)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 66) 与 utils\skillValidationRules.ts (行 84)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 67) 与 utils\skillValidationRules.ts (行 85)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 117) 与 utils\skillValidationRules.ts (行 142)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 118) 与 utils\skillValidationRules.ts (行 143)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 119) 与 utils\skillValidationRules.ts (行 144)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 120) 与 utils\skillValidationRules.ts (行 145)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 121) 与 utils\skillValidationRules.ts (行 146)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 122) 与 utils\skillValidationRules.ts (行 147)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 129) 与 utils\skillValidationRules.ts (行 154)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 130) 与 utils\skillValidationRules.ts (行 155)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 131) 与 utils\skillValidationRules.ts (行 156)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 132) 与 utils\skillValidationRules.ts (行 157)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 133) 与 utils\skillValidationRules.ts (行 158)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 134) 与 utils\skillValidationRules.ts (行 159)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 167) 与 utils\skillValidationRules.ts (行 189)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 168) 与 utils\skillValidationRules.ts (行 190)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 169) 与 utils\skillValidationRules.ts (行 191)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 170) 与 utils\skillValidationRules.ts (行 192)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 171) 与 utils\skillValidationRules.ts (行 193)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 172) 与 utils\skillValidationRules.ts (行 194)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 173) 与 utils\skillValidationRules.ts (行 195)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 174) 与 utils\skillValidationRules.ts (行 196)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 175) 与 utils\skillValidationRules.ts (行 197)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 176) 与 utils\skillValidationRules.ts (行 198)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 177) 与 utils\skillValidationRules.ts (行 199)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 178) 与 utils\skillValidationRules.ts (行 200)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 179) 与 utils\skillValidationRules.ts (行 201)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 180) 与 utils\skillValidationRules.ts (行 202)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 181) 与 utils\skillValidationRules.ts (行 203)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 57) 与 utils\skillValidationRules.ts (行 211)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 58) 与 utils\skillValidationRules.ts (行 212)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 59) 与 utils\skillValidationRules.ts (行 213)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 60) 与 utils\skillValidationRules.ts (行 214)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 61) 与 utils\skillValidationRules.ts (行 215)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 24) 与 utils\skillValidationRules.ts (行 216)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 25) 与 utils\skillValidationRules.ts (行 217)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 64) 与 utils\skillValidationRules.ts (行 218)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 65) 与 utils\skillValidationRules.ts (行 219)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 66) 与 utils\skillValidationRules.ts (行 220)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 67) 与 utils\skillValidationRules.ts (行 221)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 59) 与 utils\skillValidationRules.ts (行 231)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 60) 与 utils\skillValidationRules.ts (行 232)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 61) 与 utils\skillValidationRules.ts (行 233)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 24) 与 utils\skillValidationRules.ts (行 234)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 25) 与 utils\skillValidationRules.ts (行 235)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 64) 与 utils\skillValidationRules.ts (行 236)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 65) 与 utils\skillValidationRules.ts (行 237)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 66) 与 utils\skillValidationRules.ts (行 238)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 67) 与 utils\skillValidationRules.ts (行 239)
  - 相似度: 100.0%

- services\dyingStatusService.ts (行 93) 与 utils\skillValidationRules.ts (行 253)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 315) 与 utils\skillValidationRules.ts (行 316)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 205) 与 utils\skillValidationRules.ts (行 338)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 20) 与 utils\unifiedCacheManager.ts (行 18)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 179) 与 utils\unifiedCacheManager.ts (行 180)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 182) 与 utils\unifiedCacheManager.ts (行 183)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 225) 与 utils\unifiedCacheManager.ts (行 226)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 231) 与 utils\unifiedCacheManager.ts (行 232)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 468) 与 utils\unifiedCacheManager.ts (行 284)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 322) 与 utils\unifiedCacheManager.ts (行 323)
  - 相似度: 100.0%

- services\skillSystemService.ts (行 151) 与 utils\unifiedCacheManager.ts (行 372)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 316) 与 utils\unifiedCacheManager.ts (行 401)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 317) 与 utils\unifiedCacheManager.ts (行 402)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 407) 与 utils\unifiedCacheManager.ts (行 408)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 369) 与 utils\unifiedCacheManager.ts (行 434)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 370) 与 utils\unifiedCacheManager.ts (行 435)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 371) 与 utils\unifiedCacheManager.ts (行 436)
  - 相似度: 100.0%

- services\skillSystemService.ts (行 151) 与 utils\unifiedCacheManager.ts (行 437)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 512) 与 utils\unifiedCacheManager.ts (行 513)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 836) 与 utils\unifiedCacheManager.ts (行 517)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 547) 与 utils\unifiedCacheManager.ts (行 548)
  - 相似度: 100.0%

- services\cacheService.ts (行 433) 与 utils\unifiedCacheManager.ts (行 556)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 756) 与 utils\unifiedCacheManager.ts (行 557)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 575) 与 utils\unifiedCacheManager.ts (行 576)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 641) 与 utils\unifiedCacheManager.ts (行 642)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 669) 与 utils\unifiedCacheManager.ts (行 670)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 672) 与 utils\unifiedCacheManager.ts (行 673)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 711) 与 utils\unifiedCacheManager.ts (行 740)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 720) 与 utils\unifiedCacheManager.ts (行 749)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 739) 与 utils\unifiedCacheManager.ts (行 763)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 711) 与 utils\unifiedCacheManager.ts (行 764)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 720) 与 utils\unifiedCacheManager.ts (行 773)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 711) 与 utils\unifiedCacheManager.ts (行 791)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 696) 与 utils\unifiedCacheManager.ts (行 802)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 730) 与 utils\unifiedCacheManager.ts (行 936)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 731) 与 utils\unifiedCacheManager.ts (行 937)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 732) 与 utils\unifiedCacheManager.ts (行 938)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 733) 与 utils\unifiedCacheManager.ts (行 939)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 648) 与 utils\unifiedCacheManager.ts (行 951)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 789) 与 utils\unifiedCacheManager.ts (行 966)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 790) 与 utils\unifiedCacheManager.ts (行 967)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 791) 与 utils\unifiedCacheManager.ts (行 968)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 792) 与 utils\unifiedCacheManager.ts (行 969)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 793) 与 utils\unifiedCacheManager.ts (行 970)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 794) 与 utils\unifiedCacheManager.ts (行 971)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 795) 与 utils\unifiedCacheManager.ts (行 972)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 796) 与 utils\unifiedCacheManager.ts (行 973)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 797) 与 utils\unifiedCacheManager.ts (行 974)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 984) 与 utils\unifiedCacheManager.ts (行 985)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 1060) 与 utils\unifiedCacheManager.ts (行 1061)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1290) 与 utils\unifiedCacheManager.ts (行 1065)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 1066) 与 utils\unifiedCacheManager.ts (行 1067)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 5) 与 utils\unifiedErrorHandler.ts (行 6)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 34) 与 utils\unifiedErrorHandler.ts (行 14)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 35) 与 utils\unifiedErrorHandler.ts (行 15)
  - 相似度: 100.0%

- config\security.config.ts (行 14) 与 utils\unifiedErrorHandler.ts (行 16)
  - 相似度: 100.0%

- config\security.config.ts (行 15) 与 utils\unifiedErrorHandler.ts (行 17)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 156) 与 utils\unifiedErrorHandler.ts (行 64)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 161) 与 utils\unifiedErrorHandler.ts (行 162)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 188) 与 utils\unifiedErrorHandler.ts (行 213)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 240) 与 utils\unifiedErrorHandler.ts (行 241)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 246) 与 utils\unifiedErrorHandler.ts (行 247)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 257) 与 utils\unifiedErrorHandler.ts (行 258)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 266) 与 utils\unifiedErrorHandler.ts (行 267)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 549) 与 utils\unifiedErrorHandler.ts (行 550)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 1150) 与 utils\unifiedErrorHandler.ts (行 553)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 994) 与 utils\unifiedErrorHandler.ts (行 554)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 571) 与 utils\unifiedErrorHandler.ts (行 572)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 586) 与 utils\unifiedErrorHandler.ts (行 587)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1113) 与 utils\unifiedErrorHandler.ts (行 782)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 1188) 与 utils\unifiedErrorHandler.ts (行 797)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 420) 与 utils\unifiedErrorHandler.ts (行 825)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 156) 与 utils\unifiedErrorManager.ts (行 51)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 68) 与 utils\unifiedErrorManager.ts (行 55)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 69) 与 utils\unifiedErrorManager.ts (行 56)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 70) 与 utils\unifiedErrorManager.ts (行 57)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 71) 与 utils\unifiedErrorManager.ts (行 58)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 72) 与 utils\unifiedErrorManager.ts (行 59)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 73) 与 utils\unifiedErrorManager.ts (行 60)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 74) 与 utils\unifiedErrorManager.ts (行 61)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 75) 与 utils\unifiedErrorManager.ts (行 62)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 76) 与 utils\unifiedErrorManager.ts (行 63)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 77) 与 utils\unifiedErrorManager.ts (行 64)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 78) 与 utils\unifiedErrorManager.ts (行 65)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 79) 与 utils\unifiedErrorManager.ts (行 66)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 80) 与 utils\unifiedErrorManager.ts (行 67)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 88) 与 utils\unifiedErrorManager.ts (行 77)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 98) 与 utils\unifiedErrorManager.ts (行 89)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 40) 与 utils\unifiedErrorManager.ts (行 105)
  - 相似度: 100.0%

- utils\errorHandlerInterface.ts (行 11) 与 utils\unifiedErrorManager.ts (行 109)
  - 相似度: 100.0%

- utils\errorHandlerInterface.ts (行 12) 与 utils\unifiedErrorManager.ts (行 110)
  - 相似度: 100.0%

- utils\errorHandlerInterface.ts (行 13) 与 utils\unifiedErrorManager.ts (行 111)
  - 相似度: 100.0%

- utils\errorHandlerInterface.ts (行 14) 与 utils\unifiedErrorManager.ts (行 112)
  - 相似度: 100.0%

- utils\errorHandlerInterface.ts (行 15) 与 utils\unifiedErrorManager.ts (行 113)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 165) 与 utils\unifiedErrorManager.ts (行 226)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 183) 与 utils\unifiedErrorManager.ts (行 244)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 184) 与 utils\unifiedErrorManager.ts (行 245)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 185) 与 utils\unifiedErrorManager.ts (行 246)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 186) 与 utils\unifiedErrorManager.ts (行 247)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 187) 与 utils\unifiedErrorManager.ts (行 248)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 188) 与 utils\unifiedErrorManager.ts (行 249)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 189) 与 utils\unifiedErrorManager.ts (行 250)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 190) 与 utils\unifiedErrorManager.ts (行 251)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 212) 与 utils\unifiedErrorManager.ts (行 274)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 188) 与 utils\unifiedErrorManager.ts (行 275)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 308) 与 utils\unifiedErrorManager.ts (行 309)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 311) 与 utils\unifiedErrorManager.ts (行 312)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 525) 与 utils\unifiedErrorManager.ts (行 334)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 397) 与 utils\unifiedErrorManager.ts (行 398)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 298) 与 utils\unifiedErrorManager.ts (行 414)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 335) 与 utils\unifiedErrorManager.ts (行 451)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 336) 与 utils\unifiedErrorManager.ts (行 452)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 337) 与 utils\unifiedErrorManager.ts (行 453)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 338) 与 utils\unifiedErrorManager.ts (行 454)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 339) 与 utils\unifiedErrorManager.ts (行 455)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 352) 与 utils\unifiedErrorManager.ts (行 471)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 353) 与 utils\unifiedErrorManager.ts (行 472)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 354) 与 utils\unifiedErrorManager.ts (行 473)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 355) 与 utils\unifiedErrorManager.ts (行 474)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 356) 与 utils\unifiedErrorManager.ts (行 475)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 372) 与 utils\unifiedErrorManager.ts (行 495)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 373) 与 utils\unifiedErrorManager.ts (行 496)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 374) 与 utils\unifiedErrorManager.ts (行 497)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 550) 与 utils\unifiedErrorManager.ts (行 551)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 560) 与 utils\unifiedErrorManager.ts (行 561)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 283) 与 utils\unifiedErrorManager.ts (行 648)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 473) 与 utils\unifiedErrorManager.ts (行 666)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 473) 与 utils\unifiedErrorManager.ts (行 667)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 475) 与 utils\unifiedErrorManager.ts (行 668)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 525) 与 utils\unifiedErrorManager.ts (行 685)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 526) 与 utils\unifiedErrorManager.ts (行 686)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 527) 与 utils\unifiedErrorManager.ts (行 687)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 528) 与 utils\unifiedErrorManager.ts (行 688)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 529) 与 utils\unifiedErrorManager.ts (行 689)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 530) 与 utils\unifiedErrorManager.ts (行 690)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 531) 与 utils\unifiedErrorManager.ts (行 691)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 532) 与 utils\unifiedErrorManager.ts (行 692)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 533) 与 utils\unifiedErrorManager.ts (行 693)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 534) 与 utils\unifiedErrorManager.ts (行 694)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 535) 与 utils\unifiedErrorManager.ts (行 695)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 536) 与 utils\unifiedErrorManager.ts (行 696)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 537) 与 utils\unifiedErrorManager.ts (行 697)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 538) 与 utils\unifiedErrorManager.ts (行 698)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 1150) 与 utils\unifiedErrorManager.ts (行 719)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 994) 与 utils\unifiedErrorManager.ts (行 720)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 996) 与 utils\unifiedErrorManager.ts (行 722)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 997) 与 utils\unifiedErrorManager.ts (行 723)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 148) 与 utils\unifiedErrorManager.ts (行 724)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 739) 与 utils\unifiedErrorManager.ts (行 740)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 571) 与 utils\unifiedErrorManager.ts (行 745)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 571) 与 utils\unifiedErrorManager.ts (行 746)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 586) 与 utils\unifiedErrorManager.ts (行 756)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 586) 与 utils\unifiedErrorManager.ts (行 757)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 679) 与 utils\unifiedErrorManager.ts (行 786)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 823) 与 utils\unifiedErrorManager.ts (行 824)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 990) 与 utils\unifiedErrorManager.ts (行 859)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 1188) 与 utils\unifiedErrorManager.ts (行 860)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 16) 与 utils\unifiedErrorSystem.ts (行 17)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 70) 与 utils\unifiedErrorSystem.ts (行 89)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 71) 与 utils\unifiedErrorSystem.ts (行 90)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 72) 与 utils\unifiedErrorSystem.ts (行 91)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 42) 与 utils\unifiedErrorSystem.ts (行 149)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 41) 与 utils\unifiedErrorSystem.ts (行 167)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 165) 与 utils\unifiedErrorSystem.ts (行 285)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 166) 与 utils\unifiedErrorSystem.ts (行 286)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 167) 与 utils\unifiedErrorSystem.ts (行 287)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 168) 与 utils\unifiedErrorSystem.ts (行 288)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 299) 与 utils\unifiedErrorSystem.ts (行 300)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 302) 与 utils\unifiedErrorSystem.ts (行 303)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 225) 与 utils\unifiedErrorSystem.ts (行 355)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 165) 与 utils\unifiedErrorSystem.ts (行 356)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 232) 与 utils\unifiedErrorSystem.ts (行 362)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 175) 与 utils\unifiedErrorSystem.ts (行 366)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 176) 与 utils\unifiedErrorSystem.ts (行 367)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 188) 与 utils\unifiedErrorSystem.ts (行 389)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 189) 与 utils\unifiedErrorSystem.ts (行 390)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 190) 与 utils\unifiedErrorSystem.ts (行 391)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 257) 与 utils\unifiedErrorSystem.ts (行 397)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 200) 与 utils\unifiedErrorSystem.ts (行 401)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 201) 与 utils\unifiedErrorSystem.ts (行 402)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 188) 与 utils\unifiedErrorSystem.ts (行 414)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 312) 与 utils\unifiedErrorSystem.ts (行 456)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 313) 与 utils\unifiedErrorSystem.ts (行 457)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 335) 与 utils\unifiedErrorSystem.ts (行 482)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 336) 与 utils\unifiedErrorSystem.ts (行 483)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 352) 与 utils\unifiedErrorSystem.ts (行 502)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 353) 与 utils\unifiedErrorSystem.ts (行 503)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 368) 与 utils\unifiedErrorSystem.ts (行 542)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 389) 与 utils\unifiedErrorSystem.ts (行 590)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 639) 与 utils\unifiedErrorSystem.ts (行 640)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 658) 与 utils\unifiedErrorSystem.ts (行 659)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 676) 与 utils\unifiedErrorSystem.ts (行 677)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 682) 与 utils\unifiedErrorSystem.ts (行 683)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 737) 与 utils\unifiedErrorSystem.ts (行 738)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 743) 与 utils\unifiedErrorSystem.ts (行 744)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 998) 与 utils\unifiedErrorSystem.ts (行 809)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 782) 与 utils\unifiedErrorSystem.ts (行 864)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 459) 与 utils\unifiedErrorSystem.ts (行 898)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 478) 与 utils\unifiedErrorSystem.ts (行 921)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 932) 与 utils\unifiedErrorSystem.ts (行 933)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 944) 与 utils\unifiedErrorSystem.ts (行 945)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 516) 与 utils\unifiedErrorSystem.ts (行 956)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 517) 与 utils\unifiedErrorSystem.ts (行 957)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 525) 与 utils\unifiedErrorSystem.ts (行 966)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 526) 与 utils\unifiedErrorSystem.ts (行 967)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 527) 与 utils\unifiedErrorSystem.ts (行 968)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 528) 与 utils\unifiedErrorSystem.ts (行 969)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 529) 与 utils\unifiedErrorSystem.ts (行 970)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 530) 与 utils\unifiedErrorSystem.ts (行 971)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 531) 与 utils\unifiedErrorSystem.ts (行 972)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 532) 与 utils\unifiedErrorSystem.ts (行 973)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 533) 与 utils\unifiedErrorSystem.ts (行 974)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 534) 与 utils\unifiedErrorSystem.ts (行 975)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 535) 与 utils\unifiedErrorSystem.ts (行 976)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 536) 与 utils\unifiedErrorSystem.ts (行 977)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 537) 与 utils\unifiedErrorSystem.ts (行 978)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 538) 与 utils\unifiedErrorSystem.ts (行 979)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 539) 与 utils\unifiedErrorSystem.ts (行 980)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 540) 与 utils\unifiedErrorSystem.ts (行 981)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 545) 与 utils\unifiedErrorSystem.ts (行 986)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 990) 与 utils\unifiedErrorSystem.ts (行 991)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 1003) 与 utils\unifiedErrorSystem.ts (行 1004)
  - 相似度: 100.0%

- services\errorHandlingService.ts (行 994) 与 utils\unifiedErrorSystem.ts (行 1025)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 556) 与 utils\unifiedErrorSystem.ts (行 1027)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 557) 与 utils\unifiedErrorSystem.ts (行 1028)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 558) 与 utils\unifiedErrorSystem.ts (行 1029)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 1175) 与 utils\unifiedErrorSystem.ts (行 1176)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 650) 与 utils\unifiedErrorSystem.ts (行 1200)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 651) 与 utils\unifiedErrorSystem.ts (行 1201)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 652) 与 utils\unifiedErrorSystem.ts (行 1202)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 653) 与 utils\unifiedErrorSystem.ts (行 1203)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 654) 与 utils\unifiedErrorSystem.ts (行 1204)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 655) 与 utils\unifiedErrorSystem.ts (行 1205)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 656) 与 utils\unifiedErrorSystem.ts (行 1206)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 657) 与 utils\unifiedErrorSystem.ts (行 1207)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 658) 与 utils\unifiedErrorSystem.ts (行 1208)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 659) 与 utils\unifiedErrorSystem.ts (行 1209)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 660) 与 utils\unifiedErrorSystem.ts (行 1210)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 661) 与 utils\unifiedErrorSystem.ts (行 1211)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 662) 与 utils\unifiedErrorSystem.ts (行 1212)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 716) 与 utils\unifiedErrorSystem.ts (行 1302)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 717) 与 utils\unifiedErrorSystem.ts (行 1303)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 718) 与 utils\unifiedErrorSystem.ts (行 1304)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 719) 与 utils\unifiedErrorSystem.ts (行 1305)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 720) 与 utils\unifiedErrorSystem.ts (行 1306)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 721) 与 utils\unifiedErrorSystem.ts (行 1307)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 722) 与 utils\unifiedErrorSystem.ts (行 1308)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 723) 与 utils\unifiedErrorSystem.ts (行 1309)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 724) 与 utils\unifiedErrorSystem.ts (行 1310)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 725) 与 utils\unifiedErrorSystem.ts (行 1311)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 726) 与 utils\unifiedErrorSystem.ts (行 1312)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 730) 与 utils\unifiedErrorSystem.ts (行 1316)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 731) 与 utils\unifiedErrorSystem.ts (行 1317)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 732) 与 utils\unifiedErrorSystem.ts (行 1318)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 733) 与 utils\unifiedErrorSystem.ts (行 1319)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 734) 与 utils\unifiedErrorSystem.ts (行 1320)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 735) 与 utils\unifiedErrorSystem.ts (行 1321)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 736) 与 utils\unifiedErrorSystem.ts (行 1322)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 737) 与 utils\unifiedErrorSystem.ts (行 1323)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 738) 与 utils\unifiedErrorSystem.ts (行 1324)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 1410) 与 utils\unifiedErrorSystem.ts (行 1411)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 1413) 与 utils\unifiedErrorSystem.ts (行 1414)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 1188) 与 utils\unifiedErrorSystem.ts (行 1421)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 811) 与 utils\unifiedErrorSystem.ts (行 1435)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 812) 与 utils\unifiedErrorSystem.ts (行 1436)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 813) 与 utils\unifiedErrorSystem.ts (行 1437)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 814) 与 utils\unifiedErrorSystem.ts (行 1438)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 815) 与 utils\unifiedErrorSystem.ts (行 1439)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 823) 与 utils\unifiedErrorSystem.ts (行 1450)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 20) 与 utils\unifiedPermissionManager.ts (行 20)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 296) 与 utils\unifiedPermissionManager.ts (行 297)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 350) 与 utils\unifiedPermissionManager.ts (行 351)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 467) 与 utils\unifiedPermissionManager.ts (行 353)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 468) 与 utils\unifiedPermissionManager.ts (行 354)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 481) 与 utils\unifiedPermissionManager.ts (行 370)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 482) 与 utils\unifiedPermissionManager.ts (行 371)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 469) 与 utils\unifiedPermissionManager.ts (行 470)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 505) 与 utils\unifiedPermissionManager.ts (行 506)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1078) 与 utils\unifiedPermissionManager.ts (行 508)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 528) 与 utils\unifiedPermissionManager.ts (行 529)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 478) 与 utils\unifiedPermissionManager.ts (行 537)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 479) 与 utils\unifiedPermissionManager.ts (行 538)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 501) 与 utils\unifiedPermissionManager.ts (行 560)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 502) 与 utils\unifiedPermissionManager.ts (行 561)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 503) 与 utils\unifiedPermissionManager.ts (行 562)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 504) 与 utils\unifiedPermissionManager.ts (行 563)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 505) 与 utils\unifiedPermissionManager.ts (行 564)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 505) 与 utils\unifiedPermissionManager.ts (行 565)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 507) 与 utils\unifiedPermissionManager.ts (行 566)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 582) 与 utils\unifiedPermissionManager.ts (行 583)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 590) 与 utils\unifiedPermissionManager.ts (行 591)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 641) 与 utils\unifiedPermissionManager.ts (行 642)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 653) 与 utils\unifiedPermissionManager.ts (行 654)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 888) 与 utils\unifiedPermissionManager.ts (行 657)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 463) 与 utils\unifiedPermissionManager.ts (行 658)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 891) 与 utils\unifiedPermissionManager.ts (行 660)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 471) 与 utils\unifiedPermissionManager.ts (行 668)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 754) 与 utils\unifiedPermissionManager.ts (行 700)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 755) 与 utils\unifiedPermissionManager.ts (行 701)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 756) 与 utils\unifiedPermissionManager.ts (行 702)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 782) 与 utils\unifiedPermissionManager.ts (行 789)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 425) 与 utils\unifiedPermissionManager.ts (行 799)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 426) 与 utils\unifiedPermissionManager.ts (行 800)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 758) 与 utils\unifiedPermissionManager.ts (行 833)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 759) 与 utils\unifiedPermissionManager.ts (行 834)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 760) 与 utils\unifiedPermissionManager.ts (行 835)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 425) 与 utils\unifiedPermissionManager.ts (行 845)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 426) 与 utils\unifiedPermissionManager.ts (行 846)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 778) 与 utils\unifiedPermissionManager.ts (行 865)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 760) 与 utils\unifiedPermissionManager.ts (行 866)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 878) 与 utils\unifiedPermissionManager.ts (行 879)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 881) 与 utils\unifiedPermissionManager.ts (行 882)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 884) 与 utils\unifiedPermissionManager.ts (行 885)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 887) 与 utils\unifiedPermissionManager.ts (行 888)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 995) 与 utils\unifiedPermissionManager.ts (行 996)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1211) 与 utils\unifiedPermissionManager.ts (行 1012)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1212) 与 utils\unifiedPermissionManager.ts (行 1013)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1213) 与 utils\unifiedPermissionManager.ts (行 1014)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1213) 与 utils\unifiedPermissionManager.ts (行 1015)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1218) 与 utils\unifiedPermissionManager.ts (行 1024)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1219) 与 utils\unifiedPermissionManager.ts (行 1025)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1219) 与 utils\unifiedPermissionManager.ts (行 1026)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1221) 与 utils\unifiedPermissionManager.ts (行 1027)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1222) 与 utils\unifiedPermissionManager.ts (行 1028)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1223) 与 utils\unifiedPermissionManager.ts (行 1029)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1224) 与 utils\unifiedPermissionManager.ts (行 1030)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1225) 与 utils\unifiedPermissionManager.ts (行 1031)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1226) 与 utils\unifiedPermissionManager.ts (行 1032)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1227) 与 utils\unifiedPermissionManager.ts (行 1033)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1141) 与 utils\unifiedPermissionManager.ts (行 1064)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 1078) 与 utils\unifiedPermissionManager.ts (行 1079)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 1091) 与 utils\unifiedPermissionManager.ts (行 1092)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 1129) 与 utils\unifiedPermissionManager.ts (行 1130)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1394) 与 utils\unifiedPermissionManager.ts (行 1231)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1395) 与 utils\unifiedPermissionManager.ts (行 1232)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1396) 与 utils\unifiedPermissionManager.ts (行 1233)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 1155) 与 utils\unifiedPermissionManager.ts (行 1253)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 1155) 与 utils\unifiedPermissionManager.ts (行 1254)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 1178) 与 utils\unifiedPermissionManager.ts (行 1297)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 21) 与 utils\userNotificationSystem.ts (行 31)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 33) 与 utils\userNotificationSystem.ts (行 49)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 47) 与 utils\userNotificationSystem.ts (行 63)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 83) 与 utils\userNotificationSystem.ts (行 95)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 87) 与 utils\userNotificationSystem.ts (行 99)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 88) 与 utils\userNotificationSystem.ts (行 100)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 247) 与 utils\userNotificationSystem.ts (行 248)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 253) 与 utils\userNotificationSystem.ts (行 254)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 290) 与 utils\userNotificationSystem.ts (行 291)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 380) 与 utils\userNotificationSystem.ts (行 321)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 336) 与 utils\userNotificationSystem.ts (行 337)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 346) 与 utils\userNotificationSystem.ts (行 347)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 349) 与 utils\userNotificationSystem.ts (行 350)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 362) 与 utils\userNotificationSystem.ts (行 363)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 213) 与 utils\userNotificationSystem.ts (行 410)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 407) 与 utils\userNotificationSystem.ts (行 423)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 408) 与 utils\userNotificationSystem.ts (行 424)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 409) 与 utils\userNotificationSystem.ts (行 425)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 197) 与 utils\userNotificationSystem.ts (行 426)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 228) 与 utils\userNotificationSystem.ts (行 442)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 407) 与 utils\userNotificationSystem.ts (行 455)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 408) 与 utils\userNotificationSystem.ts (行 456)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 409) 与 utils\userNotificationSystem.ts (行 457)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 196) 与 utils\userNotificationSystem.ts (行 488)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 197) 与 utils\userNotificationSystem.ts (行 489)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 198) 与 utils\userNotificationSystem.ts (行 490)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 199) 与 utils\userNotificationSystem.ts (行 491)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 200) 与 utils\userNotificationSystem.ts (行 492)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 201) 与 utils\userNotificationSystem.ts (行 493)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 202) 与 utils\userNotificationSystem.ts (行 494)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 203) 与 utils\userNotificationSystem.ts (行 495)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 204) 与 utils\userNotificationSystem.ts (行 496)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 205) 与 utils\userNotificationSystem.ts (行 497)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 206) 与 utils\userNotificationSystem.ts (行 498)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 207) 与 utils\userNotificationSystem.ts (行 499)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 208) 与 utils\userNotificationSystem.ts (行 500)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 209) 与 utils\userNotificationSystem.ts (行 501)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 210) 与 utils\userNotificationSystem.ts (行 502)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 211) 与 utils\userNotificationSystem.ts (行 503)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 547) 与 utils\userNotificationSystem.ts (行 548)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 550) 与 utils\userNotificationSystem.ts (行 551)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 566) 与 utils\userNotificationSystem.ts (行 567)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 544) 与 utils\userNotificationSystem.ts (行 570)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 545) 与 utils\userNotificationSystem.ts (行 571)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 584) 与 utils\userNotificationSystem.ts (行 585)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 590) 与 utils\userNotificationSystem.ts (行 591)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 705) 与 utils\userNotificationSystem.ts (行 706)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 758) 与 utils\userNotificationSystem.ts (行 752)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 763) 与 utils\userNotificationSystem.ts (行 764)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 451) 与 utils\userNotificationSystem.ts (行 845)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 845) 与 utils\userNotificationSystem.ts (行 847)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 872) 与 utils\userNotificationSystem.ts (行 873)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 835) 与 utils\userNotificationSystem.ts (行 876)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 886) 与 utils\userNotificationSystem.ts (行 887)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 850) 与 utils\userNotificationSystem.ts (行 888)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 851) 与 utils\userNotificationSystem.ts (行 889)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 852) 与 utils\userNotificationSystem.ts (行 890)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 900) 与 utils\userNotificationSystem.ts (行 901)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 864) 与 utils\userNotificationSystem.ts (行 902)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 879) 与 utils\userNotificationSystem.ts (行 904)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 902) 与 utils\userNotificationSystem.ts (行 920)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 866) 与 utils\userNotificationSystem.ts (行 922)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 876) 与 utils\userNotificationSystem.ts (行 932)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 877) 与 utils\userNotificationSystem.ts (行 933)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 904) 与 utils\userNotificationSystem.ts (行 935)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 905) 与 utils\userNotificationSystem.ts (行 936)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 907) 与 utils\userNotificationSystem.ts (行 938)
  - 相似度: 100.0%

- services\errorMonitoringService.ts (行 1188) 与 utils\userNotificationSystem.ts (行 943)
  - 相似度: 100.0%

- utils\votingSystemHelpers.ts (行 124) 与 utils\votingSystemHelpers.ts (行 149)
  - 相似度: 100.0%

- utils\votingSystemHelpers.ts (行 125) 与 utils\votingSystemHelpers.ts (行 150)
  - 相似度: 100.0%

- utils\votingSystemHelpers.ts (行 135) 与 utils\votingSystemHelpers.ts (行 160)
  - 相似度: 100.0%

- utils\votingSystemHelpers.ts (行 136) 与 utils\votingSystemHelpers.ts (行 161)
  - 相似度: 100.0%

## 建议

### 高优先级

1. 修复所有高严重程度的代码异味
2. 重构重复代码，提取公共函数或组件
3. 拆分过长的函数和类

### 中优先级

1. 减少代码嵌套深度
2. 优化函数参数列表
3. 增加代码注释覆盖率

### 低优先级

1. 统一代码风格
2. 优化导入导出结构
3. 提升整体可维护性指数

---

_报告由代码质量分析工具自动生成_
