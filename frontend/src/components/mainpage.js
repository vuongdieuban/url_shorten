import React, { Component } from "react";
import Input from "./input";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import auth from "../services/authService";
import user from "../services/userService";

class MainPage extends Component {
  state = {
    currentUser: null
  };
  responseGoogle = async res => {
    const { error } = res;
    if (error)
      return alert(
        "Please allow pop up for this page. Clear Cache History if cannot log in"
      );
    console.log("Google Login Response:", res);
    await auth.signinUser(res.Zi.access_token);
    const userInfo = await user.getUserInfo();
    console.log(userInfo);
    this.setState({ currentUser: userInfo });
    // window.location = "/me";
  };

  signoutGoogle = () => {
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
        <div className="align-items-center">
          <Input />
          <div>
            {currentUser ? (
              <GoogleLogout
                clientId={process.env.REACT_APP_CLIENT_ID}
                buttonText="Sign Out"
                onLogoutSuccess={this.signoutGoogle}
              />
            ) : (
              <GoogleLogin
                clientId={process.env.REACT_APP_CLIENT_ID}
                buttonText="Sign In"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy="single_host_origin"
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MainPage;
