import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        layout: '320px minmax(500px, 1fr) 320px',
      },
      textColor: {
        auth: '#4D47C3',
        placeholder: '#A7A3FF',
      },
      backgroundColor: {
        input: '#F0EFFF',
        button: '#4D47C3',
      },
      outlineColor: {
        button: '#4D47C3',
      },
      outlineOffset: {
        '0.2': '0.2px',
      },
    },
  },
  plugins: [],
}
export default config
