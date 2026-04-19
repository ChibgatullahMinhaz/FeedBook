import type { Post, PostStatus } from "../../../generated/prisma/client";
import type { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

export const create = async (payload: Omit<Post, "id" | "createdAt" | "updatedAt">) => {
    const post = await prisma.post.create({
        data: payload
    })
    return post;
}

export const findAll = async ({
    search,
    tags,
    isFeatured,
    status,
    authorId,
    page,
    limit,
    skip,
    sortBy,
    sortOrder
}: {
    search: string | undefined,
    tags: string[] | [],
    isFeatured: boolean | undefined,
    status: PostStatus | undefined,
    authorId: string | undefined,
    page: number,
    limit: number,
    skip: number,
    sortBy: string,
    sortOrder: string
}) => {
    const andConditions: PostWhereInput[] = [];
    if (search) {
        andConditions.push({
            OR: [
                {
                    title: {
                        contains: search,
                        mode: "insensitive"
                    },
                },
                {
                    content: {
                        contains: search,
                        mode: "insensitive"
                    }
                }, {
                    tags: {
                        has: search
                    }
                }
            ]
        })
    }
    if (tags.length > 0) {
        andConditions.push({
            tags: {
                hasEvery: tags
            }
        })
    }
    if (isFeatured !== undefined) {
        andConditions.push({
            isFeatured: isFeatured
        })
    }

    if (status) {
        andConditions.push({
            status
        })
    }
    if (typeof isFeatured === 'boolean') {
        andConditions.push({
            isFeatured
        })
    }

    if (authorId) {
        andConditions.push({
            authorId
        })
    }
    const posts = await prisma.post.findMany({
        take: limit,
        skip,
        where: {
            AND: andConditions,
        },
        orderBy: {
            [sortBy]: sortOrder
        },
        select: {
            id: true,
            title: true,
            content: true,
            isFeatured: true,
            tags: true,
            views: true,
            createdAt: true
        },

    });
    return posts;
}