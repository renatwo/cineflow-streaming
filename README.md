# 🎬 CineFlow — Streaming & Cinema Hub

O **CineFlow** é uma plataforma web realista, moderna e totalmente responsiva inspirada em serviços como Netflix e Letterboxd. O foco principal da aplicação é apresentar e detalhar os filmes que estão **atualmente em cartaz nos cinemas** (2025/2026), oferecendo uma experiência premium e cinematográfica para os amantes da sétima arte.

---

## 🚀 Demonstração Visual

A interface do CineFlow foi projetada com foco em design moderno e responsivo:
- **Tema Escuro Nativo**: Fundo escuro profundo (`#0f0f0f`) para reduzir a fadiga visual e simular a experiência de uma sala de cinema.
- **Micro-Animações**: Transições suaves ao interagir com o carrossel, filtros de gênero e zoom ao passar o mouse sobre os pôsteres dos filmes.
- **Acessibilidade & Responsividade**: O layout adapta-se perfeitamente de telas de smartphones (2 colunas de grid) a grandes monitores desktop (5 colunas de grid).

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as melhores e mais modernas ferramentas do ecossistema front-end:

- **React 19** — Biblioteca para construção da interface de usuário.
- **Vite 8** — Ferramenta de build rápida e moderna para HMR (Hot Module Replacement).
- **Tailwind CSS v4** — Framework CSS baseado em utilitários configurados diretamente no arquivo CSS (`@theme`).
- **Lucide React** — Biblioteca de ícones modernos e minimalistas.
- **Google Fonts** — Fontes *Outfit* para títulos imponentes e *Inter* para o corpo de leitura.
- **API do TMDb (The Movie Database)** — Imagens em alta definição e informações originais importadas para o banco de dados da aplicação.

---

## ✨ Principais Funcionalidades

### 1. Header / Navbar
- Logotipo estilizado da plataforma.
- Barra de pesquisa integrada que filtra os títulos, gêneros e diretores em tempo real.
- Atalhos rápidos de navegação.

### 2. Banner Principal (Hero Carousel)
- Carrossel automático com intervalo de 6 segundos.
- Efeito de transição cruzada suave (crossfade) com imagens de fundo (*backdrops*) de altíssima definição.
- Botões de ação rápida: "Assistir Trailer" e "Minha Lista".

### 3. Filtros e Ordenação Inteligente
- **Abas de navegação**: "Em Cartaz", "Em Breve" e "Mais Avaliados".
- **Filtro por Gênero**: Botões (pills) para segmentar por Ação, Terror, Drama, Animação, etc.
- **Ordenação**: Classificação em tempo real por *Mais bem avaliados*, *Lançamentos* e *Ordem alfabética (A-Z)*.

### 4. Cards Informativos
- Pôsteres dinâmicos com efeito de zoom suave.
- Indicador de nota geral no estilo IMDb (com cores dinâmicas: verde para alta, amarelo para média e vermelho para baixa).
- Indicador circular de porcentagem da crítica especializada (estilo Rotten Tomatoes).
- Botão interativo de hover.

### 5. Modal de Detalhes Completo
- Ao clicar em um card, um modal com desfoque de fundo (backdrop blur) exibe:
  - Sinopse completa.
  - Classificação indicativa, duração e ano de lançamento.
  - Informações de Direção e Elenco.
  - Player integrado do YouTube para reproduzir o trailer oficial do filme com um clique.

---

## 📂 Estrutura do Projeto

```bash
src/
├── components/
│   ├── FilterBar.jsx      # Componente de filtros e ordenação
│   ├── Footer.jsx         # Rodapé institucional da página
│   ├── HeroBanner.jsx     # Banner com carrossel dinâmico
│   ├── MovieCard.jsx      # Card individual dos filmes
│   ├── MovieGrid.jsx      # Grade de exibição dos cards
│   ├── MovieModal.jsx     # Modal detalhado com player de trailer
│   └── Navbar.jsx         # Cabeçalho fixo com busca em tempo real
├── data/
│   └── movies.js          # Base de dados (16 filmes com assets reais)
├── App.jsx                # Componente principal e controle de estados
├── index.css              # Configurações do Tailwind CSS v4 e animações
└── main.jsx               # Ponto de entrada do React
```

---

## 🏃 Como Executar o Projeto Localmente

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

1. Clone este repositório:
   ```bash
   git clone https://github.com/renatwo/cineflow-streaming.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd cineflow-streaming
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Abra o navegador no endereço: **`http://localhost:5173/`**

---

Desenvolvido com carinho para os amantes de cinema! 🍿🎥
