<template> 
  <div class="flex items-center justify-center w-full h-screen"> 
    <div class="max-w-148 w-full flex flex-col gap-8"> 
      <div class="text-left sm:text-center "> 
        <h1 class="text-4xl sm:text-5xl text-gold-500 font-moga">Login</h1> 
        <h4 class="font-cinzel text-[#78C8A3] text-sm sm:text-base">Área administrativa</h4> 
      </div> 
      <div class="flex flex-col gap-4"> 
        <Input v-model="email" label="E-mail" label-size="16" placeholder="Digite seu email de acesso" input-size="14" required></Input> 
        <Input v-model="senha" type="password" label="Senha" label-size="16" placeholder="Digite sua senha de acesso" input-size="14" required @enter="fazerLogin"></Input> 
        <p v-if="erro" class="text-red-500 text-sm">
          {{ erro }}
        </p>
        <Button :disabled="loading" :loading="loading" py="10" @click="fazerLogin">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </Button>
      </div> 
      <Loading v-if="loading" size="10"></Loading>
    </div> 
  </div> 
</template> 

<script setup> 
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  import Button from '../../components/Button.vue'
  import Input from '../../components/Input.vue'
  import Loading from '../../components/Loading.vue'

  import { useAuthStore } from '../../stores/auth'

  const router = useRouter()
  const authStore = useAuthStore()

  const email = ref('')
  const senha = ref('')

  const loading = ref(false)
  const erro = ref('')

  const fazerLogin = async () => {
    erro.value = ''

    try {
      loading.value = true

      await authStore.login(
        email.value,
        senha.value
      )

      router.push('/admin/dashboard')
    } catch (error) {
      erro.value =
        error.response?.data?.erro ||
        'Erro ao realizar login'
    } finally {
      loading.value = false
    }
  }
</script>