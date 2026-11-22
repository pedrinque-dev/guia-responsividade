<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import LabContainer from '@/components/LabContainer.vue'
import { useGuiaStore } from '@/stores/guia'
import { useLaboratorioStore } from '@/stores/laboratorio'

const guia = useGuiaStore()
const lab = useLaboratorioStore()

function buildEditorialSvg(width, height, tag, title, accent) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="#1E1E1C"/>
    <g stroke="#3A3935" stroke-width="2">
      <line x1="0" y1="${Math.round(height * 0.25)}" x2="${width}" y2="${Math.round(height * 0.25)}"/>
      <line x1="0" y1="${Math.round(height * 0.5)}" x2="${width}" y2="${Math.round(height * 0.5)}"/>
      <line x1="0" y1="${Math.round(height * 0.75)}" x2="${width}" y2="${Math.round(height * 0.75)}"/>
      <line x1="${Math.round(width * 0.25)}" y1="0" x2="${Math.round(width * 0.25)}" y2="${height}"/>
      <line x1="${Math.round(width * 0.5)}" y1="0" x2="${Math.round(width * 0.5)}" y2="${height}"/>
      <line x1="${Math.round(width * 0.75)}" y1="0" x2="${Math.round(width * 0.75)}" y2="${height}"/>
    </g>
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" fill="none" stroke="${accent}" stroke-width="4"/>
    <circle cx="${Math.round(width * 0.5)}" cy="${Math.round(height * 0.5)}" r="${Math.round(Math.min(width, height) * 0.22)}" fill="${accent}" fill-opacity="0.9"/>
    <rect x="44" y="44" width="160" height="36" fill="#F5F1E8"/>
    <text x="56" y="68" font-family="monospace" font-size="18" font-weight="700" fill="#171717">${tag}</text>
    <text x="${Math.round(width * 0.5)}" y="${height - 44}" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="700" fill="#F5F1E8">${title}</text>
  </svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const samples = [
  {
    id: 'landscape',
    label: 'Paisagem 16:9 (800×450)',
    width: 800,
    height: 450,
    src: buildEditorialSvg(800, 450, '16:9 · 800x450', 'PRANCHA HORIZONTAL', '#E87836')
  },
  {
    id: 'portrait',
    label: 'Retrato 3:4 (600×800)',
    width: 600,
    height: 800,
    src: buildEditorialSvg(600, 800, '3:4 · 600x800', 'PRANCHA VERTICAL', '#E87836')
  },
  {
    id: 'square',
    label: 'Quadrada 1:1 (600×600)',
    width: 600,
    height: 600,
    src: buildEditorialSvg(600, 600, '1:1 · 600x600', 'PRANCHA QUADRADA', '#E87836')
  }
]

const aspectOptions = ['16 / 9', '4 / 3', '1 / 1', '3 / 4', '21 / 9', 'livre']

const activeSample = computed(() => {
  return samples.find((item) => item.id === lab.image.sampleId) || samples[0]
})

const frameStyle = computed(() => {
  if (lab.image.aspectMode === 'livre') {
    return {
      width: `min(100%, ${lab.image.frameWidth}px)`,
      height: `${lab.image.frameHeight}px`
    }
  }
  return {
    width: `min(100%, ${lab.image.frameWidth}px)`,
    aspectRatio: lab.image.aspectMode
  }
})

const generatedImageCss = computed(() => {
  const lines = ['.quadro-midia {', `  width: min(100%, ${lab.image.frameWidth}px);`]
  if (lab.image.aspectMode === 'livre') {
    lines.push(`  height: ${lab.image.frameHeight}px;`)
  } else {
    lines.push(`  aspect-ratio: ${lab.image.aspectMode};`)
  }
  lines.push('}', '.quadro-midia img {', '  width: 100%;', '  height: 100%;', `  object-fit: ${lab.image.objectFit};`, '}')
  return lines.join('\n')
})

const clsState = ref('idle')
const clsProgress = ref(0)
let clsTimer = null
let progressTimer = null

