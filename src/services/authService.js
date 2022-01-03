import { LOGIN_API } from '../constants';

export default function login(formData) {
  return fetch(LOGIN_API, {
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
}
