import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import UploadButton from "../../../components/Tutorial Components/UploadButton";


function TutorialScreen() {
  const slides = [
    {
      imgSrc: "/tutorial-iphone.svg",
      title:
        "If your hospital has a patient application, navigate to that application",
      description:
        "If your hospital does not have a patient application, please contact your hospital’s medical record department for instructions",
    },
    {
      imgSrc: "/tutorial-image2.svg",
      title: "Navigate to Request Medical Records on your account page",
    },
    {
      imgSrc: "/tutorial-image3.svg",
      title: "Select the appropriate hospital site",
    },
    {
      imgSrc: "/tutorial-image3.svg",
      title:
        "Send the records to yourself and select a date range that encompasses your date of diagnosis through now",
    },
    {
      imgSrc: "/tutorial-image4.svg",
      title: "Select all information, excluding Hospital Bills",
    },

  ];
  const storedToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [showLowerDiv, setShowLowerDiv] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const userId = userDetails?._id;

  useEffect(() => {
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
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (storedToken) {
      fetchData();
    } else {
      router.push("/login");
    }
  }, [token]);

  const renderSlides = () =>
    slides.map((slide, index) => (
      <div className="tutorialScreen_main_container" key={index}>
        <div className="lightblue-container-tutorial">
          <img src={slide.imgSrc} alt={`slide-${index}`} />
        </div>
        <div className="text-container-tutorial">
          <h5>{slide.title}</h5>
          <p>{slide.description}</p>
        </div>
      </div>
    ));

  const settings = {
    dots: true,
    infinite: false,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleFileInputClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <div className={`tutorial-slider ${showLowerDiv ? "hide-upper" : ""}`}>
          <Slider {...settings}>{renderSlides()}</Slider>
        </div>
        <div
          className={`tutorial-skip-container ${
            showLowerDiv ? "hide-upper" : ""
          }`}
        >
          <div
            className="tutorial-skip-inner-container"
            onClick={() => setShowLowerDiv(true)}
          >
            <h6>Skip, I already have my Medical Chart</h6>
          </div>
          <div className="tutorial-skip-inner-container">
            <p>
              Only you or your personal representative has the right to request
              your medical chart. We cannot request your medical chart on your
              behalf.
            </p>
          </div>
        </div>
      </div>

      {showLowerDiv && (
        <div className="lower-div-animation">
          <div className="lightblue-container-tutorial-2">
            <div className="tutorial-blue-circle">
              <img src="/document-tutorial.svg" alt="document-tutorial" />
            </div>
            <p>
              In a few days, your requested records will appear within your
              hospitals patient portal application.
            </p>
          </div>

 

          <UploadButton
            userId={userId}
            handleFileInputClick={handleFileInputClick}
            setOpen={setOpen}
            setErrorMessage={setErrorMessage}
          />
        </div>
      )}

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
            backgroundColor: "#378B29",
            color: "white",
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

export default TutorialScreen;
