import { useState } from "react";
import ModalAddCategory from "./ModalAddCategory";
import ModalUpdateCategory from "./ModalUpdateCategory";
import { FETCH_CATEGORY, DELETE_CATEGORY_MUTATION } from "../config/categoryQuery";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";

const TableCategory = () => {
  const client = useApolloClient();
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataPopulate, setDataPopulate] = useState("");
  const [dataDelete, setDataDelete] = useState("");
  const { data, loading } = useQuery(FETCH_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
    onCompleted() {
      toast.success('Delete category success!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const { categories } = client.readQuery({ query: FETCH_CATEGORY });

      let newCategoryList = [...categories]

      newCategoryList.forEach((el, index) => {
        if (el._id === dataDelete) {
          newCategoryList.splice(index, 1);
        }
      });

      client.writeQuery({
        query: FETCH_CATEGORY,
        data: {
          categories: newCategoryList
        },
      });
    },
    onError() {
      toast.error("Edit category error", {
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


  
  function handleUpdate(dataCategory) {
    setDataPopulate(dataCategory);
    setShowModalUpdate(true)
  }
  function handleDelete(dataCategory) {
    setDataDelete(dataCategory._id);
    const _id = dataCategory._id;
    deleteCategory({
      variables: { _id },
    });
  }
  return (
    <div>
      {showModal ? <ModalAddCategory setShowModal={setShowModal} /> : null}
      {showModalUpdate ? <ModalUpdateCategory setShowModalUpdate={setShowModalUpdate} dataPopulate={dataPopulate}/> : null}

      <div className="mb-20 mx-4 mt-6">
        <div className="mb-5">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 px-3 py-1 rounded-lg text-white font-medium hover:bg-blue-600"
          >
            <i className="fas fa-plus mr-2"></i>Add Category
          </button>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full justify-between">
              <thead>
                <tr
                  className="
                    text-xs
                    font-semibold
                    tracking-wide
                    text-left text-white
                    uppercase
                    border-b
                    dark:border-gray-700
                    bg-blue-500
                    dark:text-gray-400 dark:bg-gray-800
                  "
                >
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 flex justify-end">Actions</th>
                </tr>
              </thead>
              <tbody
                className="
                  bg-white
                  divide-y
                  dark:divide-gray-700 dark:bg-gray-800
                "
              >
                {loading ? null : (
                <>
                  {data.categories.map((category, index) => (
                  <tr
                    key={index}
                    className="
                      bg-gray-50
                      dark:bg-gray-800
                      hover:bg-gray-100
                      dark:hover:bg-gray-900
                      text-gray-700
                      dark:text-gray-400
                    "
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{category?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm flex justify-end">
                      <div className="flex justify-start items-center text-md pr-2">
                        <i className="far fa-edit mr-2 text-blue-500 font-semibold cursor-pointer" onClick={()=> handleUpdate(category)}></i>
                        <i className="far fa-trash-alt text-red-500 font-semibold cursor-pointer" onClick={()=> handleDelete(category)}></i>
                      </div>
                    </td>
                  </tr>
                  ))}
                </>
                )}
              </tbody>
            </table>
          </div>
          <div
            className="
              grid
              px-4
              py-3
              text-xs
              font-semibold
              tracking-wide
              text-gray-500
              uppercase
              border-t
              dark:border-gray-700
              bg-gray-50
              sm:grid-cols-9
              dark:text-gray-400 dark:bg-gray-800
            "
          >
            <span className="flex items-center col-span-3">
              Showing {data ? data.categories.length : 0} of {data ? data.categories.length : 0}
            </span>
          </div>
        </div>
      </div>
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

export default TableCategory;
