import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, Register } from "./pages";
import Statistic from "./pages/Statistic";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/statistic">
          <Statistic />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
