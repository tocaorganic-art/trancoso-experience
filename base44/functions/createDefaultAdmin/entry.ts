/**
 * DESATIVADA.
 *
 * Esta função criava um admin com credencial fixa e apagava os admins existentes.
 * O acesso administrativo agora usa a autenticação da plataforma Base44 (role "admin"),
 * então nenhum provisionamento de senha é necessário. Mantida apenas para que a
 * rota antiga responda 410 em vez de executar qualquer ação.
 */
Deno.serve(() =>
  Response.json(
    { error: 'Função desativada. O acesso admin usa a autenticação da plataforma.' },
    { status: 410 }
  )
);
