<template>
  <div class="mb-6 ml-4">
    <label class="block mb-2 text-lg font-semibold text-gray-700">{{ label }}</label>
    <div class="flex items-center space-x-4">
      <input
          type="range"
          :min="12"
          :max="max"
          :value="modelValue"
          @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
          class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-100"
      />
      <span class="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md">{{ modelValue }}px</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    label: string;
    modelValue: number;
    max: number;
  }>();

  defineEmits<{
    (e: 'update:modelValue', value: number): void
  }>();
</script>
<style lang="scss">
  @import "FontSizeSlider";
</style>