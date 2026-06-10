<script setup>
import { ref } from 'vue'

const count = ref(0)
import Calendario from './components/Calendario.vue';
import Footer from './components/Footer.vue';
import Progresso from './components/Progresso.vue';
import Card from './components/Card.vue';
import Log from './components/Log.vue';
import ReservaCard from './components/ReservaCard.vue';

</script>

<template>
  <Progresso :steps="4" :current-step="1" />
  <Calendario />
  <Card
  image="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80"
  title="Tagliatelle al Ragù"
  description="Massa fresca puxada à mão, ragù de carne bovina cozido por seis horas. O clássico que não precisa de explicação."/>
  <Log />
  <ReservaCard />
  <Footer />
  
</template>

<style scoped>
/* Estilos específicos do componente podem ser adicionados aqui */
</style>