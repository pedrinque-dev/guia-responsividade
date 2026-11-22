<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SectionNavigation from '@/components/SectionNavigation.vue'

const questions = [
  {
    id: 'gridThreshold',
    code: 'DIAGNÓSTICO 01 · LAB 03 (GRID)',
    labPath: '/layouts',
    labName: 'Consultar Lab 03',
    prompt:
      'No nosso Laboratório de Grid (Capítulo 03), mantendo minmax(14rem, 1fr) e gap: 1rem (com 1rem = 16px), a partir de qual largura interna do contêiner aparecem exatamente 3 colunas?',
    options: [
      { value: '464', label: '464px' },
      { value: '672', label: '672px' },
      { value: '704', label: '704px' },
      { value: '720', label: '720px' }
    ],
    correct: '704',
    explanation:
      'Cada coluna exige no mínimo 14rem × 16px = 224px e existem 2 espaços de gap entre 3 colunas (2 × 16px = 32px). Logo: 3 × 224px + 32px = 672px + 32px = 704px. Você pode comprovar ajustando o slider do Lab 03 para 703px (2 cols) e 704px (3 cols).'
  },
  {
    id: 'cardColumns',
    code: 'DIAGNÓSTICO 02 · LARGURA DOS CARDS',
    labPath: '/layouts',
    labName: 'Consultar Cap. 03',
    prompt:
      'O protótipo defeituoso abaixo trava 3 colunas fixas de 320px cada, estourando telas de celular. Qual declaração de CSS Grid elimina a rolagem horizontal e adapta as colunas automaticamente?',
    options: [
      { value: 'fixed', label: 'grid-template-columns: 320px 320px 320px;' },
      { value: 'autofit', label: 'grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));' },
      { value: 'width960', label: 'width: 960px; display: block;' },
      { value: 'overflow', label: 'grid-template-columns: repeat(3, 300px); overflow-x: hidden;' }
    ],
    correct: 'autofit',
    explanation:
      'repeat(auto-fit, minmax(14rem, 1fr)) permite que os cards fiquem em 1 coluna fluida em telas estreitas e criem novas colunas somente quando houver largura útil real — sem esconder conteúdo com overflow-x: hidden.'
  },
  {
    id: 'spacingUnit',
    code: 'DIAGNÓSTICO 03 · UNIDADE DE ESPAÇAMENTO E FONTE',
    labPath: '/unidades',
    labName: 'Consultar Lab 02',
    prompt:
      'No Laboratório de Unidades (Capítulo 02), ao simular baixa visão elevando a fonte-base do navegador (html) para 24px, qual unidade faz um valor de 1.5 escalar para 36px sem sofrer multiplicação em cascata por elementos pais?',
    options: [
      { value: 'px', label: 'px (permanece 24px fixo)' },
      { value: 'em', label: 'em (multiplica conforme cada elemento pai aninhado)' },
      { value: 'rem', label: 'rem (calcula sempre em relação à raiz html)' },
      { value: 'vw', label: 'vw (depende apenas da largura da viewport)' }
    ],
    correct: 'rem',
    explanation:
      'Com 1.5rem, o navegador calcula 1.5 × 24px = 36px diretamente a partir da raiz <html>, acompanhando o ajuste de acessibilidade sem o efeito cascata acumulado de elementos pais que acontece com em.'
  },
  {
    id: 'imageBehavior',
    code: 'DIAGNÓSTICO 04 · COMPORTAMENTO DE IMAGENS',
    labPath: '/imagens',
    labName: 'Consultar Lab 04',
    prompt:
      'Na auditoria do card abaixo, a foto aparece achatada e ainda empurra o título para baixo ao terminar de carregar. Qual correção elimina a distorção e zera o CLS?',
    options: [
      { value: 'fill', label: 'Aplicar object-fit: fill e omitir width e height do HTML' },
      { value: 'lazyTop', label: 'Adicionar loading="lazy" na imagem principal do topo sem altura' },
      { value: 'reserveCover', label: 'Declarar width e height no HTML + aspect-ratio + object-fit: cover' },
      { value: 'fixedPx', label: 'Definir width: 600px; height: 200px; sem max-width' }
    ],
    correct: 'reserveCover',
    explanation:
      'Declarar width e height no HTML (junto com max-width: 100% e aspect-ratio) reserva o molde exato antes do download (CLS = 0,000), enquanto object-fit: cover preenche o quadro sem deformar a foto.'
  },
  {
    id: 'vueKey',
    code: 'DIAGNÓSTICO 05 · RENDERIZAÇÃO DE LISTAS VUE',
    labPath: '/vue',
    labName: 'Consultar Lab 05',
    prompt:
      'No Laboratório de Vue (Capítulo 05), digitamos um texto no 2º item (Gato) e removemos o 1º item (Cachorro). Qual alteração evita que o texto digitado fique preso em Coruja?',
    options: [
      { value: 'noKey', label: 'Manter v-for sem :key para o Vue reutilizar o DOM por posição' },
      { value: 'indexKey', label: 'Usar :key="index" baseado na posição do array' },
      { value: 'idKey', label: 'Usar :key="animal.id" com identificador único e estável' },
      { value: 'vShow', label: 'Trocar v-for por v-show em itens fixos' }
    ],
    correct: 'idKey',
    explanation:
      'Sem :key (ou com :key="index"), o Vue reaproveita as instâncias por posição após a remoção do 1º item, deslocando o estado local do input. Apenas uma chave estável (:key="animal.id") preserva a identidade correta de cada item.'
  }
]

