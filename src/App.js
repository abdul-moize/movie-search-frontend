import styled from '@emotion/styled';
import { React } from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import store from './redux/store';

const MainContainer = styled.body`
  background-image: url('/movie-bobbin-popcorn-basket.jpg');
  background-position: center;
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  
`;
function App() {
  return (
    <Provider store={store}>
      <MainContainer>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
        </Routes>
      </MainContainer>
    </Provider>
  );
}

export default App;
