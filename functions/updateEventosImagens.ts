import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * Atualiza eventos com imagens genéricas de alta qualidade do Unsplash
 * Baseado na localidade do evento (Trancoso, Caraíva, Arraial d'Ajuda)
 */

const IMAGENS_LOCALIDADES = {
  'Trancoso': [
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&h=1080&fit=crop'
  ],
  'Caraíva': [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1520443240718-fce21cc9e5d1?w=1920&h=1080&fit=crop'
  ],
  "Arraial d'Ajuda": [
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1920&h=1080&fit=crop'
  ]
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized - Admin only' }, { status: 401 });
    }

    // Buscar todos os eventos sem imagem
    const eventos = await base44.asServiceRole.entities.EventoAnoNovo.list();
    
    let updated = 0;
    let skipped = 0;

    for (const evento of eventos) {
      // Pula se já tem imagem válida
      if (evento.imagem && evento.imagem.startsWith('http')) {
        skipped++;
        continue;
      }

      // Seleciona imagem baseada na localidade
      const imagens = IMAGENS_LOCALIDADES[evento.localidade] || IMAGENS_LOCALIDADES['Trancoso'];
      const imagemUrl = imagens[Math.floor(Math.random() * imagens.length)];

      // Atualiza o evento
      await base44.asServiceRole.entities.EventoAnoNovo.update(evento.id, {
        imagem: imagemUrl
      });

      updated++;
    }

    return Response.json({
      success: true,
      message: `${updated} eventos atualizados com imagens, ${skipped} já tinham imagens`,
      total: eventos.length
    });

  } catch (error) {
    console.error('Erro ao atualizar imagens:', error);
    return Response.json({ 
      error: error.message 
    }, { status: 500 });
  }
});