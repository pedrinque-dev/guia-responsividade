<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'CSS'
  },
  fileLabel: {
    type: String,
    default: ''
  },
  lines: {
    type: Array,
    required: true
  }
})

const copied = ref(false)

const plainCode = computed(() => {
  return props.lines.map((entry) => entry.code).join('\n')
})

const annotatedNotes = computed(() => {
  return props.lines
    .map((entry, index) => ({
      lineNumber: index + 1,
      note: entry.note || ''
    }))
    .filter((item) => item.note.length > 0)
})

async function copyCode() {
  try {
    await navigator.clipboard.writeText(plainCode.value)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <figure class="code-example">
    <figcaption class="code-example__header">
      <div class="code-example__meta">
        <span class="code-example__lang">{{ language }}</span>
        <span class="code-example__title">{{ title }}</span>
        <span v-if="fileLabel" class="code-example__file">{{ fileLabel }}</span>
      </div>
      <button type="button" class="code-example__copy" @click="copyCode">
        {{ copied ? 'Copiado' : 'Copiar código' }}
      </button>
    </figcaption>

    <div class="code-example__body">
      <pre class="code-example__pre"><code><span
        v-for="(entry, index) in lines"
        :key="index"
        class="code-line"
        :class="{ 'code-line--noted': Boolean(entry.note) }"
      ><span class="code-line__num">{{ String(index + 1).padStart(2, '0') }}</span><span class="code-line__text">{{ entry.code || ' ' }}</span></span></code></pre>
    </div>

    <div v-if="annotatedNotes.length > 0" class="code-example__notes">
      <div class="code-example__notes-label mono-tag">Comentários técnicos por linha</div>
      <ol class="code-example__note-list">
        <li v-for="item in annotatedNotes" :key="item.lineNumber" class="code-example__note-item">
          <span class="code-example__note-line">L{{ String(item.lineNumber).padStart(2, '0') }}</span>
          <span class="code-example__note-text">{{ item.note }}</span>
        </li>
      </ol>
    </div>
  </figure>
</template>

<style scoped>
.code-example {
  margin: 0;
  border: var(--border-strong);
  background-color: var(--color-code-bg);
  color: var(--color-code-ink);
  min-width: 0;
}

.code-example__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-code-surface);
  border-bottom: 1px solid rgba(245, 241, 232, 0.14);
}

.code-example__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
}

.code-example__lang {
  background-color: var(--color-accent);
  color: var(--color-ink);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.1rem 0.45rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.code-example__title {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 600;
}

.code-example__file {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-code-muted);
}

.code-example__copy {
  background: transparent;
  border: 1px solid var(--color-code-muted);
  color: var(--color-code-ink);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.35rem 0.65rem;
  cursor: pointer;
}

.code-example__copy:hover {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-ink);
}

.code-example__body {
  overflow-x: auto;
  padding: var(--space-4) 0;
}

.code-example__pre {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  line-height: 1.65;
}

.code-line {
  display: flex;
  padding: 0 var(--space-4);
  border-left: 3px solid transparent;
}

.code-line--noted {
  border-left-color: var(--color-accent);
  background-color: rgba(232, 120, 54, 0.08);
}

.code-line__num {
  width: 2.25rem;
  flex-shrink: 0;
  color: var(--color-code-muted);
  user-select: none;
}

.code-line__text {
  white-space: pre;
}

.code-example__notes {
  padding: var(--space-4);
  background-color: var(--color-paper-alt);
  color: var(--color-ink);
  border-top: var(--border-strong);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.code-example__notes-label {
  color: var(--color-accent-dark);
}

.code-example__note-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.code-example__note-item {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  gap: var(--space-2);
  font-size: var(--text-sm);
  align-items: baseline;
}

.code-example__note-line {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-accent-dark);
}

.code-example__note-text {
  color: var(--color-ink-soft);
}
</style>
