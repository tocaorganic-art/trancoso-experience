import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import puppeteer from 'npm:puppeteer@21.6.1';

/**
 * Scrape eventos da página EventosAnoNovo e atualiza banco de dados
 * Usa Puppeteer para renderizar SPA React e extrair dados
 * 
 * IMPORTANTE: Requer Puppeteer instalado no ambiente Deno Deploy
 * Alternativa: chamar externamente via Python/Playwright e fazer upload via CSV
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    // Verificar se é admin
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized - Admin only' }, { status: 401 });
    }

    const { mode = 'preview' } = await req.json();

    // Launch browser (headless)
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

    // Navigate to SPA route
    const targetUrl = 'https://tocaexperience.com.br/#/EventosAnoNovo';
    console.log('Abrindo:', targetUrl);
    
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForTimeout(3000);

    // Extract event data from rendered DOM
    const eventos = await page.evaluate(() => {
      const results = [];
      
      // Seletores adaptados ao EventoCard component
      const cards = document.querySelectorAll('.card-evento-toca, [class*="Card"]');
      
      cards.forEach((card, idx) => {
        try {
          const titleEl = card.querySelector('h3, .titulo, [class*="Title"]');
          const dateEl = card.querySelector('.data-box, time, [class*="date"]');
          const locationEl = card.querySelector('.local, [class*="location"], [class*="venue"]');
          const detailsEl = card.querySelector('p, .detalhes, [class*="detail"]');
          const imgEl = card.querySelector('img');
          const tagsEls = card.querySelectorAll('.tag-item, [class*="Badge"], [class*="tag"]');
          
          const title = titleEl?.textContent?.trim() || '';
          const date = dateEl?.textContent?.trim() || '';
          const location = locationEl?.textContent?.trim() || '';
          const details = detailsEl?.textContent?.trim() || '';
          const imageSrc = imgEl?.src || imgEl?.dataset?.src || '';
          const tags = Array.from(tagsEls).map(t => t.textContent.trim()).filter(Boolean);
          
          if (title && date) {
            results.push({
              nome: title,
              data: date,
              local: location,
              detalhes: details,
              imagem: imageSrc,
              tags: tags,
              source: 'scraper'
            });
          }
        } catch (err) {
          console.error('Erro ao processar card:', err);
        }
      });
      
      return results;
    });

    await browser.close();

    console.log(`Coletados ${eventos.length} eventos via scraper`);

    // Mode: preview (só retorna dados) ou import (salva no BD)
    if (mode === 'import') {
      let imported = 0;
      let skipped = 0;

      for (const evento of eventos) {
        try {
          // Verificar se já existe (por nome + data)
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
          console.error('Erro ao importar evento:', evento.nome, err);
        }
      }

      return Response.json({
        success: true,
        message: `Importação concluída: ${imported} novos, ${skipped} já existentes`,
        total: eventos.length,
        imported,
        skipped
      });
    }

    // Preview mode
    return Response.json({
      success: true,
      eventos,
      total: eventos.length,
      message: 'Preview - use mode: "import" para salvar no banco'
    });

  } catch (error) {
    console.error('Erro no scraper:', error);
    return Response.json({ 
      error: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
});