import React, { Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
const NavBar = React.lazy(() => import("./Components/NavBar/NavBar"));
const Footer = React.lazy(() => import("./Components/Footer/Footer"))
import LoadingSpinner from "./Components/LoadingSpinner";

const Home = React.lazy(() => import("./Components/pages/Home"));
const TvShows = React.lazy(() => import("./Components/pages/TvShows"));
const Movies = React.lazy(() => import("./Components/pages/Movies"));
const Search = React.lazy(() => import("./Components/pages/Search"));
const DetailsPage = React.lazy(() => import("./Components/pages/DetailsPage"));



function App() {
  return (
    <>

      <Suspense
        fallback={<LoadingSpinner />}
      >
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tv shows" element={<TvShows />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/search" element={<Search />} />
          <Route path="/:media_type/:id" element={<DetailsPage />} />
        </Routes>
      <Footer />
      </Suspense>

    </>
  );
}

export default App;
