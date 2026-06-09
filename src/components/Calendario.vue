<template>
  <div class="min-h-screen bg-[#111] flex items-center justify-center p-4">
    <div class="w-full max-w-3xl bg-[#111] rounded-lg p-8 shadow-2xl">
      <div class="flex items-center justify-between mb-8">
        <button
          @click="previousMonth"
          class="p-2 rounded border border-slate-700 hover:border-slate-500 transition-colors"
        >
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 class="text-4xl font-cinzel font-light tracking-widest text-[#F0C37F]">
          {{ monthName }} {{ currentDate.getFullYear() }}
        </h2>

        <button
          @click="nextMonth"
          class="p-2 rounded border border-slate-700 hover:border-slate-500 transition-colors"
        >
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="mb-8">
        <div class="grid grid-cols-7 gap-4 mb-4 pb-4 border-b border-[#877E79]">
          <div
            v-for="day in weekDays"
            :key="day"
            class="text-center text-sm font-medium text-[#877E79] tracking-wide font-cinzel"
          >
            {{ day }}
          </div>
        </div>

        <div class="grid grid-cols-7 gap-4">
          <template v-for="(day, index) in calendarDays" :key="index">
            <!-- Célula vazia para dias fora do mês -->
            <div v-if="!day.isCurrentMonth" class="h-12"></div>

            <!-- Dia do mês atual -->
            <div
              v-else
              class="h-12 flex items-center justify-center rounded relative group"
            >
              <div
                class="w-full h-full flex items-center justify-center rounded text-xl font-medium transition-all"
                :class="
                  day.status === 'occupied'
                    ? 'bg-[#880C27] text-white font-cinzel'
                    : 'text-[#F0C37F] hover:bg-slate-800 font-cinzel'
                "
              >
                {{ String(day.date).padStart(2, '0') }}
              </div>
              <div class="absolute bottom-1 w-1 h-1 bg-slate-500 rounded-full"></div>
            </div>
          </template>
        </div>
      </div>

      <div class="flex items-center justify-center gap-8 text-sm">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-[#F0C37F] rounded"></div>
          <span class="text-slate-400">Disponível</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-slate-700 rounded"></div>
          <span class="text-slate-400">Selecionado</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-[#880C27] rounded"></div>
          <span class="text-slate-400">Ocupado</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { getReservasPorMes } from '../services/reservas'

const currentDate = ref(new Date(2026, 5, 1))
const occupiedDates = ref([])
const isLoading = ref(false)

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

// 1️⃣ Funções auxiliares PRIMEIRO
const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

const getFirstDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

// 2️⃣ Computed DEPOIS das funções
const monthName = computed(() => monthNames[currentDate.value.getMonth()])

const calendarDays = computed(() => {
  const daysInMonth = getDaysInMonth(currentDate.value)
  const firstDay = getFirstDayOfMonth(currentDate.value)
  const days = []

  for (let i = 0; i < firstDay; i++) {
    days.push({ date: null, isCurrentMonth: false, status: 'empty' })
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: i,
      isCurrentMonth: true,
      status: occupiedDates.value.includes(i) ? 'occupied' : 'available',
    })
  }

  return days
})

// 3️⃣ Funções de fetch e navegação POR ÚLTIMO
async function fetchOccupiedDates() {
  isLoading.value = true
  try {
    occupiedDates.value = await getReservasPorMes(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth()
    )
  } catch (err) {
    console.error('Erro ao carregar reservas:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchOccupiedDates)
watch(currentDate, fetchOccupiedDates)

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1
  )
}

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1
  )
}
</script>
