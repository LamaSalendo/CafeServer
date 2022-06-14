"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = __importDefault(require("./create"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use("/create", create_1.default);
exports.default = router;
