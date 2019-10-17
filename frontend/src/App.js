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
    console.log("Google Login Response:", res);
    const currentUser = await auth.signinUser(res.Zi.access_token);
    console.log(currentUser);
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
    console.log("Google Logout");
    auth.signoutUser();
    this.setState({ currentUser: null });
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
          <Route path="/me" component={Personal} />
          <Route path="/" component={MainPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
