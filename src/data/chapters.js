export const CHAPTERS = [
  {
    id: 'home',
    number: '00',
    path: '/',
    shortTitle: 'Capa do Manual',
    title: 'Guia de Responsividade',
    kicker: 'CAPA / MANUAL DE CAMPO',
    summary: 'Apresentação, arquitetura do projeto, índice interativo e ficha técnica da dupla.',
    labLabel: null,
    trackProgress: false
  },
  {
    id: 'responsividade',
    number: '01',
    path: '/responsividade',
    shortTitle: 'Por que responsividade importa',
    title: 'Por que responsividade importa',
    kicker: 'CAPÍTULO 01 / RESPONSIVIDADE',
    summary: 'Layouts fixos vs. fluidos, abordagem mobile-first, media queries e o papel real da meta tag viewport.',
    labLabel: 'LAB 01 · Simulador de Viewport',
    trackProgress: true
  },
  {
    id: 'unidades',
    number: '02',
    path: '/unidades',
    shortTitle: 'Unidades CSS',
    title: 'Unidades CSS',
    kicker: 'CAPÍTULO 02 / UNIDADES CSS',
    summary: 'Unidades absolutas e relativas (px, rem, em, %, fr, vw, vh, dvh, ch) e impacto direto na acessibilidade.',
    labLabel: 'LAB 02 · Detetive das Unidades',
    trackProgress: true
  },
  {
    id: 'layouts',
    number: '03',
    path: '/layouts',
    shortTitle: 'Flexbox e Grid',
    title: 'Flexbox e Grid',
    kicker: 'CAPÍTULO 03 / FLEXBOX E GRID',
    summary: 'Eixos 1D e grades 2D, alinhamento, flex-wrap, gap e o cálculo de colunas com repeat(auto-fit, minmax()).',
    labLabel: 'LAB 03 · Construtor de Grid',
    trackProgress: true
  },
  {
    id: 'imagens',
    number: '04',
    path: '/imagens',
    shortTitle: 'Imagens responsivas',
    title: 'Imagens responsivas',
    kicker: 'CAPÍTULO 04 / IMAGENS RESPONSIVAS',
    summary: 'Dimensões intrínsecas, aspect-ratio, object-fit, srcset, lazy loading, CLS e integração com API pública.',
    labLabel: 'LAB 04 · Imagem sob Investigação',
    trackProgress: true
  },
  {
    id: 'vue',
    number: '05',
    path: '/vue',
    shortTitle: 'Boas práticas em Vue',
    title: 'Boas práticas em projetos Vue',
    kicker: 'CAPÍTULO 05 / BOAS PRÁTICAS VUE',
    summary: 'Organização de pastas, props, eventos, :key no v-for, design tokens, Core Web Vitals e lazy routes.',
    labLabel: 'LAB 05 · Código em Revisão',
    trackProgress: true
  },
  {
    id: 'desafio',
    number: '06',
    path: '/desafio',
    shortTitle: 'Desafio final',
    title: 'Desafio final',
    kicker: 'ETAPA 06 / DESAFIO FINAL',
    summary: 'Missão prática elaborada pela dupla cuja resolução depende de experimentar os laboratórios deste guia.',
    labLabel: 'PROVA PRÁTICA INTERATIVA',
    trackProgress: true
  }
]

export function getAdjacentChapters(currentPath) {
  const index = CHAPTERS.findIndex((item) => item.path === currentPath)
  if (index === -1) {
    return { prev: null, next: null }
  }
  return {
    prev: index > 0 ? CHAPTERS[index - 1] : null,
    next: index < CHAPTERS.length - 1 ? CHAPTERS[index + 1] : null
  }
}
