import { Router } from "express";
import { signupUser } from "../controllers/userController";
const router = Router();


router.route("/signup").post(signupUser);
export default router;
