import { useState } from "react";
const TableTransaction = (props) => {
  const { sales } = props;

  /* Pagination */
  const [pageNumber, setPageNumber] = useState(1);
  const [postNumber] = useState(5);
  const currentPageNumber = pageNumber * postNumber - postNumber;
  let copySales = Array.from(sales);
  copySales = copySales.reverse();
  const paginatedPosts = copySales.splice(currentPageNumber, postNumber);
  const handlePrev = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
  };
  const handleNext = () => {
    setPageNumber(pageNumber + 1);
  };
  /* Pagination */
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
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Total</th>
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
              {/* Pagination */}
              {paginatedPosts.map((items) => {
                return items.items.map((item) => {
                  {
                    console.log(items.items.length);
                  }
                  return (
                    <tr
                      key={item._id}
                      className={
                        items.items.length > 1
                          ? `
                     bg-gray-200
                     dark:bg-gray-800
                     hover:bg-gray-100
                     dark:hover:bg-gray-900
                     text-gray-700
                     dark:text-gray-400
                     
                   `
                          : `bg-gray-50
                     dark:bg-gray-800
                     hover:bg-gray-100
                     dark:hover:bg-gray-900
                     text-gray-700
                     dark:text-gray-400`
                      }
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
                              src={item.item.imageUrl}
                              alt=""
                              loading="lazy"
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                          <div>
                            <p className="font-semibold">{item.item.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {item.qty} unit
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {item.item.category.name}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        Rp. {item.item.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        Rp. {items.total.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(items.date).toISOString().split("T")[0]}
                      </td>
                    </tr>
                  );
                });
              })}
              {/* Pagination */}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="mt-3 bg-white flex">
            <div className="px-2 border rounded py-2 w-full text-center">
              <button
                className="px-4 py-1 mr-3 bg-gray-400 rounded-xl"
                onClick={handlePrev}
              >
                prev
              </button>
              Page {pageNumber}
              <button
                className="px-4 py-1 ml-3 bg-gray-400 rounded-xl"
                onClick={handleNext}
              >
                next
              </button>
            </div>
          </div>
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
          {/* <span className="flex items-center col-span-3">
            Showing 21-30 of 100
          </span>
          <span className="col-span-2"></span>
          {/* Pagination */}
        </div>
      </div>
    </div>
  );
};

export default TableTransaction;
