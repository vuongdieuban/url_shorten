import React, { Component } from "react";
import Input from "./input";
import urlService from "../services/urlService";
import userService from "../services/userService";
import ShortenUrl from "../components/shortenUrl";
import { toast } from "react-toastify";

class MainPage extends Component {
  state = {
    longUrl: "",
    urls: [],
    saveUrls: [],
    error: null
  };

  mapToViewModel = url => {
    return {
      id: url._id,
      longUrl: url.longUrl,
      shortUrl: url.shortUrl,
      save: false
    };
  };

  handleShortenClicked = async e => {
    e.preventDefault();
    const { longUrl } = this.state;
    let urls = JSON.parse(JSON.stringify(this.state.urls)); // deep copy
    try {
      const data = await urlService.shortenUrl(longUrl);
      const urlViewModel = this.mapToViewModel(data);
      urls.push(urlViewModel);
      this.setState({ urls, longUrl: "", error: null });
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

  handleHeartClicked = index => {
    let saveUrls = [...this.state.saveUrls];
    let urls = JSON.parse(JSON.stringify(this.state.urls));
    let url = urls[index];
    if (url.save) {
      url.save = false;
      saveUrls = saveUrls.filter(id => id !== url.id);
    } else {
      url.save = true;
      saveUrls.push(url.id);
    }
    this.setState({ urls, saveUrls });
  };

  handleSaveClicked = async e => {
    const { saveUrls } = this.state;
    try {
      const data = await userService.postUrls(saveUrls);
      let urls = JSON.parse(JSON.stringify(this.state.urls));
      urls = urls.filter(u => u.save === false);
      this.setState({ urls, saveUrls: [] }, () => toast.success("Saved"));
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ error: ex.response.data });
      }
    }
  };

  componentDidMount() {
    let state = localStorage.getItem("mainpage");
    if (state) {
      state = JSON.parse(state);
      this.setState(state);
    }
  }

  componentWillUnmount() {
    let state = { ...this.state };
    state = JSON.stringify(state);
    localStorage.setItem("mainpage", state);
  }

  render() {
    const { longUrl, urls, saveUrls, error } = this.state;
    const { user } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <Input
            onValueChange={this.handleValueChanged}
            value={longUrl}
            onButtonClick={this.handleShortenClicked}
            error={error}
          />
          <ShortenUrl
            urls={urls}
            onHearClick={this.handleHeartClicked}
            user={user}
          />
          {user && (
            <button
              className="btn btn-outline-primary btn-block"
              onClick={this.handleSaveClicked}
              disabled={saveUrls.length ? false : true}
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
