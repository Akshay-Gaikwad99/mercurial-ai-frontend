import React from "react";
import Link from "next/link";

function TutorialTopBar() {
  return (
    <>
      <div className="treatment-main-container">
        <div>
          <Link href="/">
            <img
              src="/back-arrow.svg"
              alt="back-arrow"
              width={20}
              height={20}
              className="treatment-topBar-back-button"
            />
          </Link>
        </div>
        <div className="treatment_display_text_container">
          <h1>Upload Chart</h1>
        </div>
      </div>
    </>
  );
}

export default TutorialTopBar;
