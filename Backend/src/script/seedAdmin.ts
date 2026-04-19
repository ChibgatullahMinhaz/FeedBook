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
                email: 'admin@localhost'
            }
        })

        if (adminExist) {
            throw new AppError(httpStatus.CONFLICT, "Admin already exists")
        };

        const signUpAdmin = await fetch("http://localhost:3000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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
        }
        console.log("******* SUCCESS ******")

    } catch (err) {
        throw err
    }

}