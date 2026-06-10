<script setup>
import { ref, onMounted } from 'vue'

import api from '../../services/api'
import ReservasAdminGrid from '../../components/ReservasAdminGrid.vue'
import Input from '../../components/Input.vue'
import { computed } from 'vue'
import Header from '../../components/Header.vue'
import Rodape from '../../components/Rodape.vue'
import Button from '../../components/Button.vue'

const reservas = ref([])
const loading = ref(true)

const filtroStatus = ref('todas')
const pesquisa = ref('')

async function carregarReservas() {
  loading.value = true

  try {
    const params = {}

    if (filtroStatus.value !== 'todas') {
      params.status = filtroStatus.value
    }

    const termo = pesquisa.value.trim()

    if (termo) {
      if (termo.includes('@')) {
        params.email = termo
      }
      else if (/^\d+$/.test(termo.replace(/\D/g, ''))) {
        params.telefone = termo
      }
      else {
        params.nome = termo
      }
    }

    const { data } = await api.get('/reservas', {
      params,
    })

    reservas.value = data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

async function mudarFiltro(status) {
  filtroStatus.value = status
  await carregarReservas()
}

onMounted(carregarReservas)
</script>

<template>
  <Header variant="admin"></Header>
  
  <main class="pt-30 md:pt-35 items-center flex px-6 sm:px-12 flex-col min-h-screen">
    <div class="container-app">
      <div class="flex flex-col gap-4">

        <div class="grid grid-cols-3 gap-2">
          <Input
            v-model="pesquisa"
            placeholder="Nome, email ou telefone"
            @enter="carregarReservas"
            class="col-span-2"
          />

          <Button
            variant="lined-green"
            class="self-end"
            size="14"
            :py="14"
            @click="carregarReservas"
          >
            Buscar
          </Button>
        </div>

        <div class="flex flex-wrap gap-2">

          <button
            @click="mudarFiltro('todas')"
            class="px-4 py-2 border text-xs hover:cursor-pointer"
            :class="
              filtroStatus === 'todas'
                ? 'bg-gold-950 border-gold-500 text-gold-500'
                : 'border-neutral-700 text-neutral-700'
            "
          >
            Todas
          </button>

          <button
            @click="mudarFiltro('pendente')"
            class="px-4 py-2 border text-xs hover:cursor-pointer  "
            :class="
              filtroStatus === 'pendente'
                ? 'bg-gold-950 border-gold-500 text-gold-500'
                : 'border-neutral-700 text-neutral-700'
            "
          >
            Pendentes
          </button>

          <button
            @click="mudarFiltro('confirmada')"
            class="px-4 py-2 border text-xs hover:cursor-pointer"
            :class="
              filtroStatus === 'confirmada'
                ? 'bg-gold-950 border-gold-500 text-gold-500'
                : 'border-neutral-700 text-neutral-700'
            "
          >
            Confirmadas
          </button>

          <button
            @click="mudarFiltro('cancelada')"
            class="px-4 py-2 border text-xs hover:cursor-pointer"
            :class="
              filtroStatus === 'cancelada'
                ? 'bg-gold-950 border-gold-500 text-gold-500'
                : 'border-neutral-700 text-neutral-700'
            "
          >
            Canceladas
          </button>

          <button
            @click="mudarFiltro('concluida')"
            class="px-4 py-2 border text-xs hover:cursor-pointer"
            :class="
              filtroStatus === 'concluida'
                ? 'bg-gold-950 border-gold-500 text-gold-500'
                : 'border-neutral-700 text-neutral-700'
            "
          >
            Concluídas
          </button>

        </div>

      </div>

      <ReservasAdminGrid
        :reservas="reservas"
        :loading="loading"
        class="mt-12"
      />
    </div>
    
    <Rodape/>
  </main>

</template>