<script setup>
import { computed, ref } from 'vue'
import LabContainer from '@/components/LabContainer.vue'
import { useGuiaStore } from '@/stores/guia'
import { useLaboratorioStore } from '@/stores/laboratorio'

const guia = useGuiaStore()
const lab = useLaboratorioStore()

const activeTab = ref('grid')

const minCardPx = computed(() => Math.round(lab.grid.minCardRem * 16))
const gapPx = computed(() => Math.round(lab.grid.gapRem * 16))

const thresholdTwoCols = computed(() => minCardPx.value * 2 + gapPx.value)
const thresholdThreeCols = computed(() => minCardPx.value * 3 + gapPx.value * 2)

const fittedTrackCount = computed(() => {
  const usable = lab.grid.containerWidth
  const denom = minCardPx.value + gapPx.value
  if (denom <= 0) {
    return 1
  }
  return Math.max(1, Math.floor((usable + gapPx.value) / denom))
})

const renderedColumns = computed(() => {
  if (lab.grid.repeatMode === 'auto-fit') {
    return Math.min(fittedTrackCount.value, lab.grid.itemCount)
  }
  return fittedTrackCount.value
})

const gridItems = computed(() => {
  return Array.from({ length: lab.grid.itemCount }, (_, index) => ({
    id: index + 1,
    code: String(index + 1).padStart(2, '0')
  }))
})

const gridStyle = computed(() => ({
  width: `${lab.grid.containerWidth}px`,
  gridTemplateColumns: `repeat(${lab.grid.repeatMode}, minmax(${lab.grid.minCardRem}rem, 1fr))`,
  gap: `${lab.grid.gapRem}rem`
}))

const generatedGridCss = computed(() => {
  return [
    '.grade-fluida {',
    '  display: grid;',
    `  grid-template-columns: repeat(${lab.grid.repeatMode}, minmax(${lab.grid.minCardRem}rem, 1fr));`,
    `  gap: ${lab.grid.gapRem}rem;`,
    '}'
  ].join('\n')
})

const flexStyle = computed(() => ({
  justifyContent: lab.flex.justifyContent,
  alignItems: lab.flex.alignItems,
  flexWrap: lab.flex.flexWrap,
  gap: `${lab.flex.gapRem}rem`
}))

const generatedFlexCss = computed(() => {
  return [
    '.barra-flex {',
    '  display: flex;',
    `  justify-content: ${lab.flex.justifyContent};`,
    `  align-items: ${lab.flex.alignItems};`,
    `  flex-wrap: ${lab.flex.flexWrap};`,
    `  gap: ${lab.flex.gapRem}rem;`,
    '}'
  ].join('\n')
})

const observationText = computed(() => {
  if (activeTab.value === 'flex') {
    return `Flexbox 1D ativo: justify-content: ${lab.flex.justifyContent} controla o eixo principal (horizontal) e align-items: ${lab.flex.alignItems} controla o eixo transversal (vertical).`
  }
  return `Com minmax(${lab.grid.minCardRem}rem = ${minCardPx.value}px) e gap de ${lab.grid.gapRem}rem (${gapPx.value}px), 2 colunas surgem em ${thresholdTwoCols.value}px e 3 colunas surgem em ${thresholdThreeCols.value}px. Em ${lab.grid.containerWidth}px há ${renderedColumns.value} trilha(s) ativa(s) no modo ${lab.grid.repeatMode}.`
})

function applyPreset(width) {
  lab.grid.containerWidth = width
  guia.markLabUsed('lab-03-grid')
}

function setMode(mode) {
  lab.grid.repeatMode = mode
  guia.markLabUsed('lab-03-grid')
}

function touchLab() {
  guia.markLabUsed('lab-03-grid')
}
</script>

