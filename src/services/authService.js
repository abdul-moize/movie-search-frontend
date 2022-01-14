import { LOGIN_API, LOGOUT_API, REGISTER_API, REFRESH_TOKEN_API } from '../constants';
import { setToken } from '../redux/nodes/entities/user/actions';

export const login = (formData) => fetch(LOGIN_API, {
  method: 'POST',
  body: JSON.stringify({
    email: formData.get('email'),
    password: formData.get('password'),
  }),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.json())
  .catch((err) => {
    throw err;
  });

export const register = (formData) => fetch(REGISTER_API, {
  method: 'POST',
  body: JSON.stringify({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
  }),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.json())
  .catch((err) => {
    throw err;
  });

export const logout = (refreshToken) => fetch(LOGOUT_API, {
  method: 'DELETE',
  body: JSON.stringify({
    refreshToken,
  }),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getNewToken = (refreshToken) => fetch(REFRESH_TOKEN_API, {
  method: 'POST',
  body: JSON.stringify({ refreshToken }),
  headers: {
    'Content-Type': 'application/json',
  },
}).then((res) => res.json()).catch((err) => {
  throw err;
});

export const useTokenService = async (service, token, refreshToken, dispatch) => {
  let data = await service(token);
  if (data.status >= 200 && data.status <= 203) return data;
  const newToken = (await getNewToken(refreshToken)).token;
  dispatch(setToken(newToken, refreshToken));
  data = await service(newToken);
  return data;
};
