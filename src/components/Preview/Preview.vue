<template>
  <div class="p-4 bg-gray-200 flex items-center justify-center">
    <div ref="previewRef" :style="previewStyle" class="relative shadow-lg overflow-hidden rounded-2xl">
      <img :src="selectedImage" alt="Image" class="w-full h-full object-cover" />
      <div :class="textContainerClass">
        <h1 v-if="state.showTitle" :style="{ fontSize: `${state.titleFontSize}px` }" class="font-bold mb-2">{{ state.title }}</h1>
        <p v-if="state.showDescription" :style="{ fontSize: `${state.descriptionFontSize}px` }">{{ state.description }}</p>
      </div>
      <!-- Affichage conditionnel du bouton d'import d'image -->
      <label v-if="showUploadButton" class="absolute top-4 right-4 cursor-pointer">
        <input type="file" class="hidden" @change="handleImageUpload" accept="image/*" />
        <div class="bg-white text-black shadow-lg rounded-full p-1 hover:bg-gray-100 flex items-center justify-center w-8 h-8">
          <span><i class="ri-upload-line"></i></span>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, defineExpose } from 'vue';
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
    switch (format) {
      case 'portrait16_9':
        return { width: 360, height: 640 }; // 16:9 en mode portrait
      case 'instaPortrait':
        return { width: 480, height: 600 }; // 4:5 en mode portrait
      default:
        return { width: 360, height: 640 }; // Par défaut, 16:9 en mode portrait
    }
  }

  const showUploadButton = ref(true);

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

  defineExpose({
    previewRef,
    hideUploadButton: () => showUploadButton.value = false,
    showUploadButton: () => showUploadButton.value = true
  });
</script>

<style lang="scss">
  @import "Preview";
</style>
