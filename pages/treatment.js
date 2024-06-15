import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/layout";
import TreatmentScreen from "./Screens/Treatment/TreatmentScreen";
import Loader from "../components/Loader/Loader";
import DisableZoom from "../components/DisableZoom/DisableZoom";
import RequireAuth from "../components/Required Auth/RequireAuth";

function treatment() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const handleRefresh = async () => {
    setLoading(false);
    window.location.reload();
  };
  return (
    <>
    <DisableZoom/>
      <Layout>
          {loading ? (
            <Loader />
          ) : (
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12 treatment-main-12">
                  <TreatmentScreen />
                </div>
              </div>
            </div>
          )}
      </Layout>
    </>
  );
}

export default RequireAuth(treatment);
