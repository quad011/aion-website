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

const emit = defineEmits(["formSuccess"]);

const validationSchema = yup.object().shape(
  props.schema.default[0].fields.reduce((acc, field) => {
    acc[field.name] = field.rules || yup.string();
    return acc;
  }, {})
);

const isSubmitting = ref(false);
const submitForm = async (values, { resetForm }) => {
  isSubmitting.value = true;

  try {
    const res = await fetch("/api/form/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      throw new Error("Failed to submit form");
    }

    const data = await res.json();
    if (data.success) {
      resetForm(); // Reset the form
      emit("formSuccess", "Email sent successfully!"); // Emit success message
    } else {
      emit("formSuccess", "Something went wrong.");
    }
  } catch (error) {
    emit("formSuccess", error.message || "An error occurred.");
  } finally {
    isSubmitting.value = false;
  }
};

const focusedField = ref(null);
const inputValues = ref({});

const handleFocus = (fieldName) => {
  focusedField.value = fieldName;
};

const handleBlur = (fieldName) => {
  if (!inputValues.value[fieldName]) {
    focusedField.value = null;
  }
};

const updateValue = (fieldName, event) => {
  inputValues.value[fieldName] = event.target.value;
};
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
        <label
          :for="name"
          :class="{ active: focusedField === name || inputValues[name] }"
          >{{ label }}</label
        >
        <Field
          :as="as"
          :id="name"
          :name="name"
          v-bind="attrs"
          @focus="handleFocus(name)"
          @blur="handleBlur(name)"
          @input="updateValue(name, $event)"
        />
        <ErrorMessage
          :name="name"
          class="text-14 absolute left-2 top-full text-red"
        />
      </div>
    </div>

    <slot name="button">
      <button
        class="form__submit-button"
        v-html="submitText"
        type="submit"
      ></button>
    </slot>
  </Form>
</template>
