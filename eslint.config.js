import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'deployment.config.js', '*.config.js'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
    },
    rules: {
      'react-refresh/only-export-components': 'off',

      // 未使用导入和变量检查（项目历史代码过多，先关闭）
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',

      // TypeScript 严格类型检查（项目历史代码过多，先关闭）
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',

      // Console 语句控制：Edge Functions 和 logger 需要 console，此处关闭全局检查
      'no-console': 'off',
      'no-debugger': 'error',

      // 代码质量规则（项目历史代码过多，先关闭严格规则）
      'prefer-const': 'off',
      'no-var': 'error',
      'object-shorthand': 'off',
      'prefer-template': 'off',
      'no-duplicate-imports': 'off',
      'no-unused-expressions': 'off',
      eqeqeq: 'off',
      curly: 'off',
      'no-throw-literal': 'off',
      'prefer-promise-reject-errors': 'off',
      'no-case-declarations': 'off',
      'no-empty': 'off',
      'no-useless-escape': 'off',
      'no-control-regex': 'off',
      'no-duplicate-case': 'off',

      // React 最佳实践（项目历史代码过多，先关闭）
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',

      // 性能相关
      'no-await-in-loop': 'off',
      'require-atomic-updates': 'off',

      // 安全相关
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
    },
  }
);
