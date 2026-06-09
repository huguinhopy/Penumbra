<template>
  <div class="flex flex-col gap-2 w-full">
    <label
      v-if="showLabel"
      :for="id"
      class="font-medium text-neutral-400"
      :style="{ fontSize: `${labelSize}px` }"
    >
      {{ label }}

      <span
        v-if="required"
        class="ml-1 text-red-400"
      >
        *
      </span>
    </label>

    <input
      :id="id"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :maxlength="maxlength"
      :style="{
        padding: `${py}px ${px}px`,
        fontSize: `${inputSize}px`,
      }"
      :class="[
        baseClasses,
        error ? errorClasses : normalClasses,
        disabled ? disabledClasses : '',
      ]"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <p
      v-if="error"
      class="text-sm text-red-400"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },

  id: {
    type: String,
    default: '',
  },

  label: {
    type: String,
    default: '',
  },

  showLabel: {
    type: Boolean,
    default: true,
  },

  placeholder: {
    type: String,
    default: '',
  },

  required: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  error: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: 'text',
  },

  maxlength: {
    type: Number,
    default: undefined,
  },

  labelSize: {
    type: Number,
    default: 20,
  },

  inputSize: {
    type: Number,
    default: 16,
  },

  px: {
    type: Number,
    default: 16,
  },

  py: {
    type: Number,
    default: 12,
  },
})

defineEmits(['update:modelValue'])

const baseClasses = `
w-full
rounded-lg
border
outline-none
transition-all
duration-200

placeholder:text-neutral-700

focus:ring-4
`
const normalClasses = `
bg-neutral-900
border-neutral-700
text-neutral-200

hover:bg-neutral-800

focus:border-red-500
focus:ring-red-400/25
`

const errorClasses = `
bg-neutral-900
border-red-500
text-white

hover:bg-neutral-800

focus:border-red-500
focus:ring-red-500/30
`

const disabledClasses = `
bg-neutral-700
border-neutral-600
text-neutral-400

cursor-not-allowed

hover:bg-neutral-700
`
</script>