<template>
  <LabContainer
    code-label="EXPERIMENTO 03 / FLEXBOX E GRID"
    title="Construtor de Grid e Inspetor Flexbox"
    description="Manipule propriedades reais de CSS Grid e Flexbox para testar a conta da pergunta-guia (464px para 2 colunas e 704px para 3 colunas) e a diferença entre auto-fit e auto-fill."
    :observation="observationText"
  >
    <div class="glab-tabs" role="tablist" aria-label="Modo do laboratório de layouts">
      <button
        type="button"
        role="tab"
        class="btn btn--sm"
        :aria-selected="String(activeTab === 'grid')"
        :aria-pressed="String(activeTab === 'grid')"
        @click="activeTab = 'grid'"
      >
        CSS Grid · 2D
      </button>
      <button
        type="button"
        role="tab"
        class="btn btn--sm"
        :aria-selected="String(activeTab === 'flex')"
        :aria-pressed="String(activeTab === 'flex')"
        @click="activeTab = 'flex'; touchLab()"
      >
        Flexbox · 1D
      </button>
    </div>

    <template v-if="activeTab === 'grid'">
      <div class="glab-controls">
        <div class="glab-control">
          <div class="glab-control__head">
            <label for="grid-width-slider" class="mono-tag">Largura útil do contêiner</label>
            <strong>{{ lab.grid.containerWidth }}px</strong>
          </div>
          <input
            id="grid-width-slider"
            v-model.number="lab.grid.containerWidth"
            type="range"
            min="260"
            max="960"
            step="1"
            @input="touchLab"
          />
          <div class="glab-presets">
            <button type="button" class="btn btn--sm" @click="applyPreset(thresholdTwoCols - 1)">
              {{ thresholdTwoCols - 1 }}px (1 col)
            </button>
            <button type="button" class="btn btn--sm" @click="applyPreset(thresholdTwoCols)">
              {{ thresholdTwoCols }}px (2 cols)
            </button>
            <button type="button" class="btn btn--sm" @click="applyPreset(thresholdThreeCols)">
              {{ thresholdThreeCols }}px (3 cols)
            </button>
          </div>
        </div>

        <div class="glab-control">
          <div class="glab-control__head">
            <label for="grid-min-slider" class="mono-tag">Largura mínima (minmax)</label>
            <strong>{{ lab.grid.minCardRem }}rem ({{ minCardPx }}px)</strong>
          </div>
          <input
            id="grid-min-slider"
            v-model.number="lab.grid.minCardRem"
            type="range"
            min="8"
            max="20"
            step="1"
            @input="touchLab"
          />
        </div>

        <div class="glab-control">
          <div class="glab-control__head">
            <label for="grid-gap-slider" class="mono-tag">Espaçamento (gap)</label>
            <strong>{{ lab.grid.gapRem }}rem ({{ gapPx }}px)</strong>
          </div>
          <input
            id="grid-gap-slider"
            v-model.number="lab.grid.gapRem"
            type="range"
            min="0"
            max="2.5"
            step="0.25"
            @input="touchLab"
          />
        </div>

        <div class="glab-control">
          <div class="glab-control__head">
            <label for="grid-count-slider" class="mono-tag">Quantidade de cards</label>
            <strong>{{ lab.grid.itemCount }} itens</strong>
          </div>
          <input
            id="grid-count-slider"
            v-model.number="lab.grid.itemCount"
            type="range"
            min="1"
            max="9"
            step="1"
            @input="touchLab"
          />
          <div class="glab-mode">
            <button
              type="button"
              class="btn btn--sm"
              :aria-pressed="String(lab.grid.repeatMode === 'auto-fit')"
              @click="setMode('auto-fit')"
            >
              auto-fit
            </button>
            <button
              type="button"
              class="btn btn--sm"
              :aria-pressed="String(lab.grid.repeatMode === 'auto-fill')"
              @click="setMode('auto-fill')"
            >
              auto-fill
            </button>
          </div>
        </div>
      </div>

      <div class="glab-metrics">
        <div class="metric-box">
          <span class="mono-tag">COLUNAS ATIVAS</span>
          <strong>{{ renderedColumns }}</strong>
        </div>
        <div class="metric-box">
          <span class="mono-tag">MÍNIMO P/ 2 COLS</span>
          <strong>{{ thresholdTwoCols }}px</strong>
        </div>
        <div class="metric-box">
          <span class="mono-tag">MÍNIMO P/ 3 COLS</span>
          <strong>{{ thresholdThreeCols }}px</strong>
        </div>
        <div class="metric-box">
          <span class="mono-tag">TRILHAS POSSÍVEIS</span>
          <strong>{{ fittedTrackCount }}</strong>
        </div>
      </div>

      <div class="glab-stage-scroll">
        <div class="glab-ruler" :style="{ width: `${lab.grid.containerWidth}px` }">
          <span>Contêiner: {{ lab.grid.containerWidth }}px</span>
          <span>{{ renderedColumns }} col · {{ lab.grid.repeatMode }}</span>
        </div>
        <div class="glab-grid-canvas" :style="gridStyle">
          <article v-for="item in gridItems" :key="item.id" class="glab-card">
            <span class="mono-tag mono-tag--accent">CARD {{ item.code }}</span>
            <strong>minmax({{ lab.grid.minCardRem }}rem, 1fr)</strong>
          </article>
        </div>
      </div>

      <div class="glab-css">
        <span class="mono-tag">CSS APLICADO EM TEMPO REAL</span>
        <pre><code>{{ generatedGridCss }}</code></pre>
      </div>
    </template>

    <template v-else>
      <div class="glab-controls">
        <div class="glab-control">
          <span class="mono-tag">justify-content (eixo principal)</span>
          <div class="glab-presets">
            <button
              v-for="opt in ['flex-start', 'center', 'space-between', 'space-around']"
              :key="opt"
              type="button"
              class="btn btn--sm"
              :aria-pressed="String(lab.flex.justifyContent === opt)"
              @click="lab.flex.justifyContent = opt; touchLab()"
            >
              {{ opt }}
            </button>
          </div>
        </div>

        <div class="glab-control">
          <span class="mono-tag">align-items (eixo transversal)</span>
          <div class="glab-presets">
            <button
              v-for="opt in ['stretch', 'flex-start', 'center', 'flex-end']"
              :key="opt"
              type="button"
              class="btn btn--sm"
              :aria-pressed="String(lab.flex.alignItems === opt)"
              @click="lab.flex.alignItems = opt; touchLab()"
            >
              {{ opt }}
            </button>
          </div>
        </div>

        <div class="glab-control">
          <span class="mono-tag">flex-wrap</span>
          <div class="glab-presets">
            <button
              v-for="opt in ['wrap', 'nowrap']"
              :key="opt"
              type="button"
              class="btn btn--sm"
              :aria-pressed="String(lab.flex.flexWrap === opt)"
              @click="lab.flex.flexWrap = opt; touchLab()"
            >
              {{ opt }}
            </button>
          </div>
        </div>

        <div class="glab-control">
          <div class="glab-control__head">
            <label for="flex-gap-slider" class="mono-tag">gap</label>
            <strong>{{ lab.flex.gapRem }}rem</strong>
          </div>
          <input
            id="flex-gap-slider"
            v-model.number="lab.flex.gapRem"
            type="range"
            min="0"
            max="2"
            step="0.25"
            @input="touchLab"
          />
        </div>
      </div>

      <div class="flab-stage" :style="flexStyle">
        <div class="flab-item flab-item--short">A · Curto</div>
        <div class="flab-item flab-item--tall">B · Bloco mais alto</div>
        <div class="flab-item">C · Item padrão</div>
        <div class="flab-item">D · Ação</div>
      </div>

      <div class="glab-css">
        <span class="mono-tag">CSS FLEXBOX APLICADO</span>
        <pre><code>{{ generatedFlexCss }}</code></pre>
      </div>
    </template>
  </LabContainer>
