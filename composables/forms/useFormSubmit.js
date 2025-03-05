export default ({ schema, endpoint }) => {
  const serverMessage = ref(false);
  const isThankYou = ref(false);

  const validateForm = (formData) => {
    try {
      validationSchema.validateSync(formData, { abortEarly: false });
      console.log("Validation passed");
    } catch (error) {
      console.error("Validation failed", error.errors);
      throw new Error("Validation failed");
    }
  };

  const submitForm = async (formData) => {
    try {
      const { status, data, error } = await $fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: formData,
      });

      if (status) {
        // @TODO handle success
        // @TODO update ui - thank you message !!!
        console.log("Submit successful!");
        serverMessage.value = false;
        isThankYou.value = true;
      } else if (data.status != "sent") {
        console.log("error with status");
        serverMessage.value = "The email was not sent. Please try again later.";
      } else if (error) {
        // @TODO handle error
        // @TODO update ui - show error message !!!
        serverMessage.value = error.value.data?.data?.title;
        console.log("Error in submitting", error.value.data?.data?.title);
        return;
      }
    } catch (error) {
      // @TODO handle unexpected error
      console.error(
        "[Contact] Error submitting the form",
        error?.message || error
      );
    }
  };

  return {
    isThankYou,
    submitForm,
    serverMessage,
  };
};
