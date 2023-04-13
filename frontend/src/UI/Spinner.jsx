import React from "react";
import "./Spinner.css";
const Spinner = ({ color }) => {
  return (
    <div className="spinner-container">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="svg_spinner"
        style={{ fill: `${color}` }}
      >
        <rect className="spinner_zWVm" x="1" y="1" width="7.33" height="7.33" />
        <rect
          className="spinner_gfyD"
          x="8.33"
          y="1"
          width="7.33"
          height="7.33"
        />
        <rect
          className="spinner_T5JJ"
          x="1"
          y="8.33"
          width="7.33"
          height="7.33"
        />
        <rect
          className="spinner_E3Wz"
          x="15.66"
          y="1"
          width="7.33"
          height="7.33"
        />
        <rect
          className="spinner_g2vs"
          x="8.33"
          y="8.33"
          width="7.33"
          height="7.33"
        />
        <rect
          className="spinner_ctYB"
          x="1"
          y="15.66"
          width="7.33"
          height="7.33"
        />
        <rect
          className="spinner_BDNj"
          x="15.66"
          y="8.33"
          width="7.33"
          height="7.33"
        />
        <rect
          className="spinner_rCw3"
          x="8.33"
          y="15.66"
          width="7.33"
          height="7.33"
        />
        <rect
          className="spinner_Rszm"
          x="15.66"
          y="15.66"
          width="7.33"
          height="7.33"
        />
      </svg>
    </div>
  );
};

export default Spinner;
