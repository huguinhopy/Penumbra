<script setup>
    import { computed } from 'vue';
    import Badge from './Badge.vue';
    import Button from './Button.vue';

    const props = defineProps({
        reserva: {
            type: Object,
            required: true
        }
    })

    const badgeColor = computed(() => {
        switch (props.reserva.status) {
            case 'confirmada':
            return 'green'

            case 'cancelada':
            return 'gray'

            case 'pendente':
            return 'red'

            case 'concluida':
            return 'yellow'
        }
    })

    const dataFormatada = computed(() => {
        return new Intl.DateTimeFormat('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(props.reserva.data_hora))
    })

    const mesaTexto = computed(() => {
        return props.reserva.mesa
            ? `Mesa ${props.reserva.mesa.numero}`
            : 'Sem mesa'
    })
    const pessoasTexto = computed(() => {
        return props.reserva.num_pessoas === 1
            ? '1 pessoa'
            : `${props.reserva.num_pessoas} pessoas`
    })

</script>

<template>
    <div class="p-4 bg-[#1B1B1B] flex items-center justify-between">
        <div class="flex flex-col gap-3">
            <p class="text-neutral-600 text-[10px] sm:text-sm font-inter">{{ props.reserva.id_reserva.toString().padStart(7, '0') }}</p>
            <div class="flex flex-col gap-1">
                <h6 class="text-neutral-100 text-sm sm:text-base font-cinzel font-bold">{{ dataFormatada }}</h6>
                <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1">
                        <img src="/icons/people.svg" alt="" class="h-3 sm:h-4">
                        <p class="text-neutral-600 text-[10px] sm:text-xs font-inter">{{ pessoasTexto }}</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <img src="/icons/table.svg" alt="" class="h-3 sm:h-4">
                        <p class="text-neutral-600 text-[10px] sm:text-xs font-inter">{{ mesaTexto }}</p>
                    </div>
                </div>
            </div>
            <p class="sm:text-sm text-xs font-inter text-gold-500">{{ props.reserva.nome }}</p>
        </div>
        <div class="flex flex-col items-end h-full justify-between shrink-0">
            <Badge :color="badgeColor">{{ props.reserva.status }}</Badge>
            <Button :to="`/admin/reservas/${props.reserva.id_reserva}`" variant="full-neutral" size="12" px="12" py="8">
                Ver detalhes
            </Button>
        </div>
    </div>
</template>