<script setup>
import { useAppStore } from "@/stores/app";
import { useRoute } from "vue-router";
import appConfig from "~/config/app";

const appStore = useAppStore();

const route = useRoute();

const pageTitle = ref("Default Title"); // Default title

watchEffect(() => {
  // Example: If slug exists, dynamically fetch page data or use slug as title
  if (route.params.uid) {
    // Dynamically set the title based on route parameters (slug in this case)
    pageTitle.value = route.params.uid; // Or fetch from an API here if needed
  } else {
    pageTitle.value = "Home"; // Default title for home or index page
  }
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: `${appConfig.site_name} - ${pageTitle.value}`,
});

onMounted(async () => {
  // Fetch globally on app load
  await appStore.fetchAppData();
  // console.log("pageTitle", route);
});
</script>

<template>
  <div class="app h-full w-full">
    <NuxtLayout class="w-full h-full bg-white2">
      <NuxtPage class="w-full h-full" />
    </NuxtLayout>
  </div>
</template>
