const StatusTransaction = ({ totalSale, totalProductSold, totalAllSales }) => {
  return (
    <div
      className="
         fixed rounded-b-2xl
         top-14
         right-0
         left-56
         grid grid-cols-1
         sm:grid-cols-2
         lg:grid-cols-4
         p-4
         gap-4
         pb-5
         bg-white
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
          <i className="fas fa-shopping-cart text-blue-500 text-2xl"></i>
        </div>
        <div className="text-right text-gray-700">
          <p className="text-2xl">{totalSale} sales</p>
          <p>Total Sales</p>
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
          <i className="fas fa-shopping-cart text-blue-500 text-2xl"></i>
        </div>
        <div className="text-right text-gray-700">
          <p className="text-2xl">{totalProductSold} unit</p>
          <p>Total Product Sold</p>
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
          <i className="fas fa-shopping-cart text-blue-500 text-2xl"></i>
        </div>
        <div className="text-right text-gray-700">
          <p className="text-2xl">Rp. {totalAllSales.toLocaleString()}</p>
          <p>Total Purchased</p>
        </div>
      </div>
    </div>
  );
};

export default StatusTransaction;
