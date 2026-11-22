<script setup>
import { computed } from 'vue'
import LabContainer from '@/components/LabContainer.vue'
import { useGuiaStore } from '@/stores/guia'
import { useLaboratorioStore } from '@/stores/laboratorio'

const guia = useGuiaStore()
const lab = useLaboratorioStore()

const unitSpecs = {
  px: { label: 'px', min: 10, max: 48, step: 1, defaultValue: 24 },
  rem: { label: 'rem', min: 0.75, max: 3, step: 0.125, defaultValue: 1.5 },
  em: { label: 'em', min: 0.75, max: 3, step: 0.125, defaultValue: 1.5 },
  '%': { label: '%', min: 75, max: 250, step: 5, defaultValue: 150 },
  vw: { label: 'vw', min: 1.5, max: 6, step: 0.25, defaultValue: 3 },
  ch: { label: 'ch', min: 18, max: 65, step: 1, defaultValue: 40 }
}

const activeSpec = computed(() => unitSpecs[lab.units.unit] || unitSpecs.rem)

const computedPx = computed(() => {
  const val = lab.units.value
  switch (lab.units.unit) {
    case 'px':
      return val
    case 'rem':
      return val * lab.units.rootFontSize
    case 'em':
      return val * lab.units.parentFontSize
    case '%':
      return (val / 100) * lab.units.parentFontSize
    case 'vw':
      return (val / 100) * lab.units.simulatedViewport
    case 'ch':
      return val * lab.units.rootFontSize * 0.6
    default:
      return val
  }
})

const formulaText = computed(() => {
  const val = lab.units.value
  const px = computedPx.value.toFixed(1)
  switch (lab.units.unit) {
    case 'px':
      return `${val}px fixos = ${px}px (ignora fonte-base de ${lab.units.rootFontSize}px)`
    case 'rem':
      return `${val}rem × ${lab.units.rootFontSize}px (html) = ${px}px`
    case 'em':
      return `${val}em × ${lab.units.parentFontSize}px (pai) = ${px}px`
    case '%':
      return `${val}% × ${lab.units.parentFontSize}px (pai) = ${px}px`
    case 'vw':
      return `${val}% × ${lab.units.simulatedViewport}px (viewport) = ${px}px`
    case 'ch':
      return `${val}ch ≈ ${val} caracteres "0" (largura aprox. ${px}px na base ${lab.units.rootFontSize}px)`
    default:
      return `${px}px`
  }
})

const comparisonSamples = computed(() => {
  const factor = lab.units.unit === 'rem' || lab.units.unit === 'em' ? lab.units.value : 1.5
  const fixedPx = Math.round(factor * 16)
  const remPx = Number((factor * lab.units.rootFontSize).toFixed(1))
  const emPx = Number((factor * lab.units.parentFontSize).toFixed(1))
  const nestedEmPx = Number((factor * factor * lab.units.parentFontSize).toFixed(1))

  return {
    factor,
    fixedPx,
    remPx,
    emPx,
    nestedEmPx
  }
})

const generatedCss = computed(() => {
  if (lab.units.unit === 'ch') {
    return [
      `html { font-size: ${lab.units.rootFontSize}px; }`,
      `.bloco-leitura { max-width: ${lab.units.value}ch; font-size: 1rem; }`
    ].join('\n')
  }
  return [
    `html { font-size: ${lab.units.rootFontSize}px; }`,
    `.elemento-pai { font-size: ${lab.units.parentFontSize}px; }`,
    `.texto-alvo { font-size: ${lab.units.value}${lab.units.unit}; }`
  ].join('\n')
})

const observationText = computed(() => {
  if (lab.units.rootFontSize > 16) {
    return `Com a fonte-base aumentada para ${lab.units.rootFontSize}px (simulando preferência de acessibilidade), ${comparisonSamples.value.factor}rem cresceu para ${comparisonSamples.value.remPx}px, enquanto ${comparisonSamples.value.fixedPx}px continuou travado.`
  }
  return `Cálculo ativo: ${formulaText.value}. Experimente subir a fonte-base para 24px para comprovar o contraste entre rem e px.`
})

function selectUnit(nextUnit) {
  lab.units.unit = nextUnit
  lab.units.value = unitSpecs[nextUnit].defaultValue
  guia.markLabUsed('lab-02-unidades')
}

