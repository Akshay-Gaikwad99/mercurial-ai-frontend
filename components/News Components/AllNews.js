import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";

function AllNews() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomNews, setRandomNews] = useState([]);
  console.log({ randomNews });

  useEffect(() => {
    async function fetchNews() {
      try {
        const storedToken = localStorage.getItem("token");
        const response = await fetch(`${process.env.MERCURIAL_BACKEND_API}/news`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const data = await response.json();
        const newsWithId = data.map((news) => ({
          ...news,
          id: news._id,
        }));
  
        const sortedNews = newsWithId.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setRandomNews(shuffleArray(sortedNews.slice(1)));
        const latestNews = sortedNews.slice().reverse();
        setNewsData(latestNews);
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchNews();
  }, []);
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    appendDots: (dots) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "#ffa500",
          borderRadius: "50%",
          display: "inline-block",
          margin: "20px 5px 30px 5px",
        }}
      ></div>
    ),
  };

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader color={"#123abc"} loading={loading} size={50} />
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <Slider {...settings}>
              {randomNews.map((news, index) => (
                <Link key={news.id} href={`/news/${news.id}`} className="link">
                  <div>
                    <div className="carousel-image-wrapper">
                      <img src={news.image} alt={`slide-${index}`} />
                      <div className="gradient-overlay"></div>
                      <div className="text-overlay">{news.title}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ marginTop: "50px" }}>
        <div className="row">
          <div className="col-lg-12">
            <div>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  marginBottom: "20px",
                }}
              >
                All News
              </h3>
            </div>
            {newsData.map((news) => (
              <Link key={news.id} href={`/news/${news.id}`} className="link">
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <div
                    style={{
                      flex: "30%",
                      height: "130px",
                      background: "white",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      className="img-fluid"
                      src={news.image}
                      alt="image news"
                      style={{
                        maxWidth: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "relative",
                      flex: "4",
                      paddingLeft: "20px",
                      height: "130px",
                    }}
                  >
                    <div>
                      <h5
                        style={{
                          fontSize: "14px",
                          fontWeight: "bolder",
                          margin: "0",
                          color: "black",
                        }}
                      >
                        {news.title}
                      </h5>
                      <p
                        style={{
                          fontSize: "12px",
                          margin: "0",
                          position: "absolute",
                          bottom: "1px",
                          color: "orange",
                        }}
                      >
                        {new Date(news.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default AllNews;
