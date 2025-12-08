import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Music, Headphones, Radio, Zap, CheckCircle, Package, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

const EQUIPAMENTOS = [
  {
    nome: "Pioneer CDJ-3000",
    categoria: "Players Profissionais",
    descricao: "O top de linha da Pioneer. Touchscreen de 9 polegadas, análise de key em tempo real, Hot Cues ilimitados.",
    imagem: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800",
    preco: "R$ 800/dia (unidade)",
    destaque: true,
    especificacoes: ["9\" Touchscreen HD", "32GB memória", "WiFi & LAN", "Beat Jump"]
  },
  {
    nome: "Pioneer CDJ-2000 NXS2",
    categoria: "Players Profissionais",
    descricao: "O clássico dos clubs. Confiável, completo e perfeito para qualquer evento profissional.",
    imagem: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
    preco: "R$ 600/dia (unidade)",
    especificacoes: ["Display LCD", "Pro DJ Link", "USB & SD", "Touch Strip"]
  },
  {
    nome: "Pioneer DJM-V10",
    categoria: "Mixers",
    descricao: "Mixer profissional de 6 canais com qualidade de áudio excepcional e filtros analógicos.",
    imagem: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800",
    preco: "R$ 1.000/dia",
    destaque: true,
    especificacoes: ["6 canais", "EQs de 4 bandas", "Compressor master", "Filtros analógicos"]
  },
  {
    nome: "Pioneer DJM-900 NXS2",
    categoria: "Mixers",
    descricao: "O mixer mais usado em clubs do mundo. 4 canais, efeitos integrados e qualidade impecável.",
    imagem: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
    preco: "R$ 700/dia",
    especificacoes: ["4 canais", "Beat FX", "Sound Color FX", "USB Recording"]
  },
  {
    nome: "Pioneer DDJ-1000",
    categoria: "Controladoras",
    descricao: "Controladora de 4 canais compatível com Rekordbox DJ. Layout profissional, jog wheels metálicos.",
    imagem: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800",
    preco: "R$ 400/dia",
    especificacoes: ["4 canais", "Jog wheels", "Rekordbox DJ", "16 pads RGB"]
  },
  {
    nome: "Funktion-One Resolution 2",
    categoria: "Caixas de Som",
    descricao: "Sistema de som premium usado nos melhores clubs do mundo. Clareza e potência incomparáveis.",
    imagem: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
    preco: "R$ 2.500/dia (par)",
    destaque: true,
    especificacoes: ["800W RMS", "Resposta 45Hz-20kHz", "Som cristalino", "Ideal 200-400 pessoas"]
  },
  {
    nome: "QSC K12.2",
    categoria: "Caixas de Som",
    descricao: "Caixas ativas de 12 polegadas. Potentes, versáteis e com qualidade profissional.",
    imagem: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800",
    preco: "R$ 400/dia (par)",
    especificacoes: ["2000W pico", "132 dB SPL", "DSP integrado", "Ideal 100-200 pessoas"]
  },
  {
    nome: "Kit Iluminação LED",
    categoria: "Iluminação",
    descricao: "Sistema completo de iluminação LED RGB com controle DMX. Moving heads, par LEDs e strobes.",
    imagem: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    preco: "R$ 800/dia",
    especificacoes: ["4x Moving Head", "8x Par LED RGB", "2x Strobes", "Controlador DMX"]
  }
];

const PACOTES = [
  {
    nome: "Pacote Residencial Premium",
    preco: "A partir de R$ 2.500/dia",
    itens: [
      "2x Pioneer CDJ-3000",
      "1x Pioneer DJM-V10",
      "1x Par Funktion-One Resolution 2",
      "Subwoofer ativo",
      "Iluminação ambiente LED",
      "Instalação e suporte técnico"
    ],
    ideal: "Festas privadas de 100-300 pessoas",
    destaque: true
  },
  {
    nome: "Pacote Club Experience",
    preco: "A partir de R$ 4.000/dia",
    itens: [
      "4x Pioneer CDJ-3000",
      "2x Pioneer DJM-V10",
      "Sistema Funktion-One completo",
      "Kit iluminação profissional",
      "Técnico de som durante o evento",
      "Backup completo de equipamento"
    ],
    ideal: "Eventos de 300-800 pessoas",
    destaque: true
  },
  {
    nome: "Pacote DJ Iniciante",
    preco: "A partir de R$ 800/dia",
    itens: [
      "1x Pioneer DDJ-1000",
      "1x Par QSC K12.2",
      "Notebook com Rekordbox",
      "Cabos e suporte"
    ],
    ideal: "Festas pequenas até 100 pessoas"
  }
];

