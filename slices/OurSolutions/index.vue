<script setup>
const props = defineProps({
  slice: Object,
});
const { getPrimary, items } = useSlice(props.slice);
</script>

<template>
  <o-our-solutions
    :title="getPrimary('title')"
    :image="getPrimary('image')"
    :link="getPrimary('link')"
    :items="getPrimary('items')"
  />
</template>
