import React from "react";
import { motion } from "framer-motion";
import { Newspaper, ExternalLink, Disc3, MapPin, Globe } from "lucide-react";

// Curadoria de notícias da cena Afro House / Organic House.
// Atualizada manualmente com fontes verificadas da internet em outubro de 2026.
const NEWS = [
  {
    icon: Disc3,
    badge: "Lançamento",
    title: "Keinemusik lança 'Be The One' com SG Lewis",
    description:
      "Adam Port, SG Lewis e Keinemusik uniram forças no single 'Be The One', lançado em abril de 2026 pelo selo Keinemusik.",
    source: { label: "Apple Music", url: "https://music.apple.com/us/album/be-the-one-single/1889517554" }
  },
  {
    icon: Disc3,
    badge: "Lançamento",
    title: "Rampa e &ME remixam Moderat",
    description:
      "O duo do Keinemusik assina o remix de 'More Love', terceiro single do álbum da Moderat, disponível em todas as plataformas.",
    source: { label: "Keinemusik", url: "https://keinemusik.com/releases/" }
  },
  {
    icon: Globe,
    badge: "Lançamento",
    title: "AMÉMÉ lança 'Chulo' após temporada em Ibiza",
    description:
      "O produtor da África Ocidental encerra o verão europeu com a nova track, que já animava seus sets na ilha.",
    source: { label: "We Go Out", url: "https://wegoout.com.br/noticias/ameme-chulo" }
  },
  {
    icon: MapPin,
    badge: "Turnês",
    title: "Keinemusik estreia em novos destinos",
    description:
      "&ME toca pela primeira vez em Santo Domingo no dia 31 de outubro, o coletivo desembarca no Quênia e volta ao The Warehouse Project com &ME vs Rampa.",
    source: { label: "Keinemusik", url: "https://keinemusik.com/" }
  },
  {
    icon: Newspaper,
    badge: "Outubro 2026",
    title: "Lançamentos do mês no Afro House",
    description:
      "Entre as tracks em rotação nas playlists do gênero: 'With You' de Bensai, 'Bodies' de Native P. & Kasango & DJ RONN e 'We Move, We Dance' de Dems.",
    source: { label: "Apple Music", url: "https://music.apple.com/us/playlist/afro-house-2026/pl.76d32f712e4a4bd28b15b6622b939553" }
  },
  {
    icon: MapPin,
    badge: "Brasil",
    title: "Cena nacional em alta",
    description:
      "O Afro House segue dominando a agenda paulista e os festivais do país, com o estilo consolidado como trilha dos eventos premium da temporada.",
    source: { label: "Alataj", url: "https://www.alataj.com.br" }
  }
];

export default function NewsSection() {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Newspaper className="w-6 h-6 text-[#FFD700]" />
          <span className="bg-gradient-to-r from-[#FFD700] to-[#40E0D0] bg-clip-text text-transparent">
            Novidades da Cena
          </span>
        </h2>
        <span className="hidden sm:inline-flex items-center bg-[#FFD700]/10 text-[#FFD700] px-3 py-1 rounded-full text-xs border border-[#FFD700]/30">
          Atualizado em outubro de 2026
        </span>
      </div>
      <p className="text-gray-500 text-sm mb-6">
        O que está movimentando o Afro House e o Organic House agora, selecionado por Tony Monteiro e Enzo Furtado.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {NEWS.map((news, idx) => (
          <motion.a
            key={news.title}
            href={news.source.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06 }}
            className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-[#FFD700]/50 rounded-xl p-5 flex flex-col transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#FFD700]/10 text-[#FFD700] px-2.5 py-1 rounded-full text-[11px] border border-[#FFD700]/25">
                <news.icon className="w-3 h-3" />
                {news.badge}
              </span>
              <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-[#FFD700] transition-colors" />
            </div>
            <h3 className="text-white font-semibold leading-snug mb-2 group-hover:text-[#FFD700] transition-colors">
              {news.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed flex-1">{news.description}</p>
            <p className="text-gray-600 text-xs mt-4">Fonte: {news.source.label}</p>
          </motion.a>
        ))}
      </div>
    </div>
  );
}