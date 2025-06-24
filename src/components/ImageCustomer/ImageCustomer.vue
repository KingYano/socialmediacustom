<template>
  <div class="flex flex-col lg:flex-row h-auto lg:h-screen w-screen bg-gray-100">
    <Parameters
        class="w-full h-auto lg:h-full lg:w-2/5"
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
        class="w-full lg:w-3/5 h-auto lg:h-full"
        :state="state"
        @update:selectedImage="state.selectedImage = $event"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import Parameters from './../Parameters/Parameters.vue';
  import Preview from './../Preview/Preview.vue';
  import type { ImageCustomizerState } from '@/types/type';
  import imgSrc from '@/assets/images/image-example.webp';

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
    const { width, height } = getFormatDimensions(state.format);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = state.selectedImage || imgSrc;
      });

      const imgAspect = img.width / img.height;
      const canvasAspect = width / height;

      let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

      if (imgAspect > canvasAspect) {
        drawHeight = height;
        drawWidth = height * imgAspect;
        offsetX = (width - drawWidth) / 2;
      } else {
        drawWidth = width;
        drawHeight = width / imgAspect;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      ctx.fillStyle = state.textColor;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      const padding = 24;
      let yPosition = state.textPosition === 'top' ? padding : height - padding;

      if (state.showTitle) {
        ctx.font = `bold ${state.titleFontSize}px Poppins, sans-serif`;
        if (state.textPosition === 'bottom') {
          yPosition -= state.titleFontSize;
        }
        ctx.fillText(state.title, padding, yPosition);

        if (state.textPosition === 'top') {
          yPosition += state.titleFontSize + 8;
        } else {
          yPosition -= 8;
        }
      }

      if (state.showDescription) {
        ctx.font = `${state.descriptionFontSize}px Poppins, sans-serif`;
        if (state.textPosition === 'bottom') {
          yPosition -= state.descriptionFontSize;
        }

        const words = state.description.split(' ');
        const lines = [];
        let currentLine = '';
        const maxWidth = width - (padding * 2);

        for (const word of words) {
          const testLine = currentLine + (currentLine ? ' ' : '') + word;
          if (ctx.measureText(testLine).width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) lines.push(currentLine);

        lines.forEach((line, index) => {
          const lineY = state.textPosition === 'top'
              ? yPosition + (index * state.descriptionFontSize * 1.2)
              : yPosition - ((lines.length - 1 - index) * state.descriptionFontSize * 1.2);
          ctx.fillText(line, padding, lineY);
        });
      }

      const dataURL = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `creapost_${Date.now()}.png`;
      link.click();

    } catch (error) {
      console.error('Erreur lors de la génération de l\'image:', error);
    }
  };

  function getFormatDimensions(format: string) {
    switch (format) {
      case 'portrait16_9':
        return { width: 360, height: 640 };
      case 'instaPortrait':
        return { width: 480, height: 600 };
      default:
        return { width: 360, height: 640 };
    }
  }
</script>

<style lang="scss">
  @import "ImageCustomer";
</style>