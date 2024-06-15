import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout/layout";
import BottomBar from "../../../components/BottomBar/BottomBar";
import TopBarProfile from "../../../components/Profile Components/TopBarProfile";
import AfterVisitSummaries from "../../../components/Profile Components/AfterVisitSummaries";
import ProviderNotes from "../../../components/Profile Components/ProviderNotes";
import Imaging from "../../../components/Profile Components/Imaging";
import ClipLoader from "react-spinners/ClipLoader";
import { signOut } from "next-auth/react";
import mixpanel from "mixpanel-browser";
import axios from "axios";

const notificationApi = process.env.BACKEND_TOKEN_API;

const ProfileScreen = () => {
  const [userDetails, setUserDetails] = useState({});
  const [visitData, setVisitData] = useState([]);
  const [providerData, setProviderData] = useState([]);
  const [imagingData, setImagingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    mixpanel.track("Profile Screen", { userId: userId });
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const userDataResponse = await axios.get(
          `${process.env.MERCURIAL_BACKEND_API}/user`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (userDataResponse.status === 200) {
          const userData = userDataResponse.data;
          setUserDetails(userData);
          const extractedData = userData.extractedData;
          if (extractedData) {
            setVisitData(extractedData.visit);
            setProviderData(extractedData.provider);
            setImagingData(extractedData.imaging);
          }
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const userId = localStorage.getItem("userId");
      const storedToken = localStorage.getItem("token");
      const url = `${notificationApi}/user/remove-fcm-token`;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storedToken}`,
      };

      const data = { userId, };

      try {
        await axios.post(url, data, { headers });
        console.log('FCM token remove successfully');
      } catch (error) {
        console.error('Error saving FCM token:', error);
      }


      await signOut({ redirect: false });
      localStorage.removeItem("token");
      localStorage.removeItem("lastActivityTime");
      localStorage.removeItem("disclaimerSeen");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 main-12">
              <div className="bottomBar-main-container">
                <BottomBar />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="profile-main-container">
                <TopBarProfile userDetails={userDetails} />
                {loading ? (
                  <div
                    className="spinner-container"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <ClipLoader color="#214493" loading={loading} size={50} />
                  </div>
                ) : (
                  <>
                    <AfterVisitSummaries visitData={visitData} />
                    <ProviderNotes providerData={providerData} />
                    <Imaging imagingData={imagingData} />
                  </>
                )}

                <div className="logout-container">
                  <button onClick={handleLogout} disabled={loggingOut}>
                    {loggingOut ? (
                      <ClipLoader color="#fff" size={20} />
                    ) : (
                      "Logout"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProfileScreen;
