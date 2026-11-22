# Guia de Responsividade

**GRID — Manual de Campo para Desenvolvimento Web**

Aplicação web interativa desenvolvida em **Vue 3** com foco em responsividade, unidades CSS, layouts modernos com Flexbox e Grid, imagens responsivas, desempenho (Core Web Vitals) e boas práticas de arquitetura front-end.

## Objetivo Acadêmico

Este projeto foi desenvolvido como atividade prática em dupla para revisar os conceitos trabalhados no semestre (**componentes, Vue Router, Pinia e consumo de API**) e aprofundar o domínio de **design responsivo e boas práticas** por meio de pesquisa em documentação oficial, experimentação direta no navegador e explicação acessível para estudantes do primeiro semestre.

## Tecnologias Utilizadas

- **Vue 3** (Composition API com `<script setup>`)
- **Vite**
- **JavaScript** (sem TypeScript)
- **Vue Router 4** (com carregamento de rotas sob demanda via `import()` dinâmico)
- **Pinia** (gerenciamento de progresso de leitura, ficha editável, viewport e estado dos laboratórios)
- **HTML5 semântico** e **CSS3 puro** (abordagem *mobile-first* com `min-width`, unidades em `rem` e design tokens em `:root`, sem frameworks visuais)

## Funcionalidades

- **Capa editorial interativa (`/`):** diagrama multi-largura comparando `320px`, `768px` e `1440px`, índice de capítulos, medidor de progresso de leitura e ficha técnica editável da dupla persistida em `localStorage`.
- **Cinco capítulos obrigatórios com estrutura padronizada:** explicação clara e acessível, exemplos de código anotados linha a linha na interface, resposta fundamentada à pergunta-guia da seção e referências oficiais consultadas.
- **Navegação responsiva:** barra lateral fixa em telas maiores (`≥ 64rem`), menu recolhível acionado por botão em celulares/tablets, navegação sequencial entre capítulos e monitor discreto de largura/breakpoint ativo no canto da tela.
- **Consumo de API pública com fallback:** integração com a **Picsum Photos API** na Seção 04 exibindo `srcset`, `sizes`, dimensões intrínsecas, estado de carregamento (*skeleton*), tratamento de erro, fallback local em SVG e botão para simular falha de rede durante apresentações.
- **Desafio Final interativo (`/desafio`):** auditoria de um protótipo com defeitos de responsividade cuja resolução depende dos conceitos e laboratórios do próprio guia, liberando o reparo visual e o gabarito fundamentado somente após o envio da tentativa.

## Laboratórios Interativos Disponíveis

1. **LAB 01 — Simulador de Viewport (`/responsividade`):** slider contínuo de `320px` a `1440px`, presets de dispositivos, alternância com/sem `<meta name="viewport">` (demonstrando a *layout viewport* virtual de `980px` encolhida no celular) e leitura de breakpoint ativo.
2. **LAB 02 — Detetive das Unidades (`/unidades`):** alternância entre `px`, `rem`, `em`, `%`, `vw` e `ch`, controle do tamanho-base do navegador (`html`), fonte do elemento pai, demonstração do efeito cascata em `em` e comparativo de acessibilidade (`px` vs `rem`).
3. **LAB 03 — Construtor de Grid e Inspetor Flexbox (`/layouts`):** manipulação real de largura útil do contêiner, `minmax()`, `gap`, quantidade de cards e `auto-fit` vs `auto-fill` (com atalhos para as quebras exatas de `464px` e `704px`), além de aba complementar para `justify-content`, `align-items`, `flex-wrap` e `gap`.
4. **LAB 04 — Imagem sob Investigação e Simulador de CLS (`/imagens`):** testes de `object-fit` (`cover`, `contain`, `fill`), `aspect-ratio` e dimensões em pranchas 16:9, 3:4 e 1:1, mais simulador controlado de carregamento atrasado (`1,2 s`) demonstrando o salto de texto (CLS) sem e com `width`/`height`.
5. **LAB 05 — Código em Revisão (`/vue`):** lista real de animais em Vue 3 comparando `v-for` sem `:key` (*in-place patch* com detecção ao vivo de desalinhamento de instância) versus `v-for` com `:key="animal.id"` estável.

## Estrutura Geral do Projeto

```text
src/
  components/
    labs/
      AnimalNoteRow.vue
      GridBuilderLab.vue
      ImageLab.vue
      UnitsLab.vue
      ViewportLab.vue
      VueKeyLab.vue
    ApiMediaShowcase.vue
    AppHeader.vue
    AppSidebar.vue
    CodeExample.vue
    GuidingQuestion.vue
    LabContainer.vue
    ReferenceList.vue
    SectionNavigation.vue
    ViewportBadge.vue
  data/
    chapters.js
  router/
    index.js
  services/
    api.js
  stores/
    guia.js
    laboratorio.js
  styles/
    global.css
    tokens.css
  views/
    DesafioView.vue
    HomeView.vue
    ImagensView.vue
    LayoutsView.vue
    ResponsividadeView.vue
    UnidadesView.vue
    VueView.vue
  App.vue
  main.js
public/
  _redirects
vercel.json
```

## Como Instalar

Pré-requisitos: **Node.js 20+** e **npm**.

```bash
git clone https://github.com/pedrinque-dev/guia-responsividade.git
cd guia-responsividade
npm install
```

## Como Executar Localmente

```bash
npm run dev
```

A aplicação será iniciada no endereço local exibido pelo Vite (por padrão `http://localhost:5173`).

## Como Gerar a Versão de Produção

```bash
npm run build
```

Para testar localmente o pacote gerado em `dist/`:

```bash
npm run preview
```

## Como Publicar

O repositório já inclui fallback SPA para o **Vue Router** (`history mode`) pronto para as principais plataformas gratuitas:

- **Vercel (recomendado):** importe o repositório no painel da Vercel; o framework Vite é detectado automaticamente (`Build Command: npm run build`, `Output Directory: dist`) e o arquivo `vercel.json` garante que recarregamentos diretos em rotas como `/layouts` ou `/desafio` sejam redirecionados para `index.html`.
- **Netlify:** conecte o repositório usando `npm run build` e diretório `dist`; o arquivo `public/_redirects` configura o redirecionamento `/* /index.html 200`.

## Integrantes da Dupla

Edite os campos abaixo (e também diretamente na ficha técnica da capa da aplicação, caso deseje personalizar para a apresentação):

- **Integrante 01:** [Nome do(a) integrante 01]
- **Integrante 02:** [Nome do(a) integrante 02]
- **Curso / Disciplina:** [Informar curso e disciplina]
- **Semestre / Ano:** 2026
