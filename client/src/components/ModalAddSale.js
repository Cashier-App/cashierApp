import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const ModalAddSale = ({
  setShowModal,
  totalSale,
  postSale,
  setMethodPayment,
}) => {
  const [money, setMoney] = useState(0);
  const [returnMoney, setReturnMoney] = useState(0);

  useEffect(() => {
    if (money == "") {
      setReturnMoney(0);
    } else {
      setReturnMoney(money - totalSale);
    }
  }, [money]);

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 p-10 rounded-lg shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
              Checkout Now
            </div>
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              Please enter your credentials to finishing checkout
            </div>

            <div className="mt-5">
              <div className="flex flex-col mb-3 bg-gray-200 h-24 rounded-lg">
                <div className="flex justify-between px-3 pt-2 font-semibold">
                  <div>Total :</div>
                  <div>Rp. {totalSale}</div>
                </div>
                {/* <hr className="bg-gray-700" /> */}
                <div className="flex justify-between px-3 font-semibold">
                  <div>Money :</div>
                  <div>Rp. {money}</div>
                </div>
                <div className="bg-gray-600 h-0.5 mx-3"></div>
                <div className="flex justify-between px-3 pt-1 font-semibold">
                  <div>Return :</div>
                  <div>Rp. {returnMoney}</div>
                </div>
              </div>
              <div className="flex flex-col mb-3">
                <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Method payment:
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
                    <i className="far fa-credit-card text-blue-500"></i>
                  </div>
                  <select
                    onChange={(e) => setMethodPayment(e.target.value)}
                    className="text-sm
                      placeholder-gray-500
                      pl-10
                      pr-4
                      rounded-2xl
                      border border-gray-400
                      w-full
                      py-2
                      focus:outline-none focus:border-blue-400"
                  >
                    <option disabled>Select method payment</option>
                    <option value="Cash">Cash</option>
                    <option value="Non-Cash">Non-Cash</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col mb-3">
                <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Nominal:
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
                      <i className="fas fa-money-bill-wave text-blue-500"></i>
                    </span>
                  </div>

                  <input
                    onChange={(e) => setMoney(e.target.value)}
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
                    placeholder="Nominal money"
                  />
                </div>
              </div>

              <div className="flex w-full">
                <button
                  onClick={postSale}
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
                  <span className="mr-2 uppercase">Checkout Now</span>
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
      <ToastContainer />
    </div>
  );
};

export default ModalAddSale;
