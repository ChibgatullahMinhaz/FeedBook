import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { USER_ROLE } from "./enums/userRole";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            console.log('sending email !')
            // void sendEmail({
            //     to: user.email,
            //     subject: "Verify your email address",
            //     text: `Click the link to verify your email: ${url}`,
            // });

            // await sendMail({
            //     to: "newuser@example.com",
            //     subject: "Welcome to Feedbook!",
            //     html: "<h1>Welcome!</h1><p>Thanks for joining our social network.</p>"
            // });
        },
    },
    user: {
        additionalFields: {
            phoneNumber: {
                type: "string",
                required: false,
                defaultValue: "",
                input: true,
            },
            role: {
                type: "string",
                required: false,
                input: false,
                defaultValue: USER_ROLE.USER,
            }
        },
    },
});