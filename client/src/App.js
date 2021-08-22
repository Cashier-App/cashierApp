import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, Register } from "./pages";
import Statistic2 from "./pages/Statistic";
import Transaction from "./pages/Transaction";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Switch>
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
