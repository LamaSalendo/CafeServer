"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
const Schemas_1 = require("../../Schemas");
const recent_1 = __importDefault(require("./recent"));
const express_1 = require("express");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
let orderArray = [];
router.use("/recent", recent_1.default);
let OrderCounter = 100;
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    var _a;
    if (req.user === Types_1.Error.userNotFound || req.user === undefined) {
        res.status(403);
        res.send({ success: false, message: "Please log in and try again." });
        res.end();
        return;
    }
    const orders = yield Promise.all((_a = req.body) === null || _a === void 0 ? void 0 : _a.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        if (!("id" in item) || !("amount" in item)) {
            return;
        }
        if (!(yield Schemas_1.Items.exists({ id: item.id }))) {
            return;
        }
        const _b = (yield Schemas_1.Items.findOne({ id: item.id }))._doc, { _id, __v } = _b, Item = __rest(_b, ["_id", "__v"]);
        Item.amount = item.amount;
        return Item;
    })));
    if (orders.includes(undefined)) {
        res.status(400);
        res.send({ success: false });
        res.end();
        return;
    }
    const PriceOfOrder = orders.reduce((accumulator, item) => {
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
        id: (0, uuid_1.v4)(),
        orderID: OrderCounter,
    };
    //@ts-ignore
    let { acknowledged } = yield Schemas_1.User.updateOne(
    //@ts-ignore
    { id: req.user.id }, { $push: { recentOrder: PlaceOrder } });
    if (!acknowledged) {
        res.status(500);
        res.send({ success: false, message: "Something went wrong." });
        res.end();
        return;
    }
    acknowledged = (yield Schemas_1.User.updateOne(
    //@ts-ignore
    { id: req.user.id }, { $inc: { credit: -PriceOfOrder } })).acknowledged;
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
}));
router.get("/", (req, res) => {
    var _a;
    //@ts-ignore
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.admin))
        return res.sendStatus(403);
    res.send(orderArray);
});
router.delete("/", (req, res) => {
    var _a;
    //@ts-ignore
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.admin))
        return res.sendStatus(403);
    if (!("id" in req.body)) {
        res.sendStatus(400);
        return;
    }
    orderArray = orderArray.filter((order) => order.orderID !== req.body.id);
    res.sendStatus(200);
});
exports.default = router;
