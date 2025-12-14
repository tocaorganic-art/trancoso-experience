import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, Music, Globe, Zap, Heart, Users, Compass, 
  Star, Sparkles, Target, Eye, Flag, Quote
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function Ethos() {
  useEffect(() => {
    document.title = "Ethos | Missão, Valores e Cultura da Toca Experience";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Conheça o Ethos da Toca Experience: nossa missão, visão e valores inegociáveis. Descubra como a cultura e a música se unem para criar experiências únicas e transformadoras em nossos eventos.";
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 text-gray-800">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 pt-6">
        <Breadcrumbs items={[
          { label: "Sobre", page: "Ethos" }
        ]} />
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-16">
        <div className="container mx-auto px-6">
          <Link to={createPageUrl("Home")}>
            <Button variant="ghost" className="text-white/70 hover:text-white mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm mb-4">
              <Heart className="w-4 h-4" />
              Nossa Essência
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Ethos
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              A música como linguagem universal que conecta culturas, gerações e experiências.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Quem Somos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Quem Somos</h2>
          </div>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                A <strong className="text-gray-800">Toca Experience</strong> é uma label e coletivo artístico que promove eventos e a união de talentos da cena eletrônica global, sempre com foco na qualidade e inovação sonora.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Desde 2015, construímos uma trajetória marcada pela busca constante da <strong className="text-gray-800">excelência artística</strong>. Nossa jornada musical transcende fronteiras geográficas e culturais, levando a energia tropical de Trancoso para palcos internacionais.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Com mais de <strong className="text-gray-800">500 mil streams</strong> e apresentações em vários países, estabelecemos residências em clubes renomados do Rio de Janeiro e realizamos turnês pela <strong className="text-gray-800">Polinésia Francesa, Europa e América do Sul</strong>.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Propósito */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Propósito</h2>
          </div>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                Criar <strong className="text-gray-800">momentos únicos e memoráveis</strong> através da música. Cada set é uma jornada cuidadosamente construída para conectar pessoas, despertar emoções e transformar eventos em experiências inesquecíveis. Acreditamos que a música é a linguagem universal que une culturas, gerações e histórias.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Missão */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Missão</h2>
          </div>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                Promover a <strong className="text-gray-800">união de talentos da cena eletrônica global</strong>, oferecendo experiências musicais exclusivas e serviços personalizados que transformam eventos em Trancoso e além em celebrações autênticas, sofisticadas e memoráveis.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Visão */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Visão</h2>
          </div>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                Ser referência em <strong className="text-gray-800">experiências musicais exclusivas</strong>, reconhecida internacionalmente pela fusão única entre elementos eletrônicos contemporâneos e brasilidades autênticas, levando a energia tropical de Trancoso para os palcos mais prestigiados do mundo.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Valores */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Valores</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Inovação Sonora</h3>
                <p className="text-gray-600">
                  Fusão entre elementos eletrônicos contemporâneos e brasilidades autênticas. Paisagens sonoras únicas que refletem diversidade cultural e sofisticação técnica.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Conexão Global</h3>
                <p className="text-gray-600">
                  Experiência internacional com adaptação cultural em diversos países. A música como ponte entre culturas, gerações e experiências ao redor do mundo.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Excelência Técnica</h3>
                <p className="text-gray-600">
                  Equipamentos Pioneer de última geração e produção impecável. Compromisso absoluto com a qualidade em cada detalhe da performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Cultura & Filosofia */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Cultura & Filosofia</h2>
          </div>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Nossa cultura é baseada na <strong className="text-gray-800">hospitalidade genuína</strong> e na criação de comunidade através da música. Acreditamos que cada evento é uma oportunidade de conectar pessoas e criar memórias que transcendem o momento.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Valorizamos a <strong className="text-gray-800">autenticidade</strong> em tudo que fazemos — desde a curadoria musical até o atendimento aos nossos clientes. Trancoso não é apenas nosso endereço, é nossa inspiração: a combinação perfeita entre natureza, sofisticação e energia vibrante.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Trabalhamos com <strong className="text-gray-800">proximidade e calor humano</strong>, tratando cada cliente como parte da nossa comunidade. A experiência Toca não termina quando a música para — ela se transforma em histórias que são contadas e recontadas.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Compromissos / Manifesto */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center">
              <Flag className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Compromissos</h2>
          </div>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-600 text-lg">
                    <strong className="text-gray-800">Qualidade sem concessões:</strong> Cada performance é tratada com a mesma dedicação, seja um sunset intimista ou um festival internacional.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-600 text-lg">
                    <strong className="text-gray-800">Personalização genuína:</strong> Entendemos que cada evento é único e merece uma trilha sonora sob medida.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-600 text-lg">
                    <strong className="text-gray-800">Inovação constante:</strong> Buscamos sempre evoluir, explorando novas sonoridades e tecnologias para surpreender nosso público.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <p className="text-gray-600 text-lg">
                    <strong className="text-gray-800">Comunidade e colaboração:</strong> Promovemos a união de talentos e o crescimento coletivo da cena eletrônica.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.section>

        {/* Frases-Chave / Essência */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Essência do Ethos</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-0">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-gray-400 mb-4" />
                <p className="text-white text-xl font-medium italic leading-relaxed">
                  "A música como linguagem universal que conecta culturas, gerações e experiências."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-0">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-gray-400 mb-4" />
                <p className="text-white text-xl font-medium italic leading-relaxed">
                  "Cada set é uma jornada cuidadosamente construída para criar momentos únicos e memoráveis."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-0">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-gray-400 mb-4" />
                <p className="text-white text-xl font-medium italic leading-relaxed">
                  "Paraíso exclusivo para seus eventos. Trancoso é o cenário perfeito para momentos inesquecíveis."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-0">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-gray-400 mb-4" />
                <p className="text-white text-xl font-medium italic leading-relaxed">
                  "Fusão entre elementos eletrônicos contemporâneos e brasilidades autênticas."
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border-0">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Pronto para viver Trancoso de um jeito único?
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Fale com a Toca Experience e crie sua experiência sob medida.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://wa.me/5521997731321" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-6 text-lg rounded-full">
                    Falar no WhatsApp
                  </Button>
                </a>
                <Link to={createPageUrl("Home")}>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full">
                    Explorar Experiências
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}