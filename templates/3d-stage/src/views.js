export const VIEWS = {
  dossier: {
    id: 'dossier',
    fonts: {
      display: '"Bebas Neue", sans-serif',
      body: 'Outfit, system-ui, sans-serif',
      meta: '"IBM Plex Mono", monospace',
      href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap',
    },
    yawStart: -8,
    yawTravel: 20,
    camera: {
      desktop: {
        start: [2.05, 1.85, 3.25],
        mid: [0.35, 2.55, 3.45],
        end: [-2.15, 2.95, 2.55],
        lookStart: [0, 0.05, 0.02],
        lookEnd: [0, 0.12, 0],
      },
      mobile: {
        start: [1.35, 2.35, 3.55],
        mid: [0.2, 2.9, 3.7],
        end: [-1.55, 3.2, 3.05],
        lookStart: [0, 0.05, 0.02],
        lookEnd: [0, 0.12, 0],
      },
    },
  },
  plinth: {
    id: 'plinth',
    fonts: {
      display: 'Syne, sans-serif',
      body: 'Manrope, system-ui, sans-serif',
      meta: '"IBM Plex Mono", monospace',
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@300;400;500&family=Syne:wght@700;800&display=swap',
    },
    yawStart: 10,
    yawTravel: 12,
    camera: {
      desktop: {
        start: [0.45, 3.2, 3.95],
        mid: [0.1, 3.45, 3.7],
        end: [-0.75, 3.55, 3.35],
        lookStart: [0.05, -0.32, 0],
        lookEnd: [0.2, -0.18, 0],
      },
      mobile: {
        start: [0.25, 3.05, 4.15],
        mid: [0.05, 3.25, 3.95],
        end: [-0.4, 3.4, 3.7],
        lookStart: [0, -0.22, 0],
        lookEnd: [0.08, -0.12, 0],
      },
    },
  },
  vitrine: {
    id: 'vitrine',
    fonts: {
      display: '"Barlow Condensed", sans-serif',
      body: 'Karla, system-ui, sans-serif',
      meta: '"IBM Plex Mono", monospace',
      href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Karla:wght@300;400;500&display=swap',
    },
    yawStart: -14,
    yawTravel: 16,
    camera: {
      desktop: {
        start: [2.95, 1.65, 3.2],
        mid: [2.55, 2.15, 3.35],
        end: [2.15, 2.65, 2.8],
        lookStart: [-0.62, 0.06, 0],
        lookEnd: [-0.48, 0.12, 0],
      },
      mobile: {
        start: [1.55, 2.25, 3.7],
        mid: [0.85, 2.7, 3.8],
        end: [0.15, 3.0, 3.35],
        lookStart: [-0.15, 0.05, 0],
        lookEnd: [-0.08, 0.1, 0],
      },
    },
  },
  atelier: {
    id: 'atelier',
    fonts: {
      display: '"Big Shoulders Display", sans-serif',
      body: '"Work Sans", system-ui, sans-serif',
      meta: '"IBM Plex Mono", monospace',
      href: 'https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Work+Sans:wght@300;400;500&display=swap',
    },
    yawStart: -26,
    yawTravel: 28,
    camera: {
      desktop: {
        start: [2.5, 2.8, 2.88],
        mid: [1.15, 3.05, 2.98],
        end: [-1.75, 3.18, 2.48],
        lookStart: [0, 0.02, 0],
        lookEnd: [0, 0.1, 0],
      },
      mobile: {
        start: [1.7, 2.7, 3.45],
        mid: [0.55, 2.95, 3.55],
        end: [-1.1, 3.1, 3.15],
        lookStart: [0, 0.02, 0],
        lookEnd: [0, 0.08, 0],
      },
    },
  },
  folio: {
    id: 'folio',
    fonts: {
      display: 'Fraunces, serif',
      body: '"Source Serif 4", Georgia, serif',
      meta: '"IBM Plex Mono", monospace',
      href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Source+Serif+4:opsz,wght@8..60,300;400;600&display=swap',
    },
    yawStart: -4,
    yawTravel: 12,
    camera: {
      desktop: {
        start: [2.25, 1.48, 3.55],
        mid: [1.85, 1.85, 3.4],
        end: [1.45, 2.15, 3.15],
        lookStart: [0.22, -0.04, 0],
        lookEnd: [0.18, -0.08, 0],
      },
      mobile: {
        start: [1.2, 2.05, 3.75],
        mid: [0.55, 2.45, 3.65],
        end: [0.1, 2.75, 3.35],
        lookStart: [0.08, 0.02, 0],
        lookEnd: [0.04, -0.02, 0],
      },
    },
  },
}

export function getView(id) {
  return VIEWS[id] ?? VIEWS.dossier
}
