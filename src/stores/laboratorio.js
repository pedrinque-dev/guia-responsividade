import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useLaboratorioStore = defineStore('laboratorio', () => {
  const viewport = reactive({
    width: 375,
    hasMetaViewport: true
  })

  const units = reactive({
    unit: 'rem',
    value: 1.5,
    rootFontSize: 16,
    parentFontSize: 20,
    simulatedViewport: 768
  })

  const grid = reactive({
    containerWidth: 520,
    minCardRem: 14,
    gapRem: 1,
    itemCount: 6,
    repeatMode: 'auto-fit'
  })

  const flex = reactive({
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gapRem: 0.75
  })

  const image = reactive({
    sampleId: 'landscape',
    objectFit: 'cover',
    aspectMode: '16 / 9',
    frameWidth: 340,
    frameHeight: 220
  })

  const apiGallery = reactive({
    items: [],
    loading: false,
    error: null,
    usingFallback: false,
    loadedOnce: false
  })

  const vueKeyMode = ref(false)

  function setGridPreset(width, minCardRem = 14, gapRem = 1) {
    grid.containerWidth = width
    grid.minCardRem = minCardRem
    grid.gapRem = gapRem
  }

  return {
    viewport,
    units,
    grid,
    flex,
    image,
    apiGallery,
    vueKeyMode,
    setGridPreset
  }
})
