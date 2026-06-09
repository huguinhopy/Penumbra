<template>
  <RouterLink
    :to="to"
    class="font-inter font-extralight uppercase text-neutral-100 hover:text-gold-500 transition-colors"
    :class="sizeClass"
    active-class="text-gold-500"
  >
    <slot />
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'sm', // 'xs' | 'sm' | 'base' | 'lg'
  },
})

const sizeClass = computed(() => ({
  'text-xs': props.size === 'xs',
  'text-sm': props.size === 'sm',
  'text-base': props.size === 'base',
  'text-lg': props.size === 'lg',
}))
</script>