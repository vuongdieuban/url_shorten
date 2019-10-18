import React, { Component } from "react";
import UrlTable from "./table";

class Personal extends Component {
  state = {};
  componentDidMount() {
    const { user } = this.props;
    if (!user) {
      alert("Unauthorize. Please sign in");
      this.props.history.replace("/");
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <UrlTable />
        </div>
      </React.Fragment>
    );
  }
}

export default Personal;
