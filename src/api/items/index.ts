import { Category, Items } from "../../Schemas";

import Image from "./image";
import { NextRequest } from "next/server";
import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.use("/image", Image);

interface ITEM {
  name: string;
  id?: string;
  price: number;
  currency: string;
  categoryID?: string;
  image?: string;
}

interface CATEGORY {
  id: string;
  name: string;
  image: string;
}

router.get("/", async (req, res) => {
  try {
    res.send(
      (await Items.find())?.map((item: any) => {
        const {
          _doc: { _id, __v, ...response },
        } = item;
        return response;
      })
    );
  } catch (err) {
    console.log(err);
  }
  res.end();
});

router.put("/create", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const { name, price, currency }: ITEM = req.body;

    const NewItem: ITEM = { name, price, currency };
    NewItem.id = uuidv4();
    console.log(req.body);
    if ("categoryID" in req.body) {
      if (await Category.exists({ id: req.body.categoryID })) {
        NewItem.categoryID = req.body.categoryID;
      } else {
        res.status(404);
        res.send({ message: "Category does not exist" });
        return;
      }
    } else if ("categoryName" in req.body) {
      if (await Category.exists({ name: req.body.categoryName })) {
        const CategoriesWithName: CATEGORY[] = await Category.find({
          name: req.body.categoryName,
        });
        if (CategoriesWithName.length > 1) {
          res.status(406);
          res.send({
            message:
              "More than one category with the same name! Please try using id",
          });
          return;
        }
        NewItem.categoryID = CategoriesWithName[0].id;
      } else {
        res.status(404);
        res.send({ message: "Category does not exist" });
        return;
      }
    } else {
      res.status(400);
      res.send({ message: "Category id or name is missing!" });
      return;
    }

    NewItem.image = `/api/items/image/${name}`;
    const {
      _doc: { _id, __v, ...response },
    } = await new Items({
      name,
      id: NewItem.id,
      price,
      categoryID: NewItem.categoryID,
      currency,
      image: NewItem.image,
    }).save();

    res.status(201);
    res.send(response);
    res.end();
    return;
  } catch (err) {
    console.error(err);
  }
  res.end();
});

export default router;
