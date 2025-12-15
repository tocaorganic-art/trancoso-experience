import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Music, Speaker, Lightbulb, Check, ArrowLeft, ChevronDown,
  Disc3, Volume2, Zap, Star, MessageCircle, Clock, Truck, Shield, Image as ImageIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";
import EquipmentGallery from "@/components/equipamentos/EquipmentGallery";

// Equipamentos data
const EQUIPAMENTOS = [
  {
    id: "cdj",
    titulo: "CDJ Pioneer (Players Profissionais)",
    descricao: "Players profissionais Pioneer DJ ideais para DJs convidados e apresentações ao vivo. Compatíveis com pendrive, Rekordbox e conexões digitais. Entrega com cabos e integração ao mixer ou controladora.",
    imagem: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/6a7bbf2de_djm-450-set-xdj-700.jpg",
    alt: "Locação de CDJ Pioneer profissional para festas em casa",
    icon: Disc3
  },
  {
    id: "controladora",
    titulo: "Controladora Pioneer DJ",
    descricao: "Controladora Pioneer DJ ideal para eventos em casa com DJs que utilizam notebook e software (Rekordbox/Serato). Perfeita para festas em salas, varandas e rooftops, com controle do som em um único equipamento.",
    imagem: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/14369715c_XDJ-RX3_prm_angle_210830_pc.png",
    alt: "Aluguel de controladora Pioneer DJ para festas residenciais",
    icon: Music
  },
  {
    id: "subwoofer",
    titulo: "Subwoofers Profissionais",
    descricao: "Graves fortes, limpos e sem distorção. Ideais para música eletrônica, funk, pop e shows ao vivo em residências. Podem ser combinados com caixas full range para um sistema completo.",
    imagem: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/b704a07b0_image.png",
    alt: "Locação de subwoofer profissional para eventos em casa",
    icon: Volume2
  },
  {
    id: "caixas",
    titulo: "Caixas de Som (Full Range / PA)",
    descricao: "Caixas de som de alta performance para cobertura uniforme dos ambientes. Ideais para festas em casa, jantares com DJ, eventos corporativos e encontros familiares.",
    imagem: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/69f41bf0a_image.png",
    alt: "Aluguel de caixas de som profissionais para residências",
    icon: Speaker
  },
  {
    id: "led",
    titulo: "Iluminação LED e Cênica",
    descricao: "Iluminação cênica com barras de LED, PAR LEDs e fitas LED para destacar paredes, piscinas, jardins e áreas de convivência. Controle de cores, intensidade e efeitos para criar a atmosfera perfeita.",
    imagem: "https://images.unsplash.com/photo-1504704911898-68304a7d2807?w=1600&q=80",
    alt: "Iluminação LED decorativa para festas em casa",
    icon: Lightbulb
  },
  {
    id: "moving",
    titulo: "Moving Heads (Cabeças Móveis)",
    descricao: "Efeitos de luz dinâmicos com movimentos, gobos e cores. Trazem a sensação de balada/clube para dentro da sua residência, sincronizados com o som.",
    imagem: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/0b2ab528b_image.png",
    alt: "Aluguel de moving heads para festas residenciais",
    icon: Zap
  },
  {
    id: "completo",
    titulo: "Sonorização Completa para Residências",
    descricao: "Montagem completa de som e luz para festas em casa: setup com CDJs ou controladora, caixas, subwoofers e iluminação de pista. Experiência de 'home club' com impacto profissional.",
    imagem: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80",
    alt: "Pacote completo de som e iluminação para festa em residência",
    icon: Star
  }
];

const PACOTES = [
  {
    id: "compacto",
    titulo: "Festa Compacta",
    subtitulo: "até 30 pessoas",
    preco: "Sob Consulta",
    itens: [
      "1 controladora Pioneer DJ",
      "2 caixas de som ativas gama completa",
      "1 kit de iluminação LED básica (wash de cor)",
      "Suporte remoto para configuração"
    ],
    destaque: false
  },
  {
    id: "residencial",
    titulo: "Festa Residencial",
    subtitulo: "até 60 pessoas",
    preco: "Sob Consulta",
    itens: [
      "1 controladora Pioneer ou par de CDJ + mixer",
      "2 caixas de som ativas gama completa",
      "1 subwoofer profissional",
      "Kit de iluminação com LEDs + efeitos simples",
      "Técnico para montagem e teste no local"
    ],
    destaque: true
  },
  {
    id: "homeclub",
    titulo: "Clube de Casa",
    subtitulo: "Mais de 70 pessoas / área externa",
    preco: "Sob Consulta",
    itens: [
      "2 CDJs Pioneer + mesa de mistura profissional",
      "2–4 caixas de som gama completa",
      "2 subwoofers profissionais",
      "Sistema de iluminação completo: LEDs + cabeças móveis",
      "Técnico para montagem e passagem de som",
      "Suporte presencial no início do evento"
    ],
    destaque: false
  }
];

