<script setup>
defineProps({
  number: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section class="guiding-question" :aria-label="`Pergunta-guia ${number}`">
    <header class="guiding-question__head">
      <span class="guiding-question__kicker">PERGUNTA-GUIA {{ number }} / RESPOSTA FUNDAMENTADA</span>
      <blockquote class="guiding-question__prompt">“{{ question }}”</blockquote>
    </header>
    <div class="guiding-question__answer">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
.guiding-question {
  border: var(--border-strong);
  border-left: 6px solid var(--color-accent);
  background-color: var(--color-paper-bright);
}

.guiding-question__head {
  padding: var(--space-5);
  background-color: var(--color-paper-alt);
  border-bottom: var(--border-thin);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.guiding-question__kicker {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-dark);
}

.guiding-question__prompt {
  margin: 0;
  font-family: var(--font-heading);
  font-size: var(--text-md);
  font-weight: 700;
  line-height: 1.35;
  color: var(--color-ink);
}

.guiding-question__answer {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  color: var(--color-ink-soft);
}

.guiding-question__answer :deep(strong) {
  color: var(--color-ink);
}
</style>
