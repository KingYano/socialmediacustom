<template>
  <div class="mb-6">
    <label class="block text-gray-700 text-base font-semibold mb-3">{{ label }}</label>
    <div class="flex space-x-8">
      <div v-for="option in options" :key="option" class="flex items-center">
        <input
            type="radio"
            :id="option"
            :value="option"
            v-model="model"
            @change="updateValue"
            class="custom-radio h-5 w-5 border-gray-300 focus:ring-purple-500 transition duration-150 ease-in-out"
        />
        <label
            :for="option"
            class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer transition duration-150"
        >
          {{ option.charAt(0).toUpperCase() + option.slice(1) }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  label: string;
  options: Array<'top' | 'bottom'>;
  modelValue: 'top' | 'bottom';
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: 'top' | 'bottom'): void;
}>();

const model = ref(props.modelValue);

watch(model, (newVal) => {
  emit('update:modelValue', newVal);
});

const updateValue = () => {
  emit('update:modelValue', model.value);
};
</script>

<style lang="scss">
  @import "RadioButtonGroup";
</style>
