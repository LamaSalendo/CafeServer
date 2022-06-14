"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const fa_1 = require("react-icons/fa");
const io_1 = require("react-icons/io");
function Profile({ visible, user, recentOrders }) {
    console.log(user);
    console.log(recentOrders);
    const HandleClickOnTheme = (e) => {
        var _a;
        let doc;
        for (let element of e.nativeEvent.path) {
            if ((_a = element.dataset) === null || _a === void 0 ? void 0 : _a.pointto)
                doc = element;
        }
        if (!doc)
            return;
        const target = document.querySelector(`[data-name="${doc.dataset.pointto}"]`);
        if (!target)
            return;
        const isshown = target.dataset.isshown;
        if (!isshown)
            return;
        if (!parseInt(isshown)) {
            target.classList.remove("hidden");
        }
        else {
            target.classList.add("hidden");
        }
        /*target.style.setProperty(
          "display",
          !parseInt(isshown) ? "auto" : "none",
          "important"
        );*/
        //target.style.display = !parseInt(isshown) ? "" : "none";
        target.dataset.isshown = String(Number(!parseInt(isshown)));
    };
    const ConvertItemsIntoElements = (items) => {
        const Output = items.map((item) => {
            return (<div className="h-16 mt-2 border-2 border-color-three flex">
          <div className="h-full">
            <img className="h-full aspect-square" src={item.image} alt={item.name}/>
          </div>
          <div className="h-full flex items-center">
            <div className="text-xs text-color-three">
              <h1>{item.name}</h1>
              <h1>Amount: {item.amount}</h1>
              <h1>
                Price: {item.price}
                {item.currency}
              </h1>
            </div>
          </div>
        </div>);
        });
        return Output;
    };
    const RecentOrders = recentOrders.map((order) => {
        const Items = ConvertItemsIntoElements(order.items);
        return (<div className="mb-4">
        <div className="h-20 relative left-[2.5%] w-[95%] border-2 border-color-three">
          <div className="h-full flex justify-between">
            <div className="flex">
              <div className="h-full">
                <img className="h-full aspect-square" src={order.items[0].image} alt={`Recent Order from ${order.date}`}/>
              </div>
              <div className="flex justify-center flex-col">
                <div className="text-sm font-semibold text-color-two">
                  <h1>{order.items[0].name}</h1>
                </div>
                <div className="text-xs font-medium text-color-three">
                  <p>{order.date}</p>
                </div>
                <div className="text-sm font-semibold text-color-two ">
                  <h1>
                    {order.price}
                    {order.currency}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex items-center mx-2 flex-col justify-around">
              <button className="text-xs rounded-md bg-gradient-to-br from-color-one to-color-two w-24 h-8 font-bold text-color-four">
                Order Again
              </button>
              <button data-pointTo={order.id} onClick={HandleClickOnTheme} className="text-xs rounded-md bg-transparent font-bold w-24 h-8 text-color-one border-2 border-color-one">
                See more
              </button>
            </div>
          </div>
        </div>
        <div data-isShown="0" data-name={order.id} className="w-[90%] relative left-[5%] hidden">
          {Items}
        </div>
      </div>);
    });
    return (<div className={`h-full w-full bg-color-four flex justify-center ${visible ? "block" : "hidden"}`}>
      <div className={`h-full w-[80%] max-w-[480px]`}>
        <div>
          <div className="flex flex-col items-center pt-8">
            <div className="flex justify-center items-center">
              <h1 className="pr-4 text-2xl">Your Profile:</h1>
              <h2 className="text-xl">{user.username}</h2>
            </div>

            <hr className="w-full my-4 text-color-two"/>

            <div className="flex justify-center items-center">
              <h1 className="pr-4 text-xl">Class:</h1>
              <h2 className="text-xl">{user.class.name}</h2>
            </div>

            <hr className="w-full my-4 text-color-two"/>

            <div className="flex justify-center items-center">
              <h1 className="pr-4 text-xl">AccountID:</h1>
              <h2 className="text-xl">{user.id}</h2>
            </div>

            <div className="w-[80%] max-w-[480px] text-center my-8 flex justify-center">
              <button className="bg-error h-8 aspect-[9/2] rounded-md text-color-four flex items-center justify-evenly">
                <fa_1.FaTrash />
                Delete Account
              </button>
            </div>
          </div>
          <div>
            <div className="outline-2 outline-double outline-offset-8 rounded-xl outline-color-two mb-16">
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-semibold text-lg text-color-one pl-2">
                  Recent Orders:
                </h1>
                <span onClick={HandleClickOnTheme} data-pointTo="recentOrder" className="rotate-90 duration-300 ease-in-out text-color-five">
                  <io_1.IoIosArrowDropright size={20}/>
                </span>
              </div>
              <div data-isShown="0" data-name="recentOrder" className="h-auto duration-150 ease-in-out hidden">
                {RecentOrders}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-12"> </div>
      </div>
    </div>);
}
exports.default = Profile;