const answers = reactive({
  gridThreshold: '',
  cardColumns: '',
  spacingUnit: '',
  imageBehavior: '',
  vueKey: ''
})

const submitted = ref(false)
const validationWarning = ref('')

const answeredCount = computed(() => {
  return questions.filter((q) => Boolean(answers[q.id])).length
})

const score = computed(() => {
  if (!submitted.value) {
    return 0
  }
  return questions.filter((q) => answers[q.id] === q.correct).length
})

const allCorrect = computed(() => submitted.value && score.value === questions.length)

const previewRepaired = computed(() => {
  if (!submitted.value) {
    return {
      grid: false,
      unit: false,
      image: false,
      vue: false
    }
  }
  return {
    grid: answers.cardColumns === 'autofit' && answers.gridThreshold === '704',
    unit: answers.spacingUnit === 'rem',
    image: answers.imageBehavior === 'reserveCover',
    vue: answers.vueKey === 'idKey'
  }
})

function submitChallenge() {
  if (answeredCount.value < questions.length) {
    validationWarning.value = `Responda todos os ${questions.length} diagnósticos antes de enviar (${answeredCount.value}/${questions.length} preenchidos).`
    return
  }
  validationWarning.value = ''
  submitted.value = true
}

function resetChallenge() {
  for (const q of questions) {
    answers[q.id] = ''
  }
  submitted.value = false
  validationWarning.value = ''
}

function isQuestionCorrect(question) {
  return answers[question.id] === question.correct
}
</script>

