<template>
  <!-- Header -->
  <header class="bg-white">
    <div class="container mx-auto flex items-center justify-between">
      <div
        @click="updateIsOpen"
        class="block md:hidden rounded-md bg-gray-100 hover:bg-gray-300 px-3 py-2 flex items-center"
      >
        <span class="i-tabler-baseline-density-medium text-2xl"></span>
      </div>
      <div class="hidden md:block w-max-xl p-4">
        <input-field
          id="search-all"
          type="text"
          prefixIcon="i-tabler-search"
          placeholder="Search"
        />
      </div>
      <div>
        <div
          class="relative inline-block cursor-pointer p-4 hover:bg-gray-300"
          :class="open ? 'bg-gray-300' : 'bg-white'"
          @click="toggle"
        >
          <div class="flex items-center gap-3">
            <div
              class="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center"
            >
              <span class="i-tabler-user text-2xl"></span>
            </div>
            <span>{{ user.first_name || "" }}</span>
          </div>
          <div
            v-if="open"
            class="absolute shadow-md px-4 py-3 bg-white w-56 right-0 cursor-pointer mt-1 flex items-center gap-2 hover:bg-gray-300"
            @click="logout"
          >
            <span class="i-tabler-power text-xl"></span>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const router = useRouter(),
  { logUserOut } = useAuthStore(),
  { $events } = useNuxtApp(),
  { user } = storeToRefs(useUserStore()),
  open = ref(false)
const toggle = function () {
  open.value = !open.value
}

const logout = function () {
  logUserOut()

  router.push("/login")
}
const updateIsOpen = () => {
  $events.$emit("openNavbar", true)
}
</script>
