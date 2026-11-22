<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import LabContainer from '@/components/LabContainer.vue'
import { useGuiaStore } from '@/stores/guia'
import { useLaboratorioStore } from '@/stores/laboratorio'

const guia = useGuiaStore()
const lab = useLaboratorioStore()

const stageRef = ref(null)
const stageWidth = ref(600)
let resizeObserver = null

const presets = [
  { label: '320px', name: 'Celular P', width: 320 },
  { label: '375px', name: 'Celular M', width: 375 },
  { label: '430px', name: 'Celular G', width: 430 },
  { label: '768px', name: 'Tablet', width: 768 },
  { label: '1024px', name: 'Notebook', width: 1024 },
  { label: '1440px', name: 'Desktop', width: 1440 }
]

const effectiveLayoutWidth = computed(() => {
  if (!lab.viewport.hasMetaViewport && lab.viewport.width < 980) {
    return 980
  }
  return lab.viewport.width
})

const breakpointInfo = computed(() => {
  const w = effectiveLayoutWidth.value
  if (w < 768) {
    return {
      code: 'BASE (MOBILE)',
      device: 'Celular',
      columns: 1,
      showSidebar: false,
      mobileNav: true,
      activeQuery: 'Nenhuma @media ativa (CSS base mobile-first)'
    }
  }
  if (w < 1024) {
    return {
      code: 'MD · ≥ 48rem',
      device: 'Tablet',
      columns: 2,
      showSidebar: false,
      mobileNav: false,
      activeQuery: '@media (min-width: 48rem)'
    }
  }
  if (w < 1280) {
    return {
      code: 'LG · ≥ 64rem',
      device: 'Notebook',
      columns: 3,
      showSidebar: true,
      mobileNav: false,
      activeQuery: '@media (min-width: 64rem)'
    }
  }
  return {
    code: 'XL · ≥ 80rem',
    device: 'Desktop',
    columns: 3,
    showSidebar: true,
    mobileNav: false,
    activeQuery: '@media (min-width: 80rem)'
  }
})

const displayFrameWidth = computed(() => {
  return Math.min(lab.viewport.width, Math.max(stageWidth.value - 8, 260))
})

const renderScale = computed(() => {
  return Math.min(1, displayFrameWidth.value / effectiveLayoutWidth.value)
})

const baseContentHeight = computed(() => {
  if (breakpointInfo.value.columns === 1) {
    return 395
  }
  if (breakpointInfo.value.columns === 2) {
    return 320
  }
  return 285
})

const scaledContainerHeight = computed(() => {
  return Math.round(baseContentHeight.value * renderScale.value)
})

const observationText = computed(() => {
  if (!lab.viewport.hasMetaViewport && lab.viewport.width < 980) {
    return `Sem a meta tag viewport, a tela de ${lab.viewport.width}px simula uma layout viewport virtual de 980px e encolhe tudo para ${Math.round(renderScale.value * 100)}%, disparando o layout de tablet/desktop em miniatura.`
  }
  return `Com width=device-width ativo em ${lab.viewport.width}px (${(lab.viewport.width / 16).toFixed(2)}rem), o breakpoint ativo é ${breakpointInfo.value.code}, renderizando ${breakpointInfo.value.columns} coluna(s).`
})

function setWidth(width) {
  lab.viewport.width = width
  guia.markLabUsed('lab-01-viewport')
}

function toggleMeta(value) {
  lab.viewport.hasMetaViewport = value
  guia.markLabUsed('lab-01-viewport')
}

