"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = __importDefault(require("./category"));
const class_1 = __importDefault(require("./class"));
const items_1 = __importDefault(require("./items"));
const login_1 = __importDefault(require("./login"));
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const router = (0, express_1.Router)();
router.use("/items", items_1.default);
router.use("/category", category_1.default);
router.use("/login", login_1.default);
router.use("/class", class_1.default);
router.use("/user", user_1.default);
exports.default = router;
