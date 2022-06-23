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
const Types_1 = require("../../../Types");
const __1 = require("..");
const Schemas_1 = require("../../../Schemas");
const express_1 = require("express");
const request_1 = __importDefault(require("request"));
const uuid_1 = require("uuid");
const UserOrders = new Map();
const PaymentIds = new Map();
const router = (0, express_1.Router)();
const CLIENT = "AUibcfm8qnVuriuNjvNGt8qRibcG7YUWlw4nrdDNruGkkMMOB-MzIPH4Zq9DBlg_e-dA_AAO9rXNXcKo";
const SECRET = "EKFfvMPybcUG5Fncv2TxyzbL3AeDGzI7r0iiz0tyv3ar97bTak3FGc-HY0Vww4tI7IWseF-T3KQBTIHM";
const PAYPAL_API = "https://api-m.sandbox.paypal.com";
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user === undefined || req.user === Types_1.Error.userNotFound) {
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
    const orders1 = yield Promise.all(
    //@ts-ignore
    // NOTE May cause Errors
    UserOrders.get(req.user.id).map((item) => __awaiter(void 0, void 0, void 0, function* () {
        if (!("id" in item) || !("amount" in item)) {
            return;
        }
        if (!(yield Schemas_1.Items.exists({ id: item.id }))) {
            return;
        }
        const _a = (yield Schemas_1.Items.findOne({ id: item.id }))._doc, { _id, __v } = _a, Item = __rest(_a, ["_id", "__v"]);
        Item.amount = item.amount;
        return Item;
    })));
    if (orders1.includes(undefined)) {
        res.status(400);
        res.send({ success: false });
        res.end();
        return;
    }
    const orders = orders1.map((item) => {
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
    const PriceOfOrder = orders1.reduce((accumulator, item) => {
        return accumulator + item.price * item.amount;
    }, 0);
    request_1.default.post(PAYPAL_API + "/v1/payments/payment", {
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
    }, (err, response) => {
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
    });
}));
router.post("/execute", (req, res) => {
    var paymentID = req.body.paymentID;
    var payerID = req.body.payerID;
    // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    const transactions = PaymentIds.get(req.body.paymentID);
    if (!transactions) {
        res.sendStatus(400);
        return;
    }
    request_1.default.post(PAYPAL_API + "/v1/payments/payment/" + paymentID + "/execute", {
        auth: {
            user: CLIENT,
            pass: SECRET,
        },
        body: {
            payer_id: payerID,
            transactions: transactions.data,
        },
        json: true,
    }, (err, response) => __awaiter(void 0, void 0, void 0, function* () {
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
            id: (0, uuid_1.v4)(),
            orderID: (0, __1.GetOrderCounter)(),
        };
        (0, __1.IncrementOrderCounter)();
        __1.orderArray.push();
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
        res.send({ success: true, orderID: PlaceOrder.orderID });
    }));
});
router.put("/setItems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user === undefined || req.user === Types_1.Error.userNotFound) {
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
        if (!UserOrders.has(req.user.id))
            return;
        //@ts-ignore
        UserOrders.delete(req.user.id);
    }, 60000);
}));
exports.default = router;
