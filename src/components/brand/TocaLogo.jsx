import React from "react";

/**
 * Marca Toca Experience (kit oficial em /public/brand).
 * Regras:
 * - horizontal preserva SEMPRE ícone + nome juntos, na proporção nativa 2000/767;
 * - ícone sozinho existe apenas para favicon / app icon;
 * - fundo claro: positivo; fundo escuro: negativo; foto escura: mono branco;
 * - a largura vem de `width` (px) ou de classes utilitárias; a altura é sempre automática.
 * Não há conversão automática para ícone nem redução de largura mínima.
 */
const HORIZONTAL = {
  positivo: "/brand/logo-horizontal-positivo.png",
  negativo: "/brand/logo-horizontal-negativo.png",
  mono: "/brand/logo-horizontal-mono-branco.png",
};

const ICONE = {
  positivo: "/brand/icone-positivo.png",
  negativo: "/brand/icone-negativo.png",
  mono: "/brand/icone-negativo.png",
};

const PROPORCAO_HORIZONTAL = "2000 / 767";
const PROPORCAO_ICONE = "2000 / 1924";

export default function TocaLogo({
  variant = "negativo",
  layout = "horizontal",
  width,
  iconSize = 32,
  className = "",
  priority = false,
}) {
  const carregamento = priority ? "eager" : "lazy";

  // Ícone sozinho: reservado a favicon / app icon.
  if (layout === "icone") {
    return (
      <img
        src={ICONE[variant]}
        alt="Toca Experience"
        width={iconSize}
        height={Math.round((iconSize * 1924) / 2000)}
        className={"block object-contain " + className}
        style={{
          width: iconSize,
          height: "auto",
          aspectRatio: PROPORCAO_ICONE,
          objectFit: "contain",
          flexShrink: 0,
        }}
        loading={carregamento}
        decoding="async"
      />
    );
  }

  const larguraAtributo = width || 220;
  return (
    <img
      src={HORIZONTAL[variant]}
      alt="Toca Experience"
      width={larguraAtributo}
      height={Math.round((larguraAtributo * 767) / 2000)}
      className={"block max-w-full object-contain " + className}
      style={{
        ...(width ? { width } : null),
        height: "auto",
        aspectRatio: PROPORCAO_HORIZONTAL,
        objectFit: "contain",
        flexShrink: 0,
      }}
      loading={carregamento}
      decoding="async"
    />
  );
}