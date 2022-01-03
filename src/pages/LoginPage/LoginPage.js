import { React, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../redux/nodes/entities/user/actions';
import login from '../../services/authService';
import styles from './loginPage.module.css';

function LoginPage() {
  const formRef = useRef();

  const dis = useDispatch();
  const nav = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const { token, refreshToken } = await login(formData);
    dis(setToken(token, refreshToken));
    nav('/home', { replace: true });
  };

  return (
    <div className={styles['main-box']}>
      <h1>Login Page</h1>
      <form onSubmit={onSubmit} ref={formRef} className={styles['form-box']}>
        <label className={styles.label} htmlFor="email">
          <h3 className={styles['label-heading']}>Email</h3>
          <input
            name="email"
            className={styles['input-field']}
            type="email"
            placeholder="Enter email"
          />
        </label>
        <label className={styles.label} htmlFor="password">
          <h3 className={styles['label-heading']}>Password</h3>
          <input
            className={styles['input-field']}
            type="password"
            name="password"
            placeholder="Enter password"
          />
        </label>
        <button className={styles['submit-btn']} type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
