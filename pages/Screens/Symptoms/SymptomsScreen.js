import React, { useEffect } from "react";
import Link from "next/link";
import SymptomsTopBar from "../../../components/Symptoms Components/SymptomsTopBar";
import SymptomsBody from "../../../components/Symptoms Components/SymptomsBody";
import mixpanel from 'mixpanel-browser';


function SymptomsScreen() {
  useEffect(() => {
    mixpanel.track('Symptoms Screen');
  },[])

  return (
    <>
      <SymptomsTopBar/>
      <SymptomsBody/>
    </>
  );
}

export default SymptomsScreen;
