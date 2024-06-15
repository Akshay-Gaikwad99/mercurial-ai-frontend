import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfilePopUp from "../ProfilePopUp/ProfilePopUp";

function TopBarProfile({ userDetails }) {
  const googleImage = userDetails?.image;
  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/6596/6596121.png";
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (googleImage) {
      setLoading(false);
    }
  }, [googleImage]);

  return (
    <>
      <div className="profile-topBar-main-container">
        <div className="profile-topBar-inner-container">
          <div className="circular-div" onClick={() => setOpenModal(true)}>
            {!loading ? (
              <Image
                src={googleImage}
                alt="WavingHand"
                width={70}
                height={70}
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
                onLoad={() => setLoading(false)}
                className="circular-image"
              />
            ) : (
              <img
                src={defaultImage}
                alt="WavingHand"
                width={70}
                height={70}
                className="circular-image"
              />
            )}
          </div>
          <div className="profile-topBar-content-container">
            <h1 onClick={() => setOpenModal(true)}>
              {userDetails.firstName
                ? userDetails.firstName.charAt(0).toUpperCase() +
                  userDetails.firstName.slice(1)
                : ""}
              <br />
              {userDetails.lastName
                ? userDetails.lastName.charAt(0).toUpperCase() +
                  userDetails.lastName.slice(1)
                : ""}
            </h1>
          </div>
        </div>
        <div className="profile-gettingStarted-button-container">
          <Link href="/tutorial" className="link">
            <button>Upload Chart</button>
          </Link>
        </div>
      </div>
      <ProfilePopUp
        open={openModal}
        setOpenModal={setOpenModal}
        handleClose={() => setOpenModal(false)}
        userDetails={userDetails}
      />
    </>
  );
}

export default TopBarProfile;
