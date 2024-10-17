import { userLogin } from "@/controllers/auth/";
import { Router } from "express";

const router = Router();

// User Login
router.route("/userLogin").post(userLogin);

export default router;
