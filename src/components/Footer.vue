<script setup>
</script>

<template>
  <footer class="bg-[#0f1a1d] text-[#E5C687] py-16 px-8 md:px-24 font-serif">
    <div class="max-w-7xl mx-auto max-lg:mx-0">
      <div class="flex justify-between max-md:items-center">
        
        <!-- Logo Column -->
        <div>
            <img src="../assets/images/Logo (1).png" alt="" class="max-lg:max-w-[138px] max-md:max-w-[103px]">
        </div>
        <div class="flex gap-12 max-lg:gap-4 max-md:flex-col ">
            <div class="flex flex-col gap-5  md:mt-4">
                <h3 class="text-2xl max-lg:text-xl max-md:text-base font-bold uppercase tracking-widest border-b border-transparent">Contatos</h3>
                <div class="flex flex-col gap-3 font-sans text-gray-300 text-base max-lg:text-sm max-md:text-[10px] tracking-wide">
                    <p>(84) 98842-6769</p>
                    <p>penumbra@dark.com</p>
                </div>
            </div>
            <div class="flex flex-col gap-5 md:mt-4">
                <h3 class="text-2xl max-lg:text-xl max-md:text-base font-bold uppercase tracking-widest ">Redes Sociais</h3>
                <div class="flex flex-col gap-3 font-sans text-gray-300 text-base tracking-wide">
                    <div class="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z w:text-sm" class="w-5 h-5 max-lg:w-[15px] max-lg:h-[15px] max-md:w-3 max-md:h-3"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    <span class="text-base max-lg:text-sm max-md:text-[10px]">@penumbra_restaurante</span>
                    </div>
                    <div class="flex items-center space-x-3">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      stroke-width="2" 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      class="w-5 h-5 max-lg:w-[15px] max-lg:h-[15px] max-md:w-3 max-md:h-3"
                    >
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                    </svg>
                    <span class="text-base max-lg:text-sm max-md:text-[10px]">@penumbra_italian</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Contacts Column -->
        

        <!-- Social Media Column -->
        
      </div>

      <!-- Bottom Divider and Copyright -->
      <div class="mt-20">
        <div class="w-full h-[1px] bg-gray-800/50 mb-6"></div>
        <div class="flex justify-end">
          <p class="text-gray-500 text-[10px] tracking-widest uppercase font-sans">
            &copy; 2025 Penumbra. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400&display=swap');

.font-serif {
  font-family: 'Cinzel', serif;
}

.font-sans {
  font-family: 'Inter', sans-serif;
}
</style>
