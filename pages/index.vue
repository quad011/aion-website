<script setup>
import { components } from "~/slices";
import { usePrismic } from "@prismicio/vue";
import { useAsyncData, createError } from "#imports";
import fetchLinks from "@/config/pageFetchLinks";

const { client } = usePrismic();

const { data: page } = await useAsyncData("page_home", async () => {
  try {
    // Fetch the "page_home" document by UID
    const document = await client.getByUID("page_home", "home", {
      cache: "no-store",
      fetchLinks,
    });

    if (!document) {
      // console.error("Prismic returned null for 'page_home'");
      throw createError({ statusCode: 404, message: "Page not found" });
    }

    // console.log("Prismic response:", document);
    return document;
  } catch (err) {
    // console.error("Error fetching Prismic data:", err);
    throw createError({
      statusCode: 404,
      message: err.message || "Page not found",
    });
  }
});

usePageMeta(page);
</script>

<template>
  <div class="page-home bg-white">
    <SliceZone v-once :components="components" :slices="page.data.slices" />
    <AppFooter />
  </div>
</template>
