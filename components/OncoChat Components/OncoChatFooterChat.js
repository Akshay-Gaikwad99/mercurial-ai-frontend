import React, { useState, useEffect, useRef } from "react";
import autosize from "autosize";

function OncoChatFooterChat({
  onSendMessage,
  inputMessageChat,
  setInputMessageChat,
}) {
  const [error, setError] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
    const handleTouchStart = () => {
      document.body.style.zoom = "100%";
    };
    window.addEventListener("touchstart", handleTouchStart);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputMessageChat(newValue);
    setError("");
  };

  const handleSend = (e) => {
    e.preventDefault();
    const trimmedMessage = inputMessageChat.trim();
    if (!trimmedMessage) {
      setError("Please enter text to send a message.");
    } else {
      onSendMessage(trimmedMessage);
      setInputMessageChat("");
      setError("");
    }
    textareaRef.current.style.height = "50px";
    textareaRef.current.style.paddingTop = "12px";
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="OncoChatTopFooter-main-container">
      <form onSubmit={handleSend} >
        <div style={{ display: "flex" }}>
          <div
            className="OncoChatTopFooter-input-container"
            style={{ width: "100%" }}
          >
            <textarea
              placeholder="Type your message"
              className="OncoChatTopFooter-input"
              value={inputMessageChat}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              ref={textareaRef}
              style={{
                maxHeight: "200px",
                minHeight: "0px",
                height: "50px",
                width: "100%",
                boxSizing: "border-box",
                fontSize: "15px",
                resize: "vertical",
                overflowY: "auto",
                borderRadius: "40px",
                border: "1px solid #c9c9c9",
                background: "#fff",
                paddingLeft: "20px",
                paddingBottom: "0px",
                paddingRight: "10px",
                paddingTop: "20px",
                outline: "none",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
                WebkitBorderRadius: "40px",
                MozBorderRadius: "40px",
                MsBorderRadius: "40px",
                BorderRadius: "40px",
              }}
            />
          </div>
          <div className="onCoChat-footer-button-container">
            <button type="submit" className="OncoChatTopFooter-image-container">
              <img
                src="/oncoChat-send.svg"
                alt="oncoChat-send"
                className="OncoChatTopFooter-send-image"
              />
            </button>
          </div>
        </div>
      </form>
      {error && <div style={{ color: "lightgray" }}>{error}</div>}
    </div>
  );
}

export default OncoChatFooterChat;
