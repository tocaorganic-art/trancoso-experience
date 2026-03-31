import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const prompts = {
      casamento: "Ultra realistic, premium wedding setup on Trancoso beach at golden hour, elegant white decoration, ocean view, tropical paradise, soft romantic lighting, luxury destination wedding, 8K quality, professional photography",
      
      reveillon: "Luxury New Year's Eve party celebration in Trancoso, golden and champagne colors, fireworks in the night sky, elegant crowd silhouettes, premium beach club atmosphere, festive lights, ultra realistic, 8K quality",
      
      corporativo: "Modern elegant corporate event space, professional business cocktail party, sophisticated lighting, minimalist luxury interior, Trancoso contemporary design, high-end networking event, ultra realistic, 8K quality",
      
      afrohouse: "Vibrant Afro House music festival at sunset, DJ decks with vinyl records, tropical beach party atmosphere, energetic crowd dancing, warm sunset colors, professional event photography, ultra realistic, 8K quality",
      
      gastronomia: "Fine dining experience in premium Trancoso restaurant, elegant table setting, gourmet cuisine presentation, ambient candlelight, sophisticated tropical atmosphere, luxury gastronomy, ultra realistic, 8K quality"
    };

    const images = {};

    // Gerar cada imagem
    for (const [variant, prompt] of Object.entries(prompts)) {
      const result = await base44.integrations.Core.GenerateImage({ prompt });
      images[variant] = result.url;
    }

    return Response.json({
      success: true,
      images,
      message: '5 imagens geradas com sucesso'
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});