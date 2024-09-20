<template>
  <div class="p-4 bg-gray-200 flex items-center justify-center">
    <div ref="previewRef" :style="previewStyle" class="relative rounded-lg shadow-lg overflow-hidden">
      <img :src="selectedImage" alt="Image" class="w-full h-full object-cover" />
      <div :class="textContainerClass">
        <h1 v-if="state.showTitle" :style="{ fontSize: `${state.titleFontSize}px` }" class="font-bold mb-2">{{ state.title }}</h1>
        <p v-if="state.showDescription" :style="{ fontSize: `${state.descriptionFontSize}px` }">{{ state.description }}</p>
      </div>
      <label class="absolute top-4 right-4 cursor-pointer">
        <input type="file" class="hidden" @change="handleImageUpload" accept="image/*" />
        <div class="bg-white shadow-lg rounded-full hover:bg-gray-100">
          <span> <i class="ri-upload-line"></i> </span>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ImageCustomizerState } from '@/types/type';

import imgSrc from '@/assets/images/image-example.webp';

const props = defineProps<{
  state: ImageCustomizerState;
}>();

const emit = defineEmits<{
  (e: 'update:selectedImage', value: string): void;
}>();

const previewRef = ref<HTMLDivElement | null>(null);

const selectedImage = computed(() => {
  console.log('mdr', imgSrc);
  console.log(props.state.selectedImage)
  return props.state.selectedImage || imgSrc;
});

const previewStyle = computed(() => {
  const { width, height } = getFormatDimensions(props.state.format);
  return { width: `${width}px`, height: `${height}px` };
});

const textContainerClass = computed(() => [
  'absolute left-0 right-0 p-6',
  props.state.textColor === 'white' ? 'text-white' : 'text-black',
  props.state.textPosition === 'top' ? 'top-0' : 'bottom-0'
]);


function getFormatDimensions(format: string) {
  switch(format) {
    case 'tiktok':
    case 'instaStory':
      return { width: 360, height: 640 }; // 9:16
    case 'instaPortrait':
      return { width: 480, height: 600 }; // 4:5
    default:
      return { width: 360, height: 640 };
  }
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      emit('update:selectedImage', e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style lang="scss">
@import "Preview";
</style>
