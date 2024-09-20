<template>
  <div class="mb-4">
    <label class="block mb-2 font-semibold">{{ label }}</label>
    <textarea
        v-if="textarea"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>
    <input
        v-else
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    label: string;
    modelValue: string;
    textarea?: boolean;
  }>();
</script>

<style lang="scss">
  @import "TextInput";
</style>
