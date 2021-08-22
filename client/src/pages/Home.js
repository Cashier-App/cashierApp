import { CardItem, Cart, Navbar, Sidebar, StatusItem } from "../components";

const Home = () => {
  return (
    <div>
      <div
        class="
               min-h-screen
               flex flex-col flex-auto flex-shrink-0
               antialiased
               bg-gray-200
               dark:bg-gray-700
               text-black
               dark:text-white"
      >
        <Navbar />
        <Sidebar />
        <div class="h-full ml-14 mt-14 mb-10 md:ml-52 bg-gray-200 mr-14 md:mr-80">
          <StatusItem />
          <CardItem />
        </div>
        <Cart />
      </div>
    </div>
  );
};

export default Home;
