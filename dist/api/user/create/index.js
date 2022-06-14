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
Object.defineProperty(exports, "__esModule", { value: true });
const Schemas_1 = require("../../../Schemas");
const express_1 = require("express");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
function hasSyntax(obj) {
    return (("age" in obj && "username" in obj && "password" in obj) ||
        ("classID" in obj && "className" in obj));
}
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //@ts-ignore
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.admin) !== true) {
        //@ts-ignore
        res.sendStatus(403);
        res.end();
        return;
    }
    //@ts-ignore
    if (!hasSyntax(req.body)) {
        res.sendStatus(400);
        return;
    }
    const { age, username, password } = req.body;
    const NewUser = {
        age,
        username,
        password,
    };
    if ("classID" in req.body) {
        try {
            //@ts-ignore
            if (!(yield Schemas_1.Class.exists({ id: req.body.classID }))) {
                res.status(404);
                res.send({ message: "Class not found" });
                return;
            }
            //@ts-ignore
            const UsersClass = yield Schemas_1.Class.findOne({ id: req.body.classID });
            //@ts-ignore
            NewUser.classID = UsersClass.id;
            //NewUser.class = { id: UsersClass.id, name: UsersClass.name };
        }
        catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }
    else if ("className" in req.body) {
        try {
            //@ts-ignore
            if (!(yield Schemas_1.Class.exists({ name: req.body.className }))) {
                res.status(404);
                res.send({ message: "Class not found" });
                return;
            }
            //@ts-ignore
            console.log(req.body.className);
            //@ts-ignore
            const UsersClass = yield Schemas_1.Class.find({ name: req.body.className });
            //@ts-ignore
            NewUser.classID = UsersClass[0].id;
            if (UsersClass.length > 1) {
                res.status(406);
                res.send({ message: "Too many classes with same name" });
                return;
            }
            //NewUser.class = { id: UsersClass[0].id, name: UsersClass[0].name };
        }
        catch (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
    }
    NewUser.id = (0, uuid_1.v4)();
    try {
        const _b = (yield new Schemas_1.User(NewUser).save())
            ._doc, { _id, admin, __v } = _b, response = __rest(_b, ["_id", "admin", "__v"]);
        res.status(201);
        res.send(response);
    }
    catch (err) {
        res.status(500);
    }
    res.end();
}));
exports.default = router;
