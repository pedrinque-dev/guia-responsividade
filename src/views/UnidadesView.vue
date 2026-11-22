<script setup>
import CodeExample from '@/components/CodeExample.vue'
import GuidingQuestion from '@/components/GuidingQuestion.vue'
import ReferenceList from '@/components/ReferenceList.vue'
import SectionNavigation from '@/components/SectionNavigation.vue'

const unitsTable = [
  {
    unit: 'px',
    type: 'Absoluta (CSS pixel)',
    basis: '1 pixel de referência CSS (independente do tamanho-base da fonte).',
    when: 'Bordas finas (1px, 2px), divisórias técnicas e detalhes que não devem crescer com a tipografia.'
  },
  {
    unit: 'rem',
    type: 'Relativa à raiz',
    basis: 'Relativa ao font-size do elemento raiz <html> (padrão usual: 16px).',
    when: 'Tipografia, margens, paddings, gaps e breakpoints consistentes que respeitam acessibilidade.'
  },
  {
    unit: 'em',
    type: 'Relativa ao contexto',
    basis: 'Relativa ao font-size do elemento pai (em font-size) ou do próprio elemento (em padding/margin).',
    when: 'Espaçamento interno de botões ou badges que devem crescer proporcionalmente ao próprio texto.'
  },
  {
    unit: '%',
    type: 'Relativa ao pai',
    basis: 'Porcentagem da dimensão correspondente do elemento contêiner.',
    when: 'Larguras fluidas (width: 100%, max-width: 100%) e proporções dependentes do bloco pai.'
  },
  {
    unit: 'fr',
    type: 'Fração de grade',
    basis: 'Fração do espaço livre restante dentro de um contêiner CSS Grid.',
    when: 'Distribuir colunas e linhas flexíveis sem fazer contas manuais de descontos de gap.'
  },
  {
    unit: 'vw',
    type: 'Relativa à viewport',
    basis: '1% da largura da viewport do navegador.',
    when: 'Títulos fluidos dentro de clamp() ou faixas visuais ligadas à largura da tela.'
  },
  {
    unit: 'vh',
    type: 'Relativa à viewport',
    basis: '1% da altura da viewport padrão (pode ignorar barras móveis retráteis).',
    when: 'Seções em desktop onde a altura da janela não oscila com barras flutuantes.'
  },
  {
    unit: 'dvh',
    type: 'Viewport dinâmica',
    basis: '1% da altura dinâmica visível da viewport, atualizada quando barras do navegador móvel aparecem ou somem.',
    when: 'Telas de altura cheia em celulares (min-height: 100dvh), evitando conteúdo cortado sob a barra de endereço.'
  },
  {
    unit: 'ch',
    type: 'Relativa ao glifo',
    basis: 'Largura do caractere "0" na fonte e tamanho aplicados ao elemento.',
    when: 'Limitar a largura de leitura de parágrafos (max-width: 65ch) para manter linhas confortáveis.'
  }
]

const unitsCodeLines = [
  { code: 'html {', note: 'Mantém 100% para herdar sem bloqueios a preferência de fonte do navegador.' },
  { code: '  font-size: 100%;', note: 'Se o usuário escolher 20px no navegador, 1rem passa automaticamente a valer 20px.' },
  { code: '}', note: '' },
  { code: '.capa-editorial {', note: '' },
  { code: '  min-height: 100dvh;', note: 'Usa dvh em vez de vh para acompanhar o recolhimento da barra de endereço no celular.' },
  { code: '  padding: 1.5rem;', note: 'Espaçamento em rem escala de maneira previsível sem efeito cascata indesejado.' },
  { code: '}', note: '' },
  { code: '.titulo-principal {', note: '' },
  { code: '  font-size: clamp(1.75rem, 4vw + 1rem, 3.25rem);', note: 'Combina vw com limites mínimo e máximo em rem para fluidez com acessibilidade.' },
  { code: '}', note: '' },
  { code: '.paragrafo-leitura {', note: '' },
  { code: '  max-width: 65ch;', note: 'Mantém entre 55 e 75 caracteres por linha, faixa confortável de leitura editorial.' },
  { code: '  border-left: 2px solid #171717;', note: 'Bordas finas continuam nítidas em px.' },
  { code: '}', note: '' }
]

const sources = [
  {
    org: 'MDN',
    title: 'CSS values and units — Reference Guide',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units',
    note: 'Especificação completa das unidades absolutas, relativas à fonte (rem, em, ch) e à viewport (vw, vh, dvh).'
  },
  {
    org: 'MDN',
    title: 'Values and units — Learn Web Development',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units',
    note: 'Explicação introdutória comparando px, em, rem e porcentagens com exemplos didáticos.'
  }
]
</script>

