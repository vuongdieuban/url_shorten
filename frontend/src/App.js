import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import MainPage from "./components/mainpage";
import Personal from "./components/personal";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/me" component={Personal} />
          <Route path="/" component={MainPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
