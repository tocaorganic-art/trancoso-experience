# 📚 DOCUMENTAÇÃO TÉCNICA - TOCA EXPERIENCE PLATFORM

## 🎯 VISÃO GERAL DO SISTEMA

### Arquitetura Implementada
```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Home     │  │    Cotação   │  │    Admin     │       │
│  │   Page     │  │  MultiStep   │  │  Dashboard   │       │
│  └────────────┘  └──────────────┘  └──────────────┘       │
│         │                │                  │               │
│         └────────────────┴──────────────────┘               │
│                          ↓                                   │
│              ┌────────────────────┐                         │
│              │  Chatbot Widget    │                         │
│              │  (FloatingChat)    │                         │
│              └────────────────────┘                         │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Base44)                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              ENTITIES (Database)                      │  │
│  │  • EventData        • LeadFollowUp                   │  │
│  │  • EmailSequence    • ABTest                         │  │
│  │  • UserConsent      • Release / BlogPost            │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           BACKEND FUNCTIONS (Deno)                    │  │
│  │  • autoFollowUp.js    - Automação de follow-up      │  │
│  │  • mlRecommendations  - IA e scoring de leads       │  │
│  │  • emailMarketing     - Sequência de emails         │  │
│  │  • whatsappWebhook    - Integração WhatsApp         │  │
│  │  • leadNotification   - Alertas em tempo real       │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         INTEGRATIONS (External Services)              │  │
│  │  • Core.InvokeLLM     - OpenAI GPT-4                │  │
│  │  • Core.SendEmail     - Brevo Email Service         │  │
│  │  • WhatsApp API       - Meta Business Platform      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 ENTIDADES IMPLEMENTADAS

### 1. EventData (Lead Principal)
**Caminho:** `entities/EventData.json`

**Campos:**
- `client_name` - Nome do cliente
- `client_email` - Email do cliente
- `client_phone` - Telefone/WhatsApp
- `event_type` - Tipo de evento (casamento, festival, etc)
- `event_date` - Data do evento
- `city` - Localidade
- `guest_count` - Número de convidados
- `budget_requested` - Faixa de orçamento solicitada
- `budget_final` - Orçamento final fechado
- `conversion_status` - Status (pending, contacted, converted)
- `notes` - Observações adicionais

**Uso:**
```javascript
// Criar lead
await base44.entities.EventData.create({
  client_name: "João Silva",
  client_email: "joao@email.com",
  event_type: "casamento",
  conversion_status: "pending"
});

// Buscar leads
const leads = await base44.entities.EventData.list('-created_date', 50);
```

---

### 2. LeadFollowUp (Automação de Follow-up)
**Caminho:** `entities/LeadFollowUp.json`

**Campos:**
- `lead_id` - ID do lead (EventData)
- `status` - Status do follow-up (pending, contacted, closed_won, etc)
- `last_contact_date` - Data do último contato
- `next_contact_date` - Próximo contato agendado
- `contact_attempts` - Número de tentativas
- `contact_channel` - Canal (email, whatsapp, phone)
- `notes` - Observações

**Uso:**
```javascript
// Criar registro de follow-up
await base44.entities.LeadFollowUp.create({
  lead_id: "abc123",
  status: "contacted",
  last_contact_date: new Date().toISOString(),
  contact_channel: "whatsapp"
});
```

---

### 3. EmailSequence (Email Marketing)
**Caminho:** `entities/EmailSequence.json`

**Campos:**
- `lead_id` - ID do lead
- `sequence_step` - Número do email (1-5)
- `email_type` - Tipo (confirmation, services, offer, etc)
- `sent_date` - Data de envio
- `opened_date` - Data de abertura
- `clicked_date` - Data de clique
- `status` - Status (sent, opened, clicked, bounced)

**Uso:**
```javascript
// Registrar envio de email
await base44.entities.EmailSequence.create({
  lead_id: "abc123",
  sequence_step: 1,
  email_type: "confirmation",
  sent_date: new Date().toISOString(),
  status: "sent"
});
```

---

### 4. ABTest (Testes A/B)
**Caminho:** `entities/ABTest.json`

**Campos:**
- `test_name` - Nome do teste
- `variant` - Variante (A ou B)
- `element_tested` - Elemento testado (CTA, form, etc)
- `user_session_id` - ID da sessão do usuário
- `viewed` - Se o usuário viu
- `clicked` - Se o usuário clicou
- `converted` - Se o usuário converteu
- `revenue` - Receita gerada

**Uso:**
```javascript
// Registrar visualização
await base44.entities.ABTest.create({
  test_name: "CTA Button",
  variant: "A",
  element_tested: "cta_button",
  user_session_id: "xyz789",
  viewed: true
});
```

---

### 5. UserConsent (LGPD Compliance)
**Caminho:** `entities/UserConsent.json`

**Campos:**
- `user_email` - Email do usuário
- `email_marketing_consent` - Consentimento email
- `whatsapp_consent` - Consentimento WhatsApp
- `sms_consent` - Consentimento SMS
- `phone_consent` - Consentimento telefone
- `consent_date` - Data do consentimento
- `ip_address` - IP do usuário

---

## 🔧 FUNÇÕES BACKEND

### 1. autoFollowUp.js
**Rota:** `POST /api/autoFollowUp`

**Descrição:** Executa follow-up automático baseado em triggers temporais

**Triggers:**
- 1h: Email de confirmação
- 24h: Lembrete WhatsApp
- 72h: Email com cases
- 7 dias: Oferta especial

**Uso:**
```bash
curl -X GET https://seu-app.base44.app/api/autoFollowUp
```

---

### 2. mlRecommendations.js
**Rota:** `POST /api/mlRecommendations`

**Ações Disponíveis:**

#### a) Previsão de Orçamento
```javascript
const response = await fetch('/api/mlRecommendations', {
  method: 'POST',
  body: JSON.stringify({
    action: 'predict_budget',
    data: {
      event_type: 'casamento',
      city: 'Trancoso',
      guest_count: 150,
      duration_hours: 6
    }
  })
});
// Retorna: { predicted_budget, range_min, range_max, confidence }
```

#### b) Recomendação de Setlist
```javascript
const response = await fetch('/api/mlRecommendations', {
  method: 'POST',
  body: JSON.stringify({
    action: 'recommend_setlist',
    data: {
      event_type: 'casamento',
      atmosphere: 'romantic',
      music_preference: 'organic'
    }
  })
});
// Retorna: { recommended_styles, confidence_score }
```

#### c) Lead Scoring
```javascript
const response = await fetch('/api/mlRecommendations', {
  method: 'POST',
  body: JSON.stringify({
    action: 'score_lead',
    data: {
      event_type: 'casamento',
      budget_requested: 'acima_50k',
      city: 'Trancoso',
      guest_count: 200
    }
  })
});
// Retorna: { lead_score: 85, priority: 'hot', recommended_action }
```

---

### 3. emailMarketing.js
**Rota:** `POST /api/emailMarketing`

**Ações:**

#### a) Enviar Sequência
```javascript
await fetch('/api/emailMarketing', {
  method: 'POST',
  body: JSON.stringify({
    action: 'send_sequence',
    data: { lead_id: 'abc123', sequence_step: 1 }
  })
});
```

#### b) Email em Massa
```javascript
await fetch('/api/emailMarketing', {
  method: 'POST',
  body: JSON.stringify({
    action: 'send_bulk',
    data: { segment: 'pending', template_id: 1 }
  })
});
```

---

### 4. whatsappWebhook.js
**Rota:** `POST /api/whatsappWebhook` (webhook)

**Configuração WhatsApp:**
1. Criar conta WhatsApp Business
2. Configurar webhook URL: `https://seu-app/api/whatsappWebhook`
3. Definir token de verificação
4. Adicionar templates aprovados

