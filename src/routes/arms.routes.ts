import { armsApplication } from "@/controllers/arms";
import { verifyJWT } from "@/middlewares/verifyJWT";
import { Router } from "express";

const router = Router();

// create arms application
router.route("/").post(verifyJWT,armsApplication);

export default router;
