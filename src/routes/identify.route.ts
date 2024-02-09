import express from "express";
import { identify } from "../controllers/identify.controller";
import { identifyValidate } from "../middlewares/identify.validate";
const router = express.Router();

router.post("/identify", identifyValidate, identify);

export default router;