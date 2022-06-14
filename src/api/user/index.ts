import Create from "./create";
import { Router } from "express";

const router = Router();

router.use("/create", Create);

export default router;
