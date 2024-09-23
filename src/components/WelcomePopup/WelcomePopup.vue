<template>
  <div v-if="showPopup" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 class="text-2xl font-bold mb-4">Bienvenue sur CreaPost !</h2>
      <div class="mb-4">
        <p class="mb-3">Créez des cartes graphiques personnalisées en quelques clics !</p>
        <p><span class="font-bold">1.</span> Importez une illustration depuis votre ordinateur.</p>
        <p><span class="font-bold">2.</span> Personnalisez les couleurs pour qu'elles s'harmonisent avec votre style ou votre marque.</p>
        <p><span class="font-bold">3.</span> Ajoutez du texte pour créer des visuels impactants pour vos projets personnels ou professionnels.</p>
        <p><span class="font-bold">4.</span> Téléchargez votre carte et utilisez-la immédiatement sur vos réseaux sociaux, dans des présentations ou ailleurs.</p>
        <p class="mt-3">Pas besoin d'être designer pour créer des visuels professionnels !</p>
      </div>
      <div class="flex items-center mb-4">
        <ToggleSwitch label="Ne plus afficher ce message à chaque ouverture"  v-model="dontShowAgain" />
      </div>
      <button @click="closePopup" class="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-600 transition">Commencer</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import ToggleSwitch from "@/components/ToggleSwitch/ToggleSwitch.vue";

  export default defineComponent({
    components: {ToggleSwitch},
    setup() {
      const showPopup = ref(true);
      const dontShowAgain = ref(false);

      onMounted(() => {
        const savedPreference = localStorage.getItem('dontShowWelcomePopup');
        if (savedPreference === 'true') {
          showPopup.value = false;
        }
      });

      const closePopup = () => {
        if (dontShowAgain.value) {
          localStorage.setItem('dontShowWelcomePopup', 'true');
        }
        showPopup.value = false;
      };

      return {
        showPopup,
        dontShowAgain,
        closePopup,
      };
    },
  });
</script>

<style lang="scss">

</style>
