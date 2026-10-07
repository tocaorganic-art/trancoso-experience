import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft, Globe, Heart, Users, Compass,
  Star, Sparkles, Target, Eye, Flag, Quote, ConciergeBell
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ECOSYSTEM_LINKS } from "@shared/ui/EcosystemHub";

const ICON_WRAP = "w-12 h-12 rounded-xl flex items-center justify-center";
const ICON_WRAP_STYLE = { backgroundColor: "var(--toca-laranja)", color: "var(--toca-obsidiana)" };

export default function Ethos() {
  useEffect(() => {
    document.title = "Ethos | Missão, Visão e Valores do Ecossistema Toca";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Conheça o Ethos da Toca: missão, visão e valores de um ecossistema que une Toca Experience, Concierge, Trancoso Resolve e Trancoso Move em Trancoso.";
  }, []);

  const outrosProdutos = ECOSYSTEM_LINKS.filter((i) => !i.current);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--toca-bg)", color: "var(--toca-ink)" }}>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 pt-6">
        <Breadcrumbs items={[{ label: "Sobre", page: "Ethos" }]} />
      </div>

      {/* Header */}
      <div className="py-16" style={{ backgroundColor: "var(--toca-obsidiana)" }}>
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
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-4"
              style={{ backgroundColor: "rgba(242, 222, 196, 0.12)", color: "var(--toca-areia)" }}
            >
              <Heart className="w-4 h-4" />
              Nossa Essência
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4" style={{ fontFamily: "var(--font-editorial)" }}>
              Ethos
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#E4D5BE" }}>
              Um ecossistema. Todas as experiências. A mesma hospitalidade por trás de cada serviço que levamos a Trancoso.
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
            <div className={ICON_WRAP} style={ICON_WRAP_STYLE}>
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-medium">Quem Somos</h2>
          </div>
          <Card className="border" style={{ borderColor: "var(--toca-border)" }}>
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--toca-text-muted)" }}>
                A <strong>Toca</strong> nasceu em Trancoso em 2015, na música — eventos, sonorização e curadoria musical, com equipamentos Pioneer de última geração e foco em excelência técnica.
              </p>
              <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--toca-text-muted)" }}>
                Essa mesma busca por qualidade e cuidado com os detalhes deu origem a um ecossistema maior: a <strong>Toca Experience</strong> passou a ser a vitrine de um conjunto de serviços pensados para quem vive e visita Trancoso — do <strong>Concierge</strong> privativo à rede de profissionais locais da <strong>Trancoso Resolve</strong> e à mobilidade da <strong>Trancoso Move</strong>.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: "var(--toca-text-muted)" }}>
                Cada produto mantém a própria marca, o próprio site e o próprio atendimento. O que une todos é a mesma assinatura: hospitalidade genuína, atenção aos detalhes e identidade com Trancoso.
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
            <div className={ICON_WRAP} style={ICON_WRAP_STYLE}>
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-medium">Propósito</h2>
          </div>
          <Card className="border" style={{ borderColor: "var(--toca-border)" }}>
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed" style={{ color: "var(--toca-text-muted)" }}>
                Simplificar a vida de quem está em Trancoso, reunindo em um único ecossistema os serviços que antes exigiam dezenas de contatos espalhados: eventos e música, concierge privativo, profissionais de confiança e mobilidade. Cada marca resolve uma parte da experiência; juntas, formam a Toca.
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
            <div className={ICON_WRAP} style={ICON_WRAP_STYLE}>
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-medium">Missão</h2>
          </div>
          <Card className="border" style={{ borderColor: "var(--toca-border)" }}>
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed" style={{ color: "var(--toca-text-muted)" }}>
                Conectar pessoas aos melhores serviços de Trancoso através de um ecossistema coeso — Toca Experience, Concierge, Trancoso Resolve e Trancoso Move —, oferecendo curadoria, confiança e hospitalidade em cada ponto de contato.
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
            <div className={ICON_WRAP} style={ICON_WRAP_STYLE}>
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-medium">Visão</h2>
          </div>
          <Card className="border" style={{ borderColor: "var(--toca-border)" }}>
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed" style={{ color: "var(--toca-text-muted)" }}>
                Ser a referência de Trancoso quando o assunto é hospitalidade: o primeiro lugar em que moradores e visitantes pensam para encontrar eventos, concierge, profissionais locais ou um deslocamento — um ecossistema que cresce com a própria cidade.
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
            <div className={ICON_WRAP} style={ICON_WRAP_STYLE}>
              <Star className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-medium">Valores</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border hover:shadow-lg transition-all" style={{ borderColor: "var(--toca-border)" }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={ICON_WRAP_STYLE}>
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-medium mb-2">Excelência em cada detalhe</h3>
                <p style={{ color: "var(--toca-text-muted)" }}>
                  Da curadoria musical ao atendimento do concierge: qualidade sem concessões em todos os produtos do ecossistema.
                </p>
              </CardContent>
            </Card>

            <Card className="border hover:shadow-lg transition-all" style={{ borderColor: "var(--toca-border)" }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={ICON_WRAP_STYLE}>
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-medium mb-2">Identidade com Trancoso</h3>
                <p style={{ color: "var(--toca-text-muted)" }}>
                  Trancoso não é apenas o nosso endereço — é a inspiração por trás de cada serviço que construímos.
                </p>
              </CardContent>
            </Card>

            <Card className="border hover:shadow-lg transition-all" style={{ borderColor: "var(--toca-border)" }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={ICON_WRAP_STYLE}>
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-medium mb-2">Hospitalidade genuína</h3>
                <p style={{ color: "var(--toca-text-muted)" }}>
                  Tratamos cada cliente como parte da comunidade Toca, em qualquer um dos nossos serviços.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Ecossistema */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={ICON_WRAP} style={ICON_WRAP_STYLE}>
              <Flag className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-medium">O Ecossistema Toca</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border" style={{ borderColor: "var(--toca-border)", backgroundColor: "var(--toca-obsidiana)" }}>
              <CardContent className="p-8">
                <ConciergeBell className="w-8 h-8 mb-4" style={{ color: "var(--toca-laranja)" }} />
                <h3 className="text-white text-xl font-medium mb-2">Toca Experience &amp; Concierge</h3>
                <p style={{ color: "#E4D5BE" }}>
                  Eventos, sonorização, curadoria musical e concierge privativo — chef, barman, governança e logística sob medida.
                </p>
                <Link to={createPageUrl("Concierge")} className="mt-4 inline-block underline text-sm font-bold" style={{ color: "var(--toca-areia)" }}>
                  Conhecer o Concierge
                </Link>
              </CardContent>
            </Card>

            {outrosProdutos.map((item) => (
              <Card key={item.id} className="border" style={{ borderColor: "var(--toca-border)", backgroundColor: "var(--toca-obsidiana)" }}>
                <CardContent className="p-8">
                  <item.Icon className="w-8 h-8 mb-4" style={{ color: "var(--toca-laranja)" }} />
                  <h3 className="text-white text-xl font-medium mb-2">{item.name}</h3>
                  <p style={{ color: "#E4D5BE" }}>{item.description}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block underline text-sm font-bold"
                    style={{ color: "var(--toca-areia)" }}
                  >
                    Visitar {item.name}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Frases-Chave / Essência */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={ICON_WRAP} style={ICON_WRAP_STYLE}>
              <Quote className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-medium">Essência do Ethos</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0" style={{ backgroundColor: "var(--toca-obsidiana)" }}>
              <CardContent className="p-8">
                <Quote className="w-8 h-8 mb-4" style={{ color: "var(--toca-laranja)" }} />
                <p className="text-white text-xl font-medium italic leading-relaxed">
                  "Um ecossistema. Todas as experiências."
                </p>
              </CardContent>
            </Card>

            <Card className="border-0" style={{ backgroundColor: "var(--toca-obsidiana)" }}>
              <CardContent className="p-8">
                <Quote className="w-8 h-8 mb-4" style={{ color: "var(--toca-laranja)" }} />
                <p className="text-white text-xl font-medium italic leading-relaxed">
                  "A mesma hospitalidade, em cada serviço que levamos a Trancoso."
                </p>
              </CardContent>
            </Card>

            <Card className="border-0" style={{ backgroundColor: "var(--toca-obsidiana)" }}>
              <CardContent className="p-8">
                <Quote className="w-8 h-8 mb-4" style={{ color: "var(--toca-laranja)" }} />
                <p className="text-white text-xl font-medium italic leading-relaxed">
                  "Trancoso é o cenário; a Toca é a ponte até ele."
                </p>
              </CardContent>
            </Card>

            <Card className="border-0" style={{ backgroundColor: "var(--toca-obsidiana)" }}>
              <CardContent className="p-8">
                <Quote className="w-8 h-8 mb-4" style={{ color: "var(--toca-laranja)" }} />
                <p className="text-white text-xl font-medium italic leading-relaxed">
                  "Cada marca resolve uma parte. Juntas, formam a experiência completa."
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
          <Card className="border-0" style={{ backgroundColor: "var(--toca-obsidiana)" }}>
            <CardContent className="p-12">
              <h3 className="text-3xl font-medium text-white mb-4">
                Pronto para viver Trancoso de um jeito único?
              </h3>
              <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "#E4D5BE" }}>
                Fale com a Toca e descubra qual serviço do ecossistema combina com o que você precisa.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to={createPageUrl("Cotacao")}>
                  <Button className="px-8 py-6 text-lg rounded-full" style={{ backgroundColor: "var(--toca-areia)", color: "var(--toca-ink)" }}>
                    Solicitar proposta
                  </Button>
                </Link>
                <Link to={createPageUrl("Home")}>
                  <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full">
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
