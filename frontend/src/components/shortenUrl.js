import React from "react";
import { ListGroup } from "react-bootstrap";

const ShortenUrl = props => {
  const getHeartClass = url => {
    if (url.save) {
      return "fa fa-heart hover";
    } else {
      return "fa fa-heart-o hover";
    }
  };
  const { urls, onHearClick, user } = props;
  return (
    <ListGroup>
      {urls.length
        ? urls.map((url, index) => (
            <ListGroup.Item key={index}>
              <div className="row">
                <div className="col-md-7 long-link">{url.longUrl}</div>
                <div className="col-md-3">
                  <a href={url.shortUrl}>{url.shortUrl}</a>
                </div>
                <div className="col-md-2">
                  {user ? (
                    <i
                      className={getHeartClass(url)}
                      aria-hidden="true"
                      onClick={() => onHearClick(index)}
                    />
                  ) : null}
                </div>
              </div>
            </ListGroup.Item>
          ))
        : null}
    </ListGroup>
  );
};

export default ShortenUrl;
