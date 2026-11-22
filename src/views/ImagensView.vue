<script setup>
import CodeExample from '@/components/CodeExample.vue'
import GuidingQuestion from '@/components/GuidingQuestion.vue'
import ReferenceList from '@/components/ReferenceList.vue'
import SectionNavigation from '@/components/SectionNavigation.vue'

const responsiveImgHtmlLines = [
  { code: '<img', note: '' },
  { code: '  src="capa-800.jpg"', note: 'Arquivo padrão usado como fallback se o navegador não interpretar srcset.' },
  {
    code: '  srcset="capa-400.jpg 400w, capa-800.jpg 800w, capa-1200.jpg 1200w"',
    note: 'Oferece versões de resoluções diferentes para o navegador escolher a mais leve adequada à tela.'
  },
  {
    code: '  sizes="(min-width: 64rem) 50vw, 100vw"',
    note: 'Informa quanto espaço do layout a imagem ocupará antes mesmo de o CSS terminar de carregar.'
  },
  {
    code: '  width="1200"',
    note: 'Com height, permite calcular a proporção 3:2 e reservar espaço antes do download (evita CLS).'
  },
  { code: '  height="800"', note: '' },
  {
    code: '  loading="lazy"',
    note: 'Adia o download de imagens abaixo da dobra; não deve ser usado na imagem principal do topo (LCP).'
  },
  { code: '  alt="Fachada de arquitetura modular em concreto"', note: 'Descrição objetiva para leitores de tela e falha de rede.' },
  { code: '/>', note: '' }
]

const responsiveImgCssLines = [
  { code: 'img {', note: '' },
  { code: '  display: block;', note: 'Remove o pequeno espaço fantasma inferior típico de elementos inline.' },
  { code: '  max-width: 100%;', note: 'Impede que a imagem ultrapasse a largura do elemento pai em telas estreitas.' },
  { code: '  height: auto;', note: 'Recalcula a altura proporcionalmente quando a largura encolhe.' },
  { code: '}', note: '' },
  { code: '.card-thumb {', note: '' },
  { code: '  width: 100%;', note: '' },
  { code: '  aspect-ratio: 16 / 9;', note: 'Mantém todos os cards alinhados na mesma proporção de quadro.' },
  { code: '  object-fit: cover;', note: 'Preenche todo o quadro sem distorcer a foto, recortando apenas as sobras.' },
  { code: '}', note: '' }
]

const sources = [
  {
    org: 'MDN',
    title: 'Responsive images — HTML Guides',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images',
    note: 'Uso de srcset, sizes e seleção de resolução em diferentes densidades de tela.'
  },
  {
    org: 'MDN',
    title: 'object-fit & aspect-ratio — CSS Reference',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit',
    note: 'Enquadramento sem distorção (cover, contain) combinado com proporção explícita.'
  },
  {
    org: 'WEB.DEV',
    title: 'Cumulative Layout Shift (CLS)',
    url: 'https://web.dev/articles/cls',
    note: 'Definição oficial do CLS, limiar bom (≤ 0,1) e reserva de espaço para imagens.'
  },
  {
    org: 'WEB.DEV',
    title: 'Browser-level image lazy loading for the web',
    url: 'https://web.dev/articles/browser-level-image-lazy-loading',
    note: 'Quando aplicar loading="lazy" e por que evitar o atributo em imagens acima da dobra (LCP).'
  }
]
</script>

