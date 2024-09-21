<template>
  <div class="mb-4">
    <label class="block mb-2 font-semibold text-gray-700">Couleur du texte</label>
    <div class="flex space-x-4">
      <button
          v-for="option in colorOptions"
          :key="option"
          @click="$emit('update:modelValue', option as 'white' | 'black')"
          :class="[
          'px-6 py-2 rounded-lg border transition duration-300 ease-in-out',
          option === 'white' ? 'bg-white text-gray-800 border-gray-300' : 'bg-black text-white border-black',
          modelValue === option ? 'ring-2 ring-offset-2 ring-gray-500' : ''
        ]"
      >
        {{ option.charAt(0).toUpperCase() + option.slice(1) }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
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