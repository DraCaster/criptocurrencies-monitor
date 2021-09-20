import express from "express";
import { authAction } from "../controllers/securityController";
const router = express.Router();

router.post("/", (req, res) => authAction(req, res));

export default router;
