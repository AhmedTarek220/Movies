import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAxios } from "../hooks/MainAxios";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { API_KEY, BASE_URL, IMAGE_URL } from "../Constants";
function Search() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setSearchQuery(queryParams.get("q") || "");
  }, [location]);

  const { data, loading, error } = useAxios(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1`
  );
    const finalData = useMemo(() => data?.results || [] , [data])
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load data. Please try again later.
      </div>
    );
  }


  return (
    <div className="main">
      <h1>Search Results for: "{searchQuery}"</h1>
      {/*  Search Container  */}
      <div className="movie-container">
        {/*  Mapping */}
        {finalData.map((item) => (
          <div
            className="card"
            key={item.id}
          >
            {/*  Card  */}
            <Link to={`/movie/${item.id}`}>
              <div className="image-box">
                <LazyLoadImage
                  src={`${IMAGE_URL}/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  effect="opacity"

                />
              </div>
            </Link>
            {/*  Text  */}
            <div className="text-container">
              <h3>
                {item.title || item.name}
              </h3>
              <div className="spans">
                <span>
                  {item.release_date ? item.release_date : "2025-03-17"}
                </span>
                <span>
                ⭐{item.vote_average?.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
