import type { Post } from "../../../generated/prisma/client";
import type { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

export const create = async (payload: Omit<Post, "id" | "createdAt" | "updatedAt">) => {
    const post = await prisma.post.create({
        data: payload
    })
    return post;
}

export const findAll = async ({ search, tags, isFeatured }: { search?: string | undefined, tags: string[] | [], isFeatured?: boolean | undefined }) => {

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

    const posts = await prisma.post.findMany({
        where: {
            AND: andConditions,

        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            title: true,
            content: true,
            isFeatured: true,
            tags: true,
            views: true,
            createdAt: true
        }
    });
    return posts;
}