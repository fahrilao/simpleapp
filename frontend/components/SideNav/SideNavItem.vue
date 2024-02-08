<template>
  <li>
    <NuxtLink
      :to="link"
      class="px-5 py-3 border-l-4 flex items-center transition"
      :class="
        active
          ? 'border-blue-400 bg-blue-50 text-blue-500'
          : 'hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 border-white'
      "
    >
      <span class="mr-1 text-2xl" :class="[icon]"></span>
      <span class="text-black font-medium">{{ title }}</span>
    </NuxtLink>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
