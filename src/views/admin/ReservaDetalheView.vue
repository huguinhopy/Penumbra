<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import api from '../../services/api'

import Header from '../../components/Header.vue'
import Rodape from '../../components/Rodape.vue'
import Badge from '../../components/Badge.vue'
import Button from '../../components/Button.vue'
import Select from '../../components/Select.vue'
import ActionModal from '../../components/ActionModal.vue'


const route = useRoute()

const reserva = ref(null)
const mesas = ref([])

const modalConfirmarReserva = ref(false)
const modalConfirmarPresenca = ref(false)

const mesaSelecionada = ref('')

async function carregarReserva() {
  const { data } = await api.get(`/reservas/${route.params.id}`)

  reserva.value = data
}

async function carregarMesas() {
  const { data } = await api.get('/mesas')

  mesas.value = data
}

async function confirmarReserva() {
  try {
    await api.patch(
      `/reservas/${reserva.value.id_reserva}/status`,
      {
        status: 'confirmada',
        id_mesa: mesaSelecionada.value,
      }
    )

    modalConfirmarReserva.value = false

    await carregarReserva()
  } catch (error) {
    alert(
      error.response?.data?.erro ||
      'Erro ao confirmar reserva'
    )
  }
}

async function confirmarPresenca() {
  try {
    await api.patch(
      `/reservas/${reserva.value.id_reserva}/status`,
      {
        status: 'concluida',
      }
    )

    modalConfirmarPresenca.value = false

    await carregarReserva()
  } catch (error) {
    console.error(error)
  }
}

const badgeColor = computed(() => {
  switch (reserva.value?.status) {
    case 'confirmada':
      return 'green'

    case 'cancelada':
      return 'gray'

    case 'concluida':
      return 'yellow'

    default:
      return 'red'
  }
})

const opcoesMesas = computed(() =>
  mesas.value
    .filter(mesa => mesa.ativa)
    .map(mesa => ({
      label: `Mesa ${mesa.numero} (${mesa.capacidade} lugares)`,
      value: mesa.id_mesa,
    }))
)

const dataFormatada = computed(() => {
  if (!reserva.value) return ''

  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(reserva.value.data_hora))
})

const horarioFormatado = computed(() => {
  if (!reserva.value) return ''

  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(reserva.value.data_hora))
})

const actionsConfirmarReserva = computed(() => [
  {
    label: 'Voltar',
    variant: 'lined-red',
    action: () => {
      modalConfirmarReserva.value = false
    }
  },
  {
    label: 'Confirmar',
    variant: 'full-green',
    action: confirmarReserva
  }
])

const actionsConfirmarPresenca = computed(() => [
  {
    label: 'Voltar',
    variant: 'lined-red',
    action: () => {
      modalConfirmarPresenca.value = false
    }
  },
  {
    label: 'Confirmar',
    variant: 'full-green',
    action: confirmarPresenca
  }
])

