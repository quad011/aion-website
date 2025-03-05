<script setup>
import { PrismicLink } from "#components";

const appStore = useAppStore();
const { appData, fontsLoaded, isMenuOpen } = storeToRefs(appStore);

const scrollingStore = useScrollingStore();
const { navigationVisible, scrollingStarted } = storeToRefs(scrollingStore);

function scrollToTop() {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });

  // Remove the hash from the URL after scrolling to the top
  setTimeout(() => {
    history.pushState(null, null, window.location.pathname);
  }, 500); // Delay to allow smooth scrolling
}

const scrollToSection = (hash) => {
  const element = document.querySelector(hash);
  if (element) {
    const offset = 100;
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });

    history.pushState(null, null, hash);
  }
};

onMounted(() => {
  // console.log("appData", appData);
  window.addEventListener("scroll", () => {
    if (window.scrollY === 0) {
      history.pushState(null, null, window.location.pathname);
    }
  });
});
</script>

<template>
  <div
    :class="[
      !navigationVisible ? '-translate-y-full' : 'translate-y-0',
      'transition-all duration-500 fixed w-full left-0 top-0 z-50',
    ]"
  >
    <header
      :class="{
        'app-header--shrink': scrollingStarted,
        'gradient-drop': !isMenuOpen,
      }"
      class="app-header px-4 lg:px-20 py-4 lg:py-10 fixed top-0 left-0 w-full flex items-start justify-between text-white mix-blend-difference z-[100] pointer-events-none transition-all duration-500"
    >
      <!-- LOGO -->
      <nuxt-link to="/" class="cursor-pointer pointer-events-auto">
        <a-logo
          :class="`logo w-[20vw] sm:w-[12.33vw] object-contain transition-all duration-500 ${isMenuOpen ? 'fill-darkBlue' : 'fill-white'}`"
        />
      </nuxt-link>
      <!-- END :: LOGO -->

      <div class="flex items-center">
        <div class="hidden lg:flex pointer-events-auto font-medium">
          <nuxt-link to="/" class="mr-5 text-14 lg:text-base">
            <span v-html="'Home'" class="link" />
          </nuxt-link>

          <nuxt-link
            v-for="item in appData?.data?.main_navigation"
            :key="item.key"
            :to="item.link.uid"
            class="mr-5 last:mr-0 text-14 lg:text-base"
          >
            <span v-html="item.link.text" class="link" />
          </nuxt-link>
        </div>

        <div class="flex justify-end lg:hidden">
          <app-hamburger
            class="flex justify-end pointer-events-auto"
            :isMenuOpen="isMenuOpen"
            @click="isMenuOpen = !isMenuOpen"
            @keydown.esc="isMenuOpen = false"
          />
        </div>
      </div>
    </header>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  &.gradient-drop {
    background: rgb(0, 0, 0);
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }
  &--shrinked {
    @screen lg {
      @apply px-5 py-5;
      .logo {
        @apply lg:w-[3vw];
      }
    }
  }
}
</style>
