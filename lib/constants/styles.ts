/**
 * Style Constants
 * Centralized color, spacing, and design tokens
 */

export const COLORS = {
  primary: {
    gold: '#D4AF37',
    goldLight: '#E5C158',
    goldDark: '#B8952E',
  },
  secondary: {
    burgundy: '#8B1538',
    burgundyLight: '#A0153E',
    burgundyDark: '#6B0F2A',
  },
  neutral: {
    cream: '#FAF7F2',
    creamSecondary: '#F5F1E8',
    charcoal: '#1C1917',
    charcoalLight: '#292524',
  },
  accent: {
    sage: '#7C8A7A',
  },
} as const

export const SPACING = {
  section: 'py-16 md:py-24',
  sectionLarge: 'py-20 md:py-32 lg:py-40',
  container: 'px-6 md:px-12 lg:px-20 max-w-7xl mx-auto',
  card: 'p-6 md:p-8',
  element: {
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-6',
    xlarge: 'gap-8',
  },
  margin: {
    small: 'mb-4',
    medium: 'mb-6',
    large: 'mb-8',
    xlarge: 'mb-12',
  },
} as const

export const TYPOGRAPHY = {
  display: {
    fontFamily: 'var(--font-display)',
    sizes: {
      hero: 'text-5xl md:text-6xl lg:text-7xl',
      h1: 'text-4xl md:text-5xl lg:text-6xl',
      h2: 'text-3xl md:text-4xl lg:text-5xl',
      h3: 'text-2xl md:text-3xl lg:text-4xl',
    },
  },
  heading: {
    fontFamily: 'var(--font-heading)',
    sizes: {
      h1: 'text-2xl md:text-3xl',
      h2: 'text-xl md:text-2xl',
      h3: 'text-lg md:text-xl',
    },
  },
  body: {
    fontFamily: 'var(--font-body)',
    sizes: {
      base: 'text-base md:text-lg',
      small: 'text-sm md:text-base',
      large: 'text-lg md:text-xl',
    },
  },
} as const

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
  largeDesktop: 1536,
} as const

