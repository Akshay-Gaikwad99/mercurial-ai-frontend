import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DisableZoom from "../DisableZoom/DisableZoom";
import ReactMarkdown from "react-markdown";
import CircularLoader from "./CircularLoader";
import mixpanel from 'mixpanel-browser';


function OncoChatBodyChat({ messagesChat }) {
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("User ID", userId);
    mixpanel.track('PDF_Chat', { 'userId': userId ? userId : null, method: 'PDF-Chat' });

  }, [])
  const renderMessageContent = (content) => {
    if (typeof content === "object") {
      return (
        <>
          {/* <div className="typing">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div> */}
          <CircularLoader />
        </>
      );
    }
    return <ReactMarkdown>{content}</ReactMarkdown>;
  };

  const filteredMessages = messagesChat?.filter(
    (message, index) =>
      !(message.inputMessage === "..." && messagesChat[index + 1]?.isUser)
  );

  return (
    <>
      <DisableZoom />
      <div
        className="OncoChatBody-main-container"
        style={{ paddingTop: "10px" }}
      >
        {filteredMessages?.map((message, index) => (
          <div
            key={index}
            className={`OncoChatBody-${message.isUser ? "user-chat" : "inner-container"
              }`}
            style={
              index === filteredMessages.length - 1
                ? { paddingBottom: "300px" }
                : {}
            }
          >
            {!message.isUser && (
              <div>
                <div className="OncoChatBody-inner-colored-avatar">
                  <i className="fa-solid fa-robot"></i>
                </div>
              </div>
            )}
            <div style={{ paddingLeft: "10px", paddingTop: "0px" }}>
              {message.isUser && message.inputMessageChat && (
                <span style={{ paddingTop: "10px" }}>
                  {" "}
                  {message.inputMessageChat}
                </span>
              )}
              {renderMessageContent(message.message)}
            </div>
            {message.isUser && (
              <div>
                <div className="OncoChatBody-inner-colored-avatar-image-container">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                    alt="User Avatar"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default OncoChatBodyChat;
