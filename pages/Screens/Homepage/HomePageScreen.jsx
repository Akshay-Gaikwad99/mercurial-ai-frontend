import React, { useState, useEffect } from "react";
import Image from "next/image";
import BottomBar from "../../../components/BottomBar/BottomBar";
import Link from "next/link";
import Joyride from "react-joyride";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import PullToRefresh from "react-simple-pull-to-refresh";
import DisableZoom from "../../../components/DisableZoom/DisableZoom";
import { useRouter } from "next/router";
import mixpanel from "mixpanel-browser";

const HomePageScreen = ({ userDetails }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [joyrideCompleted, setJoyrideCompleted] = useState(false);
  const [showJoyride, setShowJoyride] = useState(false);
  const storedToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    mixpanel.track("Home Page");
    const fetchJoyrideStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.MERCURIAL_BACKEND_API}/joyrideStatus`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        const { joyrideCompleted } = response.data;
        setJoyrideCompleted(joyrideCompleted);
        setShowJoyride(!joyrideCompleted);
      } catch (error) {
        console.error("Error fetching Joyride status:", error);
      }
    };

    fetchJoyrideStatus();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const handleJoyrideCallback = (data) => {
    if (data.status === "finished" || data.status === "skipped") {
      setJoyrideCompleted(true);
      axios
        .post(
          `${process.env.MERCURIAL_BACKEND_API}/updateUserJoyrideStatus`,
          {
            userId: userDetails._id,
            joyrideCompleted: true,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        )
        .then((response) => {
          console.log("Joyride completion status updated successfully");
        })
        .catch((error) => {
          console.error("Error updating Joyride completion status:", error);
        });
    }
  };

  const firstName = userDetails?.firstName || "";
  const joyrideSteps = [
    {
      target: ".hello-user",
      content: `This is the greeting section for ${firstName}!`,
    },
    {
      target: ".upload-chart",
      content: "Click here to upload your medical record.",
    },
    {
      target: ".labs-link",
      content: "Explore your lab results here.",
    },
    {
      target: ".medication-link",
      content: "Access your medication details here.",
    },
    {
      target: ".recommendation-link",
      content: "View Treatment Recommendation.",
    },
    {
      target: ".treatment-diary-link",
      content: "Access Treatment Diary.",
    },
  ];
  const handleRefresh = async () => {
    setLoading(false);
    window.location.reload();
  };

  useEffect(() => {
    // const timeout = 1 * 60 * 1000;
    const timeout = 24 * 60 * 60 * 1000;
    const interval = setInterval(() => {
      const lastActivityTime = parseInt(
        localStorage.getItem("lastActivityTime")
      );
      const currentTime = Date.now();
      if (
        !isNaN(lastActivityTime) &&
        currentTime - lastActivityTime > timeout
      ) {
        console.log("User inactive, logging out...");
        localStorage.removeItem("token");
        router.push("/login");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <DisableZoom />
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 main-12">
            <div className="bottomBar-main-container">
              <BottomBar />
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {typeof PullToRefresh !== "undefined" && (
            <PullToRefresh
              onRefresh={handleRefresh}
              style={{ textAlign: "center" }}
            >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="homepage-main-container">
                      {userDetails && (
                        <Link href="/profile" className="link">
                          <div className="greet-container-homepage hello-user">
                            <div>
                              <div className="wavingHand-container">
                                <Image
                                  src="/WavingHand.png"
                                  alt="WavingHand"
                                  width={20}
                                  height={20}
                                />
                              </div>
                            </div>
                            <div className="wavingHand-text-container">
                              <h1>
                                Hello
                                <br />
                                {userDetails.firstName}!
                              </h1>
                              <p>
                                Welcome to CarePilot by Mercurial AI. To
                                experience the full benefits, upload your
                                medical record.
                              </p>
                            </div>
                          </div>
                        </Link>
                      )}

                      <div className="getStart-container-homepage">
                        <div className="getStarted-text-container">
                          <h1>Let’s get started</h1>
                          <p>
                            Get started with uploading <br /> charts
                          </p>
                        </div>
                        <div className="getStarted-button-container upload-chart">
                          <Link href="/tutorial" className="link">
                            <button>Upload Chart</button>
                          </Link>
                        </div>
                      </div>

                      <div className="utilities-container-homepage">
                        <div>
                          <h2>Your Utilities</h2>
                        </div>
                        <div className="utilities-inner-container">
                          <Link href="/labs" className="link labs-link">
                            <div className="inner-image-utilities-container">
                              <Image
                                src="/utilities1.svg"
                                alt="Labs"
                                width={72}
                                height={72}
                                style={{ cursor: "pointer" }}
                              />

                              <h3>Labs</h3>
                            </div>
                          </Link>
                          <Link
                            href="/medication"
                            className="link medication-link"
                          >
                            <div className="inner-image-utilities-container-1">
                              <Image
                                src="/utilities2.svg"
                                alt="Medication"
                                width={72}
                                height={72}
                                style={{ cursor: "pointer" }}
                              />
                              <h3>Medication</h3>
                            </div>
                          </Link>
                        </div>
                      </div>

                      <Link
                        href="/treatment"
                        className="link recommendation-link"
                      >
                        <div className="recommendation-main-container-homepage">
                          <div className="recommendation-inner-image-container-1">
                            <img
                              src="/recommendation-homepage.webp"
                              alt="Treatment Recommendation"
                              className="recommendation-image"
                            />
                          </div>

                          <div className="recommendation-inner-text-container">
                            <h1>
                              Treatment <br />
                              Recommendation
                            </h1>
                            <p>
                              Based on your genetics, demographics, and imaging
                              studies, CarePilot recommends you ask your doctor
                              about...
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="/treatment-diary"
                        className="link treatment-diary-link"
                      >
                        <div className="treatment-main-container-homepage">
                          <div className="treatment-inner-text-container">
                            <h1>
                              Treatment <br />
                              Diary
                            </h1>
                            <p>
                              Keep track of how you’re feeling during your
                              treatment.
                            </p>
                          </div>
                          <div className="treatment-inner-image-container">
                            <Image
                              src="/treatment-homepage.svg"
                              alt="Treatment Diary"
                              width={152}
                              height={152}
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        </div>
                      </Link>
                      <div className="joyride_homepage-main-container">
                        {showJoyride && (
                          <Joyride
                            steps={joyrideSteps}
                            callback={handleJoyrideCallback}
                            continuous={true}
                            disableOverlay={false}
                            showProgress={true}
                            showSkipButton={true}
                            run={!joyrideCompleted}
                            locale={{
                              last: "Thanks",
                            }}
                            styles={{
                              options: {
                                arrowColor: "white",
                                backgroundColor: "white",
                                overlayColor: "#2c2c2c",
                                primaryColor: "#e78823",
                                textColor: "#11245B",
                                width: 1000,
                                zIndex: 1000,
                              },
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PullToRefresh>
          )}
        </>
      )}
    </>
  );
};

export default HomePageScreen;
