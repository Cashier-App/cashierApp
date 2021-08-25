import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import ModalAddSale from "./ModalAddSale";
import { ADD_SALE } from "../config/saleMutation";
import { FETCH_SALES } from "../config/statistic";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { EDIT_STOCK_ITEM, FETCH_ALL_STOCK_ITEM } from "../config/StockItem";

const Cart = ({
  cartItem,
  setCardItem,
  totalSale,
  setTotalSale,
  stockItems,
  setStockItems,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [methodPayment, setMethodPayment] = useState("Cash");
  const { data, loading, error } = useQuery(FETCH_SALES);
  const [addSale] = useMutation(ADD_SALE, {
    refetchQueries: [FETCH_SALES],
  });
  const { data: dataStock } = useQuery(FETCH_ALL_STOCK_ITEM);
  const [editStock] = useMutation(EDIT_STOCK_ITEM, {
    refetchQueries: [FETCH_ALL_STOCK_ITEM],
  });

  console.log("METHOD PAYMENT", methodPayment);

  const deletItem = (id) => {
    let deleteCartItem = {};
    const newCartItem = cartItem.filter((el) => {
      // console.log("ELLLL", el);
      if (el.id == id) {
        deleteCartItem = { id: el.items._id, qty: el.qty };
        setTotalSale(totalSale - Number(el.total));
      }
      return el.id !== id;
    });
    let newStockItem = [];
    stockItems.map((el) => {
      if (el._id === deleteCartItem.id) {
        let itemChange = { ...el };
        itemChange.stock = itemChange.stock + deleteCartItem.qty;
        newStockItem.push(itemChange);
      } else {
        newStockItem.push(el);
      }
      setStockItems(newStockItem);
    });
    setCardItem(newCartItem);
  };

  const postSale = () => {
    const dataSale = {
      items: [],
      payment: methodPayment,
      adminName: "Admin",
    };
    cartItem.forEach((el) => {
      const newStock = el.items.stock - el.qty;
      editStock({
        variables: {
          editStockItemId: el.items._id,
          editStockItemStock: newStock,
        },
      });
      dataSale.items.push({ item: el.items._id, qty: el.qty });
    });
    addSale({
      variables: {
        items: dataSale.items,
        payment: dataSale.adminName,
        adminName: dataSale.payment,
      },
    });
  };

  const checkoutNow = () => {
    if (cartItem.length === 0) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Your cart is still empty!",
      // });
      toast.error("Your cart is still empty", { position: "top-right" });
    } else {
      setShowModal(true);
    }
  };

  return (
    <div>
      {showModal ? (
        <ModalAddSale
          setShowModal={setShowModal}
          totalSale={totalSale}
          postSale={postSale}
          setMethodPayment={setMethodPayment}
        />
      ) : null}
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
            {cartItem &&
              cartItem.map((item, index) => (
                <div
                  key={index}
                  className="flex w-full bg-white rounded-xl shadow-lg mt-2"
                >
                  <img
                    className="rounded-xl w-12 m-1"
                    src="https://ik.imagekit.io/damario789/bakmipolim/Bakmi-Ayam-Original-Komplit_ESX7TDS3A.jpeg?updatedAt=1627366608044"
                    alt="asd"
                  />
                  <div className="mr-2 ml-1 w-full flex flex-col justify-start mt-1">
                    <div className="flex items-center justify-between">
                      <h1 className="font-bold text-gray-800">{item.name}</h1>
                      <button
                        onClick={() => deletItem(item.items.index)}
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
                        {item.qty}
                      </div>
                      <div className="font-semibold">Rp. {item.total}</div>
                    </div>
                  </div>
                </div>
              ))}

            {/* Card Item Food Order End */}
          </div>
        </div>
        <div className="h-20 rounded-xl w-auto mx-4 mb-4 bg-gray-200 text-white">
          <div className="flex justify-between text-center text-3xl font-bold text-gray-900 mx-3 py-3">
            <div>Rp.</div>
            <div>{totalSale}</div>
          </div>
        </div>
        <button
          onClick={checkoutNow}
          // onClick={postSale}
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
    </div>
  );
};

export default Cart;
