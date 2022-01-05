import styled from '@emotion/styled';
import { React } from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LatestMovies from './pages/LatestMovies/LatestMovies';
import LoginPage from './pages/LoginPage';
import PopularMovies from './pages/PopularMovies';
import RegisterPage from './pages/RegisterPage';
import TopRatedMovies from './pages/TopRatedMovies';
import store from './redux/store';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;
function App() {
  return (
    <Provider store={store}>
      <MainContainer>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/latest" element={<LatestMovies />} />
          <Route exact path="/top_rated" element={<TopRatedMovies />} />
          <Route exact path="/popular" element={<PopularMovies />} />
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
        </Routes>
      </MainContainer>
    </Provider>
  );
}

export default App;
