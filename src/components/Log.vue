<template>
  <div class="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-white text-sm font-semibold tracking-widest uppercase opacity-50">
          Atividade Recente
        </h2>
        <span class="text-xs text-white/30">{{ logs.length }} eventos</span>
      </div>

      <!-- Log list -->
      <div class="space-y-2">
        <TransitionGroup name="log-item">
          <div
            v-for="log in logs"
            :key="log.id"
            class="
              bg-[#1a1a1a] rounded-lg px-4 py-3
              border border-white/5
              hover:border-white/10 hover:bg-[#1e1e1e]
              transition-all duration-200 cursor-default
            "
          >
            <!-- Status dot + message -->
            <div class="flex items-start gap-3">
              <!-- Dot with glow -->
              <span
                class="mt-[5px] flex-shrink-0 w-2 h-2 rounded-full"
                :class="dotClass(log.status)"
                :style="dotGlow(log.status)"
              />
              <!-- Text -->
              <div class="flex-1 min-w-0">
                <p class="text-white text-sm leading-snug">
                  <span class="font-medium">{{ log.actor }}</span>
                  {{ ' ' }}
                  <span class="text-white/70">{{ log.action }}</span>
                  {{ ' ' }}
                  <span class="font-semibold font-mono text-white/90">{{ log.reservationId }}</span>
                  {{ ' ' }}
                  <span class="text-white/70">e vinculou</span>
                  {{ ' ' }}
                  <span class="font-medium">{{ log.target }}</span>
                </p>
                <p class="text-white/35 text-xs mt-1 font-mono">{{ log.timestamp }}</p>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Add log button (demo) -->
      <button
        @click="addLog"
        class="
          mt-4 w-full py-2 rounded-lg
          bg-white/5 hover:bg-white/10
          text-white/40 hover:text-white/70
          text-xs tracking-wider uppercase
          border border-white/5 hover:border-white/10
          transition-all duration-200
        "
      >
        + Simular novo evento
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const STATUS_COLORS = {
  green:  { dot: 'bg-emerald-400', glow: '0 0 6px #34d399' },
  yellow: { dot: 'bg-yellow-400',  glow: '0 0 6px #facc15' },
  red:    { dot: 'bg-red-400',     glow: '0 0 6px #f87171' },
  blue:   { dot: 'bg-sky-400',     glow: '0 0 6px #38bdf8' },
}

const ACTORS = ['Victor Hugo', 'Ana Lima', 'Carlos M.', 'Beatriz S.']
const TABLES = ['mesa 01', 'mesa 02', 'mesa 03', 'mesa 04', 'mesa 05']
const STATUSES = Object.keys(STATUS_COLORS)

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function formatNow() {
  const now = new Date()
  const d = String(now.getDate()).padStart(2, '0')
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const h = String(now.getHours()).padStart(2, '0')
  const min = String(now.getMinutes()).padStart(2, '0')
  return `${d}/${m} - ${h}:${min}`
}

let nextId = 4

const logs = ref([
  {
    id: 1,
    actor: 'Victor Hugo',
    action: 'confirmou reserva',
    reservationId: '0000000',
    target: 'mesa 03',
    timestamp: '05/06 - 20:10',
    status: 'green',
  },
  {
    id: 2,
    actor: 'Victor Hugo',
    action: 'confirmou reserva',
    reservationId: '0000000',
    target: 'mesa 03',
    timestamp: '05/06 - 20:10',
    status: 'red',
  },
  {
    id: 3,
    actor: 'Victor Hugo',
    action: 'confirmou reserva',
    reservationId: '0000000',
    target: 'mesa 03',
    timestamp: '05/06 - 20:10',
    status: 'yellow',
  },
])

function dotClass(status) {
  return STATUS_COLORS[status]?.dot ?? 'bg-white/40'
}

function dotGlow(status) {
  const glow = STATUS_COLORS[status]?.glow
  return glow ? { boxShadow: glow } : {}
}

function addLog() {
  logs.value.unshift({
    id: nextId++,
    actor: randomPick(ACTORS),
    action: 'confirmou reserva',
    reservationId: String(Math.floor(Math.random() * 9999999)).padStart(7, '0'),
    target: randomPick(TABLES),
    timestamp: formatNow(),
    status: randomPick(STATUSES),
  })
}
</script>

<style scoped>
.log-item-enter-active {
  transition: all 0.3s ease;
}
.log-item-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
</style>