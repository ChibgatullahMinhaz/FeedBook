import { Router } from "express";
import * as  postController from "./post.controller";
import authMiddleware from "../../middlewares/auth";
import { USER_ROLE } from "../../lib/enums/userRole";

const router: Router = Router();
router.post("/create", authMiddleware(USER_ROLE.USER, USER_ROLE.ADMIN), postController.createPost);
router.get("/all", postController.getAllPosts);
router.get("/:postId", postController.getPostById)

const postRouters = router
export default postRouters;