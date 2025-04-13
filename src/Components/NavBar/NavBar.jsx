import debounce from "lodash.debounce";
import React, { useState, useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();


  const handleSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        navigate(`/search?q=${query}`); 
      } else {
        navigate(`/`); 
      }
    }, 1000), 
    [navigate]
  );

  // عند تغيير قيمة البحث، نقوم بتحديث النص
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    handleSearch(query); // تنفيذ البحث مع التأخير
  };

  const navLinkClass = useCallback(
    (isActive) => {
      return `cursor-pointer text-xl text-neutral-300 hover:text-neutral-100 ${
        isActive ? "text-white" : ""
      }`;
    },
    []
  );

  return (
    <>
      {/* Mobile Style NavBar */}
      <section className="mobileStyle fixed bottom-0 w-full md:hidden bg-neutral-800 py-4 flex z-10">
        <ul className="flex gap-5 items-center justify-around w-full">
          <li className="flex flex-col items-center">
            <i className="fas fa-home"></i>
            <NavLink to={"/"} className={({ isActive }) => navLinkClass(isActive)}>
              Home
            </NavLink>
          </li>
          <li className="flex flex-col items-center">
            <i className="fa-solid fa-tv"></i>
            <NavLink to={"/TV Shows"} className={({ isActive }) => navLinkClass(isActive)}>
              TV Shows
            </NavLink>
          </li>
          <li className="flex flex-col items-center">
            <i className="fa-solid fa-film"></i>
            <NavLink to={"/Movies"} className={({ isActive }) => navLinkClass(isActive)}>
              Movies
            </NavLink>
          </li>
        </ul>
      </section>

      {/* Screen Style NavBar */}
      <header className="nav-bar fixed top-0 w-full flex p-3 justify-between lg:p-4 z-[1000]">
        <div className="logo flex gap-8 z-10 items-center">
          <Link to="/">
            <h1 className="text-4xl">Movies</h1>
          </Link>

          {/* NavBar */}
          <ul className="gap-10 hidden md:flex">
            <NavLink to={"/TV Shows"} className={({ isActive }) => navLinkClass(isActive)}>
              TV Shows
            </NavLink>
            <NavLink to={"/Movies"} className={({ isActive }) => navLinkClass(isActive)}>
              Movies
            </NavLink>
          </ul>
        </div>

        {/* Search Form */}
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="search"
            placeholder="Search here..."
            className="px-4 py-1 bg-transparent outline-none border-none text-lg md:w-full w-40"
            onChange={handleInputChange}
            value={searchInput}
          />
        </form>
      </header>
    </>
  );
}

export default React.memo(NavBar);
