import { ref } from 'vue';
import type { ImageCustomizerState } from '@/types/type';

export function useImageCustomizer() {
    const state = ref<ImageCustomizerState>({
        title: 'Beautiful world',
        description: 'Discover the mythical sunken ship wreck',
        textColor: 'white',
        showTitle: true,
        showDescription: true,
        titleFontSize: 24,
        descriptionFontSize: 18,
        selectedImage: '/api/placeholder/800/600',
        format: 'tiktok'
    });

    function handleImageUpload(event: Event) {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                state.value.selectedImage = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    function handleDownload() {
        // Implement download functionality here
        console.log('Download image');
    }

    return {
        ...state.value,
        handleImageUpload,
        handleDownload
    };
}