/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        'xxl': '1.25rem',
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(244, 114, 182, 0.25)',
      },
    },
  },
  daisyui: {
    themes: [
      {
        noeyTop: {
          primary: '#f472b6',
          'primary-content': '#471330',
          secondary: '#f9a8d4',
          accent: '#fbcfe8',
          neutral: '#f5f3f4',
          'base-100': '#fff1f2',
          info: '#93c5fd',
          success: '#86efac',
          warning: '#fde68a',
          error: '#fca5a5',
        },
      },
      'cupcake',
    ],
  },
  plugins: [require('daisyui')],
}

