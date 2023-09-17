import React, { Component } from "react";
import "../news.css";
import { Link } from "react-router-dom";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url, author, date, source } = this.props;

    return (
      <div className="my-3">
        <div className="card text-light bg-black">
        <div className="news-src-badge">
              <span className="badge news-badge">
                {source.name}
              </span>
            </div>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://digiday.com/wp-content/uploads/sites/3/2023/06/ai-cannes-digiday.jpg"
            }
            className="card-img-top"
            alt="..."
          />

          <div className="card-body">
           
            <h5 className="card-title">{title ? title.slice(0, 30) : ""}..</h5>
            <p className="card-text">
              {description ? description.slice(0, 40) : ""}..
            </p>
            <p className="card-text">
              <small className="author-text">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString().slice(0, 16)}
              </small>
            </p>
            <Link
              to={url}
              className="btn btn-sm btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