const DEPOIMENTOS = [
  {
    texto: "Contratamos o pacote Home Club para um aniversário em casa e o resultado foi surreal. Som incrível, graves fortes e iluminação de balada. A equipe cuidou de tudo.",
    nome: "Mariana S.",
    local: "Trancoso"
  },
  {
    texto: "Montamos um setup compacto no apartamento para um after de Ano Novo. Equipamentos novos, fáceis de usar e suporte rápido pelo WhatsApp.",
    nome: "Rafael L.",
    local: "Caraíva"
  },
  {
    texto: "Usamos o sistema para um jantar corporativo em residência. Volume controlado, som nítido e zero dor de cabeça com montagem e desmontagem.",
    nome: "Ana P.",
    local: "Arraial d'Ajuda"
  }
];

const POLITICAS = [
  {
    titulo: "Entrega e Retirada",
    icon: Truck,
    texto: "Atendemos residências em Trancoso, Caraíva, Arraial d'Ajuda e região. Entrega e retirada são agendadas com antecedência, conforme janela de horário combinada. A taxa de entrega varia de acordo com a região e acesso ao local."
  },
  {
    titulo: "Instalação e Montagem",
    icon: Speaker,
    texto: "A montagem é realizada por técnico especializado (conforme pacote). Todos os equipamentos são testados na presença do cliente, com orientação de uso básico."
  },
  {
    titulo: "Responsabilidade e Segurança",
    icon: Shield,
    texto: "O cliente é responsável pela guarda dos equipamentos durante o período de locação. Danos por mau uso podem gerar cobrança de reparo ou reposição. Recomenda-se evitar líquidos próximos, exposição à chuva/sol intenso e áreas de alta circulação."
  },
  {
    titulo: "Horários e Ruído",
    icon: Clock,
    texto: "Recomendamos atenção às leis de silêncio locais. Níveis de volume podem ser ajustados para minimizar qualquer incômodo com vizinhos."
  }
];

