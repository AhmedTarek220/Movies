import React, { useMemo } from "react";
import { useAxios } from "../hooks/MainAxios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { API_KEY, BASE_URL, IMAGE_URL } from '../Constants';
function Movies() {

  const { data , loading , error } = useAxios(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  const finalData = useMemo(() => data?.results || [] , [data])

  if (loading){
    return (
      <LoadingSpinner />
    )
  }
  if (error){
    return(
      <div className="text-center py-10 text-red-500">
      Failed to load data. Please try again later.
    </div>
    )
  }




  return (
    <div className="main">
      <h1>
        Popular Movies
      </h1>

      <div className="movie-container">
        {finalData.map((item) => (
          <div
            className="card"
            key={item.id}
          >
            <Link to={`/movie/${item.id}`} className="block">
              <div className="image-box">
                <LazyLoadImage
                  src={`${IMAGE_URL}/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  effect="opacity"

                />
              </div>
            </Link>

            <div className="text-container">
              <h3>
                {item.title || item.name}
              </h3>
              <div className="spans">
                <span> {item.release_date ? item.release_date : "2025"}</span>
                <span>
                  ⭐{item.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
