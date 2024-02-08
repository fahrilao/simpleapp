<template>
  <li class="font-thin px-5 py-3 text-stone-500 uppercase">{{ title }}</li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
