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
const Types_1 = require("../../Types");
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post("/", passport_1.default.authenticate("local", { failureMessage: "Wrong information" }), (req, res) => {
    //res.status(200);
    //res.send({ message: "Logged in successfully!" });
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ success: true, redirectURI: "/" });
    res.end();
});
router.get("/", (req, res) => {
    if (!req.user || req.user === Types_1.Error.userNotFound) {
        //res.status(404);
        //req.logout();
        /*
        ! FIXME logout sends error.
        ! Needs callback function
        ! Required to logout user to prevent ongoing errors
         */
        res.status(400).send({ success: false, redirectURI: "/login" });
        res.end();
        return;
    }
    const _a = req.user, { admin, recentOrder } = _a, response = __rest(_a, ["admin", "recentOrder"]);
    res.status(200);
    res.send({ success: true, message: response, redirectURI: "/" });
    res.end();
});
exports.default = router;
