import * as yup from "yup";

export default [
  {
    class: "row w-full sm:-mx-2",
    fields: [
      {
        label: "Your Name",
        name: "name",
        as: "input",
        type: "text",
        placeholder: "",
        elementClass: "flex flex-col relative w-full sm:w-1/2 mb-10 sm:px-2",
        inputClass: "",
        rules: yup.string().required("Your Name is a required field"),
      },
      // {
      //   label: "Last Name",
      //   name: "lastname",
      //   as: "input",
      //   type: "text",
      //   placeholder: "",
      //   elementClass: "flex flex-col relative w-full sm:w-1/2 mb-10 sm:px-2",
      //   inputClass: "",
      //   rules: yup.string().required("Last Name is a required field"),
      // },
      // {
      //   label: "Phone",
      //   name: "phone",
      //   as: "input",
      //   type: "text",
      //   placeholder: "",
      //   elementClass: "flex flex-col relative w-full sm:w-1/2 mb-10 sm:px-2",
      //   inputClass: "",
      //   rules: yup
      //     .number("Phone must be a number")
      //     .integer("Phone must be a number")
      //     .required("Phone is a required field")
      //     .typeError("Phone must be a number"),
      // },
      {
        label: "Your Email",
        name: "email",
        as: "input",
        type: "email",
        placeholder: "",
        elementClass: "flex flex-col relative w-full sm:w-1/2 mb-10 sm:px-2",
        inputClass: "",
        rules: yup
          .string()
          .required("Email is a required field")
          .email("Email must be a valid format"),
      },
      {
        label: "Company Name",
        name: "company",
        as: "input",
        type: "text",
        placeholder: "",
        elementClass: "flex flex-col relative w-full mb-10 sm:px-2",
        inputClass: "",
        rules: yup.string().required("Company Name is a required field"),
      },
      {
        label: "Message",
        name: "message",
        as: "textarea",
        type: "textarea",
        placeholder: "",
        elementClass: "flex flex-col relative w-full mb-10 sm:px-2",
        inputClass: "",
      },
    ],
  },
];
