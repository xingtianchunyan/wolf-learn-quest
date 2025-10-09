/**
 * 简化的代码质量检查测试脚本
 */

import { execSync } from 'child_process';

console.log('🔍 开始代码质量检查...\n');

try {
  // 1. ESLint 检查
  console.log('📋 运行 ESLint 检查...');
  try {
    execSync('npx eslint src --ext .ts,.tsx', {
      encoding: 'utf8',
      stdio: 'inherit',
    });
    console.log('✅ ESLint 检查通过');
  } catch (error) {
    console.log('⚠️ ESLint 发现问题');
  }

  // 2. Prettier 检查
  console.log('\n🎨 运行 Prettier 检查...');
  try {
    execSync('npx prettier --check src', {
      encoding: 'utf8',
      stdio: 'inherit',
    });
    console.log('✅ Prettier 检查通过');
  } catch (error) {
    console.log('⚠️ Prettier 发现格式问题');
  }

  // 3. TypeScript 检查
  console.log('\n🔧 运行 TypeScript 检查...');
  try {
    execSync('npx tsc --noEmit', { encoding: 'utf8', stdio: 'inherit' });
    console.log('✅ TypeScript 检查通过');
  } catch (error) {
    console.log('⚠️ TypeScript 发现类型错误');
  }

  console.log('\n✅ 代码质量检查完成！');
} catch (error) {
  console.error('❌ 检查过程中出现错误:', error.message);
}