const clsSampleSrc = buildEditorialSvg(800, 450, 'CLS · 800x450', 'FOTO CARREGADA', '#E87836')

function clearClsTimers() {
  if (clsTimer) {
    window.clearTimeout(clsTimer)
    clsTimer = null
  }
  if (progressTimer) {
    window.clearInterval(progressTimer)
    progressTimer = null
  }
}

function runClsSimulation() {
  clearClsTimers()
  guia.markLabUsed('lab-04-imagens')
  clsState.value = 'loading'
  clsProgress.value = 10

  progressTimer = window.setInterval(() => {
    clsProgress.value = Math.min(92, clsProgress.value + 14)
  }, 160)

  clsTimer = window.setTimeout(() => {
    clearClsTimers()
    clsProgress.value = 100
    clsState.value = 'loaded'
  }, 1200)
}

function resetClsSimulation() {
  clearClsTimers()
  clsState.value = 'idle'
  clsProgress.value = 0
}

const observationText = computed(() => {
  const fitHint =
    lab.image.objectFit === 'cover'
      ? 'object-fit: cover preenche todo o quadro sem deformar a prancha, recortando as bordas excedentes.'
      : lab.image.objectFit === 'contain'
        ? 'object-fit: contain exibe 100% da imagem original sem cortes, revelando faixas vazias quando a proporção do quadro difere.'
        : 'object-fit: fill força a imagem a ocupar todo o espaço, causando distorção visual quando a proporção não coincide.'
  if (clsState.value === 'loaded') {
    return `${fitHint} No experimento CLS abaixo, a coluna sem dimensões empurrou o texto 180px para baixo (CLS ≈ 0,285), enquanto a coluna com width/height manteve o texto imóvel (CLS = 0,000).`
  }
  return fitHint
})

function touchLab() {
  guia.markLabUsed('lab-04-imagens')
}

onBeforeUnmount(() => {
  clearClsTimers()
})
</script>

