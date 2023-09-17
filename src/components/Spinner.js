import React, { Component } from "react";
import loading from "../loading.gif";

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          style={{
            marginTop: "150px",
            height: "60px",
            width: "50px",
          }}
          src={loading}
          alt=""
          className="loading"
        />
      </div>
    );
  }
}
