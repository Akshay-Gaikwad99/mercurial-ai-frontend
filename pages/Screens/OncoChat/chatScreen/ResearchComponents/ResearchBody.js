import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

function ResearchBody({ selectedChat, onMessageClick, isLoading }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initialMessage = {
    role: "assistant",
    content:
      "Hi! I'm OncoResearch! Here to assist you with any questions or concerns you may have about your treatment.",
  };
  const combinedMessages = [initialMessage];

  if (selectedChat && selectedChat.researchChatHistory) {
    const filteredChatHistory = selectedChat.researchChatHistory.filter(
      (msg) => msg.content !== initialMessage.content
    );
    combinedMessages.push(...filteredChatHistory);
  } else if (!selectedChat) {
    combinedMessages.push();
  }

  const removeCitations = (text) => {
    if (typeof text !== "string") {
      console.warn("Expected string but received:", text);
      return "";
    }
    return text.replace(/【\d+†source】/g, "");
  };

  return (
    <>
      <div className="messages-container">
        {combinedMessages.map((item, index) => {
          const content = item.content || "";
          return (
            <div
              key={index}
              className={`message-container ${item.role}-message-container`}
            >
              {item.role === "user" && (
                <div className="user-message">
                  <div>
                    <p
                      style={{
                        textAlign: "right",
                        paddingRight: "10px",
                        marginBottom: "0px",
                      }}
                    >
                      <ReactMarkdown>{removeCitations(content)}</ReactMarkdown>
                    </p>
                  </div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                    alt="User Icon"
                    className="user-icon"
                  />
                </div>
              )}
              {item.role === "assistant" && (
                <div className="assistant-message">
                  <div>
                    <div className="OncoChatBody-inner-colored-avatar">
                      <i className="fa-solid fa-robot"></i>
                    </div>
                  </div>
                  <span
                    style={{
                      textAlign: "left",
                      paddingLeft: "10px",
                      marginBottom: "0px",
                    }}
                  >
                    <ReactMarkdown>{removeCitations(content)}</ReactMarkdown>
                  </span>
                </div>
              )}
              {item.nodes && (
                <div
                  className="suggestion-container"
                  style={{ textAlign: "left" }}
                >
                  <h5 style={{ textDecoration: "underline" }}>
                    Suggested questions:
                  </h5>
                  <div className="suggestion-container-one">
                    <div>
                      <ul style={{ padding: "0px" }}>
                        {item.nodes.questions.map((question, idx) => (
                          <li
                            key={idx}
                            style={{
                              listStyleType: "none",
                              padding: "10px 0px",
                            }}
                            onClick={() => {
                              if (question) {
                                onMessageClick(question);
                              } else {
                                console.warn(
                                  "Question is undefined:",
                                  question
                                );
                              }
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <ReactMarkdown>
                                  {removeCitations(question)}
                                </ReactMarkdown>
                              </div>
                              <div
                                style={{
                                  textAlign: "center",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  display: "flex",
                                  paddingRight: "20px",
                                }}
                              >
                                <div className="OncoChatBody-search-avatar">
                                  <i
                                    className="fa-solid fa-magnifying-glass"
                                    style={{ color: "white" }}
                                  ></i>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <h5 style={{ textDecoration: "underline" }}>
                    Website Suggestions:
                  </h5>
                  <div style={{ width: "100%", padding: "5px" }}>
                    <ul style={{ listStyleType: "none", padding: "0px" }}>
                      {item.nodes.suggestions.map((suggestion, idx) => {
                        const url = new URL(suggestion);
                        const displayText = url.origin;
                        return (
                          <li key={idx} style={{ listStyleType: "none" }}>
                            <div className="suggested-question-chip">
                              <i
                                className="fa-solid fa-lightbulb"
                                style={{
                                  paddingRight: "15px",
                                  color: "#11245b",
                                  fontSize: "16px",
                                }}
                              />
                              <a
                                href={suggestion}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <ReactMarkdown>{displayText}</ReactMarkdown>
                              </a>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="down-arrow-fixed">
        <div className="down-arrow-container" onClick={scrollToBottom}>
          <i className="fa-solid fa-angle-down" style={{color:'#EB9337'}}></i>
        </div>
      </div>
    </>
  );
}

export default ResearchBody;
