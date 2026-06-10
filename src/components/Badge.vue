<script setup> 
import { computed } from 'vue'; 
const props = defineProps({ 
    color: { 
        type: String, 
        default: 'green' 
    } }) 
    
    const badgeClasses = computed(() => { const classes = [ 
        'px-2', 
        'py-1', 
        'font-inter', 
        'uppercase', 
        'border', 
        'text-[8px]', 
        'md:text-[10px]',
        'w-fit'
        ] 
        
        switch (props.color) { 
            case 'green': 
                classes.push( 
                'bg-green-600', 
                'text-green-300', 
                'border-green-300', ) 
                break 
            case 'red': 
                classes.push( 
                'bg-red-950', 
                'text-red-400', 
                'border-red-400', ) 
                break 
            case 'yellow': 
                classes.push( 
                'bg-gold-950', 
                'text-gold-500', 
                'border-gold-500', ) 
                break 
            case 'gray': 
            classes.push( 
                'bg-neutral-800', 
                'text-neutral-500', 
                'border-neutral-500', ) 
                break 
        } 
        return classes 
    }) 
</script> 

<template> 
    <div :class="badgeClasses"> 
        <span><slot></slot></span> 
    </div> 
</template>