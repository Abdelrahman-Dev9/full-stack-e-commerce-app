import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // app password (not real password)
    },
  });

  await transporter.sendMail({
    from: `"E-Commerce App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};
