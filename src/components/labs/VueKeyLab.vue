<script setup>
import { computed, ref } from 'vue'
import LabContainer from '@/components/LabContainer.vue'
import AnimalNoteRow from '@/components/labs/AnimalNoteRow.vue'
import { useGuiaStore } from '@/stores/guia'
import { useLaboratorioStore } from '@/stores/laboratorio'

const guia = useGuiaStore()
const lab = useLaboratorioStore()

const INITIAL_ANIMALS = [
  { id: 'an-01', name: 'Cachorro' },
  { id: 'an-02', name: 'Gato' },
  { id: 'an-03', name: 'Coruja' },
  { id: 'an-04', name: 'Lobo-guará' }
]

const animals = ref(INITIAL_ANIMALS.map((item) => ({ ...item })))
const renderEpoch = ref(0)
const lastAction = ref('Digite uma observação no 2º animal (Gato) e depois remova o 1º animal (Cachorro).')

const activeTemplateSnippet = computed(() => {
  if (lab.vueKeyMode) {
    return '<AnimalNoteRow v-for="(animal, idx) in animals" :key="animal.id" :animal="animal" :position="idx" />'
  }
  return '<AnimalNoteRow v-for="(animal, idx) in animals" :animal="animal" :position="idx" />'
})

const observationText = computed(() => {
  if (lab.vueKeyMode) {
    return `Modo COM :key="animal.id": ${lastAction.value}`
  }
  return `Modo SEM :key (in-place patch): ${lastAction.value}`
})

function setKeyMode(useStableKey) {
  lab.vueKeyMode = useStableKey
  animals.value = INITIAL_ANIMALS.map((item) => ({ ...item }))
  renderEpoch.value += 1
  lastAction.value = useStableKey
    ? 'Lista reiniciada com :key="animal.id". Digite no 2º animal (Gato) e remova o 1º para confirmar que o texto acompanha o item correto.'
    : 'Lista reiniciada SEM :key. Digite no 2º animal (Gato) e remova o 1º para ver o texto ficar preso no índice 2 (agora Coruja).'
  guia.markLabUsed('lab-05-vue')
}

function removeAnimalById(id) {
  const removed = animals.value.find((item) => item.id === id)
  animals.value = animals.value.filter((item) => item.id !== id)
  if (removed) {
    lastAction.value = lab.vueKeyMode
      ? `Removido "${removed.name}" (${removed.id}). O Vue destruiu exatamente o componente dessa chave e preservou o estado dos demais.`
      : `Removido "${removed.name}" (${removed.id}). Sem :key, o Vue reaproveitou as instâncias por posição e descartou o último nó da lista.`
  }
  guia.markLabUsed('lab-05-vue')
}

function removeFirstAnimal() {
  if (animals.value.length === 0) {
    return
  }
  removeAnimalById(animals.value[0].id)
}

function resetAnimals() {
  animals.value = INITIAL_ANIMALS.map((item) => ({ ...item }))
  renderEpoch.value += 1
  lastAction.value = 'Lista restaurada para o estado inicial.'
  guia.markLabUsed('lab-05-vue')
}

function handleTyped() {
  guia.markLabUsed('lab-05-vue')
}
</script>

<template>
  <LabContainer
    code-label="EXPERIMENTO 05 / RECONCILIAÇÃO VUE 3"
    title="Código em Revisão: v-for sem :key vs. com :key estável"
    description="Roteiro de teste: (1) digite um texto no campo do 2º animal (Gato); (2) clique em “Remover 1º animal”; (3) observe o que acontece em cada modo."
    :observation="observationText"
  >
    <div class="vuelab-toolbar">
      <div class="vuelab-mode" role="group" aria-label="Alternar modo de reconciliação v-for">
        <button
          type="button"
          class="btn btn--sm"
          :aria-pressed="String(!lab.vueKeyMode)"
          @click="setKeyMode(false)"
        >
          Sem :key (in-place patch)
        </button>
        <button
          type="button"
          class="btn btn--sm"
          :aria-pressed="String(lab.vueKeyMode)"
          @click="setKeyMode(true)"
        >
          Com :key="animal.id" (estável)
        </button>
      </div>

      <div class="vuelab-actions">
        <button
          type="button"
          class="btn btn--primary btn--sm"
          :disabled="animals.length === 0"
          @click="removeFirstAnimal"
        >
          Remover 1º animal
        </button>
        <button type="button" class="btn btn--sm" @click="resetAnimals">
          Restaurar lista
        </button>
      </div>
    </div>

    <div class="vuelab-code">
      <span class="mono-tag">TEMPLATE RENDERIZADO AGORA</span>
      <code>{{ activeTemplateSnippet }}</code>
    </div>

    <div v-if="animals.length === 0" class="vuelab-empty">
      Todos os itens foram removidos. Clique em “Restaurar lista” para repetir o teste.
    </div>

    <ul v-else-if="lab.vueKeyMode" :key="`keyed-${renderEpoch}`" class="vuelab-list">
      <AnimalNoteRow
        v-for="(animal, index) in animals"
        :key="animal.id"
        :animal="animal"
        :position="index"
        @remove="removeAnimalById"
        @typed="handleTyped"
      />
    </ul>

    <ul v-else :key="`unkeyed-${renderEpoch}`" class="vuelab-list">
      <AnimalNoteRow
        v-for="(animal, index) in animals"
        :animal="animal"
        :position="index"
        @remove="removeAnimalById"
        @typed="handleTyped"
      />
    </ul>
  </LabContainer>
</template>

<style scoped>
.vuelab-toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
}

.vuelab-mode,
.vuelab-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.vuelab-code {
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-code-bg);
  color: var(--color-code-ink);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  overflow-x: auto;
}

.vuelab-code .mono-tag {
  color: var(--color-accent);
}

.vuelab-code code {
  background: transparent;
  border: 0;
  padding: 0;
  color: var(--color-code-ink);
  white-space: nowrap;
}

.vuelab-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
}

.vuelab-empty {
  padding: var(--space-5);
  border: var(--border-thin);
  background-color: var(--color-paper);
  font-size: var(--text-sm);
  color: var(--color-ink-soft);
}

@media (min-width: 48rem) {
  .vuelab-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
