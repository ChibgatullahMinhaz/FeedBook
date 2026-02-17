import type { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const create = async (payload: Omit<Post, "id" | "createdAt" | "updatedAt">) => {
    const post = await prisma.post.create({
        data: payload
    })
    return post;
}
export const findAll = async () => {
    const posts = await prisma.post.findMany({
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