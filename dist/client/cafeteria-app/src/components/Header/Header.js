"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Header() {
    return (<div className="h-full text-center flex justify-center items-center bg-color-three">
      <h1 className="font-dancingscripts font-extrabold text-xl text-color-four">
        Cafeteria
      </h1>
    </div>);
}
exports.default = Header;
