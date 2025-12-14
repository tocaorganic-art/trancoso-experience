# Componentes de Eventos - Documentação

Sistema completo de cards e listagens de eventos com design sofisticado, glassmorphism e integração de links de compra.

---

## 📦 Componentes Disponíveis

### 1. **EventCard** (`EventCard.jsx`)
Card individual de evento com glassmorphism premium.

#### Props:
```javascript
{
  variant: "reveillon" | "casamento" | "corporativo" | "afrohouse" | "gastronomia", // Variante de cor
  day: "31",                    // Dia do evento
  month: "DEZ",                 // Mês abreviado
  title: "Réveillon 2026",      // Título do evento
  location: "Fly Club",         // Local do evento
  city: "trancoso" | "caraiva" | "arraial", // Cidade (para badge)
  tags: ["Réveillon", "Open Bar"], // Tags do evento
  highlights: ["Open Bar Premium", "DJs Internacionais"], // Destaques
  backgroundImage: "url",       // URL da imagem de fundo (opcional)
  buyLink: "https://...",       // Link externo para compra de ingressos
  status: "hot" | "new" | "soldout", // Status especial (badge)
  onClick: () => {}             // Callback ao clicar no card
}
```

#### Exemplo de Uso:
```jsx
import EventCard from "@/components/eventos/EventCard";

<EventCard
  variant="reveillon"
  day="31"
  month="DEZ"
  title="Réveillon Ayumar 2026"
  location="Fly Club Trancoso"
  city="trancoso"
  tags={["Réveillon", "Open Bar Premium"]}
  highlights={["Bell Marques", "Open Bar com whisky 12 anos"]}
  backgroundImage="https://..."
  buyLink="https://zig.tickets/..."
  status="hot"
/>
```

---

### 2. **EventDaySection** (`EventDaySection.jsx`)
Seção que agrupa eventos por dia com cabeçalho estilizado.

#### Props:
```javascript
{
  date: "2025-12-31",           // Data no formato YYYY-MM-DD
  weekdayLabel: "quarta-feira, 31 de dezembro", // Rótulo do dia
  events: [],                   // Array de objetos compatíveis com EventCard
  isReveillon: true,            // Se é noite de réveillon
  isDayAfter: false             // Se é day after
}
```

#### Exemplo de Uso:
```jsx
import EventDaySection from "@/components/eventos/EventDaySection";

const eventosFormatados = [
  {
    variant: "reveillon",
    day: "31",
    month: "DEZ",
    title: "Evento 1",
    location: "Local 1",
    city: "trancoso",
    buyLink: "https://..."
  },
  // ... mais eventos
];

<EventDaySection
  date="2025-12-31"
  weekdayLabel="quarta-feira, 31 de dezembro"
  events={eventosFormatados}
  isReveillon={true}
/>
```

---

### 3. **EventosResumo** (`EventosResumo.jsx`)
Bloco resumo com mini-cards para exibir todos os eventos em grid compacto.

#### Props:
```javascript
{
  eventos: []  // Array com todos os eventos (formato completo da entidade)
}
```

#### Exemplo de Uso:
```jsx
import EventosResumo from "@/components/eventos/EventosResumo";

<EventosResumo eventos={todosEventos} />
```

---

## 🎨 Variantes de Cor

As cores são aplicadas via borda lateral esquerda do card:

