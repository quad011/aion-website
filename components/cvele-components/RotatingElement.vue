<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const props = defineProps({});

// Register GSAP plugin
if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

onMounted(async () => {
  const rotatingText = document.querySelector(".rotating-element");

  const t = gsap.to(rotatingText, {
    rotation: 360,
    duration: 40,
    ease: "none",
    repeat: -1,
  });
  t.iteration(1000);

  const speedFactor = 5;
  let tl;

  var rotate = gsap.timeline({
    scrollTrigger: {
      trigger: "html",
      start: "top top",
      end: "+=10000",
      onUpdate: (self) => {
        tl && tl.kill();
        tl = gsap
          .timeline()
          .to(t, { timeScale: speedFactor * self.direction, duration: 0.1 })
          .to(t, { timeScale: self.direction, duration: 1 }, "+=0.5");
      },
    },
  });
});
</script>

<template>
  <div class="rotating-element">
    <slot />
  </div>
</template>
