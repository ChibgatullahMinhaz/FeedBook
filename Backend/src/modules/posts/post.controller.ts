import type { Response, Request, NextFunction } from "express";
import sendResponse from "../../lib/utils/sendResponse";
import HttpStatus from "http-status";
import AppError from "../../error/AppError";
import * as postService from "./post.service";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        if (!data) {
            throw new AppError(HttpStatus.BAD_REQUEST, "Post data is required");
        }
        const result = await postService.create(data);
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

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await postService.findAll();
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: "Posts retrieved successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
}