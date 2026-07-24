# Punch In Dashboard - Design Concept

## Referência Visual
Baseado na imagem fornecida: Dashboard moderno com sidebar escuro, layout limpo, gráficos em azul vibrante, e cards informativos bem organizados.

## Abordagem Escolhida: Professional Tech Dashboard

### Design Movement
**Modern Corporate Tech** — Interface profissional inspirada em ferramentas SaaS premium (Figma, Linear, Notion), com foco em clareza, hierarquia visual e eficiência.

### Core Principles
1. **Hierarquia Clara**: Informações críticas (horas, metas) em destaque visual com cards bem definidos
2. **Sidebar Persistente**: Navegação fixa e intuitiva para acesso rápido a todas as seções
3. **Dados em Foco**: Gráficos e métricas como protagonistas, não decoração
4. **Espaçamento Generoso**: Respiro visual entre elementos para reduzir fadiga cognitiva

### Color Philosophy
- **Primária**: Azul profundo (#5B6EFF) — confiança, produtividade, tech
- **Secundária**: Cinza neutro (#F5F7FA, #1F2937) — legibilidade e contraste
- **Acentos**: Verde (#10B981) para sucesso, Vermelho (#EF4444) para ação crítica
- **Background**: Branco limpo com cards em cinza suave

### Layout Paradigm
- **Sidebar + Main Content**: Sidebar escuro à esquerda (200px), conteúdo fluido à direita
- **Grid de Cards**: Seções organizadas em grid responsivo (3 colunas em desktop)
- **Gráfico em Destaque**: Seção de horas trabalhadas ocupa espaço generoso

### Signature Elements
1. **Indicador de Status**: Círculo verde/amarelo/vermelho mostrando estado da jornada
2. **Progress Bars**: Barras azuis com gradiente suave para metas
3. **Cards com Sombra Suave**: Elevação visual com sombras `shadow-sm`

### Interaction Philosophy
- Botões com hover suave (escurecimento + elevação)
- Transições de 200ms para mudanças de estado
- Cliques em registros abrem editores inline
- Feedback visual imediato em todas as ações

### Animation
- Entrada de cards com fade-in + slide-up (200ms)
- Hover em cards: elevação suave + mudança de sombra
- Gráficos: animação de barras ao carregar (400ms)
- Botões: scale(0.97) no click para feedback tátil

### Typography System
- **Display**: Poppins Bold 32px para títulos principais (saudação)
- **Heading**: Poppins SemiBold 18px para títulos de seção
- **Body**: Inter Regular 14px para conteúdo
- **Label**: Inter Medium 12px para labels e metadados
- **Mono**: JetBrains Mono 13px para horários e números

### Brand Essence
**Punch In**: Ferramenta de controle de ponto que torna o rastreamento de horas simples, visual e motivador.
- **Quem é para**: Profissionais autônomos, agências, e times remotas
- **Por que é diferente**: Combina clareza de dados com design motivador
- **Personalidade**: Profissional, confiável, motivador

### Brand Voice
- **Headlines**: Diretas e motivadoras ("Olá, Thiago! 👋", "Jornada em andamento")
- **CTAs**: Ação clara ("FINALIZAR JORNADA", "Adicionar registro")
- **Microcopy**: Tons leves ("Saldo acumulado", "Meta diária")
- **Exemplos**: 
  - "Você atingiu 100% da meta diária! 🎉"
  - "Tempo para uma pausa?"

### Wordmark & Logo
Logo: Relógio estilizado com agulha em movimento, dentro de um círculo azul. Marca simples, reconhecível, transmite "tempo" e "movimento".

### Signature Brand Color
**Azul Profundo (#5B6EFF)**: Cor primária, usada em botões, gráficos e elementos interativos. Transmite confiança e produtividade.

---

## Estrutura do Dashboard

### Componentes Principais
1. **Sidebar**: Navegação com ícones e labels
2. **Header**: Saudação + data + ícones de notificação/tema
3. **Status Card**: Jornada em andamento com barra de progresso
4. **Metrics Cards**: Horas (hoje, semana, mês), banco de horas, extras
5. **Time Log**: Registro de entrada/saída/intervalo
6. **Chart**: Gráfico de barras com horas dos últimos 7 dias
7. **Projects**: Lista de atividades/projetos com tempo gasto
8. **Goals**: Seção de metas com progresso

### Páginas
- **Dashboard** (home): Visão geral completa
- **Histórico**: Registros passados
- **Projetos**: Gerenciamento de atividades
- **Relatórios**: Análises e exportação
- **Configurações**: Preferências do usuário
