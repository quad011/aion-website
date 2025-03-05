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
  items: {
    type: Object,
  },
});

onMounted(() => {});
</script>

<template>
  <div
    class="o-our-solutions px-4 lg:px-20 mb-20 lg:mb-32 overflow-hidden gradient-top-bottom"
  >
    <!-- IMAGE -->
    <div
      v-if="image && image.url"
      class="image-wrapper overflow-hidden aspect-video lg:aspect-[2.3] clip-path-rounded my-10 lg:my-20 relative z-10"
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

    <div
      class="flex flex-row items-center justify-between relative z-10 mb-10 lg:mb-20"
    >
      <!-- TITLE -->
      <c-animated-element :fromY="50" :toY="0">
        <h1 v-html="title" class="text-40 sm:text-60 lg:text-92 font-bold" />
      </c-animated-element>
      <!-- END :: TITLE -->

      <!-- CIRCLE LINK -->
      <c-animated-element v-if="link && link.url" :fromScale="0.1" :toScale="1">
        <PrismicLink :field="link">
          <div
            class="relative w-[5.4rem] lg:w-[9.4rem] h-[5.4rem] lg:h-[9.4rem]"
          >
            <c-rotating-element>
              <img src="/svg/curve-text.svg" alt="aion" />
            </c-rotating-element>
            <img
              src="/svg/arrow.svg"
              alt="aion"
              class="absolute center w-8 lg:w-16 h-auto"
            />
          </div>
        </PrismicLink>
      </c-animated-element>
      <!-- END ::  CIRCLE LINK -->
    </div>

    <!-- SOLUTIONS -->
    <div class="flex flex-col sm:flex-row sm:-mx-2 lg:-mx-5 relative z-10">
      <PrismicLink
        v-for="(item, index) in items"
        :key="index"
        :field="item.solution"
        class="w-full sm:w-1/3 sm:px-2 lg:px-5 link-wrapper mb-5 sm:mb-0 last:mb-0"
      >
        <c-animated-element :fromY="50" :toY="0" :delay="index / 10">
          <m-box
            :title="item?.solution?.data?.title"
            :featured_image="item?.solution?.data?.featured_image"
            :index="index"
          />
        </c-animated-element>
      </PrismicLink>
    </div>
    <!-- END :: SOLUTIONS -->
  </div>
</template>

<style lang="scss">
.o-our-solutions {
  .link-wrapper {
    .arrow {
      transition: left 0.4s;
    }
    .image {
      transition: transform 0.4s;
    }
    &:hover {
      .arrow {
        @apply -left-2;
      }
      .image {
        transform: scale(1.05);
      }
    }
  }
}
</style>
