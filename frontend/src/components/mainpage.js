import React, { Component } from "react";
import Input from "./input";
import { GoogleLogin, GoogleLogout } from "react-google-login";

class MainPage extends Component {
  state = {};
  responseGoogle = res => {
    console.log("Google Login Response:", res);
  };

  logoutGoogle = () => {
    console.log("Google Logout");
  };

  render() {
    return (
      <React.Fragment>
        <div className="align-items-center">
          <Input />
          <div>
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy="single_host_origin"
            />
            <GoogleLogout
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.logoutGoogle}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MainPage;
