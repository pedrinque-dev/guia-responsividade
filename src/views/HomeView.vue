<script setup>
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { CHAPTERS } from '@/data/chapters'
import { useGuiaStore } from '@/stores/guia'

const guia = useGuiaStore()

const coverFrames = [
  {
    id: 'mobile',
    label: '320px',
    title: 'Celular · Base',
    columns: 1,
    spec: '1 coluna · menu recolhido · fluxo vertical'
  },
  {
    id: 'tablet',
    label: '768px',
    title: 'Tablet · min-width: 48rem',
    columns: 2,
    spec: '2 colunas · hierarquia equilibrada · gap 1rem'
  },
  {
    id: 'desktop',
    label: '1440px',
    title: 'Desktop · min-width: 80rem',
    columns: 3,
    spec: '3 colunas · trilho lateral · grade modular'
  }
]

const activeFrameId = ref('desktop')
const editingAuthors = ref(false)

const authorDraft = reactive({
  memberOne: guia.authors.memberOne,
  memberTwo: guia.authors.memberTwo,
  course: guia.authors.course,
  edition: guia.authors.edition
})

const indexChapters = CHAPTERS.filter((chapter) => chapter.trackProgress)

function openAuthorEditor() {
  authorDraft.memberOne = guia.authors.memberOne
  authorDraft.memberTwo = guia.authors.memberTwo
  authorDraft.course = guia.authors.course
  authorDraft.edition = guia.authors.edition
  editingAuthors.value = true
}

function saveAuthors() {
  guia.updateAuthors(authorDraft)
  editingAuthors.value = false
}

function isVisited(path) {
  return guia.visitedPaths.includes(path)
}
</script>

