import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/layout";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import axios from "axios";

export async function getServerSideProps({ params }) {
  return {
    props: {
      news: {
        id: params.id,
      },
    },
  };
}

export default function SingleNews({ news }) {
  const router = useRouter();
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNewsData() {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${process.env.MERCURIAL_BACKEND_API}/news/${news.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        setNewsData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getNewsData();
  }, [news.id]);

  if (loading) {
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

  if (!newsData) {
    return <div>Error: News not found!</div>;
  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 treatment-diary-main-12">
            <div className="treatment_main_container">
              <div className="treatmentDiary-main-container">
                <div>
                  <Link href="/news">
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
                  <h1 style={{ fontSize: "14px" }}>
                    {newsData.title.split(" ").slice(0, 6).join(" ")}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div>
              <div style={{ marginTop: "100px" }}>
                <img
                  style={{ borderRadius: "10px", width: "100%" }}
                  src={newsData.image}
                  alt={newsData.title}
                  className="img-fluid"
                />
              </div>
              <div>
                <h1
                  style={{
                    marginTop: "30px",
                    fontSize: "22px",
                    fontWeight: "500",
                    marginBottom: "0px",
                  }}
                >
                  {newsData.title}
                </h1>
                {newsData.timestamp && (
                  <p
                    style={{
                      fontSize: "14px",
                      marginTop: "0px",
                      marginBottom: "30px",
                      color: "orange",
                    }}
                  >
                    {new Date(newsData.timestamp).toLocaleString()}
                  </p>
                )}
                <p style={{ fontSize: "18px" }}>{newsData.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
