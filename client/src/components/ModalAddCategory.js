const ModalAddCategory = ({ setShowModal }) => {
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
              <form action="#">
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
    </div>
  );
};

export default ModalAddCategory;
