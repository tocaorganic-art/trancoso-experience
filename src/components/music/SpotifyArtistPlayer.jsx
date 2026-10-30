import React from "react";

const ARTIST_URL = "https://open.spotify.com/artist/2r4S2RPdfnx7UPL73jJWlQ";
const EMBED_SRC =
  "https://open.spotify.com/embed/artist/2r4S2RPdfnx7UPL73jJWlQ?utm_source=generator&theme=0";

/**
 * Player oficial do Spotify de Tony Monteiro (iframe oficial, sem autoplay).
 * No celular ocupa 100% da largura; a partir de sm fica compacto (até 380px),
 * com link direto para o perfil caso o embed seja bloqueado.
 */
export default function SpotifyArtistPlayer({ className = "" }) {
  return (
    <div className={`w-full max-w-full sm:max-w-[380px] ${className}`}>
      <iframe
        title="Ouça Tony Monteiro no Spotify"
        src={EMBED_SRC}
        width="100%"
        height="152"
        frameBorder="0"
        allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: "12px", display: "block", maxWidth: "100%", border: 0 }}
      />
      <a
        href={ARTIST_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex min-h-[44px] items-center text-sm font-semibold underline underline-offset-4"
        style={{ color: "var(--ds-color-areia)" }}
      >
        Ouvir Tony Monteiro no Spotify
      </a>
    </div>
  );
}