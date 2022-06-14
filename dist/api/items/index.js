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
const Schemas_1 = require("../../Schemas");
const image_1 = __importDefault(require("./image"));
const express_1 = require("express");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
router.use("/image", image_1.default);
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        res.send((_a = (yield Schemas_1.Items.find())) === null || _a === void 0 ? void 0 : _a.map((item) => {
            const _a = item._doc, { _id, __v } = _a, response = __rest(_a, ["_id", "__v"]);
            return response;
        }));
    }
    catch (err) {
        console.log(err);
    }
    res.end();
}));
router.put("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Content-Type", "application/json");
    try {
        const { name, price, currency } = req.body;
        const NewItem = { name, price, currency };
        NewItem.id = (0, uuid_1.v4)();
        console.log(req.body);
        if ("categoryID" in req.body) {
            if (yield Schemas_1.Category.exists({ id: req.body.categoryID })) {
                NewItem.categoryID = req.body.categoryID;
            }
            else {
                res.status(404);
                res.send({ message: "Category does not exist" });
                return;
            }
        }
        else if ("categoryName" in req.body) {
            if (yield Schemas_1.Category.exists({ name: req.body.categoryName })) {
                const CategoriesWithName = yield Schemas_1.Category.find({
                    name: req.body.categoryName,
                });
                if (CategoriesWithName.length > 1) {
                    res.status(406);
                    res.send({
                        message: "More than one category with the same name! Please try using id",
                    });
                    return;
                }
                NewItem.categoryID = CategoriesWithName[0].id;
            }
            else {
                res.status(404);
                res.send({ message: "Category does not exist" });
                return;
            }
        }
        else {
            res.status(400);
            res.send({ message: "Category id or name is missing!" });
            return;
        }
        NewItem.image = `/api/items/image/${name}`;
        const _b = (yield new Schemas_1.Items({
            name,
            id: NewItem.id,
            price,
            categoryID: NewItem.categoryID,
            currency,
            image: NewItem.image,
        }).save())._doc, { _id, __v } = _b, response = __rest(_b, ["_id", "__v"]);
        res.status(201);
        res.send(response);
        res.end();
        return;
    }
    catch (err) {
        console.error(err);
    }
    res.end();
}));
exports.default = router;
