import { Line } from "react-chartjs-2";
import { FETCH_SALES } from "../config/statistic";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
// let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const Statistic = ({ totalRevenue, loading, error }) => {
  const [months, setMonths] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [totalSales, setTotalSales] = useState(0);
  const [todaySales, setTodaySales] = useState(0);
  const [productSold, setProductSold] = useState(0);

  useEffect(() => {
    let tempMonth = [...months];
    let totalAllSales = 0;
    let todayAllSales = 0;
    let allProductSold = 0;
    if (!loading) {
      totalRevenue.sales.forEach((el) => {
        tempMonth.forEach((_, index) => {
          if (new Date(el.date).getMonth() === index) {
            tempMonth[index] += el.total;
          }
        });
        if (new Date(el.date).getDay() === new Date().getDay()) {
          todayAllSales += el.total;
          console.log(el.total, "looping");
        }
        totalAllSales += el.total;
        el.items.forEach((el2) => {
          allProductSold += el2.qty;
        });
      });
      setMonths(tempMonth);
      setTotalSales(totalAllSales);
      setTodaySales(todayAllSales);
      setProductSold(allProductSold);
    }
  }, [totalRevenue]);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Sales",
        data: months,
        backgroundColor: [
          "rgba(245, 229, 27, 1)",
          "rgba(245, 229, 27, 1)",
          "rgba(245, 229, 27, 1)",
        ],
      },
    ],
  };

  return (
    <div className="mt-6">
      <div>
        <h1 className="hidden md:block font-bold uppercase ml-14 mt-6 text-3xl text-blue-600">
          Statistic
        </h1>
      </div>
      <div
        className="fixed rounded-b-2xl
    top-36
    right-0
    left-56
    grid grid-cols-1
    md:grid-cols-2
    lg:grid-cols-2
    p-4
    gap-4
    pb-5
    bg-white"
      >
        <div className="mini-box grid grid-cols-2 grid-rows-2 gap-4 mt-6 ml-8 text-2xl">
          <div className="flex flex-col input-box stats-color mx-1 my-1 items-center justify-center relative">
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
             top-2
             left-2
             absolute
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-center text-gray-200">Status</h1>
            </div>
            <div>
              <h1 className="text-center font-bold text-4xl text-white">
                Open
              </h1>
            </div>
          </div>
          <div className="input-box mx-1 my-1 flex flex-col input-box items-center justify-center relative">
            <div>
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
             top-2
             left-2
             absolute
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-center">Total Sales</h1>
            </div>
            <div>
              <h1 className="text-center font-bold text-3xl">
                Rp. {totalSales.toLocaleString()}
              </h1>
            </div>
          </div>
          <div className="input-box mx-1 my-1 flex flex-col input-box items-center justify-center relative">
            <div>
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
             top-2
             left-2
             absolute
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-center">Product Sold</h1>
            </div>
            <div>
              <h1 className="text-center font-bold text-3xl">{productSold}</h1>
            </div>
          </div>
          <div className="input-box mx-1 my-1 flex flex-col input-box items-center justify-center relative">
            <div>
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
             top-2
             left-2
             absolute
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-center">Sales Today</h1>
            </div>
            <div>
              <h1 className="text-center font-bold text-3xl">
                Rp. {todaySales.toLocaleString()}
              </h1>
            </div>
          </div>
        </div>
        <div>
          <div className="box-statistic">
            <div>
              <Line
                data={data}
                options={{
                  responsive: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