function setRootPreset(size) {
  lab.units.rootFontSize = size
  guia.markLabUsed('lab-02-unidades')
}

function touchLab() {
  guia.markLabUsed('lab-02-unidades')
}
</script>

<template>
  <LabContainer
    code-label="EXPERIMENTO 02 / UNIDADES CSS"
    title="Detetive das Unidades"
    description="Altere a unidade, o tamanho-base do navegador (html) e o tamanho do elemento pai para inspecionar os valores reais calculados em pixels."
    :observation="observationText"
  >
    <div class="ulab-units" role="group" aria-label="Selecionar unidade CSS">
      <button
        v-for="(spec, key) in unitSpecs"
        :key="key"
        type="button"
        class="btn btn--sm"
        :aria-pressed="String(lab.units.unit === key)"
        @click="selectUnit(key)"
      >
        {{ spec.label }}
      </button>
    </div>

    <div class="ulab-sliders">
      <div class="ulab-field">
        <div class="ulab-field__head">
          <label for="unit-val-slider" class="mono-tag">Valor em {{ lab.units.unit }}</label>
          <strong>{{ lab.units.value }}{{ lab.units.unit }}</strong>
        </div>
        <input
          id="unit-val-slider"
          v-model.number="lab.units.value"
          type="range"
          :min="activeSpec.min"
          :max="activeSpec.max"
          :step="activeSpec.step"
          @input="touchLab"
        />
      </div>

      <div class="ulab-field">
        <div class="ulab-field__head">
          <label for="root-font-slider" class="mono-tag">Fonte-base do navegador (html)</label>
          <strong>{{ lab.units.rootFontSize }}px</strong>
        </div>
        <input
          id="root-font-slider"
          v-model.number="lab.units.rootFontSize"
          type="range"
          min="12"
          max="32"
          step="1"
          @input="touchLab"
        />
        <div class="ulab-quick">
          <button type="button" class="btn btn--sm" :aria-pressed="String(lab.units.rootFontSize === 16)" @click="setRootPreset(16)">
            16px Padrão
          </button>
          <button type="button" class="btn btn--sm" :aria-pressed="String(lab.units.rootFontSize === 20)" @click="setRootPreset(20)">
            20px Grande
          </button>
          <button type="button" class="btn btn--sm" :aria-pressed="String(lab.units.rootFontSize === 24)" @click="setRootPreset(24)">
            24px Baixa visão
          </button>
        </div>
      </div>

      <div class="ulab-field">
        <div class="ulab-field__head">
          <label for="parent-font-slider" class="mono-tag">Fonte do elemento pai</label>
          <strong>{{ lab.units.parentFontSize }}px</strong>
        </div>
        <input
          id="parent-font-slider"
          v-model.number="lab.units.parentFontSize"
          type="range"
          min="12"
          max="32"
          step="1"
          @input="touchLab"
        />
      </div>

      <div v-if="lab.units.unit === 'vw'" class="ulab-field">
        <div class="ulab-field__head">
          <label for="vw-width-slider" class="mono-tag">Largura simulada da viewport</label>
          <strong>{{ lab.units.simulatedViewport }}px</strong>
        </div>
        <input
          id="vw-width-slider"
          v-model.number="lab.units.simulatedViewport"
          type="range"
          min="320"
          max="1440"
          step="10"
          @input="touchLab"
        />
      </div>
    </div>

    <div class="ulab-result">
      <div class="ulab-result__head">
        <span class="mono-tag mono-tag--accent">VALOR COMPUTADO</span>
        <strong class="ulab-result__px">
          {{ lab.units.unit === 'ch' ? `${lab.units.value} caracteres` : `${computedPx.toFixed(1)}px` }}
        </strong>
      </div>
      <p class="ulab-result__formula">{{ formulaText }}</p>

      <div v-if="lab.units.unit === 'ch'" class="ulab-ch-preview">
        <p
          class="ulab-ch-sample"
          :style="{
            maxWidth: `${lab.units.value}ch`,
            fontSize: `${lab.units.rootFontSize}px`
          }"
        >
          0123456789 — A unidade ch limita a medida da linha de texto conforme a largura do glifo zero, evitando parágrafos cansativos em monitores largos.
        </p>
      </div>

      <div v-else class="ulab-active-sample">
        <p :style="{ fontSize: `${Math.min(computedPx, 64)}px` }">
          Guia de Responsividade · {{ lab.units.value }}{{ lab.units.unit }}
        </p>
      </div>
    </div>

    <div class="ulab-compare">
      <div class="ulab-card">
        <div class="ulab-card__top">
          <span class="mono-tag">FIXO EM PX</span>
          <code>{{ comparisonSamples.fixedPx }}px</code>
        </div>
        <p class="ulab-card__text" :style="{ fontSize: `${comparisonSamples.fixedPx}px` }">
          Amostra fixa
        </p>
        <span class="mono-tag">Calculado: {{ comparisonSamples.fixedPx }}.0px</span>
      </div>

      <div class="ulab-card ulab-card--accent">
        <div class="ulab-card__top">
          <span class="mono-tag mono-tag--accent">RELATIVO À RAIZ (REM)</span>
          <code>{{ comparisonSamples.factor }}rem</code>
        </div>
        <p class="ulab-card__text" :style="{ fontSize: `${Math.min(comparisonSamples.remPx, 52)}px` }">
          Amostra em rem
        </p>
        <span class="mono-tag">Calculado: {{ comparisonSamples.remPx }}px</span>
      </div>

      <div class="ulab-card">
        <div class="ulab-card__top">
          <span class="mono-tag">RELATIVO AO PAI (EM)</span>
          <code>{{ comparisonSamples.factor }}em</code>
        </div>
        <p class="ulab-card__text" :style="{ fontSize: `${Math.min(comparisonSamples.emPx, 52)}px` }">
          Amostra em em
        </p>
        <span class="mono-tag">
          1º nível: {{ comparisonSamples.emPx }}px · Aninhado: {{ comparisonSamples.nestedEmPx }}px
        </span>
      </div>
    </div>

    <div class="ulab-css">
      <span class="mono-tag">CSS CORRESPONDENTE</span>
      <pre><code>{{ generatedCss }}</code></pre>
    </div>
  </LabContainer>
