import React from "react";
import simboloArco from "@/assets/brand/concierge/simbolo-arco.png";

/**
 * Identidade oficial Toca Experience:
 * emblema circular dourado (casa com brilho, "ECOSYSTEM" contornando o círculo)
 * + wordmark "TOCA" (Newsreader) sobre "EXPERIENCE" (Manrope).
 */
export default function TocaLogo({ size = 40, wordmark = true, className = "" }) {
  return (
    <span className={"inline-flex items-center gap-2.5 " + className}>
      <img
        src={simboloArco}
        alt=""
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size, height: size }}
      />
      {wordmark && (
        <span className="hidden flex-col justify-center leading-none sm:flex">
          <span
            style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: Math.round(size * 0.62),
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: "#F2DEC4",
            }}
          >
            TOCA
          </span>
          <span
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: Math.max(8, Math.round(size * 0.26)),
              fontWeight: 600,
              letterSpacing: "0.42em",
              color: "#D6B680",
              marginTop: Math.round(size * 0.1),
              marginRight: "-0.42em",
            }}
          >
            EXPERIENCE
          </span>
        </span>
      )}
    </span>
  );
}