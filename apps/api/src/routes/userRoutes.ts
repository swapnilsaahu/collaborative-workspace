import { Router } from "express";
import { loginUser, signupUser } from "../controllers/userController";
import { dataValidation } from "../middleware/dataValidation";
import { jwtValidation } from "../middleware/jwtMiddleware";
import { JwtPayloadSchema, SignupRequestSchema } from "@pnpmworkspace/types";
const router = Router();


router.route("/signup").post(dataValidation(SignupRequestSchema), signupUser);
router.route("/login").post(dataValidation(SignupRequestSchema), loginUser);
export default router;
