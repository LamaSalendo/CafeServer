import { Error as ErrorType, Order } from "../../Types";
import { Items, User } from "../../Schemas";

import Recent from "./recent";
import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();
let orderArray: any = [];
router.use("/recent", Recent);
let OrderCounter = 100;
router.post("/", async (req, res) => {
  /*
    *Aspected Response
    {
        amount: number
        categoryID: string
        currency: string
        id: string
        image: string
        name: string
        price: number
    }
    */
  // FIXME Not seeing that req.user is undefined

  if (req.user === ErrorType.userNotFound || req.user === undefined) {
    res.status(403);
    res.send({ success: false, message: "Please log in and try again." });
    res.end();
    return;
  }
  const orders = await Promise.all(
    req.body?.map(async (item: Order) => {
      if (!("id" in item) || !("amount" in item)) {
        return;
      }
      if (!(await Items.exists({ id: item.id }))) {
        return;
      }
      const {
        _doc: { _id, __v, ...Item },
      } = await Items.findOne({ id: item.id });
      Item.amount = item.amount;
      return Item;
    })
  );

  if (orders.includes(undefined)) {
    res.status(400);
    res.send({ success: false });
    res.end();
    return;
  }

  const PriceOfOrder: number = orders.reduce((accumulator, item) => {
    return accumulator + item.price * item.amount;
  }, 0);

  //@ts-ignore
  if (PriceOfOrder > req.user.credit) {
    res.status(403);
    res.send({ success: false, message: "Not enough money to buy" });
    res.end();
    return;
  }

  const PlaceOrder = {
    price: PriceOfOrder,
    currency: "EUR",
    date: new Date(Date.now()),
    items: orders,
    id: uuidv4(),
    orderID: OrderCounter,
  };

  //@ts-ignore
  let { acknowledged } = await User.updateOne(
    //@ts-ignore
    { id: req.user.id },
    { $push: { recentOrder: PlaceOrder } }
  );

  if (!acknowledged) {
    res.status(500);
    res.send({ success: false, message: "Something went wrong." });
    res.end();
    return;
  }

  acknowledged = (
    await User.updateOne(
      //@ts-ignore
      { id: req.user.id },
      { $inc: { credit: -PriceOfOrder } }
    )
  ).acknowledged;

  if (!acknowledged) {
    res.status(500);
    res.send({ success: false, message: "Something went wrong." });
    res.end();
    return;
  }

  OrderCounter++;
  // @ts-ignore
  (PlaceOrder.name = req.user.username), orderArray.push(PlaceOrder);
  res.status(200).send({
    success: true,
    orderID: PlaceOrder.orderID,
  });
  res.end();
});
router.get("/", (req, res) => {
  //@ts-ignore
  if (!req.user?.admin) return res.sendStatus(403);
  res.send(orderArray);
});

router.delete("/", (req, res) => {
  //@ts-ignore
  if (!req.user?.admin) return res.sendStatus(403);
  if (!("id" in req.body)) {
    res.sendStatus(400);
    return;
  }
  orderArray = orderArray.filter((order: any) => order.orderID !== req.body.id);
  res.sendStatus(200);
});
export default router;
