import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  AddIngredient,
  AddItem,
  Login,
  Register,
  StockIngredient,
  StockItem,
  Transaction,
  Category,
} from "./pages";
import Statistic2 from "./pages/Statistic";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/add-ingredient">
          <AddIngredient />
        </Route>
        <Route path="/add-item">
          <AddItem />
        </Route>
        <Route path="/category">
          <Category />
        </Route>
        <Route path="/stock-ingredient">
          <StockIngredient />
        </Route>
        <Route path="/stock-items">
          <StockItem />
        </Route>
        <Route path="/transactions">
          <Transaction />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/statistic">
          <Statistic2 />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </Router>
  );
}

export default App;
