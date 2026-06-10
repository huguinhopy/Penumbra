<template>
  <Header variant="admin"/>

  <!-- <main class="pt-20">
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
  <Select :options="[
{
  value: 'opa',
  label: 'Opa',
},
{
  value: 'resenha',
  label: 'Resenha',
},
]" placeholder="opaaa"></Select>
</main>
  <Wine :width="120" :height="220"/>
  <br>
  <Badge>Confirmado</Badge>
  <br> -->
 <Button @click="modalAberto = true">
    Abrir
  </Button>

  <ActionModal
  v-model="modalAberto" title="Editar mesa" subtitle="Mesas" icon="cancel"
>

  <template v-if="estado === 'confirm'">

    <div class="flex flex-col gap-4">

      <Button
        variant="lined-red"
        @click="fechar"
      >
        Cancelar
      </Button>

      <Button
        variant="full-green"
        @click="excluirMesa"
      >
        Salvar alterações
      </Button>

    </div>

  </template>

  <template v-else-if="estado === 'loading'">

    <Loading />

  </template>

  <template v-else-if="estado === 'success'">

    <div class="text-center">

      <div class="text-5xl text-green-500">
        ✓
      </div>

      <h2>
        Mesa excluída
      </h2>

      <Button
        variant="full-green"
        @click="fechar"
      >
        Fechar
      </Button>

    </div>

  </template>

  <template v-else-if="estado === 'error'">

    <div class="text-center">

      <div class="text-5xl text-red-500">
        ✕
      </div>

      <h2>
        Erro ao excluir mesa
      </h2>

      <Button
        variant="full-red"
        @click="fechar"
      >
        Fechar
      </Button>

    </div>

  </template>

</ActionModal>
<br>
<Rodape/>
</template>

<script setup>
import Button from '../components/Button.vue';
import Header from '../components/Header.vue';
import TimeSelector from '../components/TimeSelector.vue';
import Input from '../components/Input.vue';
import { ref } from 'vue';
import Loading from '../components/Loading.vue';
import Wine from '../components/Wine.vue';
import Badge from '../components/Badge.vue';
import Select from '../components/Select.vue';

const horarioSelecionado = ref('')

import ActionModal from '../components/ActionModal.vue'
import Rodape from '../components/Rodape.vue';

const modalAberto = ref(false)
const estado = ref('confirm')
async function excluirMesa() {
  try {
    estado.value = 'loading'

    await api.delete('/mesas/12')

    estado.value = 'success'
  }
  catch {
    estado.value = 'error'
  }
}
function fechar() {
  modalAberto.value = false

  setTimeout(() => {
    estado.value = 'confirm'
  }, 200)
}

</script>
