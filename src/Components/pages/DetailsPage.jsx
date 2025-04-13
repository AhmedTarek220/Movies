import React, { useCallback, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAxios } from "../hooks/MainAxios";
import Divider from "../../Components/Divider/Divider";
import { Swiper, SwiperSlide } from "swiper/react";


import { API_KEY, BASE_URL, IMAGE_URL } from "../Constants";
import LoadingSpinner from "../LoadingSpinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

const DetailsPage = React.memo(() => {

  const { media_type, id } = useParams();
  const swiperRef = useRef(null);

  const { data, loading, error } = useAxios(
    `${BASE_URL}/${media_type}/${id}?api_key=${API_KEY}&append_to_response=credits,similar`
  );
  { /* Similar Moive Data */}
  const similarMovieData = useMemo(() => data?.similar.results || [] , [data])
  {
    /*   Cast Data   Director & Writer   */
  }
  const castData = useMemo(
    () => data?.credits?.cast.slice(0, 20) || [],
    [data?.credits?.cast]
  );

  const director = useMemo(
    () => data?.credits?.crew?.find((member) => member.job === "Director"),
    [data?.credits?.crew]
  );

  const writer = useMemo(
    () => data?.credits?.crew?.find((member) => member.job === "Writer"),
    [data?.credits?.crew]
  );

  {
    /*   Time Duration   */
  }
  const durationInMinutes = Number(data?.runtime);
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);
  const breakpoints = useMemo(() => ({
    0: { slidesPerView: 2 },
    1024: { slidesPerView: 4 },
    1280: { slidesPerView: 5 },
  }), []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="media-details pt-5 lg:pt-0 w-full">
      {/*   Banner Section   */}
      <div className="banner w-full h-[280px] relative hidden lg:block">
        <LazyLoadImage
          src={`${IMAGE_URL}/original${data.poster_path}`}
          alt={data.title || data.name}
          className="object-cover w-full h-full"

        />
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>
      {/*   Container Section  Image && Text   */}
      <div className="px-3 py-16 flex lg:gap-15 gap-5 flex-col justify-center md:flex-row ">
        <div className="image lg:-mt-28 lg:mx-5 z-1 text-center flex flex-col">
          <img
            src={`${IMAGE_URL}/original${data.poster_path}`}
            alt={data.title || data.name}
            className="object-cover max-w-[500px] h-[350px] rounded"
          />
          <button
            className="px-4 py-2 bg-white text-black cursor-pointer max-w-[500px]  rounded mt-3 "
            onClick={() => handlePlayVideo(data)}
          >
            Play Now
          </button>
        </div>

        <div className="text flex flex-col ">
          <h2 className="text-2xl text-white font-bold">
            {data.title || data.name}
          </h2>
          <p className="text-neutral-400">{data.tagline}</p>
          <Divider />
          <div>
            <p>Rating: {Number(data.vote_average).toFixed(1)}</p>
            <p>View: {Number(data.vote_count)}</p>
            <p>
              Duration: {hours}h {minutes}m
            </p>
          </div>
          <Divider />
          <div className="w-[100%]">
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p className="break-words">{data?.overview}</p>
            <Divider />

            <div className="flex items-center gap-3 my-3 text-center">
              <p>Staus : {data?.status}</p>
              <span>|</span>
              <p>Release Date : {data.release_date}</p>
              <span>|</span>
              <p>Revenue : {Number(data?.revenue)}</p>
            </div>
            <Divider />
          </div>

          <div>
            <p>
              <span className="text-white">Director</span> :{" "}
              {director ? director.name : "N/A"}
            </p>
            <Divider />
            <p>
              <span className="text-white">Writer : </span>
              {writer ? writer.name : "N/A"}
            </p>
          </div>
          <Divider />
          <h2 className="text-lg font-bold">Cast:</h2>
          <div className="cast-data grid grid-cols-[repeat(auto-fill,_minmax(80px,_1fr))] gap-5">
            {castData.map((member) => {
              return (
                <div className="card" key={member.id}>
                  <div className="img">
                    <img
                      src={`https://image.tmdb.org/t/p/original${member.profile_path}`}
                      alt=""
                      className="rounded-full "
                    />
                    <h3>{member?.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/*   Similar Movie Section   */}
      <div className="main ex relative">
        <h2 className=" text-2xl md:text-4xl md:mb-10 mb-5 font-bold">Similar Movies To Show</h2>
        <div>
          <Swiper
       spaceBetween={15}
       onSwiper={(swiper) => (swiperRef.current = swiper)}
       watchSlidesProgress={true}
       lazy={{ loadPrevNext: true }}
       preloadImages={false}
       updateOnWindowResize={false}
       resizeObserver={true}
       observeParents={true}
       breakpoints={breakpoints}
          >
            {similarMovieData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="card">
                  <Link to={`/${media_type}/${item.id}`}>
                    <div className="image-box h-64">
                      <LazyLoadImage
                        src={`${IMAGE_URL}/original${item.poster_path}`}
                        alt={item.title || item.name}
                        effect="opacity"
                        threshold={100}
                        
                      />
                    </div>
                  </Link>
                  <div className="text-container">
                    <h3>
                      {item.title || item.name}
                    </h3>
                    <div className="spans">
                      <span>
                        {item.release_date ? item.release_date : "2025-03-17"}
                      </span>
                      <span>
                        Rating: {item.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="buttons">
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              
            >
              <ChevronLeftIcon />



            </button>
            <button
              onClick={handleNext}
              aria-label="Next slide"
             >

              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
})

export default DetailsPage;