</template>

<style scoped>
.ulab-units {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.ulab-sliders {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

.ulab-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-3);
  border: var(--border-thin);
  background-color: var(--color-paper);
}

.ulab-field__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2);
}

.ulab-field__head strong {
  font-family: var(--font-mono);
  color: var(--color-accent-dark);
}

.ulab-field input[type='range'] {
  width: 100%;
  accent-color: var(--color-accent);
  cursor: pointer;
}

.ulab-quick {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.ulab-result {
  padding: var(--space-4);
  border: var(--border-strong);
  background-color: var(--color-paper);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.ulab-result__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2);
}

.ulab-result__px {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-ink);
}

.ulab-result__formula {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-muted-text);
}

.ulab-active-sample {
  padding: var(--space-4);
  background-color: var(--color-paper-bright);
  border: var(--border-thin);
  overflow-wrap: break-word;
  line-height: 1.25;
}

.ulab-ch-preview {
  padding: var(--space-4);
  background-color: var(--color-paper-bright);
  border: var(--border-thin);
  overflow-x: auto;
}

.ulab-ch-sample {
  padding: var(--space-3);
  background-color: var(--color-accent-tint);
  border-left: 4px solid var(--color-accent);
  font-family: var(--font-mono);
  line-height: 1.5;
}

.ulab-compare {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
}

.ulab-card {
  padding: var(--space-4);
  border: var(--border-thin);
  background-color: var(--color-paper);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-3);
  min-width: 0;
}

.ulab-card--accent {
  border-color: var(--color-ink);
  border-top: 3px solid var(--color-accent);
  background-color: var(--color-paper-bright);
}

.ulab-card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
}

.ulab-card__text {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.15;
  overflow-wrap: break-word;
}

.ulab-css {
  padding: var(--space-4);
  background-color: var(--color-code-bg);
  color: var(--color-code-ink);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  overflow-x: auto;
}

.ulab-css .mono-tag {
  color: var(--color-accent);
}

.ulab-css pre {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1.6;
}

@media (min-width: 48rem) {
  .ulab-sliders {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ulab-compare {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
