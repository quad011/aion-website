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
  <div class="o-our-solutions px-4 lg:px-20 mb-20 lg:mb-32 overflow-hidden">
    <!-- IMAGE -->
    <div
      v-if="image && image.url"
      class="image-wrapper overflow-hidden aspect-video lg:aspect-[2.3] my-20 rounded-[1.5rem] lg:rounded-[3rem] relative z-10"
    >
      <c-animated-element :fromScale="1.1" :toScale="1" class="h-full">
        <c-parallax :factor="0.3">
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
        <h1 v-html="title" class="text-40 sm:text-72 lg:text-92 font-bold" />
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
    <div class="flex flex-col lg:flex-row sm:-mx-5 relative z-10">
      <PrismicLink
        v-for="(item, index) in items"
        :key="index"
        :field="item.solution"
        class="w-full lg:w-1/3 sm:px-5 link-wrapper mb-5 sm:mb-10 lg:mb-0 last:mb-0"
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

<style lang="scss" scoped>
.o-our-solutions {
  @apply relative;
  &::after {
    content: "";
    @apply absolute left-0 top-[10%] lg:top-[20%] w-screen h-full pointer-events-none;
    background: rgb(218, 232, 254);
    background: linear-gradient(
      180deg,
      rgba(218, 232, 254, 1) 0%,
      rgba(218, 232, 254, 0) 100%
    );
  }
}
</style>
