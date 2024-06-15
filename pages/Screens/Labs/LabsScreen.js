import React, { useState, useEffect } from "react";
import LabsTopBar from "../../../components/Labs Component/LabsTopBar";
import ReportGraphCards from "../../../components/Labs Component/ReportGraphCards";

function LabsScreen() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 main-12">
            <div className="lab_main_container">
              <LabsTopBar />
              <ReportGraphCards/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LabsScreen;
