import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SagaTesting from "./pages/saga-testing";
import SimpleCounter from "./pages/simple-counter";
import LuckyWordGuesser from "./pages/lucky-word-guesser";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={SagaTesting} />
        <Route path="/simple-counter" exact={true} component={SimpleCounter} />
        <Route
          path="/lucky-word-guesser"
          exact={true}
          component={LuckyWordGuesser}
        />
      </Switch>
    </Router>
  );
}

export default App;