- **reveillon**: Amarelo dourado (#FBBF24)
- **casamento**: Rosa (#EC4899)
- **corporativo**: Roxo (#8B5CF6)
- **afrohouse**: Laranja (#F97316)
- **gastronomia**: Verde (#10B981)

---

## 🏙️ Badges de Cidade

As cidades têm cores e ícones específicos:

- **Trancoso**: 🌴 Verde esmeralda
- **Caraíva**: 🏝️ Ciano/Azul
- **Arraial d'Ajuda**: 🌊 Roxo/Laranja

---

## 🔗 Integração de Links de Compra

### Como funciona:
1. Adicione a prop `buyLink` ao EventCard
2. O botão "Comprar Ingresso" será renderizado automaticamente
3. Ao clicar, abre o link em nova aba
4. Se não houver link, o botão não é exibido

### Exemplo:
```jsx
<EventCard
  // ... outras props
  buyLink="https://zig.tickets/eventos/reveillon-ayumar?code=toca-organic"
/>
```

---

## 📱 Responsividade

### Grid de Eventos (EventDaySection):
- **Desktop (≥1200px)**: 3 colunas
- **Tablet (≥768px)**: 2 colunas
- **Mobile (<768px)**: 1 coluna

### Grid Resumo (EventosResumo):
- **Desktop (≥1024px)**: 4 colunas
- **Tablet (≥640px)**: 2 colunas
- **Mobile (<640px)**: 1 coluna

---

## 🚀 Fluxo Completo de Implementação

### 1. Buscar eventos do banco:
```javascript
const { data: eventos } = useQuery({
  queryKey: ['eventosAnoNovo'],
  queryFn: () => base44.entities.EventoAnoNovo.list('data'),
});
```

### 2. Agrupar por data:
```javascript
const eventosPorData = eventos.reduce((acc, evento) => {
  const data = evento.data;
  if (!acc[data]) acc[data] = [];
  acc[data].push(evento);
  return acc;
}, {});
```

### 3. Formatar eventos para EventCard:
```javascript
const eventosFormatados = eventosData.map(evento => {
  const eventDate = new Date(evento.data);
  const day = eventDate.getDate().toString();
  const month = eventDate.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
  
  let variant = "reveillon";
  let city = evento.localidade === "Caraíva" ? "caraiva" : 
             evento.localidade === "Arraial d'Ajuda" ? "arraial" : "trancoso";
  
  return {
    id: evento.id,
    variant,
    day,
    month,
    title: evento.nome,
    location: evento.local,
    city,
    tags: evento.tags || [],
    highlights: ["Open Bar Premium"], // extrair do evento
    backgroundImage: evento.imagem,
    buyLink: evento.link_compra
  };
});
```

### 4. Renderizar com EventDaySection:
```javascript
<EventDaySection
  date={data}
  weekdayLabel={format(dateObj, "EEEE, dd 'de' MMMM", { locale: ptBR })}
  events={eventosFormatados}
  isReveillon={data === "2025-12-31"}
  isDayAfter={data === "2026-01-01" || data === "2026-01-02"}
/>
```

---

## ⚡ Melhores Práticas

### Performance:
- Use `React.memo` em EventCard se houver muitos eventos
- Lazy load de imagens grandes com `loading="lazy"`
- Limite o número de eventos em EventosResumo (máx 12-16)

### UX:
- Sempre forneça `buyLink` quando houver ingressos disponíveis
- Use `highlights` para informações importantes (artistas, open bar, etc.)
- Status badges ("hot", "new") criam urgência

### Manutenção:
- Mantenha a lógica de formatação de eventos centralizada
- Extraia constantes (cores de cidade, variantes) para configuração
- Documente mudanças na entidade EventoAnoNovo que afetem o card

---

## 🐛 Troubleshooting

**Cards não aparecem?**
- Verifique se os eventos têm as props obrigatórias (day, month, title, location)
- Confirme que o CSS está importado (`import "./EventCard.css"`)

**Links de compra não funcionam?**
- Verifique se `buyLink` é uma URL válida com `https://`
- Confirme que o evento na base de dados tem `link_compra` preenchido

**Layout quebrado em mobile?**
- Teste em 360px de largura
- Verifique se não há textos muito longos sem quebra
- Use DevTools para inspecionar grid e padding

---

## 📝 Changelog

**v2.0.0** (2025-12-14)
- ✨ Novo EventCard com glassmorphism
- ✨ Componente EventDaySection para agrupamento
- ✨ EventosResumo para listagem compacta
- ✨ Integração completa de links de compra
- ✨ Badges de cidade e status
- ✨ Sistema de highlights

**v1.0.0** (2025-12-06)
- 🎉 Versão inicial do EventCard