export default function LocacaoSom() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    dataEvento: "",
    horarioInicio: "",
    horarioTermino: "",
    endereco: "",
    tipoEvento: "",
    convidados: "",
    pacote: "",
    mensagem: "",
    aceitaWhatsApp: false,
    aceitaPoliticas: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedEquipIndex, setSelectedEquipIndex] = useState(0);

  // SEO
  useEffect(() => {
    document.title = "Locação de Equipamentos de Som para Residências | Som Profissional em Casa";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Locação de equipamentos de som e iluminação para residências. CDJ Pioneer, subwoofers, caixas de som, moving heads e LEDs com montagem completa para festas em casa.";

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "locação de equipamentos de som para residências, aluguel de som para em casa, aluguel de CDJ Pioneer, locação de som e iluminação residencial, som profissional para festas em casa";
  }, []);

  const scrollToForm = () => {
    document.getElementById("formulario-reserva")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.aceitaPoliticas) {
      toast.error("Você precisa aceitar as políticas de entrega e instalação.");
      return;
    }

    setIsSubmitting(true);

    const tipoEventoLabels = {
      festa_casa: "Festa em casa",
      aniversario: "Aniversário",
      after: "After",
      corporativo: "Corporativo",
      outro: "Outro"
    };

    const pacoteLabels = {
      compacto: "Festa Compacta (até 30 pessoas)",
      residencial: "Festa Residencial (até 60 pessoas)",
      homeclub: "Home Club (70+ pessoas)",
      a_definir: "A definir"
    };

    const whatsappMessage = encodeURIComponent(`*🔊 LOCAÇÃO DE EQUIPAMENTOS - Toca Experience*

*📋 DADOS DO CLIENTE:*
Nome: ${formData.nome}
E-mail: ${formData.email}
WhatsApp: ${formData.whatsapp}

*🎉 DETALHES DO EVENTO:*
Data: ${formData.dataEvento}
Horário: ${formData.horarioInicio} às ${formData.horarioTermino}
Endereço: ${formData.endereco}
Tipo: ${tipoEventoLabels[formData.tipoEvento] || "Não informado"}
Convidados: ${formData.convidados || "Não informado"}
Pacote desejado: ${pacoteLabels[formData.pacote] || "A definir"}

*💬 MENSAGEM:*
${formData.mensagem || "Nenhuma mensagem adicional"}

*✅ Aceita contato por WhatsApp:* ${formData.aceitaWhatsApp ? "Sim" : "Não"}`);

    window.open(`https://wa.me/5521972824659?text=${whatsappMessage}`, '_blank');

    toast.success("Reserva enviada!", {
      description: "WhatsApp aberto para confirmação."
    });

    setFormData({
      nome: "",
      email: "",
      whatsapp: "",
      dataEvento: "",
      horarioInicio: "",
      horarioTermino: "",
      endereco: "",
      tipoEvento: "",
      convidados: "",
      pacote: "",
      mensagem: "",
      aceitaWhatsApp: false,
      aceitaPoliticas: false
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header / Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative">
          <Link to={createPageUrl("Home")}>
            <Button variant="ghost" className="text-white/70 hover:text-white mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm mb-6">
              <Speaker className="w-4 h-4" />
              Locação – Som e Iluminação Residencial
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Locação de Equipamentos de Som para{" "}
              <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                Residências
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl text-gray-300 mb-8">
              Som profissional em casa: DJs, festas privadas e experiências imersivas com equipamentos de alto padrão.
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
              Transforme sua casa em um verdadeiro club. Oferecemos locação de equipamentos de som e iluminação para residências, com tecnologia profissional e montagem completa para festas, aniversários, pool parties, pré-réveillon, afters e eventos intimistas.
              <br /><br />
              Trabalhamos com marcas referência no mercado – como Pioneer DJ – e montamos desde setups compactos para sala/apartamento até sonorização completa de casas, rooftops e áreas externas.
            </p>

            {/* Diferenciais */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
              {[
                "Equipamentos de som e iluminação de padrão profissional",
                "Montagem, configuração e testes por técnicos especializados",
                "Pacotes prontos ou soluções sob medida",
                "Suporte antes e durante o evento"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm text-left">{item}</span>
                </div>
              ))}
            </div>

            <Button 
              onClick={scrollToForm}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-full"
            >
              Solicitar orçamento agora
              <ChevronDown className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Galeria de Equipamentos */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Galeria de <span className="text-orange-400">Equipamentos</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              Equipamentos profissionais de marcas líderes do mercado para a sua festa em casa
            </p>
            <Button
              onClick={() => setGalleryOpen(true)}
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500/10"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Ver Galeria Completa com Zoom
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {EQUIPAMENTOS.map((equip, idx) => (
              <motion.div
                key={equip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card 
                  className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-orange-500/50 transition-all h-full cursor-pointer group"
                  onClick={() => {
                    setSelectedEquipIndex(idx);
                    setGalleryOpen(true);
                  }}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={equip.imagem} 
                      alt={equip.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-semibold">Ver Detalhes</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center">
                        <equip.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white">{equip.titulo}</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{equip.descricao}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pacotes e Preços */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pacotes de <span className="text-orange-400">Locação</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Escolha o pacote ideal para o seu evento ou solicite uma proposta personalizada
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PACOTES.map((pacote, idx) => (
              <motion.div
                key={pacote.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`h-full rounded-2xl overflow-hidden ${pacote.destaque 
                  ? 'bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-orange-500 shadow-xl shadow-orange-500/20' 
                  : 'bg-gray-800 border border-gray-600'}`}
                >
                  <CardContent className="p-8">
                    {pacote.destaque && (
                      <div className="text-center mb-6">
                        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                          Mais Popular
                        </span>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-2">{pacote.titulo}</h3>
                    <p className="text-gray-400 text-base mb-6">{pacote.subtitulo}</p>
                    
                    <div className="mb-8 pb-6 border-b border-gray-700">
                      <span className="text-3xl font-bold text-orange-400">{pacote.preco}</span>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {pacote.itens.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-gray-200">
                          <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      onClick={scrollToForm}
                      size="lg"
                      className={`w-full py-6 text-base font-semibold rounded-xl ${pacote.destaque 
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg' 
                        : 'bg-gray-700 hover:bg-gray-600 border border-gray-500'}`}
                    >
                      Solicitar este pacote
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O Que Dizem Nossos <span className="text-orange-400">Clientes</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {DEPOIMENTOS.map((dep, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">"{dep.texto}"</p>
                <div>
                  <p className="text-white font-semibold">{dep.nome}</p>
                  <p className="text-gray-500 text-sm">{dep.local}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border-2 border-orange-500/40 rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Quer transformar a sua casa em uma pista de dança?
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Envie os detalhes do seu evento (data, horário, tipo de festa e quantidade aproximada de pessoas) e retornaremos com uma proposta personalizada em poucas horas.
            </p>
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-10 py-7 text-lg font-semibold rounded-full shadow-xl hover:shadow-orange-500/30 transition-all"
            >
              Solicitar orçamento e disponibilidade
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Formulário de Reserva */}
      <section id="formulario-reserva" className="py-20 bg-black/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Formulário de <span className="text-orange-400">Reserva</span>
              </h2>
              <p className="text-gray-400">
                Preencha os dados abaixo e entraremos em contato rapidamente
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 md:p-8 space-y-6">
              {/* Dados pessoais */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nome completo *</label>
                  <Input
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="bg-gray-900 border-gray-600 text-white"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">E-mail *</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-gray-900 border-gray-600 text-white"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">WhatsApp *</label>
                <Input
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  className="bg-gray-900 border-gray-600 text-white"
                  placeholder="(00) 00000-0000"
                />
              </div>

              {/* Detalhes do evento */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Data do evento</label>
                  <Input
                    type="date"
                    value={formData.dataEvento}
                    onChange={(e) => setFormData({...formData, dataEvento: e.target.value})}
                    className="bg-gray-900 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Horário de início</label>
                  <Input
                    type="time"
                    value={formData.horarioInicio}
                    onChange={(e) => setFormData({...formData, horarioInicio: e.target.value})}
                    className="bg-gray-900 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Horário de término</label>
                  <Input
                    type="time"
                    value={formData.horarioTermino}
                    onChange={(e) => setFormData({...formData, horarioTermino: e.target.value})}
                    className="bg-gray-900 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Endereço do evento</label>
                <Input
                  value={formData.endereco}
                  onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                  className="bg-gray-900 border-gray-600 text-white"
                  placeholder="Cidade, bairro, tipo de residência"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Tipo de evento</label>
                  <Select value={formData.tipoEvento} onValueChange={(v) => setFormData({...formData, tipoEvento: v})}>
                    <SelectTrigger className="bg-gray-900 border-gray-600 text-white">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="festa_casa">Festa em casa</SelectItem>
                      <SelectItem value="aniversario">Aniversário</SelectItem>
                      <SelectItem value="after">After</SelectItem>
                      <SelectItem value="corporativo">Corporativo</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nº de convidados</label>
                  <Input
                    value={formData.convidados}
                    onChange={(e) => setFormData({...formData, convidados: e.target.value})}
                    className="bg-gray-900 border-gray-600 text-white"
                    placeholder="Ex: 50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Pacote desejado</label>
                  <Select value={formData.pacote} onValueChange={(v) => setFormData({...formData, pacote: v})}>
                    <SelectTrigger className="bg-gray-900 border-gray-600 text-white">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compacto">Festa Compacta</SelectItem>
                      <SelectItem value="residencial">Festa Residencial</SelectItem>
                      <SelectItem value="homeclub">Home Club</SelectItem>
                      <SelectItem value="a_definir">A definir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Conte mais sobre o seu evento</label>
                <Textarea
                  value={formData.mensagem}
                  onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                  className="bg-gray-900 border-gray-600 text-white min-h-[100px]"
                  placeholder="Detalhes adicionais, necessidades específicas, etc."
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="whatsapp"
                    checked={formData.aceitaWhatsApp}
                    onCheckedChange={(checked) => setFormData({...formData, aceitaWhatsApp: checked})}
                    className="border-gray-600"
                  />
                  <label htmlFor="whatsapp" className="text-sm text-gray-400">
                    Aceito receber contato por WhatsApp
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="politicas"
                    checked={formData.aceitaPoliticas}
                    onCheckedChange={(checked) => setFormData({...formData, aceitaPoliticas: checked})}
                    className="border-gray-600"
                  />
                  <label htmlFor="politicas" className="text-sm text-gray-400">
                    Li e aceito as políticas de entrega e instalação *
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-6 text-lg rounded-xl"
              >
                {isSubmitting ? "Enviando..." : "Enviar reserva"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Políticas */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Políticas de <span className="text-orange-400">Entrega e Instalação</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {POLITICAS.map((pol, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <pol.icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="font-bold text-white">{pol.titulo}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{pol.texto}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 max-w-xl mx-auto">
              <h3 className="font-bold text-white mb-2">Formas de Pagamento</h3>
              <p className="text-gray-400 text-sm">
                Reserva mediante sinal e saldo até a data da entrega. Formas de pagamento aceitas: PIX, cartão de crédito, transferência bancária.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>© 2024 Toca Experience - Locação de Equipamentos de Som para Residências</p>
      </footer>

      {/* Equipment Gallery Modal */}
      <EquipmentGallery
        equipamentos={EQUIPAMENTOS}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        selectedIndex={selectedEquipIndex}
      />
    </div>
  );
}