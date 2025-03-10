<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";
const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
});

const validationSchema = yup.object().shape(
  props.schema.default[0].fields.reduce((acc, field) => {
    acc[field.name] = field.rules || yup.string();
    return acc;
  }, {})
);

const isSubmitting = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const submitForm = async (values) => {
  isSubmitting.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {
    const res = await fetch("/api/form/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null); // Catch any non-JSON errors
      throw new Error(errorData?.message || "Failed to submit form");
    }

    const data = await res.json();
    console.log("✅ Response from API:", data);

    if (data.success) {
      successMessage.value = "Email sent successfully!";
    } else {
      errorMessage.value = data.message || "Something went wrong";
    }
  } catch (error) {
    console.error("❌ Error submitting form:", error);
    errorMessage.value =
      error.message || "An error occurred while submitting the form.";
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {});
</script>

<template>
  <Form @submit="submitForm" :validation-schema="validationSchema">
    <div :class="schema.default[0].class">
      <div
        v-for="{ as, name, label, elementClass, ...attrs } in schema.default[0]
          .fields"
        :key="name"
        :class="elementClass"
      >
        <label :for="name">{{ label }}</label>
        <Field :as="as" :id="name" :name="name" v-bind="attrs" />
        <ErrorMessage
          :name="name"
          class="text-14 absolute left-2 top-full text-red"
        />
      </div>
    </div>

    <button type="submit" :disabled="isSubmitting">Submit</button>

    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </Form>
</template>
