<script setup>
import letters from "./lettersConfig";

const props = defineProps({
  title: {
    type: String,
  },
  link: {
    type: Object,
  },
  background_image: {
    type: Object,
  },
  lettersDecor: {
    type: Boolean,
    default: true,
  },
});

const heroHeight = ref("100vh");

onMounted(() => {
  nextTick(() => {
    heroHeight.value = `${window.innerHeight}px`;
  });
});
</script>

<template>
  <div
    :style="{ height: heroHeight }"
    class="o-hero-header flex items-end relative overflow-hidden text-white "
  >
    <!-- BG IMAGE -->
    <div class="w-full h-full absolute left-0 top-0">
      <c-animated-element class="h-full" :fromScale="1.1" :toScale="1">
        <c-parallax :factor="0.3">
          <c-picture
            class="h-full"
            :innerClass="!lettersDecor ? 'overlay' : ''"
            :image="background_image"
            sizes="sm:375px md:768px lg:1920px xl:2200px"
            :alt="background_image?.alt || 'aion'"
          />
        </c-parallax>
      </c-animated-element>
    </div>
    <!-- END :: BG IMAGE -->

    <div
      class="relative z-10 px-4 lg:px-20 py-4 lg:py-10 flex flex-col sm:flex-row sm:items-end"
    >
      <!-- TITLE -->
      <c-animated-element :fromY="50" :toY="0">
        <h1
          v-html="title"
          class="text-48 sm:text-72 lg:text-180 font-bold mb-5 md:mb-0"
        />
      </c-animated-element>
      <!-- END :: TITLE -->

      <!-- CONTACT BTN -->
      <div class="w-1/2 sm:w-1/3" v-if="link && link.url">
        <c-animated-element :fromY="50" :toY="0" :delay="0.1">
          <a-button :title="link?.text" :linkUrl="link?.url" />
        </c-animated-element>
      </div>
      <!-- END :: CONTACT BTN -->
    </div>

    <!-- LETTERS -->
    <c-animated-element
      v-if="lettersDecor"
      v-for="(letter, index) in letters"
      :key="index"
      :delay="index / 5"
      :class="`absolute ${letter.class}`"
    >
      <img
        :src="letter.img"
        class="h-[22vw] md:h-[12vw] w-auto object-contain"
        alt="aion"
      />
    </c-animated-element>
    <!-- END :: LETTERS -->
  </div>
</template>

<style lang="scss" scoped></style>
