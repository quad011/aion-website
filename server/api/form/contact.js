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

    const generateEmailContent = (body) => {
      return `
        <h2 style="color: #333;">New Contact Form Submission Details:</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px; background-color: #f4f4f4; border: 1px solid #ddd;">Field</th>
              <th style="text-align: left; padding: 8px; background-color: #f4f4f4; border: 1px solid #ddd;">Value</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(body)
              .map(
                ([key, value]) => `
                  <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">${key.charAt(0).toUpperCase() + key.slice(1)}</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${value}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      `;
    };

    const emailContent = generateEmailContent(body);

    // Email options
    const mailOptions = {
      from: `"Aion website" <${process.env.EMAIL_USER}>`,
      to: "quad011@hotmail.com",
      subject: "New Form Submission",
      html: emailContent,
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
