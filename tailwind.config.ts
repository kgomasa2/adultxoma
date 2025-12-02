import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'xoma-blue': '#1B68D3',
        'xoma-header': '#ABC6E1',
        'xoma-bg': '#EDEDED',
        'xoma-black': '#000000',
        'xoma-purple': '#E0CCF9', // Новий фіолетовий для News
        'xoma-green': '#C9F9D7',  // Новий зелений для About
      },
      fontFamily: {
        sans: ['"Helvetica World"', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;