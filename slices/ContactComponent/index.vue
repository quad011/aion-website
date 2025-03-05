<script setup>
const props = defineProps({
  slice: Object,
});
const { getPrimary } = useSlice(props.slice);
</script>

<template>
  <o-contact-component
    :title="getPrimary('title')"
    :text="getPrimary('text')"
  />
</template>
