import { useMutation, useReactiveVar } from "@apollo/client";
import Swal from "sweetalert2";
import { cartVar, totalVar, itemVar } from "../config/reactiveVariabel";
import { EDIT_STOCK_ITEM, FETCH_ALL_STOCK_ITEM } from "../config/StockItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const CardItem = ({ stockItems, setCardItem, cartItem }) => {
  const handleSubmit = (e, item) => {
    e.preventDefault();
    // console.log("ITemmmmm", item);
    const quantity = e.target[0].value;
    const newItem = Object.assign({}, item);
    newItem.index = cartItem.length + 1;
    console.log(quantity);
    const cardItemAdd = {
      id: cartItem.length + 1,
      name: newItem.name,
      items: newItem,
      qty: Number(quantity),
      total: Number(quantity) * newItem.price,
    };
    console.log("cardItem", cardItemAdd);
    setCardItem([...cartItem, cardItemAdd]);
  };
  // const cartItems = useReactiveVar(cartVar);
  // const stockItems = useReactiveVar(itemVar);
  // const totalCarts = useReactiveVar(totalVar);
  // const [editStockTotalItem] = useMutation(EDIT_STOCK_ITEM, {
  //   refetchQueries: [FETCH_ALL_STOCK_ITEM],
  // });

  // console.log("CART", cartItems);

  // const handleSubmit = (e, item) => {
  //   e.preventDefault();
  //   const quantity = e.target[0].value;
  //   if (!quantity || quantity == 0) {
  //     toast.error("Make sure you insert quantity stock", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   } else if (item.stock >= quantity) {
  //     // let newCartItem = [];
  //     if (cartItems.length === 0) {
  //       cartVar([
  //         ...cartItems,
  //         {
  //           id: item._id,
  //           name: item.name,
  //           items: [item],
  //           qty: Number(quantity),
  //           total: Number(quantity) * item.price,
  //         },
  //       ]);
  //     } else {
  //       cartItems.map((el) => {
  //         if (el.id == item._id) {
  //           el.items = [...el.items, item];
  //           el.qty = el.qty + Number(quantity);
  //           el.total = el.total + Number(quantity) * item.price;
  //         } else {
  //           cartVar([
  //             ...cartItems,
  //             {
  //               id: item._id,
  //               name: item.name,
  //               items: [item],
  //               qty: Number(quantity),
  //               total: Number(quantity) * item.price,
  //             },
  //           ]);
  //         }
  //       });
  //       // console.log(cartItems);
  //     }
  //     let newStockItem = [];
  //     stockItems.map((el) => {
  //       if (el._id === item._id) {
  //         let item = { ...el };
  //         item.stock = item.stock - Number(quantity);
  //         // console.log("EL", item);
  //         newStockItem = [...newStockItem, item];
  //       } else {
  //         newStockItem = [...newStockItem, el];
  //       }
  //     });
  //     itemVar(newStockItem);
  //     console.log("Masuk 3333", stockItems);
  //     console.log("Masuk 1111", newStockItem);
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Not enough stock!",
  //     });
  //   }
  // };

  // useEffect(() => {}, [stockItems, cartItems]);

  return (
    <div
      className="
         grid grid-cols-1
         sm:grid-cols-2
         rounded-t-3xl mt-32
         lg:grid-cols-4
         px-2
       "
    >
      {/* Card Item */}
      {stockItems.map((item, index) => (
        <div
          key={index}
          className="
           text-white
           font-medium mx-2 my-2
           bg-white rounded-xl shadow-lg
         "
        >
          <div className="w-50 h-30">
            <img className=" rounded-xl w-full p-2" src={item.imageUrl} />
          </div>
          <div className="mx-3">
            <div className="text-gray-800 font-bold">{item.name}</div>
            <div className="flex justify-between mt-1">
              <div className="text-gray-800 text-sm">Rp. {item.price}</div>
              <div className="bg-blue-200 text-sm w-16 text-center text-blue-700 rounded-md font-medium">
                Stock: {item.stock}
              </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e, item)}>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="
              text-black
                    text-sm
                    placeholder-gray-500
                    pl-3
                    pr-3
                    mt-3
                    rounded-xl
                    border border-gray-400
                    w-full
                    py-1
                    focus:outline-none focus:border-blue-400
                  "
                placeholder="Quantity item"
              />
              <button
                // onClick={() => addToCart(item)}
                type="submit"
                className="
               mt-2
               mb-3
               w-full
               text-xs
               bg-green-500
               hover:bg-green-600
               rounded-xl
               p-2
               text-white
               font-bold shadow-lg
               justify-center items-center
             "
              >
                <i className="fas fa-plus mr-2"></i>ADD TO CART
              </button>
            </form>
          </div>
        </div>
      ))}
      {/* Card End */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </div>
  );
};

export default CardItem;
