export default function Navbar() {
  return (
    <div>
      <nav className="bg-blue-400">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex flex-row">
              <a href="#">
                <img
                  src="https://thumbs4.imagebam.com/38/94/96/ME30YWZ_t.png"
                  alt="logo white.png"
                  className="h-12 w-15"
                />
              </a>
            </div>
            <p className="text-white tracking-wider content-center font-sans font-black text-xl ml-10">
              {"MilkShake"}
            </p>
            <div className="flex flex-wrap content-center">
              <div>
                <button
                  type="button"
                  class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-12 w-12 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>
              <div className="leading-5 mt-1">
                <p className="ml-4 font-sans font-semibold">Andhika</p>
                <p className="ml-4 font-sans font-thin">Cashier</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
