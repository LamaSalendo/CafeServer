"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ai_1 = require("react-icons/ai");
const ri_1 = require("react-icons/ri");
const fa_1 = require("react-icons/fa");
const bs_1 = require("react-icons/bs");
function Navbar({ currentPage, setCurrentPage, shoppingcart }) {
    const handleClick = (e) => {
        var _a;
        const a = e.nativeEvent.path;
        let ElementName;
        for (let item of a) {
            if ((_a = item.dataset) === null || _a === void 0 ? void 0 : _a.name) {
                ElementName = item.dataset.name;
                break;
            }
        }
        setCurrentPage(ElementName);
    };
    return (<div className="bg-color-three h-full flex items-center justify-evenly">
      <div data-name="home" className={`flex flex-col items-center ${currentPage === "home" ? "text-color-five" : "text-color-four"}`} onClick={handleClick}>
        <ai_1.AiFillHome />
        <p className="text-xs">Home</p>
      </div>
      <div data-name="order" className={`flex flex-col items-center ${currentPage === "order" ? "text-color-five" : "text-color-four"}`} onClick={handleClick}>
        <bs_1.BsBagFill />
        <p className="text-xs">Order</p>
      </div>
      <div data-name="coupons" className={`flex flex-col items-center ${currentPage === "coupons" ? "text-color-five" : "text-color-four"}`} onClick={handleClick}>
        <ri_1.RiCoupon2Fill />
        <p className="text-xs">Coupons</p>
      </div>
      <div data-name="profile" className={`flex flex-col items-center ${currentPage === "profile" ? "text-color-five" : "text-color-four"}`} onClick={handleClick}>
        <fa_1.FaUser />
        <p className="text-xs">Profile</p>
      </div>
      <div data-name="shoppingcart" className={` flex-col items-center ${currentPage === "shoppingcart" ? "text-color-five" : "text-color-four"} ${shoppingcart.length ? "flex" : "hidden"}`} onClick={handleClick}>
        <fa_1.FaShoppingCart />
        <p className="text-xs">Cart</p>
      </div>
    </div>);
}
exports.default = Navbar;