<template>
  <article class="chapter-page">
    <header class="chapter-header">
      <div class="chapter-meta">
        <span class="chapter-index-pill">CAPÍTULO 04 / IMAGENS RESPONSIVAS</span>
        <span class="mono-tag">ASPECT-RATIO · OBJECT-FIT · SRCSET · CLS</span>
      </div>
      <h1 class="chapter-title">Imagens responsivas</h1>
      <p class="chapter-lead">
        Imagens costumam ser o recurso mais pesado de uma página e a causa mais comum de rolagem
        horizontal ou pulos bruscos no layout. Torná-las responsivas exige cuidar ao mesmo tempo de
        proporção, recorte, peso do arquivo e reserva prévia de espaço.
      </p>
    </header>

    <section class="editorial-section" aria-labelledby="img-conceitos">
      <div class="section-heading-group">
        <span class="mono-tag mono-tag--accent">04.1 / TÉCNICAS ESSENCIAIS</span>
        <h2 id="img-conceitos" class="section-heading">Do básico fluido ao controle de desempenho</h2>
      </div>

      <div class="prose">
        <p>
          O primeiro passo é garantir no CSS que nenhuma foto ultrapasse a coluna onde vive:
          <code>max-width: 100%</code> com <code>height: auto</code> faz a imagem reduzir junto com o
          contêiner sem achatar nem esticar.
        </p>
        <p>
          O segundo passo está no próprio HTML: declarar os atributos <code>width</code> e
          <code>height</code> com as dimensões originais da imagem. Eles não “travam” a foto em tamanho
          fixo quando há <code>max-width: 100%; height: auto;</code> no CSS — em vez disso, entregam ao
          navegador a proporção exata antes mesmo de o arquivo baixar.
        </p>
        <p>
          Para galerias e cards com fotos de formatos diferentes, <code>aspect-ratio</code> define o
          molde do quadro e <code>object-fit</code> decide como a foto se comporta lá dentro:
          <code>cover</code> preenche o quadro inteiro recortando excessos, enquanto
          <code>contain</code> exibe a imagem inteira sem cortar nada, deixando faixas laterais ou
          superiores se a proporção for diferente.
        </p>
      </div>

      <div class="concept-grid">
        <div class="concept-card">
          <span class="mono-tag">DIMENSÕES HTML</span>
          <h3 class="concept-card__title">width e height + CSS fluido</h3>
          <p class="concept-card__text">
            Navegadores modernos usam <code>width</code> e <code>height</code> para inferir a proporção
            intrínseca e reservar o retângulo da imagem no primeiro desenho da página.
          </p>
        </div>

        <div class="concept-card concept-card--accent">
          <span class="mono-tag mono-tag--accent">QUANDO NÃO USAR LAZY</span>
          <h3 class="concept-card__title">loading="lazy" só abaixo da dobra</h3>
          <p class="concept-card__text">
            <code>loading="lazy"</code> economiza dados adiando imagens distantes da rolagem inicial.
            <strong>Nunca use na imagem principal visível logo ao abrir a página (LCP)</strong>, pois o
            navegador atrasaria o download exatamente do elemento mais importante da tela.
          </p>
        </div>

        <div class="concept-card">
          <span class="mono-tag">ENQUADRAMENTO</span>
          <h3 class="concept-card__title">aspect-ratio + object-fit</h3>
          <p class="concept-card__text">
            Use <code>object-fit: cover</code> para capas e fotos editoriais que precisam preencher o
            card sem deformar; use <code>contain</code> para logotipos, diagramas ou produtos que não
            podem ter nenhuma borda cortada.
          </p>
        </div>

        <div class="concept-card">
          <span class="mono-tag">BANDA E DENSIDADE</span>
          <h3 class="concept-card__title">srcset e sizes</h3>
          <p class="concept-card__text">
            Em vez de baixar uma foto de 2400px em um celular de 375px, <code>srcset</code> lista
            tamanhos alternativos e deixa o navegador escolher o menor arquivo com nitidez suficiente.
          </p>
        </div>
      </div>
    </section>

    <section class="editorial-section" aria-labelledby="img-codigo">
      <div class="section-heading-group">
        <span class="mono-tag mono-tag--accent">04.2 / CÓDIGO COMENTADO</span>
        <h2 id="img-codigo" class="section-heading">HTML responsivo completo e estilização segura</h2>
      </div>

      <CodeExample
        title="Elemento <img> com srcset, dimensões intrínsecas e lazy loading"
        language="HTML"
        file-label="card-imagem.html"
        :lines="responsiveImgHtmlLines"
      />

      <CodeExample
        title="Base responsiva e controle de proporção"
        language="CSS"
        file-label="imagens.css"
        :lines="responsiveImgCssLines"
      />
    </section>

    <GuidingQuestion
      number="04"
      question="Ao abrir uma página, o texto aparece primeiro. Quando a imagem termina de carregar, ela empurra o texto para baixo. Por que isso acontece quando a imagem não tem width e height no HTML? Qual métrica do Google mede esse problema?"
    >
      <p>
        Quando o navegador lê o HTML e encontra uma tag <code>&lt;img&gt;</code> sem <code>width</code>
        nem <code>height</code> (e sem <code>aspect-ratio</code> ou altura reservada no CSS), ele ainda
        não sabe qual é o tamanho daquela foto, pois o arquivo só será baixado pela rede instantes depois.
        Sem essa informação, o navegador reserva inicialmente <strong>0px de altura</strong> para a imagem
        e desenha o texto imediatamente abaixo dela.
      </p>
      <p>
        Assim que o download da imagem chega e o navegador descobre suas dimensões reais, ele precisa
        abrir espaço de repente, refazendo o cálculo da página (<em>reflow</em>) e empurrando todo o
        conteúdo abaixo para baixo — o que faz a pessoa perder a linha que estava lendo ou até clicar
        no botão errado.
      </p>
      <p>
        A métrica oficial do Google (dentro dos Core Web Vitals) que mede esse problema é o
        <strong>CLS — Cumulative Layout Shift</strong> (Deslocamento Cumulativo de Layout). Para uma
        boa experiência, a pontuação de CLS deve permanecer em <strong>0,1 ou menos</strong>.
      </p>

      <div class="cls-diagram" aria-label="Esquema comparativo do comportamento com e sem reserva de espaço">
        <div class="cls-diagram__panel cls-diagram__panel--bad">
          <span class="mono-tag">SEM WIDTH E HEIGHT · CLS ALTO</span>
          <div class="cls-diagram__steps">
            <div><strong>t = 0ms:</strong> Caixa da imagem = 0px → texto sobe para o topo.</div>
            <div><strong>t = 800ms:</strong> Foto carrega (220px) → texto salta 220px para baixo.</div>
          </div>
        </div>
        <div class="cls-diagram__panel cls-diagram__panel--good">
          <span class="mono-tag mono-tag--accent">COM WIDTH E HEIGHT · CLS = 0.000</span>
          <div class="cls-diagram__steps">
            <div><strong>t = 0ms:</strong> Proporção calculada → espaço de 220px já reservado.</div>
            <div><strong>t = 800ms:</strong> Foto preenche o molde → texto não se move 1 pixel.</div>
          </div>
        </div>
      </div>
    </GuidingQuestion>

    <ReferenceList :sources="sources" />

    <SectionNavigation />
  </article>
</template>

<style scoped>
.cls-diagram {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
}

.cls-diagram__panel {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  border: 1px solid var(--color-ink);
}

.cls-diagram__panel--bad {
  background-color: var(--color-danger-tint);
  border-color: var(--color-danger);
}

.cls-diagram__panel--good {
  background-color: var(--color-success-tint);
  border-color: var(--color-success);
}

.cls-diagram__steps {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-ink);
}

@media (min-width: 48rem) {
  .cls-diagram {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
