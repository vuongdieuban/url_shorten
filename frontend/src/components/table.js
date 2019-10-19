import React from "react";
import { Table } from "react-bootstrap";

const UrlTable = props => {
  const reduceLongUrl = longUrl => {
    if (longUrl.length > 50) {
      longUrl = longUrl.slice(0, 50) + "...";
    }
    return longUrl;
  };

  const reduceDate = date => {
    const shortDate = date.match(/^(.*?)\GMT/);
    return shortDate[1];
  };

  const getActionButton = urlId => {
    const { deleteUrls } = props;
    if (deleteUrls.includes(urlId)) {
      return (
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => onCancel(urlId)}
        >
          Cancel
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onDelete(urlId)}
        >
          Delete
        </button>
      );
    }
  };

  const headers = ["#", "Long Url", "Short Url", "Date", "Action"];
  const { urls, onDelete, onCancel } = props;
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {urls.length
          ? urls.map((url, index) => (
              <tr key={url._id}>
                <td>{index}</td>
                <td>
                  <a href={url.longUrl}>{reduceLongUrl(url.longUrl)}</a>
                </td>
                <td>
                  <a href={url.shortUrl}>{url.shortUrl}</a>
                </td>
                <td>{reduceDate(url.date)}</td>
                <td>{getActionButton(url._id)}</td>
              </tr>
            ))
          : null}
      </tbody>
    </Table>
  );
};

export default UrlTable;
