import * as yup from "yup";

const today = new Date();
const month = String(today.getMonth() + 1).padStart(2, "0"); // +1 because months are 0-indexed
const day = String(today.getDate()).padStart(2, "0");
const year = today.getFullYear();

const formattedDate = `${month}-${day}-${year}`; // MM-DD-YYYY

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
        elementClass: "relative w-full sm:w-1/2 mb-10 sm:px-2",
        inputClass: "",
        rules: yup.string().required("First Name is a required field"),
      },
      {
        label: "Email",
        name: "email",
        as: "input",
        type: "email",
        placeholder: "",
        elementClass: "relative w-full sm:w-1/2 mb-10 sm:px-2",
        inputClass: "",
        rules: yup
          .string()
          .required("Email is a required field")
          .email("Email must be a valid format"),
      },
      //   {
      //     label: "Select Time",
      //     name: "time",
      //     as: "select",
      //     placeholder: "Choose a time",
      //     elementClass: "relative w-full sm:w-1/2 mb-10 sm:px-2",
      //     inputClass: "",
      //     options: [], // Will be dynamically updated in your component
      //     rules: yup.string().required("Time is a required field"),
      //   },
      {
        label: "Phone",
        name: "phone",
        as: "input",
        type: "text",
        placeholder: "",
        elementClass: "relative w-full mb-10 sm:px-2",
        inputClass: "",
        rules: yup
          .number("Phone must be a number")
          .integer("Phone must be a number")
          .required("Phone is a required field")
          .typeError("Phone must be a number"),
      },
      {
        label: "Choose a date",
        name: "date",
        as: "input",
        type: "date",
        placeholder: "",
        elementClass: "relative w-full sm:w-1/2 mb-10 sm:px-2",
        inputClass: "",
        min: new Date().toISOString().split("T")[0], // keeps HTML date input working (YYYY-MM-DD)
        displayFormat: `${month}-${day}-${year}`, // MM-DD-YYYY for custom display
        rules: yup.string().required("Date is a required field"),
      },
      {
        label: "Timezone",
        name: "timezone",
        as: "select",
        placeholder: "",
        elementClass: "relative w-full sm:w-1/2 mb-10 sm:px-2",
        inputClass: "",
        options: [
          { label: "Central European Standard Time (GMT+1)", value: "CET" },
          { label: "Central Daylight Time (CDT)", value: "CDT" },
        ],
        rules: yup.string().required("Timezone is a required field"),
      },
      {
        type: "custom",
        name: "time",
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
