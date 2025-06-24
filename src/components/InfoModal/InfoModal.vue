<template>
  <div v-if="props.isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 relative">
      <button
          @click="$emit('close')"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <i class="ri-close-line text-xl"></i>
      </button>

      <div class="text-center">
        <div class="mb-4">
          <i class="ri-information-line text-4xl text-blue-500 mb-2"></i>
          <h3 class="text-xl font-bold text-gray-800">À propos de CreaPost</h3>
        </div>

        <div class="space-y-4 text-sm text-gray-600">
          <div class="flex items-center justify-center space-x-2">
            <i class="ri-code-line text-purple-500"></i>
            <span>Développé par</span>
            <a
                href="https://yanisbelkadi.fr"
                target="_blank"
                rel="noopener noreferrer"
                class="text-purple-500 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              Yanis Belkadi
            </a>
          </div>

          <div class="flex items-center justify-center space-x-2">
            <i class="ri-lightbulb-line text-yellow-500"></i>
            <span>Une idée d'amélioration ?</span>
            <a
                href="mailto:belkadi.yanis.l@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-yellow-500 hover:text-yellow-600 font-medium transition-colors duration-200"
            >
              Contactez-moi
            </a>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-200">
          <p class="text-xs text-gray-400">
            © {{ currentYear }} CreaPost - Créez vos visuels facilement
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    isOpen: boolean;
  }>();

  defineEmits<{
    close: [];
  }>();

  const currentYear = computed(() => new Date().getFullYear());
</script>