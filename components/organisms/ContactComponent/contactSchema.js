import * as yup from "yup";

export default [
  {
    class: "row w-full -mx-2",
    fields: {
      name: {
        model: null,
        rules: yup.string().required("First Name is a required field"),
        label: "First Name*",
        placeholder: "",
        elementClass: "flex flex-col relative w-full lg:w-1/2 mb-8 px-2",
        inputClass: "",
        component: "text",
        type: "text",
      },
      lastname: {
        model: null,
        rules: yup.string().required("Last Name is a required field"),
        label: "Last Name*",
        placeholder: "",
        elementClass: "flex flex-col relative w-full lg:w-1/2 mb-8 px-2",
        inputClass: "",
        component: "text",
        type: "text",
      },
      phone: {
        model: null,
        rules: yup.string().required("Phone is a required field"),
        label: "Phone*",
        placeholder: "",
        elementClass: "flex flex-col relative w-full lg:w-1/2 mb-8 px-2",
        inputClass: "",
        component: "text",
        type: "text",
      },
      email: {
        model: null,
        rules: yup
          .string()
          .required("Email is a required field")
          .email("Email must be a valid format"),
        label: "Email*",
        placeholder: "",
        elementClass: "flex flex-col relative w-full lg:w-1/2 mb-8 px-2",
        inputClass: "",
        component: "text",
        type: "text",
      },
      message: {
        model: null,
        rules: yup.string().required("Your message is a required field"),
        label: "Message",
        placeholder: "",
        elementClass:
          "flex flex-col relative w-full min-h-[8rem] h-[8rem] mx-2",
        inputClass: "",
        component: "textarea",
        type: "textarea",
      },
    },
  },
];
