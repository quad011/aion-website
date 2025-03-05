import { sendEmail } from "@/server/utils/sendEmail";
import form_schema from "@/components/organisms/ContactComponent/contactSchema.js";

const LOG_NAME = `[api.form.contact]`;

const validateForm = (formData) => {
  try {
    // Validate the form data using Yup
    Object.keys(formData).forEach((field) => {
      const schema = form_schema[0].fields[field]?.rules;
      if (schema) {
        schema.validateSync(formData[field]);
      }
    });
    console.log("Validation passed!");
    return true;
  } catch (error) {
    console.error("Validation error: ", error.message);
    return false;
  }
};

export default defineEventHandler(async (event) => {
  let success = false;

  try {
    const formData = await readBody(event);
    console.log("formData", formData);
    const subject = `New Form Submission: [Contact] - ${formData.name}`;

    // Define recipient email — either from form data or a fixed email address
    const recipientEmail = "quad011@hotmail.com";

    // create a field -> label map
    const labelMap = getLabelMap(form_schema);
    // generate html table with form data
    const htmlTable = generateHtmlDataTable(formData, labelMap);

    // Validate form data
    validateForm(formData);

    let html = `
      <h2>${subject}</h2>
      <p>This message has been sent from <strong>Aion website</strong></p>
      ${htmlTable}
    `;

    // Send email
    const clientEmail = await sendEmail(html, recipientEmail, subject);

    if (clientEmail[0]?.status === "sent") {
      success = true;
      setResponseStatus(event, 200);

      return {
        status: success,
        data: clientEmail[0],
      };
    } else {
      console.log("Email failed to send", success, clientEmail);

      return {
        status: success,
        data: clientEmail[0],
      };
    }
  } catch (error) {
    console.error(`${LOG_NAME} ERROR:`, error); // Log the error
    if (error.statusCode === 422) {
      console.error(`${LOG_NAME} Unprocessable Entity:`, error.data);
      throw createError({ statusCode: 422, message: error.message });
    } else {
      console.error(`${LOG_NAME} Internal Server Error:`, error);
      throw createError({ statusCode: 500, message: "Internal Server Error" }); // Ensure error gets logged
    }
  }
});
