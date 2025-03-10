<script setup>
import { usePrismic } from "@prismicio/vue";
import { useAsyncData, createError } from "#imports";
import { useRoute } from "vue-router";

const route = useRoute();
const { client } = usePrismic();

const { data: page } = await useAsyncData("article_solution", async () => {
  try {
    const document = await client.getByUID(
      "article_solution",
      route.params.uid,
      {
        cache: "no-store",
      }
    );

    if (!document) {
      throw createError({ statusCode: 404, message: "Article not found" });
    }

    return document;
  } catch (err) {
    throw createError({
      statusCode: 404,
      message: err.message || "Article not found",
    });
  }
});

usePageMeta(page);
</script>

<template>
  <div>
    <o-hero-header
      :title="page.data?.title"
      :background_image="page.data?.featured_image"
      :lettersDecor="false"
    />
    <SliceZone :slices="page?.data?.slices || []" />
    <AppFooter />
  </div>
</template>
