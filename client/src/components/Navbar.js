import Logo from "../assets/logo.png";
import Avatar from "../assets/abdan.png";

const Navbar = () => {
  return (
    <div
      className="
         fixed
         w-full
         flex
         items-center
         justify-between
         h-14
         text-white
         z-10
       "
    >
      <div
        className="
           flex
           items-center
           justify-start
           pl-3
           w-14
           md:w-64
           h-14
           bg-blue-500
           dark:bg-gray-800
           border-none
         "
      >
        <img
          className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
          src={Logo}
        />
        <span className="hidden md:block font-bold uppercase">Bakmi Polim</span>
      </div>
      <div
        className="
           flex
           justify-between
           items-center
           h-14
           bg-blue-500
           dark:bg-gray-800
           header-right
         "
      >
        <div
          className="
             bg-white
             rounded-full
             flex
             items-center
             w-full
             max-w-xl
             mr-4
             p-2
             shadow-sm
             border border-gray-200
           "
        >
          <input
            type="search"
            name=""
            id=""
            placeholder="Search everything"
            className="
               w-full
               pl-3
               text-sm text-black
               outline-none
               focus:outline-none
               bg-transparent
             "
          />
          <button className="outline-none focus:outline-none">
            <svg
              className="w-5 text-gray-600 h-5 cursor-pointer"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
        <ul className="flex items-center">
          <li>
            <div className="flex items-center mr-4 hover:text-blue-100">
              <div className="flex justify-start items-center mr-1">
                <img
                  src={Avatar}
                  className="w-9 h-9 rounded-full mr-2 border-2"
                />
                <div>
                  <div className="text-md font-semibold">Abdan Zam Zam R</div>
                  <div className="text-xs -mt-1 text-gray-200 font-normal">
                    Admin
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
