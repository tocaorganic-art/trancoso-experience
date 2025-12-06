# Guia de Configuração de Rastreamento

## 1. Google Tag Manager (GTM)

### Passo 1: Criar Conta GTM
1. Acesse [Google Tag Manager](https://tagmanager.google.com)
2. Crie uma nova conta e container
3. Copie o ID do container (formato: GTM-XXXXXXX)

### Passo 2: Configurar no Site
1. Abra `components/tracking/TrackingProvider.jsx`
2. Substitua `GTM_ID = "GTM-XXXXXXX"` pelo seu ID real
3. Salve e publique as mudanças

### Passo 3: Configurar Tags no GTM
- **Google Analytics 4**: Adicione tag GA4 com seu Measurement ID
- **Google Ads Conversion**: Configure tag de conversão para o evento `form_submission`
- **Triggers**: Configure para disparar em todas as páginas (PageView) e evento `form_submission`

### Verificação
Use o **GTM Preview Mode** para testar se os eventos estão sendo disparados corretamente.

---

## 2. Meta Pixel (Facebook/Instagram)

### Passo 1: Criar Pixel
1. Acesse [Facebook Events Manager](https://business.facebook.com/events_manager2)
2. Crie um novo Pixel
3. Copie o Pixel ID (número de 15-16 dígitos)

### Passo 2: Configurar no Site
1. Abra `components/tracking/TrackingProvider.jsx`
2. Substitua `META_PIXEL_ID = "YOUR_PIXEL_ID"` pelo seu Pixel ID real
3. Salve e publique

### Passo 3: Configurar Eventos Personalizados
Os seguintes eventos já estão configurados:
- **Lead**: Dispara quando formulário de cotação é enviado
- **Contact**: Dispara quando usuário clica no WhatsApp
- **ViewContent**: Dispara quando usuário clica no Pre-Save

### Verificação
Use o **Meta Pixel Helper** (extensão Chrome) para verificar se o pixel está ativo.

---

## 3. Google Ads Conversion Tracking

### Passo 1: Criar Tag de Conversão
1. Acesse Google Ads > Ferramentas > Conversões
2. Crie uma nova conversão do tipo "Website"
3. Copie o Conversion ID (formato: AW-XXXXXXXXX/XXXXX)

### Passo 2: Configurar via GTM
1. No GTM, crie uma nova tag "Google Ads Conversion Tracking"
2. Insira seu Conversion ID
3. Configure trigger para o evento `form_submission`
4. Publique o container

### Alternativa: Configurar Direto no Código
1. Abra `components/tracking/TrackingProvider.jsx`
2. Na função `trackFormSubmission`, substitua `'AW-XXXXXXXXX/XXXXX'` pelo seu ID real

---

## 4. Eventos Rastreados

### Eventos Atuais:
- ✅ **PageView**: Visualização de página (GTM + Meta Pixel)
- ✅ **form_submission**: Envio do formulário de cotação (GTM + Meta Pixel + Google Ads)
- ✅ **whatsapp_click**: Clique no botão WhatsApp (GTM + Meta Pixel)
- ✅ **presave_click**: Clique no banner de pre-save da música (GTM + Meta Pixel)

### Como Adicionar Novos Eventos:
```javascript
import { useTracking } from "@/components/tracking/TrackingProvider";

function MyComponent() {
  const { trackFormSubmission } = useTracking();
  
  // Chamar quando necessário
  trackFormSubmission(formData);
}
```

---

## 5. Verificação e Testes

### Checklist de Validação:
- [ ] GTM Preview Mode mostra eventos sendo disparados
- [ ] Meta Pixel Helper mostra pixel ativo (ícone azul)
- [ ] Google Tag Assistant mostra tags sem erros
- [ ] Teste de conversão registrado no Google Ads (pode levar até 24h)
- [ ] Eventos aparecem em tempo real no Facebook Events Manager

### Ferramentas:
- [GTM Preview Mode](https://tagmanager.google.com)
- [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper)
- [Google Tag Assistant](https://tagassistant.google.com)

---

## 6. Monitoramento de Performance

### Impacto na Performance:
- Scripts carregados de forma **assíncrona** via `requestIdleCallback`
- Delay de 2 segundos para não impactar LCP/FCP
- Impacto estimado: < 5% no tempo de carregamento

### Métricas para Monitorar:
- **Antes**: FCP ~10.5s, LCP ~20.7s
- **Depois (com tracking)**: FCP < 11s, LCP < 21.5s
- **Meta**: Manter performance dentro do aceitável

---

## 7. Próximos Passos

1. ✅ Implementar GTM e Meta Pixel
2. ⏳ Obter IDs reais e configurar
3. ⏳ Testar todos os eventos
4. ⏳ Configurar conversões personalizadas no Meta Business Suite
5. ⏳ Criar audiências de remarketing
6. ⏳ Integrar com Google Analytics 4 para análises avançadas

---

## 8. Suporte

Em caso de dúvidas:
- [Documentação GTM](https://support.google.com/tagmanager)
- [Documentação Meta Pixel](https://developers.facebook.com/docs/meta-pixel)
- [Documentação Google Ads](https://support.google.com/google-ads/answer/6331314)