<template>
  <article class="chapter-page">
    <header class="chapter-header">
      <div class="chapter-meta">
        <span class="chapter-index-pill">CAPÍTULO 02 / UNIDADES CSS</span>
        <span class="mono-tag">ABSOLUTAS · RELATIVAS · ACESSIBILIDADE</span>
      </div>
      <h1 class="chapter-title">Unidades CSS</h1>
      <p class="chapter-lead">
        Escolher a unidade certa define se uma interface apenas “cabe” na tela ou se realmente se
        adapta ao tamanho do monitor, às barras móveis e às preferências de leitura de cada pessoa.
      </p>
    </header>

    <section class="editorial-section" aria-labelledby="unidades-guia">
      <div class="section-heading-group">
        <span class="mono-tag mono-tag--accent">02.1 / CLASSIFICAÇÃO</span>
        <h2 id="unidades-guia" class="section-heading">Unidades absolutas versus unidades relativas</h2>
      </div>

      <div class="prose">
        <p>
          Unidades <strong>absolutas</strong>, como <code>px</code>, representam um tamanho fixo em
          pixels de referência CSS. Elas são úteis para bordas finas e detalhes precisos, mas não se
          recalculam quando o elemento pai cresce ou quando o leitor aumenta a fonte padrão nas
          configurações do navegador.
        </p>
        <p>
          Unidades <strong>relativas</strong> calculam seu tamanho final a partir de outra referência:
          a fonte da raiz (<code>rem</code>), a fonte do contexto atual (<code>em</code>), o tamanho
          do elemento pai (<code>%</code>), a largura do caractere zero (<code>ch</code>), o espaço
          disponível em uma grade (<code>fr</code>) ou as dimensões da janela (<code>vw</code>,
          <code>vh</code> e <code>dvh</code>).
        </p>
        <p>
          Um cuidado clássico de primeiro semestre é evitar o <strong>efeito cascata do
          <code>em</code></strong> em listas ou componentes aninhados: se um contêiner usa
          <code>1.2em</code> e um filho dentro dele também usa <code>1.2em</code>, os fatores se
          multiplicam (<code>1.2 × 1.2 = 1.44</code>). Com <code>rem</code>, o cálculo sempre volta
          para o elemento raiz <code>&lt;html&gt;</code>, tornando o sistema muito mais previsível.
        </p>
      </div>

      <div class="spec-table-wrap">
        <table class="spec-table">
          <thead>
            <tr>
              <th>Unidade</th>
              <th>Categoria</th>
              <th>Referência de cálculo</th>
              <th>Quando utilizar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in unitsTable" :key="row.unit">
              <td><code>{{ row.unit }}</code></td>
              <td>{{ row.type }}</td>
              <td>{{ row.basis }}</td>
              <td>{{ row.when }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="editorial-section" aria-labelledby="unidades-codigo">
      <div class="section-heading-group">
        <span class="mono-tag mono-tag--accent">02.2 / CÓDIGO COMENTADO</span>
        <h2 id="unidades-codigo" class="section-heading">Combinando rem, dvh, ch e px com propósito</h2>
      </div>

      <CodeExample
        title="Escolha semântica de unidades em uma seção editorial"
        language="CSS"
        file-label="tipografia.css"
        :lines="unitsCodeLines"
      />
    </section>

    <GuidingQuestion
      number="02"
      question="Uma pessoa com baixa visão aumenta o tamanho da fonte nas configurações do navegador. O texto definido em px continua do mesmo tamanho, e o definido em rem aumenta. Por que essa diferença acontece?"
    >
      <p>
        Quando alguém altera o tamanho padrão de fonte nas configurações do navegador (por exemplo, de
        “Médio / 16px” para “Grande / 20px” ou “Muito grande / 24px”), o navegador modifica o
        <strong>tamanho-base do elemento raiz (<code>&lt;html&gt;</code>)</strong>.
      </p>
      <p>
        A unidade <code>rem</code> significa <em>root em</em>: <code>1rem</code> é sempre multiplicado
        pelo <code>font-size</code> computado do elemento raiz. Portanto, se um parágrafo tem
        <code>font-size: 1rem</code> e o CSS não sobrescreveu <code>html</code> com um valor fixo em
        pixels (mantendo o padrão ou <code>font-size: 100%</code>), o texto passa automaticamente de
        16px para 20px ou 24px conforme a preferência configurada pela pessoa.
      </p>
      <p>
        Já uma declaração em <code>px</code> (como <code>font-size: 16px</code>) fixa a medida
        diretamente em pixels CSS absolutos, sem consultar o tamanho-base herdado de
        <code>&lt;html&gt;</code>. Por isso, essa preferência específica de tamanho de fonte não altera
        textos escritos em <code>px</code>.
      </p>
      <div class="callout-strip">
        <span class="mono-tag mono-tag--accent">PRECISÃO TÉCNICA</span>
        <p>
          O recurso de <strong>zoom completo da página</strong> (<code>Ctrl +</code> / <code>Cmd +</code>)
          escala toda a página visualmente, inclusive elementos em <code>px</code>. Contudo, muitas
          pessoas com baixa visão configuram o <strong>tamanho padrão de fonte do navegador</strong>
          justamente para aumentar o texto sem precisar ampliar cada site manualmente — e é nessa
          configuração que usar <code>rem</code> preserva a acessibilidade enquanto <code>px</code>
          trava o tamanho da letra.
        </p>
      </div>
    </GuidingQuestion>

    <ReferenceList :sources="sources" />

    <SectionNavigation />
  </article>
</template>
