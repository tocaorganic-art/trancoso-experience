// Player flutuante do Spotify: cole aqui o link de compartilhamento da playlist.
// Enquanto o valor for o placeholder (vazio), o player fica oculto.
// Exemplo: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M?si=abc123"
export const SPOTIFY_PLAYLIST_URL = "";

// Converte um link normal de compartilhamento em URI de embed do Spotify.
export function toEmbedUri(url) {
  if (!url) return "";
  const match = url.match(/open\.spotify\.com\/(?:intl-[a-z]{2}\/)?playlist\/([A-Za-z0-9]+)/);
  if (!match) return "";
  return `https://open.spotify.com/embed/playlist/${match[1]}?utm_source=generator&theme=0`;
}