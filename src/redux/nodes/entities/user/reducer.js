import { SET_TOKEN } from './actions';

const initialState = {
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  loading: false,
  error: '',
};

// eslint-disable-next-line default-param-last
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN: {
      localStorage.setItem('token', action.token);
      localStorage.setItem('refreshToken', action.refreshToken);
      return {
        ...state,
        token: action.token,
        refreshToken: action.refreshToken,
      };
    }
    default: {
      return state;
    }
  }
}
