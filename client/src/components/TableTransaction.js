const TableTransaction = (props) => {
  const { sales } = props;
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
              {sales.map((items) => {
                return items.items.map((item) => {
                  return (
                    <tr
                      key={item._id}
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
                        {new Date(items.date).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                });
              })}
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
