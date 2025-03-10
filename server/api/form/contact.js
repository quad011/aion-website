import nodemailer from "nodemailer";

// export default defineEventHandler(async (event) => {
//   try {
//     // Get form data (name, email, etc.)
//     const body = await readBody(event);

//     // Configure the email transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Email options
//     const mailOptions = {
//       from: "Aion website info@aionbpo.com", // Ensure this is the correct value
//       to: "quad011@hotmail.com",
//       subject: "New Form Submission",
//       text: `New Contact Form Submission Details:\n\n
//         Name: ${body.name}\n
//         Last Name: ${body.lastname}\n
//         Phone: ${body.phone}\n
//         Email: ${body.email}\n
//         Message: ${body.message}`,
//     };

//     // Send email
//     const info = await transporter.sendMail(mailOptions);

//     // If we reach here, email was sent successfully
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         success: true,
//         message: "Email sent successfully!",
//         emailResponse: info, // Log the response data for debugging
//       }),
//     };
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         success: false,
//         message: "Failed to send email",
//         error: error.message,
//       }),
//     };
//   }
// });

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
      text: `
        New Contact Form Submission Details:\n\n
        Name: ${body.name}\n
        Last Name: ${body.lastname}\n
        Phone: ${body.phone}\n
        Email: ${body.email}\n
        Message: ${body.message}
      `,
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
