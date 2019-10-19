import React from "react";

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
    <div className="shorten-action">
      <ul className="item-list">
        {urls.length
          ? urls.map((url, index) => (
              <div className="item">
                <li className="row">
                  <div className="long-link col-md-7">{url.longUrl}</div>
                  <div className="col-md-3">
                    <a href={url.shortUrl}>{url.shortUrl}</a>
                  </div>
                  {user ? (
                    <div className="col-md-2">
                      <i
                        className={getHeartClass(url)}
                        aria-hidden="true"
                        onClick={() => onHearClick(index)}
                      />
                    </div>
                  ) : null}
                </li>
              </div>
            ))
          : null}
      </ul>
    </div>
  );
};

export default ShortenUrl;