onMounted(() => {
  if (stageRef.value) {
    stageWidth.value = stageRef.value.clientWidth
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          stageWidth.value = Math.floor(entry.contentRect.width)
        }
      })
      resizeObserver.observe(stageRef.value)
    }
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<template>
  <LabContainer
    code-label="EXPERIMENTO 01 / VIEWPORT"
    title="Simulador de Viewport e Mobile-First"
    description="Arraste a largura de 320px até 1440px e desligue a meta tag viewport para ver exatamente por que sites sem ela aparecem encolhidos no celular."
    :observation="observationText"
  >
    <div class="vlab-controls">
      <div class="vlab-slider-block">
        <div class="vlab-slider-head">
          <label for="viewport-width-slider" class="mono-tag">Largura física da tela</label>
          <strong class="vlab-readout">
            {{ lab.viewport.width }}px ({{ (lab.viewport.width / 16).toFixed(2) }}rem)
          </strong>
        </div>
        <input
          id="viewport-width-slider"
          v-model.number="lab.viewport.width"
          type="range"
          min="320"
          max="1440"
          step="1"
          class="vlab-range"
          @input="guia.markLabUsed('lab-01-viewport')"
        />
      </div>

      <div class="vlab-presets" role="group" aria-label="Larguras predefinidas">
        <button
          v-for="preset in presets"
          :key="preset.width"
          type="button"
          class="btn btn--sm"
          :aria-pressed="String(lab.viewport.width === preset.width)"
          @click="setWidth(preset.width)"
        >
          {{ preset.label }} · {{ preset.name }}
        </button>
      </div>

      <div class="vlab-meta-toggle" role="group" aria-label="Estado da meta tag viewport">
        <span class="mono-tag">Meta tag viewport:</span>
        <button
          type="button"
          class="btn btn--sm"
          :aria-pressed="String(lab.viewport.hasMetaViewport)"
          @click="toggleMeta(true)"
        >
          Ativa (device-width)
        </button>
        <button
          type="button"
          class="btn btn--sm"
          :aria-pressed="String(!lab.viewport.hasMetaViewport)"
          @click="toggleMeta(false)"
        >
          Ausente (virtual 980px)
        </button>
      </div>
    </div>

    <div class="vlab-telemetry">
      <div class="telemetry-cell">
        <span class="mono-tag">RESULTADO / BREAKPOINT ATIVO</span>
        <strong>{{ breakpointInfo.code }}</strong>
      </div>
      <div class="telemetry-cell">
        <span class="mono-tag">LAYOUT VIEWPORT</span>
        <strong>{{ effectiveLayoutWidth }}px</strong>
      </div>
      <div class="telemetry-cell">
        <span class="mono-tag">ESCALA VISUAL</span>
        <strong>{{ Math.round(renderScale * 100) }}%</strong>
      </div>
      <div class="telemetry-cell">
        <span class="mono-tag">MEDIA QUERY ATIVA</span>
        <code>{{ breakpointInfo.activeQuery }}</code>
      </div>
    </div>

    <div ref="stageRef" class="vlab-stage">
      <div
        class="vlab-device"
        :style="{ width: `${displayFrameWidth}px` }"
      >
        <div class="vlab-device__chrome">
          <span>{{ lab.viewport.width }}px</span>
          <span>{{ lab.viewport.hasMetaViewport ? 'meta viewport: ON' : 'meta viewport: OFF (980px)' }}</span>
        </div>

        <div
          class="vlab-device__screen"
          :style="{ height: `${scaledContainerHeight}px` }"
        >
          <div
            class="vlab-sim"
            :style="{
              width: `${effectiveLayoutWidth}px`,
              height: `${baseContentHeight}px`,
              transform: `scale(${renderScale})`
            }"
          >
            <div class="vlab-sim__header">
              <span class="vlab-sim__brand">JORNAL.GRID</span>
              <span v-if="breakpointInfo.mobileNav" class="vlab-sim__menu-btn">MENU</span>
              <div v-else class="vlab-sim__nav">
                <span>Capa</span>
                <span>Artigos</span>
                <span>Guias</span>
                <span>Sobre</span>
              </div>
            </div>

            <div
              class="vlab-sim__body"
              :class="{ 'vlab-sim__body--with-aside': breakpointInfo.showSidebar }"
            >
              <aside v-if="breakpointInfo.showSidebar" class="vlab-sim__aside">
                <strong>Índice lateral</strong>
                <span>01 · Grade</span>
                <span>02 · Unidades</span>
                <span>03 · Imagens</span>
              </aside>

              <div class="vlab-sim__content">
                <div class="vlab-sim__banner">
                  <span>{{ breakpointInfo.device }} · {{ breakpointInfo.columns }} coluna(s)</span>
                  <strong>Manchete responsiva em {{ effectiveLayoutWidth }}px</strong>
                </div>

                <div
                  class="vlab-sim__cards"
                  :style="{ gridTemplateColumns: `repeat(${breakpointInfo.columns}, minmax(0, 1fr))` }"
                >
                  <div class="vlab-sim__card">
                    <span>01</span>
                    <strong>Bloco A</strong>
                    <p>Fluxo adaptado à largura.</p>
                  </div>
                  <div class="vlab-sim__card">
                    <span>02</span>
                    <strong>Bloco B</strong>
                    <p>Sem rolagem horizontal.</p>
                  </div>
                  <div class="vlab-sim__card">
                    <span>03</span>
                    <strong>Bloco C</strong>
                    <p>Leitura em escala real.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LabContainer>
