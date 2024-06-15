import React from "react";

function Imaging({ imagingData }) {
  const formatDate = (dateString) => dateString;

  return (
    <>
      <div className="Imaging-main-container">
        <div className="Imaging-text-container">
          <h1>Imaging</h1>
        </div>
        <div className="Imaging-color-main-scrolling-container">
          {imagingData.length > 0 ? (
            imagingData.map((imaging, index) => (
              <div
                key={index}
                className="Imaging-color-main-container"
                style={{ marginLeft: index === 0 ? 0 : "10px" }}
              >
                <div className="Imaging-color-inner-container">
                  <h1>{imaging.imagingReportType}</h1>
                  <p>{formatDate(imaging.date)}</p>
                </div>
              </div>
            ))
          ) : (
            <div
              className="no-Data-container"
              style={{ backgroundColor: "#EBDFFF" }}
            >
              <div>
                <h1 style={{ fontSize: "16px", color: "#491B94" }}>
                  No Imaging Reports
                </h1>
                <p style={{ fontSize: "14px" }}>
                  Upload latest imaging reports to see your results
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Imaging;
