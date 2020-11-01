import React from "react";
import "./App.css";
import AddDrl from "./components/AddDrl";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/">
            <AddDrl />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
