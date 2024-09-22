<template>
  <div class="flex h-screen w-screen bg-gray-100">
    <WelcomePopup/>
    <ImageCustomizer/>
  </div>
</template>

<script setup lang="ts">
  import ImageCustomizer from './components/ImageCustomer/ImageCustomer.vue';
  import WelcomePopup from "@/components/WelcomePopup/WelcomePopup.vue";
</script>