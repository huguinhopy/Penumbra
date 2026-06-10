<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import NavLink from './NavLink.vue'
import { useAuthStore } from '../stores/auth.js'

const authStore = useAuthStore()

const menuAberto = ref(false)

const nomeAdmin = ref(authStore.admin?.nome)

const inicialAdmin = computed(() => {
  return nomeAdmin.value?.charAt(0).toUpperCase() || '?'
})

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) =>
      ['default', 'simple', 'admin'].includes(value),
  },
})

const config = computed(() => {
  switch (props.variant) {
    case 'simple':
      return {
        logo: '/logo-header.svg',
        link: '/',
        showNav: false,
        showSocials: false,
        showProfile: false,
        links: [],
      }

    case 'admin':
      return {
        logo: '/logo-header-2.svg',
        link: '/admin/dashboard',
        showNav: true,
        showSocials: false,
        showProfile: true,

        links: [
          {
            label: 'Mesas',
            to: '/admin/mesas',
          },
          {
            label: 'Reservas',
            to: '/admin/reservas',
          },
          {
            label: 'Gerenciar Admins',
            to: '/admin/admins',
          },
          {
            label: 'Log de ações',
            to: '/admin/logs',
          },
        ],
      }

    default:
      return {
        logo: '/logo-header.svg',
        link: '/',
        showNav: true,
        showSocials: true,
        showProfile: false,

        links: [
          {
            label: 'Quem somos',
            to: '/#nos',
          },
          {
            label: 'Cardápio',
            to: '/#cardapio',
          },
          {
            label: 'Reservar mesa',
            to: '/reservar',
          },
          {
            label: 'Minhas reservas',
            to: '/minhas-reservas',
          },
        ],
      }
  }
})
</script>

<template>
  <header
    class="w-full border-b border-neutral-800 bg-neutral-900/5 backdrop-blur-md py-4 px-6 sm:px-12 fixed z-1 justify-center flex"
  >
    <div class="container-app flex items-center justify-between">

      <!-- Logo -->
      <RouterLink :to="config.link">
        <img
          :src="config.logo"
          alt="Logo"
          class="h-10 sm:h-12 lg:h-14 xl:h-16"
        />
      </RouterLink>

      <!-- Nav desktop -->
      <nav
        v-if="config.showNav"
        class="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-12 text-xs lg:text-sm"
      >
        <NavLink
          v-for="link in config.links"
          :key="link.to"
          :to="link.to"
        >
          {{ link.label }}
        </NavLink>
      </nav>

      <!-- Redes sociais OU Perfil -->
      <div class="hidden md:flex items-center gap-6">

        <!-- Perfil Admin -->
        <div
          v-if="config.showProfile"
          class="flex items-center gap-3"
        >

          <RouterLink
            class="
              h-10
              w-10
              rounded-full
              bg-neutral-800
              text-neutral-100
              font-medium
              flex
              items-center
              justify-center
              hover:bg-neutral-700
              transition-colors
              hover:cursor-pointer
            "
            to="/admin/perfil"
          >
            {{ inicialAdmin }}
          </RouterLink>
        </div>

        <!-- Redes Sociais -->
        <template v-else-if="config.showSocials">

          <!-- Instagram -->
          <a
            href="#"
            target="_blank"
            class="text-neutral-100 hover:text-gold-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.013 7.053.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.053.013 8.333 0 8.741 0 12c0 3.259.013 3.667.072 4.947.085 1.856.601 3.698 1.942 5.039 1.341 1.341 3.183 1.857 5.039 1.942C8.333 23.987 8.741 24 12 24c3.259 0 3.667-.013 4.947-.072 1.856-.085 3.698-.601 5.039-1.942 1.341-1.341 1.857-3.183 1.942-5.039.059-1.28.072-1.688.072-4.947 0-3.259-.013-3.667-.072-4.947-.085-1.856-.601-3.698-1.942-5.039C20.645.673 18.803.157 16.947.072 15.667.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>

          <!-- TikTok -->
          <a
            href="#"
            target="_blank"
            class="text-neutral-100 hover:text-gold-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.56V6.81a4.85 4.85 0 0 1-1.07-.12z"/>
            </svg>
          </a>

        </template>

      </div>

      <!-- Menu Mobile -->
      <button
        v-if="config.showNav"
        class="md:hidden text-neutral-100 hover:text-gold-500 transition-colors"
        @click="menuAberto = !menuAberto"
      >
        <svg
          v-if="!menuAberto"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

    </div>

    <!-- Menu Mobile -->
    <div
      v-if="menuAberto && config.showNav"
      class="md:hidden"
    >
      <div
        class="py-6 px-6 sm:px-12 flex flex-col gap-6 absolute right-0 top-20 text-right border border-neutral-800 bg-neutral-900"
      >
        <NavLink
          v-for="link in config.links"
          :key="link.to"
          :to="link.to"
          size="xs"
          @click="menuAberto = false"
        >
          {{ link.label }}
        </NavLink>

        <!-- Perfil Admin Mobile -->
        <RouterLink
          to="/admin/perfil"
          v-if="config.showProfile"
          class="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800"
        >
          <span class="text-neutral-300 text-sm">
            {{ nomeAdmin }}
          </span>

          <div
            class="
              h-10
              w-10
              rounded-full
              bg-neutral-800
              text-neutral-100
              font-medium
              flex
              items-center
              justify-center
            "
          >
            {{ inicialAdmin }}
          </div>
        </RouterLink>

        <!-- Redes Sociais Mobile -->
        <div
          v-if="config.showSocials"
          class="flex items-center justify-center gap-8 pt-2 border-t border-neutral-800"
        >
          <!-- Seus ícones aqui -->
        </div>
      </div>
    </div>

  </header>
</template>