<script setup>
import CodeExample from '@/components/CodeExample.vue'
import GuidingQuestion from '@/components/GuidingQuestion.vue'
import ReferenceList from '@/components/ReferenceList.vue'
import SectionNavigation from '@/components/SectionNavigation.vue'
import VueKeyLab from '@/components/labs/VueKeyLab.vue'

const vueComponentLines = [
  { code: '<script setup>', note: 'Composition API enxuta com melhor organização de lógica por responsabilidade.' },
  { code: 'const props = defineProps({', note: 'Props declaradas com tipo e obrigatoriedade explícita facilitam depuração.' },
  { code: '  animal: { type: Object, required: true }', note: '' },
  { code: '})', note: '' },
  { code: 'const emit = defineEmits([\'remover\'])', note: 'Eventos explícitos deixam claro como o filho avisa o componente pai.' },
  { code: '<\/script>', note: '' },
  { code: '<template>', note: '' },
  { code: '  <li class="animal-row">', note: '' },
  { code: '    <span>{{ props.animal.nome }}</span>', note: '' },
  { code: '    <input type="text" placeholder="Observação local" />', note: '' },
  { code: '    <button type="button" @click="emit(\'remover\', props.animal.id)">Remover</button>', note: '' },
  { code: '  </li>', note: '' },
  { code: '</template>', note: '' }
]

const vueRouterLazyLines = [
  { code: 'const routes = [', note: '' },
  { code: '  {', note: '' },
  { code: '    path: \'/imagens\',', note: '' },
  { code: '    name: \'imagens\',', note: '' },
  {
    code: '    component: () => import(\'@/views/ImagensView.vue\')',
    note: 'Carregamento sob demanda: o navegador só baixa o código da tela quando a rota é acessada.'
  },
  { code: '  }', note: '' },
  { code: ']', note: '' }
]

const vitalsCards = [
  {
    code: 'LCP',
    name: 'Largest Contentful Paint',
    target: 'Bom: ≤ 2,5 s',
    detail: 'Mede quanto tempo leva até o maior elemento visível acima da dobra (imagem principal ou bloco de título) aparecer na tela.'
  },
  {
    code: 'INP',
    name: 'Interaction to Next Paint',
    target: 'Bom: ≤ 200 ms',
    detail: 'Avalia a agilidade visual da página ao responder a cliques, toques e teclas durante toda a sessão (substituiu o antigo FID).'
  },
  {
    code: 'CLS',
    name: 'Cumulative Layout Shift',
    target: 'Bom: ≤ 0,1',
    detail: 'Quantifica deslocamentos inesperados de layout enquanto a página carrega — como textos empurrados por imagens sem dimensões.'
  }
]

const sources = [
  {
    org: 'VUE.JS',
    title: 'List Rendering — Maintaining State with key',
    url: 'https://vuejs.org/guide/essentials/list.html',
    note: 'Documentação oficial explicando a estratégia in-place patch e por que :key estável preserva estado em listas.'
  },
  {
    org: 'VUE.JS',
    title: 'Props & Official Style Guide',
    url: 'https://vuejs.org/style-guide/',
    note: 'Regras essenciais de nomes compostos de componentes, props detalhadas e uso obrigatório de :key em v-for.'
  },
  {
    org: 'VUE ROUTER',
    title: 'Lazy Loading Routes',
    url: 'https://router.vuejs.org/guide/advanced/lazy-loading.html',
    note: 'Divisão automática do bundle por rota utilizando import() dinâmico.'
  },
  {
    org: 'WEB.DEV',
    title: 'Web Vitals (LCP, INP e CLS)',
    url: 'https://web.dev/articles/vitals',
    note: 'Métricas oficiais do Google para carregamento, interatividade e estabilidade visual.'
  }
]
</script>

