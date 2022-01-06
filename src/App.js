import { CircularProgress, Stack } from '@mui/material';
import { React } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LatestMovies from './pages/LatestMovies/LatestMovies';
import LoginPage from './pages/LoginPage';
import MovieDetail from './pages/MovieDetail';
import PopularMovies from './pages/PopularMovies';
import RegisterPage from './pages/RegisterPage';
import TopRatedMovies from './pages/TopRatedMovies';

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
        <Route
          path="/"
          element={
            (
              <Stack>
                <CircularProgress />
              </Stack>
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
