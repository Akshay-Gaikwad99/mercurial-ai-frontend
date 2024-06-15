import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/layout";
import MedicationScreen from "./Screens/Medication/MedicationScreen";
import Loader from "../components/Loader/Loader";
import DisableZoom from "../components/DisableZoom/DisableZoom";
import RequireAuth from "../components/Required Auth/RequireAuth";

function Medication() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <DisableZoom />
      <Layout>{loading ? <Loader /> : <MedicationScreen />}</Layout>
    </>
  );
}

export default RequireAuth(Medication);
