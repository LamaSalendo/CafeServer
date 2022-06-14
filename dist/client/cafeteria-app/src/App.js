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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const components_1 = require("./components");
const react_1 = __importStar(require("react"));
const default_placeholder_png_1 = __importDefault(require("./images/default-placeholder.png"));
const Profile_1 = __importDefault(require("./components/Profile/Profile"));
function App() {
    const [currentPage, setCurrentPage] = (0, react_1.useState)("home");
    const [recentOrders, setRecentOrders] = (0, react_1.useState)([]);
    const [coupons, setCoupons] = (0, react_1.useState)([]);
    const [shoppingCart, setShoppingCart] = (0, react_1.useState)([]);
    const [items, setItems] = (0, react_1.useState)([]);
    const [User, setUser] = (0, react_1.useState)({
        age: "",
        class: {
            name: "",
            id: "",
        },
        id: "",
        username: "",
        credit: 0,
        currency: "",
    });
    const isLoggedIn = () => {
        return false;
    };
    if (!isLoggedIn) {
    }
    const getUserFromLoginData = () => {
        const User = {
            age: "15",
            class: {
                name: "9A",
                id: "1704",
            },
            id: "1704",
            username: "Solomon Wusu",
            credit: 20,
            currency: "EUR",
        };
        return User;
    };
    const getRecentOrders = () => {
        const recentOrders = [
            {
                price: 8.99,
                currency: "EUR",
                date: new Date().getDay(),
                items: [
                    {
                        name: "Kaugummi",
                        amount: 2,
                        price: 0.59,
                        image: default_placeholder_png_1.default,
                        id: "hjsdhd",
                        currency: "EUR",
                        categoryID: "2",
                    },
                ],
                id: "u23",
            },
            {
                price: 2.99,
                currency: "EUR",
                date: new Date().getDay(),
                items: [
                    {
                        name: "Brot",
                        amount: 2,
                        price: 0.34,
                        image: default_placeholder_png_1.default,
                        id: "hjdhssh",
                        currency: "EUR",
                        categoryID: "2",
                    },
                    {
                        name: "Penist",
                        amount: 1,
                        price: 0.2,
                        image: default_placeholder_png_1.default,
                        id: "hjfdvvvfd",
                        currency: "EUR",
                        categoryID: "2",
                    },
                ],
                id: "u§23",
            },
        ];
        return recentOrders;
    };
    const getCoupons = () => {
        const coupons = [
            {
                id: "hjhdjshd",
                image: default_placeholder_png_1.default,
                info: "Iiskskid",
                name: "kostenlose Bonbons",
                rules: {
                    amount: 1,
                    class: "9A",
                    items: [
                        {
                            id: "isds",
                            name: "sjdskj",
                            price: 0.99,
                            categoryID: "1",
                            image: default_placeholder_png_1.default,
                            currency: "EUR",
                        },
                    ],
                    stackable: false,
                    type: "fixed",
                    value: 1,
                },
            },
            {
                id: "hjhdjshdsdf",
                image: default_placeholder_png_1.default,
                info: "Iiskfdskid",
                name: "Brot",
                rules: {
                    amount: 1,
                    class: "9A",
                    items: [
                        {
                            id: "fd",
                            name: "sjdskjdf",
                            price: 0.99,
                            categoryID: "2",
                            image: default_placeholder_png_1.default,
                            currency: "EUR",
                        },
                    ],
                    stackable: false,
                    type: "fixed",
                    value: 1,
                },
            },
            {
                id: "hjhdjshd",
                image: default_placeholder_png_1.default,
                info: "Iiskskid",
                name: "Bonbons",
                rules: {
                    amount: 1,
                    class: "9A",
                    items: [
                        {
                            id: "isds",
                            name: "sjdskj",
                            price: 0.99,
                            categoryID: "3",
                            image: default_placeholder_png_1.default,
                            currency: "EUR",
                        },
                    ],
                    stackable: false,
                    type: "fixed",
                    value: 1,
                },
            },
            {
                id: "hjhdjshd",
                image: default_placeholder_png_1.default,
                info: "Iiskskid",
                name: "Bonbons",
                rules: {
                    amount: 1,
                    class: "9A",
                    items: [
                        {
                            id: "isds",
                            name: "sjdskj",
                            price: 0.99,
                            categoryID: "3",
                            image: default_placeholder_png_1.default,
                            currency: "EUR",
                        },
                    ],
                    stackable: false,
                    type: "fixed",
                    value: 1,
                },
            },
            {
                id: "hjhdjshd",
                image: default_placeholder_png_1.default,
                info: "Iiskskid",
                name: "Bonbons",
                rules: {
                    amount: 1,
                    class: "9A",
                    items: [
                        {
                            id: "isds",
                            name: "sjdskj",
                            price: 0.99,
                            categoryID: "1",
                            image: default_placeholder_png_1.default,
                            currency: "EUR",
                        },
                    ],
                    stackable: false,
                    type: "fixed",
                    value: 1,
                },
            },
        ];
        return coupons;
    };
    const getItems = () => {
        const Items = [
            {
                id: "rewfkddj",
                name: "QualitätsBrot",
                categoryID: "1",
                price: 23,
                image: default_placeholder_png_1.default,
                currency: "EUR",
            },
            {
                id: "ffsdd",
                name: "QualitätsWasser",
                categoryID: "2",
                price: 25,
                image: default_placeholder_png_1.default,
                currency: "EUR",
            },
            {
                id: "ffsdccvcxd",
                name: "QualitätsSnack",
                categoryID: "3",
                price: 25,
                image: default_placeholder_png_1.default,
                currency: "EUR",
            },
            {
                id: "rewfkdfdfdj",
                name: "QualitätsBrot",
                categoryID: "1",
                price: 23,
                image: default_placeholder_png_1.default,
                currency: "EUR",
            },
            {
                id: "ffsdfdd",
                name: "QualitätsWasser",
                categoryID: "2",
                price: 25,
                image: default_placeholder_png_1.default,
                currency: "EUR",
            },
            {
                id: "ffsdccfddfvcxd",
                name: "QualitätsSnack",
                categoryID: "3",
                price: 25,
                image: default_placeholder_png_1.default,
                currency: "EUR",
            },
            {
                id: "rewfkddfdfdfdj",
                name: "QualitätsBrot",
                categoryID: "1",
                price: 23,
                image: default_placeholder_png_1.default,
                currency: "EUR",
            },
            {
                id: "ffdfddfdff",
                name: "QualitätsWasser",
                categoryID: "2",
                price: 25,
                image: default_placeholder_png_1.default,
                currency: "EUR",
            },
            {
                id: "ffsdccfddfddfrvfvcxd",
                name: "QualitätsSnack",
                categoryID: "3",
                price: 25,
                image: default_placeholder_png_1.default,
                currency: "EUR",
            },
        ];
        return Items;
    };
    (0, react_1.useEffect)(() => {
        setUser(getUserFromLoginData());
        setRecentOrders(getRecentOrders());
        setCoupons(getCoupons());
        setItems(getItems());
    }, []);
    const AddToShoppingCart = (order) => {
        console.log(order);
        setShoppingCart((prev) => {
            const a = prev;
            if (prev.map((item) => item.id).includes(order.id)) {
                const oldOrderLocation = a.findIndex((item) => item.id === order.id);
                a[oldOrderLocation].amount += order.amount;
                return a;
            }
            a.push(order);
            return a;
        });
        setCurrentPage("shoppingcart");
    };
    const ChangeAmountOfItemInShoppingCart = (id, amount) => {
        setShoppingCart((prev) => {
            const a = prev;
            const Index = a.findIndex((item) => item.id === id);
            if (Index === -1)
                return prev;
            a[Index].amount = amount;
            return a;
        });
    };
    const DeleteItemInShoppingCart = (id) => {
        setShoppingCart((prev) => {
            return prev.filter((item) => item.id !== id);
        });
    };
    return (<div className="h-full bg-color-four ">
      <div className="fixed w-screen top-0 h-10 z-10">
        <components_1.Header />
      </div>
      <div className="relative top-10 bg-color-four">
        <components_1.Home visible={currentPage === "home"} coupons={coupons}/>
        <Profile_1.default visible={currentPage === "profile"} user={User} recentOrders={recentOrders}/>
        <components_1.Order visible={currentPage === "order"} items={items} AddToShoppingCart={AddToShoppingCart}/>
        <components_1.ShoppingCart visible={currentPage === "shoppingcart"} shoppingCart={shoppingCart} AddToShoppingCart={AddToShoppingCart} DeleteItemInShoppingCart={DeleteItemInShoppingCart} ChangeAmountOfItemInShoppingCart={ChangeAmountOfItemInShoppingCart}/>
        <components_1.Coupon visible={currentPage === "coupons"}/>
      </div>
      <div className="h-12 w-screen fixed bottom-0">
        <components_1.Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} shoppingcart={shoppingCart}/>
      </div>
    </div>);
}
exports.default = App;
