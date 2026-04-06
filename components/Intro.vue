<script setup>
import { gsap } from "gsap";

const progress = ref({ value: 0 });
const emit = defineEmits(["update:introVisible"]);

// Use GSAP animation
onMounted(() => {
  gsap.to(progress.value, {
    value: 100,
    ease: "power2.inOut",
    duration: 2,
    onComplete: () => {
      // console.log('animation ended');

      setTimeout(() => {
        emit("update:introVisible", false);
      }, 600);
    },
  });

  setTimeout(() => {}, 1000);
});
</script>

<template>
  <div
    class="intro h-screen w-screen bg-white fixed top-0 left-0 p-5 lg:p-12 overflow-hidden z-[101]"
  >
    <div class="flex justify-center items-center h-full relative">
      <div
        :style="{
          transform: `translateX(-${100 - progress.value}em)`,
          opacity: `${progress.value / 100}`,
        }"
      >
        <img
          src="/svg/a.svg"
          class="h-[2em] sm:h-[5.2em] w-auto object-contain"
          alt="aion"
        />
      </div>

      <div
        class="mx-5"
        :style="{
          transform: `translateY(${100 - progress.value}em)`,
          opacity: `${progress.value / 100}`,
        }"
      >
        <img
          src="/svg/i.svg"
          class="h-[2em] sm:h-[5em] w-auto object-contain"
          alt="aion"
        />
      </div>

      <div
        class="mr-5"
        :style="{
          transform: `translateY(-${100 - progress.value}em)`,
          opacity: `${progress.value / 100}`,
        }"
      >
        <img
          src="/svg/o.svg"
          class="h-[2em] sm:h-[5em] w-auto object-contain"
          alt="aion"
        />
      </div>

      <div
        :style="{
          transform: `translateX(${100 - progress.value}em)`,
          opacity: `${progress.value / 100}`,
        }"
      >
        <img
          src="/svg/n.svg"
          class="h-[2em] sm:h-[5em] w-auto object-contain"
          alt="aion"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.intro {
  z-index: 100;
  // opacity: 0.9;

  .loader-font {
    font-size: 1.35vw;
  }
}
</style>
