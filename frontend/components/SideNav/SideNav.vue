<template>
  <aside
    class="bg-white w-64 min-h-screen fixed md:static flex-none transition z-50 md:translate-x-0"
    :class="[isOpen ? 'translate-x-0' : '-translate-x-64']"
  >
    <NuxtLink
      to="/login"
      class="text-lg font-semibold px-5 py-4 block text-center"
      >Admin Dashboard</NuxtLink
    >
    <nav>
      <ul>
        <SideNavItemTitle title="dashboard" />
        <SideNavItem
          link="/"
          title="Dashboard"
          icon="i-tabler-home"
          :active="activeLink == '/'"
        />
        <SideNavItem
          link="/users"
          title="User"
          icon="i-tabler-user"
          :active="activeLink == '/users'"
        />
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    activeLink() {
      return this.$route.path
    },
  },
}
</script>
