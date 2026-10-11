/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        void: '#0A0A0A',      // fundo principal — off-black
        asphalt: '#121212',   // fundo secundário — cinza asfalto
        bone: '#EDEDED',      // texto principal
        smoke: '#888888',     // texto secundário / detalhes
        blood: '#E50914',     // acento — vermelho sangue (editorial/mainstream)
        acid: '#CCFF00',      // acento — verde ácido (underground/night)
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],       // editorial, peso pesado, letras condensadas
        body: ['"Space Grotesk"', 'sans-serif'], // grotesk técnico, ultra legível
        mono: ['"Space Mono"', 'monospace'],     // metadata estilo folha de contato 35mm
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 12vw, 11rem)', { lineHeight: '0.86', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 6vw, 5.25rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest2: '0.3em',
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        grain: 'grain 8s steps(10) infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-2%,-4%)' },
          '20%': { transform: 'translate(-6%,2%)' },
          '30%': { transform: 'translate(2%,-6%)' },
          '40%': { transform: 'translate(-3%,4%)' },
          '50%': { transform: 'translate(-6%,6%)' },
          '60%': { transform: 'translate(6%,0)' },
          '70%': { transform: 'translate(0,6%)' },
          '80%': { transform: 'translate(-3%,0)' },
          '90%': { transform: 'translate(4%,3%)' },
        },
      },
    },
  },
  plugins: [],
};
