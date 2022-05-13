const colors = require('tailwindcss/colors');
const plugin3D = require('tailwindcss/plugin');

const Myclass = plugin3D(({ addUtilities })=>{
  addUtilities({
    '.rotate-y-180': { 
      transform: 'rotateY(180deg)',
    },
    '.negative-rotate-y-180': { 
      transform: 'rotateY(-180deg)',
    },
    '.preserve-3d': { 
      transformStyle: 'preserve-3d',
    },
    '.perspective': { 
      perspective: '1000',
    },
    '.backface-hidden': { 
      backfaceVisibility: 'hidden',
    },
  })
});

module.exports = {
  content: ['./src/**/*{html,js,jsx}'],
  theme: {
    colors: {
      ...colors
    },
    fontFamily: {
      ebGaramond: "'EB Garamond', serif",
      macondo: "'Macondo', cursive",
      robotoFlex: "'Roboto Flex', sans-serif",
      shadowsIntoLigth: "'Shadows Into Light', cursive",
      indiFlower: "'Indie Flower', cursive",
      padauk: "'Padauk', sans-serif",
    },
    extend: {

    },
    rotate: {
      '.rotate-y-180': { 
        transform: 'rotateY(180deg)'
      }
    }
  },
  plugins: [
    Myclass
  ],
};