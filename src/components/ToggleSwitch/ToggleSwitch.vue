<template>
  <div class="mb-4">
    <label class="flex items-center">
      <input
          type="checkbox"
          :checked="modelValue"
          @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
          class="mr-2"
      />
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';

  defineProps<{
    label: string;
    modelValue: boolean;
  }>();

  defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>();
</script>

<style lang="scss">
  @import "ToggleSwitch";
</style>