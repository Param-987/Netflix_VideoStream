import React from "react";
import "./loader.scss";

const Loader = () => {
  return (
    <div className="outer-container">
      <div className="spinner">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      <div className="loading">Loading</div>
      </div>
    </div>
  );
};

export default Loader;
