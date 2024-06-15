import React, { useState } from "react";
import Link from "next/link";
import DisableZoom from "../DisableZoom/DisableZoom";
import { Tabs, Tab } from "@mui/material";

function OncoChatTopBar({ setActiveTab, activeTab }) {
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <DisableZoom />
      <div className="oncochat-outer-container">
        <div className="oncochat-main-container">
          <div>
            <Link href="/">
              <img
                src="/back-arrow.svg"
                alt="back-arrow"
                width={20}
                height={20}
                className="treatment-topBar-back-button"
              />
            </Link>
          </div>
          <div className="treatment_display_text_container">
            <h1>Onco Chat</h1>
          </div>
          <div className="oncoChat_display_image_container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              alt="back-arrow"
            />
          </div>
        </div>

        <div>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="Onco Chat Tabs"
            centered
            sx={{ justifyContent: "flex-start" }}
            className="custom-tabs"
          >
            <Tab label="Chart" />
            <Tab label="Research" />
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default OncoChatTopBar;
