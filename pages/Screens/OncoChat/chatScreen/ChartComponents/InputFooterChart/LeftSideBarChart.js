import React, { useState } from "react";
import axios from "axios";

function LeftSideBarChart({
  chats = [],
  onNewChatClick,
  onChatItemClick,
  handleCloseSidebar,
  setChartChats,
  token,
}) {
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const handleMenuClick = (index, event) => {
    event.stopPropagation();
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleDeleteClick = async (chat, event) => {
    event.stopPropagation();
    console.log("Deleting chat:", chat);
    if (!chat._id) {
      console.error("Chat ID is undefined");
      return;
    }
    try {
      const response = await axios.delete(
        `${process.env.MERCURIAL_BACKEND_API}/delete-chart-chat-history/${chat._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedChats = chats.filter((c) => c._id !== chat._id);
        setChartChats(updatedChats);
      } else {
        console.error("Failed to delete chat");
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
    setDropdownIndex(null);
    onNewChatClick();
  };

  return (
    <div className="sidebar-content">
      <div className="sidebar-header">
        <img
          className="toggle-icon d-block d-md-none"
          src="../bars-sort.svg"
          alt="Toggle Sidebar"
          onClick={handleCloseSidebar}
        />
        <img
          className="edit-icon"
          src="../edit.svg"
          alt="Edit"
          onClick={onNewChatClick}
        />
      </div>
      <div className="spacer"></div>
      <hr className="divider" style={{ margin: "1.5rem 0 0 0" }} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 p-0">
            <div className="left-sidebar-title-container">
              <h6>Chart Chat history</h6>
            </div>
          </div>
          <div className="col-lg-12 p-0">
            <div className="chats-outer-container">
              {chats.map((chat, index) => (
                <div
                  key={index}
                  className="chats-single-container"
                  onClick={() => onChatItemClick(chat)}
                >
                  <div className="chats-text-container">
                    <p>
                      {chat.chartChatHistory &&
                        chat.chartChatHistory[0] &&
                        chat.chartChatHistory[0].content}
                    </p>
                  </div>
                  <div className="menu-container">
                    <img
                      className="toggle-icon"
                      src="../menu-dots.svg"
                      alt="Toggle Sidebar"
                      onClick={(event) => handleMenuClick(index, event)}
                    />
                    {dropdownIndex === index && (
                      <div className="dropdown-menu">
                        <div
                          className="dropdown-item"
                          onClick={(event) => handleDeleteClick(chat, event)}
                        >
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSideBarChart;
