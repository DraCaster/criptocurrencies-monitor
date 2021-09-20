import express from "express";
import userRoutes from "./modules/user/routes/userRoutes";
import securityRoutes from "./modules/security/routes/securityRoutes";
import cryptocurrencyRoutes from "./modules/cryptocurrency/routes/cryptocurrencyRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", securityRoutes);
router.use("/cryptocurrencies", cryptocurrencyRoutes);

export default router;
