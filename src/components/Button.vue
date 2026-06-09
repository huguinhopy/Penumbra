<template>
  <component
    :is="componentType"
    :to="to"
    :href="href"
    :disabled="disabled"
    :class="buttonClasses"
    @click="handleClick"
    :style="{
        fontSize: `${size}px`,
        padding: `${py}px ${px}px`
    }"
  >
    <span class="relative z-10">
      <slot />
    </span>

    <span
      v-if="hasFillAnimation"
      class="absolute inset-0 overflow-hidden rounded-inherit group-hover:cursor-pointer"
    >
      <span
        class="absolute left-1/2 top-1/2 h-0 w-0 rounded-full transition-all duration-500 ease-out -translate-x-1/2 -translate-y-1/2 group-hover:w-[250%] group-hover:h-[500%] "
        :class="fillColorClass"
      />
    </span>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const emit = defineEmits(['click'])

const props = defineProps({
  variant: {
    type: String,
    default: 'full-green',
  },

  size: {
    type: Number,
    default: 16,
  },

  px: {
    type: Number,
    default: 24,
  },

  py: {
    type: Number,
    default: 12,
  },

  to: String,
  href: String,

  disabled: {
    type: Boolean,
    default: false,
  },
})

const componentType = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const hasFillAnimation = computed(() =>
  [
    'full-green',
    'full-red',
    'lined-green',
    'lined-red',
  ].includes(props.variant)
)

const fillColorClass = computed(() => ({
  'bg-[#35BA7D]': ['full-green', 'lined-green'].includes(props.variant),
  'bg-red-500': ['full-red', 'lined-red'].includes(props.variant),
}))

const buttonClasses = computed(() => {
  const classes = [
    'group',
    'relative',
    'overflow-hidden',
    'inline-flex',
    'items-center',
    'justify-center',
    'uppercase',
    'font-bold',
    'font-inter',
    'transition-all',
    'duration-300',
    'border',
    'hover:cursor-pointer'
  ]

  switch (props.variant) {
    case 'full-green':
      classes.push(
        'bg-neutral-100',
        'border-none',
        'text-neutral-900',
        'hover:text-neutral-900'
      )
      break

    case 'full-red':
      classes.push(
        'bg-neutral-100',
        'border-none',
        'text-neutral-900',
        'hover:text-neutral-100'
      )
      break

    case 'full-neutral':
      classes.push(
        'bg-neutral-900',
        'border-neutral-900',
        'text-neutral-100',
        'hover:bg-neutral-800'
      )
      break

    case 'full-disabled':
      classes.push(
        'bg-neutral-500',
        'border-neutral-500',
        'text-neutral-300',
        'cursor-not-allowed'
      )
      break

    case 'lined-green':
      classes.push(
        'bg-transparent',
        'border--[#35BA7D]',
        'text--[#35BA7D]',
        'hover:text-neutral-900'
      )
      break

    case 'lined-red':
      classes.push(
        'bg-transparent',
        'border-red-500',
        'text-red-500',
        'hover:text-neutral-100'
      )
      break

    case 'lined-disabled':
      classes.push(
        'bg-transparent',
        'border-neutral-500',
        'text-neutral-500',
        'cursor-not-allowed'
      )
      break
  }

  return classes
})

function handleClick(event) {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  emit('click', event)
}
</script>