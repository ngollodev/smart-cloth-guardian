/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9b87f5',
        secondary: '#7E69AB',
        background: '#F5F7FA',
        destructive: '#ea384c',
        muted: '#8E9196',
        border: '#E2E8F0',
      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
};

