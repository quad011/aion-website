<script setup>
const props = defineProps({
  title: String,
  text: Array,
});

const contactSchema = await import("./contactSchema.js");

const endpoint = "/api/form/contact";

const { isThankYou, submitForm, serverMessage } = useFormSubmit({
  contactSchema,
  endpoint,
});

const handleSubmitForm = async (formData) => {
  await submitForm(formData);
};

onMounted(() => {});
</script>

<template>
  <div
    class="o-contact-component lg:flex relative overflow-hidden px-4 lg:px-20 py-10 lg:py-20 bg-darkBlue text-white"
  >
    <div class="lg:w-1/2">
      <c-animated-element :fromY="50" :toY="0">
        <h2
          v-html="title"
          class="text-40 sm:text-60 lg:text-92 font-bold mb-10"
        />
      </c-animated-element>

      <c-animated-element :fromY="50" :toY="0" :delay="0.1">
        <PrismicRichText
          :field="text"
          wrapper="div"
          class="leading-[1.2] lg:pr-56 mb-20 lg:mb-52"
        />
      </c-animated-element>
    </div>

    <div class="lg:w-1/2 relative">
      <f-generator
        v-if="!isThankYou"
        class="relative contact-form"
        buttonWrapperClasses="w-1/2 lg:w-1/3 mt-10"
        :default-classes="{
          element: 'lg:flex relative',
          errorMessage: 'text-12 absolute top-full left-0 text-red error-msg',
          label: 'text-14',
          inputWrapper: 'mb-5',
        }"
        :hideBtn="true"
        @submit="handleSubmitForm"
        :form-scheme="contactSchema.default"
      >
        <template #button="{ isValid }">
          <a-button :title="'Send'" class="w-full" />

          <p
            v-if="serverMessage"
            class="text-12 absolute top-full left-0 text-red error-msg"
          >
            {{ serverMessage }}
          </p>
        </template>
      </f-generator>
      <!-- END :: FORM GENETATOR -->

      <div v-if="isThankYou" class="text-32 absolute center">
        Thank you for your message!
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
