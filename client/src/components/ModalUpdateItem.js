import { UPDATE_STOCK_ITEM_MUTATION } from "../config/StockItem";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FETCH_CATEGORY } from "../config/categoryQuery";
import { FETCH_ALL_STOCK_ITEM } from "../config/StockItem";
import { toast, ToastContainer } from "react-toastify";
import { FETCH_ALL_INGREDIENTS } from "../config/ingredient";

const ModalUpdateItem = ({ setShowModalUpdate, fetch }) => {
  const [editStockItem] = useMutation(UPDATE_STOCK_ITEM_MUTATION, {
    refetchQueries: [FETCH_ALL_STOCK_ITEM],
    onCompleted() {
      toast.success("Stock item updated", {
        position: "top-right",
      });
      setShowModalUpdate(false);
    },
    onError(err) {
      console.log(err);
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
  const { data, loading } = useQuery(FETCH_CATEGORY);
  const { data: dataStockIngredients, loading: loadingIngredients } = useQuery(
    FETCH_ALL_INGREDIENTS
  );
  console.log(fetch);
  const [categoryName, setCategoryName] = useState(fetch.category.name);
  const [stockItem, setStockItem] = useState({
    name: fetch.name,
    price: fetch.price,
    category: fetch.category._id,
    stock: fetch.stock,
    recipes: [],
    // recipes: [{ingredient: fetch.recipes.ingredient._id, total: fetch.recipes.ingredient.total, qty: fetch.recipes.qty}],
  });
  const [recipe, setRecipe] = useState({
    ingredient: "",
    total: 0,
    qty: 0,
  });
  const [file, setFile] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    let { name, price, category, stock, recipes } = stockItem;
    recipes.forEach((rcp) => {
      delete rcp.total;
    });
    price = Number(price);
    if (categoryName !== "Food") {
      recipes = [];
    }
    console.log(name, price, category, stock, recipes);
    let maxStock = [];
    recipes.forEach((el) => {
      maxStock.push(el.total / el.qty);
    });
    maxStock = Math.floor(maxStock.sort((a, b) => a - b)[0]);
    console.log(maxStock, "ini max stock");
    if (categoryName !== "Food") {
      editStockItem({
        variables: {
          _id: fetch._id,
          file,
          name,
          price,
          category,
          recipes,
          stock,
        },
      });
    } else {
      if (stock > maxStock) {
        toast.error(`Maximum stock is ${maxStock}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        editStockItem({
          variables: {
            _id: fetch._id,
            file,
            name,
            price,
            category,
            recipes,
            stock,
          },
        });
      }
    }
  }
  function onChange({
    target: {
      files: [file],
    },
  }) {
    setFile(file);
  }
  function changeCategory(e) {
    let tempCategory = data.categories.find(
      (category) => category._id === e.target.value
    );
    setCategoryName(tempCategory.name);
    setStockItem({
      ...stockItem,
      category: e.target.value,
      recipes: [],
    });
  }
  function checkboxElem(e) {
    let recipes = [...stockItem.recipes];
    let tempRecipe = Object.assign({}, recipe);
    tempRecipe.qty = Number(tempRecipe.qty);
    if (e.target.checked === true) {
      recipes.push(tempRecipe);
      setStockItem({ ...stockItem, recipes });
    } else {
      recipes = recipes.filter(
        (recipe) => recipe.ingredient !== e.target.value
      );
      setStockItem({ ...stockItem, recipes });
    }
    console.log(stockItem);
  }
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mr-10 max-w-3xl">
          <div className="border-0 p-10 rounded-lg shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
              Edit Item
            </div>
            {!loading && (
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
                        <i className="fas fa-box text-blue-500"></i>
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
                          <i className="fas fa-clipboard-list text-blue-500"></i>
                        </span>
                      </div>

                      <div className="flex">
                        <select
                          onChange={changeCategory}
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
                          );
                          {!loading &&
                            data.categories.map((category) => {
                              return (
                                <option
                                  key={category._id}
                                  value={category._id}
                                  selected={category._id === fetch.category}
                                >
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
                          <i className="fas fa-clipboard-list text-blue-500"></i>
                        </span>
                      </div>

                      <input
                        value={stockItem.price}
                        onChange={(e) =>
                          setStockItem({
                            ...stockItem,
                            price: Number(e.target.value),
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
                          <i className="fas fa-boxes text-blue-500"></i>
                        </span>
                      </div>

                      <input
                        value={stockItem.stock}
                        onChange={(e) =>
                          setStockItem({
                            ...stockItem,
                            stock: Number(e.target.value),
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
                      onClick={() => setShowModalUpdate(false)}
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
            )}
          </div>
        </div>
        {categoryName === "---" && !loadingIngredients && (
          <div className="relative my-2 ">
            <div className="border-0 p-10 rounded-lg shadow-xl flex flex-col bg-white outline-none focus:outline-none">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl mb-5 border-b">Stock of Ingredients</p>
                </div>
                <div>
                  <button className="border rounded-lg px-2 bg-gray-400 mb-5">
                    Add Stock
                  </button>
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200  overflow-y-scroll">
                <thead>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit
                  </th>
                  <th className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Add to recipes
                  </th>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataStockIngredients.stockIngredients.map(
                    (stockIngredient) => {
                      return (
                        <tr key={stockIngredient._id}>
                          <td className="py-4 whitespace-nowrap">
                            {stockIngredient.name}
                          </td>
                          <td className="py-4 whitespace-nowrap">
                            <p className="px-10">{stockIngredient.total}</p>
                          </td>
                          <td className="py-4 whitespace-nowrap">
                            <p className="px-10">{stockIngredient.unit}</p>
                          </td>
                          <td className="py-4 whitespace-nowrap">
                            <input
                              onChange={(e) => {
                                if (+e.target.value > stockIngredient.total) {
                                  toast.error(
                                    "Quantity cannot be greater than stock",
                                    {
                                      position: "top-right",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                    }
                                  );
                                } else {
                                  setRecipe({
                                    ingredient: stockIngredient._id,
                                    total: stockIngredient.total,
                                    qty: e.target.value,
                                  });
                                }
                              }}
                              type="number"
                              className="border rounded-md px-2 w-20 ml-10 text-center"
                              min="0"
                            />
                          </td>
                          <td className="text-center ">
                            <input
                              onChange={checkboxElem}
                              type="checkbox"
                              id="vehicle1"
                              name="vehicle1"
                              value={stockIngredient._id}
                            />
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
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
    </div>
  );
};

export default ModalUpdateItem;
