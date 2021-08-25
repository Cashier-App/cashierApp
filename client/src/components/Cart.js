import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import ModalAddSale from "./ModalAddSale";
import { ADD_SALE } from "../config/saleMutation";
import { FETCH_SALES } from "../config/transactionQuery";

const Cart = ({ cartItem, setCardItem }) => {
  const [showModal, setShowModal] = useState(false);
  const { data, loading, error } = useQuery(FETCH_SALES);
  const [addSales] = useMutation(ADD_SALE, {
    refetchQueries: [FETCH_SALES],
  });

  const deletItem = (id) => {
    const newCartItem = cartItem.filter((el) => {
      return el.id !== id;
    });
    setCardItem(newCartItem);
  };

  const postSale = () => {
    const dataSale = {
      items: [],
      payment: "Cash",
      adminName: "Admin",
    };
    cartItem.forEach((el) => {
      console.log(el);
      dataSale.items.push({ item: el.items._id, qty: el.qty });
    });
    addSales({
      variables: {
        items: dataSale.items,
        payment: dataSale.adminName,
        adminName: dataSale.payment,
      },
    });
  };

  return (
    <div>
      {showModal ? <ModalAddSale setShowModal={setShowModal} /> : null}
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
          <h1 className="ml-3 mt-3 font-bold text-lg text-gray-800">Detail Order:</h1>
          <div className="my-3 mx-3">
            {/* Card Item Food Order */}
            {cartItem &&
              cartItem.map((item, index) => (
                <div key={index} className="flex w-full bg-white rounded-xl shadow-lg mt-2">
                  <img className="rounded-xl w-12 m-1" src="https://ik.imagekit.io/damario789/bakmipolim/Bakmi-Ayam-Original-Komplit_ESX7TDS3A.jpeg?updatedAt=1627366608044" />
                  <div className="mr-2 ml-1 w-full flex flex-col justify-start mt-1">
                    <div className="flex items-center justify-between">
                      <h1 className="font-bold text-gray-800">{item.name}</h1>
                      <button onClick={() => deletItem(item.items.index)} title="Delete item">
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
        <button
          // onClick={() => setShowModal(true)}
          onClick={postSale}
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
