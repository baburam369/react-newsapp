import React from "react";
import loading from "../loading.gif";

const Spinner = () => {
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
export default Spinner;
