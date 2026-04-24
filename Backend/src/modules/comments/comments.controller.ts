import type { RequestHandler } from "express";
import HttpStatus from "http-status";
import sendResponse from "../../lib/utils/sendResponse";
import { commentService } from "./comments.service";

export const createComment: RequestHandler = async (req, res, next) => {
    try {
        const data = req.body;
        const user = req.user;

        if (!data) {
            sendResponse(res, {
                statusCode: HttpStatus.BAD_REQUEST,
                success: false,
                message: "Post data is required",
                data: null,
            });
        }
        data.authorId = user?.id;

        const result = await commentService.createComment(data);
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: "Post created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
}