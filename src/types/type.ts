export interface ImageCustomizerState {
    title: string;
    description: string;
    textColor: 'white' | 'black';
    showTitle: boolean;
    showDescription: boolean;
    titleFontSize: number;
    descriptionFontSize: number;
    selectedImage: string;
    format: 'tiktok' | 'instaPortrait';
    textPosition: 'top' | 'bottom';
}