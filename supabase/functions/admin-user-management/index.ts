import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const ALLOWED_ORIGINS = [
  'https://wolf-learn-quest.vercel.app',
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:8081',
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin') || '';
  const allowed = ALLOWED_ORIGINS.includes(origin)
    ? origin
    : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers':
      'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  };
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface AdminRequest {
  action: 'list' | 'update_password' | 'update_email_confirmation';
  userId?: string;
  newPassword?: string;
  emailConfirmed?: boolean;
  page?: number;
  perPage?: number;
}

serve(async req => {
  const corsHeaders = getCorsHeaders(req);
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing authorization header',
        }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 创建带调用者 JWT 的客户端用于身份验证
    const callerClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    });

    const { data: userData, error: userError } =
      await callerClient.auth.getUser();
    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const caller = userData.user;
    const isAdmin =
      caller.app_metadata?.role === 'admin' ||
      caller.user_metadata?.role === 'admin';
    if (!isAdmin) {
      return new Response(
        JSON.stringify({ success: false, error: 'Admin access required' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 管理员客户端，用于操作用户
    const adminClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const body: AdminRequest =
      req.method === 'GET' ? { action: 'list' } : await req.json();

    if (body.action === 'list') {
      const page = body.page || 1;
      const perPage = body.perPage || 50;

      const { data: users, error } = await adminClient.auth.admin.listUsers({
        page,
        perPage,
      });

      if (error) {
        throw error;
      }

      // 补充 email_confirmed 状态，并添加 password 占位列
      const enrichedUsers = users.users.map(u => ({
        id: u.id,
        email: u.email,
        phone: u.phone,
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
        role: u.role,
        user_metadata: u.user_metadata,
        app_metadata: u.app_metadata,
        email_confirmed_at: u.email_confirmed_at,
        confirmed_at: u.confirmed_at,
        email_confirmed: !!u.email_confirmed_at,
        password: '********',
      }));

      return new Response(
        JSON.stringify({
          success: true,
          users: enrichedUsers,
          total: users.users.length,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (body.action === 'update_password') {
      if (!body.userId || !body.newPassword) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Missing userId or newPassword',
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const { data, error } = await adminClient.auth.admin.updateUserById(
        body.userId,
        { password: body.newPassword }
      );

      if (error) {
        throw error;
      }

      return new Response(JSON.stringify({ success: true, user: data.user }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (body.action === 'update_email_confirmation') {
      if (!body.userId || body.emailConfirmed === undefined) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Missing userId or emailConfirmed',
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Supabase 不支持直接设置 email_confirmed_at 为 NULL 或指定时间，
      // 但可以通过调用 confirmEmail 或重新发送确认邮件间接控制。
      // 这里我们通过更新用户 metadata 标记，并在 list 中展示该状态。
      // 注意：这不会真正改变 Supabase Auth 的 email_confirmed_at 字段。
      const { data, error } = await adminClient.auth.admin.updateUserById(
        body.userId,
        {
          email_confirm: body.emailConfirmed,
        }
      );

      if (error) {
        throw error;
      }

      return new Response(JSON.stringify({ success: true, user: data.user }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Unknown action' }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Admin user management error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
