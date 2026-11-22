<script setup>
import { onBeforeUnmount, onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import ViewportBadge from '@/components/ViewportBadge.vue'
import { useGuiaStore } from '@/stores/guia'

const route = useRoute()
const guia = useGuiaStore()

function onResize() {
  guia.updateViewportSize()
  if (window.innerWidth >= 1024 && guia.mobileMenuOpen) {
    guia.closeMobileMenu()
  }
}

watch(
  () => route.path,
  (newPath) => {
    guia.markVisited(newPath)
    guia.closeMobileMenu()
  },
  { immediate: true }
)

onMounted(() => {
  guia.updateViewportSize()
  window.addEventListener('resize', onResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <a href="#conteudo-principal" class="skip-link">Pular para o conteúdo principal</a>

  <div class="app-shell">
    <AppHeader />
    <AppSidebar />

    <div class="app-stage">
      <main id="conteudo-principal" class="app-main" tabindex="-1">
        <RouterView v-slot="{ Component }">
          <Transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>

      <footer class="app-footer">
        <div class="app-footer__inner">
          <span class="mono-tag">GRID // GUIA DE RESPONSIVIDADE</span>
          <span class="mono-tag">VUE 3 · MOBILE-FIRST · CSS PURO</span>
        </div>
      </footer>
    </div>

    <ViewportBadge />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.app-stage {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.app-main {
  flex: 1;
  width: 100%;
  max-width: var(--content-max);
  margin: 0 auto;
  padding: var(--space-6) var(--space-4) var(--space-16);
  min-width: 0;
}

.app-footer {
  border-top: var(--border-thin);
  background-color: var(--color-paper-alt);
}

.app-footer__inner {
  width: 100%;
  max-width: var(--content-max);
  margin: 0 auto;
  padding: var(--space-4) var(--space-4) 4.75rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2);
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 140ms ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

@media (min-width: 48rem) {
  .app-main {
    padding: var(--space-10) var(--space-8) var(--space-16);
  }

  .app-footer__inner {
    padding: var(--space-5) 13rem var(--space-5) var(--space-8);
  }
}

@media (min-width: 64rem) {
  .app-stage {
    margin-left: var(--sidebar-width);
  }

  .app-main {
    padding: var(--space-12) var(--space-10) var(--space-16);
  }

  .app-footer__inner {
    padding: var(--space-5) 13rem var(--space-5) var(--space-10);
  }
}
</style>
