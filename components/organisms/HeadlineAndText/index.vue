<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  caption: {
    type: String,
  },
  text: {
    type: Array,
  },
});
</script>

<template>
  <div
    class="o-headline-and-text lg:flex relative overflow-hidden px-4 lg:px-20 my-10 lg:my-20"
  >
    <div class="lg:w-2/3 lg:pr-10 mb-10">
      <!-- TITLE -->
      <c-animated-element :fromY="50" :toY="0">
        <h2 v-html="title" class="text-32 lg:text-92 font-bold" />
      </c-animated-element>
      <!-- END :: TITLE -->
    </div>

    <div class="lg:w-1/3">
      <!-- CAPTION -->
      <c-animated-element :fromY="50" :toY="0" :delay="0.1">
        <h3
          v-html="caption"
          class="text-24 lg:text-32 font-bold text-blue mb-5"
        />
        <PrismicRichText
          :field="text"
          wrapper="div"
          class="leading-[1.2] lg:pr-5"
        />
      </c-animated-element>
      <!-- END :: CAPTION -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
