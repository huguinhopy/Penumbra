<script setup>
import { watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,

  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits([
  'update:modelValue',
])

function fechar() {
  emit('update:modelValue', false)
}

function backdropClick() {
  if (props.closeOnBackdrop) {
    fechar()
  }
}

function handleEsc(event) {
  if (event.key === 'Escape') {
    fechar()
  }
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      window.addEventListener('keydown', handleEsc)
    } else {
      window.removeEventListener('keydown', handleEsc)
    }
  },
)
</script>

<template>
  <Teleport to="body">

    <Transition
      enter-active-class="duration-200"
      leave-active-class="duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >

      <div
        v-if="modelValue"
        class="
          fixed
          inset-0
          z-50

          flex
          items-center
          justify-center

          bg-neutral-950/70
          p-4
        "
        @click="backdropClick"
      >
        <div
          class="
            w-full
            max-w-2xl

            bg-[#1B1B1B]

            p-6
            sm:p-12
          "
          @click.stop
        >
          <slot />
        </div>
      </div>

    </Transition>

  </Teleport>
</template>