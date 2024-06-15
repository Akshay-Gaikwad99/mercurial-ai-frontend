import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const BottomBar = () => {
  const router = useRouter();

  const isActive = (href) => {
    return router.pathname === href;
  };

  const getImageSrc = (src, isActive) => {
    return isActive ? src.replace("-light", "-dark") : src;
  };

  return (
    <div className="bottom-bar">
      <div className="bottom-bar-item">
        <Link href="/" className="link">
          <Image
            src={getImageSrc("/home-light.svg", isActive("/"))}
            alt="Home"
            width={20}
            height={20}
          />
          <h6>Home</h6>
        </Link>
      </div>
      <div className="bottom-bar-item">
        <Link href="/news" className="link">
          {isActive("/news") ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.121 20.615C10.8462 20.4455 10.5614 20.2928 10.268 20.158C9.535 19.819 8.557 19.5 7.5 19.5C6.221 19.5 5.062 19.968 4.32 20.362C4.08582 20.4846 3.82479 20.547 3.56047 20.5435C3.29615 20.54 3.03686 20.4708 2.806 20.342C2.56354 20.2113 2.36075 20.0177 2.21893 19.7816C2.07711 19.5454 2.00148 19.2754 2 19V6.5C2 5.879 2.295 5.237 2.898 4.871C3.672 4.401 5.414 3.5 7.5 3.5C9.081 3.5 10.645 4.01 12 4.81C13.355 4.01 14.919 3.5 16.5 3.5C18.586 3.5 20.328 4.4 21.102 4.871C21.705 5.237 22 5.879 22 6.5V19C22 19.633 21.621 20.106 21.194 20.342C20.963 20.4709 20.7035 20.5403 20.439 20.5438C20.1745 20.5473 19.9133 20.4848 19.679 20.362C18.938 19.968 17.779 19.5 16.5 19.5C15.443 19.5 14.465 19.82 13.732 20.158C13.4386 20.2928 13.1538 20.4455 12.879 20.615C12.595 20.792 12.355 21 12.001 21C11.645 21 11.406 20.792 11.121 20.615Z"
                fill="#7B8D9E"
              />
              <path
                d="M4 18.294V6.542C4.673 6.142 6 5.5 7.5 5.5C8.73 5.5 9.948 5.918 11 6.542V18.294C10.115 17.898 8.887 17.5 7.5 17.5C6.119 17.5 4.891 17.895 4 18.294Z"
                fill="#7B8D9E"
              />
              <path
                d="M13 18.294C13.885 17.898 15.113 17.5 16.5 17.5C17.881 17.5 19.109 17.895 20 18.294V6.542C19.327 6.142 18 5.5 16.5 5.5C15.27 5.5 14.052 5.918 13 6.542V18.294Z"
                fill="#7B8D9E"
              />
            </svg>
          ) : (
            <Image src="/news-light.svg" alt="News" width={20} height={20} />
          )}
          <h6>News</h6>
        </Link>
      </div>
      <div className="bottom-bar-item">
        <Link href="/oncoChat" className="link">
          <Image
            src="/OncoChat-light.svg"
            alt="OncoChat"
            width={20}
            height={20}
          />
          <h6>OncoChat</h6>
        </Link>
      </div>
      <div className="bottom-bar-item">
        <Link href="/symptoms" className="link">
          {isActive("/symptoms") ? (
            <i
              className="fa-solid fa-heart-pulse"
              style={{ fontSize: 22, color: "#7B8D9E" }}
            ></i>
          ) : (
            <Image
              src="/symptoms-light.svg"
              alt="Symptoms"
              width={20}
              height={20}
            />
          )}
          <h6>Symptoms</h6>
        </Link>
      </div>
      <div className="bottom-bar-item">
        <Link href="/profile" className="link">
          <Image
            src={getImageSrc("/profile-light.svg", isActive("/profile"))}
            alt="Profile"
            width={20}
            height={20}
          />
          <h6>Profile</h6>
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;
