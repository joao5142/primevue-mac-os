import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const MyPreset = definePreset(Aura, {
  components: {
    password: {
      colorScheme: {
        light: {
          content: {
            class: 'bg-slate-500	',
          },
          root: {
            class: 'bg-slate-500	',
          },
        },
        dark: {
          background: '{zinc.900}',
        },
      },
    },
  },
  semantic: {
    colorScheme: {
      light: {
        primary: {
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.900}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}',
        },
      },
      dark: {
        primary: {},
      },
    },
  },
})

export default {
  preset: MyPreset,
  options: {
    darkModeSelector: '.app-dark',
    cssLayer: {
      name: 'primevue',
      order: 'reset, tailwind-base , framework, primevue, tailwind-utilities, custom, overrides',
    },
  },
}
