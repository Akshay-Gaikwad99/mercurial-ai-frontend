import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/layout";
import RequireAuth from "../components/Required Auth/RequireAuth";
import TutorialScreen from "./Screens/Tutorial/TutorialScreen";
import Loader from "../components/Loader/Loader";
import DisableZoom from "../components/DisableZoom/DisableZoom";
import TutorialTopBar from "../components/Tutorial Components/TutorialTopBar";

const Tutorial = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const handleRefresh = async () => {
    window.location.reload();
  };

  return (
    <>
      <DisableZoom />
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 oncoChat-main-12  oncoChat-main-12">
            <TutorialTopBar />
              {loading ? (
                <Loader />
              ) : (
                <div className="tutorialScreen_main_container">

                  <TutorialScreen />
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RequireAuth(Tutorial);
