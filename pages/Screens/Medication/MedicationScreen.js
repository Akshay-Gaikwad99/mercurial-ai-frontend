import React, { useState, useEffect } from "react";
import MedicationTopBar from "../../../components/Medication Components/MedicationTopBar";
import MedicationBody from "../../../components/Medication Components/MedicationBody";
import MediPlanner from "../../../components/Medication Components/MediPlanner";
import mixpanel from "mixpanel-browser";

function MedicationScreen() {
  const [showMediPlanner, setShowMediPlanner] = useState(false);

  useEffect(() => {
    mixpanel.track("Medication Screen");
  }, []);

  const handleGetStartedClick = () => {
    setShowMediPlanner(false);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 main-12">
            <div className="news_main_container">
              <MedicationTopBar />
              {showMediPlanner ? (
                <MediPlanner />
              ) : (
                <MedicationBody handleGetStartedClick={handleGetStartedClick} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MedicationScreen;
