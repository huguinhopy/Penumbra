<script setup>
import BaseModal from './BaseModal.vue'
import Button from './Button.vue'

defineProps({
  modelValue: Boolean,

  title: {
    type: String,
    default: '',
  },

  subtitle: {
    type: String,
    default: '',
  },

  description: {
    type: String,
    default: '',
  },
  descriptionSm: {
    type: String,
    default: '',
  },

  icon: {
    type: String,
    default: '',
  },

  actions: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits([
  'update:modelValue',
])

function fechar() {
  emit('update:modelValue', false)
}
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >

    <div class="flex flex-col gap-6">

        
        <!-- Header -->
        
        <div
        v-if="title || subtitle"
        class="flex flex-col"
        >
            <h4
            v-if="subtitle"
            class="text-green-300 font-cinzel text-xl sm:text-2xl"
            >
            {{ subtitle }}
            </h4>
            <h1
            v-if="title"
            class="
            text-5xl
            sm:text-6xl
            text-gold-500 font-moga
            "
            >
            {{ title }}
            </h1>

</div>
<!-- Ícone -->

<div
v-if="icon"
class="flex justify-center"
>
<div
    class="
    w-20
    h-20

    flex
    items-center
    justify-center
    "
>
    <span v-if="icon === 'confirm'">
    <img src="/icons/sucess.svg" alt="">
</span>

<span v-else-if="icon === 'cancel'">
        <img src="/icons/error.svg" alt="">
    </span>
</div>
</div>

      <!-- Texto -->

      <h6
        v-if="description"
        class="
          text-center
          text-neutral-300
          text-xl
          sm:text-2xl
          font-cinzel
        "
      >
        {{ description }}
    </h6>
      <p
        v-if="descriptionSm"
        class="
          text-neutral-500
          text-xs
          sm:text-sm
          font-inter
        "
      >
        {{ descriptionSm }}
    </p>

      <!-- Conteúdo -->

      <slot />

      <!-- Footer -->

      <div
        v-if="actions.length"
        class="
          flex
          flex-col
          sm:flex-row

          gap-3
        "
      >
        <Button
          v-for="(action, index) in actions"
          :key="index"
          :variant="action.variant"
          class="w-full"
          @click="action.action"
        >
          {{ action.label }}
        </Button>
      </div>

    </div>

  </BaseModal>
</template>