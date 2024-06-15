import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import { signIn, useSession } from "next-auth/react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DisclaimerPopUp from "../../../components/Disclaimer PopUp/DisclaimerPopUp";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const useValidTLDs = () => {
  const [validTLDs, setValidTLDs] = useState([]);

  useEffect(() => {
    fetch("https://data.iana.org/TLD/tlds-alpha-by-domain.txt")
      .then((response) => response.text())
      .then((data) => {
        const tlds = data.split("\n").map((tld) => "." + tld.toLowerCase());
        setValidTLDs(tlds);
      })
      .catch((error) => {
        console.error("Error fetching TLDs:", error);
      });
  }, []);

  return validTLDs;
};

const RegisterScreen = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [dob, setDob] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [googleClicked, setGoogleClicked] = useState(false);
  const router = useRouter();

  const validTLDs = useValidTLDs();

  useEffect(() => {
    if (session) {
      const googleToken = session.user.customToken;
      if (googleToken && googleClicked) {
        localStorage.setItem("token", googleToken);
        router.push("/");
      }
    }
  }, [session, router, googleClicked]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const password = formData.get("password");
    const passwordagain = formData.get("passwordagain");
    if (password !== passwordagain) {
      setErrorMessage("Passwords do not match");
      setOpen(true);
      return;
    }

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const oncologistsHospital = formData.get("oncologistsHospital");
    const emailAddress = formData.get("email");

    const emailError = validateEmail(emailAddress, validTLDs);
    if (emailError) {
      setErrorMessage(emailError);
      setOpen(true);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.MERCURIAL_BACKEND_API}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            passwordagain,
            firstName,
            lastName,
            dob,
            oncologistsHospital,
            emailAddress,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        router.push("/");
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
        setOpen(true);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGoogleLogin = () => {
    setGoogleClicked(true);
    setGoogleLoading(true);
    signIn("google");
    setTimeout(() => {
      setGoogleLoading(false);
    }, 3000);
  };

  const handleAppleLogin = () => {
    setAppleLoading(true);
    signIn("apple");
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    if (selectedDate > minDate) {
      setDob(minDate.toISOString().split("T")[0]);
    } else {
      setDob(e.target.value);
    }
  };

  const validateEmail = (email, validTLDs) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }

    const domain = email.substring(email.lastIndexOf(".") + 1);
    if (!validTLDs.includes("." + domain.toLowerCase())) {
      return "Invalid top-level domain";
    }

    return "";
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="login-main-container">
              <form onSubmit={handleSubmit}>
                <div className="heading-login-container1">
                  <h1>Sign up</h1>
                  <p>Sign up and enjoy CarePilot</p>
                </div>

                <div className="input-login-container">
                  <input
                    minLength="2"
                    name="firstName"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                  />
                </div>

                <div className="input-login-container">
                  <input
                    type="text"
                    name="lastName"
                    minLength="2"
                    id="lastName"
                    placeholder="Last Name"
                    required
                  />
                </div>

                <div className="input-login-container">
                  <input
                    type="date"
                    name="dob"
                    className="register_dob_input"
                    placeholder="Date of Birth"
                    value={dob}
                    onChange={handleDateChange}
                    required
                    max={
                      new Date(
                        new Date().getFullYear() - 18,
                        new Date().getMonth(),
                        new Date().getDate()
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="input-login-container">
                  <input
                    type="text"
                    name="oncologistsHospital"
                    placeholder="Hospital"
                    required
                  />
                </div>

                <div className="input-login-container">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                  />
                </div>

                <div className="input-login-container">
                  <input
                    minLength="5"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ paddingRight: "2.5rem" }}
                  />
                  <span
                    onClick={handleTogglePassword}
                    style={{
                      position: "absolute",
                      right: "0.5rem",
                      top: "35%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <div className="input-login-container">
                  <input
                    minLength="5"
                    name="passwordagain"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={passwordAgain}
                    onChange={(e) => setPasswordAgain(e.target.value)}
                    required
                    style={{ paddingRight: "2.5rem" }}
                  />
                  <span
                    onClick={handleToggleConfirmPassword}
                    style={{
                      position: "absolute",
                      right: "0.5rem",
                      top: "35%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <div className="button-login-container1">
                  <button type="submit">
                    {loading ? (
                      <ClipLoader color="#fff" size={20} />
                    ) : (
                      <p style={{ margin: "0" }}>Signup</p>
                    )}
                  </button>
                </div>
              </form>

              <div className="login-redirect-container">
                <p>
                  Already have an account? &nbsp;
                  <span>
                    <Link href="/login">Login</Link>
                  </span>
                </p>
              </div>

              {/* <div className="or-container">
                <hr className="or-line" />
                <span className="or-text">or</span>
                <hr className="or-line" />
              </div> */}

              {/* <div
                className="login-google-container"
                onClick={handleGoogleLogin}
              >
                <div
                  className="login-google-container-inner"
                  style={{ marginTop: "30px", height: "65px" }}
                >
                  {googleLoading && googleClicked ? (
                    <ClipLoader color="#214493" size={20} />
                  ) : (
                    <>
                      <Image
                        src="/google.png"
                        alt="google-login"
                        width={40}
                        height={40}
                      />
                      <p>Continue with Google</p>
                    </>
                  )}
                </div>
              </div>
              <div
                className="login-google-container"
                onClick={handleAppleLogin}
              >
                <div
                  className="login-google-container-inner"
                  style={{
                    marginTop: "20px",
                    height: "65px",
                  }}
                >
                  {appleLoading ? (
                    <ClipLoader color="#214493" size={20} />
                  ) : (
                    <>
                      <Image
                        src="/apple-logo.png"
                        alt="apple-login"
                        width={30}
                        height={30}
                      />
                      <p>Continue with Apple ID</p>
                    </>
                  )}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

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
          severity="error"
          style={{
            backgroundColor: "#f44336",
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
      <DisclaimerPopUp />
    </>
  );
};

export default RegisterScreen;
