import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, CheckCircle, AlertCircle, Upload, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

// Dados coletados do arquivo HTML
const EVENTOS_BASE = [
  {
    nome: "Haute - Welcome",
    data_inicio: "2025-12-26",
    data_fim: "2025-12-26",
    cidade: "Trancoso",
    lineup: "Festa da Haute (A confirmar)",
    url_social: "https://www.instagram.com/haute",
    url_compra: null
  },
  {
    nome: "AWÊ Réveillon Caraíva 2026",
    data_inicio: "2025-12-27",
    data_fim: "2026-01-03",
    cidade: "Caraíva",
    lineup: "AWÊ do Caraivana + DJs (Festival)",
    url_social: "https://www.instagram.com/awereveillon",
    url_compra: null,
    descricao_sugerida: "Celebre 10 anos de AWÊ Réveillon em Caraíva! Festival de 7 dias com lineup internacional, festas na Casa Incrível e NoCoco, cultivando arte, música e conexão com respeito ao paraíso de Caraíva. Open bar premium, experiências wellness e o melhor da cena eletrônica global."
  },
  {
    nome: "Réveillon Sal de Caraíva 2026",
    data_inicio: "2025-12-27",
    data_fim: "2026-01-03",
    cidade: "Caraíva",
    lineup: "Pacote de 5 festas",
    url_social: "https://www.instagram.com/saldcaraiva",
    url_compra: null
  },
  {
    nome: "Réveillon Elemental Trancoso 2026",
    data_inicio: "2025-12-27",
    data_fim: "2026-01-02",
    cidade: "Trancoso",
    lineup: "Pacote de festas (Virada do Ano inclusa)",
    url_social: "https://www.instagram.com/elementaltrancoso",
    url_compra: null,
    descricao_sugerida: "O Réveillon Elemental te convida a celebrar o tempo no Almar Trancoso. Pacote de festas de 27/12 a 02/01 com open bar premium (vodka, gin, whisky, espumante), wellness matinal, DJs renomados e experiências gastronômicas exclusivas. Acenda uma nova era de celebração."
  },
  {
    nome: "GoodTimes by Illusionize",
    data_inicio: "2025-12-27",
    data_fim: "2026-01-03",
    cidade: "Caraíva",
    lineup: "DJ Illusionize (e outros a confirmar)",
    url_social: "https://www.instagram.com/illusionize",
    url_compra: null
  },
  {
    nome: "Haute - dhb",
    data_inicio: "2025-12-27",
    data_fim: "2025-12-27",
    cidade: "Trancoso",
    lineup: "Festa da Haute",
    url_social: "https://www.instagram.com/haute",
    url_compra: null
  },
  {
    nome: "Réveillon Ayumar 2026 - 28/12",
    data_inicio: "2025-12-28",
    data_fim: "2025-12-28",
    cidade: "Trancoso",
    lineup: "Wesley Safadão",
    url_social: "https://www.instagram.com/ayumartrancoso",
    url_compra: "https://zig.tickets/eventos/reveillon-ayumar?code=toca-organic",
    descricao_sugerida: "Réveillon Ayumar 2026 no Fly Club Trancoso com Wesley Safadão! Open bar premium com vodka, gin, whisky e espumante. Use código toca-organic para desconto especial. Infraestrutura de luxo à beira-mar em Trancoso, experiência premium de virada de ano."
  },
  {
    nome: "Haute - We Love",
    data_inicio: "2025-12-28",
    data_fim: "2025-12-28",
    cidade: "Trancoso",
    lineup: "Festa da Haute",
    url_social: "https://www.instagram.com/haute",
    url_compra: null
  },
  {
    nome: "Sundance Festival 2026 - 28/12",
    data_inicio: "2025-12-28",
    data_fim: "2025-12-28",
    cidade: "Arraial d'Ajuda",
    lineup: "Show com Wesley Safadão",
    url_social: "https://www.instagram.com/sundancearraial",
    url_compra: null
  },
  {
    nome: "Haute - Saravá",
    data_inicio: "2025-12-29",
    data_fim: "2025-12-29",
    cidade: "Trancoso",
    lineup: "Festa da Haute",
    url_social: "https://www.instagram.com/haute",
    url_compra: null
  },
  {
    nome: "Sundance - Réveillon Arraial d'Ajuda 2026 - 29/12",
    data_inicio: "2025-12-29",
    data_fim: "2025-12-29",
    cidade: "Arraial d'Ajuda",
    lineup: "Festa (Open bar premium)",
    url_social: "https://www.instagram.com/sundancearraial",
    url_compra: null
  },
  {
    nome: "The roof - 30/12",
    data_inicio: "2025-12-30",
    data_fim: "2025-12-30",
    cidade: "Caraíva",
    lineup: "Curol e Riascode",
    url_social: "",
    url_compra: null
  },
  {
    nome: "Réveillon Ayumar 2026 - 30/12",
    data_inicio: "2025-12-30",
    data_fim: "2025-12-30",
    cidade: "Trancoso",
    lineup: "Jorge e Mateus",
    url_social: "https://www.instagram.com/ayumartrancoso",
    url_compra: "https://zig.tickets/eventos/reveillon-ayumar?code=toca-organic",
    descricao_sugerida: "Noite épica com Jorge e Mateus no Fly Club Trancoso! Réveillon Ayumar 2026 apresenta open bar premium completo, estrutura de luxo à beira-mar e show exclusivo do maior duo sertanejo do Brasil. Use código toca-organic e garanta entrada VIP."
  },
  {
    nome: "Haute - Oboé",
    data_inicio: "2025-12-30",
    data_fim: "2025-12-30",
    cidade: "Trancoso",
    lineup: "Festa da Haute",
    url_social: "https://www.instagram.com/haute",
    url_compra: null
  },
  {
    nome: "Mahal Zé Barbudo",
    data_inicio: "2025-12-30",
    data_fim: "2025-12-30",
    cidade: "Trancoso",
    lineup: "OPEN BAR PREMIUM",
    url_social: "",
    url_compra: null
  },
  {
    nome: "Sundance Festival 2026 - 30/12",
    data_inicio: "2025-12-30",
    data_fim: "2025-12-30",
    cidade: "Arraial d'Ajuda",
    lineup: "Show com Jorge & Mateus",
    url_social: "https://www.instagram.com/sundancearraial",
    url_compra: null
  },
  {
    nome: "Réveillon Só Coisas Boas - 30/12",
    data_inicio: "2025-12-30",
    data_fim: "2025-12-30",
    cidade: "Arraial d'Ajuda",
    lineup: "Festa",
    url_social: "https://www.instagram.com/socoisasboas",
    url_compra: null
  },
  {
    nome: "VIVA CARAÍVA 2026",
    data_inicio: "2025-12-31",
    data_fim: "2025-12-31",
    cidade: "Caraíva",
    lineup: "Virada do Ano",
    url_social: "https://www.instagram.com/vivacaraiva",
    url_compra: null
  },
  {
    nome: "Réveillon Ayumar 2026 - 31/12",
    data_inicio: "2025-12-31",
    data_fim: "2025-12-31",
    cidade: "Trancoso",
    lineup: "Bell Marques (Virada do Ano)",
    url_social: "https://www.instagram.com/ayumartrancoso",
    url_compra: "https://zig.tickets/eventos/reveillon-ayumar?code=toca-organic",
    descricao_sugerida: "Virada de Ano com Bell Marques no Fly Club Trancoso! Réveillon Ayumar 2026 apresenta a lenda do axé music, open bar premium ilimitado, fogos de artifício sobre o mar e estrutura cinco estrelas. Use código toca-organic para garantir mesa VIP."
  },
  {
    nome: "Réveillon Aura Trancoso 2026",
    data_inicio: "2025-12-31",
    data_fim: "2025-12-31",
    cidade: "Trancoso",
    lineup: "CUROL + MECA (Full Open Bar Premium)",
    url_social: "https://www.instagram.com/auratrancoso",
    url_compra: null
  },
  {
    nome: "Réveillon Corujão 2026",
    data_inicio: "2025-12-31",
    data_fim: "2025-12-31",
    cidade: "Arraial d'Ajuda",
    lineup: "Virada do Ano (Pop/Rock / Brasilidades)",
    url_social: "https://www.instagram.com/corujaoarraial",
    url_compra: null
  },
  {
    nome: "Sundance - Réveillon Arraial d'Ajuda 2026 - 31/12",
    data_inicio: "2025-12-31",
    data_fim: "2025-12-31",
    cidade: "Arraial d'Ajuda",
    lineup: "Vintage Culture (Réveillon Open bar premium)",
    url_social: "https://www.instagram.com/sundancearraial",
    url_compra: null
  },
  {
    nome: "Réveillon Só Coisas Boas - 31/12",
    data_inicio: "2025-12-31",
    data_fim: "2025-12-31",
    cidade: "Arraial d'Ajuda",
    lineup: "Virada do Ano",
    url_social: "https://www.instagram.com/socoisasboas",
    url_compra: null
  },
  {
    nome: "Réveillon Beat Beach 2026",
    data_inicio: "2025-12-31",
    data_fim: "2025-12-31",
    cidade: "Arraial d'Ajuda",
    lineup: "Virada do Ano",
    url_social: "https://www.instagram.com/beatbeacharraial",
    url_compra: null
  },
  {
    nome: "Haute - Taipei",
    data_inicio: "2025-12-31",
    data_fim: "2025-12-31",
    cidade: "Trancoso",
    lineup: "Praia do Taipe",
    url_social: "https://www.instagram.com/haute",
    url_compra: null
  },
  {
    nome: "Haute - Maracutaia - 02/01",
    data_inicio: "2026-01-02",
    data_fim: "2026-01-02",
    cidade: "Trancoso",
    lineup: "Festa da Haute",
    url_social: "https://www.instagram.com/haute",
    url_compra: null
  },
  {
    nome: "Réveillon Ayumar 2026 - 02/01",
    data_inicio: "2026-01-02",
    data_fim: "2026-01-02",
    cidade: "Trancoso",
    lineup: "Evento (A confirmar)",
    url_social: "https://www.instagram.com/ayumartrancoso",
    url_compra: "https://zig.tickets/eventos/reveillon-ayumar?code=toca-organic"
  },
  {
    nome: "Sundance Festival 2026 - 02/01",
    data_inicio: "2026-01-02",
    data_fim: "2026-01-02",
    cidade: "Arraial d'Ajuda",
    lineup: "Show (A confirmar)",
    url_social: "https://www.instagram.com/sundancearraial",
    url_compra: null
  },
  {
    nome: "Aura Sunset - 03/01",
    data_inicio: "2026-01-03",
    data_fim: "2026-01-03",
    cidade: "Trancoso",
    lineup: "Sunset",
    url_social: "https://www.instagram.com/auratrancoso",
    url_compra: null
  },
  {
    nome: "SANTO VERÃO 2026",
    data_inicio: "2026-01-03",
    data_fim: "2026-01-03",
    cidade: "Arraial d'Ajuda",
    lineup: "Festa UIKI",
    url_social: "https://www.instagram.com/santoverao",
    url_compra: null
  },
  {
    nome: "Réveillon Só Coisas Boas - 03/01",
    data_inicio: "2026-01-03",
    data_fim: "2026-01-03",
    cidade: "Arraial d'Ajuda",
    lineup: "Festa",
    url_social: "https://www.instagram.com/socoisasboas",
    url_compra: null
  },
  {
    nome: "The roof - 07/01",
    data_inicio: "2026-01-07",
    data_fim: "2026-01-07",
    cidade: "Caraíva",
    lineup: "DJs",
    url_social: "",
    url_compra: null
  },
  {
    nome: "Haute - End of Season",
    data_inicio: "2026-01-10",
    data_fim: "2026-01-10",
    cidade: "Trancoso",
    lineup: "Festa de encerramento",
    url_social: "https://www.instagram.com/haute",
    url_compra: null
  }
];

