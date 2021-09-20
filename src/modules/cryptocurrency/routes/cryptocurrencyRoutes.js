import express from "express";
import { fetchCryptocurrenciesAction } from "../controllers/cryptocurrencyController";
const router = express.Router();

router.get("/:page?/:itemsPage?/:order?", (req, res) => fetchCryptocurrenciesAction(req, res));

export default router;
