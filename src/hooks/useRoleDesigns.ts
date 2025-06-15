
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type RoleDesign = Tables<'role_design'>;

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
        setRoleDesigns(data || []);
      }
      setLoading(false);
    };

    fetchRoleDesigns();
  }, []);

  const getRoleByName = (name: string) => {
    return roleDesigns.find(r => r.role_name === name);
  };

  return { roleDesigns, loading, getRoleByName };
};
