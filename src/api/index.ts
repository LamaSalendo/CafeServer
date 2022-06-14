import Category from "./category";
import Class from "./class";
import Items from "./items";
import Login from "./login";
import Order from "./order";
import { Router } from "express";
import User from "./user";

const router = Router();

router.use("/items", Items);
router.use("/category", Category);
router.use("/login", Login);
router.use("/class", Class);
router.use("/user", User);
router.use("/order", Order);
export default router;
