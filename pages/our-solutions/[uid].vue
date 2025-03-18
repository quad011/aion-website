<script setup>
import { components } from "~/slices";
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

const solutionsSchema = await import(
  "../../components/forms/schemas/solutionsSchema.js"
);

const successMessage = ref("");

const handleFormSuccess = (message) => {
  successMessage.value = message;
  setTimeout(() => {
    successMessage.value = ""; // Clear message after a few seconds
  }, 3000);
};

onMounted(() => {
  // console.log("page", page);
});

definePageMeta({
  layout: "default",
});

const timeSlots = {
  CET: [
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
  ],
  CDT: [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
  ],
};

usePageMeta(page);
</script>

<template>
  <div :class="`article-solution ${page.uid}`">
    <o-hero-header
      :title="page.data?.title"
      :background_image="page.data?.featured_image"
      :lettersDecor="false"
    />

    <div class="w-full lg:w-1/2 mx-auto px-4 lg:px-0 my-10 lg:my-20">
      <c-animated-element :fromY="50" :toY="0">
        <h2 class="text-basic lg:text-20 font-medium mb-10">
          Check out our availability and book the date and time that works for
          you
        </h2>
      </c-animated-element>

      <c-animated-element :fromY="50" :toY="0" :delay="0.1">
        <!-- FORM GENETATOR -->
        <f-generator
          @formSuccess="handleFormSuccess"
          class="solutions-form"
          :schema="solutionsSchema"
          :timeSlots="timeSlots"
        >
          <template #button>
            <div class="w-1/2 lg:w-1/3">
              <a-button title="Book now" class="text-72 w-full" />
            </div>
          </template>
        </f-generator>
        <!-- END :: FORM GENETATOR -->

        <div
          v-if="successMessage"
          class="text-32 absolute center text-center w-full h-[108%] flex justify-center items-center bg-white transition-all duration-500"
        >
          Thank you for your message!
        </div>
      </c-animated-element>
    </div>

    <SliceZone v-once :components="components" :slices="page.data.slices" />

    <AppFooter />
  </div>
</template>
