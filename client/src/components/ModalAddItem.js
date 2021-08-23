import { ADD_STOCK_ITEM_MUTATION } from "../config/addStockItemMutation";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FETCH_CATEGORY } from "../config/categoryQuery";
const ModalAddItem = ({ setShowModal }) => {
  const [addStockItem] = useMutation(ADD_STOCK_ITEM_MUTATION);
  const { data, loading, error } = useQuery(FETCH_CATEGORY);
  const [stockItem, setStockItem] = useState({
    name: "",
    price: "",
    category: "",
    stock: 5,
    recipes: [],
  });
  const [file, setFile] = useState({});
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(stockItem);
    console.log(file);
    let { name, price, category, stock, recipes } = stockItem;
    console.log(name, price, category, stock, recipes);
    price = Number(price);
    addStockItem({
      variables: { file, name, price, category, recipes, stock },
    });
  }
  function onChange({
    target: {
      validity,
      files: [file],
    },
  }) {
    setFile(file);
  }
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 p-10 rounded-lg shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
              Add Item
            </div>
            <div className="mt-5">
              <form action="#" onSubmit={handleSubmit}>
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
                      <i class="fas fa-box text-blue-500"></i>
                    </div>

                    <input
                      value={stockItem.name}
                      onChange={(e) =>
                        setStockItem({ ...stockItem, name: e.target.value })
                      }
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
                      placeholder="Enter your name item"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-3">
                  <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                    Category:
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
                        <i class="fas fa-clipboard-list text-blue-500"></i>
                      </span>
                    </div>

                    <div className="flex">
                      <select
                        onChange={(e) =>
                          setStockItem({
                            ...stockItem,
                            category: e.target.value,
                          })
                        }
                        className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    "
                        name="category"
                        id="category"
                      >
                        <option required disabled selected default value="">
                          Select one
                        </option>
                        );
                        {!loading &&
                          data.categories.map((category) => {
                            return (
                              <option key={category._id} value={category._id}>
                                {category.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mb-3">
                  <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                    Price:
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
                        <i class="fas fa-clipboard-list text-blue-500"></i>
                      </span>
                    </div>

                    <input
                      value={stockItem.price}
                      onChange={(e) =>
                        setStockItem({
                          ...stockItem,
                          price: e.target.value,
                        })
                      }
                      type="number"
                      name="text"
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
                      placeholder="Enter your price"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-3">
                  <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                    Stock:
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
                        <i class="fas fa-boxes text-blue-500"></i>
                      </span>
                    </div>

                    <input
                      value={stockItem.stock}
                      onChange={(e) =>
                        setStockItem({
                          ...stockItem,
                          stock: e.target.value,
                        })
                      }
                      id="stock"
                      type="text"
                      name="text"
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
                      placeholder="Enter your stock item"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-3">
                  <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                    Image:
                  </label>
                  <div className="relative">
                    <input onChange={onChange} type="file" required />
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
                    type="button"
                    onClick={() => setShowModal(false)}
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
  );
};

export default ModalAddItem;
