import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Certifique-se de que esta linha existe
  ],
  theme: {
    extend: {
        fontCinzel: {
            'display': ['"Cinzel", serif']
        }
    },
  },
  plugins: [],
}
