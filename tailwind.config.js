module.exports = {
  mode: "jit",
  darkMode: 'class', // ou 'media' pour détecter le mode sombre du système
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2",
        secondary: "#14171A",
        accent: "#657786"
      },
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};
