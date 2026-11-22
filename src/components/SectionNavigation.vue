<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getAdjacentChapters } from '@/data/chapters'

const route = useRoute()

const nav = computed(() => getAdjacentChapters(route.path))
</script>

<template>
  <nav class="section-nav" aria-label="Navegação entre capítulos">
    <RouterLink v-if="nav.prev" :to="nav.prev.path" class="section-nav__item section-nav__item--prev">
      <span class="mono-tag">← Anterior · {{ nav.prev.number }}</span>
      <strong class="section-nav__title">{{ nav.prev.shortTitle }}</strong>
    </RouterLink>
    <div v-else class="section-nav__spacer" aria-hidden="true"></div>

    <RouterLink v-if="nav.next" :to="nav.next.path" class="section-nav__item section-nav__item--next">
      <span class="mono-tag">Próximo · {{ nav.next.number }} →</span>
      <strong class="section-nav__title">{{ nav.next.shortTitle }}</strong>
    </RouterLink>
  </nav>
</template>

<style scoped>
.section-nav {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
  padding-top: var(--space-8);
  border-top: var(--border-strong);
}

.section-nav__item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-paper-bright);
  border: var(--border-thin);
  text-decoration: none;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}

.section-nav__item:hover {
  background-color: var(--color-ink);
  border-color: var(--color-ink);
  color: var(--color-paper);
}

.section-nav__item:hover .mono-tag,
.section-nav__item:hover .section-nav__title {
  color: var(--color-paper);
}

.section-nav__title {
  font-family: var(--font-heading);
  font-size: var(--text-md);
  color: var(--color-ink);
}

.section-nav__spacer {
  display: none;
}

@media (min-width: 48rem) {
  .section-nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .section-nav__item--next {
    text-align: right;
    align-items: flex-end;
  }

  .section-nav__spacer {
    display: block;
  }
}
</style>
