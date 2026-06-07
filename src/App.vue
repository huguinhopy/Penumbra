<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-gray-700/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-600">
      <h1 class="text-4xl font-bold text-white mb-6 text-center">
        Penumbra
      </h1>
      <p class="text-gray-300 text-center mb-8">
        Sistema de Reservas - Vue 3 + Vite + Tailwind CSS
      </p>
      
      <div class="flex flex-col items-center gap-4">
        <div class="text-5xl font-bold text-blue-400 mb-4">
          {{ count }}
        </div>
        
        <div class="flex gap-4">
          <button
            @click="count--"
            class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            -
          </button>
          
          <button
            @click="count++"
            class="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            +
          </button>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-gray-600">
        <p class="text-gray-400 text-sm text-center">
          Frontend feito com Vue 3, Vite e Tailwind CSS
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos do componente podem ser adicionados aqui */
</style>