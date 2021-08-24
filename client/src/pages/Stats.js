import { Line } from "react-chartjs-2";
import data from "../chart/lineStats";

const Statistic = () => {
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
    sm:grid-cols-2
    lg:grid-cols-4
    p-4
    gap-4
    pb-5
    bg-white"
      >
        <div className="mini-box flex flex-wrap mt-6 ml-8">
          <div className="flex flex-col input-box stats-color mx-1 my-1">
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
          <div className="input-box mx-1 my-1">
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
              <h1 className="text-center font-bold text-3xl">Rp. 0,00</h1>
            </div>
          </div>
          <div className="input-box mx-1 my-1">
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
              <h1 className="text-center font-bold text-3xl">0</h1>
            </div>
          </div>
          <div className="input-box mx-1 my-1">
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
              <h1 className="text-center font-bold text-3xl">Rp. 0,00</h1>
            </div>
          </div>
        </div>
        <div className="box-statistic mx-2 ml-36 mt-6">
          <div className="max-w-md mx-auto">
            <Line
              data={data}
              height={400}
              width={600}
              options={{
                responsive: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
