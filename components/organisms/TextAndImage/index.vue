<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  image: {
    type: Object,
  },
  link: {
    type: Object,
  },
  caption: {
    type: String,
  },
  text: {
    type: Array,
  },
});

onMounted(() => {});
</script>

<template>
  <div
    class="o-text-and-image overflow-hidden bg-darkBlue px-4 lg:px-24 py-20 lg:py-32 lg:flex relative"
  >
    <div class="lg:w-1/2 lg:pr-24 relative z-10 mb-10 lg:mb-0">
      <!-- CAPTION -->
      <c-animated-element :fromY="50" :toY="0">
        <p v-html="caption" class="text-blue text-32 font-bold mb-8" />
      </c-animated-element>
      <!-- END :: CAPTION -->

      <!-- TITLE -->
      <c-animated-element :fromY="50" :toY="0" :delay="0.1">
        <h1
          v-html="title"
          class="text-40 sm:text-50 xl:text-60 font-bold text-white !leading-[1.1]"
        />
      </c-animated-element>
      <!-- END :: TITLE -->

      <!-- TEXT -->
      <c-animated-element :fromY="50" :toY="0" :delay="0.2">
        <PrismicRichText
          :field="text"
          wrapper="div"
          class="text-white font-bold mt-8 leading-[1.2] lg:text-base"
        />
      </c-animated-element>

      <div class="flex w-1/2 sm:w-1/3 mt-5">
        <c-animated-element :fromY="50" :toY="0" :delay="0.3" class="w-full">
          <a-button class="w-full" :title="link.text" :linkUrl="link.url" />
        </c-animated-element>
      </div>
    </div>

    <!-- IMAGE -->
    <div
      v-if="image && image.url"
      class="lg:w-1/2 image-wrapper overflow-hidden aspect-[1.5] clip-path-rounded relative z-10"
    >
      <c-animated-element :fromScale="1.1" :toScale="1" class="h-full">
        <c-parallax :factor="0.3" :rounded="true">
          <c-picture
            class="h-full"
            innerClass=""
            :image="image"
            sizes="sm:375px md:768px lg:1920px xl:2200px"
            :alt="image?.alt || 'aion'"
          />
        </c-parallax>
      </c-animated-element>
    </div>
    <!-- END :: IMAGE -->

    <!-- BG DECOR -->
    <div class="absolute left-[-10%] bottom-0 w-[120%] pointer-events-none">
      <c-scrolling-element
        :fromX="'-10vw'"
        :toX="'10vw'"
        startPosition="top bottom"
        endPosition="bottom top"
      >
        <c-picture
          class="w-full"
          innerClass=""
          src="/svg/aion.svg"
          sizes="sm:375px md:768px lg:1920px xl:2200px"
          :alt="image?.alt || 'aion'"
        />
      </c-scrolling-element>
    </div>
    <!-- END :: BG DECOR -->
  </div>
</template>

<style lang="scss" scoped>
.o-text-and-image {
}
</style>
