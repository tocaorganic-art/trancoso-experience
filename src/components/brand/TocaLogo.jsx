import React from "react";

/**
 * Marca "Toca em camadas": três arcos concêntricos (laranja, terracota e oliva)
 * com ponto central. Regras de legibilidade:
 * - o logo sempre leva ícone e nome juntos;
 * - horizontal nunca abaixo de 180px (abaixo disso: ícone + nome em HTML);
 * - vertical com tagline só a partir de 320px;
 * - altura abaixo de 48px usa o ícone reduzido (favicons);
 * - fundo claro: versão positiva; fundo escuro: negativa; foto escura: mono branco.
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

const VERTICAL = "/brand/logo-vertical-tagline-negativo-fundo.png";

const PROPORCAO_VERTICAL = 1983 / 2000;
const PROPORCAO_ICONE = 1924 / 2000;

const CORES_NOME = {
  positivo: "#241D16",
  negativo: "#F2DEC4",
  mono: "#FFFFFF",
};

export default function TocaLogo({
  variant = "negativo",
  layout = "horizontal",
  width,
  height,
  iconSize = 32,
  className = "",
  priority = false,
}) {
  const carregamento = priority ? "eager" : "lazy";
  let tipo = layout;

  // Altura abaixo de 48px: usa o ícone reduzido (versão de 2 arcos).
  if (height && height < 48) tipo = "icone";
  // Logo horizontal abaixo de 180px: ícone + nome em texto HTML.
  if (tipo === "horizontal" && width && width < 180) tipo = "compacto";

  if (tipo === "vertical") {
    const largura = Math.max(320, width || 320);
    const altura = Math.round(largura * PROPORCAO_VERTICAL);
    return (
      <img
        src={VERTICAL}
        alt="Toca Experience"
        width={largura}
        height={altura}
        className={"block object-contain " + className}
        style={{ width: largura, height: altura }}
        loading={carregamento}
      />
    );
  }

  if (tipo === "icone") {
    const lado = Math.max(24, iconSize || 32);
    const altura = Math.round(lado * PROPORCAO_ICONE);
    return (
      <img
        src={ICONE[variant]}
        alt="Toca Experience"
        width={lado}
        height={altura}
        className={"block object-contain " + className}
        style={{ width: lado, height: altura }}
        loading={carregamento}
      />
    );
  }

  if (tipo === "compacto") {
    const lado = Math.max(24, iconSize || 32);
    return (
      <span className={"inline-flex items-center gap-2 " + className}>
        <img
          src={ICONE[variant]}
          alt="Toca Experience"
          width={lado}
          height={Math.round(lado * PROPORCAO_ICONE)}
          className="block object-contain"
          style={{ width: lado, height: Math.round(lado * PROPORCAO_ICONE) }}
          loading={carregamento}
        />
        <span
          className="font-brand whitespace-nowrap text-base font-black leading-none"
          style={{ color: CORES_NOME[variant] }}
        >
          Toca Experience
        </span>
      </span>
    );
  }

  const largura = Math.max(180, width || 220);
  const altura = Math.round(largura * (767 / 2000));
  return (
    <img
      src={HORIZONTAL[variant]}
      alt="Toca Experience"
      width={largura}
      height={altura}
      className={"block object-contain " + className}
      style={{ width: largura, height: altura }}
      loading={carregamento}
    />
  );
}