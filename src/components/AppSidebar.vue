<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { CHAPTERS } from '@/data/chapters'
import { useGuiaStore } from '@/stores/guia'

const route = useRoute()
const guia = useGuiaStore()

function handleKeydown(event) {
  if (event.key === 'Escape' && guia.mobileMenuOpen) {
    guia.closeMobileMenu()
  }
}

function isVisited(path) {
  return guia.visitedPaths.includes(path)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div
    v-if="guia.mobileMenuOpen"
    class="sidebar-backdrop"
    aria-hidden="true"
    @click="guia.closeMobileMenu()"
  ></div>

  <aside
    id="manual-navigation"
    class="app-sidebar"
    :class="{ 'app-sidebar--open': guia.mobileMenuOpen }"
    aria-label="Navegação de capítulos do Guia de Responsividade"
  >
    <div class="sidebar-head">
      <div class="sidebar-head__row">
        <RouterLink to="/" class="sidebar-brand" @click="guia.closeMobileMenu()">
          <span class="sidebar-brand__logo">GRID</span>
          <span class="sidebar-brand__sub">Manual de Campo</span>
        </RouterLink>
        <button
          type="button"
          class="sidebar-close"
          aria-label="Fechar menu de navegação"
          @click="guia.closeMobileMenu()"
        >
          ×
        </button>
      </div>
      <p class="sidebar-edition mono-tag">Guia de Responsividade · Vue 3</p>
    </div>

    <div class="sidebar-progress">
      <div class="sidebar-progress__meta">
        <span class="mono-tag">Leitura</span>
        <span class="mono-tag mono-tag--accent">
          {{ guia.visitedCount }}/{{ guia.trackableChapters.length }} ({{ guia.progressPercent }}%)
        </span>
      </div>
      <div class="sidebar-progress__track" aria-hidden="true">
        <div
          class="sidebar-progress__fill"
          :style="{ width: `${guia.progressPercent}%` }"
        ></div>
      </div>
    </div>

    <nav class="sidebar-nav">
      <ul class="sidebar-list">
        <li v-for="chapter in CHAPTERS" :key="chapter.id">
          <RouterLink
            :to="chapter.path"
            class="sidebar-link"
            :class="{ 'sidebar-link--active': route.path === chapter.path }"
            @click="guia.closeMobileMenu()"
          >
            <span class="sidebar-link__num">{{ chapter.number }}</span>
            <span class="sidebar-link__body">
              <span class="sidebar-link__title">{{ chapter.shortTitle }}</span>
              <span v-if="chapter.labLabel" class="sidebar-link__lab">{{ chapter.labLabel }}</span>
            </span>
            <span
              v-if="chapter.trackProgress"
              class="sidebar-link__status"
              :class="{ 'sidebar-link__status--done': isVisited(chapter.path) }"
              :title="isVisited(chapter.path) ? 'Capítulo visitado' : 'Ainda não visitado'"
              aria-hidden="true"
            ></span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div class="sidebar-foot">
      <div class="sidebar-spec">
        <span class="mono-tag">Janela real</span>
        <strong class="sidebar-spec__val">
          {{ guia.viewportWidth }}px · {{ guia.activeBreakpoint.code }}
        </strong>
      </div>
      <div class="sidebar-spec">
        <span class="mono-tag">Laboratórios testados</span>
        <strong class="sidebar-spec__val">{{ guia.experimentedLabs.length }}/5</strong>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-backdrop {
  position: fixed;
  inset: 0;
  z-index: 95;
  background-color: rgba(23, 23, 23, 0.55);
}

.app-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  width: min(85vw, var(--sidebar-width));
  display: flex;
  flex-direction: column;
  background-color: var(--color-paper);
  border-right: var(--border-strong);
  transform: translateX(-100%);
  transition: transform var(--transition-base);
  overflow-y: auto;
}

.app-sidebar--open {
  transform: translateX(0);
}

.sidebar-head {
  padding: var(--space-5);
  border-bottom: var(--border-strong);
  background-color: var(--color-ink);
  color: var(--color-paper);
}

.sidebar-head__row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3);
}

.sidebar-brand {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--color-paper);
}

.sidebar-brand__logo {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  line-height: 1;
  letter-spacing: 0.05em;
}

.sidebar-brand__sub {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  margin-top: var(--space-1);
}

.sidebar-close {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--color-muted);
  background: transparent;
  color: var(--color-paper);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}

.sidebar-edition {
  margin-top: var(--space-3);
  color: var(--color-muted);
  font-size: 0.6875rem;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.sidebar-progress {
  padding: var(--space-4) var(--space-5);
  border-bottom: var(--border-thin);
  background-color: var(--color-paper-alt);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sidebar-progress__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-progress__track {
  height: 0.375rem;
  background-color: var(--color-rule);
  width: 100%;
}

.sidebar-progress__fill {
  height: 100%;
  background-color: var(--color-accent);
  transition: width var(--transition-base);
}

.sidebar-nav {
  flex: 1;
  padding: var(--space-3) 0;
}

.sidebar-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-link {
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr) auto;
  align-items: start;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  text-decoration: none;
  border-left: 4px solid transparent;
  border-bottom: 1px solid rgba(207, 201, 188, 0.55);
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}

.sidebar-link:hover {
  background-color: var(--color-paper-alt);
}

.sidebar-link--active {
  background-color: var(--color-paper-bright);
  border-left-color: var(--color-accent);
}

.sidebar-link__num {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-muted-text);
  padding-top: 0.15rem;
}

.sidebar-link--active .sidebar-link__num {
  color: var(--color-accent-dark);
}

.sidebar-link__body {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.sidebar-link__title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-ink);
  line-height: 1.3;
}

.sidebar-link__lab {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--color-muted-text);
}

.sidebar-link__status {
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.35rem;
  border: 1px solid var(--color-muted-text);
}

.sidebar-link__status--done {
  background-color: var(--color-accent);
  border-color: var(--color-ink);
}

.sidebar-foot {
  padding: var(--space-4) var(--space-5);
  border-top: var(--border-strong);
  background-color: var(--color-paper-alt);
  display: grid;
  gap: var(--space-3);
}

.sidebar-spec {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2);
}

.sidebar-spec__val {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-ink);
}

@media (min-width: 64rem) {
  .sidebar-backdrop {
    display: none;
  }

  .app-sidebar {
    width: var(--sidebar-width);
    transform: translateX(0);
  }

  .sidebar-close {
    display: none;
  }
}
</style>
