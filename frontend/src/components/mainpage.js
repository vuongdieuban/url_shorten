import React, { Component } from "react";
import Input from "./input";

class MainPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="search_form">
          <Input />
        </div>
      </React.Fragment>
    );
  }
}

export default MainPage;
