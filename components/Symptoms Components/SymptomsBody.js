import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Switch,
  IconButton,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const CenteredDateInput = styled(TextField)({
  "& .MuiInputBase-input": {
    textAlign: "center",
    padding: "10px",
  },
  "& .MuiInputBase-root": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    backgroundColor: "white",
    border: "none",
    outline: "none",
    color: "#214493",
    width: "150px",
  },
  "& .MuiInputBase-root input::-webkit-inner-spin-button, .MuiInputBase-root input::-webkit-calendar-picker-indicator":
    {
      display: "none",
    },
  "& .MuiInputBase-root input::-moz-placeholder": {
    textAlign: "center",
  },
});

function SymptomsBody() {
  const [active, setActive] = useState(true);
  const [painNumber, setPainNumber] = useState(0);
  const [expanded, setExpanded] = useState({
    location: false,
    description: false,
    relation: false,
    active: false,
    date: false,
  });

  const toggleExpand = (section) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [section]: !prevExpanded[section],
    }));
  };

  const toggleActive = () => {
    setActive((prevActive) => !prevActive);
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      active: !prevExpanded.active,
    }));
  };

  const incrementPainScale = () => {
    setPainNumber((prevNumber) => Math.min(prevNumber + 1, 10));
  };

  const decrementPainScale = () => {
    setPainNumber((prevNumber) => Math.max(prevNumber - 1, 0));
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ backgroundColor: "white", padding: "70px 0px 120px" }}
    >
      <Box textAlign="center" marginTop={2}>
        <img
          src="./noun-human-body-481935.png"
          alt="Human Body"
          style={{ maxWidth: "80%" }}
        />
        <Typography
          variant="h5"
          component="h2"
          sx={{
            color: "#214493",
            fontSize: "1.2rem",
          }}
          gutterBottom
        >
          Symptoms
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{
          padding: 2,
          backgroundColor: "white",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          borderRadius: 1,
          boxShadow: "none",
          paddingRight: "0px",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            onClick={() => toggleExpand("location")}
            sx={{
              borderBottom: "1px solid rgba(211, 211, 211, 0.49)",
              paddingBottom: "10px",
              paddingTop: "10px",
              paddingRight: "16px",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#214493",
                  }}
                >
                  Location
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ex. Left Arm
                </Typography>
              </Box>
              <IconButton>
                {expanded.location ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>
            {expanded.location && (
              <Box marginTop={1}>
                <Typography variant="body2">
                  Additional Location Information
                </Typography>
              </Box>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            onClick={() => toggleExpand("description")}
            sx={{
              borderBottom: "1px solid rgba(211, 211, 211, 0.49)",
              paddingBottom: "10px",
              paddingTop: "10px",
              paddingRight: "16px",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#214493",
                  }}
                >
                  Description
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ex. Rash
                </Typography>
              </Box>
              <IconButton>
                {expanded.description ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>
            {expanded.description && (
              <Box marginTop={1}>
                <Typography variant="body2">
                  Additional Description Information
                </Typography>
              </Box>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            onClick={() => toggleExpand("relation")}
            sx={{
              borderBottom: "1px solid rgba(211, 211, 211, 0.49)",
              paddingBottom: "10px",
              paddingTop: "10px",
              paddingRight: "16px",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#214493",
                  }}
                >
                  Relation
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ex. Radiation
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginRight: 1 }}
                >
                  Side Effect
                </Typography>
                <IconButton>
                  {expanded.relation ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
            </Box>
            {expanded.relation && (
              <Box marginTop={1}>
                <Typography variant="body2">
                  Additional Relation Information
                </Typography>
              </Box>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              borderBottom: "1px solid rgba(211, 211, 211, 0.49)",
              paddingBottom: "10px",
              paddingTop: "10px",
              paddingRight: "16px",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#214493",
                }}
              >
                Active
              </Typography>
              <Switch
                checked={active}
                onChange={toggleActive}
                sx={{
                  color: "#214493",
                }}
              />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            onClick={() => toggleExpand("date")}
            sx={{
              borderBottom: "1px solid rgba(211, 211, 211, 0.49)",
              paddingBottom: "10px",
              paddingRight: "16px",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#214493",
                }}
              >
                Date
              </Typography>
              <CenteredDateInput
                type="date"
                defaultValue="2024-06-22"
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                }}
                size="small"
              />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            onClick={() => toggleExpand("painScale")}
            sx={{
              borderBottom: "1px solid rgba(211, 211, 211, 0.49)",
              paddingBottom: "20px",
              paddingRight: "16px",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#214493",
                  }}
                >
                  Pain Scale
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {painNumber} - 10
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Button
                  variant="contained"
                  onClick={decrementPainScale}
                  sx={{
                    backgroundColor: "#214493",
                    color: "white",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                >
                  -
                </Button>
                <Button
                  variant="contained"
                  onClick={incrementPainScale}
                  sx={{
                    backgroundColor: "#214493",
                    color: "white",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }}
                >
                  +
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default SymptomsBody;
