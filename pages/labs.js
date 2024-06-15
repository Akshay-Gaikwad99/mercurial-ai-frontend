import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/layout";
import LabsScreen from "./Screens/Labs/LabsScreen";
import Loader from "../components/Loader/Loader";
import DisableZoom from "../components/DisableZoom/DisableZoom";
import RequireAuth from "../components/Required Auth/RequireAuth";

function Labs() {
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
      <Layout>
          {loading ? <Loader /> : <LabsScreen />}
      </Layout>
    </>
  );
}

export default RequireAuth(Labs);
