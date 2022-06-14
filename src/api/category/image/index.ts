import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

router.get("/:name", async (req, res) => {
  const pathOfImage = path.join(
    __dirname,
    "../../../../images/category/" + req.params.name + ".png"
  );
  try {
    await fs.promises.access(pathOfImage, fs.constants.F_OK);
    res.sendFile(pathOfImage);
  } catch {
    res.sendFile(
      path.join(__dirname, "../../../../images/default-placeholder.png")
    );
  }
});

export default router;
