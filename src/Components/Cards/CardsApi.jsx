import React, { useRef, useMemo, useCallback } from "react";
import { useAxios } from "../hooks/MainAxios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { API_KEY, BASE_URL, IMAGE_URL } from '../Constants';
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingSpinner from "../LoadingSpinner";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

const CardsApi = React.memo(({ title, category }) => {
  const swiperRef = useRef(null);

  // Memoize API URL to prevent unnecessary re-renders
  const apiUrl = useMemo(() => 
    `${BASE_URL}/trending/${category}/day?language=en-US&api_key=${API_KEY}`,
    [category]
  );
 
  const { data } = useAxios(apiUrl);

  // Limit results to first 10 items for better performance
  const processedData = useMemo(() => {
    return data?.results?.slice(0, 10).map((item, index) => ({
      id: item.id,
      media_type: item.media_type,
      poster_path: item.poster_path,
      title: item.title || item.name,
      rank: index + 1,
      formattedDate: item.release_date || "2025-03-17",
      rating: item.vote_average ?  item.vote_average.toFixed(1) : 'NAN',
    }));
  }, [data]);

  // Memoize Swiper breakpoints
  const breakpoints = useMemo(() => ({
    0: { slidesPerView: 2 }, 
    768: { slidesPerView: 3 }, 
    1024: { slidesPerView: 4 }, 
    1280: { slidesPerView: 5 }, 
  }), []);

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  if (!processedData?.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="title_cards mx-5 my-15 relative">
      <h2 className="text-3xl mb-5 font-bold">
        {title || "Popular On Netflix"}
      </h2>

      <div className="buttons">
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          >
          <ChevronLeftIcon  /> 
        </button>
        <button
          onClick={handleNext}
          aria-label="Next slide"
          
        >
          <ChevronRightIcon /> 



        </button>
      </div>

      <div className="card-list">
        <Swiper
          spaceBetween={15}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          watchSlidesProgress={true}
          lazy={{ loadPrevNext: true }}
          updateOnWindowResize={false}
          resizeObserver={true}
          observeParents={true}
          breakpoints={breakpoints}
        >
          {processedData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="card">
                <Link
                  to={`/${item.media_type}/${item.id}`}
                  aria-label={`View details for ${item.title}`}
                >
                  <div className="image-box relative h-64">
                    <LazyLoadImage
                      src={`${IMAGE_URL}/w500${item.poster_path}`}
                      alt={`Poster for ${item.title}`}
                      effect="opacity"
                      threshold={100}
                    />
                    <p className="absolute top-3 left-0 text-sm bg-black/70 py-1 px-3 rounded-r-full backdrop-blur-sm">
                      #{item.rank} Trending
                    </p>
                  </div>
                </Link>
                <div className="text-container">
                  <h3>
                    {item.title}
                  </h3>
                  <div className="spans">
                    <span>{item.formattedDate}</span>
                    <span>⭐ {item.rating}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
});


export default CardsApi;
