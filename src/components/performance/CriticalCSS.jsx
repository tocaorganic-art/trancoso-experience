import React from "react";

/**
 * Critical CSS Component
 * Injeta CSS crítico inline no head para melhorar FCP
 */
export default function CriticalCSS() {
  React.useEffect(() => {
    // Criar style tag com CSS crítico
    const criticalStyles = document.createElement('style');
    criticalStyles.id = 'critical-css';
    criticalStyles.textContent = `
      /* Reset básico */
      *,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:currentColor}
      
      /* Body e HTML */
      html{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif}
      body{margin:0;line-height:inherit}
      
      /* Hero Section - Above the fold */
      .hero-section{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}
      
      /* Gradientes críticos */
      .bg-gradient-to-br{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}
      .from-gray-200{--tw-gradient-from:#e5e7eb;--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to, rgb(229 231 235 / 0))}
      .via-gray-100{--tw-gradient-stops:var(--tw-gradient-from),#f3f4f6,var(--tw-gradient-to, rgb(243 244 246 / 0))}
      .to-gray-300{--tw-gradient-to:#d1d5db}
      
      /* Texto crítico */
      .text-4xl{font-size:2.25rem;line-height:2.5rem}
      .font-bold{font-weight:700}
      .text-center{text-align:center}
      .text-gray-800{color:#1f2937}
      
      /* Botões críticos */
      .btn-primary{background:linear-gradient(to right,#374151,#111827);color:#fff;padding:1.5rem 2rem;border-radius:9999px;font-weight:700;transition:all .3s}
      .btn-primary:hover{transform:scale(1.05)}
      
      /* Layout sticky */
      .sticky{position:sticky;top:0;z-index:50}
      
      /* Ocultar conteúdo não crítico inicialmente */
      .defer-load{opacity:0;transition:opacity .3s}
      .defer-load.loaded{opacity:1}
    `;
    
    // Inserir no head se ainda não existir
    if (!document.getElementById('critical-css')) {
      document.head.insertBefore(criticalStyles, document.head.firstChild);
    }

    return () => {
      const existing = document.getElementById('critical-css');
      if (existing) existing.remove();
    };
  }, []);

  return null;
}