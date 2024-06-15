import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import ClipLoader from "react-spinners/ClipLoader";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DisclaimerPopUp from "../../../components/Disclaimer PopUp/DisclaimerPopUp";
import mixpanel from 'mixpanel-browser';
import { askForPermissionToReceiveNotifications} from "../../../push-notification";



const LoginScreen = () => {
  const { data: session } = useSession();
  if (session) {
    const { user } = session;
    const { email, name, image } = user;
    console.log("Email:", email);
    console.log("Name:", name);
    console.log("Image URL:", image);
  } else {
    console.log("There is no user");
  }
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleClicked, setGoogleClicked] = useState(false);

  useEffect(() => {
    const storedToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (storedToken) {
      const userId = localStorage.getItem("userId");
      mixpanel.track('Login', { 'userId': userId, method: 'email' });

      router.push("/");
    }
  }, []);
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const emailAddress = formData.get("emailAddress");
    const password = formData.get("password");

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.MERCURIAL_BACKEND_API}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailAddress,
            password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("lastActivityTime", Date.now().toString());

        const userId = localStorage.getItem("userId");
        console.log("Login successful", userId);
        mixpanel.identify(userId);
        mixpanel.people.set({
          $name: data.name,
          $email: data.email,
        });
        mixpanel.track('Login', { 'userId': userId, method: 'email' });
        await askForPermissionToReceiveNotifications(userId,data.token);
        router.push("/");
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
        setOpen(true);
        mixpanel.track('Failed Login Attempt', { method: 'email' });
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  let googleToken = session?.user?.customToken;
  useEffect(() => {
    if (googleToken) {
      localStorage.setItem("token", googleToken);
      router.push("/");
    }
  }, [googleToken]);

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

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="login-main-container">
              <form onSubmit={handleSubmit}>
                <div className="logo-login-container">
                  <Image
                    src="/carepilot-logo-1.png"
                    alt="mercurial logo"
                    width={280}
                    height={60}
                  />
                </div>

                <div className="heading-login-container">
                  <h1>Welcome!</h1>
                  <p>Login to get your treatments done.</p>
                </div>
                <div className="input-login-container">
                  <input
                    minLength="3"
                    name="emailAddress"
                    id="emailAddress"
                    type="text"
                    placeholder="Email Address"
                    required
                  ></input>
                </div>
                <div className="input-login-container">
                  <input
                    minLength="5"
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                  ></input>
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

                <div className="button-login-container">
                  <button type="submit">
                    {loading ? (
                      <ClipLoader color="#fff" size={20} />
                    ) : (
                      <p style={{ margin: "0" }}>Login</p>
                    )}
                  </button>
                </div>
                <div className="forget_container">
                  <Link className="link" href="/forget-password">
                    <p className="forget_text">Forget Password</p>
                  </Link>
                </div>
              </form>
              <div className="login-redirect-container">
                <p>
                  Don't have an account? &nbsp;
                  <span>
                    <Link className="link" href="/signup">
                      Signup
                    </Link>
                    <br />
                  </span>
                </p>
              </div>

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
                </div> */}
              {/* <div
                className="login-google-container"
                onClick={handleAppleLogin}
              >
                <div
                  className="login-google-container-inner"
                  style={{ marginTop: "20px", height: "65px" }}
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

export default LoginScreen;