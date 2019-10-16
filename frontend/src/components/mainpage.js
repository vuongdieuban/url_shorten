import React, { Component } from "react";
import Input from "./input";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import auth from "../services/authService";

class MainPage extends Component {
  state = {};
  responseGoogle = async res => {
    const { error } = res;
    if (error)
      return alert(
        "Please allow pop up for this page. Clear Cache History if cannot log in"
      );
    console.log("Google Login Response:", res);
    await auth.signinUser(res.Zi.access_token);
    // window.location = "/me";
  };

  signoutGoogle = () => {
    console.log("Google Logout");
    auth.signoutUser();
  };

  render() {
    return (
      <React.Fragment>
        <div className="align-items-center">
          <Input />
          <div>
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Sign In"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy="single_host_origin"
            />
            <GoogleLogout
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Sign Out"
              onLogoutSuccess={this.signoutGoogle}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MainPage;
