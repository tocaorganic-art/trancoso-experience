import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const EVENTOS_DESTAQUE = [
  {
    id: "reveillon-elemental-trancoso-2026",
    title: "Réveillon Elemental Trancoso 2026",
    date: "27/12 - 02/01",
    location: "Almar Trancoso, Trancoso - BA",
    description: "O Réveillon Elemental Trancoso te convida a celebrar o tempo e acender uma nova era de experiências premium...",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200",
    ticketsUrl: "https://www.ingresse.com/elemental-trancoso/",
    officialUrl: "https://www.instagram.com/elementaltrancoso/"
  },
  {
    id: "awe-reveillon-caraiva-2026",
    title: "AWÊ Réveillon Caraíva 2026",
    date: "27/12 - 03/01",
    location: "Casa Incrível, Caraíva - BA",
    description: "10 anos de AWÊ celebrando a cultura, música e energia de Caraíva com uma programação incrível.",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200",
    ticketsUrl: "https://www.ingresse.com/awe-reveillon/",
    officialUrl: "https://www.instagram.com/awereveillon/"
  },
  {
    id: "reveillon-so-coisas-boas",
    title: "Réveillon Só Coisas Boas",
    date: "30/12 - 03/01",
    location: "Hayô Praia, Arraial d'Ajuda - BA",
    description: "Grande evento de Réveillon em Arraial d'Ajuda com a melhor energia e line-up especial.",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200",
    ticketsUrl: "https://www.ticketmaker.com.br/reveillon-so-coisas-boas",
    officialUrl: "https://www.instagram.com/reveillonsocoisasboas/"
  },
  {
    id: "reveillon-ayumar-2026",
    title: "Réveillon Ayumar 2026",
    date: "28/12 - 02/01",
    location: "Clube de Voo, Trancoso - BA",
    description: "Novo evento premium em Trancoso, uma experiência única de Réveillon com código especial toca-organic.",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200",
    ticketsUrl: "https://zig.tickets/eventos/reveillon-ayumar?code=toca-organic",
    officialUrl: "#"
  }
];

export default function EventosDestaque() {
  return (
    <section className="bg-[#1A1A1A] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Eventos em Destaque
          </h2>
          <p className="text-gray-300 text-lg">
            Descubra os principais eventos de Réveillon 2026 em Trancoso, Caraíva e Arraial d'Ajuda
          </p>
        </motion.div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENTOS_DESTAQUE.map((evento, index) => (
            <motion.div
              key={evento.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-96 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              {/* Background Image com Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url('${evento.imageUrl}')` }}
              >
                {/* Overlay escuro */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
              </div>

              {/* Conteúdo */}
              <div className="relative h-full flex flex-col justify-between p-6 text-white">
                {/* Data */}
                <div className="bg-white/10 backdrop-blur-sm rounded px-3 py-1 w-fit">
                  <p className="text-sm font-semibold">{evento.date}</p>
                </div>

                {/* Título e Local */}
                <div>
                  <h3 className="text-2xl font-bold mb-2 line-clamp-2">
                    {evento.title}
                  </h3>
                  <p className="text-gray-200 text-sm mb-2">{evento.location}</p>
                  <p className="text-gray-300 text-xs mb-4 line-clamp-2">{evento.description}</p>

                  {/* CTAs */}
                  <div className="flex gap-2">
                    <Button
                      asChild
                      className="bg-[#A00000] hover:bg-[#8B0000] text-white"
                    >
                      <a href={evento.ticketsUrl} target="_blank" rel="noopener noreferrer">
                        Ver Ingressos
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    {evento.officialUrl !== "#" && (
                      <Button
                        asChild
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        <a href={evento.officialUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}