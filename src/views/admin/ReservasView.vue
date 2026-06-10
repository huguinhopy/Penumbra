<script setup>
import { ref, onMounted } from 'vue'

import api from '../../services/api'
import ReservasAdminGrid from '../../components/ReservasAdminGrid.vue'

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
  <ReservasAdminGrid
    :reservas="reservas"
    :loading="loading"
  />
</template>