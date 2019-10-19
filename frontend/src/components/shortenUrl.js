import React from "react";
import { ListGroup } from "react-bootstrap";

const ShortenUrl = () => {
  return (
    <ListGroup>
      <ListGroup.Item>
        <div className="row">
          <div className="col-md-8 long-link">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed
            repellendus voluptatum aliquid sunt blanditiis, qui possimus,
            asperiores consequuntur reiciendis odit officiis quaerat suscipit
            quos reprehenderit? Nihil nostrum quasi ratione deserunt.
          </div>
          <div className="col-md-2">Short Link</div>
          <div className="col-md-2">
            <i class="fa fa-heart-o" aria-hidden="true"></i>
          </div>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ShortenUrl;
