import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import Transaction from "./pages/Transaction";

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
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
