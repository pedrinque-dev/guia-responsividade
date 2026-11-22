function buildFallbackSvg(code, title, width, height) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="#1B1B19"/>
    <g stroke="#32312E" stroke-width="2">
      <line x1="0" y1="${Math.round(height * 0.33)}" x2="${width}" y2="${Math.round(height * 0.33)}"/>
      <line x1="0" y1="${Math.round(height * 0.66)}" x2="${width}" y2="${Math.round(height * 0.66)}"/>
      <line x1="${Math.round(width * 0.33)}" y1="0" x2="${Math.round(width * 0.33)}" y2="${height}"/>
      <line x1="${Math.round(width * 0.66)}" y1="0" x2="${Math.round(width * 0.66)}" y2="${height}"/>
    </g>
    <rect x="28" y="28" width="${width - 56}" height="${height - 56}" fill="none" stroke="#E87836" stroke-width="4"/>
    <rect x="48" y="48" width="170" height="36" fill="#E87836"/>
    <text x="60" y="72" font-family="monospace" font-size="18" font-weight="700" fill="#171717">${code}</text>
    <text x="48" y="${height - 54}" font-family="sans-serif" font-size="26" font-weight="700" fill="#F5F1E8">${title}</text>
  </svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export function getFallbackMedia() {
  return [
    {
      id: 'local-01',
      author: 'Acervo Local GRID',
      intrinsicWidth: 1200,
      intrinsicHeight: 800,
      aspectLabel: '3:2',
      src: buildFallbackSvg('FALLBACK 01', 'PRANCHA MODULAR 3:2', 1200, 800),
      srcset: '',
      sizes: '(min-width: 64rem) 280px, (min-width: 48rem) 45vw, 92vw',
      sourceLabel: 'Fallback local SVG'
    },
    {
      id: 'local-02',
      author: 'Acervo Local GRID',
      intrinsicWidth: 1200,
      intrinsicHeight: 800,
      aspectLabel: '3:2',
      src: buildFallbackSvg('FALLBACK 02', 'ENQUADRAMENTO FLUIDO', 1200, 800),
      srcset: '',
      sizes: '(min-width: 64rem) 280px, (min-width: 48rem) 45vw, 92vw',
      sourceLabel: 'Fallback local SVG'
    },
    {
      id: 'local-03',
      author: 'Acervo Local GRID',
      intrinsicWidth: 1200,
      intrinsicHeight: 800,
      aspectLabel: '3:2',
      src: buildFallbackSvg('FALLBACK 03', 'RESERVA SEM CLS', 1200, 800),
      srcset: '',
      sizes: '(min-width: 64rem) 280px, (min-width: 48rem) 45vw, 92vw',
      sourceLabel: 'Fallback local SVG'
    },
    {
      id: 'local-04',
      author: 'Acervo Local GRID',
      intrinsicWidth: 1200,
      intrinsicHeight: 800,
      aspectLabel: '3:2',
      src: buildFallbackSvg('FALLBACK 04', 'GRADE RESPONSIVA', 1200, 800),
      srcset: '',
      sizes: '(min-width: 64rem) 280px, (min-width: 48rem) 45vw, 92vw',
      sourceLabel: 'Fallback local SVG'
    }
  ]
}

export async function fetchResponsiveMedia({ page = 3, limit = 4, simulateError = false } = {}) {
  if (simulateError) {
    await new Promise((resolve) => window.setTimeout(resolve, 450))
    throw new Error('Falha de conexão simulada para validar o modo fallback.')
  }

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), 6000)

  try {
    const endpoint = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
    const response = await fetch(endpoint, { signal: controller.signal })

    if (!response.ok) {
      throw new Error(`Resposta HTTP ${response.status} da API Picsum Photos.`)
    }

    const payload = await response.json()
    if (!Array.isArray(payload) || payload.length === 0) {
      throw new Error('A API não retornou registros válidos.')
    }

    return payload.map((item) => {
      const id = String(item.id)
      const ratio = item.width && item.height ? (item.width / item.height).toFixed(2) : '1.50'
      return {
        id,
        author: item.author || 'Autor não informado',
        intrinsicWidth: Number(item.width) || 1200,
        intrinsicHeight: Number(item.height) || 800,
        aspectLabel: `${ratio}:1`,
        src: `https://picsum.photos/id/${id}/800/533`,
        srcset: [
          `https://picsum.photos/id/${id}/400/267 400w`,
          `https://picsum.photos/id/${id}/800/533 800w`,
          `https://picsum.photos/id/${id}/1200/800 1200w`
        ].join(', '),
        sizes: '(min-width: 64rem) 280px, (min-width: 48rem) 45vw, 92vw',
        sourceLabel: 'Picsum Photos API'
      }
    })
  } finally {
    window.clearTimeout(timeoutId)
  }
}
