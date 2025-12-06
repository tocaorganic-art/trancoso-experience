import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function TermosServico() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 py-8">
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
              <FileText className="w-4 h-4" />
              Termos e Condições
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Termos de Serviço
            </h1>
            <p className="text-purple-100 text-lg">
              Última atualização: 06 de Dezembro de 2024
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
            <p className="text-gray-700 leading-relaxed">
              Ao acessar e usar o site da Toca Experience e solicitar serviços de DJs Tony Monteiro e Enzo Furtado, 
              você concorda com estes Termos de Serviço. Se você não concordar, não utilize nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Serviços Oferecidos</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              A Toca Experience oferece:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Serviços de DJ para eventos (casamentos, festivais, corporativos, etc)</li>
              <li>Curadoria musical especializada em Afro House, Organic House e House Music</li>
              <li>Equipamentos Pioneer de última geração</li>
              <li>Produção musical e remixes (sob consulta)</li>
              <li>Consultoria para eventos musicais em Trancoso e região</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cotações e Contratação</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>3.1.</strong> Todas as cotações são personalizadas e variam conforme tipo de evento, localização, 
              duração e complexidade técnica.<br/><br/>
              <strong>3.2.</strong> O orçamento apresentado é válido por 15 dias corridos a partir da data de envio.<br/><br/>
              <strong>3.3.</strong> A confirmação do evento requer:<br/>
              - Assinatura de contrato<br/>
              - Pagamento de sinal de 50% do valor total<br/>
              - Confirmação de data e local com mínimo de 30 dias de antecedência
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Pagamento</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>4.1.</strong> Formas de pagamento aceitas: PIX, transferência bancária, cartão de crédito (com acréscimo).<br/><br/>
              <strong>4.2.</strong> Parcelamento:<br/>
              - 1ª parcela (50%): No ato da contratação<br/>
              - 2ª parcela (50%): Até 7 dias antes do evento<br/><br/>
              <strong>4.3.</strong> Pagamentos em atraso podem resultar no cancelamento do serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cancelamento e Reembolso</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>5.1.</strong> Cancelamento pelo cliente:<br/>
              - Com mais de 60 dias de antecedência: Reembolso de 80% do sinal<br/>
              - Entre 30-60 dias: Reembolso de 50% do sinal<br/>
              - Com menos de 30 dias: Sem reembolso<br/><br/>
              <strong>5.2.</strong> Cancelamento por motivo de força maior (chuva intensa, emergências): Remarcação sem custo adicional ou reembolso integral.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Obrigações do Cliente</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              O cliente deve fornecer:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Estrutura elétrica adequada (220V com aterramento)</li>
              <li>Espaço coberto ou protegido para equipamentos</li>
              <li>Acesso ao local com mínimo 2 horas de antecedência para montagem</li>
              <li>Alimentação e bebidas para equipe técnica (eventos com mais de 6 horas)</li>
              <li>Hospedagem (se evento fora de Trancoso com mais de 100km)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitação de Responsabilidade</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>7.1.</strong> A Toca Experience não se responsabiliza por:<br/>
              - Falhas técnicas causadas por infraestrutura inadequada do local<br/>
              - Atrasos causados por condições climáticas ou trânsito<br/>
              - Danos a equipamentos causados por terceiros<br/><br/>
              <strong>7.2.</strong> Nosso seguro cobre equipamentos próprios, mas não danos ao local do evento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Propriedade Intelectual</h2>
            <p className="text-gray-700 leading-relaxed">
              Todo conteúdo do site (textos, imagens, músicas, vídeos) é propriedade da Toca Experience ou 
              utilizado com licença. É proibida a reprodução sem autorização prévia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Uso do Site</h2>
            <p className="text-gray-700 leading-relaxed">
              É proibido:<br/>
              - Usar o site para fins ilegais ou não autorizados<br/>
              - Tentar acessar áreas restritas do sistema<br/>
              - Enviar spam ou conteúdo malicioso<br/>
              - Extrair dados sem autorização (scraping)
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Alterações nos Termos</h2>
            <p className="text-gray-700 leading-relaxed">
              Reservamo-nos o direito de modificar estes Termos a qualquer momento. Mudanças significativas 
              serão comunicadas por email. O uso continuado do site após alterações constitui aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Lei Aplicável</h2>
            <p className="text-gray-700 leading-relaxed">
              Estes Termos são regidos pelas leis brasileiras. Foro: Comarca de Porto Seguro, Bahia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contato</h2>
            <div className="bg-purple-50 p-6 rounded-lg">
              <p className="text-gray-800"><strong>Email:</strong> tocaorganic@gmail.com</p>
              <p className="text-gray-800"><strong>WhatsApp:</strong> (21) 97282-4659</p>
              <p className="text-gray-800"><strong>Endereço:</strong> Trancoso, Bahia - Brasil</p>
            </div>
          </section>

          <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
            <p className="text-center text-gray-700">
              <strong>Ao contratar nossos serviços, você concorda com estes Termos de Serviço.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}