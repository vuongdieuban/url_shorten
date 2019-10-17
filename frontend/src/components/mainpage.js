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
    const data = await url.shortenUrl(longUrl);
    this.setState({ shortUrl: data.shortUrl, urlObj: data });
  };

  handleValueChanged = e => {
    const longUrl = e.target.value;
    console.log(longUrl);
    this.setState({ longUrl });
  };

  handleSaveClicked = async e => {
    const { urlObj } = this.state;
    const urls = [];
    urls.push(urlObj._id);
    const data = await user.postUrls(urls);
  };

  render() {
    const { longUrl, shortUrl } = this.state;
    const { user } = this.props;
    return (
      <React.Fragment>
        <Input
          onValueChange={this.handleValueChanged}
          value={longUrl}
          shortUrl={shortUrl}
          onButtonClick={this.handleShortenClicked}
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
      </React.Fragment>
    );
  }
}

export default MainPage;
