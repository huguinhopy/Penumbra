<template>
  <Header variant="default"/>
  <br>
  <Button :py="12" variant="full-disabled">Reservar minha mesa</Button>
  <Input v-model="nome" label="Nome" placeholder="digite seu nome" class="max-w-100"></Input>

  <br>
  <TimeSelector
  v-model="horarioSelecionado"
  :disabled-times="[
    '19:30',
    '20:00',
    '21:30'
  ]"
/>
<br>
<Loading size="8"/>
<br>
<Wine :width="120" :height="220"/>
</template>

<script setup>
import Button from '../components/Button.vue';
import Header from '../components/Header.vue';
import TimeSelector from '../components/TimeSelector.vue';
import Input from '../components/Input.vue';
import { ref } from 'vue';
import Loading from '../components/Loading.vue';
import Wine from '../components/Wine.vue';

const horarioSelecionado = ref('')

</script>