</template>

<style scoped>
.vlab-controls {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.vlab-slider-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.vlab-slider-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2);
}

.vlab-readout {
  font-family: var(--font-mono);
  font-size: var(--text-md);
  color: var(--color-accent-dark);
}

.vlab-range {
  width: 100%;
  accent-color: var(--color-accent);
  cursor: pointer;
}

.vlab-presets,
.vlab-meta-toggle {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
}

.vlab-telemetry {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2);
  padding: var(--space-3);
  background-color: var(--color-paper);
  border: var(--border-thin);
}

.telemetry-cell {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.telemetry-cell strong {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.vlab-stage {
  width: 100%;
  padding: var(--space-4) var(--space-2);
  background-color: var(--color-paper-alt);
  border: var(--border-thin);
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.vlab-device {
  border: 2px solid var(--color-ink);
  background-color: var(--color-paper-bright);
  max-width: 100%;
}

.vlab-device__chrome {
  display: flex;
  justify-content: space-between;
  gap: var(--space-2);
  padding: 0.35rem 0.65rem;
  background-color: var(--color-ink);
  color: var(--color-paper);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
}

.vlab-device__screen {
  position: relative;
  overflow: hidden;
  width: 100%;
  background-color: var(--color-paper-bright);
}

.vlab-sim {
  transform-origin: top left;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--color-ink);
  font-family: var(--font-body);
}

.vlab-sim__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--color-ink);
}

.vlab-sim__brand {
  font-family: var(--font-display);
  font-size: 16px;
}

.vlab-sim__menu-btn {
  background-color: var(--color-accent);
  color: var(--color-ink);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border: 1px solid var(--color-ink);
}

.vlab-sim__nav {
  display: flex;
  gap: 14px;
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
}

.vlab-sim__body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.vlab-sim__body--with-aside {
  grid-template-columns: 170px minmax(0, 1fr);
}

.vlab-sim__aside {
  border: 1px solid var(--color-ink);
  background-color: var(--color-paper-alt);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  font-family: var(--font-mono);
}

.vlab-sim__content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.vlab-sim__banner {
  background-color: var(--color-paper-alt);
  border-left: 4px solid var(--color-accent);
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.vlab-sim__banner span {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  color: var(--color-accent-dark);
}

.vlab-sim__banner strong {
  font-size: 18px;
}

.vlab-sim__cards {
  display: grid;
  gap: 10px;
}

.vlab-sim__card {
  border: 1px solid var(--color-ink);
  background-color: var(--color-paper);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.vlab-sim__card span {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-accent-dark);
}

.vlab-sim__card strong {
  font-size: 14px;
}

.vlab-sim__card p {
  font-size: 12px;
  color: var(--color-ink-soft);
}

@media (min-width: 48rem) {
  .vlab-telemetry {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 64rem) {
  .vlab-telemetry {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
