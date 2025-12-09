import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * Gera sitemap.xml dinâmico para Google Search Console
 * Inclui todas as páginas estáticas + páginas dinâmicas (blog posts, eventos)
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Páginas estáticas com prioridade e frequência de atualização
    const staticPages = [
      { url: '', priority: 1.0, changefreq: 'daily' }, // Home
      { url: 'CasamentosTrancoso', priority: 0.9, changefreq: 'weekly' },
      { url: 'EventosCorporativos', priority: 0.9, changefreq: 'weekly' },
      { url: 'AluguelEquipamentos', priority: 0.8, changefreq: 'weekly' },
      { url: 'LocacaoSom', priority: 0.8, changefreq: 'weekly' },
      { url: 'EventosAnoNovo', priority: 0.9, changefreq: 'daily' },
      { url: 'Curadoria', priority: 0.7, changefreq: 'daily' },
      { url: 'Discografia', priority: 0.7, changefreq: 'monthly' },
      { url: 'Eventos', priority: 0.8, changefreq: 'weekly' },
      { url: 'Ethos', priority: 0.6, changefreq: 'monthly' },
      { url: 'Cotacao', priority: 0.8, changefreq: 'monthly' },
      { url: 'PoliticaPrivacidade', priority: 0.3, changefreq: 'yearly' },
      { url: 'TermosServico', priority: 0.3, changefreq: 'yearly' }
    ];

    // Buscar blog posts publicados
    let blogPosts = [];
    try {
      const posts = await base44.asServiceRole.entities.BlogPost.filter({ published: true });
      blogPosts = posts.map(post => ({
        url: `BlogPost?slug=${post.slug}`,
        priority: 0.7,
        changefreq: 'weekly',
        lastmod: post.updated_date || post.created_date
      }));
    } catch (error) {
      console.log('Nenhum blog post encontrado:', error.message);
    }

    // Buscar eventos de Ano Novo
    let eventos = [];
    try {
      const eventosData = await base44.asServiceRole.entities.EventoAnoNovo.list();
      eventos = eventosData.slice(0, 50).map(evento => ({
        url: `EventosAnoNovo#evento-${evento.id}`,
        priority: 0.8,
        changefreq: 'daily',
        lastmod: evento.updated_date || evento.created_date
      }));
    } catch (error) {
      console.log('Nenhum evento encontrado:', error.message);
    }

    // Combinar todas as URLs
    const allPages = [...staticPages, ...blogPosts, ...eventos];

    // Gerar XML do sitemap
    const baseUrl = 'https://tocaexperience.com.br';
    const now = new Date().toISOString();

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    allPages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/${page.url}</loc>\n`;
      xml += `    <lastmod>${page.lastmod || now}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    });

  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});