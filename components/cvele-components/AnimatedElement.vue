<script setup>
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const props = defineProps({
  fromY: {
    type: [String, Number],
    default: 0,
  },
  toY: {
    type: [String, Number],
    default: 0,
  },
  fromX: {
    type: [String, Number],
    default: 0,
  },
  toX: {
    type: [String, Number],
    default: 0,
  },
  fromScale: {
    type: Number,
  },
  toScale: {
    type: Number,
  },
  delay: {
    type: Number,
    default: 0,
  },
});

// Register GSAP plugin
if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const animatedElement = ref(null);

onMounted(async () => {
  await nextTick(); // Ensures the DOM is fully ready before GSAP runs

  if (animatedElement.value) {
    gsap.fromTo(
      animatedElement.value,
      {
        opacity: 0,
        y: props.fromY,
        x: props.fromX,
        scale: props.fromScale,
      },
      {
        opacity: 1,
        y: props.toY,
        x: props.toX,
        scale: props.toScale,
        duration: 1,
        delay: props.delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: animatedElement.value,
          start: props.triggerStart,
          toggleActions: "play none none none",
        },
      }
    );
  }
});
</script>

<template>
  <div ref="animatedElement" class="animated-element">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.animated-element {
  opacity: 0.0001;
}
</style>
