<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  text: {
    type: Array,
  },
  successMessage: {
    type: Boolean,
  },
});

const contactSchema = await import("./contactSchema.js");

const successMessage = ref("");

const handleFormSuccess = (message) => {
  successMessage.value = message;
  setTimeout(() => {
    successMessage.value = ""; // Clear message after a few seconds
  }, 3000);
};
</script>

<template>
  <div
    class="o-contact-component lg:flex relative overflow-hidden px-4 lg:px-20 bg-darkBlue text-white"
  >
    <div class="lg:w-1/2 py-10 lg:py-20">
      <c-animated-element :fromY="50" :toY="0">
        <h2
          v-html="title"
          class="text-40 sm:text-60 lg:text-92 font-bold mb-5 lg:mb-10"
        />
      </c-animated-element>

      <c-animated-element :fromY="50" :toY="0" :delay="0.1">
        <PrismicRichText
          :field="text"
          wrapper="div"
          class="leading-[1.2] lg:pr-56 lg:mb-20 lg:mb-0 text-base"
        />
      </c-animated-element>
    </div>

    <div class="lg:w-1/2 py-10 lg:py-20 relative">
      <c-animated-element :fromY="50" :toY="0" :delay="0.2">
        <!-- FORM GENETATOR -->
        <f-generator
          @formSuccess="handleFormSuccess"
          class="contact-form"
          :schema="contactSchema"
          :solutionForm="true"
        >
          <template #button>
            <div class="w-1/2 lg:w-1/3">
              <a-button title="Send" class="text-72 w-full" />
            </div>
          </template>
        </f-generator>
        <!-- END :: FORM GENETATOR -->

        <div
          v-if="true"
          class="text-32 absolute center text-center w-[120%] h-[120%] flex justify-center items-center bg-darkBlue transition-all duration-500"
        >
          Thank you for your message!
        </div>
      </c-animated-element>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