<template>
  <LabContainer
    code-label="EXPERIMENTO 04 / IMAGENS RESPONSIVAS"
    title="Imagem sob Investigação e Simulador de CLS"
    description="Teste combinações de object-fit, aspect-ratio e dimensões de quadro, e depois acione o carregamento atrasado para ver o Cumulative Layout Shift acontecendo na prática."
    :observation="observationText"
  >
    <div class="ilab-section">
      <div class="ilab-section__head">
        <span class="mono-tag mono-tag--accent">PARTE A / ENQUADRAMENTO E PROPORÇÃO</span>
      </div>

      <div class="ilab-controls">
        <div class="ilab-group">
          <span class="mono-tag">Prancha de teste (proporção original)</span>
          <div class="ilab-buttons">
            <button
              v-for="sample in samples"
              :key="sample.id"
              type="button"
              class="btn btn--sm"
              :aria-pressed="String(lab.image.sampleId === sample.id)"
              @click="lab.image.sampleId = sample.id; touchLab()"
            >
              {{ sample.label }}
            </button>
          </div>
        </div>

        <div class="ilab-group">
          <span class="mono-tag">object-fit</span>
          <div class="ilab-buttons">
            <button
              v-for="fit in ['cover', 'contain', 'fill']"
              :key="fit"
              type="button"
              class="btn btn--sm"
              :aria-pressed="String(lab.image.objectFit === fit)"
              @click="lab.image.objectFit = fit; touchLab()"
            >
              {{ fit }}
            </button>
          </div>
        </div>

        <div class="ilab-group">
          <span class="mono-tag">aspect-ratio do contêiner</span>
          <div class="ilab-buttons">
            <button
              v-for="ratio in aspectOptions"
              :key="ratio"
              type="button"
              class="btn btn--sm"
              :aria-pressed="String(lab.image.aspectMode === ratio)"
              @click="lab.image.aspectMode = ratio; touchLab()"
            >
              {{ ratio }}
            </button>
          </div>
        </div>

        <div class="ilab-sliders">
          <div class="ilab-slider">
            <div class="ilab-slider__head">
              <label for="img-width-slider" class="mono-tag">Largura do quadro</label>
              <strong>{{ lab.image.frameWidth }}px</strong>
            </div>
            <input
              id="img-width-slider"
              v-model.number="lab.image.frameWidth"
              type="range"
              min="180"
              max="520"
              step="10"
              @input="touchLab"
            />
          </div>

          <div v-if="lab.image.aspectMode === 'livre'" class="ilab-slider">
            <div class="ilab-slider__head">
              <label for="img-height-slider" class="mono-tag">Altura livre do quadro</label>
              <strong>{{ lab.image.frameHeight }}px</strong>
            </div>
            <input
              id="img-height-slider"
              v-model.number="lab.image.frameHeight"
              type="range"
              min="120"
              max="360"
              step="10"
              @input="touchLab"
            />
          </div>
        </div>
      </div>

      <div class="ilab-preview-wrap">
        <div class="ilab-frame" :style="frameStyle">
          <img
            :src="activeSample.src"
            :width="activeSample.width"
            :height="activeSample.height"
            :alt="activeSample.label"
            class="ilab-frame__img"
            :style="{ objectFit: lab.image.objectFit }"
          />
        </div>
        <div class="ilab-css">
          <span class="mono-tag">CSS APLICADO</span>
          <pre><code>{{ generatedImageCss }}</code></pre>
        </div>
      </div>
    </div>

    <div class="ilab-cls">
      <div class="ilab-cls__head">
        <div>
          <span class="mono-tag mono-tag--accent">PARTE B / SIMULADOR DE CLS (CARREGAMENTO ATRASADO)</span>
          <h3 class="ilab-cls__title">Compare o texto “pulando” sem e com width/height</h3>
        </div>
        <div class="ilab-buttons">
          <button type="button" class="btn btn--primary btn--sm" @click="runClsSimulation">
            {{ clsState === 'loading' ? `Baixando (${clsProgress}%)...` : 'Simular carregamento atrasado (1,2 s)' }}
          </button>
          <button
            v-if="clsState !== 'idle'"
            type="button"
            class="btn btn--sm"
            @click="resetClsSimulation"
          >
            Reiniciar
          </button>
        </div>
      </div>

      <div class="cls-grid">
        <article class="cls-card">
          <div class="cls-card__meta">
            <span class="mono-tag">SEM WIDTH E HEIGHT</span>
            <span
              class="cls-score"
              :class="clsState === 'loaded' ? 'cls-score--bad' : ''"
            >
              {{ clsState === 'loaded' ? 'CLS ≈ 0,285 · SALTO DE 180PX' : 'AGUARDANDO IMAGEM' }}
            </span>
          </div>

          <div class="cls-viewport">
            <p class="cls-kicker">ARTIGO DE CAMPO</p>
            <div v-if="clsState === 'loaded'" class="cls-unreserved-img">
              <img :src="clsSampleSrc" alt="Imagem inserida sem espaço reservado" />
            </div>
            <div class="cls-copy" :class="{ 'cls-copy--shifted': clsState === 'loaded' }">
              <strong>Leia esta frase enquanto a imagem carrega</strong>
              <p>
                Sem reserva prévia, o texto começa encostado no topo. Assim que a foto termina de
                baixar, o navegador empurra este parágrafo abruptamente para baixo.
              </p>
            </div>
          </div>
        </article>

        <article class="cls-card cls-card--good">
          <div class="cls-card__meta">
            <span class="mono-tag mono-tag--accent">COM WIDTH="800" HEIGHT="450"</span>
            <span
              class="cls-score"
              :class="clsState === 'loaded' ? 'cls-score--good' : ''"
            >
              {{ clsState === 'loaded' ? 'CLS = 0,000 · ZERO SALTO' : 'ESPAÇO RESERVADO (16:9)' }}
            </span>
          </div>

          <div class="cls-viewport">
            <p class="cls-kicker">ARTIGO DE CAMPO</p>
            <div class="cls-reserved-slot">
              <img
                v-if="clsState === 'loaded'"
                :src="clsSampleSrc"
                width="800"
                height="450"
                alt="Imagem carregada dentro do espaço previamente reservado"
              />
              <div v-else class="cls-placeholder">
                <span>{{ clsState === 'loading' ? `Carregando foto (${clsProgress}%)...` : 'Caixa reservada (800×450)' }}</span>
              </div>
            </div>
            <div class="cls-copy">
              <strong>Leia esta frase enquanto a imagem carrega</strong>
              <p>
                Como o navegador já conhece a proporção intrínseca desde o HTML inicial, o texto nasce
                no lugar definitivo e não se move um único pixel.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </LabContainer>
