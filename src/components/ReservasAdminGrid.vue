<script setup>
import { ref, computed } from 'vue'

import Pagination from './Pagination.vue'
import Wine from './Wine.vue'
import ReservaAdmin from './ReservaAdmin.vue'

const props = defineProps({
  reservas: {
    type: Array,
    default: () => [],
  },

  loading: {
    type: Boolean,
    default: false,
  },

  perPage: {
    type: Number,
    default: 4,
  },
})

const paginaAtual = ref(1)

const totalPaginas = computed(() =>
  Math.ceil(props.reservas.length / props.perPage)
)

const reservasPaginadas = computed(() => {
  const inicio =
    (paginaAtual.value - 1) * props.perPage

  return props.reservas.slice(
    inicio,
    inicio + props.perPage
  )
})
</script>

<template>
  <div class="flex flex-col gap-8">

    <!-- Loading -->
    <div
      v-if="loading"
      class="flex justify-center py-16"
    >
      <Wine class="h-12" />
    </div>

    <!-- Sem reservas -->
    <div
      v-else-if="reservas.length === 0"
      class="
        py-16
        text-center
        border
        border-neutral-800
        bg-[#1B1B1B]
      "
    >
      <p
        class="
          text-neutral-500
          font-inter
          text-sm
          sm:text-base
        "
      >
        Nenhuma reserva encontrada.
      </p>
    </div>

    <!-- Lista -->
    <template v-else>

      <div
        class="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-4
          sm:gap-6
        "
      >
        <ReservaAdmin
          v-for="reserva in reservasPaginadas"
          :key="reserva.id_reserva"
          :reserva="reserva"
        />
      </div>

      <Pagination
        v-if="totalPaginas > 1"
        v-model="paginaAtual"
        :total-pages="totalPaginas"
      />

    </template>

  </div>
</template>