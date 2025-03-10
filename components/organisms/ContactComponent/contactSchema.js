import * as yup from "yup";

export default [
  {
    class: "row w-full md:-mx-2",
    fields: [
      {
        label: "First Name",
        name: "name",
        as: "input",
        type: "text",
        placeholder: "",
        elementClass: "flex flex-col relative w-full md:w-1/2 mb-8 px-2",
        inputClass: "",
        rules: yup.string().required("First Name is a required field"),
      },
      {
        label: "Last Name",
        name: "lastname",
        as: "input",
        type: "text",
        placeholder: "",
        elementClass: "flex flex-col relative w-full md:w-1/2 mb-8 px-2",
        inputClass: "",
        rules: yup.string().required("Last Name is a required field"),
      },
      {
        label: "Phone",
        name: "phone",
        as: "input",
        type: "text",
        placeholder: "",
        elementClass: "flex flex-col relative w-full md:w-1/2 mb-8 px-2",
        inputClass: "",
        rules: yup
          .number("Phone must be a number")
          .integer("Phone must be a number")
          .required("Phone is a required field")
          .typeError("Phone must be a number"),
      },
      {
        label: "Your Email",
        name: "email",
        as: "input",
        type: "email",
        placeholder: "",
        elementClass: "flex flex-col relative w-full md:w-1/2 mb-8 px-2",
        inputClass: "",
        rules: yup
          .string()
          .required("Email is a required field")
          .email("Email must be a valid format"),
      },
      {
        label: "Message",
        name: "message",
        as: "textarea",
        type: "textarea",
        placeholder: "",
        elementClass: "flex flex-col relative w-full mb-8 px-2",
        inputClass: "",
      },
    ],
  },
];
