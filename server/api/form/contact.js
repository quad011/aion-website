import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  try {
    console.log("✅ API endpoint hit");

    // Read form data from the request
    const body = await readBody(event);
    console.log("Form Data:", body);

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"Aion website" <${process.env.EMAIL_USER}>`,
      to: "quad011@hotmail.com",
      subject: "New Form Submission",
      text: `New Contact Form Submission Details:\n\n${Object.entries(body)
        .map(
          ([key, value]) =>
            `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
        )
        .join("\n")}`,
    };

    console.log("Sending email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);

    // Ensure a proper JSON response
    return {
      success: true,
      message: "Email sent successfully!",
    };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    setResponseStatus(event, 500);
    return {
      success: false,
      message: "Failed to send email",
      error: error.message,
    };
  }
});
