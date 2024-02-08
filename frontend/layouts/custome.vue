<template>
  <!-- Main Content -->
  <div class="flex flex-row bg-gray-100 max-w-full">
    <!-- Sidebar -->
    <SideNav :isOpen="isOpen" />

    <!-- Page Content -->
    <main class="grow overflow-hidden">
      <Header :isOpen="isOpen" />
      <div class="p-4" @click="closeNavbar">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
const { $events } = useNuxtApp(),
  isOpen = ref(false),
  closeNavbar = () => {
    isOpen.value = false
  }

$events.$on("openNavbar", (value) => {
  isOpen.value = value
})
</script>
