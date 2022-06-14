import { Class } from "../../../Schemas";
import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.put("/", async (req, res) => {
  if (!("name" in req.body)) {
    res.status(400);
    res.send({ message: "Request does not include name" });
    return;
  }
  const { name }: { name: string } = req.body;

  const NewClass = { name, id: uuidv4() };
  try {
    const response = await new Class(NewClass).save();
    res.status(201);
    res.send({ id: response.id, name: response.name });
  } catch (e) {
    res.sendStatus(500);
  }
});

export default router;
