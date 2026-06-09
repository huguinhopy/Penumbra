<template>
  <div class="w-full flex">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="h-1.5 flex-1 transition-colors duration-300"
      :class="index < currentStep ? 'bg-[#2D6E6A]' : 'bg-[#B5A89A]'"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  steps: {
    type: Number,
    default: 3
  },
  currentStep: {
    type: Number,
    default: 1
  }
})
</script>