import { MovieType } from "../../../backend/src/models/movies";

interface MovieDetailsCardProps  {
    movieDetails: MovieType[]
}

const MovieDetailsCard: React.FC<MovieDetailsCardProps> = ({ movieDetails }) => {
    return(
        <div className="container mx-auto mt-8">
          <h2 className="text-2xl font-bold py-1">Search</h2>
          <p className="text-black font-semibold py-2">{movieDetails.length +" "+ "Results found"}</p>
          <div
            className="bg-gray-200 rounded-xl mb-4 w-80 h-96"
            style={{
              backgroundImage: `url(${movieDetails[0].banner_image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <p className="text-gray-600">{movieDetails[0].year}</p>
          <h3 className="text-s font-semibold">{movieDetails[0].title}</h3>
          <p className="text-gray-600">{movieDetails[0].genre}</p>
        </div>
    );
}

export default MovieDetailsCard;