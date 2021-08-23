const TableTransaction = (props) => {
  const { sales } = props;
  // console.log(sales);
  return (
    <div className="mb-20 mx-4 mt-36">
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
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
                <th className="px-4 py-3">Food Item</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody
              className="
               bg-white
               divide-y
               dark:divide-gray-700 dark:bg-gray-800
             "
            >
              <tr
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
                    <div
                      className="
                       relative
                       hidden
                       w-8
                       h-8
                       mr-3
                       rounded-full
                       md:block
                     "
                    >
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src="https://ik.imagekit.io/damario789/bakmipolim/Bakmi-Ayam-Original-Komplit_ESX7TDS3A.jpeg?updatedAt=1627366608044"
                        alt=""
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <div>
                      <p className="font-semibold">Bakmi Polim</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        20 Pcs
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">Rp. 85.585,00</td>
                <td className="px-4 py-3 text-sm">15-01-2021</td>
              </tr>
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
            Showing 21-30 of 100
          </span>
          <span className="col-span-2"></span>
          {/* Pagination */}
          <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
              <ul className="inline-flex items-center">
                <li>
                  <button
                    className="
                     px-3
                     py-1
                     rounded-md rounded-l-lg
                     focus:outline-none focus:shadow-outline-purple
                   "
                    aria-label="Previous"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    className="
                     px-3
                     py-1
                     rounded-md
                     focus:outline-none focus:shadow-outline-purple
                   "
                  >
                    1
                  </button>
                </li>
                <li>
                  <button
                    className="
                     px-3
                     py-1
                     rounded-md
                     focus:outline-none focus:shadow-outline-purple
                   "
                  >
                    2
                  </button>
                </li>
                <li>
                  <button
                    className="
                     px-3
                     py-1
                     text-white
                     dark:text-gray-800
                     transition-colors
                     duration-150
                     bg-blue-600
                     dark:bg-gray-100
                     border border-r-0 border-blue-600
                     dark:border-gray-100
                     rounded-md
                     focus:outline-none focus:shadow-outline-purple
                   "
                  >
                    3
                  </button>
                </li>
                <li>
                  <button
                    className="
                     px-3
                     py-1
                     rounded-md
                     focus:outline-none focus:shadow-outline-purple
                   "
                  >
                    4
                  </button>
                </li>
                <li>
                  <span className="px-3 py-1">...</span>
                </li>
                <li>
                  <button
                    className="
                     px-3
                     py-1
                     rounded-md
                     focus:outline-none focus:shadow-outline-purple
                   "
                  >
                    8
                  </button>
                </li>
                <li>
                  <button
                    className="
                     px-3
                     py-1
                     rounded-md
                     focus:outline-none focus:shadow-outline-purple
                   "
                  >
                    9
                  </button>
                </li>
                <li>
                  <button
                    className="
                     px-3
                     py-1
                     rounded-md rounded-r-lg
                     focus:outline-none focus:shadow-outline-purple
                   "
                    aria-label="Next"
                  >
                    <svg
                      className="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TableTransaction;