export default function AluguelEquipamentos() {
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");
  
  const categorias = ["Todos", ...new Set(EQUIPAMENTOS.map(e => e.categoria))];
  
  const equipamentosFiltrados = categoriaFiltro === "Todos" 
    ? EQUIPAMENTOS 
    : EQUIPAMENTOS.filter(e => e.categoria === categoriaFiltro);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { label: "Serviços", href: createPageUrl("Home") + "#servicos" },
        { label: "Aluguel de Equipamentos DJ" }
      ]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-6">
          <Link to={createPageUrl("Home")}>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm mb-6">
              <Headphones className="w-4 h-4" />
              Equipamentos Pioneer Profissionais
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Aluguel de Equipamentos DJ em Trancoso
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              CDJs Pioneer, Controladoras, Caixas de Som Profissionais e Iluminação
            </p>
            <p className="text-gray-500">
              Equipamento de última geração • Entrega e instalação • Suporte técnico incluso
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Pacotes em Destaque */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <Package className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-3xl font-bold mb-4">Pacotes Completos</h2>
            <p className="text-gray-600">Soluções prontas para seu evento</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PACOTES.map((pacote, index) => (
              <Card key={index} className={`${pacote.destaque ? 'border-2 border-blue-500 shadow-xl' : ''}`}>
                <CardContent className="p-8">
                  {pacote.destaque && (
                    <Badge className="mb-4 bg-blue-500">MAIS POPULAR</Badge>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{pacote.nome}</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-6">{pacote.preco}</p>
                  
                  <div className="space-y-3 mb-6">
                    {pacote.itens.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm font-medium text-gray-600">Ideal para:</p>
                    <p className="text-sm text-gray-800">{pacote.ideal}</p>
                  </div>

                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => window.open('https://wa.me/5521972824659?text=Olá! Gostaria de um orçamento para o ' + pacote.nome, '_blank')}
                  >
                    Solicitar Orçamento
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map((cat) => (
            <Button
              key={cat}
              variant={categoriaFiltro === cat ? "default" : "outline"}
              onClick={() => setCategoriaFiltro(cat)}
              className={categoriaFiltro === cat ? "bg-blue-600" : ""}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Grid de Equipamentos */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Equipamentos Disponíveis</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipamentosFiltrados.map((equip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`h-full ${equip.destaque ? 'border-2 border-blue-500' : ''}`}>
                  <img 
                    src={equip.imagem} 
                    alt={equip.nome}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardContent className="p-6">
                    {equip.destaque && (
                      <Badge className="mb-3 bg-blue-500">PREMIUM</Badge>
                    )}
                    <Badge variant="outline" className="mb-3">{equip.categoria}</Badge>
                    <h3 className="text-xl font-bold mb-2">{equip.nome}</h3>
                    <p className="text-gray-600 text-sm mb-4">{equip.descricao}</p>
                    
                    <div className="space-y-1 mb-4">
                      {equip.especificacoes.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                          <Zap className="w-3 h-3" />
                          {spec}
                        </div>
                      ))}
                    </div>

                    <p className="text-2xl font-bold text-blue-600 mb-4">{equip.preco}</p>
                    
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => window.open(`https://wa.me/5521972824659?text=Olá! Gostaria de alugar ${equip.nome}`, '_blank')}
                    >
                      Solicitar
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Diferenciais */}
        <section className="mb-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-center mb-12">Por Que Alugar Conosco?</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, title: "Equipamento Premium", desc: "Pioneer, Funktion-One e QSC" },
              { icon: Zap, title: "Entrega & Instalação", desc: "Montagem profissional inclusa" },
              { icon: Headphones, title: "Suporte Técnico", desc: "Durante todo o evento" },
              { icon: Radio, title: "Backup Garantido", desc: "Equipamento reserva disponível" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-600 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white">
            <Music className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Pronto para Elevar Seu Evento?</h2>
            <p className="text-xl mb-8 text-blue-100">Entre em contato agora e receba um orçamento personalizado</p>
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => window.open('https://wa.me/5521972824659', '_blank')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp: (21) 97282-4659
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}