</template>

<style scoped>
.ilab-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-bottom: var(--space-6);
  border-bottom: var(--border-strong);
}

.ilab-controls {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
}

.ilab-group,
.ilab-slider {
  padding: var(--space-3);
  background-color: var(--color-paper);
  border: var(--border-thin);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.ilab-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.ilab-sliders {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
}

.ilab-slider__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.ilab-slider__head strong {
  font-family: var(--font-mono);
  color: var(--color-accent-dark);
}

.ilab-slider input[type='range'] {
  width: 100%;
  accent-color: var(--color-accent);
  cursor: pointer;
}

.ilab-preview-wrap {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  align-items: start;
}

.ilab-frame {
  border: 2px solid var(--color-ink);
  background-color: var(--color-paper-alt);
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(23, 23, 23, 0.06),
    rgba(23, 23, 23, 0.06) 8px,
    transparent 8px,
    transparent 16px
  );
  overflow: hidden;
  margin: 0 auto;
}

.ilab-frame__img {
  width: 100%;
  height: 100%;
}

.ilab-css {
  padding: var(--space-4);
  background-color: var(--color-code-bg);
  color: var(--color-code-ink);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  overflow-x: auto;
}

.ilab-css .mono-tag {
  color: var(--color-accent);
}

.ilab-css pre {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1.6;
}

.ilab-cls {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.ilab-cls__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--space-3);
}

.ilab-cls__title {
  font-size: var(--text-md);
  margin-top: var(--space-1);
}

.cls-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

.cls-card {
  border: var(--border-thin);
  border-top: 3px solid var(--color-danger);
  background-color: var(--color-paper);
  display: flex;
  flex-direction: column;
}

.cls-card--good {
  border-top-color: var(--color-success);
}

.cls-card__meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  border-bottom: var(--border-thin);
  background-color: var(--color-paper-alt);
}

.cls-score {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border: var(--border-thin);
  background-color: var(--color-paper-bright);
}

.cls-score--bad {
  background-color: var(--color-danger-tint);
  border-color: var(--color-danger);
  color: var(--color-danger);
}

.cls-score--good {
  background-color: var(--color-success-tint);
  border-color: var(--color-success);
  color: var(--color-success);
}

.cls-viewport {
  padding: var(--space-4);
  min-height: 21rem;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.cls-kicker {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  color: var(--color-muted-text);
}

.cls-unreserved-img {
  width: 100%;
  height: 11.25rem;
  border: 2px solid var(--color-danger);
  overflow: hidden;
}

.cls-unreserved-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cls-reserved-slot {
  width: 100%;
  height: 11.25rem;
  border: 2px dashed var(--color-success);
  background-color: var(--color-paper-alt);
  overflow: hidden;
}

.cls-reserved-slot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cls-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3);
  text-align: center;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-muted-text);
}

.cls-copy {
  padding: var(--space-3);
  background-color: var(--color-paper-bright);
  border: var(--border-thin);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.cls-copy--shifted {
  border-color: var(--color-danger);
  background-color: var(--color-danger-tint);
}

.cls-copy strong {
  font-size: var(--text-sm);
}

.cls-copy p {
  font-size: var(--text-xs);
  color: var(--color-ink-soft);
}

@media (min-width: 48rem) {
  .ilab-controls,
  .cls-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