---

## 🎨 COMPONENTES UI

### 1. AdminDashboard (Painel Admin)
**Rota:** `/admin`

**Abas:**
- Visão Geral (QuickStats + LeadsDashboard)
- Funil de Conversão (ConversionFunnel)
- Receita (RevenueChart)
- Testes A/B (ABTestManager)

**Acesso:**
```javascript
// No navegador
https://tocaexperience.com.br/admin
```

---

### 2. FloatingChatWidget (Chatbot)
**Localização:** Todas as páginas (canto inferior direito)

**Recursos:**
- Respostas FAQ automáticas
- Integração com LLM (IA)
- Qualificação de leads
- Escalação para vendedor

---

### 3. ABTestTracker (Testes A/B)
**Uso:**
```jsx
import ABTestTracker from "@/components/tracking/ABTestTracker";

<ABTestTracker 
  testName="CTA Button"
  element="cta_button"
>
  {({ variant, trackClick, trackConversion }) => (
    <Button onClick={trackClick}>
      {variant === 'A' ? 'Solicitar Proposta' : 'Agendar Consulta'}
    </Button>
  )}
</ABTestTracker>
```

---

## 📊 MÉTRICAS E ANALYTICS

### Métricas Disponíveis no Dashboard:
1. **Leads Este Mês** - Total de leads recebidos
2. **Taxa de Conversão** - % de leads convertidos
3. **Receita Total** - Soma dos eventos fechados
4. **Ticket Médio** - Valor médio por evento
5. **Eventos Futuros** - Eventos agendados
6. **Lead Score** - Classificação hot/warm/cold

### Exportação de Dados:
```javascript
// Dashboard Admin → Botão "Exportar CSV"
// Gera arquivo com todos os leads
```

---

## 🔐 SEGURANÇA E LGPD

### Compliance LGPD:
✅ Consentimento explícito
✅ Direito ao esquecimento
✅ Portabilidade de dados
✅ Unsubscribe em emails
✅ Opt-out em WhatsApp

### Página de Política:
**Rota:** `/politica-privacidade`

---

## 🚀 PRÓXIMOS PASSOS RECOMENDADOS

### Configurações Pendentes:
1. ⚙️ Configurar WhatsApp Business API
   - Requer: Conta Meta Business aprovada
   - Custo: ~R$ 300/mês

2. ⚙️ Configurar secrets do WhatsApp:
   ```
   WHATSAPP_TOKEN=seu_token
   WHATSAPP_PHONE_ID=seu_phone_id
   WHATSAPP_VERIFY_TOKEN=token_verificacao
   ```

3. ⚙️ Treinar modelos ML (quando > 50 eventos):
   - Melhorar precisão de previsão
   - Clustering de clientes
   - Análise de churn

4. ⚙️ Implementar notificações push:
   - Slack para alertas de leads hot
   - SMS para urgências
   - Email para digest diário

---

## 📞 SUPORTE

**Dúvidas Técnicas:**
- Plataforma Base44: https://base44.app
- Documentação oficial: [docs]

**Contato Toca Experience:**
- Email: tocaorganic@gmail.com
- WhatsApp: (21) 97282-4659

---

*Documentação gerada automaticamente - Versão 1.0*
*Última atualização: 06/12/2024*