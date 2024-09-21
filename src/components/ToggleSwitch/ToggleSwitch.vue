<template>
  <div class="mb-4">
    <label class="flex items-center cursor-pointer">
      <input
          type="checkbox"
          :checked="modelValue"
          @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
          class="sr-only"
      />
      <div
          class="relative inline-block w-9 h-5 transition duration-200 ease-in-out rounded-full bg-gray-300"
          :class="{ 'bg-purple-800': modelValue }"
      >
        <span
            class="inline-block w-5 h-5 bg-white rounded-full shadow transform transition duration-200 ease-in-out"
            :class="{ 'translate-x-4': modelValue }"
        ></span>
      </div>
      <span class="ml-3 text-gray-700 font-medium leading-none">{{ label }}</span> <!-- Ajout de leading-none -->
    </label>
  </div>
</template>

<script lang="ts" setup>
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