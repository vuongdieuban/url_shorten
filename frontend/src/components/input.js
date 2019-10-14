import React, { Component } from "react";

class Input extends Component {
  state = {};
  render() {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Default
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
    );
  }
}

export default Input;
