import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/layout";
import RequireAuth from "../components/Required Auth/RequireAuth";
import BottomBar from "../components/BottomBar/BottomBar";
import ProfileScreen from "./Screens/Profile/ProfileScreen";
import Loader from "../components/Loader/Loader";
import DisableZoom from "../components/DisableZoom/DisableZoom";

const Profile = () => {
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 main-12">
              <div className="bottomBar-main-container">
                <BottomBar />
              </div>
            </div>
          </div>
        </div>
        {loading ? <Loader /> : <ProfileScreen />}
      </Layout>
    </>
  );
};

export default RequireAuth(Profile);
