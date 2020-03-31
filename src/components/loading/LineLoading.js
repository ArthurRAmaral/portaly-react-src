import React from "react";
import "../../css/Loading.css";

const LineLoading = () => {
  return (
    <div className="loading">
      <div className="progress brown lighten-4">
        <div className="indeterminate brown darken-1"></div>
      </div>
    </div>
  );
};

export default LineLoading;
