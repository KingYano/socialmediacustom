<template>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">{{ label }}</label>
    <div class="flex space-x-4">
      <div v-for="option in options" :key="option" class="flex items-center">
        <input
            type="radio"
            :id="option"
            :value="option"
            v-model="model"
            @change="updateValue"
            class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
        />
        <label :for="option" class="ml-2 block text-sm leading-5 text-gray-700">{{ option }}</label>
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

</style>