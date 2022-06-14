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
Object.defineProperty(exports, "__esModule", { value: true });
const Schemas_1 = require("../../Schemas");
const express_1 = require("express");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Schemas_1.Category.find()
        .then((data) => {
        res.send(data.map((category) => Object({
            name: category.name,
            id: category.id,
            image: category.image,
        })));
        res.end();
    })
        .catch((err) => {
        console.error(err);
        res.end();
    });
}));
router.put("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.body;
    if (!(category === null || category === void 0 ? void 0 : category.name))
        return;
    category.id = (0, uuid_1.v4)();
    category.image = `/api/category/image/${category.name}`;
    console.log(category);
    try {
        res.send(yield new Schemas_1.Category(category).save());
    }
    catch (err) {
        console.error(err);
    }
    res.end();
}));
exports.default = router;
