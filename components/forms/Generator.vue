<script setup>
import _isEqual from "lodash/isEqual";
const emit = defineEmits(["submit", "onErrorChange"]);

const props = defineProps({
  formScheme: {
    type: Array,
    required: true,
  },

  defaultClasses: {
    type: Object,
    default: () => ({
      element: "",
      errorMessage: "",
      label: "",
      input: "",
    }),
  },
  useSteps: {
    type: Boolean,
  },
  submitText: {
    type: String,
    default: "Send",
  },
  nextText: {
    type: String,
    default: "Next",
  },
  prevText: {
    type: String,
    default: "Previous",
  },
  onInputBlur: {
    type: Function,
    default: () => () => {},
  },
  buttonWrapperClasses: {
    type: String,
  },
});

const {
  submitForm,
  activeGroup,
  nextStep,
  prevStep,
  setValid,
  nextDisabled,
  prevDisabled,
  isValid,
  errorBag,
  errors,
} = useFormGenerator(props.formScheme, emit, props.defaultClasses);
</script>

<template>
  <form class="form" @submit.prevent="submitForm">
    <f-group
      :onInputBlur="onInputBlur"
      v-for="(group, index) in formScheme"
      :key="index"
      @onValid="setValid($event, index)"
      v-show="index == activeGroup || !useSteps"
      :fields="group.fields"
      :class="group.class"
    >
    </f-group>

    <slot
      v-if="useSteps"
      name="controls"
      :prevDisabled="prevDisabled"
      :prevStep="prevStep"
      :nextStep="nextStep"
      :nextDisabled="nextDisabled"
    >
      <div class="form__controls-wrapper">
        <a
          class="form__controls form__controls--prev"
          v-if="!prevDisabled"
          v-html="prevText"
          @click.prevent="prevStep"
        ></a>

        <a
          class="form__controls form__controls--next"
          v-if="!nextDisabled"
          v-html="nextText"
          @click.prevent="nextStep"
        ></a>
      </div>
    </slot>

    <div :class="buttonWrapperClasses">
      <slot :isValid="isValid" :errorBag="errorBag" name="button">
        <button
          v-if="isValid"
          class="form__submit-button"
          v-html="submitText"
          type="submit"
        ></button>
      </slot>
    </div>

    <slot />
  </form>
</template>
