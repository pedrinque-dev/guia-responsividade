<script setup>
import CodeExample from '@/components/CodeExample.vue'
import GuidingQuestion from '@/components/GuidingQuestion.vue'
import ReferenceList from '@/components/ReferenceList.vue'
import SectionNavigation from '@/components/SectionNavigation.vue'
import GridBuilderLab from '@/components/labs/GridBuilderLab.vue'

const flexboxCodeLines = [
  { code: '.barra-acoes {', note: 'Flexbox controla o alinhamento em uma dimensão (linha ou coluna).' },
  { code: '  display: flex;', note: '' },
  { code: '  flex-wrap: wrap;', note: 'Permite que os itens quebrem para a linha seguinte em telas estreitas em vez de vazar.' },
  { code: '  justify-content: space-between;', note: 'Distribui o espaço livre ao longo do eixo principal (horizontal, por padrão).' },
  { code: '  align-items: center;', note: 'Alinha verticalmente os itens no eixo transversal.' },
  { code: '  gap: 0.75rem;', note: 'Cria espaçamento consistente entre itens sem precisar zerar margens no último elemento.' },
  { code: '}', note: '' }
]

const gridCodeLines = [
  { code: '.grade-cards {', note: 'CSS Grid coordena linhas e colunas simultaneamente (duas dimensões).' },
  { code: '  display: grid;', note: '' },
  {
    code: '  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));',
    note: 'Cria quantas colunas de no mínimo 14rem couberem; cada coluna cresce até 1fr para preencher o espaço livre.'
  },
  { code: '  gap: 1rem;', note: 'Espaço uniforme entre colunas e linhas (16px quando 1rem = 16px).' },
  { code: '}', note: '' }
]

const sources = [
  {
    org: 'MDN',
    title: 'Basic concepts of flexbox',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox',
    note: 'Eixo principal, eixo transversal, flex-wrap, justify-content e align-items.'
  },
  {
    org: 'MDN',
    title: 'Basic concepts of grid layout',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout',
    note: 'Conceitos de trilhas 2D, unidade fr e alinhamento em grades CSS.'
  },
  {
    org: 'MDN',
    title: 'repeat() — CSS Values and Functions',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/repeat',
    note: 'Diferença oficial entre auto-fit, auto-fill e combinação com minmax().'
  },
  {
    org: 'CSS-TRICKS',
    title: 'A Complete Guide to Flexbox & CSS Grid',
    url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
    note: 'Referência visual complementar das propriedades de Grid e Flexbox.'
  }
]
</script>

