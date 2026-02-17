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

          // terminal: {
          //   bg: { value: '#1e1e1e' },
          //   header: { value: '#333333' },
          //   green: { value: '#c3e88d' },
          //   orange: { value: '#f78c6c' },
          //   red: { value: '#ff5f56' },
          //   yellow: { value: '#ffbd2e' },
          //   go: { value: '#27c93f' },
          // },
        },
        fonts: {
          display: { value: "'Space Grotesk', sans-serif" },
          mono: { value: "'Fira Code', monospace" },
        },
        radii: {
          full: { value: '100vw' },
        },
      },
      semanticTokens: {
        colors: {
          primary: {
            value: { base: '{colors.emerald}', _dark: '{colors.emerald}' },
          },
          background: {
            value: { base: '{colors.neutral.100}', _dark: '{colors.neutral.950}' },
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
        },
      },
      recipes: {
        terminalCursor: {
          className: 'terminal-cursor',
          base: {
            display: 'inline-block',
            width: '8px',
            height: '1.2em',
            bg: 'primary',
            ml: '1',
            verticalAlign: 'middle',
          },
        },
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
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
      transition: 'background-color {$durations.slower} cubic-bezier(0.9, 0, 0.1, 1)',
    },
    '::selection': {
      bgColor: '{$colors.primary}/30',
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
