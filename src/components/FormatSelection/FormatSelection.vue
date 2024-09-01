<template>
  <div class="mb-4">
    <label class="block mb-2 font-semibold">Format</label>
    <div class="flex flex-wrap gap-2">
      <button
          v-for="option in formatOptions"
          :key="option.value"
          @click="$emit('update:modelValue', option.value as 'tiktok' | 'instaPortrait')"
          :class="['px-4 py-2 rounded', modelValue === option.value ? 'bg-blue-500 text-white' : 'bg-gray-200']"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps<{
    modelValue: 'tiktok' | 'instaPortrait'
  }>();

  defineEmits<{
    (e: 'update:modelValue', value: 'tiktok' | 'instaPortrait'): void
  }>();

  const formatOptions = [
    { value: 'tiktok' as const, label: 'TikTok / Instagram (9:16)' },
    { value: 'instaPortrait' as const, label: 'Instagram Portrait (4:5)' }
  ];
</script>

<style lang="scss">
  @import "FormatSelection";
</style>