<template>
  <div class="cover-page">
    <section class="cover-hero" aria-labelledby="cover-title">
      <div class="cover-hero__top">
        <div class="cover-brand-strip">
          <span class="cover-brand-mark">GRID</span>
          <span class="mono-tag">MANUAL DE CAMPO // EDIÇÃO 01</span>
        </div>
        <span class="mono-tag mono-tag--accent">VUE 3 · MOBILE-FIRST</span>
      </div>

      <div class="cover-hero__masthead">
        <h1 id="cover-title" class="cover-title">Guia de Responsividade</h1>
        <p class="cover-subtitle">Manual de Campo para Desenvolvimento Web</p>
      </div>

      <div class="cover-hero__layout">
        <div class="cover-hero__copy">
          <p class="cover-intro">
            Um guia técnico e interativo pensado para explicar, testar no navegador e demonstrar como
            interfaces se adaptam de 320px a 1440px sem quebrar leitura, desempenho ou acessibilidade.
            Cada capítulo combina explicação objetiva, código comentado, resposta fundamentada à
            pergunta-guia e um laboratório prático.
          </p>

          <div class="cover-actions">
            <RouterLink to="/responsividade" class="btn btn--primary">
              Começar pelo Capítulo 01 →
            </RouterLink>
            <RouterLink to="/desafio" class="btn">
              Ir para o Desafio Final
            </RouterLink>
          </div>
        </div>

        <div class="cover-blueprint" aria-label="Diagrama comparativo de layout em diferentes larguras">
          <div class="cover-blueprint__head">
            <span class="mono-tag">DIAGRAMA 00 / ADAPTAÇÃO DE GRADE</span>
            <div class="cover-blueprint__tabs" role="group" aria-label="Selecionar largura em destaque">
              <button
                v-for="frame in coverFrames"
                :key="frame.id"
                type="button"
                class="cover-blueprint__tab"
                :aria-pressed="String(activeFrameId === frame.id)"
                @click="activeFrameId = frame.id"
              >
                {{ frame.label }}
              </button>
            </div>
          </div>

          <div class="cover-blueprint__frames">
            <article
              v-for="frame in coverFrames"
              :key="frame.id"
              class="wire-frame"
              :class="{ 'wire-frame--active': activeFrameId === frame.id }"
              @click="activeFrameId = frame.id"
            >
              <div class="wire-frame__ruler">
                <span>{{ frame.label }}</span>
                <span>{{ frame.columns }} COL</span>
              </div>
              <div class="wire-frame__bar">
                <span class="wire-frame__brand"></span>
                <span v-if="frame.columns === 1" class="wire-frame__menu-btn"></span>
                <span v-else class="wire-frame__nav-lines">
                  <i></i><i></i><i></i>
                </span>
              </div>
              <div class="wire-frame__hero-block"></div>
              <div
                class="wire-frame__grid"
                :style="{ gridTemplateColumns: `repeat(${frame.columns}, minmax(0, 1fr))` }"
              >
                <span class="wire-frame__cell wire-frame__cell--accent"></span>
                <span class="wire-frame__cell"></span>
                <span class="wire-frame__cell"></span>
              </div>
              <p class="wire-frame__spec">{{ frame.spec }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="cover-progress" aria-label="Progresso de leitura do manual">
      <div class="cover-progress__info">
        <span class="mono-tag mono-tag--accent">REGISTRO DE CAMPO</span>
        <h2 class="cover-progress__title">
          {{ guia.visitedCount }} de {{ guia.trackableChapters.length }} etapas exploradas
        </h2>
        <p class="cover-progress__meta">
          {{ guia.experimentedLabs.length }} de 5 laboratórios manipulados · Janela atual:
          <strong>{{ guia.viewportWidth }}px ({{ guia.activeBreakpoint.code }})</strong>
        </p>
      </div>
      <div class="cover-progress__bar-wrap">
        <div class="cover-progress__bar" aria-hidden="true">
          <div class="cover-progress__fill" :style="{ width: `${guia.progressPercent}%` }"></div>
        </div>
        <button
          v-if="guia.visitedCount > 0 || guia.experimentedLabs.length > 0"
          type="button"
          class="btn btn--sm"
          @click="guia.resetProgress()"
        >
          Zerar progresso
        </button>
      </div>
    </section>

    <section class="cover-index" aria-labelledby="index-heading">
      <div class="section-heading-group">
        <span class="mono-tag mono-tag--accent">ESTRUTURA DO MANUAL</span>
        <h2 id="index-heading" class="section-heading">Índice de capítulos</h2>
      </div>

      <ol class="index-grid">
        <li v-for="chapter in indexChapters" :key="chapter.id" class="index-card">
          <RouterLink :to="chapter.path" class="index-card__link">
            <div class="index-card__top">
              <span class="index-card__num">{{ chapter.number }}</span>
              <span
                class="index-card__badge"
                :class="{ 'index-card__badge--done': isVisited(chapter.path) }"
              >
                {{ isVisited(chapter.path) ? 'Lido' : 'Pendente' }}
              </span>
            </div>
            <h3 class="index-card__title">{{ chapter.title }}</h3>
            <p class="index-card__summary">{{ chapter.summary }}</p>
            <div class="index-card__foot">
              <span class="mono-tag">{{ chapter.labLabel }}</span>
              <span class="index-card__arrow" aria-hidden="true">→</span>
            </div>
          </RouterLink>
        </li>
      </ol>
    </section>

    <section class="cover-colophon" aria-labelledby="colophon-heading">
      <div class="cover-colophon__head">
        <div>
          <span class="mono-tag mono-tag--accent">FICHA TÉCNICA / DUPLA RESPONSÁVEL</span>
          <h2 id="colophon-heading" class="cover-colophon__title">Identificação da dupla</h2>
        </div>
        <button
          v-if="!editingAuthors"
          type="button"
          class="btn btn--sm"
          @click="openAuthorEditor"
        >
          Editar dados da dupla
        </button>
      </div>

      <dl v-if="!editingAuthors" class="colophon-grid">
        <div class="colophon-item">
          <dt class="mono-tag">Integrante 01</dt>
          <dd>{{ guia.authors.memberOne }}</dd>
        </div>
        <div class="colophon-item">
          <dt class="mono-tag">Integrante 02</dt>
          <dd>{{ guia.authors.memberTwo }}</dd>
        </div>
        <div class="colophon-item">
          <dt class="mono-tag">Disciplina / Curso</dt>
          <dd>{{ guia.authors.course }}</dd>
        </div>
        <div class="colophon-item">
          <dt class="mono-tag">Edição</dt>
          <dd>{{ guia.authors.edition }}</dd>
        </div>
      </dl>

      <form v-else class="colophon-form" @submit.prevent="saveAuthors">
        <label class="field">
          <span class="mono-tag">Integrante 01</span>
          <input v-model="authorDraft.memberOne" type="text" required />
        </label>
        <label class="field">
          <span class="mono-tag">Integrante 02</span>
          <input v-model="authorDraft.memberTwo" type="text" required />
        </label>
        <label class="field">
          <span class="mono-tag">Disciplina / Curso</span>
          <input v-model="authorDraft.course" type="text" required />
        </label>
        <label class="field">
          <span class="mono-tag">Edição</span>
          <input v-model="authorDraft.edition" type="text" required />
        </label>
        <div class="colophon-form__actions">
          <button type="submit" class="btn btn--primary btn--sm">Salvar ficha</button>
          <button type="button" class="btn btn--sm" @click="editingAuthors = false">Cancelar</button>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>
.cover-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}

.cover-hero {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding-bottom: var(--space-8);
  border-bottom: var(--border-strong);
}

.cover-hero__top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
  padding-bottom: var(--space-4);
  border-bottom: var(--border-thin);
}

.cover-brand-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
}

.cover-brand-mark {
  display: inline-block;
  background-color: var(--color-ink);
  color: var(--color-paper);
  font-family: var(--font-display);
  font-size: var(--text-md);
  letter-spacing: 0.08em;
  padding: var(--space-1) var(--space-3);
}

.cover-hero__masthead {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.cover-hero__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  align-items: start;
}

.cover-hero__copy {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  min-width: 0;
}

.cover-title {
  font-family: var(--font-display);
  font-size: clamp(1.625rem, 5.2vw, 3.65rem);
  line-height: 1.02;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  overflow-wrap: break-word;
}

.cover-subtitle {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent-dark);
}

