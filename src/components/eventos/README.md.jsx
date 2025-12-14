# Event Cards - Toca Experience

Componente React premium com efeito **glassmorphism** para exibir cards de eventos com design moderno e responsivo.

## 🚀 Uso Rápido

```jsx
import EventCard from '@/components/eventos/EventCard';

<EventCard 
  day="15" 
  month="JUN" 
  title="Casamento dos Sonhos em Trancoso" 
  location="Praia de Trancoso, Bahia"
  tags={["Casamento", "Praia", "Luxo"]}
  variant="casamento"
/>
```

## 📦 Props

| Prop | Tipo | Descrição | Exemplo |
|------|------|-----------|---------|
| `day` | string | Dia do evento | `"15"` |
| `month` | string | Mês (3 letras) | `"JUN"` |
| `title` | string | Título do evento | `"Casamento Premium"` |
| `location` | string | Local do evento | `"Trancoso, Bahia"` |
| `tags` | array | Array de tags | `["Casamento", "Praia"]` |
| `variant` | string | Tema de cor (veja abaixo) | `"casamento"` |

## 🎨 Variantes Disponíveis

### 1. Casamento (Rosa/Coral)
```jsx
<EventCard variant="casamento" {...props} />
```
- **Cor primária:** Rosa (#d63384)
- **Uso:** Casamentos, festas românticas

### 2. Réveillon (Dourado)
```jsx
<EventCard variant="reveillon" {...props} />
```
- **Cor primária:** Dourado (#d4a017)
- **Uso:** Festas de Ano Novo, eventos premium

### 3. Corporativo (Azul)
```jsx
<EventCard variant="corporativo" {...props} />
```
- **Cor primária:** Azul profissional (#4f46e5)
- **Uso:** Eventos empresariais, conferências

### 4. Afro House (Preto)
```jsx
<EventCard variant="afrohouse" {...props} />
```
- **Cor primária:** Preto elegante (#000)
- **Uso:** Shows, DJ sets, festivais

### 5. Gastronomia (Verde)
```jsx
<EventCard variant="gastronomia" {...props} />
```
- **Cor primária:** Verde folha (#16a34a)
- **Uso:** Jantares, experiências gastronômicas

## 📱 Responsividade

O componente é totalmente responsivo:

- **Desktop:** Layout horizontal (data à esquerda, info à direita)
- **Tablet (< 768px):** Layout vertical
- **Mobile (< 480px):** Tamanhos ajustados

## ✨ Características

- ✅ **Glassmorphism:** Efeito de vidro fosco premium
- ✅ **Animações suaves:** Hover e transições
- ✅ **Totalmente responsivo:** Mobile-first
- ✅ **5 variantes de cor**
- ✅ **Tags customizáveis**
- ✅ **CSS otimizado:** Sem dependências extras
- ✅ **Acessível:** Estrutura semântica

## 🎯 Exemplos Completos

### Exemplo 1: Card de Casamento
```jsx
<EventCard 
  day="15" 
  month="JUN" 
  title="Casamento dos Sonhos em Trancoso" 
  location="Praia de Trancoso, Bahia"
  tags={["Casamento", "Praia", "Luxo"]}
  variant="casamento"
/>
```

### Exemplo 2: Card de Réveillon
```jsx
<EventCard 
  day="31" 
  month="DEZ" 
  title="Réveillon Trancoso 2026" 
  location="Múltiplas locações - Caraíva & Arraial"
  tags={["Réveillon", "Open Bar", "DJs Internacionais"]}
  variant="reveillon"
/>
```

### Exemplo 3: Evento Corporativo
```jsx
<EventCard 
  day="20" 
  month="MAR" 
  title="Coquetel Corporativo - Empresa XYZ" 
  location="Espaço Gourmet, Trancoso"
  tags={["Corporativo", "Networking", "Premium"]}
  variant="corporativo"
/>
```

## 🛠️ Customização

### Alterar cores de uma variante

Edite `EventCard.css`:

```css
.event-card--casamento .event-date-box {
  background: rgba(SUA_COR_RGB, 0.3);
  border-color: rgba(SUA_COR_RGB, 0.5);
}

.event-card--casamento .event-date-box .day {
  color: #SUA_COR_HEX;
}
```

### Criar nova variante

1. Adicione uma nova classe em `EventCard.css`:

```css
.event-card--minha-variante .event-date-box {
  background: rgba(100, 150, 200, 0.3);
  border-color: rgba(100, 150, 200, 0.5);
}

.event-card--minha-variante .event-date-box .day {
  color: #6496c8;
}
```

2. Use no componente:

```jsx
<EventCard variant="minha-variante" {...props} />
```

## 🔧 Instalação

1. Copie os arquivos para seu projeto:
   - `components/eventos/EventCard.jsx`
   - `components/eventos/EventCard.css`

2. Importe e use:

```jsx
import EventCard from '@/components/eventos/EventCard';
```

## 📐 Estrutura de Arquivos

```
components/
└── eventos/
    ├── EventCard.jsx    # Componente React
    ├── EventCard.css    # Estilos glassmorphism
    └── README.md        # Esta documentação
```

## 🎨 Design System

### Cores
- **Branco translúcido:** `rgba(255, 255, 255, 0.75)`
- **Blur:** `14px`
- **Border radius:** `22px`
- **Padding:** `28px`
- **Shadow:** `0 8px 32px rgba(0,0,0,0.08)`

### Tipografia
- **Título:** 20px, bold
- **Local:** 14px, cinza #666
- **Tags:** 11px, preto #111
- **Data (dia):** 28px, bold
- **Data (mês):** 12px, uppercase

## 🚀 Performance

- **CSS minificado:** ~4KB
- **Zero dependências** extras
- **Lazy loading** recomendado para listas grandes
- **Backdrop-filter** com fallback

## 📄 Licença

© 2024 Toca Experience - Todos os direitos reservados.

---

**Desenvolvido com ❤️ para Toca Experience**