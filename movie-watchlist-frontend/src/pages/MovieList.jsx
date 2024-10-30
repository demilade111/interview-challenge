import React, { useState, useEffect } from "react";
import { fetchMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import Pagination from "../Components/Pagination";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    genre: "",
    watched: "",
    rating: "",
    page: 1,
    limit: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMoviesData();
  }, [filters]);

  const fetchMoviesData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovies(filters);
      setMovies(data.movies);
      setTotalPages(data.pages);
    } catch (error) {
      setError(error.message || "Error fetching movies");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePageChange = (pageNumber) => {
    setFilters({ ...filters, page: pageNumber });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Movie Watchlist</h1>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <select
          name="genre"
          value={filters.genre}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
        </select>

        <select
          name="watched"
          value={filters.watched}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">All</option>
          <option value="true">Watched</option>
          <option value="false">Unwatched</option>
        </select>

        <select
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">All Ratings</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      {/* Movies */}
      <div className="grid grid-cols-3 gap-6">
        {loading ? (
          <p>Loading movies...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MovieList;
