import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { jsPDF } from "jspdf";

function TreatmentDiaryComp() {
  const [showPopup, setShowPopup] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [entryText, setEntryText] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDate(new Date().toISOString().substring(0, 10));
  }, []);

  useEffect(() => {
    const storedToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    async function fetchEntries() {
      try {
        const response = await axios.get(
          `${process.env.MERCURIAL_BACKEND_API}/entries`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        setEntries(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    }

    fetchEntries();
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleEntryTextChange = (e) => {
    setEntryText(e.target.value);
  };

  const saveEntry = async () => {
    try {
      const storedToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (date && entryText) {
        const newEntry = { date, entryText };
        await axios.post(
          `${process.env.MERCURIAL_BACKEND_API}/entries`,
          newEntry,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        setEntries([...entries, newEntry]);
        setDate("");
        setEntryText("");
        closePopup();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    let yPos = 10;
    const spacing = 10;
    const margin = 20;
    const pageHeight = doc.internal.pageSize.getHeight();
    entries.forEach((entry, index) => {
      doc.setFontSize(12);
      doc.text(
        20,
        yPos,
        `Date: ${new Date(entry.date).toLocaleDateString("en-GB")}`
      );
      yPos += spacing;
      doc.text(20, yPos, `Entry: ${entry.entryText}`, { maxWidth: 170 });
      const textHeight = doc.getTextDimensions(entry.entryText, {
        maxWidth: 170,
      }).h;
      if (yPos + textHeight + spacing > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
      } else {
        yPos += textHeight + spacing;
      }
      if (yPos > pageHeight - margin - 40) {
        doc.addPage();
        yPos = margin;
      }
    });
    doc.save("entries.pdf");
  };

  return (
    <>
      <div className="treatment_main_container">
        <div className="treatmentDiary-main-container">
          <div>
            <Link href="/">
              <img
                src="/back-arrow.svg"
                alt="back-arrow"
                width={20}
                height={20}
                className="treatmentDiary-back-button"
              />
            </Link>
          </div>
          <div className="treatmentDiary_display_text_container">
            <h1>Treatment Diary</h1>
          </div>
          <div className="treatmentDiary_display_image_container">
            <img src="/export.svg" alt="back-arrow" onClick={downloadAsPDF} />
          </div>
        </div>

        <div className="treatmentDiary-body-main-container">
          {loading ? (
            <div
              className="spinner-container"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <ClipLoader color="#214493" loading={loading} size={50} />
            </div>
          ) : entries.length === 0 ? (
            <div
              style={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "0px",
                marginBottom: "0px",
                background: "#E6EFFF",
                borderRadius: "10px",
                padding: "36px",
              }}
            >
              <div>
                <h1 style={{ fontSize: "16px" }}>No Entries available</h1>
              </div>
            </div>
          ) : (
            entries.map((entry, index) => (
              <div
                className={`treatmentDiary-task-container ${
                  index !== 0 ? "with-margin" : ""
                }`}
                key={entry?._id}
              >
                <Link
                  href="/entry/[id]"
                  as={`/entry/${entry?._id}`}
                  className="link"
                >
                  <div className="treatmentDiary-task-text-container">
                    <p className="truncate-text">{entry?.entryText}</p>
                  </div>
                </Link>
                <div className="treatmentDiary-taskDate-text-container">
                  <p>
                    {new Date(entry?.date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}

          <div className="add-task-div" onClick={openPopup}>
            <img src="/plus.svg" alt="" />
          </div>
        </div>

        {showPopup && (
          <div className="popup-container">
            <div className="popup-content">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>New Entry</h2>
                <i
                  className="fa-solid fa-circle-xmark"
                  onClick={closePopup}
                ></i>
              </div>
              <input
                type="date"
                placeholder="Date"
                value={date}
                onChange={handleDateChange}
                className="popup-input-date"
              />
              <textarea
                placeholder="Enter your text here"
                value={entryText}
                onChange={handleEntryTextChange}
                className="popup-textarea-entry"
              ></textarea>
              <button onClick={saveEntry} className="popup-button-save">
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TreatmentDiaryComp;
