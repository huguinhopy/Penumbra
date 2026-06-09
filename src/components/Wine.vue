<script setup>
const props = defineProps({
  width: {
    type: Number,
    default: 186,
  },

  height: {
    type: Number,
    default: 342,
  },
})
</script>

<template>
  <div
    class="wine-loading"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
    }"
  >
    <!-- Líquido -->
    <div class="wine-mask">
      <img
        src="/vinho-2.svg"
        alt=""
        class="wine-liquid"
      />
    </div>

    <!-- Taça -->
    <img
      src="/vinho-1.svg"
      alt=""
      class="wine-glass"
    />
  </div>
</template>

<style scoped>
.wine-loading {
  position: relative;
}

/* área onde o vinho aparece */
.wine-mask {
  position: absolute;

  left: 24px;
  right: 24px;

  top: 0;
  bottom: 0;

  overflow: hidden;

  z-index: 1;
}

/* líquido */
.wine-liquid {
  position: absolute;

  width: 220%;

  left: -60%;

  bottom: -120px;

  animation:
    wineFill 3.5s ease-in-out infinite alternate,
    wineWave 2s ease-in-out infinite;

  transform-origin: center bottom;
}

/* taça */
.wine-glass {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  z-index: 2;

  pointer-events: none;
}

/* sobe e desce */
@keyframes wineFill {
  0% {
    transform: translateY(110px);
  }

  100% {
    transform: translateY(-10px);
  }
}

/* ondas */
@keyframes wineWave {
  0% {
    margin-left: -12px;
  }

  25% {
    margin-left: 10px;
  }

  50% {
    margin-left: -6px;
  }

  75% {
    margin-left: 8px;
  }

  100% {
    margin-left: -12px;
  }
}
</style>