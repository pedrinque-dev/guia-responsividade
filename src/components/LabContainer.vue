<script setup>
defineProps({
  codeLabel: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  observation: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <section class="lab-container" :aria-label="title">
    <header class="lab-container__header">
      <div class="lab-container__heading">
        <span class="lab-container__badge">{{ codeLabel }}</span>
        <h2 class="lab-container__title">{{ title }}</h2>
      </div>
      <p v-if="description" class="lab-container__desc">{{ description }}</p>
    </header>

    <div class="lab-container__workspace">
      <slot></slot>
    </div>

    <footer v-if="observation || $slots.observation" class="lab-container__footer">
      <span class="mono-tag mono-tag--accent">OBSERVAÇÃO / RESULTADO AO VIVO</span>
      <div class="lab-container__obs">
        <slot name="observation">{{ observation }}</slot>
      </div>
    </footer>
  </section>
</template>

<style scoped>
.lab-container {
  border: var(--border-strong);
  background-color: var(--color-paper-bright);
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.lab-container__header {
  padding: var(--space-5);
  background-color: var(--color-ink);
  color: var(--color-paper);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.lab-container__heading {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.lab-container__badge {
  display: inline-block;
  align-self: flex-start;
  background-color: var(--color-accent);
  color: var(--color-ink);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.15rem 0.5rem;
}

.lab-container__title {
  color: var(--color-paper);
  font-size: var(--text-lg);
}

.lab-container__desc {
  font-size: var(--text-sm);
  color: var(--color-muted);
  max-width: 44rem;
}

.lab-container__workspace {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  min-width: 0;
}

.lab-container__footer {
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-paper-alt);
  border-top: var(--border-thin);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.lab-container__obs {
  font-size: var(--text-sm);
  color: var(--color-ink);
}

@media (min-width: 48rem) {
  .lab-container__workspace {
    padding: var(--space-6);
  }
}
</style>
