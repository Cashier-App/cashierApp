import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  AddIngredient,
  AddItem,
  Login,
  Register,
  StockIngredient,
  StockItem,
  Transaction,
} from "./pages";
import Statistic2 from "./pages/Statistic";
import Home from "./pages/Home";

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
    </Router>
  );
}

export default App;
