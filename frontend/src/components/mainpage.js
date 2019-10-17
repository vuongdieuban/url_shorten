import React, { Component } from "react";
import Input from "./input";
import url from "../services/urlService";

class MainPage extends Component {
  state = {
    longUrl: "",
    shortUrl: ""
  };

  handleShortenClicked = async e => {
    e.preventDefault();
    const { longUrl } = this.state;
    const data = await url.shortenUrl(longUrl);
    this.setState({ shortUrl: data.shortUrl });
  };

  handleValueChanged = e => {
    const longUrl = e.target.value;
    console.log(longUrl);
    this.setState({ longUrl });
  };

  render() {
    const { longUrl, shortUrl } = this.state;
    const { user } = this.props;
    console.log("user from main page", user);
    return (
      <React.Fragment>
        <Input
          onValueChange={this.handleValueChanged}
          value={longUrl}
          shortUrl={shortUrl}
          onButtonClick={this.handleShortenClicked}
        />
      </React.Fragment>
    );
  }
}

export default MainPage;