<template>
  <article class="chapter-page">
    <header class="chapter-header">
      <div class="chapter-meta">
        <span class="chapter-index-pill">CAPÍTULO 03 / FLEXBOX E GRID</span>
        <span class="mono-tag">1D · 2D · AUTO-FIT · MINMAX</span>
      </div>
      <h1 class="chapter-title">Flexbox e Grid</h1>
      <p class="chapter-lead">
        Flexbox e CSS Grid não competem entre si: cada um resolve um problema geométrico diferente.
        Saber quando distribuir itens em uma direção e quando estruturar uma grade bidimensional
        elimina dezenas de media queries manuais.
      </p>
    </header>

    <section class="editorial-section" aria-labelledby="layouts-diferenca">
      <div class="section-heading-group">
        <span class="mono-tag mono-tag--accent">03.1 / UMA DIMENSÃO VS. DUAS DIMENSÕES</span>
        <h2 id="layouts-diferenca" class="section-heading">Quando usar Flexbox e quando usar Grid</h2>
      </div>

      <div class="prose">
        <p>
          O <strong>Flexbox</strong> é um modelo <strong>unidimensional (1D)</strong>: ele organiza os
          elementos ao longo de um único eixo por vez — uma linha (<code>row</code>) ou uma coluna
          (<code>column</code>). O tamanho de cada item costuma nascer do próprio conteúdo, e as
          propriedades <code>justify-content</code> (eixo principal), <code>align-items</code> (eixo
          transversal), <code>flex-wrap</code> e <code>gap</code> controlam distribuição e quebra de
          linha.
        </p>
        <p>
          O <strong>CSS Grid</strong> é <strong>bidimensional (2D)</strong>: ele define linhas e
          colunas ao mesmo tempo a partir do contêiner. Com <code>repeat()</code>,
          <code>minmax()</code> e <code>auto-fit</code> (ou <code>auto-fill</code>), você cria grades
          que calculam sozinhas quantas colunas cabem na largura atual sem precisar escrever um
          breakpoint para cada variação.
        </p>
      </div>

      <div class="concept-grid">
        <div class="concept-card">
          <span class="mono-tag">FLEXBOX · 1D</span>
          <h3 class="concept-card__title">Use Flexbox quando...</h3>
          <p class="concept-card__text">
            Precisar alinhar uma barra de navegação, distribuir botões em linha, centralizar ícone e
            rótulo ou permitir que etiquetas (tags) quebrem de linha livremente conforme o tamanho do
            texto com <code>flex-wrap: wrap</code>.
          </p>
        </div>

        <div class="concept-card concept-card--accent">
          <span class="mono-tag mono-tag--accent">CSS GRID · 2D</span>
          <h3 class="concept-card__title">Use CSS Grid quando...</h3>
          <p class="concept-card__text">
            Precisar alinhar cards em colunas iguais de cima a baixo, estruturar cabeçalho + barra
            lateral + conteúdo principal ou gerar grades responsivas automáticas com
            <code>repeat(auto-fit, minmax(14rem, 1fr))</code>.
          </p>
        </div>

        <div class="concept-card">
          <span class="mono-tag">AUTO-FIT VS. AUTO-FILL</span>
          <h3 class="concept-card__title">Diferença quando há poucos itens</h3>
          <p class="concept-card__text">
            Com poucos cards em uma tela larga, <code>auto-fit</code> recolhe trilhas vazias e estica
            os cards existentes para preencher toda a linha. Já <code>auto-fill</code> preserva os
            espaços das trilhas vazias, mantendo a largura esperada das colunas.
          </p>
        </div>

        <div class="concept-card">
          <span class="mono-tag">GAP EM AMBOS</span>
          <h3 class="concept-card__title">Espaçamento limpo sem margens negativas</h3>
          <p class="concept-card__text">
            Tanto Flexbox quanto Grid aceitam <code>gap</code>, aplicando distância somente
            <em>entre</em> os elementos internos — nunca nas bordas externas do contêiner.
          </p>
        </div>
      </div>
    </section>

    <section class="editorial-section" aria-labelledby="layouts-codigo">
      <div class="section-heading-group">
        <span class="mono-tag mono-tag--accent">03.2 / CÓDIGO COMENTADO</span>
        <h2 id="layouts-codigo" class="section-heading">Padrões práticos de Flexbox e Grid fluido</h2>
      </div>

      <CodeExample
        title="Barra responsiva com Flexbox e quebra segura"
        language="CSS"
        file-label="flexbox.css"
        :lines="flexboxCodeLines"
      />

      <CodeExample
        title="Grade responsiva automática sem media queries"
        language="CSS"
        file-label="grid.css"
        :lines="gridCodeLines"
      />
    </section>

    <GridBuilderLab />

    <GuidingQuestion
      number="03"
      question="Um contêiner usa grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)) e gap: 1rem. A partir de qual largura do contêiner, em px, os cards deixam de ficar em uma coluna e passam para duas? Considerem 1rem = 16px e mostrem a conta."
    >
      <p>
        Os cards passam de uma para duas colunas a partir de <strong>464px</strong> de largura interna
        disponível no contêiner (descontando eventual <code>padding</code> ou borda).
      </p>

      <div class="math-sheet" aria-label="Demonstração passo a passo do cálculo de colunas">
        <div class="math-sheet__row">
          <span class="mono-tag">1. Largura mínima de 1 card</span>
          <code>14rem × 16px = 224px</code>
        </div>
        <div class="math-sheet__row">
          <span class="mono-tag">2. Espaço entre colunas (gap)</span>
          <code>1rem × 16px = 16px</code>
        </div>
        <div class="math-sheet__row math-sheet__row--total">
          <span class="mono-tag mono-tag--accent">3. Largura mínima para 2 colunas</span>
          <code>224px + 16px + 224px = 464px</code>
        </div>
      </div>

      <div class="column-diagram" aria-label="Diagrama geométrico da soma de 464px">
        <div class="column-diagram__col">
          <span>Coluna 1</span>
          <strong>224px (14rem)</strong>
        </div>
        <div class="column-diagram__gap">
          <span>gap</span>
          <strong>16px</strong>
        </div>
        <div class="column-diagram__col">
          <span>Coluna 2</span>
          <strong>224px (14rem)</strong>
        </div>
      </div>

      <p>
        Com <strong>463px</strong> de largura útil, falta 1px para acomodar duas colunas de 224px com
        16px de espaço entre elas; por isso, o navegador mantém apenas 1 coluna ocupando toda a largura
        (<code>1fr</code>). Ao atingir exatamente <strong>464px</strong>, o Grid acomoda as duas
        colunas lado a lado e divide qualquer largura extra igualmente entre elas.
      </p>
      <p>
        Generalizando para <strong>N</strong> colunas: <code>N × 224px + (N − 1) × 16px</code>. Assim,
        para 3 colunas, a conta é <code>3 × 224px + 2 × 16px = 672px + 32px = 704px</code>.
      </p>
    </GuidingQuestion>

    <ReferenceList :sources="sources" />

    <SectionNavigation />
  </article>
</template>

<style scoped>
.math-sheet {
  border: var(--border-thin);
  background-color: var(--color-paper);
  display: flex;
  flex-direction: column;
}

.math-sheet__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-bottom: var(--border-thin);
}

.math-sheet__row:last-child {
  border-bottom: 0;
}

.math-sheet__row--total {
  background-color: var(--color-accent-tint);
}

.column-diagram {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: var(--space-2);
  padding: var(--space-3);
  border: 2px dashed var(--color-ink);
  background-color: var(--color-paper);
}

.column-diagram__col,
.column-diagram__gap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-3) var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.column-diagram__col {
  background-color: var(--color-ink);
  color: var(--color-paper);
}

.column-diagram__gap {
  background-color: var(--color-accent);
  color: var(--color-ink);
  min-width: 3.5rem;
}
</style>
