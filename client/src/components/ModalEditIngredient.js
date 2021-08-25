import { useMutation, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EDIT_INGREDIENT, FETCH_ALL_INGREDIENTS } from "../config/ingredient";
import { FETCH_ALL_STOCK_ITEM } from "../config/StockItem";
import Swal from "sweetalert2";

const ModalEditIngredient = ({ setShowModalEdit, ingredient }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [total, setTotal] = useState(0);
  const client = useApolloClient();
  const [editIngredient, { data, loading, error }] = useMutation(
    EDIT_INGREDIENT,
    {
      refetchQueries: [
        { query: FETCH_ALL_INGREDIENTS },
        { query: FETCH_ALL_STOCK_ITEM },
      ],
      onCompleted() {
        let newData = client.readQuery({
          query: FETCH_ALL_STOCK_ITEM,
        });
      },
    }
  );

  if (data) {
    setShowModalEdit(false);
    Swal.fire("Success", "Edited ingredient successfuly", "success");
  }

  if (error) {
    toast.error("Invalid Edit Item!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  useEffect(() => {
    setId(ingredient._id);
    setName(ingredient.name);
    setUnit(ingredient.unit);
    setTotal(ingredient.total);
  }, [ingredient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !unit || !total) {
      toast.error("Make sure you insert all data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      editIngredient({
        variables: {
          editStockIngredientId: id,
          editStockIngredientName: name,
          editStockIngredientUnit: unit,
          editStockIngredientTotal: Number(total),
        },
      });
    }
  };

  return (
    <div>
      {ingredient && (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 p-10 rounded-lg shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
                  Edit Ingredient
                </div>
                <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                  Please enter your credentials to edit ingredient
                </div>

                <div className="mt-5">
                  <form action="#" onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-col mb-3">
                      <label className="mb-1 text-xs tracking-wide text-gray-600">
                        Name:
                      </label>
                      <div className="relative">
                        <div
                          className="
                       inline-flex
                       items-center
                       justify-center
                       absolute
                       left-0
                       top-0
                       h-full
                       w-10
                       text-gray-400
                     "
                        >
                          <i className="fas fa-box text-blue-500"></i>
                        </div>

                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="
                       text-sm
                       placeholder-gray-500
                       pl-10
                       pr-4
                       rounded-2xl
                       border border-gray-400
                       w-full
                       py-2
                       focus:outline-none focus:border-blue-400
                     "
                          placeholder="Enter name ingredient"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-3">
                      <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                        Unit:
                      </label>
                      <div className="relative">
                        <div
                          className="
                       inline-flex
                       items-center
                       justify-center
                       absolute
                       left-0
                       top-0
                       h-full
                       w-10
                       text-gray-400
                     "
                        >
                          <span>
                            <i className="fas fa-clipboard-list text-blue-500"></i>
                          </span>
                        </div>

                        <input
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                          className="
                       text-sm
                       placeholder-gray-500
                       pl-10
                       pr-4
                       rounded-2xl
                       border border-gray-400
                       w-full
                       py-2
                       focus:outline-none focus:border-blue-400
                     "
                          placeholder="Enter unit ingredient"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-3">
                      <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                        Total:
                      </label>
                      <div className="relative">
                        <div
                          className="
                       inline-flex
                       items-center
                       justify-center
                       absolute
                       left-0
                       top-0
                       h-full
                       w-10
                       text-gray-400
                     "
                        >
                          <span>
                            <i className="fas fa-boxes text-blue-500"></i>
                          </span>
                        </div>

                        <input
                          value={total}
                          onChange={(e) => setTotal(e.target.value)}
                          type="number"
                          className="
                       text-sm
                       placeholder-gray-500
                       pl-10
                       pr-4
                       rounded-2xl
                       border border-gray-400
                       w-full
                       py-2
                       focus:outline-none focus:border-blue-400
                     "
                          placeholder="Enter total ingredient"
                        />
                      </div>
                    </div>

                    <div className="flex w-full">
                      <button
                        type="submit"
                        className="
                     flex
                     mt-2
                     items-center
                     justify-center
                     focus:outline-none
                     text-white text-sm
                     sm:text-base
                     bg-blue-500
                     hover:bg-blue-600
                     rounded-2xl
                     py-2
                     w-full
                     transition
                     duration-150
                     ease-in
                   "
                      >
                        <span className="mr-2 uppercase">Save</span>
                      </button>
                    </div>
                    <div className="flex w-full">
                      <button
                        onClick={() => setShowModalEdit(false)}
                        className="
                     flex
                     mt-2
                     items-center
                     justify-center
                     focus:outline-none
                     text-white text-sm
                     sm:text-base
                     bg-red-500
                     hover:bg-red-600
                     rounded-2xl
                     py-2
                     w-full
                     transition
                     duration-150
                     ease-in
                   "
                      >
                        <span className="mr-2 uppercase">Close</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      )}
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

export default ModalEditIngredient;
