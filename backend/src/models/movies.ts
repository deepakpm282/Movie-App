import mongoose  from "mongoose";

export type MovieType = {
    _id: string;
    title: string;
    year: number;
    genre: string;
    banner_image: string;
}

const movieSchema = new mongoose.Schema({
  title: { type: String },
  year: { type: Number },
  genre: { type: String },
  banner_image: { type: String },
})

movieSchema.pre("save", async function (next) {
    next();
});

const Movie = mongoose.model<MovieType>("Movie", movieSchema);

export default Movie;