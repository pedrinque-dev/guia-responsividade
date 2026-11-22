# Progresso do Desenvolvimento — Guia de Responsividade

Registro progressivo das etapas concluídas no desenvolvimento do **Guia de Responsividade** (`GRID — Manual de Campo`).

## Etapa 01 — Análise e Preparação
- **Status:** Concluída (`c68560a` enviado para `origin/main`)
- **Atividades realizadas:**
  - Leitura integral do documento de orientação local da atividade acadêmica.
  - Inspeção do diretório de trabalho e verificação do repositório remoto (`https://github.com/pedrinque-dev/guia-responsividade.git`).
  - Inicialização do repositório Git na branch `main` e vínculo com o remote `origin`.
  - Configuração do `.gitignore` bloqueando especificamente o PDF de orientação para mantê-lo apenas localmente.
  - Inicialização do projeto Vue 3 com Vite, Vue Router e Pinia em JavaScript puro e validação do primeiro build.

## Etapa 02 — Identidade Visual e Estrutura
- **Status:** Concluída (`0b8c47f` enviado para `origin/main`)
- **Atividades realizadas:**
  - Criação dos design tokens CSS em `:root` (`src/styles/tokens.css`) com paleta editorial `GRID — Manual de Campo`.
  - Criação do estilo base mobile-first (`src/styles/global.css`) com `min-width`, foco visível para teclado e `skip-link`.
  - Implementação da store Pinia `useGuiaStore` (`src/stores/guia.js`) e dos componentes reutilizáveis (`AppHeader`, `AppSidebar`, `SectionNavigation`, `ViewportBadge`, `CodeExample`, `LabContainer`, `GuidingQuestion`, `ReferenceList`).
  - Configuração das rotas sob demanda em `src/router/index.js` e desenvolvimento da capa editorial em `HomeView.vue`.

## Etapa 03 — Conteúdo Técnico
- **Status:** Concluída (`92587e9` enviado para `origin/main`)
- **Atividades realizadas:**
  - Implementação integral das cinco seções obrigatórias: `ResponsividadeView.vue`, `UnidadesView.vue`, `LayoutsView.vue`, `ImagensView.vue` e `VueView.vue`.
  - Explicações acessíveis, exemplos de código anotados linha a linha via `CodeExample.vue`, respostas fundamentadas às cinco perguntas-guia e bibliografia oficial verificada (HTTP 200).

## Etapa 04 — Laboratórios Interativos
- **Status:** Concluída
- **Atividades realizadas:**
  - Criação da store Pinia `useLaboratorioStore` (`src/stores/laboratorio.js`) compartilhando o estado dos laboratórios entre rotas.
  - **LAB 01 (`ViewportLab.vue`)**: slider de 320px a 1440px, presets de dispositivos, alternância real de meta tag viewport (escala virtual 980px vs `device-width`), página simulada escalável com `ResizeObserver` e telemetria de breakpoint ativo.
  - **LAB 02 (`UnitsLab.vue`)**: alternância entre `px`, `rem`, `em`, `%`, `vw` e `ch`, controle de fonte-base do navegador (`html`), fonte do pai, largura de viewport, cálculo ao vivo em `px` e comparativo direto de acessibilidade (`px` vs `rem` vs `em` aninhado).
  - **LAB 03 (`GridBuilderLab.vue`)**: construtor de CSS Grid real com largura de contêiner, `minmax`, `gap`, quantidade de cards, alternância `auto-fit`/`auto-fill`, atalhos para as quebras exatas (2 e 3 colunas) e aba complementar de inspetor Flexbox 1D.
  - **LAB 04 (`ImageLab.vue`)**: comparador interativo de `object-fit`, `aspect-ratio` e dimensões em pranchas 16:9, 3:4 e 1:1, além de simulador controlado de CLS com atraso de 1,2 s mostrando lado a lado o texto saltando (sem `width`/`height`) vs estável (com espaço reservado).
  - **LAB 05 (`VueKeyLab.vue` + `AnimalNoteRow.vue`)**: demonstração real do algoritmo de reconciliação do Vue 3 comparando `v-for` sem `:key` (*in-place patch* com detecção ao vivo de instância reaproveitada) versus `v-for` com `:key="animal.id"` estável.
- **Pendências:** Avançar para a Etapa 05 (Desafio Final interativo e integração com API pública Picsum Photos com tratamento de carregamento, erro e fallback).
