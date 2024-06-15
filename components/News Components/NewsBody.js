import React from "react";
import NewsToggleBar from "./NewsToggleBar";

function NewsBody() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12" style={{ paddingBottom: "150px" }}>
          <div style={{ marginTop: "5rem" }}>
            <NewsToggleBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsBody;
