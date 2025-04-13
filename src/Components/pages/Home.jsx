import React, { Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner";

const CardsApiTrendingShow = React.lazy(() => import("../Cards/CardsApi"));
const CardsApiTrendingMovies = React.lazy(() => import("../Cards/CardsApi"));
const CardsApiTrendingTV = React.lazy(() => import("../Cards/CardsApi"));
const Banner = React.lazy(() => import("../Banner/Banner"));

function Home() {
  return (
    <div className="home flex gap-20 flex-col pb-20">
      <Suspense fallback={<LoadingSpinner />}>
        <Banner />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <CardsApiTrendingShow title={"Trending Show"} category={"all"} />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <CardsApiTrendingMovies title={"Trending Movies"} category={"movie"} />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <CardsApiTrendingTV title={"Trending TV"} category={"tv"} />
      </Suspense>
    </div>
  );
}

export default Home;
