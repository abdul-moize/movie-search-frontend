import { React } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LatestMovies from './pages/LatestMovies/LatestMovies';
import LoginPage from './pages/LoginPage';
import MovieDetail from './pages/MovieDetail';
import PopularMovies from './pages/PopularMovies';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import TopRatedMovies from './pages/TopRatedMovies';
import { searchMovies, searchMoviesByCast, searchMoviesByDirector, searchMoviesByGenre } from './services/movieService';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/latest" element={<LatestMovies />} />
        <Route exact path="/top_rated" element={<TopRatedMovies />} />
        <Route exact path="/popular" element={<PopularMovies />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route
          exact
          path="/home"
          element={
            (
              <>
                <LatestMovies />
                <TopRatedMovies />
                <PopularMovies />
              </>
            )
          }
        />
        <Route path="/" element={<SearchPage api={searchMovies} />} />
        <Route path="/:query" element={<SearchPage api={searchMovies} />} />
        <Route path="/actor/:query*" element={<SearchPage api={searchMoviesByCast} />} />
        <Route path="/director/:query" element={<SearchPage api={searchMoviesByDirector} />} />
        <Route path="/genre/:query" element={<SearchPage api={searchMoviesByGenre} />} />
        <Route path="*" element={<>404 page not found</>} />
      </Routes>
    </>
  );
}

export default App;
