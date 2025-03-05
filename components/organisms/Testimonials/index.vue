<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";

const props = defineProps({
  title: {
    type: String,
  },
  items: {
    type: Object,
  },
});

const swiper = ref(0);
const currentIndex = ref(0);

const onSwiper = (swiperSlider) => {
  swiper.value = swiperSlider;
};
const next = () => {
  swiper.value.slideNext();
};
const prev = () => {
  swiper.value.slidePrev();
};
const onSlideChange = (index) => {
  currentIndex.value = index.activeIndex;
};

onMounted(() => {});
</script>

<template>
  <div
    class="o-testimonials px-4 lg:px-20 pt-20 lg:pt-24 pb-20 lg:pb-32 gradient-top-bottom gradient-top-bottom--0"
  >
    <div class="relative z-10">
      <!-- TITLE -->
      <c-animated-element :fromY="50" :toY="0">
        <h2
          v-html="title"
          class="text-40 sm:text-72 lg:text-96 font-bold mb-20"
        />
      </c-animated-element>
      <!-- END :: TITLE -->

      <!-- SWIPER -->
      <Swiper
        @slideChange="onSlideChange"
        @swiper="onSwiper"
        class="swiper-wrapper !h-auto w-full"
        :speed="700"
        :grab-cursor="true"
        :loop="true"
        :delay="0.1"
        :breakpoints="{
          slidesPerView: 1,
          spaceBetween: 10,
          1024: { slidesPerView: 2, spaceBetween: 50 },
        }"
      >
        <SwiperSlide
          v-for="(item, index) in [...items, ...items]"
          :key="index"
          class="flex h-full pr-5 lg:pr-0"
        >
          <c-animated-element :fromY="50" :toY="0" :delay="index * 0.2">
            <m-testimonial-box
              :image="item.image"
              :text="item.text"
              :name="item.name"
            />
          </c-animated-element>
        </SwiperSlide>
      </Swiper>
      <!-- END :: SWIPER -->

      <!-- NAVIGATION -->
      <c-animated-element :fromY="50" :toY="0" :delay="0.1">
        <div class="flex items-center justify-end mt-16 lg:mt-24">
          <div
            @click="prev"
            class="arrow w-[3rem] h-[3rem] prev cursor-pointer mr-5 lg:mr-2"
          >
            <a-arrow
              class="w-full h-full p-3 -rotate-180 stroke-blue stroke-[6px] border border-blue rounded-full hover:stroke-white hover:bg-blue transition-colors"
            />
          </div>

          <div
            @click="next"
            class="arrow w-[3rem] h-[3rem] next cursor-pointer"
          >
            <a-arrow
              class="w-full h-full p-3 stroke-white stroke-[6px] bg-blue border border-blue rounded-full hover:stroke-blue hover:bg-white transition-colors"
            />
          </div>
        </div>
      </c-animated-element>
      <!-- END :: NAVIGATION -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
