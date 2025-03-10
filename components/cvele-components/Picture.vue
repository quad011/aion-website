<script setup>
import { ref } from "vue";

const props = defineProps({
  image: {
    type: Object,
  },
  src: {
    type: String,
  },
  alt: {
    type: String,
  },
  imgAttrs: {
    type: Object,
    default: () => ({}),
  },
  quality: {
    type: [Number, String],
    default: 80,
  },
  densities: {
    type: String,
    default: "1x",
  },
  sizes: {
    type: String,
    default: "sm:375px md:768px lg:1920px xl:2200px",
  },
  useOriginalRatio: {
    type: Boolean,
    default: false,
  },
  multiplier: {
    type: Number,
    default: 1.25,
  },
  loading: {
    type: String,
    default: "lazy",
  },
  innerClass: {
    type: String,
  },
});

const el = ref(null);

const _loading = ref(props.loading);
const toggleVisible = (opts) => {
  // if (opts.visible && !isMobileOrTablet) {
  _loading.value = "eager";
  // }
};

const elStyle = computed(() => {
  try {
    const aspectRatio =
      props.useOriginalRatio && props.image
        ? `${props.image?.dimensions.width} / ${props.image?.dimensions.height}`
        : 0;

    return {
      aspectRatio,
    };
  } catch (e) {
    console.warn("no dimensions:", props.image);
  }
});

const imageAttributes = computed(() => {
  let classes = props.imgAttrs?.class;

  classes += props.useOriginalRatio
    ? " absolute w-full h-full top-0 left-0"
    : " w-full h-full";

  return {
    ...props.imgAttrs,
    class: classes,
  };
});

const isLoaded = ref(false);
const handleLoad = () => {
  isLoaded.value = true;
};

const cleanImageUrl = (url) => {
  if (!url) return "";
  return url.replace(/^\/(?!\/)/, ""); // Removes only single leading slashes, not protocol slashes
};

onMounted(() => {
  setTimeout(() => {
    _loading.value = "eager";
  }, 5000);
});
</script>

<template>
  <div ref="el" :style="elStyle" class="c-picture-wrapper">
    <nuxt-picture
      v-if="src || image?.url"
      :key="_loading"
      :loading="_loading"
      :densities="densities"
      class="c-picture block relative h-full w-full"
      :class="[innerClass, { 'image-loaded': isLoaded }]"
      @load="handleLoad"
      :imgAttrs="imageAttributes"
      :sizes="sizes"
      :quality="quality"
      :src="
        src ? cleanImageUrl(src) : image?.url ? cleanImageUrl(image.url) : ''
      "
      :alt="alt || image?.alt"
    />
    <div
      v-if="!isLoaded"
      class="placeholder absolute w-full h-full flex items-center justify-center"
    >
      <c-spinner />
    </div>
  </div>
</template>

<style lang="scss">
.c-picture-wrapper {
  .c-picture {
    img {
      @apply object-cover;
      transition: opacity 0.3s ease;
    }
    &.image-loaded {
      opacity: 1;
    }
    &.overlay {
      &::after {
        content: "";
        @apply absolute left-0 top-0 w-full h-full bg-black opacity-30;
      }
    }
  }
}
</style>
