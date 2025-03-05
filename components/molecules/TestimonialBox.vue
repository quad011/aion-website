<script setup>
const props = defineProps({
  text: {
    type: Array,
  },
  image: {
    type: Object,
  },
  name: {
    type: String,
  },
});
</script>

<template>
  <div class="m-testimonial-box flex">
    <div class="flex aspect-square overflow-hidden clip-path-rounded w-1/2">
      <c-picture
        class="image h-full"
        innerClass=""
        :image="image"
        sizes="sm:375px md:768px lg:560px xl:768px"
        :alt="image?.alt || 'aion'"
      />
    </div>
    <div class="w-1/2 text-32 pl-10">
      <PrismicRichText :field="text" />
      <p v-html="name" class="font-bold mt-4" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.m-box {
}
</style>
