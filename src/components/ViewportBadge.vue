<script setup>
import { ref } from 'vue'
import { useGuiaStore } from '@/stores/guia'

const guia = useGuiaStore()
const collapsed = ref(false)
</script>

<template>
  <aside class="viewport-badge" aria-label="Monitor de viewport e breakpoint ativo">
    <button
      type="button"
      class="viewport-badge__toggle"
      :aria-expanded="String(!collapsed)"
      :title="collapsed ? 'Expandir monitor de viewport' : 'Recolher monitor de viewport'"
      @click="collapsed = !collapsed"
    >
      <span class="viewport-badge__dot" aria-hidden="true"></span>
      <span class="viewport-badge__value">{{ guia.viewportWidth }}px</span>
      <span class="viewport-badge__bp">{{ guia.activeBreakpoint.code }}</span>
    </button>

    <div v-if="!collapsed" class="viewport-badge__detail">
      <span>{{ guia.activeBreakpoint.device }}</span>
      <span>{{ guia.activeBreakpoint.range }}</span>
    </div>
  </aside>
</template>

<style scoped>
.viewport-badge {
  position: fixed;
  right: var(--space-3);
  bottom: var(--space-3);
  z-index: 80;
  background-color: var(--color-ink);
  color: var(--color-paper);
  border: 1px solid var(--color-ink);
  font-family: var(--font-mono);
  font-size: 0.7rem;
}

.viewport-badge__toggle {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: 0.45rem 0.65rem;
  background: transparent;
  border: 0;
  color: var(--color-paper);
  cursor: pointer;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.viewport-badge__dot {
  width: 0.45rem;
  height: 0.45rem;
  background-color: var(--color-accent);
  flex-shrink: 0;
}

.viewport-badge__value {
  font-weight: 600;
}

.viewport-badge__bp {
  padding: 0.05rem 0.3rem;
  background-color: var(--color-accent);
  color: var(--color-ink);
  font-weight: 600;
}

.viewport-badge__detail {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  padding: 0.3rem 0.65rem 0.45rem;
  border-top: 1px solid rgba(245, 241, 232, 0.2);
  color: var(--color-muted);
  font-size: 0.65rem;
}

@media (min-width: 48rem) {
  .viewport-badge {
    right: var(--space-5);
    bottom: var(--space-5);
  }
}
</style>
