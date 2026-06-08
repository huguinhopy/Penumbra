<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center p-4">
    <div class="w-full max-w-xl bg-slate-900 rounded-lg p-8 shadow-2xl">
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
        <div class="grid grid-cols-7 gap-4 mb-4 pb-4 border-b border-slate-700">
          <div
            v-for="day in weekDays"
            :key="day"
            class="text-center text-sm font-medium text-slate-500 tracking-wide font-cinzel"
          >
            {{ day }}
          </div>
        </div>

        <div class="grid grid-cols-7 gap-4">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            class="h-16 flex items-center justify-center rounded relative group"
            :class="{ 'opacity-40': !day.isCurrentMonth }"
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
import { ref, computed } from 'vue'

const currentDate = ref(new Date(2026, 5, 1))

const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']

const monthNames = [
  'JANEIRO',
  'FEVEREIRO',
  'MARÇO',
  'ABRIL',
  'MAIO',
  'JUNHO',
  'JULHO',
  'AGOSTO',
  'SETEMBRO',
  'OUTUBRO',
  'NOVEMBRO',
  'DEZEMBRO',
]

const monthName = computed(() => monthNames[currentDate.value.getMonth()])

const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

const getFirstDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

const calendarDays = computed(() => {
  const daysInMonth = getDaysInMonth(currentDate.value)
  const firstDay = getFirstDayOfMonth(currentDate.value)
  const days = []

  const prevMonthDays = getDaysInMonth(
    new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1)
  )

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: prevMonthDays - i,
      isCurrentMonth: false,
      status: 'available',
    })
  }

  const occupiedDates = [10, 19, 23]

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: i,
      isCurrentMonth: true,
      status: occupiedDates.includes(i) ? 'occupied' : 'available',
    })
  }

  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      isCurrentMonth: false,
      status: 'available',
    })
  }

  return days
})

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
