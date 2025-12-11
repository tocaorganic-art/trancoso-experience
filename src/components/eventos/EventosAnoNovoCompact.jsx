import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const eventos = [
  // 26 DEZ
  {data:"26 DEZ", dia:"sexta-feira, 26 de dezembro", titulo:"Alta classe - Bem-vindo", local:"Trancoso", venue:"Trancoso (a confirmar)", tags:["Trancoso"]},
  
  // 27 DEZ
  {data:"27 DEZ", dia:"sábado, 27 de dezembro", titulo:"AWÊ Réveillon Caraíva 2026", local:"Caraíva", venue:"Casa Incrível", tags:["Caraíva"]},
  {data:"27 DEZ", dia:"sábado, 27 de dezembro", titulo:"Réveillon Sal de Caraíva 2026", local:"Caraíva", venue:"Caraíva", tags:["Caraíva"]},
  {data:"27 DEZ", dia:"sábado, 27 de dezembro", titulo:"Réveillon Elemental Trancoso 2026", local:"Trancoso", venue:"Almar Trancoso", tags:["Trancoso"]},
  {data:"27 DEZ", dia:"sábado, 27 de dezembro", titulo:"GoodTimes por Illusionize", local:"Caraíva", venue:"Praia incrível", tags:["Caraíva"]},
  {data:"27 DEZ", dia:"sábado, 27 de dezembro", titulo:"Alta - dhb", local:"Trancoso", venue:"Trancoso", tags:["Trancoso"]},
  
  // 28 DEZ
  {data:"28 DEZ", dia:"domingo, 28 de dezembro", titulo:"Réveillon Sal de Caraíva 2026", local:"Caraíva", venue:"Caraíva", tags:["Caraíva"]},
  {data:"28 DEZ", dia:"domingo, 28 de dezembro", titulo:"Réveillon Ayumar 2026", local:"Trancoso", venue:"Clube de Voo Trancoso", tags:["Trancoso"]},
  {data:"28 DEZ", dia:"domingo, 28 de dezembro", titulo:"Réveillon Elemental Trancoso 2026", local:"Trancoso", venue:"Almar Trancoso", tags:["Trancoso"]},
  {data:"28 DEZ", dia:"domingo, 28 de dezembro", titulo:"Alta Costura - Nós Amamos", local:"Trancoso", venue:"Trancoso", tags:["Trancoso"]},
  {data:"28 DEZ", dia:"domingo, 28 de dezembro", titulo:"Festival de Sundance 2026", local:"Arraial d'Ajuda", venue:"Arraial d'Ajuda", tags:["Arraial"]},
  
  // 29 DEZ
  {data:"29 DEZ", dia:"segunda-feira, 29 de dezembro", titulo:"Réveillon Sal de Caraíva 2026", local:"Caraíva", venue:"Caraíva", tags:["Caraíva"]},
  {data:"29 DEZ", dia:"segunda-feira, 29 de dezembro", titulo:"Réveillon Elemental Trancoso 2026", local:"Trancoso", venue:"Almar Trancoso", tags:["Trancoso"]},
  {data:"29 DEZ", dia:"segunda-feira, 29 de dezembro", titulo:"Alta - Saravá", local:"Trancoso", venue:"Trancoso", tags:["Trancoso"]},
  {data:"29 DEZ", dia:"segunda-feira, 29 de dezembro", titulo:"Sundance - Réveillon Arraial 2026", local:"Arraial d'Ajuda", venue:"Arraial d'Ajuda", tags:["Arraial"]},
  
  // 30 DEZ
  {data:"30 DEZ", dia:"terça-feira, 30 de dezembro", titulo:"AWÊ Réveillon Caraíva 2026", local:"Caraíva", venue:"Casa Incrível", tags:["Caraíva"]},
  {data:"30 DEZ", dia:"terça-feira, 30 de dezembro", titulo:"O telhado", local:"Caraíva", venue:"Caraíva", tags:["Caraíva"]},
  {data:"30 DEZ", dia:"terça-feira, 30 de dezembro", titulo:"Réveillon Ayumar 2026", local:"Trancoso", venue:"Clube de Voo Trancoso", tags:["Trancoso"]},
  {data:"30 DEZ", dia:"terça-feira, 30 de dezembro", titulo:"Réveillon Elemental Trancoso 2026", local:"Trancoso", venue:"Almar Trancoso", tags:["Trancoso"]},
  {data:"30 DEZ", dia:"terça-feira, 30 de dezembro", titulo:"Alto - Oboé", local:"Trancoso", venue:"Trancoso", tags:["Trancoso"]},
  {data:"30 DEZ", dia:"terça-feira, 30 de dezembro", titulo:"Mahal Zé Barbudo", local:"Trancoso", venue:"Trancoso", tags:["Trancoso"]},
  {data:"30 DEZ", dia:"terça-feira, 30 de dezembro", titulo:"Festival de Sundance 2026", local:"Arraial d'Ajuda", venue:"Arraial d'Ajuda", tags:["Arraial"]},
  {data:"30 DEZ", dia:"terça-feira, 30 de dezembro", titulo:"Réveillon Só Coisas Boas", local:"Arraial d'Ajuda", venue:"Hayô Praia", tags:["Arraial"]},
  
  // 31 DEZ
  {data:"31 DEZ", dia:"quarta-feira, 31 de dezembro", titulo:"AWÊ Réveillon Caraíva 2026", local:"Caraíva", venue:"Casa Incrível", tags:["Caraíva","Réveillon"]},
  {data:"31 DEZ", dia:"quarta-feira, 31 de dezembro", titulo:"Réveillon Elemental Trancoso 2026", local:"Trancoso", venue:"Almar Trancoso", tags:["Trancoso","Réveillon"]},
  {data:"31 DEZ", dia:"quarta-feira, 31 de dezembro", titulo:"Réveillon Sal de Caraíva 2026", local:"Caraíva", venue:"Caraíva", tags:["Caraíva","Réveillon"]},
  {data:"31 DEZ", dia:"quarta-feira, 31 de dezembro", titulo:"VIVA Caraíva 2026", local:"Caraíva", venue:"Frente Mar", tags:["Caraíva","Réveillon"]},
  {data:"31 DEZ", dia:"quarta-feira, 31 de dezembro", titulo:"Réveillon Ayumar 2026", local:"Trancoso", venue:"Clube de Voo Trancoso", tags:["Trancoso","Réveillon"]},
  {data:"31 DEZ", dia:"quarta-feira, 31 de dezembro", titulo:"Réveillon Aura Trancoso 2026", local:"Trancoso", venue:"Trancoso", tags:["Trancoso","Réveillon"]},
  {data:"31 DEZ", dia:"quarta-feira, 31 de dezembro", titulo:"Réveillon Corujão 2026", local:"Arraial d'Ajuda", venue:"Corujão", tags:["Arraial","Réveillon"]},
  {data:"31 DEZ", dia:"quarta-feira, 31 de dezembro", titulo:"Sundance - Réveillon 2026", local:"Arraial d'Ajuda", venue:"Arraial d'Ajuda", tags:["Arraial","Réveillon"]},
  {data:"31 DEZ", dia:"quarta-feira, 31 de dezembro", titulo:"Réveillon Só Coisas Boas", local:"Arraial d'Ajuda", venue:"Hayô Praia", tags:["Arraial","Réveillon"]},
  {data:"31 DEZ", dia:"quarta-feira, 31 de dezembro", titulo:"Réveillon Beat Beach 2026", local:"Arraial d'Ajuda", venue:"Beat Beach", tags:["Arraial","Réveillon"]},
  {data:"31 DEZ", dia:"quarta-feira, 31 de dezembro", titulo:"Alta - Taipei", local:"Trancoso", venue:"Praia do Taipe", tags:["Trancoso","Réveillon"]},
  
  // 01 JAN
  {data:"01 JAN", dia:"quinta-feira, 1 de janeiro", titulo:"Réveillon Elemental Trancoso 2026", local:"Trancoso", venue:"Almar Trancoso", tags:["Trancoso"]},
  
  // 02 JAN
  {data:"02 JAN", dia:"sexta-feira, 02 de janeiro", titulo:"Réveillon Ayumar 2026", local:"Trancoso", venue:"Clube de Voo Trancoso", tags:["Trancoso"]},
  {data:"02 JAN", dia:"sexta-feira, 02 de janeiro", titulo:"Verão PDX Caraíva", local:"Caraíva", venue:"Caraíva", tags:["Caraíva"]},
  {data:"02 JAN", dia:"sexta-feira, 02 de janeiro", titulo:"Réveillon Elemental Trancoso 2026", local:"Trancoso", venue:"Almar Trancoso", tags:["Trancoso"]},
  {data:"02 JAN", dia:"sexta-feira, 02 de janeiro", titulo:"Festival de Sundance 2026", local:"Arraial d'Ajuda", venue:"Arraial d'Ajuda", tags:["Arraial"]},
  {data:"02 JAN", dia:"sexta-feira, 02 de janeiro", titulo:"Alta - Maracutaia", local:"Trancoso", venue:"Trancoso", tags:["Trancoso"]},
  
  // 03 JAN
  {data:"03 JAN", dia:"sábado, 03 de janeiro", titulo:"AWÊ Réveillon Caraíva 2026", local:"Caraíva", venue:"Casa Incrível", tags:["Caraíva"]},
  {data:"03 JAN", dia:"sábado, 03 de janeiro", titulo:"Réveillon Sal de Caraíva 2026", local:"Caraíva", venue:"Caraíva", tags:["Caraíva"]},
  {data:"03 JAN", dia:"sábado, 03 de janeiro", titulo:"Aura Sunset", local:"Trancoso", venue:"Trancoso", tags:["Trancoso"]},
  {data:"03 JAN", dia:"sábado, 03 de janeiro", titulo:"SANTO VERÃO 2026", local:"Arraial d'Ajuda", venue:"UIKI", tags:["Arraial"]},
  {data:"03 JAN", dia:"sábado, 03 de janeiro", titulo:"Réveillon Só Coisas Boas", local:"Arraial d'Ajuda", venue:"Hayô Praia", tags:["Arraial"]},
  
  // 07 JAN
  {data:"07 JAN", dia:"quarta-feira, 07 de janeiro", titulo:"O telhado", local:"Caraíva", venue:"Caraíva", tags:["Caraíva"]},
  
  // 10 JAN
  {data:"10 JAN", dia:"sábado, 10 de janeiro", titulo:"Réveillon Sal de Caraíva 2026", local:"Caraíva", venue:"Caraíva", tags:["Caraíva"]},
];

