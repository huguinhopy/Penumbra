<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },

  totalPages: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits([
  'update:modelValue',
])

const mudarPagina = (pagina) => {
  if (
    pagina < 1 ||
    pagina > props.totalPages
  ) return

  emit('update:modelValue', pagina)
}
</script>

<template>
  <div
    v-if="totalPages > 1"
    class="flex items-center justify-center gap-2"
  >
    <button
      @click="mudarPagina(modelValue - 1)"
      :disabled="modelValue === 1"
      class="
        px-3 py-2
        bg-neutral-800
        text-neutral-400
        disabled:opacity-40
        disabled:cursor-not-allowed
        hover:cursor-pointer
      "
    >
      ←
    </button>

    <button
      v-for="pagina in totalPages"
      :key="pagina"
      @click="mudarPagina(pagina)"
      class="
        min-w-10
        h-10
        text-sm
        transition-all
        hover:cursor-pointer
      "
      :class="
        pagina === modelValue
          ? 'bg-gold-500 text-black'
          : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
      "
    >
      {{ pagina }}
    </button>

    <button
      @click="mudarPagina(modelValue + 1)"
      :disabled="modelValue === totalPages"
      class="
        px-3 py-2
        bg-neutral-800
        text-neutral-400
        disabled:opacity-40
        disabled:cursor-not-allowed
        hover:cursor-pointer
      "
    >
      →
    </button>
  </div>
</template>