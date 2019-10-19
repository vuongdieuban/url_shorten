import React from "react";

const Input = props => {
  const { onValueChange, value, onButtonClick, error } = props;
  return (
    <form className="form row" onSubmit={onButtonClick}>
      <div className="col-md-8 align-self-center">
        <input
          className="input"
          type="text"
          onChange={onValueChange}
          value={value}
          placeholder="Shorten Your Link"
        ></input>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <div className="col-md-4">
        <div className="confirm">
          <button className="button" onClick={onButtonClick}>
            Shorten
          </button>
        </div>
      </div>
    </form>
  );
};

export default Input;
