import styled from '@emotion/styled';
import { Button, TextField, Typography } from '@mui/material';
import { React, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';

const StyledButton = styled(Button, {})`
  font-size: larger;
  margin: 10px;
`;

const ErrorText = styled(Typography)`
  margin: 10px;
`;

const Container = styled.div`
  width: 40%;
  height: 500px;
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

function RegisterPage() {
  const formRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');

  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /[0-9a-zA-Z][0-9a-zA-Z._]*@[0-9a-zA-Z]+\.[a-zA-Z]{2,}\b/;
    const passwordRegex = /\w{8,}/;
    setErrorMessage('');
    const formData = new FormData(formRef.current);
    const [name, email, password] = ['name', 'email', 'password'].map((field) => formData.get(field));
    if (name === ' ') {
      setErrorMessage('Name can not be Blank');
    } else if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email');
    } else if (!passwordRegex.test(password)) {
      setErrorMessage('Please enter password of length 8 or more and contains digits and letters');
    } else {
      const response = await register(formData);
      if (response.email) {
        nav('/login', { replace: true });
      } else {
        setErrorMessage('User with this email already exists');
      }
    }
  };

  return (
    <Container>
      <Typography variant="h3">Register Page</Typography>
      <FormContainer onSubmit={onSubmit} ref={formRef}>
        {errorMessage && <ErrorText color="error">{errorMessage}</ErrorText>}
        <FormTextField
          variant="outlined"
          label="Name"
          placeholder="Enter Name"
          name="name"
          required
          margin="dense"
        />
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
          Register
        </StyledButton>
      </FormContainer>
    </Container>
  );
}

export default RegisterPage;
