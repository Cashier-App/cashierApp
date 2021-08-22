const StatusStockIngredient = () => {
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
          <i class="fas fa-shopping-cart text-blue-500 text-2xl"></i>
        </div>
        <div className="text-right text-gray-700">
          <p className="text-2xl">86</p>
          <p>Stock Ingredients</p>
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
                bg-green-50
                rounded-full
                transition-all
                duration-300
                transform
                group-hover:rotate-12
              "
        >
          <i class="fas fa-check text-green-500 text-2xl"></i>
        </div>
        <div className="text-right text-gray-600">
          <p className="text-2xl">557</p>
          <p>Success</p>
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
                bg-yellow-100
                rounded-full
                transition-all
                duration-300
                transform
                group-hover:rotate-12
              "
        >
          <i class="fas fa-history text-yellow-500 text-2xl"></i>
        </div>
        <div className="text-right text-gray-600">
          <p className="text-2xl">117</p>
          <p>Pending</p>
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
                bg-red-100
                rounded-full
                transition-all
                duration-300
                transform
                group-hover:rotate-12
              "
        >
          <i class="far fa-times-circle text-red-500 text-2xl"></i>
        </div>
        <div className="text-right text-gray-600">
          <p className="text-2xl">57</p>
          <p>Denied</p>
        </div>
      </div>
    </div>
  );
};

export default StatusStockIngredient;
