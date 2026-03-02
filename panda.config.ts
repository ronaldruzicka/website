import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{astro,ts,tsx}', './pages/**/*.{astro,ts,tsx}'],

  // Files to exclude
  exclude: [],

  hooks: {
    'tokens:created': ({ configure }) => {
      configure({
        formatTokenName: (path) => '$' + path.join('.'),
      });
    },
  },

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          emerald: { value: '#00bd94' },

          white: { value: '{colors.neutral.50}' },
        },
        fonts: {
          display: { value: "'Space Grotesk', sans-serif" },
          mono: { value: "'Fira Code', monospace" },
        },
        radii: {
          full: { value: '100vw' },
        },
        animations: {
          theme: {
            duration: { value: '{durations.slower}' },
            easing: { value: 'cubic-bezier(0.9, 0, 0.1, 1)' },
          },
        },
      },
      semanticTokens: {
        colors: {
          primary: {
            value: { base: '{colors.emerald}', _dark: '{colors.emerald}' },
          },
          background: {
            value: { base: '{colors.neutral.50}', _dark: '{colors.neutral.950}' },
          },
          foreground: {
            value: { base: '{colors.white}', _dark: '{colors.zinc.800}' },
          },
          border: {
            value: { base: '{colors.neutral.200}', _dark: '{colors.zinc.700}' },
          },
          body: {
            value: { base: '{colors.neutral.900}', _dark: '{colors.neutral.100}' },
          },
          muted: {
            value: { base: '{colors.neutral.600}', _dark: '{colors.neutral.400}' },
          },

          terminal: {
            header: {
              value: {
                base: 'oklch(from {colors.neutral.100} 0.95 c h)',
                _dark: 'oklch(from {colors.neutral.950} 0.18 c h)',
              },
            },
            bg: {
              value: {
                base: '{colors.neutral.100}',
                _dark: '{colors.neutral.900}',
              },
            },
          },
        },
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'slide-in-top': {
          from: {
            opacity: 0,
            translate: '0 -8px',
          },
          to: {
            opacity: 1,
            translate: '0',
          },
        },
      },
    },
  },

  globalCss: {
    'html, body': {
      bgColor: '$background',
      color: '$body',
      fontFamily: '$display',
      margin: 0,
      minHeight: '100dvh',
      transition: 'background-color {$animations.theme.duration} {$animations.theme.easing}',

      _motionReduce: {
        transition: 'none',
      },
    },
    '::selection': {
      bgColor: '{$colors.primary}/30',
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
