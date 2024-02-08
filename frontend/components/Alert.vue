<template>
  <div
    class="transition fixed top-4 right-4 z-50 py-3 px-4 flex items-center justify-between text-gray-600 rounded-md bg-white border-2 border-gray-300 shadow"
    :class="{
      hidden: !isShow,
    }"
  >
    <div class="flex">
      <div>
        <span
          v-if="success"
          class="i-tabler-circle-check-filled text-2xl text-green-500"
        ></span>
        <span
          v-if="error"
          class="i-tabler-info-triangle-filled text-2xl text-red-500"
        ></span>
      </div>
      <div class="mx-2">
        <div v-if="success" class="font-bold">Success!</div>
        <div v-if="error" class="font-bold">Error!</div>
        <slot />
      </div>
      <button @click="$emit('close')" class="leading-3 ms-1">
        <span class="i-tabler-x text-gray-600"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
}
</script>
