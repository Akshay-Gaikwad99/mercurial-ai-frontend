import React from "react";

function ProviderNotes({ providerData }) {
  const formatDate = (dateString) => dateString;

  return (
    <>
      <div className="Provider-main-container">
        <div className="Provider-text-container">
          <h1>Provider Notes</h1>
        </div>
        <div className="Provider-color-main-scrolling-container">
          {providerData.length > 0 ? (
            providerData.map((provider, index) => (
              <div
                key={index}
                className="Provider-color-main-container"
                style={{ marginLeft: index === 0 ? 0 : "10px" }}
              >
                <div className="Provider-color-inner-container">
                  <h1>{provider.providerTitle}</h1>
                  <p>{formatDate(provider.date)}</p>
                </div>
              </div>
            ))
          ) : (
            <div
              className="no-Data-container"
              style={{ background: "#C7DAFD" }}
            >
              <div>
                <h1 style={{ fontSize: "16px", color: "#293B5C" }}>
                  No Provider Notes
                </h1>
                <p style={{ fontSize: "14px" }}>
                  Upload latest notes to see your provider notes
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProviderNotes;
