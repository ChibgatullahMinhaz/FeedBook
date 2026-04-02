import nodemailer from 'nodemailer';

//* 1. Create a transporter object (The "Sender")
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com or smtp.resend.com
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

interface SendEmailOptions {
    to: string;
    subject: string;
    text?: string;
    html: string;
}

// 2. The reusable function
export const sendMail = async ({ to, subject, text, html }: SendEmailOptions) => {
    try {
        const info = await transporter.sendMail({
            from: `"Feedbook App" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });
        console.log("Message sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
};