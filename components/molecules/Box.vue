<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  featured_image: {
    type: Object,
  },
  index: {
    type: Number,
  },
});

const colorConfig = {
  0: { class: "bg-lightBlue" },
  1: { class: "bg-lightGreen" },
  2: { class: "bg-blue" },
};
</script>

<template>
  <div class="m-box rounded-[1.5rem] sm:rounded-[3rem] overflow-hidden">
    <div class="flex aspect-[1.49] overflow-hidden">
      <c-picture
        class="image h-full"
        innerClass=""
        :image="featured_image"
        sizes="sm:375px md:768px lg:560px xl:768px"
        :alt="featured_image?.alt || 'aion'"
      />
    </div>

    <div
      :class="`px-5 md:px-10 lg:px-7 pb-5 md:pb-10 lg:pb-7 pt-16 lg:pt-24 ${colorConfig[index % 3]?.class}`"
    >
      <a-arrow-link
        :title="title"
        :innerClass="'text-32 sm:text-44 font-medium'"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.m-box {
}
</style>
