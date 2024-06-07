import React, { useEffect, useState } from "react";
import { MovieType } from "../../../backend/src/models/movies";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";

const LikedMovies: React.FC = () => {
  const navigate = useNavigate();
  const [likedMovies, setLikedMovies] = useState<MovieType[]>([]);
  const { data: allMovies } = useQuery(["fetchMovies"], apiClient.fetchMovies);

  useEffect(() => {
    const storedLikedMovies = localStorage.getItem("likedMovies");
    if (storedLikedMovies && allMovies) {
      const likedMovieIds = JSON.parse(storedLikedMovies);
      const likedMoviesDetails = allMovies?.filter((movie) =>
        likedMovieIds.includes(movie._id)
      );
      setLikedMovies(likedMoviesDetails);
    }
  }, [allMovies]);

  const handleBackClick = () => {
    navigate(-1)
  }

  return (
    <div className="container mx-auto flex justify-between items-center relative">
      <div className="flex items-center space-x-4">
        <div className="container mx-auto mt-8">
          <div>
            <span className="text-2xl text-black font-bold tracking-tight">
              <Link to="/">GET MOVIES</Link>
            </span>
          </div>
          <button onClick={handleBackClick} className="py-4 rounded-md text-black">
            <span className="text-black text-lg">GoBack</span>
          </button>
          <Link to="" className="px-4 py-2 text-black rounded-md font-bold">
              My Favourite
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {likedMovies.map((movie) => (
              <div key={movie._id} className="relative bg-white rounded-lg p-6">
                <div
                  className="h-72 bg-gray-200 rounded-xl mb-4"
                  style={{
                    backgroundImage: `url(${movie.banner_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <p className="text-gray-600">{movie.year}</p>
                <h3 className="text-s font-semibold">{movie.title}</h3>
                <p className="text-gray-600">{movie.genre}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedMovies;
