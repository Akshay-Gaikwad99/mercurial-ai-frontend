import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

function ChartBody({ selectedChat, isLoading }) {
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
    content: "Hi! I'm OncoChat! Here to assist you with any questions.",
  };
  const combinedMessages = [initialMessage];

  if (selectedChat && selectedChat.chartChatHistory) {
    const filteredChatHistory = selectedChat.chartChatHistory.filter(
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

export default ChartBody;
