export async function sendEmail(html, to, subject) {
  try {
    const emailResponse = await $fetch("api/form/contact", {
      method: "POST",
      body: {
        to,
        subject,
        html,
      },
    });

    // Log the response from the email API
    console.log("Email response:", emailResponse);
    return emailResponse;
  } catch (error) {
    console.error("[sendEmail] Error:", error);
    throw error;
  }
}
