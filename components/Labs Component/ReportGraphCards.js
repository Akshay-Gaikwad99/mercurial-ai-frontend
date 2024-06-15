import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ReportGraphCards() {
  const data1 = [
    { name: "Jan", Hemoglobin: 8 },
    { name: "Feb", Hemoglobin: 4 },
    { name: "Mar", Hemoglobin: 6 },
    { name: "Apr", Hemoglobin: 8 },
    { name: "May", Hemoglobin: 4 },
    { name: "June", Hemoglobin: 12 },
    { name: "July", Hemoglobin: 6 },
    { name: "Aug", Hemoglobin: 8 },
    { name: "Sep", Hemoglobin: 2 },
    { name: "Oct", Hemoglobin: 6 },
    { name: "Nov", Hemoglobin: 10 },
    { name: "Dec", Hemoglobin: 8 },
  ];

  const data2 = [
    { name: "Jan", Hematocrit: 30 },
    { name: "Feb", Hematocrit: 50 },
    { name: "Mar", Hematocrit: 20 },
    { name: "Apr", Hematocrit: 70 },
    { name: "May", Hematocrit: 40 },
    { name: "Jun", Hematocrit: 80 },
    { name: "Jul", Hematocrit: 20 },
    { name: "Aug", Hematocrit: 60 },
    { name: "Sep", Hematocrit: 30 },
    { name: "Oct", Hematocrit: 90 },
    { name: "Nov", Hematocrit: 40 },
    { name: "Dec", Hematocrit: 50 },
  ];

  const data3 = [
    { name: "Jan", "White Blood Cell Count": 3000 },
    { name: "Feb", "White Blood Cell Count": 12000 },
    { name: "Mar", "White Blood Cell Count": 8000 },
    { name: "Apr", "White Blood Cell Count": 10000 },
    { name: "May", "White Blood Cell Count": 3000 },
    { name: "June", "White Blood Cell Count": 8000 },
    { name: "July", "White Blood Cell Count": 6000 },
    { name: "Aug", "White Blood Cell Count": 12000 },
    { name: "Sep", "White Blood Cell Count": 8000 },
    { name: "Oct", "White Blood Cell Count": 6000 },
    { name: "Nov", "White Blood Cell Count": 10000 },
    { name: "Dec", "White Blood Cell Count": 6000 },
  ];

  return (
    <>
      <div className="report-card-main-section">
        <div className="report-card-main-container">
          <div className="report-card-inner-container shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data1} backgroundColor="white">
                <CartesianGrid stroke="none" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend verticalAlign="bottom" />
                <Line type="monotone" dataKey="Hemoglobin" stroke="#FF5E5E" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="report-card-main-container">
          <div className="report-card-inner-container shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data2} backgroundColor="white">
                <CartesianGrid stroke="none" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend verticalAlign="bottom" />
                <Line type="monotone" dataKey="Hematocrit" stroke="#8636EE" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="report-card-main-container">
          <div className="report-card-inner-container report-container-bottom shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data3} backgroundColor="white">
                <CartesianGrid stroke="none" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend verticalAlign="bottom" />
                <Line
                  type="monotone"
                  dataKey="White Blood Cell Count"
                  stroke="#ffc658"
                  position="top"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportGraphCards;