<template>
  <article class="chapter-page">
    <header class="chapter-header">
      <div class="chapter-meta">
        <span class="chapter-index-pill">ETAPA 06 / DESAFIO FINAL</span>
        <span class="mono-tag">AUDITORIA PRÁTICA DO MANUAL</span>
      </div>
      <h1 class="chapter-title">Desafio final</h1>
      <p class="chapter-lead">
        Um protótipo editorial chegou à revisão com cinco problemas clássicos de responsividade,
        unidades, imagens e Vue 3. Utilize os conceitos e os laboratórios deste próprio guia para
        diagnosticar e corrigir todos os pontos. O gabarito só é liberado após o envio da sua tentativa.
      </p>
    </header>

    <section class="specimen-panel" aria-labelledby="specimen-heading">
      <div class="specimen-panel__head">
        <div>
          <span class="mono-tag mono-tag--accent">PROTÓTIPO EM INSPEÇÃO</span>
          <h2 id="specimen-heading" class="specimen-panel__title">
            {{
              !submitted
                ? 'Estado atual: layout com defeitos aguardando diagnóstico'
                : allCorrect
                  ? 'Estado corrigido: todos os 5 defeitos foram resolvidos'
                  : `Reparo parcial: ${score} de ${questions.length} correções aplicadas`
            }}
          </h2>
        </div>
        <span class="specimen-status" :class="{ 'specimen-status--ok': allCorrect }">
          {{ !submitted ? 'AGUARDANDO ENVIO' : `${score}/${questions.length} CORRIGIDOS` }}
        </span>
      </div>

      <div class="specimen-board">
        <div
          class="specimen-grid"
          :class="{ 'specimen-grid--repaired': previewRepaired.grid }"
        >
          <article class="specimen-card">
            <div
              class="specimen-card__thumb"
              :class="{ 'specimen-card__thumb--repaired': previewRepaired.image }"
            >
              <span>{{ previewRepaired.image ? '16:9 · cover · CLS 0.000' : 'Sem width/height · distorcida' }}</span>
            </div>
            <div class="specimen-card__body" :class="{ 'specimen-card__body--repaired': previewRepaired.unit }">
              <strong>Card Editorial 01</strong>
              <p>{{ previewRepaired.unit ? 'Tipografia e gap em rem (escala acessível)' : 'Fonte e espaçamento fixos em px' }}</p>
            </div>
          </article>

          <article class="specimen-card">
            <div
              class="specimen-card__thumb"
              :class="{ 'specimen-card__thumb--repaired': previewRepaired.image }"
            >
              <span>{{ previewRepaired.image ? '16:9 · cover · CLS 0.000' : 'Salto de layout ao carregar' }}</span>
            </div>
            <div class="specimen-card__body" :class="{ 'specimen-card__body--repaired': previewRepaired.unit }">
              <strong>Card Editorial 02</strong>
              <p>{{ previewRepaired.grid ? 'Grade fluida repeat(auto-fit, minmax(14rem, 1fr))' : 'Largura fixa estourando no celular' }}</p>
            </div>
          </article>
        </div>

        <div class="specimen-list" :class="{ 'specimen-list--repaired': previewRepaired.vue }">
          <span class="mono-tag">LISTA VUE NO PROTÓTIPO</span>
          <strong>
            {{
              previewRepaired.vue
                ? 'v-for com :key="animal.id" → estado dos campos preservado por identidade'
                : 'v-for sem :key → ao remover o 1º item, anotações trocam de dono'
            }}
          </strong>
        </div>
      </div>
    </section>

    <form class="challenge-form" @submit.prevent="submitChallenge">
      <fieldset
        v-for="(question, idx) in questions"
        :key="question.id"
        class="question-box"
        :class="{
          'question-box--correct': submitted && isQuestionCorrect(question),
          'question-box--wrong': submitted && !isQuestionCorrect(question)
        }"
      >
        <legend class="question-box__legend">
          <span class="mono-tag mono-tag--accent">{{ question.code }}</span>
          <RouterLink :to="question.labPath" class="question-box__hint">
            {{ question.labName }} ↗
          </RouterLink>
        </legend>

        <p class="question-box__prompt">
          <strong>{{ String(idx + 1).padStart(2, '0') }}.</strong> {{ question.prompt }}
        </p>

        <div class="question-options">
          <label
            v-for="option in question.options"
            :key="option.value"
            class="option-row"
            :class="{
              'option-row--selected': answers[question.id] === option.value,
              'option-row--correct': submitted && option.value === question.correct,
              'option-row--wrong':
                submitted && answers[question.id] === option.value && option.value !== question.correct
            }"
          >
            <input
              v-model="answers[question.id]"
              type="radio"
              :name="question.id"
              :value="option.value"
              :disabled="submitted"
            />
            <span>{{ option.label }}</span>
          </label>
        </div>

        <div v-if="submitted" class="question-feedback">
          <strong>
            {{ isQuestionCorrect(question) ? 'Correto.' : 'Incorreto — veja a explicação:' }}
          </strong>
          <p>{{ question.explanation }}</p>
        </div>
      </fieldset>

      <p v-if="validationWarning" class="challenge-warning" role="alert">
        {{ validationWarning }}
      </p>

      <div class="challenge-actions">
        <button v-if="!submitted" type="submit" class="btn btn--primary">
          Enviar respostas e verificar diagnóstico ({{ answeredCount }}/{{ questions.length }})
        </button>
        <button v-else type="button" class="btn btn--primary" @click="resetChallenge">
          Refazer desafio
        </button>
      </div>
    </form>

    <section v-if="submitted" class="challenge-summary" aria-live="polite">
      <span class="mono-tag mono-tag--accent">RESULTADO FINAL DA AUDITORIA</span>
      <h2 class="challenge-summary__title">
        Você acertou {{ score }} de {{ questions.length }} questões ({{ Math.round((score / questions.length) * 100) }}%)
      </h2>
      <p class="challenge-summary__text">
        {{
          allCorrect
            ? 'Excelente domínio: todas as configurações foram identificadas corretamente, combinando o cálculo de Grid (704px para 3 colunas), unidades acessíveis em rem, prevenção de CLS com width/height e identidade de nós com :key no Vue 3.'
            : 'Revise as explicações destacadas em cada diagnóstico acima e teste os valores diretamente nos laboratórios indicados antes de refazer o desafio.'
        }}
      </p>
    </section>

    <SectionNavigation />
  </article>
