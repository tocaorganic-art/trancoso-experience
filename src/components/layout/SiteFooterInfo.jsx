import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ECOSYSTEM_LINKS } from "@/components/layout/EcosystemHub";

// Bloco de rodapé: links do ecossistema, páginas legais e dados cadastrais.
// Dados cadastrais conforme comprovante CNPJ de 19/08/2026. Confirmar em fonte
// oficial atual antes de ampliar (endereço/complemento ainda pendente de conferência).
export default function SiteFooterInfo() {
  const linkStyle = { color: "var(--toca-link)" };
  return (
    <div className="mt-4 space-y-3 text-xs" style={{ color: "var(--toca-text-muted)" }}>
      <nav aria-label="Marcas e serviços Toca">
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {ECOSYSTEM_LINKS.filter((i) => !i.current).map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.name} (abre em nova aba)`}
                className="underline"
                style={linkStyle}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="Páginas legais">
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <li>
            <RouterLink to={createPageUrl("PoliticaPrivacidade")} className="underline" style={linkStyle}>
              Política de Privacidade
            </RouterLink>
          </li>
          <li>
            <RouterLink to={createPageUrl("TermosServico")} className="underline" style={linkStyle}>
              Termos de Serviço
            </RouterLink>
          </li>
        </ul>
      </nav>
      <p>
        TOCA EXPERIENCE INOVA SIMPLES (I.S.) · CNPJ 68.662.845/0001-86 · Trancoso, Porto Seguro/BA
      </p>
      <p>© {new Date().getFullYear()} Toca Experience. Todos os direitos reservados.</p>
    </div>
  );
}
