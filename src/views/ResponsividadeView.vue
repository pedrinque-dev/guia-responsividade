<script setup>
import CodeExample from '@/components/CodeExample.vue'
import GuidingQuestion from '@/components/GuidingQuestion.vue'
import ReferenceList from '@/components/ReferenceList.vue'
import SectionNavigation from '@/components/SectionNavigation.vue'

const htmlViewportLines = [
  { code: '<head>', note: 'Cabeçalho do documento onde ficam metadados lidos antes da renderização.' },
  { code: '  <meta charset="UTF-8">', note: '' },
  {
    code: '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    note: 'Alinha a largura da layout viewport à largura real em CSS pixels do aparelho na escala 1:1.'
  },
  { code: '  <title>Guia de Responsividade</title>', note: '' },
  { code: '</head>', note: '' }
]

const mobileFirstCssLines = [
  { code: '.grade-artigos {', note: 'Estilo base fora de media queries: pensado primeiro para o celular (1 coluna).' },
  { code: '  display: grid;', note: '' },
  { code: '  grid-template-columns: 1fr;', note: 'No celular, cada item ocupa 100% da largura disponível sem gerar rolagem horizontal.' },
  { code: '  gap: 1rem;', note: 'Espaçamento em rem acompanha a escala tipográfica escolhida pelo usuário.' },
  { code: '}', note: '' },
  { code: '@media (min-width: 48rem) {', note: 'Breakpoint em min-width (768px com base 16px): acrescenta complexidade apenas quando há espaço.' },
  { code: '  .grade-artigos {', note: '' },
  { code: '    grid-template-columns: repeat(2, minmax(0, 1fr));', note: 'Em tablets e telas médias, o layout evolui para duas colunas equilibradas.' },
  { code: '  }', note: '' },
  { code: '}', note: '' },
  { code: '@media (min-width: 64rem) {', note: 'A partir de 1024px, o conteúdo se distribui em três colunas fluidas.' },
  { code: '  .grade-artigos {', note: '' },
  { code: '    grid-template-columns: repeat(3, minmax(0, 1fr));', note: '' },
  { code: '  }', note: '' },
  { code: '}', note: '' }
]

const sources = [
  {
    org: 'MDN',
    title: 'Viewport meta tag — HTML Reference',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport',
    note: 'Documentação oficial sobre a layout viewport, width=device-width e initial-scale=1.0.'
  },
  {
    org: 'MDN',
    title: 'Responsive design — Learn Web Development',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design',
    note: 'Conceitos essenciais de grades fluidas, imagens flexíveis, media queries e abordagem mobile-first.'
  },
  {
    org: 'MDN',
    title: 'Using media queries — CSS Media Queries',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries',
    note: 'Sintaxe de consultas de mídia com min-width e boas práticas de pontos de quebra.'
  }
]
</script>

