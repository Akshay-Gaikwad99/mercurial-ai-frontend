import React, { useEffect, useRef, useState } from "react";
import DisableZoom from "../DisableZoom/DisableZoom";
import ReactMarkdown from "react-markdown";
import CircularLoader from "./CircularLoader";
import mixpanel from "mixpanel-browser";

function OncoChatBodyResearch({
  messages,
  suggestedQuestions,
  handleSuggestedQuestionClick,
  suggestedLinks,
}) {
  const renderMessageContent = (content) => {
    if (typeof content === "object") {
      return (
        <>
          <CircularLoader />
        </>
      );
    }
    return <ReactMarkdown>{content}</ReactMarkdown>;
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("User ID", userId);
    mixpanel.track("Research-Chat", {
      userId: userId ? userId : null,
      method: "Research-Chat",
    });
  }, []);
  return (
    <>
      <DisableZoom />
      <div className="OncoChatBody-main-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`OncoChatBody-${
              message.isUser ? "user-chat" : "inner-container"
            }`}
            style={
              index === messages.length - 1 ? { paddingBottom: "0px" } : {}
            }
          >
            {!message.isUser && (
              <div>
                <div className="OncoChatBody-inner-colored-avatar">
                  <i className="fa-solid fa-robot"></i>
                </div>
              </div>
            )}
            <div style={{ paddingLeft: "10px" }}>
              {message.isUser && <span>{message.inputMessage}</span>}
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

        {suggestedLinks.length > 0 && (
          <div style={{ width: "100%" }}>
            <div
              style={{
                padding: "10px 30px",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {suggestedLinks.map((link, index) => {
                let domain = link.replace(/^https?:\/\//, "").split("/")[0];
                domain = domain.replace(/^www\./, "");
                return (
                  <div
                    key={index}
                    style={{
                      margin: "5px",
                      borderRadius: "20px",
                      background: "#f0f0f0",
                      padding: "5px 10px",
                    }}
                  >
                    <span style={{ color: "rgb(88, 109, 217)" }}>
                      {" "}
                      {index + 1}.{" "}
                    </span>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "#000" }}
                    >
                      {domain}{" "}
                      <span
                        style={{
                          color: "rgb(88, 109, 217)",
                          fontSize: "12px",
                        }}
                      >
                        {">"}
                      </span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {suggestedQuestions &&
          suggestedQuestions.output &&
          suggestedQuestions.output.completion &&
          typeof suggestedQuestions.output.completion === "string" && (
            <div
              style={{
                marginTop: "0px",
                padding: "10px 30px 10px 60px",
                marginBottom: "100px",
              }}
              className="suggested-questions-container"
            >
              <div>
                <>
                  <hr style={{ margin: "0px 0px 25px 0px" }} />
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <h6>Suggested questions</h6>
                  </div>
                  <div>
                    {suggestedQuestions.output.completion
                      .split("\n")
                      .filter((question) => question.trim() !== "")
                      .map((question, index) => (
                        <div
                          key={index}
                          className="suggested-question-chip"
                          onClick={() =>
                            handleSuggestedQuestionClick(question.slice(2))
                          }
                        >
                          <div
                            style={{
                              width: "100%",
                              justifyContent: "space-between",
                              display: "flex",
                            }}
                          >
                            <div style={{ marginRight: "10px" }}>
                              {question}
                            </div>
                            <div style={{ marginRight: "10px" }}>
                              <div
                                style={{
                                  background: "#586dd9",
                                  padding: "10px 12px",
                                  borderRadius: "50%",
                                }}
                              >
                                <i
                                  className="fa-solid fa-magnifying-glass"
                                  style={{ color: "white" }}
                                ></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              </div>
            </div>
          )}
      </div>
    </>
  );
}

export default OncoChatBodyResearch;
