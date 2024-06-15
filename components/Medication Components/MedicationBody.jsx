import React from "react";

function MedicationBody({ handleGetStartedClick }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 p-0">
          <div
            style={{
              textAlign: "center",
              marginTop: "70px",
              padding: "50px",
              height: `calc(100vh -  70px)`,
              background: `linear-gradient(to bottom, white, rgb(235, 223, 255), rgb(185, 173, 255))`,
            }}
          >
            <div>
              <div>
                <img
                  src="./medico.png"
                  className="img-fluid"
                  alt=""
                  style={{ width: "auto", height: "300px" }}
                />
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "rgb(33, 68, 147)",
                  }}
                >
                  We take care of your regular medication
                </h4>
                <p
                  style={{
                    fontSize: "16px",
                    paddingTop: "10px",
                    paddingBottom: "20px",
                    fontWeight: "400",
                    color: "rgb(33, 68, 147)",
                  }}
                >
                  Keep yourself and loved ones safe and never forget to take
                  your meds. supplements and vitamins
                </p>
                <button
                  onClick={handleGetStartedClick}
                  style={{
                    border: "none",
                    borderRadius: "50px",
                    padding: "10px 30px",
                    height: "60px",
                    width: "300px",
                    backgroundColor: "#214493",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicationBody;