<template>
  <article class="chapter-page">
    <header class="chapter-header">
      <div class="chapter-meta">
        <span class="chapter-index-pill">CAPÍTULO 01 / RESPONSIVIDADE</span>
        <span class="mono-tag">MOBILE-FIRST · MEDIA QUERIES · META VIEWPORT</span>
      </div>
      <h1 class="chapter-title">Por que responsividade importa</h1>
      <p class="chapter-lead">
        Uma página web não tem um único tamanho de papel: ela pode ser aberta em um celular de 320px,
        em um tablet dividido ao meio ou em um monitor largo de 1440px. Responsividade é projetar a
        mesma base de código para se reorganizar com clareza em qualquer tela.
      </p>
    </header>

    <section class="editorial-section" aria-labelledby="resp-conceito">
      <div class="section-heading-group">
        <span class="mono-tag mono-tag--accent">01.1 / FUNDAMENTOS</span>
        <h2 id="resp-conceito" class="section-heading">Do layout fixo ao layout fluido e mobile-first</h2>
      </div>

      <div class="prose">
        <p>
          Nos primeiros anos da web, era comum criar páginas com largura fixa, como <code>width: 960px</code>.
          Em um monitor grande, tudo parecia alinhado; em uma tela menor, o conteúdo estourava pela
          lateral direita e obrigava a pessoa a arrastar a tela na horizontal para ler uma única frase.
        </p>
        <p>
          O <strong>layout fluido</strong> resolve isso substituindo larguras rígidas por medidas
          proporcionais e limites flexíveis, como <code>max-width: 100%</code>, porcentagens,
          <code>fr</code> no Grid e <code>rem</code>. Em vez de lutar contra o tamanho da janela, os
          blocos acompanham o espaço real disponível.
        </p>
        <p>
          Já a estratégia <strong>mobile-first</strong> define a ordem em que escrevemos o CSS: primeiro
          garantimos que a experiência em telas pequenas (coluna única, navegação compacta, leitura
          confortável e alvos de toque generosos) funcione perfeitamente fora de qualquer media query.
          Depois, usamos <code>@media (min-width: ...)</code> para expandir o layout em telas maiores,
          adicionando colunas e barras laterais apenas quando o conteúdo realmente se beneficia do espaço.
        </p>
      </div>

      <div class="concept-grid">
        <div class="concept-card">
          <span class="mono-tag">COMPARAÇÃO 01</span>
          <h3 class="concept-card__title">Layout fixo vs. fluido</h3>
          <p class="concept-card__text">
            No layout fixo, medidas em pixels travados ignoram o tamanho da janela e causam corte ou
            rolagem horizontal. No fluido, o contêiner se adapta ao espaço disponível mantendo proporção
            e legibilidade.
          </p>
        </div>

        <div class="concept-card concept-card--accent">
          <span class="mono-tag mono-tag--accent">ESTRATÉGIA</span>
          <h3 class="concept-card__title">Mobile-first com min-width</h3>
          <p class="concept-card__text">
            Escrever o CSS do celular como padrão evita sobrescritas desnecessárias, reduz código
            acumulado e força priorização real do conteúdo mais importante logo no topo.
          </p>
        </div>

        <div class="concept-card">
          <span class="mono-tag">MEDIA QUERIES</span>
          <h3 class="concept-card__title">Breakpoints guiados pelo conteúdo</h3>
          <p class="concept-card__text">
            Em vez de criar regras para marcas específicas de celular, escolha pontos de quebra
            (como <code>48rem</code> e <code>64rem</code>) onde o texto fica longo demais ou os cards
            passam a desperdiçar espaço.
          </p>
        </div>

        <div class="concept-card">
          <span class="mono-tag">IMPACTO PRÁTICO</span>
          <h3 class="concept-card__title">Um único projeto para todas as telas</h3>
          <p class="concept-card__text">
            Adaptar a mesma aplicação para celular, tablet e desktop melhora o conforto de toque,
            evita manutenção duplicada de versões separadas e preserva a experiência mesmo quando a
            janela do navegador é redimensionada.
          </p>
        </div>
      </div>
    </section>

    <section class="editorial-section" aria-labelledby="resp-codigo">
      <div class="section-heading-group">
        <span class="mono-tag mono-tag--accent">01.2 / CÓDIGO COMENTADO</span>
        <h2 id="resp-codigo" class="section-heading">Meta viewport e progressão mobile-first</h2>
      </div>

      <CodeExample
        title="Declaração correta da meta tag viewport"
        language="HTML"
        file-label="index.html"
        :lines="htmlViewportLines"
      />

      <CodeExample
        title="Estrutura CSS mobile-first com min-width"
        language="CSS"
        file-label="layout.css"
        :lines="mobileFirstCssLines"
      />
    </section>

    <GuidingQuestion
      number="01"
      question="Um site tem media queries bem escritas, mas não tem a meta tag viewport. No celular, ele aparece como a versão de computador, só que minúscula. Por que isso acontece, e o que a meta viewport muda?"
    >
      <p>
        Quando uma página não declara a meta tag <code>viewport</code>, os navegadores de celular
        assumem que aquele site pode ter sido feito anos atrás apenas para monitores de computador.
        Para evitar que o layout quebre inteiro, o navegador cria uma <strong>viewport de layout
        virtual</strong> bem mais larga do que a tela física — normalmente em torno de
        <strong>980px</strong> — renderiza a página dentro dessa largura simulada e depois aplica um
        encolhimento visual (zoom-out) para que tudo caiba no visor pequeno do telefone.
      </p>
      <p>
        O detalhe decisivo é que as <strong>media queries avaliam a largura da viewport de layout</strong>,
        e não o tamanho físico em centímetros do aparelho. Como a viewport virtual tem cerca de 980px,
        regras escritas para celular não são ativadas e o navegador aplica justamente as regras de
        tablet ou desktop — produzindo a “versão de computador em miniatura”.
      </p>
      <p>
        Ao incluir <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>
        no <code>&lt;head&gt;</code>, instruímos o navegador a igualar a viewport de layout à largura
        real em CSS pixels do dispositivo (por exemplo, 375px ou 390px) e iniciar na escala 1:1. A
        partir desse momento, o texto fica legível sem pinça de zoom e as media queries passam a
        responder às dimensões reais da tela.
      </p>

      <div class="viewport-compare" aria-label="Comparação visual sem e com meta viewport">
        <div class="viewport-compare__box">
          <span class="mono-tag">SEM META VIEWPORT</span>
          <strong>Layout viewport virtual ≈ 980px</strong>
          <p>Media queries de desktop disparam; o navegador reduz tudo em escala para caber em 375px.</p>
        </div>
        <div class="viewport-compare__box viewport-compare__box--ok">
          <span class="mono-tag mono-tag--accent">COM width=device-width</span>
          <strong>Layout viewport real = 375px</strong>
          <p>Escala 1:1 preservada; regras base mobile-first assumem o controle do layout.</p>
        </div>
      </div>
    </GuidingQuestion>

    <ReferenceList :sources="sources" />

    <SectionNavigation />
  </article>
</template>

<style scoped>
.viewport-compare {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.viewport-compare__box {
  padding: var(--space-4);
  background-color: var(--color-danger-tint);
  border: 1px solid var(--color-danger);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.viewport-compare__box--ok {
  background-color: var(--color-success-tint);
  border-color: var(--color-success);
}

.viewport-compare__box p {
  font-size: var(--text-sm);
  color: var(--color-ink-soft);
}

@media (min-width: 48rem) {
  .viewport-compare {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
