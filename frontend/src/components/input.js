import React from "react";

const Input = props => {
  const { onValueChange, value, onButtonClick, shortUrl, error } = props;
  return (
    <form onSubmit={onButtonClick}>
      <div className="row">
        <div className="col-md-10">
          <input
            type="text"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={onValueChange}
            value={value}
            placeholder="Shorten Your Link"
          />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={onButtonClick}>
            Shorten
          </button>
        </div>
      </div>
      <div className="short_url">
        Short Url Link: <a href={shortUrl}>{shortUrl}</a>
      </div>
    </form>
  );
};

export default Input;
