import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { CHAPTERS } from '@/data/chapters'

const STORAGE_PROGRESS_KEY = 'grid_manual_progress_v1'
const STORAGE_AUTHORS_KEY = 'grid_manual_authors_v2'

const DEFAULT_AUTHORS = {
  memberOne: 'Pedro Augusto Lombardi da Costa',
  memberTwo: 'Luana Gabrielle Ferreira Guedes Paes',
  course: 'Análise e Desenvolvimento de Sistemas · Frameworks Front-end',
  edition: '2º semestre · 2026'
}

function loadJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) {
      return fallback
    }
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export const useGuiaStore = defineStore('guia', () => {
  const savedProgress = loadJson(STORAGE_PROGRESS_KEY, { visited: [], labs: [] })
  const savedAuthors = loadJson(STORAGE_AUTHORS_KEY, DEFAULT_AUTHORS)

  const visitedPaths = ref(Array.isArray(savedProgress.visited) ? savedProgress.visited : [])
  const experimentedLabs = ref(Array.isArray(savedProgress.labs) ? savedProgress.labs : [])
  const authors = ref({ ...DEFAULT_AUTHORS, ...savedAuthors })
  const mobileMenuOpen = ref(false)
  const viewportWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 375)
  const viewportHeight = ref(typeof window !== 'undefined' ? window.innerHeight : 667)

  const trackableChapters = computed(() => CHAPTERS.filter((chapter) => chapter.trackProgress))

  const visitedCount = computed(() => {
    return trackableChapters.value.filter((chapter) => visitedPaths.value.includes(chapter.path)).length
  })

  const progressPercent = computed(() => {
    if (trackableChapters.value.length === 0) {
      return 0
    }
    return Math.round((visitedCount.value / trackableChapters.value.length) * 100)
  })

  const activeBreakpoint = computed(() => {
    const w = viewportWidth.value
    if (w < 480) {
      return { code: 'BASE', range: '< 30rem', device: 'Celular compacto' }
    }
    if (w < 768) {
      return { code: 'SM', range: '30rem – 47.9rem', device: 'Celular amplo' }
    }
    if (w < 1024) {
      return { code: 'MD', range: '48rem – 63.9rem', device: 'Tablet' }
    }
    if (w < 1280) {
      return { code: 'LG', range: '64rem – 79.9rem', device: 'Notebook' }
    }
    return { code: 'XL', range: '≥ 80rem', device: 'Desktop amplo' }
  })

  function persistProgress() {
    try {
      window.localStorage.setItem(
        STORAGE_PROGRESS_KEY,
        JSON.stringify({
          visited: visitedPaths.value,
          labs: experimentedLabs.value
        })
      )
    } catch {
      return
    }
  }

  function markVisited(path) {
    const isTrackable = trackableChapters.value.some((chapter) => chapter.path === path)
    if (!isTrackable || visitedPaths.value.includes(path)) {
      return
    }
    visitedPaths.value.push(path)
    persistProgress()
  }

  function markLabUsed(labId) {
    if (experimentedLabs.value.includes(labId)) {
      return
    }
    experimentedLabs.value.push(labId)
    persistProgress()
  }

  function updateAuthors(nextAuthors) {
    authors.value = {
      memberOne: (nextAuthors.memberOne || '').trim() || DEFAULT_AUTHORS.memberOne,
      memberTwo: (nextAuthors.memberTwo || '').trim() || DEFAULT_AUTHORS.memberTwo,
      course: (nextAuthors.course || '').trim() || DEFAULT_AUTHORS.course,
      edition: (nextAuthors.edition || '').trim() || DEFAULT_AUTHORS.edition
    }
    try {
      window.localStorage.setItem(STORAGE_AUTHORS_KEY, JSON.stringify(authors.value))
    } catch {
      return
    }
  }

  function resetProgress() {
    visitedPaths.value = []
    experimentedLabs.value = []
    persistProgress()
  }

  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  function closeMobileMenu() {
    mobileMenuOpen.value = false
  }

  function updateViewportSize() {
    if (typeof window === 'undefined') {
      return
    }
    viewportWidth.value = window.innerWidth
    viewportHeight.value = window.innerHeight
  }

  return {
    visitedPaths,
    experimentedLabs,
    authors,
    mobileMenuOpen,
    viewportWidth,
    viewportHeight,
    trackableChapters,
    visitedCount,
    progressPercent,
    activeBreakpoint,
    markVisited,
    markLabUsed,
    updateAuthors,
    resetProgress,
    toggleMobileMenu,
    closeMobileMenu,
    updateViewportSize
  }
})
