export interface CommentPayload {
    content: string;
    authorId: string;
    postId: string;
    parentId?: string;
}