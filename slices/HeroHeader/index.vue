<script setup>
const props = defineProps({
  slice: Object,
});
const { getPrimary, items } = useSlice(props.slice);
</script>

<template>
  <o-hero-header
    :title="getPrimary('title')"
    :link="getPrimary('link')"
    :background_image="getPrimary('background_image')"
  />
</template>
