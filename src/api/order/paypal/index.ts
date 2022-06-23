import { Error as ErrorType, Order } from "../../../Types";
import { GetOrderCounter, IncrementOrderCounter, orderArray } from "..";
import { Items, User } from "../../../Schemas";

import { Router } from "express";
import request from "request";
import { v4 as uuidv4 } from "uuid";

const UserOrders = new Map<string, Order[]>();
const PaymentIds = new Map<
  string,
  {
    data: {
      amount: {
        total: number;
        currency: any;
      };
      items_list: {
        items: {
          name: string;
          description: string;
          quantity: string;
          price: string;
          currency: string;
          id: string;
        }[];
      };
    }[];
    rawOrder: any[];
  }
>();

const router = Router();

const CLIENT =
  "AUibcfm8qnVuriuNjvNGt8qRibcG7YUWlw4nrdDNruGkkMMOB-MzIPH4Zq9DBlg_e-dA_AAO9rXNXcKo";
const SECRET =
  "EKFfvMPybcUG5Fncv2TxyzbL3AeDGzI7r0iiz0tyv3ar97bTak3FGc-HY0Vww4tI7IWseF-T3KQBTIHM";
const PAYPAL_API = "https://api-m.sandbox.paypal.com";

router.post("/", async (req, res) => {
  if (req.user === undefined || req.user === ErrorType.userNotFound) {
    res.status(403);
    res.send({ success: false, message: "Please log in and try again." });
    res.end();
    return;
  }
  //@ts-ignore
  if (!UserOrders.has(req.user.id)) {
    res.status(400);
    res.send({ success: false, message: "Please set order first." });
    res.end();
    return;
  }
  const orders1 = await Promise.all(
    //@ts-ignore
    // NOTE May cause Errors
    UserOrders.get(req.user.id).map(async (item: Order) => {
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

  if (orders1.includes(undefined)) {
    res.status(400);
    res.send({ success: false });
    res.end();
    return;
  }

  const orders = orders1.map((item: Order) => {
    return {
      name: item.name,
      description: item.name,
      quantity: item.amount.toString(),
      price: item.price.toFixed(2),
      currency: item.currency,
      id: item.id,
    };
  });
  console.log(orders);
  const PriceOfOrder: number = orders1.reduce((accumulator, item) => {
    return accumulator + item.price * item.amount;
  }, 0);

  request.post(
    PAYPAL_API + "/v1/payments/payment",
    {
      auth: {
        user: CLIENT,
        pass: SECRET,
      },
      body: {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        transactions: [
          {
            amount: {
              total: PriceOfOrder,
              //@ts-ignore
              currency: req.user.currency,
            },
            items_list: {
              items: orders,
            },
          },
        ],
        redirect_urls: {
          return_url: "https://example.com",
          cancel_url: "https://example.com",
        },
      },

      json: true,
    },
    (err, response) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      // 3. Return the payment ID to the client
      //@ts-ignore
      PaymentIds.set(response.body.id, {
        //@ts-ignore
        data: [
          {
            amount: {
              total: PriceOfOrder,
              //@ts-ignore
              currency: req.user.currency,
            },
            items_list: {
              items: orders,
            },
          },
        ],
        rawOrder: orders1,
      });
      setTimeout(() => {
        PaymentIds.delete(response.body.id);
      }, 600000);
      res.json({
        id: response.body.id,
      });
    }
  );
});

router.post("/execute", (req, res) => {
  var paymentID = req.body.paymentID;
  var payerID = req.body.payerID;
  // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
  const transactions = PaymentIds.get(req.body.paymentID);
  if (!transactions) {
    res.sendStatus(400);
    return;
  }
  request.post(
    PAYPAL_API + "/v1/payments/payment/" + paymentID + "/execute",
    {
      auth: {
        user: CLIENT,
        pass: SECRET,
      },
      body: {
        payer_id: payerID,
        transactions: transactions.data,
      },
      json: true,
    },
    async (err, response) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      // 4. Return a success response to the client
      const PlaceOrder = {
        price: transactions.data[0].amount.total,
        currency: transactions.data[0].amount.currency,
        date: new Date(Date.now()),
        items: transactions.rawOrder,
        id: uuidv4(),
        orderID: GetOrderCounter(),
      };
      IncrementOrderCounter();
      orderArray.push();

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
      res.send({ success: true, orderID: PlaceOrder.orderID });
    }
  );
});

router.put("/setItems", async (req, res) => {
  if (req.user === undefined || req.user === ErrorType.userNotFound) {
    res.status(403);
    res.send({ success: false, message: "Please log in and try again." });
    res.end();
    return;
  }
  //@ts-ignore
  UserOrders.set(req.user.id, req.body);
  res.status(201);
  res.send({ sucess: true, message: "Order was created successfully." });
  res.end();
  setTimeout(() => {
    //@ts-ignore
    if (!UserOrders.has(req.user.id)) return;
    //@ts-ignore
    UserOrders.delete(req.user.id);
  }, 60000);
});

export default router;
