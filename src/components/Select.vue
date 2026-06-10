<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },

  label: {
    type: String,
    default: '',
  },

  options: {
    type: Array,
    default: () => [],
  },

  placeholder: {
    type: String,
    default: 'Selecione...',
  },

  required: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col gap-2 w-full">

    <label
      v-if="label"
      class="text-neutral-400 text-base sm:text-xl"
    >
      {{ label }}

      <span
        v-if="required"
        class="text-red-400"
      >
        *
      </span>
    </label>

    <select
      :value="modelValue"
      :disabled="disabled"
      class="
        w-full
        px-4
        py-3

        bg-neutral-800
        border
        border-neutral-700
        text-sm sm:text-base

        text-neutral-200

        outline-none
        transition-all

        hover:bg-neutral-800

        focus:border-red-500
        focus:ring-4
        focus:ring-red-500/20
      "
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option
        value=""
        disabled
      >
        {{ placeholder }}
      </option>

      <option
        class="text-neutral-200"
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>

    </select>

  </div>
</template>