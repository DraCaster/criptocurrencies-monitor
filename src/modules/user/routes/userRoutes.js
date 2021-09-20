import express from "express";
import { createUserAction, addCryptocurrencyToUserAction, fetchUserTopCryptocurrenciesAction } from "../controllers/userController";
const router = express.Router();

router.post("/", (req, res) => createUserAction(req, res));
router.post("/cryptocurrencies", (req, res) => addCryptocurrencyToUserAction(req, res));
router.get("/cryptocurrencies/:top?/:order?", (req, res) => fetchUserTopCryptocurrenciesAction(req, res));

export default router;
