import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/layout";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import axios from "axios";

export async function getServerSideProps({ params }) {
  return {
    props: {
      entry: {
        id: params.id,
      },
    },
  };
}

export default function EntryPage({ entry }) {
  const router = useRouter();
  const [entryData, setEntryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [date, setDate] = useState("");
  const [entryText, setEntryText] = useState("");

  useEffect(() => {
    async function getEntryData() {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${process.env.MERCURIAL_BACKEND_API}/entries/${entry.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        setEntryData(response.data);
        setDate(response.data.date);
        setEntryText(response.data.entryText);
      } catch (error) {
        console.log(error);
      }
    }

    getEntryData();
  }, [entry.id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.MERCURIAL_BACKEND_API}/entries/${entry.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        router.push("/treatment-diary");
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleEdit = () => {
    setShowEditPopup(true);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleEntryTextChange = (e) => {
    setEntryText(e.target.value);
  };

  const saveEditedEntry = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatedEntry = { date, entryText };
      const response = await axios.put(
        `${process.env.MERCURIAL_BACKEND_API}/entries/${entry.id}`,
        updatedEntry,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setShowEditPopup(false);
        router.reload();
      }
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  if (!entryData) {
    return (
      <div
        className="spinner-container"
        style={{
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ClipLoader color="#214493" loading={loading} size={50} />
      </div>
    );
  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 treatment-diary-main-12">
            <div className="treatment_main_container">
              <div className="treatmentDiary-main-container">
                <div>
                  <Link href="/treatment-diary">
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
                  <img src="/export.svg" alt="export" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="treatment_main_container_1">
              <div className="single-entry-main-container">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h1>
                    {new Date(entryData.date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </h1>
                  <div>
                    <i
                      className="fa-solid fa-pen"
                      style={{ paddingTop: "2px", color: "#11245b", marginRight: "10px" }}
                      onClick={handleEdit}
                    ></i>
                    <i
                      className="fa-solid fa-trash"
                      style={{ paddingTop: "2px", color: "#11245b" }}
                      onClick={handleDelete}
                    ></i>
                  </div>
                </div>
                <p>{entryData.entryText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Edit Entry</h2>
              <i
                className="fa-solid fa-circle-xmark"
                onClick={() => setShowEditPopup(false)}
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
            <button onClick={saveEditedEntry} className="popup-button-save">
              Save
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
