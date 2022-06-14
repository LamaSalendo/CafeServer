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
const Schemas_1 = require("../../../Schemas");
const express_1 = require("express");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!("name" in req.body)) {
        res.status(400);
        res.send({ message: "Request does not include name" });
        return;
    }
    const { name } = req.body;
    const NewClass = { name, id: (0, uuid_1.v4)() };
    try {
        const response = yield new Schemas_1.Class(NewClass).save();
        res.status(201);
        res.send({ id: response.id, name: response.name });
    }
    catch (e) {
        res.sendStatus(500);
    }
}));
exports.default = router;
