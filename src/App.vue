<script setup>
import { ref } from 'vue'

const count = ref(0)
import Calendario from './components/Calendario.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <Calendario />
  <Footer />
</template>

<style scoped>
/* Estilos específicos do componente podem ser adicionados aqui */
</style>