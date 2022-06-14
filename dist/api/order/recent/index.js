"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../../Types");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    if (req.user === undefined || req.user === Types_1.Error.userNotFound) {
        res.status(403);
        res.send({ success: false, message: "Please log in and try again." });
        res.end();
        return;
    }
    res.status(200);
    //@ts-ignore
    res.send(
    //@ts-ignore
    req.user.recentOrder.map((order) => {
        const _a = order._doc, { _id } = _a, EditedOrder = __rest(_a, ["_id"]);
        console.log(EditedOrder);
        return EditedOrder;
    }));
    res.end();
});
exports.default = router;
