<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
  },
  labelClass: {
    type: String,
    default: "",
  },
  errorMessageClass: {
    type: String,
    default: "",
  },
  inputClass: {
    type: String,
    default: "",
  },
  inputWrapper: {
    type: String,
    default: "",
  },
  rules: {
    type: Object,
  },
  value: {
    type: String,
  },
  onBlur: {
    type: Function,
    default: () => {},
  },
});

const emit = defineEmits(["change", "onValid"]);
const {
  uid,
  errorMessage,
  value,
  handleBlur,
  handleFocus,
  labelActive,
  handleChange,
  errorVisible,
} = useFormInput({
  name: props.name,
  initialValue: props.value,
  rules: props.rules,
  onBlur: props.onBlur,
  emit: emit,
});

const fieldId = computed(() => `input-${props.name}`);
</script>

<template>
  <div :class="`form-input form-input--text ${inputWrapper}`">
    <div class="relative w-full">
      <label
        v-if="label"
        :class="[labelClass, labelActive ? 'active' : '']"
        :for="fieldId"
        v-html="label"
      />

      <input
        :class="inputClass"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleChange"
        :id="fieldId"
        :placeholder="placeholder"
        :value="value"
        :name="name"
        :type="type"
      />

      <span
        v-if="errorVisible"
        v-html="errorMessage"
        :class="errorMessageClass"
      />
    </div>
  </div>
</template>
