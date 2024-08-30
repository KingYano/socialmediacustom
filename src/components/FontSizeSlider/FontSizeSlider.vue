<template>
  <div class="mb-4 ml-4">
    <label class="block mb-2 font-semibold">{{ label }}</label>
    <input
        type="range"
        :min="12"
        :max="max"
        :value="modelValue"
        @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
        class="w-full"
    />
    <span class="text-sm text-gray-600">{{ modelValue }}px</span>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';

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