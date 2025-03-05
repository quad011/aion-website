<script setup>
const appStore = useAppStore();
const { isMenuOpen } = storeToRefs(appStore);

const props = defineProps({
  item: Object,
  index: {
    type: [Number, String],
  },
});

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
    isMenuOpen.value = false;
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <div class="app-menu-item">
    <!-- @click.prevent="scrollToSection(item.link.url)" -->
    <nuxt-link @click.prevent="closeMenu" :to="item.link.uid" class="text-base">
      <span v-html="item.link.text" class="link" />
    </nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
.app-menu-item {
  .item {
    @apply transition-all duration-500;
    &:hover {
      letter-spacing: 0.1em;
    }
  }
}
</style>
