import React from "react";
import "./loader.css"; // Assuming you have a CSS file for styling
//import Fade from "@mui/material/Fade";

function LoadingAnimation() {
  return (
    <div className="loading-container">

      <div className="loading-spinner">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>

    </div>
  );
}

export default LoadingAnimation;
