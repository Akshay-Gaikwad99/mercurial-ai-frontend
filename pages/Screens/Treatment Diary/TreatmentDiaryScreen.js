import React from "react";
import TreatmentDiaryComp from "../../../components/Treatment Components/TreatmentDiaryComp";
import mixpanel from 'mixpanel-browser';
import { useEffect } from "react";

function TreatmentDiaryScreen() {
  useEffect(() => {
    mixpanel.track("Treatment Diary Screen");
  },[])

  return (
    <>
      <div className="treatment_main_container">
        <TreatmentDiaryComp />
      </div>
    </>
  );
}

export default TreatmentDiaryScreen;
