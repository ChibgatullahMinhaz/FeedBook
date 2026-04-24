import { Router } from "express";
import { createComment } from "./comments.controller";
import authMiddleware from "../../middlewares/auth";
import { USER_ROLE } from "../../lib/enums/userRole";

const router = Router();
router.post('/', authMiddleware(USER_ROLE.USER, USER_ROLE.ADMIN), createComment)

const commentRoutes = router;
export default commentRoutes;