<template>
  <article class="chapter-page">
    <header class="chapter-header">
      <div class="chapter-meta">
        <span class="chapter-index-pill">CAPÍTULO 05 / BOAS PRÁTICAS VUE</span>
        <span class="mono-tag">ARQUITETURA · :KEY · DESIGN TOKENS · WEB VITALS</span>
      </div>
      <h1 class="chapter-title">Boas práticas em projetos Vue</h1>
      <p class="chapter-lead">
        Responsividade não termina no CSS: um projeto Vue bem organizado carrega menos JavaScript por
        tela, mantém consistência visual com variáveis CSS e evita bugs sutis de estado ao atualizar
        listas dinâmicas.
      </p>
    </header>

    <section class="editorial-section" aria-labelledby="vue-arquitetura">
      <div class="section-heading-group">
        <span class="mono-tag mono-tag--accent">05.1 / ORGANIZAÇÃO E PADRÕES</span>
        <h2 id="vue-arquitetura" class="section-heading">Pilares de um projeto Vue 3 sustentável</h2>
      </div>

      <div class="concept-grid">
        <div class="concept-card">
          <span class="mono-tag">PASTAS E RESPONSABILIDADES</span>
          <h3 class="concept-card__title">Separação clara em src/</h3>
          <p class="concept-card__text">
            Separe telas de rota em <code>views/</code>, blocos reutilizáveis em <code>components/</code>,
            estado compartilhado em <code>stores/</code> (Pinia), chamadas externas em <code>services/</code>
            e design tokens em <code>styles/</code>.
          </p>
        </div>

        <div class="concept-card">
          <span class="mono-tag">NOMENCLATURA</span>
          <h3 class="concept-card__title">Componentes com múltiplas palavras</h3>
          <p class="concept-card__text">
            Adote PascalCase com duas ou mais palavras (<code>AppHeader.vue</code>,
            <code>LabContainer.vue</code>). Isso evita conflitos com tags HTML presentes ou futuras
            (que usam uma única palavra).
          </p>
        </div>

        <div class="concept-card concept-card--accent">
          <span class="mono-tag mono-tag--accent">CONTRATO ENTRE COMPONENTES</span>
          <h3 class="concept-card__title">Props tipadas e eventos explícitos</h3>
          <p class="concept-card__text">
            Declare tipo, valor padrão e obrigatoriedade em <code>defineProps</code> e nomeie ações em
            <code>defineEmits</code>. Dados descem por props; intenções de alteração sobem por eventos.
          </p>
        </div>

        <div class="concept-card">
          <span class="mono-tag">DESIGN TOKENS</span>
          <h3 class="concept-card__title">Variáveis CSS em :root</h3>
          <p class="concept-card__text">
            Centralizar cores, fontes e espaçamentos em <code>--color-*</code> e <code>--space-*</code>
            evita valores soltos espalhados pelos componentes e facilita manutenção global do tema.
          </p>
        </div>

        <div class="concept-card">
          <span class="mono-tag">IDENTIDADE NO DOM</span>
          <h3 class="concept-card__title">:key estável no v-for</h3>
          <p class="concept-card__text">
            Sempre associe cada item de uma lista dinâmica a um identificador único (como
            <code>:key="item.id"</code>), evitando usar o índice da posição quando itens podem ser
            removidos, filtrados ou reordenados.
          </p>
        </div>

        <div class="concept-card">
          <span class="mono-tag">DESEMPENHO INICIAL</span>
          <h3 class="concept-card__title">Rotas carregadas sob demanda</h3>
          <p class="concept-card__text">
            Usar <code>() =&gt; import('@/views/...')</code> no Vue Router divide a aplicação em pacotes
            menores: quem abre a capa no celular não precisa baixar de imediato o código das outras
            cinco rotas.
          </p>
        </div>
      </div>
    </section>

    <section class="editorial-section" aria-labelledby="vue-vitals">
      <div class="section-heading-group">
        <span class="mono-tag mono-tag--accent">05.2 / CORE WEB VITALS</span>
        <h2 id="vue-vitals" class="section-heading">As três métricas essenciais de experiência real</h2>
      </div>

      <div class="concept-grid concept-grid--three">
        <div v-for="vital in vitalsCards" :key="vital.code" class="concept-card concept-card--accent">
          <div class="vital-head">
            <span class="vital-code">{{ vital.code }}</span>
            <span class="mono-tag">{{ vital.target }}</span>
          </div>
          <h3 class="concept-card__title">{{ vital.name }}</h3>
          <p class="concept-card__text">{{ vital.detail }}</p>
        </div>
      </div>
    </section>

    <section class="editorial-section" aria-labelledby="vue-codigo">
      <div class="section-heading-group">
        <span class="mono-tag mono-tag--accent">05.3 / CÓDIGO COMENTADO</span>
        <h2 id="vue-codigo" class="section-heading">Props tipadas, eventos e lazy loading de rotas</h2>
      </div>

      <CodeExample
        title="Componente filho com defineProps e defineEmits"
        language="VUE"
        file-label="AnimalRow.vue"
        :lines="vueComponentLines"
      />

      <CodeExample
        title="Carregamento de rota sob demanda no Vue Router"
        language="JS"
        file-label="src/router/index.js"
        :lines="vueRouterLazyLines"
      />
    </section>

    <VueKeyLab />

    <GuidingQuestion
      number="05"
      question="Uma lista de animais é exibida com v-for, sem :key, e cada item tem um campo de texto. A pessoa digita algo no campo do segundo animal, e em seguida o primeiro animal é removido da lista. O que pode acontecer com o texto digitado, e por quê?"
    >
      <p>
        O texto digitado no campo do <strong>segundo animal</strong> pode continuar preso na segunda
        linha da tela e passar a aparecer associado ao <strong>terceiro animal</strong> (que agora subiu
        para a segunda posição), deixando o primeiro item — onde o segundo animal passou a estar — com
        o campo vazio.
      </p>
      <p>
        Isso ocorre porque, sem o atributo <code>:key</code>, o Vue utiliza por padrão uma estratégia de
        atualização local chamada <strong><em>in-place patch</em></strong>. Em vez de descobrir qual
        animal saiu e remover exatamente aquele nó do DOM, o Vue compara a lista apenas por posição
        (índice 0, índice 1, índice 2):
      </p>
      <ol class="reconcile-list">
        <li>
          O primeiro <code>&lt;li&gt;</code> é reaproveitado e recebe apenas o novo nome (do segundo
          animal), mas mantém o antigo <code>&lt;input&gt;</code> vazio da primeira posição.
        </li>
        <li>
          O segundo <code>&lt;li&gt;</code> também é reaproveitado e passa a exibir o nome do terceiro
          animal, porém conserva o <code>&lt;input&gt;</code> (ou estado interno de componente filho) que
          ainda guarda o texto digitado anteriormente.
        </li>
        <li>
          O último <code>&lt;li&gt;</code> excedente é removido do final da lista.
        </li>
      </ol>
      <p>
        Quando declaramos <code>:key="animal.id"</code> com um identificador único e estável, o
        algoritmo de reconciliação do Virtual DOM sabe exatamente qual nó pertence a cada animal: ele
        destrói apenas o nó do primeiro item removido e mantém o nó do segundo animal intacto, junto
        com o texto que a pessoa digitou.
      </p>
    </GuidingQuestion>

    <ReferenceList :sources="sources" />

    <SectionNavigation />
  </article>
</template>

<style scoped>
.vital-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
}

.vital-code {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  color: var(--color-ink);
}

.reconcile-list {
  margin: 0;
  padding-left: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
</style>
