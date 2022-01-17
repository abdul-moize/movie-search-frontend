import styled from '@emotion/styled';
import { Button, TextField, Typography } from '@mui/material';
import { React, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../redux/nodes/entities/user/actions';
import { login } from '../../services/authService';

const StyledButton = styled(Button, {})`
  font-size: larger;
  margin: 10px;
`;

const ErrorText = styled(Typography)`
  margin: 10px;
`;

const Container = styled.div`
  width: 30%;
  height: 50%;
  display: flex;
  margin: auto;
  margin-top: 100px;
  align-items: center;
  flex-direction: column;
  background: white;
`;

const FormContainer = styled.form`
  display: flex;
  margin-top: 60px;
  width: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormTextField = styled(TextField)`
  width: 80%;
`;

function LoginPage() {
  const formRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const formData = new FormData(formRef.current);
    const { token, refreshToken } = await login(formData);
    if (token && refreshToken) {
      dispatch(setToken(token, refreshToken));
      nav('/home', { replace: true });
    } else {
      setErrorMessage('Wrong Email or Password');
    }
  };

  return (
    <Container>
      <Typography variant="h3">Login Page</Typography>
      <FormContainer onSubmit={onSubmit} ref={formRef}>
        {errorMessage && <ErrorText color="error">{errorMessage}</ErrorText>}
        <FormTextField
          variant="outlined"
          label="Email"
          type="email"
          placeholder="Enter Email"
          name="email"
          required
          margin="dense"
        />
        <FormTextField
          variant="outlined"
          label="Password"
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          margin="dense"
        />
        <StyledButton variant="contained" type="submit">
          Log in
        </StyledButton>
      </FormContainer>
    </Container>
  );
}

export default LoginPage;
