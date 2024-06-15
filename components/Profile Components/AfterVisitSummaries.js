import React from "react";

function AfterVisitSummaries({ visitData }) {
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <div className="after-visit-main-container">
        <div className="after-visit-text-container">
          <h1>After Visit Summaries</h1>
        </div>
        <div className="after-visit-color-main-scrolling-container">
          {visitData.length > 0 ? (
            visitData.map((visit, index) => (
              <div
                key={index}
                className="after-visit-color-main-container"
                style={{ marginLeft: index === 0 ? 0 : "10px" }}
              >
                <div className="after-visit-color-inner-container">
                  <div>
                    <h1>
                      {visit.title.split("/").map((word, i) => (
                        <span key={i}>{word}</span>
                      ))}
                    </h1>
                    <p>{formatDate(visit.date)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-Data-container">
              <div>
                <h1 style={{ fontSize: "16px" }}>No Visit Summaries</h1>
                <p style={{ fontSize: "14px" }}>
                  Upload latest chart to see your summaries
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AfterVisitSummaries;
