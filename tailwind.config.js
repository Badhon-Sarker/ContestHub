/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'Banner' : "url('https://i.ibb.co/VSYXN3Y/360-F-726778725-n1bwo5p7-Z3r-Pz-Jklz-Yrxk1-PJAc-Qvu2-K7.jpg')",
        'register' : "url('https://i.ibb.co/b18xQsL/360-F-590138937-m-F4-O0-QI7-S72o4tu-Ck96-Ay-Xb-Eahu-Ji-LJL.jpg')"
      },
    },
  },
  plugins: [require("daisyui")],
}

