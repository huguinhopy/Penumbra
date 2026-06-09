<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  start: {
    type: String,
    default: '19:00',
  },

  end: {
    type: String,
    default: '22:30',
  },

  interval: {
    type: Number,
    default: 30,
  },

  disabledTimes: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits([
  'update:modelValue',
  'change',
])

function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60

  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

const horarios = computed(() => {
  const result = []

  const startMinutes = timeToMinutes(props.start)
  const endMinutes = timeToMinutes(props.end)

  for (
    let current = startMinutes;
    current <= endMinutes;
    current += props.interval
  ) {
    result.push(minutesToTime(current))
  }

  return result
})

function selecionarHorario(horario) {
  if (props.disabledTimes.includes(horario)) return

  const novoValor =
    props.modelValue === horario
      ? ''
      : horario

  emit('update:modelValue', novoValor)
  emit('change', novoValor)
}
</script>

<template>
  <div
    class="
      grid
      grid-cols-2
      md:grid-cols-4

      gap-3
      md:gap-6
      xl:gap-8
    "
  >
    <button
      v-for="horario in horarios"
      :key="horario"
      type="button"
      :disabled="disabledTimes.includes(horario)"
      @click="selecionarHorario(horario)"
      :class="[
        'horario-btn',

        modelValue === horario
          ? 'horario-btn-selected'
          : 'horario-btn-default',

        disabledTimes.includes(horario)
          ? 'horario-btn-disabled'
          : ''
      ]"
    >
      <span class="horario-text">
        {{ horario }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.horario-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid;
  transition: all 0.25s ease;
}

/* Desktop */
.horario-btn {
  height: 120px;
}

/* Tablet */
@media (max-width: 1279px) {
  .horario-btn {
    height: 96px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .horario-btn {
    height: 56px;
  }
}

.horario-text {
  font-size: 32px;
}

/* Tablet */
@media (max-width: 1279px) {
  .horario-text {
    font-size: 24px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .horario-text {
    font-size: 16px;
  }
}

/* Estado normal */
.horario-btn-default {
  background: rgb(38 38 38);
  border-color: rgb(82 82 82);
  color: rgb(245 245 245);
}

.horario-btn-default:hover {
  background: #082224;
  border-color: #2d8b85;
}

/* Selecionado */
.horario-btn-selected {
  background: var(--color-gold-500, #D8A24A);
  border-color: var(--color-gold-500, #D8A24A);
  color: black;

  box-shadow:
    0 0 20px rgba(216, 162, 74, 0.35);
}

/* Desabilitado */
.horario-btn-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>