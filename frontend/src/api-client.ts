import { MovieType } from "../../backend/src/models/movies"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const fetchMovies = async (): Promise<MovieType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/movies`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.message);
    }
    return body;
  };

  export const fetchMovieDetails = async (title: string): Promise<MovieType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/search?title=${title}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.message);
    }
    return body;
  };
