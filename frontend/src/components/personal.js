import React, { Component } from "react";
import UrlTable from "./table";
import userService from "../services/userService";
import { toast } from "react-toastify";

class Personal extends Component {
  state = {
    urls: [],
    deleteUrls: []
  };

  handleDelete = urlId => {
    const deleteUrls = [...this.state.deleteUrls];
    deleteUrls.push(urlId);
    this.setState({ deleteUrls });
  };

  handleCancel = urlId => {
    let deleteUrls = [...this.state.deleteUrls];
    deleteUrls = deleteUrls.filter(id => id !== urlId);
    this.setState({ deleteUrls });
  };

  handleSaveClicked = async () => {
    const { deleteUrls } = this.state;
    const userInfo = await userService.deleteUrls(deleteUrls);
    this.setState({ urls: userInfo.urls }, () => toast.success("Saved"));
  };

  async componentDidMount() {
    const userInfo = await userService.getUserInfo();
    this.setState({ urls: userInfo.urls });
  }

  render() {
    const { urls, deleteUrls } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <UrlTable
            urls={urls}
            deleteUrls={deleteUrls}
            onDelete={this.handleDelete}
            onCancel={this.handleCancel}
          />
          <button
            className="btn btn-primary"
            onClick={this.handleSaveClicked}
            disabled={deleteUrls.length ? false : true}
          >
            Save
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Personal;
