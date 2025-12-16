import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";

export default function ConfiguracaoGoogleAds() {
  const [copied, setCopied] = React.useState(false);

  const promptCompleto = `# PROMPT DE CONFIGURAÇÃO GOOGLE ADS - RÉVEILLON TRANCOSO 2026

## OBJETIVO
Configurar a campanha de Google Ads "Réveillon Trancoso 2026" na conta AW-17649743667, seguindo o plano detalhado para venda de ingressos dos eventos Ayumar (Wesley Safadão, Jorge & Mateus, Bell Marques) e Elemental.

## INSTRUÇÕES PARA O AGENTE MANUS

1. **Acessar a Conta Google Ads** do usuário (o usuário garantirá o acesso)
2. **Criar uma nova Campanha de Pesquisa** com o objetivo "Vendas"
3. **Configurar a Campanha** estritamente de acordo com os parâmetros abaixo

---

## PARÂMETROS ESSENCIAIS DA CAMPANHA

### Informações Básicas
- **Nome:** Réveillon Trancoso 2026
- **Tipo:** Pesquisa (Search)
- **Objetivo:** Vendas
- **Estratégia de Lance:** Maximizar Conversões
- **Rede:** Somente Pesquisa Google
- **URL Final:** https://tocaexperience.com.br/EventosAnoNovo
- **URL de Exibição:** tocaexperience.com.br
- **Idioma:** Português (Brasil)

### Orçamento
- **Orçamento Diário:** R$ 15,00
- **CPC Máximo:** R$ 0,30
- **Gasto Estimado Total:** R$ 195,00 (13 dias)

### Período
- **Data de Início:** 16/12/2025
- **Data de Término:** 28/12/2025
- **Duração:** 13 dias

### Localizações Alvo (6 Cidades)
1. **Belo Horizonte**, MG (mercado primário)
2. **São Paulo**, SP (mercado primário)
3. **Porto Seguro**, BA (proximidade)
4. **Trancoso**, BA (local do evento)
5. **Caraíva**, BA (proximidade)
6. **Arraial d'Ajuda**, BA (proximidade)

### Rastreamento de Conversões
- **ID de Conversão:** AW-17649743667/Px_YCKCb3s4bELPuhuBB
- **URL de Conversão:** https://tocaexperience.com.br/Obrigado
- **Tracking Template:** LPURL?utm_source=google&utm_medium=cpc&utm_campaign=reveillon2026

---

## ESTRUTURA DE GRUPOS DE ANÚNCIOS (3 GRUPOS)

### Grupo 1: Shows Nacionais (Ayumar)
**Foco:** Artistas Wesley Safadão, Jorge & Mateus, Bell Marques  
**URL Final:** https://tocaexperience.com.br/EventosAnoNovo

**Palavras-Chave (Correspondência de Frase):**
- "Wesley Safadão Trancoso ingresso"
- "Wesley Safadão Réveillon 2026"
- "Jorge e Mateus Fly Club"
- "Jorge e Mateus Trancoso ingresso"
- "Bell Marques Réveillon Trancoso"
- "Bell Marques Trancoso 2026"

**Palavras-Chave (Correspondência Exata):**
- [Wesley Safadão Trancoso]
- [Jorge e Mateus Trancoso]
- [Bell Marques Trancoso]

**Palavras-Chave Negativas:**
```
-letras -videoclipe -biografia -gratis -gratuito -pirata -revenda
```

---

### Grupo 2: Pacotes de Festas (Elemental/Ayumar)
**Foco:** Pacotes completos e eventos específicos  
**URL Final:** https://tocaexperience.com.br/EventosAnoNovo

**Palavras-Chave (Correspondência de Frase):**
- "Réveillon Elemental Trancoso 2026"
- "Réveillon Ayumar Trancoso 2026"
- "Pacote festas Trancoso"
- "Ingressos Fly Club Trancoso"
- "Pacote 5 dias Trancoso Réveillon"

**Palavras-Chave (Correspondência Exata):**
- [Pacote festas Trancoso]
- [Ingressos Fly Club Trancoso]

**Palavras-Chave Negativas:**
```
-barato -revenda -pirata -esquema -gratuito
```

---

### Grupo 3: Localização e Data (Geral)
**Foco:** Buscas genéricas e localização (BH, SP, Porto Seguro)  
**URL Final:** https://tocaexperience.com.br/EventosAnoNovo

**Palavras-Chave (Correspondência de Frase):**
- "Ingressos Réveillon Trancoso 2026"
- "Festa Trancoso Ano Novo"
- "Onde comprar ingresso Réveillon Bahia"
- "Réveillon Trancoso de Belo Horizonte"
- "Pacotes Trancoso São Paulo"
- "Eventos Trancoso Dezembro"

**Palavras-Chave (Correspondência Exata):**
- [Festa Trancoso Ano Novo]
- [Eventos Trancoso Dezembro]

**Palavras-Chave Negativas:**
-gratis -gratuito -caseiro -em_casa

**Observação Especial:** Este grupo deve incluir termos de busca que reflitam a intenção de compra nas cidades de Belo Horizonte, São Paulo e Porto Seguro.

---

## ANÚNCIOS RESPONSIVOS DE PESQUISA (RSA)

### Títulos (Fixar os 3 primeiros)
1. ✅ **Réveillon Trancoso 2026 - Ingressos Oficiais**
2. ✅ **Shows Nacionais: Safadão, J&M, Bell Marques**
3. ✅ **Pacotes Ayumar & Elemental - Garanta Já!**
4. Fly Club Trancoso - Festas Premium
5. Últimos Ingressos - Não Perca!
6. Réveillon Exclusivo na Bahia

### Descrições
**Descrição 1:**
Compre seus ingressos oficiais para o Réveillon Ayumar e Elemental em Trancoso. Shows nacionais e festas open bar premium.

**Descrição 2:**
Venda de ingressos para os eventos mais exclusivos de Trancoso. Pacotes de 5 dias no Fly Club e Almar.

**Descrição 3:**
Não fique de fora! Garanta seu lugar nas festas com Wesley Safadão, Jorge & Mateus e Bell Marques.

---

## EXTENSÕES DE ANÚNCIO

### Sitelinks (4 links)
1. **Eventos de Ano Novo** → https://tocaexperience.com.br/EventosAnoNovo
2. **Solicitar Cotação** → https://tocaexperience.com.br/Cotacao
3. **DJ para Casamentos** → https://tocaexperience.com.br/CasamentosTrancoso
4. **Locação de Som** → https://tocaexperience.com.br/LocacaoSom

### Callouts (5 benefícios)
- Open Bar Premium
- Shows Nacionais
- Local Exclusivo
- Pacotes de 5 Dias
- Experiência Única

---

## MÉTRICAS ESPERADAS

| Métrica | Valor Estimado |
|---------|----------------|
| Cliques Diários | 50 cliques |
| CTR Alvo | > 3% |
| Taxa de Conversão | > 2% |
| CPA Alvo | < R$ 15,00 |
| ROAS Alvo | > 3:1 |

---

## CHECKLIST DE IMPLEMENTAÇÃO

- [ ] Acessar conta Google Ads AW-17649743667
- [ ] Criar campanha "Réveillon Trancoso 2026"
- [ ] Configurar orçamento R$ 15,00/dia
- [ ] Definir datas: 16/12 a 28/12/2025
- [ ] Adicionar 6 localizações
- [ ] Criar 3 grupos de anúncios
- [ ] Adicionar palavras-chave (15+ por grupo)
- [ ] Configurar palavras-chave negativas
- [ ] Criar anúncios RSA (6 títulos + 3 descrições)
- [ ] Fixar 3 primeiros títulos
- [ ] Adicionar 4 sitelinks
- [ ] Adicionar 5 callouts
- [ ] Configurar tracking template
- [ ] Validar rastreamento de conversão
- [ ] Ativar campanha

---

## NOTAS IMPORTANTES

1. **Todas as URLs devem usar HTTPS**
2. **Tracking template é obrigatório para UTMs**
3. **Fixar os 3 primeiros títulos garante visibilidade da marca**
4. **Monitorar métricas diariamente nos primeiros 3 dias**
5. **Ajustar lances após coletar dados de 48-72 horas**

---

**Documento criado em:** 16/12/2025
**Versão:** 1.0 - Pronto para Implementação
**Status:** ✅ Aguardando execução`;

  const copiarPrompt = () => {
    navigator.clipboard.writeText(promptCompleto);
    setCopied(true);
    toast.success("Prompt copiado para área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link to={createPageUrl("Home")}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Configuração Google Ads - Réveillon 2026
          </h1>
          <p className="text-gray-600">
            Prompt completo para implementação da campanha no Google Ads
          </p>
        </div>

        {/* Card com botão de copiar */}
        <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-2xl">📋 Prompt de Comando Completo</span>
              <Button 
                onClick={copiarPrompt}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Prompt
                  </>
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-xs leading-relaxed whitespace-pre-wrap">
              {promptCompleto}
            </pre>
          </CardContent>
        </Card>

        {/* Quick Reference Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">💰 Orçamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Diário:</span>
                  <span className="font-bold">R$ 15,00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CPC Máx:</span>
                  <span className="font-bold">R$ 0,30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total (13 dias):</span>
                  <span className="font-bold text-blue-600">R$ 195,00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📅 Período</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Início:</span>
                  <span className="font-bold">16/12/2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Término:</span>
                  <span className="font-bold">28/12/2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duração:</span>
                  <span className="font-bold text-blue-600">13 dias</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎯 Conversões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">ID:</p>
                  <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                    AW-17649743667/Px_YCKCb3s4bELPuhuBB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* URLs de Referência */}
        <Card>
          <CardHeader>
            <CardTitle>🔗 URLs do Site (Referência Rápida)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 font-semibold mb-2">Landing Pages:</p>
                <ul className="space-y-1 font-mono text-xs">
                  <li>✅ /EventosAnoNovo</li>
                  <li>✅ /Obrigado (conversão)</li>
                </ul>
              </div>
              <div>
                <p className="text-gray-600 font-semibold mb-2">Sitelinks:</p>
                <ul className="space-y-1 font-mono text-xs">
                  <li>✅ /Cotacao</li>
                  <li>✅ /CasamentosTrancoso</li>
                  <li>✅ /LocacaoSom</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instruções de Uso */}
        <Card className="mt-6 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardHeader>
            <CardTitle className="text-green-800">📝 Como Usar Este Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
              <li>Clique em <strong>"Copiar Prompt"</strong> acima</li>
              <li>Cole o prompt completo no Google Ads ou ferramenta de IA</li>
              <li>Siga o checklist de implementação linha por linha</li>
              <li>Valide todas as URLs antes de ativar</li>
              <li>Configure o rastreamento de conversão</li>
              <li>Ative a campanha e monitore nas primeiras 48h</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}