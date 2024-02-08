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
      <Field
        :id="id"
        :value="value"
        :name="name"
        @input="$emit('update:value', $event.target.value)"
        :placeholder="placeholder"
        :required="required"
        :rules="rules"
        v-slot="{ field, meta }"
      >
        <input
          v-bind="field"
          :type="type"
          class="w-full py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 shadow-sm"
          :class="[
            prefixIcon !== '' ? 'pl-10' : 'pl-4',
            suffixIcon !== '' ? 'pr-10' : 'pr-4',
            meta.valid ? '' : 'border-red-500',
          ]"
        />
      </Field>
      <div
        v-if="suffixIcon"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <span :class="suffixIcon"></span>
      </div>
    </div>
    <div class="text-red-500 text-sm capitalize mt-1">
      <ErrorMessage :name="name" />
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
    type: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "",
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
    rules: {
      default: null,
    },
  },
}
</script>
