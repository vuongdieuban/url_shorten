import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import MainPage from "./components/mainpage";
import Personal from "./components/personal";
import NavBar from "./components/navbar";
import auth from "./services/authService";
import "./App.css";

class App extends Component {
  state = { currentUser: null };

  handleSigninSuccess = async res => {
    const currentUser = await auth.signinUser(res.Zi.access_token);
    this.setState({ currentUser });
  };

  handleSigninFail = async res => {
    const { error } = res;
    console.log(error);
    return alert(
      "Please allow pop up for this page. Clear Cache History if cannot log in"
    );
  };

  handleSignout = () => {
    auth.signoutUser();
    window.location = "/";
  };

  componentDidMount() {
    const currentUser = auth.getCurrentUser();
    this.setState({ currentUser });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <React.Fragment>
        <NavBar
          user={currentUser}
          onSigninSuccess={this.handleSigninSuccess}
          onSigninFail={this.handleSigninFail}
          onSignout={this.handleSignout}
        />
        <Switch>
          <Route
            path="/me"
            render={props => <Personal {...props} user={currentUser} />}
          />
          <Route
            path="/"
            render={props => <MainPage {...props} user={currentUser} />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
