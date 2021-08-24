import { cartVar } from "../config/reactiveVariabel";
import { useReactiveVar } from "@apollo/client";

const Cart = () => {
  const cartItems = useReactiveVar(cartVar);
  // console.log("cartItems", cartItems);

  const deletItem = (id) => {
    let newItem = [];
    cartItems.map((el) => {
      if (el._id !== id) {
        newItem = [...newItem, el];
      }
    });
    cartVar(newItem);
  };

  return (
    <div
      className="
         fixed
         hidden
         md:flex flex-col
         top-14
         bottom-14
         right-0
         w-14
         lg:w-80
         md:w-64
         mb-14
         bg-white
         shadow-xl
         xl
         dark:bg-gray-900
         h-screen
         text-black
         transition-all
         duration-300
         border-none
         z-10
       "
    >
      <div className="h-full rounded-xl w-auto m-4 bg-gray-200">
        <h1 className="ml-3 mt-3 font-bold text-lg text-gray-800">
          Detail Order:
        </h1>
        <div className="my-3 mx-3">
          {/* Card Item Food Order */}
          {cartItems.length !== 0 &&
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex w-full bg-white rounded-xl shadow-lg mt-2"
              >
                <img
                  className="rounded-xl w-12 m-1"
                  src="https://ik.imagekit.io/damario789/bakmipolim/Bakmi-Ayam-Original-Komplit_ESX7TDS3A.jpeg?updatedAt=1627366608044"
                />
                <div className="mr-2 ml-1 w-full flex flex-col justify-start mt-1">
                  <div className="flex items-center justify-between">
                    <h1 className="font-bold text-gray-800">{item.name}</h1>
                    <button
                      onClick={() => deletItem(item._id)}
                      title="Delete item"
                    >
                      <i className="fas fa-times mr-1 text-red-600"></i>
                    </button>
                  </div>
                  <div className="flex justify-between w-full text-sm">
                    <div
                      className="
                   bg-green-500
                   p-2.5
                   w-3
                   h-3
                   rounded-full
                   flex
                   items-center
                   justify-center
                   text-white text-xs
                   font-normal
                 "
                    >
                      1
                    </div>
                    <div className="font-semibold">Rp. {item.price}</div>
                  </div>
                </div>
              </div>
            ))}

          {/* Card Item Food Order End */}
        </div>
      </div>
      <button
        className="
           bg-yellow-500
           mb-3
           mx-4
           rounded-lg
           py-2
           hover:bg-green-600 hover:text-white
           shadow-xl
           text-gray-800
           font-bold
           text-2xl
         "
      >
        CHECKOUT
      </button>
      <div className="h-auto w-auto m-4 bg-white text-white">@</div>
    </div>
  );
};

export default Cart;
