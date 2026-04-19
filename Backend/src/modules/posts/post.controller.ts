import type { Response, Request, NextFunction } from "express";
import sendResponse from "../../lib/utils/sendResponse";
import HttpStatus from "http-status";
import AppError from "../../error/AppError";
import * as postService from "./post.service";
import paginationsAndSortingHelper from "../../helpers/paginationsAndSortingHelper";
import type { PostStatus } from "../../../generated/prisma/client";

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
        const { search } = req.query;
        const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
        const searchString = typeof search === 'string' ? search : undefined
        const isFeatured = req.query.isFeatured
            ? req.query.isFeatured === 'true'
                ? true
                : req.query.isFeatured === 'false'
                    ? false
                    : undefined
            : undefined;

        const status = req.query.status as PostStatus | undefined
        const authorId = req.query.authorId as string | undefined

        const { page, limit, skip, sortBy, sortOrder } = paginationsAndSortingHelper(req.query)


        const result = await postService.findAll({ search: searchString, tags, isFeatured, status, authorId, page, limit, skip, sortBy, sortOrder });
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