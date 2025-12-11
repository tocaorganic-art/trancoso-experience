import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * Importa eventos de CSV/JSON gerado pelo script Python/Playwright
 * Endpoint para upload de arquivo events.csv ou events.json
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    // Verificar se é admin
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized - Admin only' }, { status: 401 });
    }

    const { eventos, mode = 'preview' } = await req.json();

    if (!eventos || !Array.isArray(eventos)) {
      return Response.json({ error: 'Campo "eventos" obrigatório (array)' }, { status: 400 });
    }

    // Mapear campos do CSV para schema do EventoAnoNovo
    const mappedEventos = eventos.map(ev => ({
      nome: ev.EventName || ev.nome || '',
      data: ev.Date || ev.data || '',
      localidade: extractLocalidade(ev.Venue || ev.local || ''),
      local: ev.Venue || ev.local || '',
      detalhes: ev.Description || ev.detalhes || '',
      imagem: ev.PhotoURL || ev.imagem || '',
      link_compra: ev.DetailLink || ev.link_compra || '',
      tags: parseTags(ev.Tags || ev.tags),
      status: 'Confirmado'
    })).filter(ev => ev.nome && ev.data);

    console.log(`Mapeados ${mappedEventos.length} eventos válidos`);

    // Preview mode: apenas retorna mapeados
    if (mode === 'preview') {
      return Response.json({
        success: true,
        eventos: mappedEventos,
        total: mappedEventos.length,
        message: 'Preview - use mode: "import" para salvar no banco'
      });
    }

    // Import mode: salva no banco
    let imported = 0;
    let skipped = 0;
    let errors = [];

    for (const evento of mappedEventos) {
      try {
        // Verificar duplicata (nome + data)
        const existing = await base44.asServiceRole.entities.EventoAnoNovo.filter({
          nome: evento.nome,
          data: evento.data
        });

        if (existing.length === 0) {
          await base44.asServiceRole.entities.EventoAnoNovo.create(evento);
          imported++;
        } else {
          skipped++;
        }
      } catch (err) {
        errors.push({ evento: evento.nome, error: err.message });
      }
    }

    return Response.json({
      success: true,
      message: `Importação concluída: ${imported} novos, ${skipped} já existentes`,
      imported,
      skipped,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Erro no import:', error);
    return Response.json({ 
      error: error.message 
    }, { status: 500 });
  }
});

// Helper: extrair localidade do texto do venue
function extractLocalidade(venue) {
  const texto = venue.toLowerCase();
  if (texto.includes('caraíva') || texto.includes('caraiva')) return 'Caraíva';
  if (texto.includes('trancoso')) return 'Trancoso';
  if (texto.includes('arraial')) return 'Arraial d\'Ajuda';
  return 'Trancoso'; // default
}

// Helper: parse tags de string ou array
function parseTags(tags) {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') {
    return tags.split(',').map(t => t.trim()).filter(Boolean);
  }
  return [];
}