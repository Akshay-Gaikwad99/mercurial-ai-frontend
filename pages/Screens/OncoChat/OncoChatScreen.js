import React, { useState, useEffect } from "react";
import LeftSideBarResearch from "./chatScreen/ResearchComponents/LeftSideBarResearch";
import InputFooterChart from "./chatScreen/ChartComponents/InputFooterChart/InputFooterChart";
import InputFooterResearch from "./chatScreen/ResearchComponents/InputFooterResearch";
import { Tabs, Tab } from "@mui/material";
import CircularLoader from "./chatScreen/Loader/CircularLoader";
import ResearchBody from "./chatScreen/ResearchComponents/ResearchBody";
import ChartBody from "./chatScreen/ChartComponents/InputFooterChart/ChartBody";
import LeftSideBarChart from "./chatScreen/ChartComponents/InputFooterChart/LeftSideBarChart";
import { useRouter } from "next/router";

function MainChatScreen() {
  const router = useRouter();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [researchChats, setResearchChats] = useState([]);
  const [chartChats, setChartChats] = useState([]);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [isLoadingResearch, setIsLoadingResearch] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChartChat, setSelectedChartChat] = useState(null);
  const [researchChatId, setResearchChatId] = useState("");
  const [chartChatId, setChartChatId] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [chartProgress, setChartProgress] = useState(0);
  const [researchProgress, setResearchProgress] = useState(0);
  const [token, setToken] = useState(null);
  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
      setApiUrl(process.env.MERCURIAL_BACKEND_API);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchResearchChats();
      fetchChartChats();
    }
  }, [token]);

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSidebar = () => {
    router.push("/");
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const fetchChartChats = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `${apiUrl}/get-chart-chat-history/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setChartChats(data);
      return data;
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const handleSendMessageChart = async (message) => {
    const userId = localStorage.getItem("userId");
    const newChartChatHistory = [
      ...(selectedChartChat?.chartChatHistory || []),
      { role: "user", content: message },
    ];

    setSelectedChartChat({
      ...selectedChartChat,
      chartChatHistory: newChartChatHistory,
    });

    setIsLoadingChart(true);
    setChartProgress(0);

    try {
      const response = await fetch(
        `${apiUrl}/chat/${userId}?messages=${message}&chatId=${
          chartChatId ? chartChatId : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setIsLoadingChart(false);

      if (data) {
        setChartChatId(data.chatId);

        const updatedChatHistory = [
          ...newChartChatHistory,
          { role: "assistant", content: data.response },
        ];

        setSelectedChartChat({
          ...selectedChartChat,
          chartChatHistory: updatedChatHistory,
        });

        const updatedChats = await fetchChartChats();
        const updatedSelectedChat = updatedChats.find(
          (chat) => chat._id === data.chatId
        );
        setSelectedChartChat(updatedSelectedChat);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoadingChart(false);
    }
  };

  const handleChatItemClickChart = (chat) => {
    setSelectedChartChat(chat);
    setChartChatId(chat._id);
    setIsSidebarVisible(false);
  };

  const handleNewChatClickChart = () => {
    setSelectedChartChat(null);
    setChartChatId("");
    setIsSidebarVisible(false);
  };

  const fetchResearchChats = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${apiUrl}/get-research-chat-history/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResearchChats(data);
      return data;
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };
  const handleSendMessageResearch = async (message) => {
    const newResearchChatHistory = [
      ...(selectedChat?.researchChatHistory || []),
      { role: "user", content: message },
    ];

    setSelectedChat({
      ...selectedChat,
      researchChatHistory: newResearchChatHistory,
    });

    setIsLoadingResearch(true);
    setResearchProgress(0);

    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const response = await fetch(`${apiUrl}/api_completion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chatId: researchChatId || "",
          history: [{ role: "user", content: message }],
        }),
      });

      const data = await response.json();
      setIsLoadingResearch(false);

      if (data) {
        setResearchChatId(data.chatId);

        const updatedChatHistory = [
          ...newResearchChatHistory,
          { role: "assistant", content: data.message },
        ];

        setSelectedChat({
          ...selectedChat,
          researchChatHistory: updatedChatHistory,
        });
        const updatedChats = await fetchResearchChats();
        const updatedSelectedChat = updatedChats.find(
          (chat) => chat._id === data.chatId
        );
        setSelectedChat(updatedSelectedChat);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoadingResearch(false);
    }
  };

  const handleChatItemClick = (chat) => {
    setSelectedChat(chat);
    setResearchChatId(chat._id);
    setIsSidebarVisible(false);
  };

  const handleNewChatClick = () => {
    setSelectedChat(null);
    setResearchChatId("");
    setIsSidebarVisible(false);
  };

  const handleMessageClick = (messageContent) => {
    const cleanedMessageContent = messageContent.replace(/^\d+\.\s*/, "");
    handleSendMessageResearch(cleanedMessageContent);
    setMessages("");
  };

  return (
    <div className="app-container">
      <div className="header-container d-md-none">
        <button
          className="btn sidebar-toggle-button"
          onClick={handleSidebarToggle}
        >
          <img
            className="toggle-icon-1"
            src="../bars-sort.svg"
            alt="Toggle Sidebar"
          />
        </button>
        <div className="header-container-title">
          <h1>Onco Chat</h1>
        </div>
        <div>
          <img
            style={{ paddingRight: "10px" }}
            className="toggle-icon-1"
            src="../back-arrow.svg"
            alt="Toggle Sidebar"
            onClick={handleSidebar}
          />
        </div>
      </div>

      <div className="tabs-pannel-container">
        <Tabs
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#EB9337 !important",
            },
            "& .Mui-selected": {
              color: "#EB9337 !important",
            },
            justifyContent: "flex-start",
          }}
          value={activeTab}
          onChange={handleTabChange}
          aria-label="Onco Chat Tabs"
          centered
          className="custom-tabs"
        >
          <Tab label="Chart" />
          <Tab label="Research" />
        </Tabs>
      </div>

      {activeTab === 0 ? (
        <ChartBody
          selectedChat={selectedChartChat}
          isLoading={isLoadingChart}
        />
      ) : (
        <ResearchBody
          selectedChat={selectedChat}
          onMessageClick={handleMessageClick}
          isLoading={isLoadingResearch}
        />
      )}

      <div
        className={`sidebar-container ${
          isSidebarVisible ? "visible" : ""
        } d-md-block`}
      >
        {activeTab == 0 ? (
          <LeftSideBarChart
            handleCloseSidebar={handleSidebarToggle}
            activeTab={activeTab}
            chats={chartChats}
            setChartChats={setChartChats}
            onChatItemClick={handleChatItemClickChart}
            onNewChatClick={handleNewChatClickChart}
            token={token}
          />
        ) : (
          <LeftSideBarResearch
            handleCloseSidebar={handleSidebarToggle}
            activeTab={activeTab}
            chats={researchChats}
            setResearchChats={setResearchChats}
            onChatItemClick={handleChatItemClick}
            onNewChatClick={handleNewChatClick}
            token={token}
          />
        )}
      </div>

      {isSidebarVisible && (
        <div
          className="overlay-container d-md-none"
          onClick={handleSidebarToggle}
        ></div>
      )}

      <div className="content-container">
        {activeTab === 0 ? (
          <InputFooterChart
            onSendMessage={handleSendMessageChart}
            messageContent={messageContent}
            messages={messages}
            setMessages={setMessages}
          />
        ) : (
          <InputFooterResearch
            onSendMessage={handleSendMessageResearch}
            messageContent={messageContent}
            messages={messages}
            setMessages={setMessages}
          />
        )}
        {activeTab === 0 && isLoadingChart && (
          <div
            style={{
              marginBottom: "100px",
              visibility: isLoadingChart ? "block" : "none",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                className="OncoChatBody-inner-colored-avatar"
                style={{ marginLeft: "16px" }}
              >
                <i className="fa-solid fa-robot"></i>
              </div>
              <CircularLoader
                progress={chartProgress}
                setProgress={setChartProgress}
              />
            </div>
          </div>
        )}
        {activeTab === 1 && isLoadingResearch && (
          <div
            style={{
              marginBottom: "100px",
              visibility: isLoadingResearch ? "block" : "none",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                className="OncoChatBody-inner-colored-avatar"
                style={{ marginLeft: "16px" }}
              >
                <i className="fa-solid fa-robot"></i>
              </div>
              <CircularLoader
                progress={researchProgress}
                setProgress={setResearchProgress}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainChatScreen;
