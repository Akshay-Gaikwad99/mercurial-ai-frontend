import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AllNews from "./AllNews";
import LatestNews from "./LatestNews";

function NewsToggleBar() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function NewsTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`news-tabpanel-${index}`}
        aria-labelledby={`news-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div>
            <Typography>{children}</Typography>
          </div>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `news-tab-${index}`,
      "aria-controls": `news-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ width: "100%" , padding:'0px'}}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="news tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#EB9337 !important",
            },
            "& .Mui-selected": {
              color: "#EB9337 !important",
            },
          }}
        >
          <Tab label="Latest News" {...a11yProps(1)} />
          <Tab label="All News" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <NewsTabPanel value={value} index={0}>
        <LatestNews />
      </NewsTabPanel>
      <NewsTabPanel value={value} index={1} sx={{padding:'24px 0px'}}>
        <AllNews />
      </NewsTabPanel>
    </Box>
  );
}

export default NewsToggleBar;
