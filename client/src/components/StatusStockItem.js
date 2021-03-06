const StatusStockItem = ({ total, stockItems }) => {
  let outStock = 0;
  let warning = 0;
  let readyStock = 0;
  stockItems.map((stock) => {
    console.log(stock);
    if (stock.stock === 0) {
      outStock += 1;
    } else if (stock.stock <= 2) {
      warning += 1;
    } else {
      readyStock += 1;
    }
  });
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
          <i className="fas fa-shopping-cart text-blue-500 text-2xl"></i>
        </div>
        <div className="text-right text-gray-700">
          <p className="text-2xl">{total}</p>
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
                bg-red-100
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
          <p className="text-2xl">{outStock}</p>
          <p>Out of Stock</p>
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
                bg-green-100
                rounded-full
                transition-all
                duration-300
                transform
                group-hover:rotate-12
              "
        >
          <i className="fas fa-check text-green-500 text-2xl"></i>
        </div>
        <div className="text-right text-gray-600">
          <p className="text-2xl">{readyStock}</p>
          <p>Ready Stock</p>
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
                bg-yellow-100
                rounded-full
                transition-all
                duration-300
                transform
                group-hover:rotate-12
              "
        >
          <i className="fas fa-history text-yellow-500 text-2xl"></i>
        </div>
        <div className="text-right text-gray-600">
          <p className="text-2xl">{warning}</p>
          <p>Nearly Gone</p>
        </div>
      </div>
    </div>
  );
};

export default StatusStockItem;
