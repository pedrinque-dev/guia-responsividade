<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  animal: {
    type: Object,
    required: true
  },
  position: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['remove', 'typed'])

const localNote = ref('')
const mountedForAnimal = props.animal.name
const mountedInstanceId = props.animal.id

const isMismatched = computed(() => {
  return mountedInstanceId !== props.animal.id && localNote.value.trim().length > 0
})

function handleInput() {
  emit('typed')
}
</script>

<template>
  <li class="animal-row" :class="{ 'animal-row--mismatch': isMismatched }">
    <div class="animal-row__head">
      <div class="animal-row__title">
        <span class="animal-row__pos">#{{ position + 1 }}</span>
        <strong>{{ props.animal.name }}</strong>
        <span class="mono-tag">id: {{ props.animal.id }}</span>
      </div>
      <button
        type="button"
        class="btn btn--sm"
        @click="emit('remove', props.animal.id)"
      >
        Remover
      </button>
    </div>

    <label class="animal-row__field">
      <span class="mono-tag">Anotação local do campo</span>
      <input
        v-model="localNote"
        type="text"
        :placeholder="`Digite algo para ${props.animal.name}...`"
        @input="handleInput"
      />
    </label>

    <div class="animal-row__trace">
      <span class="mono-tag">Instância criada originalmente para: {{ mountedForAnimal }}</span>
      <span v-if="isMismatched" class="animal-row__alert">
        DESALINHAMENTO DETECTADO: texto digitado para {{ mountedForAnimal }} ficou preso em {{ props.animal.name }}!
      </span>
    </div>
  </li>
</template>

<style scoped>
.animal-row {
  padding: var(--space-4);
  border: var(--border-thin);
  background-color: var(--color-paper);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.animal-row--mismatch {
  border: 2px solid var(--color-danger);
  background-color: var(--color-danger-tint);
}

.animal-row__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
}

.animal-row__title {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}

.animal-row__pos {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-accent-dark);
}

.animal-row__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.animal-row__field input {
  width: 100%;
  min-height: 2.5rem;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-ink);
  background-color: var(--color-paper-bright);
}

.animal-row__trace {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.animal-row__alert {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-danger);
}
</style>
