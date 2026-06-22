/**
 * 文件级注释：角色设计数据 Hook
 * 负责加载 `role_design` 表，并提供基础名/实例名兼容的角色查询与图片解析能力。
 */
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import type { SkillEffects, RoleAttributes } from '@/utils/skillSystemHelpers';

export type RoleDesign = Tables<'role_design'> & {
  skill_effects?: SkillEffects;
  role_attributes?: RoleAttributes;
};

// 本地角色图片映射
const localRoleImages: Record<string, string> = {
  villager: '/images/roles/ac54f032-78b6-4c25-82ea-bf91f0d5b5d4.png',
  villager_1: '/images/roles/ac54f032-78b6-4c25-82ea-bf91f0d5b5d4.png',
  villager_2: '/images/roles/ac54f032-78b6-4c25-82ea-bf91f0d5b5d4.png',
  villager_3: '/images/roles/ac54f032-78b6-4c25-82ea-bf91f0d5b5d4.png',
  werewolf: '/images/roles/b7e85811-97ed-42e4-b429-c77c521745c5.png',
  werewolf_1: '/images/roles/b7e85811-97ed-42e4-b429-c77c521745c5.png',
  werewolf_2: '/images/roles/b7e85811-97ed-42e4-b429-c77c521745c5.png',
  witch: '/images/roles/3b9178d7-a547-49d9-9b2f-8e3e9feec92b.png',
  seer: '/images/roles/cce54aa8-77a3-40e7-b559-b3e3ddb09fc8.png',
  hunter: '/images/roles/4b736257-432f-4187-8dc5-431340a6f6e1.png',
  guard: '/images/roles/660dd11b-9896-444d-80b5-0a4371c8deef.png',
  whitewolf: '/images/roles/2f9b2a78-e79f-4025-9b11-5bc88a7df328.png',
  warlock: '/images/roles/392c9861-57a0-4522-93a0-07243faf284f.png',
  demon: '/images/roles/9ee3b412-7b6f-44bc-beac-bc8601f647ed.png',
};

/**
 * 函数级注释：提取角色基础名
 * 将 `villager_2` 这类实例名归一化为 `villager`，便于与数据库记录做兼容匹配。
 */
const getBaseRoleName = (roleName: string) => roleName.replace(/_\d+$/, '');

/**
 * 函数级注释：返回最匹配的角色设计
 * 优先精确匹配实例名，找不到时回退到相同基础名的角色设计。
 */
const findBestMatchingRoleDesign = (
  roleDesigns: RoleDesign[],
  roleName: string
): RoleDesign | undefined => {
  const exactMatch = roleDesigns.find(role => role.role_name === roleName);
  if (exactMatch) {
    return exactMatch;
  }

  const baseRoleName = getBaseRoleName(roleName);
  return roleDesigns.find(
    role =>
      role.role_name === baseRoleName ||
      getBaseRoleName(role.role_name) === baseRoleName
  );
};

/**
 * 函数级注释：读取角色设计数据并提供衍生查询能力
 */
export const useRoleDesigns = () => {
  const [roleDesigns, setRoleDesigns] = useState<RoleDesign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoleDesigns = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('role_design').select('*');
      if (error) {
        console.error('Error fetching role designs:', error);
      } else {
        // 安全地处理 JSONB 字段转换
        const processedData = (data || []).map(role => {
          // 直接使用 as RoleDesign 类型断言，避免复杂的类型转换
          const processedRole = {
            ...role,
            skill_effects: role.skill_effects
              ? (role.skill_effects as unknown as SkillEffects)
              : undefined,
            role_attributes: role.role_attributes
              ? (role.role_attributes as unknown as RoleAttributes)
              : undefined,
          } as RoleDesign;
          return processedRole;
        });
        setRoleDesigns(processedData);
      }
      setLoading(false);
    };

    fetchRoleDesigns();
  }, []);

  const getRoleByName = (name: string) => {
    return findBestMatchingRoleDesign(roleDesigns, name);
  };

  const getRoleImageUrl = (roleName: string) => {
    // 优先使用本地图片
    if (localRoleImages[roleName]) {
      return localRoleImages[roleName];
    }

    // 如果没有本地图片，尝试从 storage 获取
    const role = getRoleByName(roleName);
    if (!role || !role.role_image) {
      return null;
    }

    const { data } = supabase.storage
      .from('role-design')
      .getPublicUrl(role.role_image);

    return data.publicUrl;
  };

  // 根据角色设计ID获取本地图片URL
  const getLocalImageByDesignId = (roleDesignId: string) => {
    const roleDesign = roleDesigns.find(design => design.id === roleDesignId);
    if (!roleDesign) return null;

    return localRoleImages[roleDesign.role_name] || null;
  };

  // 获取角色的技能效果配置
  const getSkillEffects = (roleDesignId: string): SkillEffects | null => {
    const roleDesign = roleDesigns.find(design => design.id === roleDesignId);
    return roleDesign?.skill_effects || null;
  };

  // 获取角色的属性配置
  const getRoleAttributes = (roleDesignId: string): RoleAttributes | null => {
    const roleDesign = roleDesigns.find(design => design.id === roleDesignId);
    return roleDesign?.role_attributes || null;
  };

  // 根据阵营筛选角色
  const getRolesByFaction = (isWolfFaction: boolean): RoleDesign[] => {
    return roleDesigns.filter(role => role.faction === isWolfFaction);
  };

  // 获取好人阵营角色
  const getGoodRoles = (): RoleDesign[] => {
    return getRolesByFaction(false);
  };

  // 获取狼人阵营角色
  const getWolfRoles = (): RoleDesign[] => {
    return getRolesByFaction(true);
  };

  return {
    roleDesigns,
    loading,
    getRoleByName,
    getRoleImageUrl,
    getLocalImageByDesignId,
    getSkillEffects,
    getRoleAttributes,
    getRolesByFaction,
    getGoodRoles,
    getWolfRoles,
  };
};
