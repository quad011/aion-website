<script setup>
import gsap from "gsap";
const props = defineProps({
  title: {
    type: String,
  },
  btnBg: {
    type: String,
    default: "blue",
  },
  linkUrl: {
    type: String,
  },
  submitBtn: {
    type: Boolean,
    default: false,
  },
});
onMounted(() => {
  const buttons = gsap.utils.toArray(".a-button");
  buttons.forEach((item) => {
    let span = item.querySelector("p");
    let tl = gsap.timeline({ paused: true });

    tl.to(span, { duration: 0.2, yPercent: -150, ease: "power2.in" });
    tl.set(span, { yPercent: 150 });
    tl.to(span, { duration: 0.2, yPercent: 0 });

    item.addEventListener("mouseenter", () => tl.play(0));
    item.addEventListener("mouseleave", () => tl.reverse());
  });
});
</script>

<template>
  <component
    :is="linkUrl ? 'a' : 'button'"
    :href="linkUrl"
    target="_blank"
    :class="`a-button bg-${btnBg} px-5 lg:px-12 py-3 lg:py-5 flex items-center justify-center pointer-events-auto overflow-hidden rounded-full`"
  >
    <p v-html="title" class="text-14 lg:text-base text-white font-bold" />
  </component>
</template>

<style lang="scss" scoped>
.a-button {
  //   @apply relative;
  //   &::after {
  //     content: "";
  //     @apply absolute left-0 top-0 w-full h-full bg-black -translate-x-full z-10 transition-transform;
  //   }
  //   &:hover {
  //     &::after {
  //       @apply translate-x-0;
  //     }
  //   }
}
</style>
