<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { CHAPTERS } from '@/data/chapters'
import { useGuiaStore } from '@/stores/guia'

const route = useRoute()
const guia = useGuiaStore()

const currentChapter = computed(() => {
  return CHAPTERS.find((item) => item.path === route.path) || CHAPTERS[0]
})
</script>

<template>
  <header class="app-header">
    <div class="app-header__brand">
      <RouterLink to="/" class="app-header__logo" @click="guia.closeMobileMenu()">
        <span class="app-header__grid-mark">GRID</span>
        <span class="app-header__sep" aria-hidden="true">/</span>
        <span class="app-header__name">Guia de Responsividade</span>
      </RouterLink>
      <span class="app-header__current mono-tag">{{ currentChapter.number }}</span>
    </div>

    <button
      type="button"
      class="app-header__menu-btn"
      :aria-expanded="String(guia.mobileMenuOpen)"
      aria-controls="manual-navigation"
      @click="guia.toggleMobileMenu()"
    >
      <span class="app-header__menu-icon" aria-hidden="true">
        <span></span>
        <span></span>
      </span>
      <span>{{ guia.mobileMenuOpen ? 'Fechar' : 'Índice' }}</span>
    </button>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  min-height: var(--header-height);
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-paper);
  border-bottom: var(--border-strong);
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
}

.app-header__logo {
  display: inline-flex;
  align-items: baseline;
  gap: var(--space-2);
  text-decoration: none;
  min-width: 0;
}

.app-header__grid-mark {
  font-family: var(--font-display);
  font-size: var(--text-md);
  letter-spacing: 0.04em;
  color: var(--color-ink);
}

.app-header__sep {
  color: var(--color-accent-dark);
  font-family: var(--font-mono);
  font-weight: 600;
}

.app-header__name {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-header__current {
  display: none;
}

.app-header__menu-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.5rem;
  padding: var(--space-2) var(--space-3);
  background-color: var(--color-ink);
  color: var(--color-paper);
  border: 1px solid var(--color-ink);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  flex-shrink: 0;
}

.app-header__menu-btn:hover {
  background-color: var(--color-accent-dark);
  border-color: var(--color-accent-dark);
}

.app-header__menu-icon {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 0.9rem;
}

.app-header__menu-icon span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: currentColor;
}

@media (min-width: 30rem) {
  .app-header__current {
    display: inline-block;
    padding: 0.1rem 0.4rem;
    border: var(--border-thin);
    background-color: var(--color-paper-alt);
  }
}

@media (min-width: 64rem) {
  .app-header {
    display: none;
  }
}
</style>
