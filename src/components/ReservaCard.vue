<template>
  <div
    class="reserva-card flex items-center justify-between px-5 py-4 rounded-sm"
    :class="cardClasses"
  >
    <!-- Left section -->
    <div class="flex flex-col gap-1 min-w-0">
      <!-- Reservation ID -->
      <span class="text-xs font-mono tracking-widest text-gray-500 select-none">
        {{ reservationId }}
      </span>

      <!-- Date & Time -->
      <h2 class="text-white font-bold text-lg leading-tight uppercase tracking-wide">
        {{ formattedDate }}
      </h2>

      <!-- Guests -->
      <span class="text-sm font-medium" :class="guestsColor">
        {{ guests }} {{ guests === 1 ? 'pessoa' : 'pessoas' }}
      </span>
    </div>

    <!-- Right section -->
    <div class="flex flex-col items-end gap-2 shrink-0 ml-4">
      <!-- Status badge -->
      <span
        class="text-xs font-semibold tracking-widest uppercase px-2 py-0.5 border rounded-sm"
        :class="statusClasses"
      >
        {{ statusLabel }}
      </span>

      <!-- Action button -->
      <button
        class="details-btn text-sm font-semibold px-4 py-2 border border-white/30 bg-transparent text-white rounded-sm whitespace-nowrap transition-all duration-200 hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
        @click="$emit('ver-detalhes', reservationId)"
      >
        Ver detalhes
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  reservationId: {
    type: String,
    default: '0000000',
  },
  date: {
    type: String,
    default: '2025-06-14',
  },
  time: {
    type: String,
    default: '20:30',
  },
  guests: {
    type: Number,
    default: 4,
  },
  status: {
    type: String,
    default: 'confirmada',
    validator: (v) => ['confirmada', 'pendente', 'cancelada'].includes(v),
  },
})

defineEmits(['ver-detalhes'])

// Format date as "Sábado, 14 de Junho"
const formattedDate = computed(() => {
  const [year, month, day] = props.date.split('-').map(Number)
  const d = new Date(year, month - 1, day)

  const weekday = d.toLocaleDateString('pt-BR', { weekday: 'long' })
  const dayNum = d.getDate()
  const monthName = d.toLocaleDateString('pt-BR', { month: 'long' })

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

  return `${capitalize(weekday)}, ${dayNum} de ${capitalize(monthName)} - ${props.time}`
})

const statusLabel = computed(() => {
  const map = { confirmada: 'Confirmada', pendente: 'Pendente', cancelada: 'Cancelada' }
  return map[props.status] ?? props.status
})

const statusClasses = computed(() => {
  return {
    confirmada: 'text-teal-400 border-teal-400/50 bg-teal-400/5',
    pendente: 'text-yellow-400 border-yellow-400/50 bg-yellow-400/5',
    cancelada: 'text-red-400 border-red-400/50 bg-red-400/5',
  }[props.status]
})

const guestsColor = computed(() => {
  return {
    confirmada: 'text-yellow-500',
    pendente: 'text-yellow-500',
    cancelada: 'text-gray-500',
  }[props.status]
})

const cardClasses = computed(() => 'bg-[#1c1c1c] border border-white/[0.07]')
</script>

<style scoped>
.reserva-card {
  font-family: 'Inter', system-ui, sans-serif;
  min-width: 340px;
  max-width: 600px;
}
</style>