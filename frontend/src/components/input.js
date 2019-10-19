import React from "react";
import { ListGroup } from "react-bootstrap";

const Input = props => {
  const { onValueChange, value, onButtonClick, error } = props;
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <form onSubmit={onButtonClick}>
          <div className="row">
            <div className="col-md-10" style={{ padding: 0 }}>
              <input
                type="text"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={onValueChange}
                value={value}
                placeholder="Shorten Your Link"
                style={{
                  borderTop: 0,
                  borderRight: 0,
                  borderLeft: 0,
                  borderRadius: 0,
                  padding: 0
                }}
              />
              {error && <div className="alert alert-danger">{error}</div>}
            </div>
            <div className="col-md-2" style={{ padding: 0 }}>
              <button
                className="btn btn-outline-primary btn-block"
                onClick={onButtonClick}
              >
                Shorten
              </button>
            </div>
          </div>
        </form>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Input;
