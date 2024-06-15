import React, { useState } from "react";
import Layout from "../components/Layout/layout";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/image";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [emailAddress, setEmailAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const validateFields1 = () => {
    let isValid = true;
    if (!emailAddress.trim()) {
      setEmailError("Please enter your email address");
      isValid = false;
    }
    return isValid;
  };

  const validateFields = () => {
    let isValid = true;
    if (!emailAddress.trim()) {
      setEmailError("Please enter your email address");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!otp.trim()) {
      setOtpError("Please enter OTP");
      isValid = false;
    } else {
      setOtpError("");
    }
    if (!newPassword.trim()) {
      setNewPasswordError("Please enter new password");
      isValid = false;
    } else {
      setNewPasswordError("");
    }
    return isValid;
  };

  const handleForgotPassword = async () => {
    if (validateFields1()) {
      setIsSendingOTP(true);
      try {
        const response = await fetch(
          `${process.env.MERCURIAL_BACKEND_API}/forgotPassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ emailAddress }),
          }
        );
        setIsSendingOTP(false);
        if (response.ok) {
          setStep(2);
        } else {
          throw new Error("Error sending OTP");
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        setSnackbarMessage("Server error");
        setOpenSnackbar(true);
        setIsSendingOTP(false);
      }
    }
  };

  const handleResetPassword = async () => {
    if (validateFields()) {
      setIsResettingPassword(true);
      try {
        const url = `${process.env.MERCURIAL_BACKEND_API}/resetPassword`;
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailAddress, newPassword, otp }),
        });
        if (response.ok) {
          setSnackbarMessage("Password reset successfully");
          setOpenSnackbar(true);
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        } else {
          throw new Error("Error resetting password");
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        setSnackbarMessage("Server error");
        setOpenSnackbar(true);
      } finally {
        setIsResettingPassword(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleEmailChange = (e) => {
    setEmailAddress(e.target.value);
    setEmailError("");
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setOtpError("");
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setNewPasswordError("");
  };

  return (
    <>
      <Layout>
        {step === 1 && (
          <div className="forget-password-main-container-1">
            <div className="forget-password-main-container-main-div">
              <div className="forget-image-container">
                <Image
                  src="/carepilot-logo-1.png"
                  alt="mercurial logo"
                  width={280}
                  height={60}
                />
              </div>
              <div className="forget-password-main-container-input">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={emailAddress}
                  onChange={handleEmailChange}
                />
                {emailError && <span className="error">{emailError}</span>}
              </div>
              <div className="forget-password-main-container-input">
                <button onClick={handleForgotPassword} disabled={isSendingOTP}>
                  {isSendingOTP ? (
                    <ClipLoader color="#fff" size={20} />
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="forget-password-main-container-1">
            <div>
              <div className="forget-image-container">
                <Image
                  src="/carepilot-logo-1.png"
                  alt="mercurial logo"
                  width={280}
                  height={60}
                />
              </div>
              <div style={{ width: "300px", padding: "20px" }}>
                <div className="forget-password-main-container-input">
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    value={emailAddress}
                    onChange={handleEmailChange}
                  />
                  {emailError && <span className="error">{emailError}</span>}
                </div>
                <div className="forget-password-main-container-input">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                  />
                  {otpError && <span className="error">{otpError}</span>}
                </div>
                <div className="forget-password-main-container-input">
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                  {newPasswordError && (
                    <span className="error">{newPasswordError}</span>
                  )}
                </div>
                <div className="forget-password-main-container-input">
                  <button
                    onClick={handleResetPassword}
                    disabled={isResettingPassword}
                  >
                    {isResettingPassword ? (
                      <ClipLoader color="#fff" size={20} />
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
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
                onClick={handleCloseSnackbar}
                style={{ marginLeft: "auto", marginRight: -8 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Layout>
    </>
  );
}

export default ForgotPassword;
