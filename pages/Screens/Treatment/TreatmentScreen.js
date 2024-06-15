import React from "react";
import TreatmentTopBar from "../../../components/Treatment Components/TreatmentTopBar";
import TreatmentBody from "../../../components/Treatment Components/TreatmentBody";
import mixpanel from 'mixpanel-browser';
import { useEffect } from "react";

function TreatmentScreen() {
  useEffect(() => {
    mixpanel.track('Treatment Screen');
  },[])

  return (
    <>
      <div className="treatment_main_container">
        <TreatmentTopBar />
        <TreatmentBody />
      </div>
    </>
  );
}

export default TreatmentScreen;
