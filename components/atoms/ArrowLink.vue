<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  innerClass: {
    type: String,
  },
  linkUrl: {
    type: Object,
  },
});
onMounted(() => {});
</script>

<template>
  <div class="a-arrow-link overflow-hidden">
    <div class="flex items-end">
      <p v-html="title" :class="`title relative left-0 ${innerClass}`" />
      <a-arrow
        class="arrow w-10 lg:w-16 h-auto ml-5 relative left-0 stroke-black stroke-2"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.a-arrow-link {
}
</style>
