<template>
  <div class="w-full">
    <label :for="id" class="block text-gray-700 text-sm mb-2" v-if="label">{{
      label
    }}</label>
    <div class="relative flex items-stretch rounded-md shadow-sm">
      <div
        v-if="prefixIcon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <span :class="prefixIcon"></span>
      </div>
      <select
        :id="id"
        v-model="selectedValue"
        class="w-full py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 shadow-sm"
        :class="[
          prefixIcon !== '' ? 'pl-10' : 'pl-4',
          suffixIcon !== '' ? 'pr-10' : 'pr-4',
        ]"
        :required="required"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <div
        v-if="suffixIcon"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <span :class="suffixIcon"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    prefixIcon: {
      type: String,
      default: "",
    },
    suffixIcon: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      required: true,
    }, // Added prop for options
  },
  data() {
    return {
      selectedValue: this.value, // Initialize with prop value
    }
  },
  watch: {
    selectedValue(newValue) {
      this.$emit("update:value", newValue) // Emit change events
    },
  },
}
</script>
