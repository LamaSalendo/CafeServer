"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
function ShoppingCart({ visible, shoppingCart, ChangeAmountOfItemInShoppingCart, DeleteItemInShoppingCart, }) {
    var _a;
    const [, forceUpdate] = (0, react_1.useReducer)((x) => x + 1, 0);
    const HandleChangeOnAmountInput = (value, id) => {
        if (!(parseInt(value) > 0)) {
            ChangeAmountOfItemInShoppingCart(id, 1);
        }
        else {
            ChangeAmountOfItemInShoppingCart(id, parseInt(value));
        }
        forceUpdate();
    };
    const PriceOfAllItems = shoppingCart.reduce((price, item) => {
        return price + item.price * item.amount;
    }, 0);
    const ShoppingCartItems = shoppingCart.map((item) => {
        return (<div className="h-24">
        <div className="h-full flex justify-between items-center">
          <div className="h-20 aspect-square">
            <img className="h-20 aspect-square" src={item.image}/>
          </div>
          <div className="w-full h-full ml-3 flex flex-col justify-evenly">
            <div className="text-xs">
              <h1>{item.name}</h1>
              <h1>
                {item.price.toFixed(2)}
                {item.currency}
              </h1>
            </div>
            <div className="flex justify-between">
              <div className="h-6 w-6">
                <input className="w-full h-full text-center" type="number" name="amount" placeholder={item.amount.toString()} onChange={(e) => {
                HandleChangeOnAmountInput(e.target.value, item.id);
            }}/>
              </div>
              <div className="text-sm">
                <h1>
                  {(item.amount * item.price).toFixed(2)}
                  {item.currency}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>);
    });
    return (<div className={`h-full w-full bg-color-four justify-center ${visible ? "flex" : "hidden"}`}>
      <div className="w-[80%]">
        <div className="text-5xl mt-4 text-center">
          <h1>Buy now!</h1>
        </div>
        <div>
          <div className="mt-20">{ShoppingCartItems}</div>
        </div>
        <div className="flex justify-center mt-10">
          <div className="border-2 border-color-two text-color-one rounded-sm">
            <button className="h-10 px-4">
              Buy Now ({PriceOfAllItems === null || PriceOfAllItems === void 0 ? void 0 : PriceOfAllItems.toFixed(2)}
              {(_a = shoppingCart[0]) === null || _a === void 0 ? void 0 : _a.currency})
            </button>
          </div>
        </div>
      </div>
    </div>);
}
exports.default = ShoppingCart;
