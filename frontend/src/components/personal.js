import React, { Component } from "react";
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
        <div>This is a restricted personal page. </div>
      </React.Fragment>
    );
  }
}

export default Personal;