</template>

<style scoped>
.specimen-panel {
  border: var(--border-strong);
  background-color: var(--color-paper-bright);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.specimen-panel__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-3);
  padding-bottom: var(--space-3);
  border-bottom: var(--border-thin);
}

.specimen-panel__title {
  font-size: var(--text-md);
  margin-top: var(--space-1);
}

.specimen-status {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  background-color: var(--color-danger-tint);
  border: 1px solid var(--color-danger);
  color: var(--color-danger);
}

.specimen-status--ok {
  background-color: var(--color-success-tint);
  border-color: var(--color-success);
  color: var(--color-success);
}

.specimen-board {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  background-color: var(--color-paper-alt);
  border: var(--border-thin);
}

.specimen-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
}

.specimen-grid--repaired {
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}

.specimen-card {
  border: 1px solid var(--color-ink);
  background-color: var(--color-paper);
  display: flex;
  flex-direction: column;
}

.specimen-card__thumb {
  padding: var(--space-4);
  background-color: var(--color-danger-tint);
  border-bottom: 1px solid var(--color-danger);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-danger);
}

.specimen-card__thumb--repaired {
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-success-tint);
  border-bottom-color: var(--color-success);
  color: var(--color-success);
}

.specimen-card__body {
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  font-size: var(--text-sm);
}

.specimen-card__body--repaired {
  border-left: 4px solid var(--color-success);
}

.specimen-list {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-danger);
  background-color: var(--color-danger-tint);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  font-size: var(--text-sm);
}

.specimen-list--repaired {
  border-color: var(--color-success);
  background-color: var(--color-success-tint);
}

.challenge-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.question-box {
  margin: 0;
  padding: var(--space-5);
  border: var(--border-thin);
  border-top: 3px solid var(--color-ink);
  background-color: var(--color-paper-bright);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.question-box--correct {
  border-top-color: var(--color-success);
}

.question-box--wrong {
  border-top-color: var(--color-danger);
}

.question-box__legend {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
  padding: 0;
  margin-bottom: var(--space-2);
}

.question-box__hint {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-ink);
}

.question-box__hint:hover {
  color: var(--color-accent-dark);
}

.question-box__prompt {
  font-size: var(--text-base);
  color: var(--color-ink);
}

.question-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.option-row {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3);
  border: var(--border-thin);
  background-color: var(--color-paper);
  cursor: pointer;
  font-size: var(--text-sm);
}

.option-row input {
  margin-top: 0.2rem;
  accent-color: var(--color-accent);
  flex-shrink: 0;
}

.option-row--selected {
  border-color: var(--color-ink);
  background-color: var(--color-paper-alt);
}

.option-row--correct {
  border-color: var(--color-success);
  background-color: var(--color-success-tint);
}

.option-row--wrong {
  border-color: var(--color-danger);
  background-color: var(--color-danger-tint);
}

.question-feedback {
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-paper-alt);
  border-left: 4px solid var(--color-ink);
  font-size: var(--text-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.challenge-warning {
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-danger-tint);
  border: 1px solid var(--color-danger);
  color: var(--color-danger);
  font-size: var(--text-sm);
  font-weight: 600;
}

.challenge-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.challenge-summary {
  padding: var(--space-5);
  border: var(--border-strong);
  border-left: 6px solid var(--color-accent);
  background-color: var(--color-paper-bright);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.challenge-summary__title {
  font-size: var(--text-lg);
}

.challenge-summary__text {
  font-size: var(--text-sm);
  color: var(--color-ink-soft);
}
</style>
