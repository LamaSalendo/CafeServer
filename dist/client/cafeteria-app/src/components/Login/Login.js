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
const ai_1 = require("react-icons/ai");
const fa_1 = require("react-icons/fa");
const gr_1 = require("react-icons/gr");
const Login = () => {
    const [InputErrorUsername, setInputErrorUsername] = (0, react_1.useState)(0);
    const [InputErrorPassword, setInputErrorPassword] = (0, react_1.useState)(0);
    const HandleSubmit = () => {
        let ErrorOccured = false;
        localStorage.setItem("loggedIn", "true");
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        if (!username || !password)
            return;
        if (username.value.trim().length <= 0) {
            setInputErrorUsername(1);
            ErrorOccured = true;
        }
        if (password.value.trim().length <= 0) {
            setInputErrorPassword(1);
            ErrorOccured = true;
        }
        if (ErrorOccured)
            return;
        const loginInformation = {
            username: username.value,
            password: password.value,
        };
        fetch("api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInformation),
        });
    };
    return (<div className="h-full">
      <div className="max-w-screen h-full bg-color-four flex items-center justify-center bg-gradient-to-br from-color-one via-color-two to-color-three">
        <div className="h-1/2 min-h-[210px] min-w-[300px] max-h-96 aspect-[150/167] lg:h-3/4 A51:h-[40%] flex flex-col justify-evenly  bg-color-four rounded-3xl">
          <div className="text-color-two text-5xl text-center font-dancingscripts">
            <h1>Cafeteria</h1>
          </div>
          <div>
            <div className="flex items-center justify-center mb-2">
              <div className={"flex h-9 w-4/5 rounded-md border-2 " +
            (InputErrorUsername ? "border-error" : "border-color-two")}>
                <div className="h-full aspect-square">
                  <fa_1.FaUser style={{ color: InputErrorUsername ? "#FF5733" : "black" }} className="h-full relative left-2"/>
                  {/*<img src={UserIcon} className="h-full" />*/}
                </div>
                <input type="text" name="User" className="w-full focus:shadow-none focus:outline-none focus:border-0 focus:ring-0 focus:ring-offset-0" id="username" placeholder="Username"/>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className={"flex h-9 w-4/5 rounded-md border-2 " +
            (InputErrorPassword ? "border-error" : "border-color-two")}>
                <div className="h-full aspect-square">
                  <ai_1.AiFillLock style={{ color: InputErrorPassword ? "#FF5733" : "black" }} className="h-full relative left-2 "/>
                </div>
                <input type="password" name="User" className="w-full focus:shadow-none focus:outline-none focus:border-0 focus:ring-0 focus:ring-offset-0" id="password" placeholder="Password"/>
              </div>
            </div>
          </div>
          <div className="h-10 flex items-center justify-center">
            <button onClick={HandleSubmit} className="h-full w-24 relative lg:bottom-5 bg-gradient-to-r from-color-one to-color-three rounded-xl text-color-four">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full flex flex-row-reverse">
        <gr_1.GrCircleInformation size={40} style={{ color: "#464AA6", opacity: "40%" }} className="fill-current text-color-two text-opacity-50 aspect-square"/>
      </div>
    </div>);
};
exports.default = Login;
