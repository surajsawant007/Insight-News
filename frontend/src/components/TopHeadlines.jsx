import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EverythingCard from "./EveryThingCard";
import Loader from "./Loader";
import defaultImage from "../assets/news.jpeg";

function TopHeadlines() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  let pageSize = 6;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const categoryParam = params.category ? `&category=${params.category}` : "";
    fetch(
      `http://localhost:3000/top-headlines?language=en${categoryParam}&page=${page}&pageSize=${pageSize}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((json) => {
        if (json.success) {
          setTotalResults(json.data.totalResults);
          setData(json.data.articles);
        } else {
          setError(json.message || "An error occurred");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(
          error.message || "Failed to fetch news. Please try again later."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, params.category]);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 ">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => (
              <EverythingCard
                title={element.title}
                description={element.description}
                imgUrl={defaultImage}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
                key={index}
              />
            ))
          ) : (
            <p>No articles found for this category or criteria.</p>
          )
        ) : (
          <Loader />
        )}
      </div>
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn"
            onClick={handlePrev}
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            className="pagination-btn"
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default TopHeadlines;
