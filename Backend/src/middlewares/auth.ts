import type { NextFunction, Request, Response } from "express"
import { auth as betterAuth } from "../lib/auth";
import httpStatus from "http-status";
import sendResponse from "../lib/utils/sendResponse";

interface AuthRequest extends Request {
    user?: any;
    session?: any;
}

const authMiddleware = (...roles: any) => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers as any,
            });

            if (!session) {
                return sendResponse(res, {
                    success: false,
                    statusCode: httpStatus.UNAUTHORIZED,
                    message: "Your Are Unauthorized ! Please Login First",
                })

            }
            if (!session.user.emailVerified) {
                return sendResponse(res, {
                    success: false,
                    statusCode: httpStatus.FORBIDDEN,
                    message: "Your Email is not verified ! Please Verify Your Email First",
                })
            }

            req.user = session.user;
            req.session = session.session;

        } catch (error) {
            return sendResponse(res, {
                success: false,
                statusCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: "An error occurred while authenticating the user",
                data: error instanceof Error ? error.message : error,
            });
        }
        if (roles.length && !roles.includes(req.user.role)) {
            return sendResponse(res, {
                success: false,
                statusCode: httpStatus.FORBIDDEN,
                message: "You don't have permission to access this resource",
            })
        }
    }
}


export default authMiddleware;