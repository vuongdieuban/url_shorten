import React, { Component } from "react";
import Input from "./input";
import url from "../services/urlService";
import user from "../services/userService";

class MainPage extends Component {
  state = {
    longUrl: "",
    shortUrl: "",
    urlObj: null,
    error: null
  };

  handleShortenClicked = async e => {
    e.preventDefault();
    const { longUrl } = this.state;
    try {
      const data = await url.shortenUrl(longUrl);
      this.setState({ shortUrl: data.shortUrl, urlObj: data, error: null });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ error: ex.response.data });
      }
    }
  };

  handleValueChanged = e => {
    const longUrl = e.target.value;
    this.setState({ longUrl });
  };

  handleSaveClicked = async e => {
    const { urlObj } = this.state;
    const urls = [];
    urls.push(urlObj._id);
    const data = await user.postUrls(urls);
  };

  render() {
    const { longUrl, shortUrl, error } = this.state;
    const { user } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <Input
            onValueChange={this.handleValueChanged}
            value={longUrl}
            shortUrl={shortUrl}
            onButtonClick={this.handleShortenClicked}
            error={error}
          />
          {user && (
            <button
              className="btn btn-primary"
              onClick={this.handleSaveClicked}
              disabled={shortUrl ? false : true}
            >
              Save
            </button>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default MainPage;
