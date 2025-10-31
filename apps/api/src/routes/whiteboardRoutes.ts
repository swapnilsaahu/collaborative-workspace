import { Router } from "express";
import { createWhiteboard, getAllWhiteboard } from "../controllers/whiteboardController";
const router = Router();

router.route("/createwhiteboard").post(createWhiteboard);
router.route("/getallwhiteboards").get(getAllWhiteboard);
export default router;

