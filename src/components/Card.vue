<template>
  <article class="w-[280px] max-lg:w-[330px] max-md:w-[280px] overflow-hidden bg-black shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
    <img
      :src="image"
      :alt="title"
      class="h-[215px] w-full object-cover"
    />

    <div class="px-6 pb-6 pt-6">
      <h2 class="font-cinzel text-xl font-bold uppercase tracking-tight text-[#C42749]">
        {{ title }}
      </h2>

      <p class="mt-5 max-w-[240px] text-sm leading-8 text-[#AEA7A2]">
        {{ description }}
      </p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>