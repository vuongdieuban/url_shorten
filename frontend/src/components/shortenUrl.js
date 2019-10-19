import React from "react";
import { ListGroup } from "react-bootstrap";

const ShortenUrl = props => {
  const { urls } = props;
  return (
    <ListGroup>
      {urls.length
        ? urls.map(url => (
            <ListGroup.Item key={url.id}>
              <div className="row">
                <div className="col-md-7 long-link">{url.longUrl}</div>
                <div className="col-md-3">
                  <a href={url.shortUrl}>{url.shortUrl}</a>
                </div>
                <div className="col-md-2">
                  <i class="fa fa-heart-o hover" aria-hidden="true" />
                </div>
              </div>
            </ListGroup.Item>
          ))
        : null}
    </ListGroup>
  );
};

export default ShortenUrl;
