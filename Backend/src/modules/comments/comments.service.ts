import { prisma } from "../../lib/prisma";
import type { CommentPayload } from "../../lib/types/interface/comment.interface"

const createComment = async (payload: CommentPayload) => {
    const {   postId, parentId } = payload;
    await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })

    if (parentId) {
        await prisma.comment.findUniqueOrThrow({
            where: {
                id: parentId
            }
        })
    }

    return prisma.comment.create({
        data: payload
    })
}
export const commentService = {
    createComment
}