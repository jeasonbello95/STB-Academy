/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // NVIDIA-inspired high-tech palette
        neon: {
          green: '#54B435',
          'green-bright': '#6FCC4B',
          cyan: '#00E5FF',
          'cyan-dim': '#00B8D4',
        },
        ink: {
          black: '#000000',
          'gray-950': '#0A0A0B',
          'gray-900': '#111113',
          'gray-850': '#161618',
          'gray-800': '#1C1C1F',
          'gray-700': '#26262A',
          'gray-600': '#333338',
          'gray-500': '#6B6B72',
          'gray-400': '#9A9AA2',
          'gray-300': '#C5C5CC',
          'gray-200': '#E5E5E8',
        },
        // STB Academy brand palette — green anchor
        primary: {
          50: '#F0FAEA',
          100: '#DCF2D1',
          200: '#B8E5A4',
          300: '#8FD472',
          400: '#6FCC4B',
          500: '#54B435',
          600: '#43962C',
          700: '#357224',
          800: '#2B5A1E',
          900: '#224717',
        },
        // Dark blacks tinted green
        deep: {
          950: '#05090F',
          900: '#07130D',
          850: '#0A1A14',
          800: '#0D2219',
          700: '#0E2A24',
        },
        // Dark navy blues
        navy: {
          950: '#070B18',
          900: '#0A1220',
          850: '#0E1A2C',
          800: '#12223A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(84, 180, 53, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(84, 180, 53, 0.6)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(84,180,53,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(84,180,53,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
};
