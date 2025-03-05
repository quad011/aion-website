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
  <div class="m-testimonial-box flex flex-col sm:flex-row">
    <div
      class="overflow-hidden clip-path-rounded sm:w-1/3 sm:w-1/2 mb-5 sm:mb-0 h-full"
    >
      <div>
        <c-picture
          class="image h-full w-full flex aspect-square"
          innerClass="h-auto"
          :image="image"
          sizes="sm:375px md:768px lg:560px xl:768px"
          :alt="image?.alt || 'aion'"
        />
      </div>
    </div>
    <div class="sm:w-2/3 sm:w-1/2 sm:pl-5 lg:pl-10">
      <PrismicRichText
        :field="text"
        wrapper="div"
        class="text-base md:text-14 xl:text-32"
      />
      <p v-html="name" class="font-bold mt-4" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.m-box {
}
</style>
