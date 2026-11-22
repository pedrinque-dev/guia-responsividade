<script setup>
import { onMounted, ref } from 'vue'
import { fetchResponsiveMedia, getFallbackMedia } from '@/services/api'
import { useLaboratorioStore } from '@/stores/laboratorio'

const lab = useLaboratorioStore()
const currentPage = ref(3)

async function loadMedia({ simulateError = false, nextPage = false } = {}) {
  if (nextPage) {
    currentPage.value = currentPage.value >= 12 ? 2 : currentPage.value + 1
  }

  lab.apiGallery.loading = true
  lab.apiGallery.error = null

  try {
    const items = await fetchResponsiveMedia({
      page: currentPage.value,
      limit: 4,
      simulateError
    })
    lab.apiGallery.items = items
    lab.apiGallery.usingFallback = false
    lab.apiGallery.loadedOnce = true
  } catch (err) {
    lab.apiGallery.error = err?.message || 'Não foi possível consultar a API pública.'
    lab.apiGallery.items = getFallbackMedia()
    lab.apiGallery.usingFallback = true
    lab.apiGallery.loadedOnce = true
  } finally {
    lab.apiGallery.loading = false
  }
}

onMounted(() => {
  if (!lab.apiGallery.loadedOnce) {
    loadMedia()
  }
})
</script>

<template>
  <section class="api-panel" aria-labelledby="api-showcase-title">
    <header class="api-panel__head">
      <div class="api-panel__intro">
        <span class="mono-tag mono-tag--accent">INTEGRAÇÃO COM API PÚBLICA · SRCSET REAL</span>
        <h2 id="api-showcase-title" class="api-panel__title">
          Galeria alimentada pela API Picsum Photos
        </h2>
        <p class="api-panel__desc">
          Cada imagem abaixo é montada a partir dos metadados retornados pela API pública com
          <code>srcset</code> (400w, 800w e 1200w), <code>width="800"</code>, <code>height="533"</code>
          e <code>loading="lazy"</code>. Se a rede falhar, o catálogo local entra automaticamente sem
          quebrar o layout.
        </p>
      </div>

      <div class="api-panel__actions">
        <button
          type="button"
          class="btn btn--primary btn--sm"
          :disabled="lab.apiGallery.loading"
          @click="loadMedia({ nextPage: true })"
        >
          {{ lab.apiGallery.loading ? 'Carregando...' : 'Buscar novo lote' }}
        </button>
        <button
          type="button"
          class="btn btn--sm"
          :disabled="lab.apiGallery.loading"
          @click="loadMedia({ simulateError: true })"
        >
          Simular falha (testar fallback)
        </button>
      </div>
    </header>

    <div v-if="lab.apiGallery.error" class="api-alert" role="status">
      <strong>Modo fallback ativado:</strong> {{ lab.apiGallery.error }} Exibindo pranchas locais
      para manter a demonstração funcional mesmo offline.
    </div>

    <div v-if="lab.apiGallery.loading" class="api-grid" aria-busy="true" aria-label="Carregando imagens da API">
      <div v-for="n in 4" :key="n" class="api-skeleton">
        <div class="api-skeleton__media"></div>
        <div class="api-skeleton__line"></div>
        <div class="api-skeleton__line api-skeleton__line--short"></div>
      </div>
    </div>

    <div v-else class="api-grid">
      <article v-for="item in lab.apiGallery.items" :key="item.id" class="api-card">
        <div class="api-card__media">
          <img
            :src="item.src"
            :srcset="item.srcset || undefined"
            :sizes="item.sizes"
            width="800"
            height="533"
            loading="lazy"
            :alt="`Fotografia de ${item.author} (${item.intrinsicWidth}×${item.intrinsicHeight})`"
          />
        </div>
        <div class="api-card__body">
          <div class="api-card__top">
            <span class="mono-tag">{{ item.sourceLabel }}</span>
            <span class="mono-tag mono-tag--accent">#{{ item.id }}</span>
          </div>
          <strong class="api-card__author">{{ item.author }}</strong>
          <p class="api-card__meta">
            Original: {{ item.intrinsicWidth }}×{{ item.intrinsicHeight }}px · Proporção {{ item.aspectLabel }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.api-panel {
  border: var(--border-strong);
  background-color: var(--color-paper-bright);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.api-panel__head {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: var(--border-thin);
}

.api-panel__intro {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.api-panel__title {
  font-size: var(--text-lg);
}

.api-panel__desc {
  font-size: var(--text-sm);
  color: var(--color-ink-soft);
  max-width: 44rem;
}

.api-panel__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.api-alert {
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-accent-tint);
  border: 1px solid var(--color-accent-dark);
  font-size: var(--text-sm);
  color: var(--color-ink);
}

.api-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

.api-card {
  border: var(--border-thin);
  background-color: var(--color-paper);
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.api-card__media {
  width: 100%;
  aspect-ratio: 3 / 2;
  background-color: var(--color-paper-alt);
  overflow: hidden;
  border-bottom: var(--border-thin);
}

.api-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.api-card__body {
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.api-card__top {
  display: flex;
  justify-content: space-between;
  gap: var(--space-2);
}

.api-card__author {
  font-size: var(--text-sm);
  color: var(--color-ink);
}

.api-card__meta {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-muted-text);
}

.api-skeleton {
  border: var(--border-thin);
  background-color: var(--color-paper);
  padding-bottom: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.api-skeleton__media {
  aspect-ratio: 3 / 2;
  background-color: var(--color-rule);
}

.api-skeleton__line {
  height: 0.75rem;
  margin: 0 var(--space-3);
  background-color: var(--color-rule);
}

.api-skeleton__line--short {
  width: 60%;
}

@media (min-width: 48rem) {
  .api-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