</template>

<style scoped>
.glab-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.glab-controls {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
}

.glab-control {
  padding: var(--space-3);
  border: var(--border-thin);
  background-color: var(--color-paper);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.glab-control__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2);
}

.glab-control__head strong {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-accent-dark);
}

.glab-control input[type='range'] {
  width: 100%;
  accent-color: var(--color-accent);
  cursor: pointer;
}

.glab-presets,
.glab-mode {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.glab-metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
}

.metric-box {
  padding: var(--space-3);
  border: var(--border-thin);
  background-color: var(--color-paper);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.metric-box strong {
  font-family: var(--font-display);
  font-size: var(--text-lg);
}

.glab-stage-scroll {
  overflow-x: auto;
  padding: var(--space-4);
  background-color: var(--color-paper-alt);
  border: var(--border-thin);
}

.glab-ruler {
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0.6rem;
  background-color: var(--color-ink);
  color: var(--color-paper);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  text-transform: uppercase;
}

.glab-grid-canvas {
  display: grid;
  border: 2px solid var(--color-ink);
  border-top: 0;
  background-color: var(--color-paper-bright);
  box-sizing: content-box;
}

.glab-card {
  padding: var(--space-4) var(--space-3);
  background-color: var(--color-paper);
  border: 1px solid var(--color-ink);
  border-top: 3px solid var(--color-accent);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
}

.glab-card strong {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.flab-stage {
  display: flex;
  min-height: 11rem;
  padding: var(--space-4);
  background-color: var(--color-paper-alt);
  border: 2px solid var(--color-ink);
  overflow-x: auto;
}

.flab-item {
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-paper-bright);
  border: 1px solid var(--color-ink);
  border-top: 3px solid var(--color-accent);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 600;
}

.flab-item--tall {
  padding-top: var(--space-6);
  padding-bottom: var(--space-6);
  background-color: var(--color-accent-tint);
}

.flab-item--short {
  padding-top: var(--space-2);
  padding-bottom: var(--space-2);
}

.glab-css {
  padding: var(--space-4);
  background-color: var(--color-code-bg);
  color: var(--color-code-ink);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  overflow-x: auto;
}

.glab-css .mono-tag {
  color: var(--color-accent);
}

.glab-css pre {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1.6;
}

@media (min-width: 48rem) {
  .glab-controls {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .glab-metrics {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
