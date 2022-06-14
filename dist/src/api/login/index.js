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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post("/", passport_1.default.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
    //res.status(200);
    //res.send({ message: "Logged in successfully!" });
    res.redirect("/");
});
router.get("/", (req, res) => {
    if (!req.user) {
        //res.status(404);
        res.redirect("/login");
        res.end();
        return;
    }
    const _a = req.user, { admin } = _a, response = __rest(_a, ["admin"]);
    res.status(200);
    res.send(response);
    res.end();
});
exports.default = router;
