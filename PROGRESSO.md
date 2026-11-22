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
- **Status:** Concluída (`3cb7a1f` enviado para `origin/main`)
- **Atividades realizadas:**
  - Implementação do serviço `src/services/api.js` consumindo a API pública Picsum Photos (`https://picsum.photos/v2/list`) com timeout via `AbortController`, geração real de `srcset` e catálogo de fallback SVG local.
  - Criação do componente `src/components/ApiMediaShowcase.vue` acoplado à Seção 04 (`ImagensView.vue`) com estados de carregamento, erro, troca de lote e botão para simular falha de rede e testar o fallback.
  - Implementação do Desafio Final interativo em `src/views/DesafioView.vue`, com protótipo em inspeção, validação antes do envio, reparo visual após resposta e gabarito fundamentado.

## Etapa 06 — Testes e Acabamento
- **Status:** Concluída
- **Atividades realizadas:**
  - Auditoria automatizada em Chrome headless sobre o build de produção em **42 combinações** (7 rotas × 6 larguras: `320px`, `375px`, `430px`, `768px`, `1024px`, `1440px`) com **0 ocorrências de rolagem horizontal** e **0 erros no console**.
  - Validação funcional real do menu mobile (`375px`), dos 5 laboratórios interativos (incluindo quebras exatas de `463px → 1 col`, `464px → 2 cols`, `704px → 3 cols` no CSS Grid, salto de CLS `0,285` vs `0,000`, consumo da API Picsum + fallback e reconciliação Vue sem/com `:key`) e do Desafio Final (`5/5`).
  - Correções visuais a partir das capturas de tela: título display da capa em largura integral acima da composição de duas colunas (evitando colisão com o Diagrama 00 em `1440px`), margem de segurança no rodapé para o `ViewportBadge`, ajuste tipográfico da etiqueta da barra lateral, `ViewportBadge` recolhido por padrão em telas menores que `768px` e carregamento direto da `HomeView` para otimizar LCP mantendo as 6 rotas internas sob demanda.
  - Elaboração completa do `README.md` em português e auditoria confirmando zero comentários no código-fonte e ausência do PDF no controle de versão Git.

## Etapa 07 — Preparação para Publicação
- **Status:** Concluída (pronto para deploy na Vercel ou Netlify)
- **Atividades realizadas:**
  - Configuração de fallback SPA para Vue Router em `vercel.json` (Vercel) e `public/_redirects` (Netlify), confirmada na saída `dist/_redirects`.
  - Validação do build de produção (`npm run build`) e da pré-visualização (`npm run preview`) em navegador real.
  - Observação: a publicação externa em conta Vercel/Netlify fica pronta para importação direta do repositório GitHub pela dupla, sem afirmar deploy externo não executado.
