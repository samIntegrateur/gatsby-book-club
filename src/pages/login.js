import React, {useState, useContext} from "react"
import {FirebaseContext} from '../components/firebase';
import {Form, Input, Button, ErrorMessage} from '../components/common';

const Login = () => {

  const [formValues, setFormValues] = useState({email: '', password: ''});
  const [errorMessage, setErrorMessage] = useState('');
  const {firebase} = useContext(FirebaseContext);

  function handleSubmit(e) {
    e.preventDefault();

    firebase.login({email: formValues.email, password: formValues.password}).catch(error => {
      console.log('error', error);
      setErrorMessage(error.message);
    });
  }

  function handleInputChange(e) {
    e.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input required value={formValues.email} name="email" onChange={handleInputChange} placeholder="email" type="text" />
        <Input required value={formValues.password} name="password" onChange={handleInputChange} placeholder="password" type="password" />
        {!!errorMessage &&
          <ErrorMessage>
            {errorMessage}
          </ErrorMessage>
        }
        <Button block type="submit">
          Login
        </Button>
      </Form>
    </div>
  )

}

export default Login
