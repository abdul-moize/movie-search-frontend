import { React } from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
