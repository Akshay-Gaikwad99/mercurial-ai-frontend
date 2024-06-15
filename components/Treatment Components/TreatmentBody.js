import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function TreatmentBody() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(100);
  const [userId, setUserId] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const storedToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (storedToken) {
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
            setShareLink(userData?.recommendationsPdf_url);
            setUserId(userData?._id);
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
    } else {
      router.push("/login");
    }
  }, []);

  const getRandomNumbers = (percentage) => {
    const seed = 123;
    const random = (seed) => {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    let x1 = random(seed) * percentage;
    let y1 = random(seed) * (percentage - x1);
    let x2 = random(seed) * (percentage - x1 - y1);
    let y2 = percentage - x1 - y1 - x2;

    return { x1, y1, x2, y2 };
  };
  const { x1, y1, x2, y2 } = getRandomNumbers(percentage);
  const storedToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const handleDownload = async () => {
    setDownloading(true);
    try {
      const storedToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const response = await axios.get(
        `${process.env.MERCURIAL_BACKEND_API}/generate-pdf/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      const pdfUrl = response.data.pdfUrl;
      router.push(pdfUrl);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setDownloading(false);
    }
  };
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setShowShareModal(false);
    setErrorMessage("Link copied to clipboard!");
    setOpen(true);
  };
  return (
    <>
      <Box className="treatment-body-main-container">
        <Box className="treatment-body-upper-main-container">
          <Box className="treatment-body-svg-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="37"
              viewBox="0 0 50 37"
              fill="none"
            >
              <path
                d="M47.777 30.7138C48.6146 30.7138 49.2985 30.0339 49.2471 29.1978C48.8786 23.2142 46.3384 17.5494 42.0748 13.2858C37.4526 8.66363 31.1836 6.06692 24.6468 6.06692C18.1101 6.06692 11.8411 8.66363 7.21889 13.2858C2.95532 17.5494 0.415122 23.2142 0.046625 29.1978C-0.00486455 30.0339 0.679062 30.7138 1.51673 30.7138L6.20649 30.7138C7.04416 30.7138 7.71616 30.0332 7.7911 29.1989C8.14443 25.2659 9.86528 21.5617 12.68 18.7469C15.8538 15.5732 20.1584 13.7901 24.6468 13.7901C29.1353 13.7901 33.4399 15.5732 36.6136 18.747C39.4284 21.5617 41.1493 25.2659 41.5026 29.1989C41.5775 30.0332 42.2495 30.7138 43.0872 30.7138H47.777Z"
                fill="#F8DB7A"
              />
              <path
                d="M1.51675 30.7137C0.679085 30.7137 -0.00484467 30.034 0.0466614 29.1979C0.344143 24.3689 2.05786 19.7215 4.99009 15.845C8.22805 11.5644 12.7749 8.4577 17.9397 6.99707C23.1045 5.53644 28.6049 5.8017 33.6052 7.75256C38.1333 9.51921 42.0271 12.5807 44.8096 16.5387C45.2914 17.224 45.0647 18.1612 44.3511 18.5999L40.3479 21.061C39.6343 21.4997 38.7055 21.272 38.2046 20.6006C36.3177 18.0708 33.7535 16.1108 30.7946 14.9564C27.3631 13.6176 23.5884 13.4355 20.044 14.4379C16.4996 15.4403 13.3793 17.5723 11.1572 20.5099C9.24114 23.043 8.08325 26.0557 7.80064 29.199C7.72564 30.0333 7.05363 30.7137 6.21597 30.7137H1.51675Z"
                fill="url(#paint0_linear_26_2892)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_26_2892"
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F8DB7A" />
                  <stop offset="1.69" stopColor="#ABDCFC" />
                </linearGradient>
              </defs>
            </svg>
            <p className="text-center mb-0">{percentage}% Percentile</p>
          </Box>

          <Box
            className="treatment-body-share-container"
            onClick={() => setShowShareModal(true)}
          >
            <p className="text-center mb-0">Share</p>
            <img src="/export.svg" alt="" className="img-fluid" />
          </Box>

          <Box className="treatment-body-download-container">
            <button className="btn btn-primary" onClick={handleDownload}>
              {downloading ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                <>
                  Download
                  <img src="/download.svg" alt="" className="ml-2" />
                </>
              )}
            </button>
          </Box>
        </Box>

        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Treatment recommendation" />
            <Tab label="Other recommendation" />
          </Tabs>
          <Box role="tabpanel" hidden={value !== 0}>
            {userDetails?.recommendations?.length > 0 ? (
              userDetails.recommendations.map((section, index) => (
                <div
                  className="treatment-body-description-container"
                  key={index}
                >
                  <h2>{section.name}</h2>
                  <ul>
                    {section.recommendation.map((point, i) => (
                      <li key={i}>{point.point}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div
                className="treatment-body-description-container"
                style={{ textAlign: "center", paddingTop: "40px" }}
              >
                <p>Upload your chart to get treatment recommendations.</p>
              </div>
            )}
          </Box>
          <Box role="tabpanel" hidden={value !== 1}>
            <div
              className="treatment-body-description-container"
              style={{ textAlign: "center", paddingTop: "40px" }}
            >
              <h2>No Other recommendations </h2>
            </div>
          </Box>
        </Box>
        <Box>
          {showShareModal && (
            <div
              className="modal"
              tabIndex="-1"
              style={{
                display: showShareModal ? "block" : "none",
                marginTop: "80px",
              }}
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Share Link</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowShareModal(false)}
                    ></button>
                  </div>
                  <div
                    className="modal-body"
                    style={{
                      overflow: "hidden",
                      paddingRight: "20px",
                      marginRight: "20px",
                    }}
                  >
                    <p>{shareLink}</p>
                  </div>
                  <div
                    className="modal-footer"
                    style={{ display: "flex", flexWrap: "nowrap" }}
                  >
                    <button
                      type="button"
                      className="btn"
                      style={{
                        backgroundColor: "#214493",
                        color: "white",
                        width: "50%",
                        border: "none",
                      }}
                      onClick={handleCopyToClipboard}
                    >
                      Copy to Clipboard
                    </button>
                    <button
                      style={{
                        width: "50%",
                        backgroundColor: "#e78823",
                        border: "none",
                      }}
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowShareModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="success"
          style={{
            backgroundColor: "green",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
              style={{ marginLeft: "auto", marginRight: -8 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default TreatmentBody;
