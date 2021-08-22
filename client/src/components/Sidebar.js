import { Link, useHistory } from "react-router-dom";

const Sidebar = () => {
  const {
    location: { pathname },
  } = useHistory();
  //   console.log(pathname);

  return (
    <div
      className="
         fixed
         flex flex-col
         top-14
         left-0
         w-14
         hover:w-52
         md:w-52
         bg-white
         shadow-xl
         xl
         h-full
         text-white
         transition-all
         duration-300
         border-none
         z-10
         sidebar
       "
    >
      <div
        className="
           overflow-y-auto overflow-x-hidden
           flex flex-col
           bg-white
           justify-between
           flex-grow
         "
      >
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-8">
              <div
                className="
                   text-sm
                   tracking-wide
                   font-normal
                   text-gray-400
                   uppercase
                 "
              >
                Main Menu
              </div>
            </div>
          </li>
          <li>
            <Link
              to="/"
              className="
                 relative
                 flex flex-row
                 items-center
                 h-11
                 md:mx-4
                 lg:mx-4
                 xl:mx-4
                 mx-1
                 rounded-2xl
                 focus:outline-none
                 hover:bg-gray-100
                 dark:hover:bg-gray-600
                 text-white-600
                 hover:text-white-800
                 dark:hover:border-gray-800
                 pr-6
               "
            >
              <span className="inline-flex justify-center items-center ml-4">
                <i className="fas text-blue-500 text-lg fa-home"></i>
              </span>
              <span
                className="
                   ml-2
                   text-sm
                   tracking-wide
                   truncate
                   text-blue-500
                   font-semibold
                   pl-1
                 "
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/transactions"
              className="
                 relative
                 flex flex-row
                 items-center
                 h-11
                 md:mx-4
                 lg:mx-4
                 xl:mx-4
                 mx-1
                 rounded-2xl
                 focus:outline-none
                 hover:bg-gray-100
                 dark:hover:bg-gray-600
                 text-white-600
                 hover:text-white-800
                 dark:hover:border-gray-800
                 pr-6
               "
            >
              <span className="inline-flex justify-center items-center ml-4">
                <i className="fas text-blue-500 text-lg fa-cart-arrow-down"></i>
              </span>
              <span
                className="
                   ml-2
                   text-sm
                   tracking-wide
                   truncate
                   text-blue-500
                   font-semibold
                   pl-1
                 "
              >
                Transactions
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/statistic"
              className="
                 relative
                 flex flex-row
                 items-center
                 h-11
                 md:mx-4
                 lg:mx-4
                 xl:mx-4
                 mx-1
                 rounded-2xl
                 focus:outline-none
                 hover:bg-gray-100
                 dark:hover:bg-gray-600
                 text-white-600
                 hover:text-white-800
                 dark:hover:border-gray-800
                 pr-6
               "
            >
              <span className="inline-flex justify-center items-center ml-4">
                <i className="fas fa-signal text-blue-500 text-lg pr-1"></i>
              </span>
              <span
                className="
                   ml-2
                   text-sm
                   tracking-wide
                   truncate
                   text-blue-500
                   font-semibold
                 "
              >
                Statistics
              </span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="
                 relative
                 flex flex-row
                 items-center
                 h-11
                 md:mx-4
                 lg:mx-4
                 xl:mx-4
                 mx-1
                 rounded-2xl
                 focus:outline-none
                 hover:bg-gray-100
                 dark:hover:bg-gray-600
                 text-white-600
                 hover:text-white-800
                 dark:hover:border-gray-800
                 pr-6
               "
            >
              <span className="inline-flex justify-center items-center ml-4">
                <i className="fas fa-database text-blue-500 text-lg p-1"></i>
              </span>
              <span
                className="
                   ml-2
                   text-sm
                   tracking-wide
                   truncate
                   text-blue-500
                   font-semibold
                   pl-1
                 "
              >
                Stock Update
              </span>
            </a>
          </li>
          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center mt-5 h-8">
              <div
                className="
                   text-sm
                   font-normal
                   tracking-wide
                   text-gray-400
                   uppercase
                 "
              >
                Settings
              </div>
            </div>
          </li>
          <li>
            <a
              href="#"
              className="
                 relative
                 flex flex-row
                 items-center
                 h-11
                 md:mx-4
                 lg:mx-4
                 xl:mx-4
                 mx-1
                 rounded-2xl
                 focus:outline-none
                 hover:bg-gray-100
                 dark:hover:bg-gray-600
                 text-white-600
                 hover:text-white-800
                 dark:hover:border-gray-800
                 pr-6
               "
            >
              <span className="inline-flex justify-center items-center ml-4">
                <i className="fas fa-user text-blue-500 text-lg p-1"></i>
              </span>
              <span
                className="
                   ml-2
                   text-sm
                   tracking-wide
                   truncate
                   text-blue-500
                   font-semibold
                   pl-1
                 "
              >
                Profil
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="
                 relative
                 flex flex-row
                 items-center
                 h-11
                 md:mx-4
                 lg:mx-4
                 xl:mx-4
                 mx-1
                 rounded-2xl
                 focus:outline-none
                 hover:bg-gray-100
                 dark:hover:bg-gray-600
                 text-white-600
                 hover:text-white-800
                 dark:hover:border-gray-800
                 pr-6
               "
            >
              <span className="inline-flex justify-center items-center ml-4 p-1">
                <i className="fas fa-database text-blue-500 text-lg"></i>
              </span>
              <span
                className="
                   ml-2
                   text-sm
                   tracking-wide
                   truncate
                   text-blue-500
                   font-semibold
                   pl-1
                 "
              >
                Setting
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="
                 relative
                 flex flex-row
                 items-center
                 h-11
                 md:mx-4
                 lg:mx-4
                 xl:mx-4
                 mx-1
                 rounded-2xl
                 focus:outline-none
                 hover:bg-gray-100
                 dark:hover:bg-gray-600
                 text-white-600
                 hover:text-white-800
                 dark:hover:border-gray-800
                 pr-6
               "
            >
              <span className="inline-flex justify-center items-center ml-4 p-1">
                <i class="fas fa-sign-out-alt text-blue-500 text-lg"></i>
              </span>
              <span
                className="
                   ml-2
                   text-sm
                   tracking-wide
                   truncate
                   text-blue-500
                   font-semibold
                   pl-1
                 "
              >
                Logout
              </span>
            </a>
          </li>
        </ul>
        <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
          Copyright @2021. Hacktiv8 POS
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
