<template>
  <div class="p-4 bg-white shadow-md overflow-y-auto">
    <h2 class="text-2xl font-bold mb-6">Paramètres : </h2>

    <FormatSelector :modelValue="format" @update:modelValue="$emit('update:format', $event)" />
    <TextInput label="Titre :" :modelValue="title" @update:modelValue="$emit('update:title', $event)" />
    <TextInput label="Description :" :modelValue="description" @update:modelValue="$emit('update:description', $event)" textarea />
    <ColorSelector :modelValue="textColor" @update:modelValue="$emit('update:textColor', $event)" />

    <ToggleSwitch label="Afficher le titre" :modelValue="showTitle" @update:modelValue="$emit('update:showTitle', $event)" />
    <FontSizeSlider
        v-if="showTitle"
        label="Taille du titre"
        :modelValue="titleFontSize"
        @update:modelValue="$emit('update:titleFontSize', $event)"
        :max="40"
    />

    <ToggleSwitch label="Afficher la description" :modelValue="showDescription" @update:modelValue="$emit('update:showDescription', $event)" />
    <FontSizeSlider
        v-if="showDescription"
        label="Taille de la description"
        :modelValue="descriptionFontSize"
        @update:modelValue="$emit('update:descriptionFontSize', $event)"
        :max="26"
    />

    <button @click="$emit('download')" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center mt-4">
      <span class="mr-2">Télécharger l'image</span>
    </button>
  </div>
</template>

<script setup lang="ts">
  import FormatSelector from './../FormatSelection/FormatSelection.vue';
  import TextInput from './../TextInput/TextInput.vue';
  import ColorSelector from './../ColorSelector/ColorSelector.vue';
  import ToggleSwitch from './../ToggleSwitch/ToggleSwitch.vue';
  import FontSizeSlider from './../FontSizeSlider/FontSizeSlider.vue';

  defineProps<{
    format: string;
    title: string;
    description: string;
    textColor: string;
    showTitle: boolean;
    showDescription: boolean;
    titleFontSize: number;
    descriptionFontSize: number;
  }>();

  defineEmits<{
    (e: 'update:format', value: string): void;
    (e: 'update:title', value: string): void;
    (e: 'update:description', value: string): void;
    (e: 'update:textColor', value: string): void;
    (e: 'update:showTitle', value: boolean): void;
    (e: 'update:showDescription', value: boolean): void;
    (e: 'update:titleFontSize', value: number): void;
    (e: 'update:descriptionFontSize', value: number): void;
    (e: 'download'): void;
  }>();
</script>

<style lang="scss">
  @import "Parameters";
</style>