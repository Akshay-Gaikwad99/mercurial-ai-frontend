import React, { useState, useEffect } from "react";
import Joyride, { EVENTS } from "react-joyride";
import axios from "axios";

const UploadButton = ({
  handleFileInputClick,
  setOpen,
  setErrorMessage,
  userId,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [getURL, setGetURL] = useState("");
  const storedToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [joyrideInstance, setJoyrideInstance] = useState(null);

  useEffect(() => {
    if (joyrideInstance) {
      const handleTourStart = () => {
        joyrideInstance.start();
      };

      const events = {};
      events[EVENTS.TOUR_START] = handleTourStart;

      joyrideInstance.addToursListener(events);

      return () => {
        joyrideInstance.removeListener(events);
      };
    }
  }, [joyrideInstance]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file && isValidFileType(file)) {
      setSelectedFile(file);
      setError(null);
    } else {
      setSelectedFile(null);
      setError("Invalid file type");
    }
  };

  const isValidFileType = (file) => {
    const validTypes = ["application/zip", "application/pdf"];
    return validTypes.includes(file.type);
  };

  const simulateUploadProgress = () => {
    const totalDuration = 90 * 1000; // 60 seconds
    const intervalDuration = 100; // 0.1 second
    const increments = totalDuration / intervalDuration;
    let incrementValue = 1000 / increments;

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev + incrementValue >= 1000) {
          clearInterval(interval);
          return 1000;
        }
        return prev + incrementValue;
      });
    }, intervalDuration);

    return interval;
  };

  const uploadFileToS3 = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = simulateUploadProgress();

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await axios.post(
        `${process.env.MERCURIAL_BACKEND_API}/upload-file/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${storedToken}`,
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            // We keep the progress controlled by our simulation
          },
        }
      );

      clearInterval(interval);
      setIsUploading(false);
      setUploadProgress(0);
      setGetURL(response.data.url);
      setSelectedFile(null);

      if (response.status === 200) {
        setErrorMessage("File uploaded successfully");
        setOpen(true);
        setTimeout(() => {
          window.location.href = "/profile";
        }, 500);
      }
    } catch (err) {
      clearInterval(interval);
      setIsUploading(false);
      setError(err.message);
    }
  };

  const joyrideSteps = [
    {
      target: ".hello-user",
      content: `Click on the icon to select a file.`,
    },
    {
      target: ".hello-button",
      content: `After selecting the file, click on the "Upload Chart" button to upload your chart.`,
    },
  ];

  return (
    <>
      <div className="file-upload-container">
        <div onClick={handleFileInputClick} className="">
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept=".zip,.pdf"
            onChange={handleFileInputChange}
          />

          <div className="file-upload-icon hello-user">
            <img src="/upload.svg" alt="file-upload-icon" />
          </div>
          {selectedFile && <p>{selectedFile.name}</p>}
          {!selectedFile && (
            <p>Select file and upload it. Accepted file formats: ZIP, PDF</p>
          )}
        </div>
        <button
          className="upload-button hello-button"
          onClick={uploadFileToS3}
          disabled={isUploading}
        >
          Upload Chart
        </button>
        {error && (
          <div
            className="error"
            style={{ paddingTop: "10px", paddingBottom: "10px" }}
          >
            {error}
          </div>
        )}
        {isUploading && (
          <>
            <p>File uploading...</p>
            <p style={{ color: "gray" }}>(Please wait)</p>
          </>
        )}
        {uploadProgress > 0 && (
          <progress value={uploadProgress} max="1000">
            {Math.round(uploadProgress / 10)}%
          </progress>
        )}
      </div>
      <Joyride
        steps={joyrideSteps}
        continuous={true}
        disableOverlay={false}
        showProgress={true}
        showSkipButton={true}
        callback={({ instance }) => setJoyrideInstance(instance)}
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
    </>
  );
};

export default UploadButton;
