import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

function MediPlanner() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medicineName, setMedicineName] = useState("");
  const [medicineDescription, setMedicineDescription] = useState("");
  const [medicineTime, setMedicineTime] = useState("");
  const [showAddMedication, setShowAddMedication] = useState(false);
  const [medicationData, setMedicationData] = useState([]);

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(new Date(selectedYear, e.target.value - 1));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleDateSelect = (date) => {
    const newSelectedDate = new Date(selectedMonth);
    newSelectedDate.setDate(date);

    setSelectedDate(newSelectedDate);
    setMedicineName("");
    setMedicineDescription("");
    setMedicineTime("");
    setShowAddMedication(false);
    setMedicationData([]);
  };

  const handleAddMedication = () => {
    if (!medicineName || !medicineDescription || !medicineTime) {
      console.error("Please fill in all fields");
      return;
    }

    const formattedTime = medicineTime.format("hh:mm A");
    const newMedicationData = {
      medicineName,
      medicineDescription,
      time: formattedTime,
    };

    setMedicationData([...medicationData, newMedicationData]);
    setMedicineName("");
    setMedicineDescription("");
    setMedicineTime("");
    setShowAddMedication(false);
  };

  const currentYear = new Date().getFullYear();
  const yearsToDisplay = 5;

  return (
    <>
      <section className="#FBE4EE">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 main-12">
              <div
                className="mediPlanner-main-container"
                style={{ marginTop: "70px" }}
              >
                <div className="mediPlanner-date-main-container">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <div>
                      <select
                        value={selectedMonth.getMonth() + 1}
                        onChange={handleMonthChange}
                      >
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {new Date(0, i).toLocaleString("default", {
                              month: "long",
                            })}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select value={selectedYear} onChange={handleYearChange}>
                        {Array.from({ length: yearsToDisplay }, (_, i) => {
                          const year = currentYear - i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="dates-section">
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((date) => {
                      const currentDate = new Date(selectedMonth);
                      currentDate.setDate(date);
                      currentDate.setFullYear(selectedYear);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const isSelectedDate =
                        currentDate.getTime() === today.getTime() ||
                        (currentDate.getDate() === selectedDate.getDate() &&
                          currentDate.getMonth() === selectedDate.getMonth() &&
                          currentDate.getFullYear() ===
                            selectedDate.getFullYear());
                      return (
                        <div
                          key={date}
                          onClick={() => {
                            handleDateSelect(date);
                            setSelectedDate(currentDate);
                          }}
                          className={
                            isSelectedDate
                              ? "date-showing-container selected"
                              : "date-showing-container"
                          }
                        >
                          {date}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="todo-main-container">
                  {selectedDate && (
                    <div>
                      {medicationData.length > 0 ? (
                        medicationData.map((medication, index) => (
                          <div
                            key={index}
                            className="todo-inner-main-container-list"
                          >
                            <div className="todo-inner-container-list">
                              <div>
                                <h3>{medication.medicineName}</h3>
                                <h5>{medication.medicineDescription}</h5>
                                <p>{medication.time}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-container-medi">
                          <h4 className="no-med-text">
                            No medication found for this date
                          </h4>
                        </div>
                      )}
                      {showAddMedication && (
                        <div className="mediPlaner-input-main-container">
                          <div>
                            <input
                              type="text"
                              value={medicineName}
                              onChange={(e) => setMedicineName(e.target.value)}
                              placeholder="Medicine Name"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={medicineDescription}
                              onChange={(e) =>
                                setMedicineDescription(e.target.value)
                              }
                              placeholder="Medicine Description"
                            />
                          </div>
                          <div>
                            <Datetime
                              value={medicineTime}
                              onChange={(value) => setMedicineTime(value)}
                              input={true}
                              dateFormat={false}
                              timeFormat="hh:mm A"
                              closeOnSelect={true}
                              inputProps={{ placeholder: "Time" }}
                            />
                          </div>
                          <div>
                            <button onClick={handleAddMedication}>Save</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed-add-medication-button">
          <button onClick={() => setShowAddMedication(!showAddMedication)}>
            +
          </button>
        </div>
      </section>
    </>
  );
}

export default MediPlanner;
