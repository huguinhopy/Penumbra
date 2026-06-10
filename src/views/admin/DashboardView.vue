<template>
  <Header variant="admin"></Header>
  
  <main class="pt-30 md:pt-35 justify-center flex px-6 sm:px-12">
    <div class="container-app">
      <div class="flex flex-col gap-6">
        <h1 class="text-5xl sm:text-6xl text-gold-500">Dashboard</h1>
        <div class="flex flex-col gap-4">
          <h2 class="text-neutral-100 font-cinzel font-bold text-base sm:text-xl">Visão geral do dia</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-[#1B1B1B] border border-neutral-700 p-4 sm:p-6 w-full flex flex-col gap-1">
              <h3 class="text-red-400 text-xl sm:text-3xl font-cinzel font-bold">{{ reservasPendentes }}</h3>
              <p class="font-inter text-neutral-600 text-xs sm:text-base">Reservas pendentes</p>
            </div>
            <div class="bg-[#1B1B1B] border border-neutral-700 p-4 sm:p-6 w-full flex flex-col gap-1">
              <h3 class="text-green-300 text-xl sm:text-3xl font-cinzel font-bold">{{ reservasConfirmadasHoje }}</h3>
              <p class="font-inter text-neutral-600 text-xs sm:text-base">Confirmadas hoje</p>
            </div>
            <div class="bg-[#1B1B1B] border border-neutral-700 p-4 sm:p-6 w-full flex flex-col gap-1">
              <h3 class="text-gold-500 text-xl sm:text-3xl font-cinzel font-bold">{{ pessoasEsperadasHoje }}</h3>
              <p class="font-inter text-neutral-600 text-xs sm:text-base">Pessoas esperadas</p>
            </div>
            <div class="bg-[#1B1B1B] border border-neutral-700 p-4 sm:p-6 w-full flex flex-col gap-1">
              <h3 class="text-gold-500 text-xl sm:text-3xl font-cinzel font-bold">{{ mesasLivresHoje }}</h3>
              <p class="font-inter text-neutral-600 text-xs sm:text-base">Mesas livres</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <h2 class="text-neutral-100 font-cinzel font-bold text-base sm:text-xl">Próximas reservas</h2>
          <ReservasAdminGrid :reservas="reservas"></ReservasAdminGrid>
        </div>
      </div>

    </div>
    
  </main>

  <Rodape/>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import Header from '../../components/Header.vue';
import api from '../../services/api.js';
import ReservasAdminGrid from '../../components/ReservasAdminGrid.vue';
import Rodape from '../../components/Rodape.vue';

const reservas = ref([])
async function carregarReservas() {
  const { data } = await api.get('/reservas')
  reservas.value = data
  
}

const reservasPendentes = computed(() =>
  reservas.value.filter(
    reserva => reserva.status === 'pendente'
  ).length
)

const reservasConfirmadasHoje = computed(() => {
  const hoje = new Date()

  return reservas.value.filter(reserva => {
    const dataReserva = new Date(reserva.data_hora)

    return (
      reserva.status === 'confirmada' &&
      dataReserva.getDate() === hoje.getDate() &&
      dataReserva.getMonth() === hoje.getMonth() &&
      dataReserva.getFullYear() === hoje.getFullYear()
    )
  }).length
})

const pessoasEsperadasHoje = computed(() => {
  const hoje = new Date()

  return reservas.value
    .filter(reserva => {
      const dataReserva = new Date(reserva.data_hora)

      return (
        reserva.status === 'confirmada' &&
        dataReserva.getDate() === hoje.getDate() &&
        dataReserva.getMonth() === hoje.getMonth() &&
        dataReserva.getFullYear() === hoje.getFullYear()
      )
    })
    .reduce(
      (total, reserva) => total + reserva.num_pessoas,
      0
    )
})

const mesas = ref([])

async function carregarMesas() {
  const { data } = await api.get('/mesas')
  mesas.value = data
}
const mesasLivresHoje = computed(() => {
  const hoje = new Date()

  const mesasOcupadas = reservas.value
    .filter(reserva => {
      const dataReserva = new Date(reserva.data_hora)

      return (
        reserva.status === 'confirmada' &&
        reserva.id_mesa &&
        dataReserva.getDate() === hoje.getDate() &&
        dataReserva.getMonth() === hoje.getMonth() &&
        dataReserva.getFullYear() === hoje.getFullYear()
      )
    })
    .map(reserva => reserva.mesa?.id_mesa)

  return mesas.value.filter(mesa =>
    mesa.ativa &&
    !mesasOcupadas.includes(mesa.id_mesa)
  ).length
})

onMounted(async () => {
  await carregarReservas()
  await carregarMesas()
})

</script>
