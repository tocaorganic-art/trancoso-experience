import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8">
        <div className="container mx-auto px-6">
          <Link to={createPageUrl("Home")}>
            <Button variant="ghost" className="text-white/70 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm mb-4">
              <Shield className="w-4 h-4" />
              LGPD - Lei Geral de Proteção de Dados
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Política de Privacidade
            </h1>
            <p className="text-blue-100 text-lg">
              Última atualização: 06 de Dezembro de 2024
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introdução</h2>
            <p className="text-gray-700 leading-relaxed">
              A Toca Experience, atuando como DJ Tony Monteiro e Enzo Furtado, está comprometida com a proteção 
              dos dados pessoais de seus clientes e visitantes. Esta Política de Privacidade descreve como 
              coletamos, usamos, armazenamos e protegemos suas informações pessoais, em conformidade com a 
              Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Dados Coletados</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Coletamos os seguintes tipos de dados pessoais:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Dados de Identificação:</strong> Nome completo, e-mail, telefone/WhatsApp</li>
              <li><strong>Dados do Evento:</strong> Tipo de evento, data, local, número de convidados, orçamento</li>
              <li><strong>Dados de Navegação:</strong> Endereço IP, cookies, páginas visitadas, tempo de permanência</li>
              <li><strong>Dados de Comunicação:</strong> Histórico de conversas via chatbot, e-mail e WhatsApp</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalidade do Tratamento</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Utilizamos seus dados pessoais para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Processar e responder suas solicitações de cotação</li>
              <li>Enviar propostas comerciais e contratos</li>
              <li>Comunicar sobre eventos, novidades e promoções (com seu consentimento)</li>
              <li>Melhorar nossos serviços através de análises e estatísticas</li>
              <li>Cumprir obrigações legais e contratuais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Base Legal</h2>
            <p className="text-gray-700 leading-relaxed">
              O tratamento de seus dados pessoais é realizado com base em:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-3">
              <li><strong>Consentimento:</strong> Para envio de comunicações de marketing</li>
              <li><strong>Execução de Contrato:</strong> Para processar sua solicitação e prestar serviços</li>
              <li><strong>Legítimo Interesse:</strong> Para análises estatísticas e melhorias do serviço</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Compartilhamento de Dados</h2>
            <p className="text-gray-700 leading-relaxed">
              Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing. 
              Podemos compartilhar dados apenas com:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-3">
              <li>Prestadores de serviços essenciais (hospedagem, e-mail marketing)</li>
              <li>Autoridades legais, quando exigido por lei</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Seus Direitos (LGPD)</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              De acordo com a LGPD, você tem direito a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Acesso:</strong> Confirmar se tratamos seus dados e solicitar cópia</li>
              <li><strong>Correção:</strong> Solicitar correção de dados incompletos ou incorretos</li>
              <li><strong>Exclusão:</strong> Solicitar eliminação de dados desnecessários</li>
              <li><strong>Portabilidade:</strong> Solicitar transferência de dados para outro fornecedor</li>
              <li><strong>Revogação de Consentimento:</strong> Cancelar permissões de marketing a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Segurança dos Dados</h2>
            <p className="text-gray-700 leading-relaxed">
              Implementamos medidas técnicas e organizacionais para proteger seus dados contra acesso não 
              autorizado, perda, destruição ou alteração. Isso inclui criptografia, controles de acesso e 
              backups regulares.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Retenção de Dados</h2>
            <p className="text-gray-700 leading-relaxed">
              Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas 
              nesta política ou conforme exigido por lei. Após esse período, os dados são eliminados de forma 
              segura.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Utilizamos cookies para melhorar sua experiência de navegação, analisar o tráfego e personalizar 
              conteúdo. Você pode desativar cookies nas configurações do seu navegador, mas isso pode afetar 
              a funcionalidade do site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contato</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, entre em contato:
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-800"><strong>E-mail:</strong> tocaorganic@gmail.com</p>
              <p className="text-gray-800"><strong>WhatsApp:</strong> (21) 97282-4659</p>
              <p className="text-gray-800"><strong>Endereço:</strong> Trancoso, Bahia - Brasil</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Alterações</h2>
            <p className="text-gray-700 leading-relaxed">
              Esta Política de Privacidade pode ser atualizada periodicamente. Notificaremos sobre mudanças 
              significativas através do e-mail cadastrado ou no próprio site.
            </p>
          </section>

          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <p className="text-center text-gray-700">
              <strong>Ao utilizar nosso site e serviços, você concorda com esta Política de Privacidade.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}