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
              <li className="item">
                <div className="long-link">{url.longUrl}</div>
                <a href={url.shortUrl}>{url.shortUrl}</a>
                {user ? (
                  <i
                    className={getHeartClass(url)}
                    aria-hidden="true"
                    onClick={() => onHearClick(index)}
                  />
                ) : null}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default ShortenUrl;
