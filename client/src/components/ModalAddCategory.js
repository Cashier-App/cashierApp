import React, {useState} from "react";
import { ADD_CATEGORY_MUTATION, FETCH_CATEGORY } from "../config/categoryQuery"
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";


const ModalAddCategory = ({ setShowModal }) => {
  const [name, setName] = useState("");
  const client = useApolloClient();
  const { data, loading } = useQuery(FETCH_CATEGORY);
  const [addCategory] = useMutation(ADD_CATEGORY_MUTATION, {
    onCompleted(data) {
      toast.success('Add category success!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const { categories } = client.readQuery({ query: FETCH_CATEGORY });
      let newCategoryList = [...categories, data.addCategory];

      client.writeQuery({
        query: FETCH_CATEGORY,
        data: {
          categories: newCategoryList,
        },
      });
    },
    onError() {
      toast.error("Add category error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  })

  function handleSubmit(e) {
    e.preventDefault();
    let newCategory = {
      name
    }
    if (!name) {
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
      addCategory({
        variables: newCategory
      })
    }
  }

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 p-10 rounded-lg shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
              Add Category
            </div>
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              Please enter your credentials to add new category
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-3">
                  <label className="mb-1 text-xs tracking-wide text-gray-600">
                    Category Name:
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
                      <i className="fas fa-bars text-blue-500"></i>
                    </div>

                    <input
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
                      placeholder="Enter your category name"
                      onChange={(e) => setName(e.target.value)}
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

export default ModalAddCategory;
