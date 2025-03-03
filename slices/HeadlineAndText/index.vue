<script setup>
const props = defineProps({
  slice: Object,
});
const { getPrimary } = useSlice(props.slice);
</script>

<template>
  <o-headline-and-text
    :title="getPrimary('title')"
    :caption="getPrimary('caption')"
    :text="getPrimary('text')"
  />
</template>
