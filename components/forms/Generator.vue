<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { ref, watch, onMounted } from "vue";

// Props
const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  timeSlots: {
    type: Object,
    default: () => ({}),
  },
  solutionForm: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(["formSuccess"]);

// Default selected timezone and date
const selectedTimeZone = ref("CET"); // Default timezone is CET
const availableTimes = ref([]);

// Set today's date as default in YYYY-MM-DD format
const today = new Date();
const defaultDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

const inputValues = ref({
  date: defaultDate, // Set today's date
  timezone: "CET", // Set CET as default timezone
  time: "", // Initialize time field
});

// Update available times based on selected timezone and date
const updateTimeOptions = () => {
  const times = props.timeSlots[selectedTimeZone.value] || [];
  availableTimes.value = times;

  // Auto-select the first available time, if there are any
  if (times.length > 0) {
    inputValues.value.time = times[0];
  } else {
    inputValues.value.time = ""; // fallback to empty if no times
  }
};

// Watchers to update available times whenever date or timezone changes
watch(
  () => inputValues.value.timezone,
  (newTimezone) => {
    selectedTimeZone.value = newTimezone;
    updateTimeOptions();
  }
);

watch(
  () => inputValues.value.date,
  (newDate) => {
    updateTimeOptions();
  }
);

const validationSchema = yup.object().shape({
  ...props.schema.default[0].fields.reduce((acc, field) => {
    acc[field.name] = field.rules || yup.string();
    return acc;
  }, {}),
  // time: yup.string().required("Please select a time."), // Ensure time is required
});

const isSubmitting = ref(false);

const submitForm = async (values, { resetForm }) => {
  isSubmitting.value = true;

  const formData = {
    ...values,
    time: inputValues.value.time, // Ensure time is included
    timezone: selectedTimeZone.value, // Include timezone too!
  };

  try {
    const res = await fetch("/api/form/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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

const handleFocus = (name) => {
  focusedField.value = name;
};

const handleBlur = (name) => {
  if (!inputValues.value[name]) focusedField.value = null;
};

const updateValue = (name, event) => {
  inputValues.value[name] = event.target.value;
};

const selectTime = (time) => {
  inputValues.value.time = time; // Store selected time
};

onMounted(() => {
  updateTimeOptions(); // Call to initialize available times on mount
});
</script>

<template>
  <Form @submit="submitForm" :validation-schema="validationSchema">
    <div :class="schema.default[0].class">
      <template
        v-for="{
          as,
          name,
          label,
          elementClass,
          options,
          min,
          type,
          ...attrs
        } in schema.default[0].fields"
        :key="name"
      >
        <!-- REGULAR FIELDS -->
        <div v-if="type !== 'custom'" :class="elementClass">
          <label
            :for="name"
            :class="{ active: focusedField === name || inputValues[name] }"
          >
            {{ label }}
          </label>
          <Field
            :as="as"
            :id="name"
            :name="name"
            v-bind="attrs"
            :min="min"
            :type="type"
            v-model="inputValues[name]"
            @focus="handleFocus(name)"
            @blur="handleBlur(name)"
          >
            <option
              v-for="option in options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </Field>
          <ErrorMessage
            :name="name"
            class="absolute left-0 sm:left-2 top-full text-14 text-red"
          />
        </div>
        <!-- REGULAR FIELDS -->

        <!-- CUSTROM FIELD(TIMETABLE -->
        <div
          v-else-if="type === 'custom'"
          class="mb-16 relative w-full sm:px-2"
        >
          <h3 class="text-16 font-medium mb-3">
            Available Times for {{ inputValues.date }} ({{ selectedTimeZone }})
          </h3>
          <div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
            <span
              v-for="time in availableTimes"
              :key="time"
              @click="selectTime(time)"
              class="cursor-pointer hover:bg-gray-200 p-2 sm:p-5 text-center border border-darkBlue text-16 lg:text-base"
              :class="{ 'bg-gray-200': inputValues.time === time }"
            >
              {{ time }}
            </span>
          </div>
          <ErrorMessage name="time" class="text-14 text-red mt-1" />
        </div>
        <!-- END :: CUSTROM FIELD(TIMETABLE -->
      </template>
    </div>

    <slot name="button">
      <button class="form__submit-button mt-4" type="submit">Submit</button>
    </slot>
  </Form>
</template>
