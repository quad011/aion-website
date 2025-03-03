<script setup>
const props = defineProps({
  slice: Object,
});
const { getPrimary } = useSlice(props.slice);
</script>

<template>
  <o-text-and-image
    :caption="getPrimary('caption')"
    :title="getPrimary('title')"
    :image="getPrimary('image')"
    :link="getPrimary('link')"
    :text="getPrimary('text')"
  />
</template>
