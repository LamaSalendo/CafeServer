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
exports.sessions = void 0;
const Schemas_1 = require("./Schemas");
const passport_local_1 = __importDefault(require("passport-local"));
const api_1 = __importDefault(require("./api"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const sessions = new Map();
exports.sessions = sessions;
const Domain = "localhost";
dotenv_1.default.config();
mongoose_1.default.connect("mongodb+srv://solomon:j7adeCT8OzkotaO7@main.iiaq7.mongodb.net/?retryWrites=true&w=majority");
//@ts-ignore
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.disable("x-powered-by");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//@ts-ignore
//app.use(cors({ origin: "*" }));
app.use((0, morgan_1.default)("dev"));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", 
    //@ts-ignore
    req.header("origin") ||
        req.header("x-forwarded-host") ||
        req.header("referer") ||
        req.header("host"));
    next();
});
//@ts-ignore
passport_1.default.serializeUser((user, done) => {
    const CurrentUser = Schemas_1.User.findOne({
        username: user.username,
        password: user.password,
    })
        .then((user) => {
        done(null, user.id);
    })
        .catch((err) => {
        done(err);
    });
});
passport_1.default.deserializeUser((id, done) => {
    if (!Schemas_1.User.exists({ id })) {
        done(null, "User not found");
        return;
    }
    Schemas_1.User.findOne({ id })
        .then((_a) => { var _b, _id, __v, user; return __awaiter(void 0, void 0, void 0, function* () {
        _b = _a._doc, { _id, __v } = _b, user = __rest(_b, ["_id", "__v"]);
        try {
            if (!(yield Schemas_1.Class.exists({ id: user.classID }))) {
                done(null, user);
                return;
            }
        }
        catch (err) {
            console.error(err);
            done(err);
        }
        Schemas_1.Class.findOne({ id: user.classID })
            .then((data) => {
            const User = user;
            User.class = { name: data.name, id: data.id };
            done(null, User);
        })
            .catch((err) => {
            console.error(err);
            done(err);
        });
    }); })
        .catch((err) => {
        console.error(err);
        done(err);
    });
});
passport_1.default.use(
//@ts-ignore
new passport_local_1.default((username, password, done) => {
    if (!Schemas_1.User.exists({ username, password })) {
        done("Not allowed");
        return;
    }
    Schemas_1.User.findOne({ username, password })
        .then((user) => {
        done(null, user);
        return;
    })
        .catch((err) => {
        console.error(err);
        done(err);
        return;
    });
}));
app.use((0, express_session_1.default)({
    secret: "ophgreoighe98rt4erz843ter",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/api", api_1.default);
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
