/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
      },
      backgroundImage: {
        headerlogo: "url('./assets/logo.svg')",
        btnIconUser: "url('./assets/icon/user.svg')",
        bgFrame: "url('./assets/borderframe.png')",
      },
      colors: {
        primary: '#232323',
        secondary: '#7B7B7B',
        tertiary: '#E9E9E9',
        seagreen: '#46D3FF',
      },
      fontFamily: {
        sans: ['Mulish', 'sans-serif'],
      },
    },
    screens: {
      /*       xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
 */
      '2xl': '1440px',
    },
  },
  plugins: [],
};
