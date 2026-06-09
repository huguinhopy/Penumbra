<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 12,
  },
})
</script>

<template>
  <div class="flex items-center justify-center gap-3">
    <span
      class="dot"
      :style="{ width: `${size}px`, height: `${size}px` }"
    />
    <span
      class="dot dot-delay-1"
      :style="{ width: `${size}px`, height: `${size}px` }"
    />
    <span
      class="dot dot-delay-2"
      :style="{ width: `${size}px`, height: `${size}px` }"
    />
  </div>
</template>

<style scoped>
.dot {
  border-radius: 9999px;
  background-color: rgb(115 115 115); /* neutral-500 */

  animation: wave 1600ms ease-in-out infinite;
}

.dot-delay-1 {
  animation-delay: 200ms;
}

.dot-delay-2 {
  animation-delay: 400ms;
}

@keyframes wave {
  0%,
  100% {
    transform: translateY(0);
    background-color: rgb(115 115 115); /* neutral-500 */
  }

  25% {
    transform: translateY(-8px);
    background-color: rgb(239 68 68); /* red-500 */
  }

  50% {
    transform: translateY(0);
    background-color: rgb(115 115 115);
  }
}
</style>