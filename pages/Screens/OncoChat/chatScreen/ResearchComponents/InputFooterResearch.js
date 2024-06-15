import React, { useEffect } from "react";

function InputFooterResearch({
  onSendMessage,
  messageContent,
  setMessages,
  messages,
}) {
  useEffect(() => {
    setMessages(messageContent);
  }, [messageContent, setMessages]);

  const internalHandleSubmit = (event) => {
    event.preventDefault();
    if (messages.trim()) {
      onSendMessage(messages);
      setMessages("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      internalHandleSubmit(event);
    }
  };

  return (
    <div className="OncoChatTopFooter-main-container">
      <form onSubmit={internalHandleSubmit}>
        <div style={{ display: "flex" }}>
          <div
            className="OncoChatTopFooter-input-container"
            style={{ width: "100%" }}
          >
            <textarea
              placeholder="Type your message"
              className="OncoChatTopFooter-input"
              value={messages}
              onChange={(e) => setMessages(e.target.value)}
              onKeyDown={handleKeyDown}
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
                paddingTop: "12px",
                outline: "none",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
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
    </div>
  );
}

export default InputFooterResearch;
