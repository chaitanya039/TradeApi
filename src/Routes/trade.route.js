import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { getTrades, parseCSVData } from "../controllers/trade.controller.js";

// Create mini router
const router = Router();

// Create routes for trade
router.route("/").post(upload.single("file"), parseCSVData);
router.route("/").get(getTrades);

// Export trade routers
export default router;