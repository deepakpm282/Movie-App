import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Large_Card from "./LargeCard";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import MovieDetailsCard from "./movieDetailsCard";

// Assuming MovieType is your movie object type
type MovieType = {
  _id: string
  title: string;
  year: number;
  genre: string;
  banner_image: string;
};

const Header = () => {
  const { data: allMovies } = useQuery(['fetchMovies'], apiClient.fetchMovies);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<MovieType[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState<MovieType[]>();

  useEffect(() => {
    if (searchInput && allMovies) {
      const filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredMovies(filtered);
      setShowDropdown(true);
    } else {
      setFilteredMovies([]);
      setShowDropdown(false);
    }
  }, [searchInput, allMovies]);

  const fetchSelectedMovieDetails = async (title: string) => {
    try {
      const movieDetails = await apiClient.fetchMovieDetails(title);
      setSelectedMovieDetails(movieDetails);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 10);
  };

  const handleClick = () => {
    window.location.reload();
  }

  return (
    <div className="bg-white py-6">
      <div className="container mx-auto flex justify-between items-center relative">
        <div className="flex items-center space-x-4">
          <span className="text-2xl text-black font-bold tracking-tight">
            <button onClick={handleClick}>GET MOVIES</button>
          </span>
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies and series"
              className="px-5 border rounded"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={handleBlur}
            />
            {showDropdown && searchInput && filteredMovies.length > 0 && (
              <ul className="absolute bg-white border rounded mt-1 w-full z-10">
                {filteredMovies.map(movie => (
                  <li
                    key={movie._id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onMouseDown={() => {
                      setSearchInput(movie.title);
                      fetchSelectedMovieDetails(movie.title);
                    }}
                  >
                    {movie.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <span className="flex space-x-2 bg-pink-700 mt-1 p-1 border rounded">
          <Link
            to="/components/FavouritesPage"
            className="flex items-center text-white px-3 font-bold"
          >
            My Favorites
          </Link>
        </span>
      </div>
      {selectedMovieDetails ? (
        <MovieDetailsCard movieDetails={selectedMovieDetails}/>
      ) : (
        <Large_Card movies={allMovies || []} />
      )}
    </div>
  );
};

export default Header;
