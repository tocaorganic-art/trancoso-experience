import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * Verificação de acesso administrativo.
 *
 * A autenticação é feita pela plataforma Base44 (sessão do usuário). Esta função
 * apenas confirma, no servidor, que o chamador autenticado tem role "admin".
 * Não há senha, token caseiro nem credencial fixa neste arquivo.
 *
 * Ação suportada:
 *   { "action": "verify" } -> 200 { success, admin } | 401 | 403
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me().catch(() => null);
    if (!user) {
      return Response.json({ error: 'Não autenticado' }, { status: 401 });
    }
    if (user.role !== 'admin') {
      return Response.json({ error: 'Acesso restrito a administradores' }, { status: 403 });
    }

    const { action } = await req.json().catch(() => ({}));
    if (action !== 'verify') {
      return Response.json({ error: 'Ação inválida' }, { status: 400 });
    }

    return Response.json({
      success: true,
      admin: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Erro em adminAuth:', error?.message);
    return Response.json({ error: 'Erro interno' }, { status: 500 });
  }
});
