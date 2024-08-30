<template>
  <div class="mb-4">
    <label class="block mb-2 font-semibold">Text Color</label>
    <div class="flex space-x-4">
      <button
          v-for="option in colorOptions"
          :key="option"
          @click="$emit('update:modelValue', option as 'white' | 'black')"
          :class="[
          'px-4 py-2 rounded',
          modelValue === option
            ? `bg-${option === 'white' ? 'gray-800 text-white' : 'black text-white'}`
            : `bg-${option} border`
        ]"
      >
        {{ option.charAt(0).toUpperCase() + option.slice(1) }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';

  defineProps<{
    modelValue: 'white' | 'black'
  }>();

  defineEmits<{
    (e: 'update:modelValue', value: 'white' | 'black'): void
  }>();

  const colorOptions = ['white', 'black'] as const;
</script>

<style lang="scss">

</style>