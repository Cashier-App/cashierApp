import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FETCH_SALES } from "../config/transactionQuery";

const StatusItem = ({ stockItems }) => {
  const { data, loading, error } = useQuery(FETCH_SALES);
  const [totalSales, setTotalSales] = useState(0);
  const [productSold, setProductSold] = useState(0);

  let readyItems = 0;
  let outItems = 0;

  stockItems.map((el) => {
    if (el.stock === 0) {
      outItems += 1;
    } else {
      readyItems += 1;
    }
  });

  useEffect(() => {
    let allProductSold = 0;
    let totalAllSales = 0;
    if (!loading) {
      data.sales.forEach((el) => {
        totalAllSales += el.total;
        el.items.forEach((el2) => {
          allProductSold += el2.qty;
        });
      });
      setProductSold(allProductSold);
      setTotalSales(totalAllSales);
    }
  }, [data]);

  return (
    <div
      className="
         fixed rounded-b-2xl
         top-14
         right-80
         left-56
         grid grid-cols-1
         sm:grid-cols-2
         lg:grid-cols-4
         p-4
         gap-4
         pb-5
         bg-gray-200
       "
    >
      <div
        className="
           bg-white
           shadow-lg
           rounded-lg
           flex
           items-center
           justify-between
           p-3
           text-white
           font-medium
           group
         "
      >
        <div
          className="
             flex
             justify-center
             items-center
             w-14
             h-14
             bg-blue-50
             rounded-full
             transition-all
             duration-300
             transform
             group-hover:rotate-12
           "
        >
          <i className="fas fa-warehouse text-blue-500 text-2xl"></i>
        </div>
        <div className="text-right text-gray-700">
          <p className="text-2xl">{stockItems.length}</p>
          <p>Stock Items</p>
        </div>
      </div>
      <div
        className="
           bg-white
           shadow-lg
           rounded-lg
           flex
           items-center
           justify-between
           p-3
           text-white
           font-medium
           group
         "
      >
        <div
          className="
             flex
             justify-center
             items-center
             w-14
             h-14
             bg-blue-50
             rounded-full
             transition-all
             duration-300
             transform
             group-hover:rotate-12
           "
        >
          <svg
            width="30"
            height="30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="
               stroke-current
               text-blue-500
               transform
               transition-transform
               duration-500
               ease-in-out
             "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            ></path>
          </svg>
        </div>
        <div className="text-right text-gray-600">
          <p className="text-2xl">{readyItems}</p>
          <p>Ready items</p>
        </div>
      </div>
      <div
        className="
           bg-white
           shadow-lg
           rounded-lg
           flex
           items-center
           justify-between
           p-3
           text-white
           font-medium
           group
         "
      >
        <div
          className="
             flex
             justify-center
             items-center
             w-14
             h-14
             bg-blue-100
             rounded-full
             transition-all
             duration-300
             transform
             group-hover:rotate-12
           "
        >
          <i className="far fa-times-circle text-red-500 text-2xl"></i>
        </div>
        <div className="text-right text-gray-600">
          <p className="text-2xl">{outItems}</p>
          <p>Out of Items</p>
        </div>
      </div>
      <div
        className="
           bg-white
           dark:bg-gray-800
           shadow-lg
           rounded-lg
           flex
           items-center
           justify-between
           p-3
           text-white
           font-medium
           group
         "
      >
        <div
          className="
             flex
             justify-center
             items-center
             w-14
             h-14
             bg-blue-100
             rounded-full
             transition-all
             duration-300
             transform
             group-hover:rotate-12
           "
        >
          <svg
            width="30"
            height="30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="
               stroke-current
               text-blue-500
               dark:text-gray-800
               transform
               transition-transform
               duration-500
               ease-in-out
             "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            ></path>
          </svg>
        </div>
        <div className="text-right text-gray-600">
          <p className="text-2xl">{productSold}</p>
          <p>Total Sales</p>
        </div>
      </div>
    </div>
  );
};

export default StatusItem;
