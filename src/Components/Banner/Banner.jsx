import React, { useCallback, useMemo, useRef } from "react";
import { useAxios } from "../hooks/MainAxios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { API_KEY, BASE_URL, IMAGE_URL } from '../Constants';
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

const Banner = React.memo(() => {
  const { data } = useAxios(
    `${BASE_URL}/trending/all/week?language=en-US&api_key=${API_KEY}`
  );

  const swiperRef = useRef(null);

  const resultShow = useMemo(() => data?.results?.slice(0, 3) || [], [data]); 

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const getImageUrl = useCallback(
    (path) => `${IMAGE_URL}/original${path}`, 
    []
  );

  return (
    <section className="relative md:pb-20 banner">
      <Swiper
        slidesPerView={1}
        spaceBetween={10} 
        lazy={{ loadPrevNext: true }} 
        updateOnWindowResize={true}
        resizeObserver={true}
        observeParents={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        observer={true}
      >
        {resultShow.map((item) => {
          const imageUrl = getImageUrl(item.poster_path);
          return (
            <SwiperSlide key={item.id}>
              <div className="relative h-[100vh]">
                <LazyLoadImage
                  src={imageUrl}
                  alt={item.title || item.name}
                  effect="opacity"
                  loading="lazy"
                  className="object-cover"
                  threshold={100} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent p-4" />
                <div className="absolute bottom-20 md:left-7 z-10 max-w-md ml-4 md:ml-0">
                  <h1 className="font-bold text-2xl lg:text-4xl text-white">
                    {item.title || item.name}
                  </h1>
                  <span className="text-gray-300">
                    {item.overview?.slice(0, 100)}...
                  </span>
                  <div className="flex items-center gap-4 text-gray-300">
                    <p>Rating: {Number(item.vote_average).toFixed(1)}+</p>
                    <span>|</span>
                    <p>Views: {Number(item.popularity).toFixed(0)}</p>
                  </div>
                  <Link to={`/${item.media_type}/${item.id}`}>
                    <button className="bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-orange-500 transition-colors">
                      Play Now
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="buttons">
        <button
          onClick={handlePrev}
         
          aria-label="Previous slide"
        >
          {/* زر السهم الأيسر */}
          <ChevronLeftIcon  />
        </button>
        <button
          onClick={handleNext}
          
          aria-label="Next slide"
        >
          {/* زر السهم الأيمن */}
          <ChevronRightIcon />
        </button>
      </div>
    </section>
  );
});


export default Banner;
