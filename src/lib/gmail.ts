import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

export async function createTransporter() {
  const accessToken = await oauth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: accessToken.token || "",
    },
  });
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const transporter = await createTransporter();

  const mailOptions = {
    from: `"EcoCatch Website" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: data.email,
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2D5A3D;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Message</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.message.replace(/\n/g, "<br>")}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Submitted At</td>
            <td style="padding: 10px;">${new Date().toLocaleString("en-IN")}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; font-size: 12px; color: #86868b;">
          This email was sent automatically from the EcoCatch website contact form.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendReplyEmail(data: {
  to: string;
  name: string;
  replyMessage: string;
  adminName?: string;
}) {
  const transporter = await createTransporter();

  const mailOptions = {
    from: `"EcoCatch" <${process.env.GMAIL_USER}>`,
    to: data.to,
    subject: `Response to your inquiry - EcoCatch`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #2D5A3D;">Hello ${data.name},</h2>
        <p style="font-size: 15px; line-height: 1.6;">
          Thank you for reaching out to EcoCatch. Here is the response to your inquiry:
        </p>
        <div style="background-color: #f8fafc; border-left: 4px solid #2D5A3D; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0; line-height: 1.6;">${data.replyMessage.replace(/\n/g, "<br>")}</p>
        </div>
        <p style="font-size: 14px; color: #555; margin-top: 24px;">
          Best regards,<br />
          <strong>${data.adminName || "EcoCatch Team"}</strong>
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="font-size: 12px; color: #86868b;">
          This email was sent in response to your inquiry on the EcoCatch website.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}