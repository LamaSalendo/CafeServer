import { Category } from "../../Schemas";
import Image from "./image";
import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.use("/image", Image);

router.get("/", async (req, res) => {
  Category.find()
    .then((data) => {
      res.send(
        data.map((category) =>
          Object({
            name: category.name,
            id: category.id,
            image: category.image,
          })
        )
      );
      res.end();
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

router.put("/create", async (req, res) => {
  const category = req.body;
  if (!category?.name) return;

  category.id = uuidv4();
  category.image = `/api/category/image/${category.name}`;
  console.log(category);
  try {
    res.send(await new Category(category).save());
  } catch (err) {
    console.error(err);
  }

  res.end();
});

export default router;
