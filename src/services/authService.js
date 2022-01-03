import { LOGIN_API, REGISTER_API } from '../constants';

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
