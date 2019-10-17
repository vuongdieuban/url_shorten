import React from "react";

const Input = props => {
  const { onValueChange, value, onButtonClick, shortUrl } = props;
  return (
    <form onSubmit={onButtonClick}>
      <div className="row">
        <div className="col-md-10">
          <div className="input-group mb-3 ">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                URL
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              onChange={onValueChange}
              value={value}
            />
          </div>
          <div className="short_url">
            Short Url Link: <a href={shortUrl}>{shortUrl}</a>
          </div>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={onButtonClick}>
            Shorten
          </button>
        </div>
      </div>
    </form>
  );
};

export default Input;
