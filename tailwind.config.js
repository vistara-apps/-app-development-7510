/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210 36% 96%)',
        accent: 'hsl(159 60% 48%)',
        primary: 'hsl(204 70% 53%)',
        surface: 'hsl(255 100% 100%)',
        'text-primary': 'hsl(210 40% 22%)',
        'text-secondary': 'hsl(210 40% 40%)',
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px',
        'sm': '4px',
      },
      spacing: {
        'lg': '24px',
        'md': '16px',
        'sm': '8px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(210, 40%, 22%, 0.08)',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}