"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Coupon({ visible }) {
    return (<div className={`h-screen items-center justify-center ${visible ? "flex" : "hidden"}`}>
      <div className="text-4xl relative bottom-10">
        <h1>In Production</h1>
      </div>
    </div>);
}
exports.default = Coupon;
