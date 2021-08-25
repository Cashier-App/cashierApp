import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardItem = ({
  stockItems,
  setStockItems,
  setCardItem,
  cartItem,
  setTotalSale,
  totalSale,
}) => {
  const handleSubmit = (e, item) => {
    e.preventDefault();
    const quantity = e.target[0].value;
    if (Number(quantity) === 0) {
      toast.error("Make sure you insert stock quantity", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (item.stock < Number(quantity)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Not enough stock items!",
      });
    } else {
      const newItem = Object.assign({}, item);
      newItem.index = cartItem.length + 1;
      const cardItemAdd = {
        id: cartItem.length + 1,
        name: newItem.name,
        items: newItem,
        qty: Number(quantity),
        total: Number(quantity) * newItem.price,
      };
      setCardItem([...cartItem, cardItemAdd]);
      setTotalSale(totalSale + Number(cardItemAdd.total));
      let newStockItem = [];
      stockItems.map((el) => {
        if (el._id == item._id) {
          let itemChange = { ...el };
          itemChange.stock = itemChange.stock - Number(quantity);
          newStockItem.push(itemChange);
        } else {
          newStockItem.push(el);
        }
        setStockItems(newStockItem);
      });
    }
  };

  return (
    <div
      className="
         grid grid-cols-1
         sm:grid-cols-2
         rounded-t-3xl mt-32
         lg:grid-cols-4
         px-2
       "
    >
      {/* Card Item */}
      {stockItems.map((item, index) => (
        <div
          key={index}
          className="
           text-white
           font-medium mx-2 my-2
           bg-white rounded-xl shadow-lg
         "
        >
          <div className="w-50 h-30">
            <img
              className=" rounded-xl w-full p-2"
              src={item.imageUrl}
              alt="a"
            />
          </div>
          <div className="mx-3">
            <div className="text-gray-800 font-bold">{item.name}</div>
            <div className="flex justify-between mt-1">
              <div className="text-gray-800 text-sm">Rp. {item.price}</div>
              <div className="bg-blue-200 text-sm w-16 text-center text-blue-700 rounded-md font-medium">
                Stock: {item.stock}
              </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e, item)}>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="
              text-black
                    text-sm
                    placeholder-gray-500
                    pl-3
                    pr-3
                    mt-3
                    rounded-xl
                    border border-gray-400
                    w-full
                    py-1
                    focus:outline-none focus:border-blue-400
                  "
                placeholder="Quantity item"
              />
              <button
                type="submit"
                className="
               mt-2
               mb-3
               w-full
               text-xs
               bg-green-500
               hover:bg-green-600
               rounded-xl
               p-2
               text-white
               font-bold shadow-lg
               justify-center items-center
             "
              >
                <i className="fas fa-plus mr-2"></i>ADD TO CART
              </button>
            </form>
          </div>
        </div>
      ))}
      {/* Card End */}
    </div>
  );
};

export default CardItem;
