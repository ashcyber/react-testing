import React from "react";
import { Switch, Route } from "react-router-dom";
import SagaTesting from "./pages/saga-testing";
import SimpleCounter from "./pages/simple-counter";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={SagaTesting} />
        <Route path="/simple-counter" exact={true} component={SimpleCounter} />
      </Switch>
    </Router>
  );
}

export default App;
