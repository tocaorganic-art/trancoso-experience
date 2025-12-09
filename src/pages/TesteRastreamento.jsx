import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Chrome, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function TesteRastreamento() {
  const [checklist, setChecklist] = useState({
    extensaoGoogleTag: false,
    extensaoMetaPixel: false,
    testeFormulario: false,
    verificacaoGoogleAds: false,
    verificacaoMetaLead: false
  });

  const toggleCheckbox = (key) => {
    setChecklist({ ...checklist, [key]: !checklist[key] });
  };

  const progresso = Object.values(checklist).filter(Boolean).length;
  const total = Object.keys(checklist).length;
  const porcentagem = Math.round((progresso / total) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link to={createPageUrl("AdminDashboard")}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Dashboard
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-4">
              <Chrome className="w-4 h-4" />
              Validação de Rastreamento
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Teste de Conversão
            </h1>
            <p className="text-gray-600">
              Siga este guia para validar que o Google Ads e Meta Pixel estão rastreando corretamente
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progresso</span>
              <span>{porcentagem}% Completo</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${porcentagem}%` }}
              />
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.extensaoGoogleTag}
                  onChange={() => toggleCheckbox("extensaoGoogleTag")}
                  className="mt-1 w-5 h-5 text-blue-600"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">
                    1. Instalar Google Tag Assistant
                  </h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Extensão oficial do Google para validar tags de rastreamento
                  </p>
                  <a
                    href="https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Chrome className="w-4 h-4" />
                    Instalar Extensão
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </label>
            </div>

            {/* Step 2 */}
            <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.extensaoMetaPixel}
                  onChange={() => toggleCheckbox("extensaoMetaPixel")}
                  className="mt-1 w-5 h-5 text-purple-600"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">
                    2. Instalar Meta Pixel Helper
                  </h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Extensão oficial do Facebook para validar o Meta Pixel
                  </p>
                  <a
                    href="https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Chrome className="w-4 h-4" />
                    Instalar Extensão
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </label>
            </div>

            {/* Step 3 */}
            <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.testeFormulario}
                  onChange={() => toggleCheckbox("testeFormulario")}
                  className="mt-1 w-5 h-5 text-green-600"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">
                    3. Testar Formulário de Cotação
                  </h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Preencha e envie o formulário para gerar a conversão
                  </p>
                  <Link to={createPageUrl("Cotacao")}>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Ir para Formulário de Cotação
                    </Button>
                  </Link>
                </div>
              </label>
            </div>

            {/* Step 4 */}
            <div className="border-l-4 border-orange-500 pl-6 py-4 bg-orange-50 rounded-r-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.verificacaoGoogleAds}
                  onChange={() => toggleCheckbox("verificacaoGoogleAds")}
                  className="mt-1 w-5 h-5 text-orange-600"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">
                    4. Verificar Google Ads Conversion
                  </h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Na página /Obrigado, abra o Google Tag Assistant e procure:
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <p className="text-sm font-mono text-gray-700 mb-2">
                      ✓ Evento: <strong>conversion</strong>
                    </p>
                    <p className="text-sm font-mono text-gray-700 mb-2">
                      ✓ send_to: <strong>AW-17649743667/Px_YCKCb3s4bELPuhuBB</strong>
                    </p>
                    <p className="text-sm font-mono text-gray-700">
                      ✓ value: <strong>1.0 BRL</strong>
                    </p>
                  </div>
                </div>
              </label>
            </div>

            {/* Step 5 */}
            <div className="border-l-4 border-pink-500 pl-6 py-4 bg-pink-50 rounded-r-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.verificacaoMetaLead}
                  onChange={() => toggleCheckbox("verificacaoMetaLead")}
                  className="mt-1 w-5 h-5 text-pink-600"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">
                    5. Verificar Meta Pixel Lead Event
                  </h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Na página /Obrigado, abra o Meta Pixel Helper e procure:
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-pink-200">
                    <p className="text-sm font-mono text-gray-700 mb-2">
                      ✓ Pixel ID: <strong>1204913388179659</strong>
                    </p>
                    <p className="text-sm font-mono text-gray-700">
                      ✓ Evento: <strong>Lead</strong>
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Success Message */}
          {porcentagem === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl text-white text-center"
            >
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                🎉 Implementação 100% Validada!
              </h3>
              <p className="text-green-50">
                O Google Ads e Meta Pixel estão rastreando corretamente. Suas campanhas agora têm ROI mensurável!
              </p>
            </motion.div>
          )}

          {/* Links Úteis */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">🔗 Links Úteis</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://ads.google.com/aw/conversions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Google Ads Conversions</p>
                  <p className="text-xs text-gray-500">Painel de conversões</p>
                </div>
              </a>

              <a
                href="https://business.facebook.com/events_manager2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Facebook Events Manager</p>
                  <p className="text-xs text-gray-500">Painel de eventos</p>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}