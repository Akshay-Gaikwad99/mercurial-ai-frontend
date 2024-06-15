import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/layout";
import RequireAuth from "../components/Required Auth/RequireAuth";
import BottomBar from "../components/BottomBar/BottomBar";
import OncoChatScreen from "./Screens/OncoChat/OncoChatScreen";
import Loader from "../components/Loader/Loader";
import DisableZoom from "../components/DisableZoom/DisableZoom";
import MainChatScreen from "./Screens/OncoChat/OncoChatScreen"

const OncoChat = () => {
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
            <div className="col-lg-12 oncoChat-main-12">
              {loading ? <Loader /> : <MainChatScreen />}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RequireAuth(OncoChat);
