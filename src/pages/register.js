import React, {useState, useContext} from 'react';
import {Form, Input, Button, ErrorMessage} from '../components/common';
import {func} from 'prop-types';
import {FirebaseContext} from '../components/firebase';

const Register = () => {

  const {firebase} = useContext(FirebaseContext);

  const [errorMessage, setErrorMessage] = useState('');

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  function handleInputChange(e) {
    e.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formValues.password === formValues.confirmPassword) {
      firebase.register({
        username: formValues.username,
        email: formValues.email,
        password : formValues.password,
      }).catch(error => {
        setErrorMessage(error.message);
      })
    } else {
      setErrorMessage('Password and ConfirmPassword field don\'t match !');
    }

    console.log('formValues', formValues);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input onChange={handleInputChange} value={formValues.username} placeholder="username" type="text" name="username" required />
      <Input onChange={handleInputChange} value={formValues.email} placeholder="email" type="email" name="email" required />
      <Input onChange={handleInputChange} value={formValues.password} placeholder="password" type="password" name="password" required minLength="6" />
      <Input onChange={handleInputChange} value={formValues.confirmPassword} placeholder="confirm password" type="password" name="confirmPassword" required minLength="6" />
      {!!errorMessage &&
        <ErrorMessage>
          {errorMessage}
        </ErrorMessage>
      }

      <Button type="submit" block>
        Register
      </Button>
    </Form>
  )
};

export default Register;
