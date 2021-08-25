import Logo from "../assets/logo.png";
import Avatar from "../assets/adminlogo.jpg";
import { useEffect } from "react";
// import jwt from "jsonwebtoken";
const Navbar = () => {
  // useEffect(() => {
  //   console.log(localStorage.access_token);
  // }, []);
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
          alt="adsads"
        />
        <span className="hidden md:block font-bold uppercase"></span>
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
        <div className="w-full flex justify-end mr-5">
          <ul className="flex items-center">
            <li>
              <div className="flex items-center mr-4 hover:text-blue-100">
                <div className="flex justify-start items-center mr-1">
                  <img
                    src={Avatar}
                    className="w-9 h-9 rounded-full mr-2 border-2"
                    alt="asdds"
                  />
                  <div>
                    <div className="text-md font-semibold">
                      {localStorage.getItem("email")}
                    </div>
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
    </div>
  );
};

export default Navbar;
