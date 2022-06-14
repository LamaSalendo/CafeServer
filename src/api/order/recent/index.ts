import { Error as ErrorType } from "../../../Types";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  if (req.user === undefined || req.user === ErrorType.userNotFound) {
    res.status(403);
    res.send({ success: false, message: "Please log in and try again." });
    res.end();
    return;
  }

  res.status(200);
  //@ts-ignore
  res.send(
    //@ts-ignore
    req.user.recentOrder.map((order: any) => {
      const {
        _doc: { _id, ...EditedOrder },
      } = order;
      console.log(EditedOrder);
      return EditedOrder;
    })
  );
  res.end();
});

export default router;
