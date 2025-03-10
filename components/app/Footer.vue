<script setup>
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { appData } = storeToRefs(appStore);

const { linkResolver } = useLinkResolver();

onMounted(() => {
  // console.log("appStoreeeeee", appData);
});
</script>

<template>
  <footer class="app-footer overflow-hidden border-t border-black">
    <div class="px-4 py-8 lg:p-16 justify-between">
      <div class="flex flex-wrap sm:justify-between w-full font-medium">
        <!-- LOGO -->
        <c-animated-element
          :fromY="50"
          :toY="0"
          class="order-first w-1/2 sm:w-auto"
        >
          <nuxt-link
            to="/"
            class="cursor-pointer pointer-events-auto block mb-10 sm:mb-0"
          >
            <a-logo
              class="logo w-[20vw] sm:w-[12.33vw] object-contain transition-all duration-500 fill-darkBlue"
            />
          </nuxt-link>
        </c-animated-element>
        <!-- END :: LOGO -->

        <!-- INFO -->
        <c-animated-element
          :fromY="50"
          :toY="0"
          :delay="0.1"
          class="order-3 sm:order-2 w-1/2 sm:w-auto"
        >
          <div class="flex flex-col">
            <a
              :href="`http://maps.google.co.in/maps?q=${appData?.data?.city}`"
              target="_blank"
              class="text-14 lg:text-base link reversed"
              >{{ appData?.data?.city }}</a
            >
            <a
              :href="appData?.data?.phone?.url"
              class="text-14 lg:text-base link reversed my-1"
              >{{ appData?.data?.phone?.text }}</a
            >
            <a
              :href="appData?.data?.mail?.url"
              class="text-14 lg:text-base link reversed"
              >{{ appData?.data?.mail?.text }}</a
            >
          </div>
        </c-animated-element>
        <!-- END :: INFO -->

        <!-- NAV -->
        <c-animated-element
          :fromY="50"
          :toY="0"
          :delay="0.2"
          class="order-2 sm:order-3"
        >
          <div class="flex flex-col mb-10 sm:mb-0">
            <nuxt-link to="/" class="mb-1 text-14 lg:text-base">
              <span v-html="'Home'" class="link" />
            </nuxt-link>

            <PrismicLink
              v-for="item in appData?.data?.main_navigation"
              :key="item.key"
              :to="linkResolver(item.link)"
              class="mb-1 last:mb-0 text-14 lg:text-base"
            >
              <span v-html="item.link.text" class="link" />
            </PrismicLink>
          </div>
        </c-animated-element>
        <!-- NED :: NAV -->

        <!-- SOCIALS -->
        <c-animated-element
          :fromY="50"
          :toY="0"
          :delay="0.3"
          class="order-last"
        >
          <div class="flex flex-col sm:items-end">
            <a
              v-for="(item, index) in appData?.data?.socials"
              :key="index"
              :href="item.item.url"
              class="text-14 lg:text-base link reversed mb-1 last:mb-0"
              >{{ item.item.text }}</a
            >
          </div>
        </c-animated-element>
        <!-- END :: SOCIALS -->
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.app-footer {
}
</style>
