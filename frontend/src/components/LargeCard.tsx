// src/components/Large_Card.tsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MovieType } from "../../../backend/src/models/movies";

interface LargeCardProps {
  movies: MovieType[];
}

const Large_Card: React.FC<LargeCardProps> = ({ movies }) => {

  const [likedMovies, setLikedMovies] = useState<string[]>([]);

  useEffect(() => {
    const storedLikedMovies = localStorage.getItem("likedMovies");
    if (storedLikedMovies) {
      setLikedMovies(JSON.parse(storedLikedMovies));
    }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const adventureMovies = movies.filter((movie) => movie.genre == "Adventure");

  const toggleLike = (movieId: string) => {
    const updatedLikedMovies = likedMovies.includes(movieId)
      ? likedMovies.filter((id) => id !== movieId)
      : [...likedMovies, movieId];

    setLikedMovies(updatedLikedMovies);
    // Update local storage
    localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies));
  };

  return (
    <div className="container mx-auto mt-8">
      <Slider {...settings}>
        {adventureMovies.map((movie, index) => (
          <div key={index} className="relative">
            <div
              className="w-full h-96 bg-gray-200 rounded-md"
              style={{
                backgroundImage: `url(${movie.banner_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="absolute bottom-0 left-0 p-6 bg-opacity-50 w- full text-white">
              <h2 className="text-3xl font-extralight">{movie.title}</h2>
              <p className="mt-2 font-thin">{movie.genre}</p>
              <button className="mt-4 px-3 py-1 bg-red-600 text-white rounded">
                Watch trailer
              </button>
            </div>
          </div>
        ))}
      </Slider>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {movies.map((movie) => (
          <div key={movie._id} className="relative bg-white rounded-lg p-6">
            <button
              onClick={() => toggleLike(movie._id)}
              className={`absolute top-8 right-7 rounded-full ${
                likedMovies.includes(movie._id) ? "bg-white-200" : "bg-white-500"
              }`}
            >
              {likedMovies.includes(movie._id) ? "❤️" : "🤍"}
            </button>
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
  );
};

export default Large_Card;
