import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const admin = ref(JSON.parse(localStorage.getItem('admin') || 'null'))

  const login = async (email, senha) => {
    const { data } = await api.post('/administradores/login', { email, senha })
    token.value = data.token
    admin.value = data.admin
    localStorage.setItem('token', data.token)
    localStorage.setItem('admin', JSON.stringify(data.admin))
  }

  const logout = () => {
    token.value = null
    admin.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
  }

  return { token, admin, login, logout }
})