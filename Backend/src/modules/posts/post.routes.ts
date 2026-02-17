import { Router } from "express";
import * as  postController from "./post.controller";

const router: Router = Router();
router.post("/create", postController.createPost);
router.get("/all", postController.getAllPosts);

const postRouters = router
export default postRouters;