onMounted(async () => {
  await carregarReserva()
  await carregarMesas()
})
</script>
modal
<template>
  <Header variant="admin" />

  <main
    v-if="reserva"
    class="pt-30 md:pt-35 px-6 sm:px-12 flex flex-col items-center min-h-screen"
  >
    <div class="container-app">

      <RouterLink
        to="/admin/reservas"
        class="text-neutral-600 text-sm"
      >
        ← Voltar
      </RouterLink>

      <div class="flex justify-between flex-col sm:flex-row items-start sm:items-center mt-6 gap-0 sm:gap-2">
        <h1 class="text-gold-500 text-2xl sm:text-3xl font-cinzel font-bold">
          DETALHE DA RESERVA
        </h1>

        <Badge :color="badgeColor">
          {{ reserva.status }}
        </Badge>
      </div>

      <!-- RESERVA -->

      <h3 class="mt-8 mb-3 text-neutral-300 uppercase">
        Reserva
      </h3>

      <div class="border border-neutral-700 bg-[#1B1B1B]">

        <div class="flex justify-between p-4 border-b border-neutral-700 items-center">
          <span class="text-neutral-600 text-sm sm:text-base">Código</span>
          <span class="text-gold-500 font-bold text-sm sm:text-base">
            {{ reserva.id_reserva.toString().padStart(7, '0') }}
          </span>
        </div>

        <div class="flex justify-between p-4 border-b border-neutral-700 items-center">
          <span class="text-neutral-600 text-sm sm:text-base">Data</span>
          <span class="text-gold-500 font-bold text-sm sm:text-base">
            {{ dataFormatada }}
          </span>
        </div>

        <div class="flex justify-between p-4 border-b border-neutral-700 items-center">
          <span class="text-neutral-600 text-sm sm:text-base">Horário</span>
          <span class="text-gold-500 font-bold text-sm sm:text-base">
            {{ horarioFormatado }}
          </span>
        </div>

        <div class="flex justify-between p-4 border-b border-neutral-700 items-center">
          <span class="text-neutral-600 text-sm sm:text-base">Pessoas</span>
          <span class="text-gold-500 font-bold text-sm sm:text-base">
            {{ reserva.num_pessoas }} pessoa(s)
          </span>
        </div>

        <div class="flex justify-between p-4">
          <span class="text-neutral-600 text-sm sm:text-base">Mesa</span>
          <span class="text-gold-500 font-bold text-sm sm:text-base">
            {{
              reserva.mesa
                ? `Mesa ${reserva.mesa.numero}`
                : 'Sem mesa'
            }}
          </span>
        </div>

      </div>

      <!-- TITULAR -->

      <h3 class="mt-8 mb-3 text-neutral-300 uppercase">
        Titular
      </h3>

      <div class="border border-neutral-700 bg-[#1B1B1B]">

        <div class="flex justify-between p-4 border-b border-neutral-700 items-center">
          <span class="text-neutral-600 text-sm sm:text-base">Nome</span>
          <span class="text-gold-500 font-bold text-sm sm:text-base">
            {{ reserva.nome }}
          </span>
        </div>

        <div class="flex justify-between p-4 border-b border-neutral-700 items-center">
          <span class="text-neutral-600 text-sm sm:text-base">Telefone</span>
          <span class="text-gold-500 font-bold text-sm sm:text-base">
            {{ reserva.telefone }}
          </span>
        </div>

        <div class="flex justify-between p-4">
          <span class="text-neutral-600">Email</span>
          <span class="text-gold-500 font-bold text-sm sm:text-base">
            {{ reserva.email }}
          </span>
        </div>

      </div>

      <!-- OBS -->

      <h3 class="mt-8 mb-3 text-neutral-300 uppercase">
        Observações
      </h3>

      <div
        class="border border-neutral-700 bg-[#1B1B1B] p-4 text-neutral-500 text-xs sm:text-sm"
      >
        {{ reserva.observacoes || 'Nenhuma observação.' }}
      </div>

      <!-- BOTÕES -->

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">

        <Button
          :variant="reserva.status !== 'pendente' ? 'full-disabled' : 'full-green'"
          :disabled="reserva.status !== 'pendente'"
          @click="modalConfirmarReserva = true"
        >
          Confirmar reserva
        </Button>

        <Button
          :variant="reserva.status !== 'confirmada' ? 'full-disabled' : 'full-green'"
          :disabled="reserva.status !== 'confirmada'"
          @click="modalConfirmarPresenca = true"
        >
          Confirmar presença
        </Button>

      </div>

      <Button
        variant="lined-disabled"
        class="w-full mt-3"
      >
        Cancelar reserva
      </Button>

      <p class="text-xs sm:text-sm text-neutral-600 mt-4">
        * Cancelamento disponível somente após o horário da reserva,
        se o cliente não comparecer.
      </p>

      <Rodape />

    </div>
  </main>

  <!-- MODAL CONFIRMAR RESERVA -->

  <ActionModal
  v-model="modalConfirmarReserva"
  title="Confirmar reserva"
  subtitle="Vincular mesa"
  :actions="actionsConfirmarReserva"
> 
<div>
  <p class="text-xs sm:text-sm p-4 bg-neutral-900 border border-neutral-600 text-gold-700">{{ `${reserva.id_reserva.toString().padStart(7, '0')} - ${reserva.nome} - ${dataFormatada} - ${reserva.num_pessoas} pessoas` }}</p>
</div>
    <Select
      v-model="mesaSelecionada"
      :options="opcoesMesas"
      placeholder="Escolha uma mesa"
      label="Mesa selecionada"
    />

    <template #actions>
      <Button
        variant="lined-red"
        @click="modalConfirmarReserva = false"
      >
        Voltar
      </Button>

      <Button
        variant="full-green"
        @click="confirmarReserva"
      >
        Confirmar
      </Button>
    </template>
  </ActionModal>

  <!-- MODAL CONFIRMAR PRESENÇA -->

  <ActionModal
    v-model="modalConfirmarPresenca"
    title="COnfirmar presença"
    subtitle="Ação"
    description-sm="Isso marcará a reserva como concluída. O registro será removido do sistema após 24h."
    :actions="actionsConfirmarPresenca"
  >
    <template #actions>

      <Button
        variant="lined-red"
        @click="modalConfirmarPresenca = false"
      >
        Voltar
      </Button>

      <Button
        variant="full-green"
        @click="confirmarPresenca"
      >
        Confirmar
      </Button>

    </template>
  </ActionModal>
</template>