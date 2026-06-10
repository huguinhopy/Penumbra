<script setup>
import { ref, onMounted } from 'vue'

import api from '../../services/api'
import ReservasAdminGrid from '../../components/ReservasAdminGrid.vue'
import Input from '../../components/Input.vue'

const reservas = ref([])
const loading = ref(true)

async function carregarReservas() {
  try {
    const { data } = await api.get('/reservas')
    console.log(data)

    reservas.value = data
  } finally {
    loading.value = false
  }
}

onMounted(carregarReservas)
</script>

<template>
  <Header variant="admin"></Header>
  
  <main class="pt-30 md:pt-35 justify-center flex px-6 sm:px-12">
    <div class="container-app">
      <div class="flex flex-col gap-6">
        <div>
          <div>
            <h1 class="text-5xl sm:text-6xl text-gold-500">Reservas</h1>
            <h3 class="text-base sm:text-xl">Todas as reservas do sistema</h3>
          </div>
          

        </div>
        
      </div>

    </div>
    
  </main>

  <Rodape/>
  <ReservasAdminGrid
    :reservas="reservas"
    :loading="loading"
  />
</template>