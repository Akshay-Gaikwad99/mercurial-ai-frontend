import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "./ChangingProgressProvider";

const generateProgressArray = (start, end) => {
  const progressArray = [];
  for (let i = start; i <= end; i++) {
    progressArray.push(i);
  }
  return progressArray;
};

const smootherProgressArray = generateProgressArray(0, 100);

const CircularLoader = () => (
  <div style={{ width: "75px", height: "75px", padding: "5px 20px 20px 20px" }}>
    <ChangingProgressProvider values={smootherProgressArray}>
      {(currentValue) => (
        <CircularProgressbar
          value={currentValue}
          text={`${currentValue}`}
          styles={buildStyles({
            pathTransitionDuration: 1,
            textSize: "32px",
          })}
        />
      )}
    </ChangingProgressProvider>
  </div>
);

export default CircularLoader;
