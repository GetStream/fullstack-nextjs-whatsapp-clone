/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        btn: {
          background: 'hsl(var(--btn-background))',
          'background-hover': 'hsl(var(--btn-background-hover))',
        },
        whatsappGreen: '#128C7E',
        whatsappGreenDark: '#075E54',
        whatsappGreenLight: '#25D366',
        whatsappBlue: '#34B7F1',
      },
    },
  },
  plugins: [],
};
