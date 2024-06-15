// import React, { useEffect } from "react";

// const DisableZoom = () => {
//   useEffect(() => {
//     const handleWheel = (e) => {
//       if (e.ctrlKey || e.metaKey) {
//         e.preventDefault();
//       }
//     };

//     const handleTouchMove = (e) => {
//       if (e.touches.length > 1) {
//         e.preventDefault();
//       }
//     };

//     const handleKeyDown = (e) => {
//       if (
//         (e.ctrlKey || e.metaKey) &&
//         (e.key === "+" || e.key === "-" || e.key === "=")
//       ) {
//         e.preventDefault();
//       }
//     };

//     window.addEventListener("wheel", handleWheel, { passive: false });
//     window.addEventListener("touchmove", handleTouchMove, { passive: false });
//     window.addEventListener("keydown", handleKeyDown, { passive: false });

//     return () => {
//       window.removeEventListener("wheel", handleWheel);
//       window.removeEventListener("touchmove", handleTouchMove);
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   return null;
// };

// export default DisableZoom;

import React from 'react'

function DisableZoom() {
  return (
    <></>
  )
}

export default DisableZoom