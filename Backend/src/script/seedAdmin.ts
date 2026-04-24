import axios from "axios"
import config from "../Config/Config"
import AppError from "../error/AppError"
import { USER_ROLE } from "../lib/enums/userRole"
import { prisma } from "../lib/prisma"
import httpStatus from "http-status"

export const seedAdmin = async () => {
    try {
        const adminData = {
            email: config.adminEmail,
            name: config.displayName,
            password: config.adminPassword,
            role: USER_ROLE.ADMIN
        }
        const adminExist = await prisma.user.findUnique({
            where: {
                email: adminData.email as string,
            }
        })

        if (adminExist) {
            console.log("Admin already exists. Skipping seed.");
            return;
        };

        const signUpAdmin = await fetch("http://127.0.0.1:5000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://127.0.0.1:3000"
            },
            body: JSON.stringify(adminData)
        })

        if (signUpAdmin.ok) {
            console.log("**** Admin created")
            await prisma.user.update({
                where: {
                    email: adminData.email as string
                },
                data: {
                    emailVerified: true
                }
            })

            console.log("**** Email verification status updated!")
            console.log("******* SUCCESS ******")

        }
        else {
            // এই অংশটি আপনাকে বলবে কেন হচ্ছে না
            const errorStatus = signUpAdmin.status;
            const errorText = await signUpAdmin.text(); // সার্ভার থেকে আসা এরর মেসেজ
            console.log(`❌ Failed! Status: ${errorStatus}, Message: ${errorText}`);
        }

    } catch (err) {
        throw err
    }

}