.cover-intro {
  font-size: var(--text-base);
  color: var(--color-ink-soft);
  max-width: 38rem;
}

.cover-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  padding-top: var(--space-2);
}

.cover-blueprint {
  border: var(--border-strong);
  background-color: var(--color-paper-bright);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  min-width: 0;
}

.cover-blueprint__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
  padding-bottom: var(--space-3);
  border-bottom: var(--border-thin);
}

.cover-blueprint__tabs {
  display: flex;
  gap: var(--space-1);
}

.cover-blueprint__tab {
  border: 1px solid var(--color-ink);
  background: transparent;
  padding: 0.25rem 0.55rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  cursor: pointer;
}

.cover-blueprint__tab[aria-pressed='true'] {
  background-color: var(--color-ink);
  color: var(--color-paper);
}

.cover-blueprint__frames {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
}

.wire-frame {
  border: var(--border-thin);
  background-color: var(--color-paper);
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  cursor: pointer;
  transition: border-color var(--transition-fast), background-color var(--transition-fast);
}

.wire-frame--active {
  border: 2px solid var(--color-ink);
  background-color: var(--color-paper-bright);
}

.wire-frame__ruler {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--color-accent-dark);
}

.wire-frame__bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid var(--color-rule);
}

.wire-frame__brand {
  width: 2.2rem;
  height: 0.45rem;
  background-color: var(--color-ink);
}

.wire-frame__menu-btn {
  width: 0.9rem;
  height: 0.45rem;
  background-color: var(--color-accent);
}

.wire-frame__nav-lines {
  display: flex;
  gap: 0.25rem;
}

.wire-frame__nav-lines i {
  display: block;
  width: 1rem;
  height: 0.3rem;
  background-color: var(--color-muted);
}

.wire-frame__hero-block {
  height: 1.5rem;
  background-color: var(--color-paper-alt);
  border: 1px solid var(--color-rule);
}

.wire-frame__grid {
  display: grid;
  gap: 0.35rem;
}

.wire-frame__cell {
  height: 1.75rem;
  background-color: var(--color-paper-alt);
  border: 1px solid var(--color-ink);
}

.wire-frame__cell--accent {
  background-color: var(--color-accent-tint);
  border-color: var(--color-accent-dark);
}

.wire-frame__spec {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--color-muted-text);
}

.cover-progress {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-5);
  background-color: var(--color-paper-alt);
  border: var(--border-thin);
  border-left: 5px solid var(--color-ink);
}

.cover-progress__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.cover-progress__title {
  font-size: var(--text-lg);
}

.cover-progress__meta {
  font-size: var(--text-sm);
  color: var(--color-ink-soft);
}

.cover-progress__bar-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
}

.cover-progress__bar {
  flex: 1;
  min-width: 10rem;
  height: 0.625rem;
  background-color: var(--color-rule);
}

.cover-progress__fill {
  height: 100%;
  background-color: var(--color-accent);
  transition: width var(--transition-base);
}

.cover-index {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.index-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

.index-card {
  display: flex;
}

.index-card__link {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
  background-color: var(--color-paper-bright);
  border: var(--border-thin);
  border-top: 3px solid var(--color-ink);
  text-decoration: none;
  transition: border-color var(--transition-fast), transform var(--transition-fast), background-color var(--transition-fast);
}

.index-card__link:hover {
  border-color: var(--color-ink);
  border-top-color: var(--color-accent);
  background-color: var(--color-paper-alt);
}

.index-card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.index-card__num {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  line-height: 1;
  color: var(--color-ink);
}

.index-card__badge {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.15rem 0.45rem;
  border: var(--border-thin);
  color: var(--color-muted-text);
}

.index-card__badge--done {
  background-color: var(--color-accent);
  border-color: var(--color-ink);
  color: var(--color-ink);
  font-weight: 600;
}

.index-card__title {
  font-size: var(--text-md);
}

.index-card__summary {
  font-size: var(--text-sm);
  color: var(--color-ink-soft);
  flex: 1;
}

.index-card__foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
  padding-top: var(--space-3);
  border-top: var(--border-thin);
}

.index-card__arrow {
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--color-accent-dark);
}

.cover-colophon {
  border: var(--border-strong);
  background-color: var(--color-paper-bright);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.cover-colophon__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--space-3);
  padding-bottom: var(--space-4);
  border-bottom: var(--border-thin);
}

.cover-colophon__title {
  font-size: var(--text-lg);
  margin-top: var(--space-1);
}

.colophon-grid {
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

.colophon-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.colophon-item dd {
  margin: 0;
  font-weight: 600;
  color: var(--color-ink);
}

.colophon-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.field input {
  width: 100%;
  min-height: 2.5rem;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-ink);
  background-color: var(--color-paper);
}

.colophon-form__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

@media (min-width: 48rem) {
  .cover-blueprint__frames {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .index-grid,
  .colophon-grid,
  .colophon-form {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .colophon-form__actions {
    grid-column: 1 / -1;
  }
}

@media (min-width: 64rem) {
  .cover-hero__layout {
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.25fr);
    align-items: stretch;
  }
}
</style>
