import React, { Component } from "react";
import Input from "./input";
import urlService from "../services/urlService";
import userService from "../services/userService";
import ShortenUrl from "../components/shortenUrl";
import { toast } from "react-toastify";

const STATE_KEY = "mainpage"; // key to store this.state to local storage
window.onbeforeunload = () => localStorage.removeItem(STATE_KEY);

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
    if (!saveUrls.length) return toast.info("Heart the URL to Save");
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
    let state = localStorage.getItem(STATE_KEY);
    if (state) {
      state = JSON.parse(state);
      this.setState(state);
    }
  }

  componentWillUnmount() {
    let state = { ...this.state };
    state = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, state);
  }

  render() {
    const { longUrl, urls, saveUrls, error } = this.state;
    const { user } = this.props;
    return (
      <React.Fragment>
        <div className="banner">
          <h1 className="title">SHORTEN URL</h1>
        </div>
        <section className="shorten-app">
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
              <div className="confirm">
                <button className="button" onClick={this.handleSaveClicked}>
                  Save
                </button>
              </div>
            )}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default MainPage;
