<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const props = defineProps({
  rounded: {
    type: Boolean,
    default: false,
  },
});

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

onMounted(() => {
  gsap.utils.toArray(".image-container").forEach((container) => {
    const image = container.querySelector(".img");

    if (!image) {
      console.error("Image element not found in container");
      return;
    }

    gsap
      .timeline({
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
      .fromTo(image, { yPercent: -30 }, { yPercent: 30, ease: "none" });
  });
});
</script>

<template>
  <div
    :class="`c-parallax image-container relative w-full h-full clip-path-${rounded ? 'rounded' : ''}`"
  >
    <div
      :class="`img w-full h-full overflow-hidden clip-path-${rounded ? 'rounded' : ''}`"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
