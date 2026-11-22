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
- **Status:** Concluída (`68bcbe6` enviado para `origin/main`)
- **Atividades realizadas:**
  - Criação da store Pinia `useLaboratorioStore` (`src/stores/laboratorio.js`).
  - Implementação completa dos cinco laboratórios funcionais: `ViewportLab.vue`, `UnitsLab.vue`, `GridBuilderLab.vue`, `ImageLab.vue` e `VueKeyLab.vue` (com `AnimalNoteRow.vue`).

## Etapa 05 — Desafio Final e Integração de API
- **Status:** Concluída
- **Atividades realizadas:**
  - Implementação do serviço `src/services/api.js` consumindo a API pública Picsum Photos (`https://picsum.photos/v2/list`) com timeout via `AbortController`, geração real de `srcset` e catálogo de fallback SVG local.
  - Criação do componente `src/components/ApiMediaShowcase.vue` acoplado à Seção 04 (`ImagensView.vue`) com estados de carregamento (skeletons), erro, troca de lote e botão para simular falha de rede e validar o fallback.
  - Implementação do Desafio Final interativo em `src/views/DesafioView.vue`, exigindo o uso dos laboratórios e conceitos do guia, com protótipo que repara visualmente após o envio e gabarito fundamentado liberado somente após a tentativa do usuário.
- **Pendências:** Avançar para a Etapa 06 (Testes reais em navegador nas larguras 320px, 375px, 430px, 768px, 1024px e 1440px, revisão de acessibilidade, console e README.md) e Etapa 07 (Configuração de publicação SPA e validação final).
