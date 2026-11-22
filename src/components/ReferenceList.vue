<script setup>
defineProps({
  sources: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section class="reference-list" aria-label="Fontes consultadas">
    <div class="reference-list__head">
      <span class="mono-tag mono-tag--accent">BIBLIOGRAFIA TÉCNICA</span>
      <h2 class="reference-list__title">Fontes consultadas</h2>
    </div>

    <ol class="reference-list__items">
      <li v-for="(source, index) in sources" :key="source.url" class="reference-list__item">
        <span class="reference-list__num">{{ String(index + 1).padStart(2, '0') }}</span>
        <div class="reference-list__content">
          <div class="reference-list__row">
            <span class="reference-list__org">{{ source.org }}</span>
            <a
              :href="source.url"
              target="_blank"
              rel="noopener noreferrer"
              class="reference-list__link"
            >
              {{ source.title }} ↗
            </a>
          </div>
          <p class="reference-list__note">{{ source.note }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.reference-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-5);
  background-color: var(--color-paper-alt);
  border: var(--border-thin);
}

.reference-list__head {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.reference-list__title {
  font-size: var(--text-lg);
}

.reference-list__items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.reference-list__item {
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr);
  gap: var(--space-3);
  padding-top: var(--space-3);
  border-top: var(--border-thin);
}

.reference-list__num {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-muted-text);
}

.reference-list__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
}

.reference-list__row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-2);
}

.reference-list__org {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.1rem 0.4rem;
  background-color: var(--color-ink);
  color: var(--color-paper);
}

.reference-list__link {
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--color-ink);
  word-break: break-word;
}

.reference-list__link:hover {
  color: var(--color-accent-dark);
}

.reference-list__note {
  font-size: var(--text-xs);
  color: var(--color-muted-text);
}
</style>
