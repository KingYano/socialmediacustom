<template>
  <div class="flex h-screen w-screen bg-gray-100">
    <Parameters
      class="w-1/3"
      :format="state.format"
      :title="state.title"
      :description="state.description"
      :textColor="state.textColor"
      :showTitle="state.showTitle"
      :showDescription="state.showDescription"
      :titleFontSize="state.titleFontSize"
      :descriptionFontSize="state.descriptionFontSize"
      :textPosition="state.textPosition"
      @update:format="state.format = $event as 'tiktok' | 'instaPortrait'"
      @update:title="state.title = $event"
      @update:description="state.description = $event"
      @update:textColor="state.textColor = $event as 'white' | 'black'"
      @update:showTitle="state.showTitle = $event"
      @update:showDescription="state.showDescription = $event"
      @update:titleFontSize="state.titleFontSize = $event"
      @update:descriptionFontSize="state.descriptionFontSize = $event"
      @update:textPosition="state.textPosition = $event as 'top' | 'bottom'"
      @download="handleDownload"
    />
    <Preview
        ref="previewComponentRef"
        class="w-2/3"
        :state="state"
        @update:selectedImage="state.selectedImage = $event"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, nextTick } from 'vue';
  import html2canvas from 'html2canvas';
  import Parameters from './../Parameters/Parameters.vue';
  import Preview from './../Preview/Preview.vue';
  import type { ImageCustomizerState } from '@/types/type';

  const previewComponentRef = ref();

  const state = reactive<ImageCustomizerState>({
    title: 'Beautiful world',
    description: 'Discover the mythical sunken ship wreck',
    textColor: 'white' as 'white' | 'black',
    showTitle: true,
    showDescription: true,
    titleFontSize: 24,
    descriptionFontSize: 18,
    selectedImage: '',
    format: 'tiktok' as 'tiktok' | 'instaPortrait',
    textPosition: 'bottom',
  });

  const handleDownload = async () => {
    const previewElement = previewComponentRef.value?.$refs.previewRef;

    previewComponentRef.value?.hideUploadButton();

    await nextTick();

    previewElement.classList.remove('rounded-2xl');

    const canvas = await html2canvas(previewElement);
    const image = canvas.toDataURL('image/png');

    previewElement.classList.add('rounded-2xl');

    const link = document.createElement('a');
    link.href = image;
    link.download = 'custom_image.png';
    link.click();

    previewComponentRef.value?.showUploadButton();
  };
</script>

<style lang="scss">
  @import "ImageCustomer";
</style>