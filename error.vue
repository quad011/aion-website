<script setup>
const error = useError();
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div
    class="error bg-white fixed left-0 top-0 w-full h-full flex flex-col flex-center"
  >
    <h1
      class="text-92 md:text-180 lg:text-[25rem] font-medium flex items-center md:mb-5 lg:mb-0"
    >
      <c-animated-element :fromY="50" :toY="0">
        <span>4</span>
      </c-animated-element>
      <c-animated-element :fromY="-50" :toY="0">
        <img
          src="/svg/a.svg"
          class="h-[.75em] w-auto object-contain mx-1"
          alt="aion"
        />
      </c-animated-element>

      <c-animated-element :fromY="50" :toY="0">
        <span>4</span>
      </c-animated-element>
    </h1>
    <c-animated-element :fromY="50" :toY="0" :delay="0.3">
      <h2 class="text-24 md:text-60 lg:text-92 mb-5">Page not found</h2>
    </c-animated-element>
    <c-animated-element :fromY="50" :toY="0" :delay="0.4">
      <a-button @click="handleError" title="Go Back" class="!px-10" />
    </c-animated-element>
  </div>
</template>