const colorMap = {
  "Trancoso": "bg-green-500/20 text-green-300 border-green-500/30",
  "Caraíva": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Arraial": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Réveillon": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
};

export default function EventosAnoNovoCompact() {
  // Agrupar eventos por data
  const eventosPorData = eventos.reduce((acc, evento) => {
    if (!acc[evento.data]) {
      acc[evento.data] = { dia: evento.dia, eventos: [] };
    }
    acc[evento.data].eventos.push(evento);
    return acc;
  }, {});

  return (
    <section className="py-16 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Eventos de Ano Novo 2026
          </h2>
          <p className="text-gray-600">
            Trancoso • Caraíva • Arraial d'Ajuda • 26 Dez - 10 Jan
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(eventosPorData).map(([data, { dia, eventos: eventosData }], idx) => (
            <div key={data}>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-300">
                <Calendar className="w-5 h-5 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-800">{dia}</h3>
                <span className="ml-auto text-sm text-gray-500">{eventosData.length} evento{eventosData.length > 1 ? 's' : ''}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {eventosData.map((evento, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all"
                  >
                    <div className="text-2xl font-bold text-gray-800 mb-2">{evento.data}</div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]">
                      {evento.titulo}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
                      <MapPin className="w-3 h-3" />
                      <span>{evento.venue}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {evento.tags.map((tag, ti) => (
                        <span
                          key={ti}
                          className={`text-xs px-2 py-1 rounded-md border ${colorMap[tag] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}