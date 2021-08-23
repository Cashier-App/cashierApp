import { Doughnut } from "react-chartjs-2";

const Statistic = () => {
  return (
    <div className="mt-32">
      <div>
        <h1 className="hidden md:block font-bold uppercase ml-8 mt-6">
          Statistic
        </h1>
      </div>
      <div className="container-xl flex flex-row justify-center my-3 ml-6">
        <div className="mini-box flex flex-wrap">
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-center text-gray-200">Store Status</h1>
            </div>
            <div>
              <h1 className="text-center font-bold text-4xl text-white">
                Good
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-center">Total Sales</h1>
            </div>
            <div>
              <h1 className="text-center font-bold text-3xl">Rp. 1.400.000</h1>
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-center">Total Profit</h1>
            </div>
            <div>
              <h1 className="text-center font-bold text-3xl">Rp. 400.000</h1>
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-center">Total Revenue</h1>
            </div>
            <div>
              <h1 className="text-center font-bold text-3xl">Rp. 1.000.000</h1>
            </div>
          </div>
        </div>
        <div className="box-statistic mx-2">
          <div className="max-w-md mx-auto">
            <Doughnut
              data={{
                labels: ["Revenue", "Sales", "Profit"],
                datasets: [
                  {
                    label: "# of Votes",
                    data: [1000000, 1400000, 400000],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                    ],
                  },
                ],
              }}
              height={10}
              width={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
