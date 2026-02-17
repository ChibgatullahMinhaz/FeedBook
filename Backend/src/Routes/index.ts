import { Router, type Request, type Response } from "express";

const router = Router();
router.use("/posts", (await import("../modules/posts/post.routes")).default);
router.get("/health", (req: Request, res: Response) => {
  res.json({ message: "Hello from Social App API!" });
});

export default router;