function AdminProcessarEventosContent() {
  const [processing, setProcessing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [generateDescriptions, setGenerateDescriptions] = useState(true);

  const handleProcessBatch = async () => {
    setProcessing(true);
    const newResults = [];

    for (let i = 0; i < EVENTOS_BASE.length; i++) {
      setCurrentIndex(i);
      const evento = EVENTOS_BASE[i];

      try {
        // Gerar descrição se não tiver
        let descricao = evento.descricao_sugerida || '';
        
        if (!descricao && generateDescriptions) {
          try {
            const llmResponse = await base44.integrations.Core.InvokeLLM({
              prompt: `Crie uma descrição de venda curta (60-90 palavras) para este evento de Réveillon:

Nome: ${evento.nome}
Local: ${evento.cidade}
Lineup: ${evento.lineup}
Instagram: ${evento.url_social}

A descrição deve:
- Ser envolvente e vendedora
- Destacar diferenciais (open bar premium, estrutura, DJs, localização)
- Ter tom elegante e sofisticado
- Usar emojis estrategicamente
- Mencionar "${evento.cidade}" e criar urgência`,
              add_context_from_internet: false
            });
            descricao = llmResponse;
          } catch (err) {
            console.error('Erro ao gerar descrição:', err);
          }
        }

        // Mapear para schema EventoAnoNovo
        const eventoData = {
          nome: evento.nome,
          data: evento.data_inicio,
          localidade: evento.cidade,
          local: evento.url_social ? `Instagram: @${evento.url_social.split('/').pop()}` : evento.cidade,
          detalhes: descricao || `${evento.lineup}`,
          tipo: "Evento de Ano Novo",
          status: "Confirmado",
          tags: [
            "Ano Novo",
            "Réveillon",
            evento.cidade
          ].filter(Boolean),
          link_compra: evento.url_compra || undefined
        };

        // Verificar se já existe
        const existing = await base44.asServiceRole.entities.EventoAnoNovo.filter({
          nome: evento.nome,
          data: evento.data_inicio
        });

        if (existing.length === 0) {
          await base44.asServiceRole.entities.EventoAnoNovo.create(eventoData);
          newResults.push({ evento: evento.nome, status: 'importado', descricao });
        } else {
          newResults.push({ evento: evento.nome, status: 'já existe', descricao });
        }

        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        newResults.push({ evento: evento.nome, status: 'erro', error: error.message });
      }
    }

    setResults(newResults);
    setProcessing(false);
    toast.success(`Processamento concluído! ${newResults.filter(r => r.status === 'importado').length} eventos importados`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="container mx-auto max-w-6xl">
        <Link to={createPageUrl("AdminDashboard")}>
          <Button variant="ghost" className="text-white/70 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Dashboard
          </Button>
        </Link>

        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Processar Eventos HTML</CardTitle>
            <p className="text-gray-400 text-sm">
              {EVENTOS_BASE.length} eventos coletados do arquivo HTML
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Options */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="generate-desc"
                checked={generateDescriptions}
                onChange={(e) => setGenerateDescriptions(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="generate-desc" className="text-gray-300 text-sm">
                Gerar descrições automaticamente com IA (eventos sem descrição)
              </label>
            </div>

            {/* Process Button */}
            <Button
              onClick={handleProcessBatch}
              disabled={processing}
              className="bg-purple-600 hover:bg-purple-700 w-full"
              size="lg"
            >
              {processing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processando {currentIndex + 1}/{EVENTOS_BASE.length}...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Processar e Importar Todos
                </>
              )}
            </Button>

            {/* Progress */}
            {processing && (
              <div className="bg-gray-900 rounded p-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentIndex + 1) / EVENTOS_BASE.length) * 100}%` }}
                  />
                </div>
                <p className="text-gray-400 text-sm mt-2 text-center">
                  {Math.round(((currentIndex + 1) / EVENTOS_BASE.length) * 100)}% completo
                </p>
              </div>
            )}

            {/* Results */}
            {results.length > 0 && (
              <div className="bg-gray-900 rounded p-4 max-h-96 overflow-y-auto">
                <h3 className="text-white font-semibold mb-3">Resultados:</h3>
                <div className="space-y-2">
                  {results.map((r, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded text-sm ${
                        r.status === 'importado'
                          ? 'bg-green-900/20 text-green-400'
                          : r.status === 'já existe'
                          ? 'bg-yellow-900/20 text-yellow-400'
                          : 'bg-red-900/20 text-red-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {r.status === 'importado' ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : r.status === 'já existe' ? (
                          <AlertCircle className="w-4 h-4" />
                        ) : (
                          <AlertCircle className="w-4 h-4" />
                        )}
                        <span className="font-medium">{r.evento}</span>
                        <span className="text-xs opacity-70">• {r.status}</span>
                      </div>
                      {r.descricao && (
                        <p className="text-xs mt-1 opacity-80">{r.descricao.slice(0, 100)}...</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Preview dos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {EVENTOS_BASE.slice(0, 10).map((ev, idx) => (
                <div key={idx} className="bg-gray-900 rounded p-3">
                  <h4 className="text-white font-semibold text-sm">{ev.nome}</h4>
                  <p className="text-gray-400 text-xs mt-1">{ev.data_inicio} • {ev.cidade}</p>
                  <p className="text-gray-500 text-xs mt-1">{ev.lineup}</p>
                  {ev.url_compra && (
                    <p className="text-purple-400 text-xs mt-1">✅ Link de compra disponível</p>
                  )}
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs text-center mt-4">
              ... e mais {EVENTOS_BASE.length - 10} eventos
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminProcessarEventos() {
  return (
    <ProtectedRoute>
      <AdminProcessarEventosContent />
    </ProtectedRoute>
  );
}