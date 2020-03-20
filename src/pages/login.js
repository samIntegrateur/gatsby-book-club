import React, {useState, useContext} from "react"
import {FirebaseContext} from '../components/firebase';
import {Form} from '../components/common/form';
import {Input} from '../components/common/Input';
import {Button} from '../components/common/Button';

const Login = () => {

  const [formValues, setFormValues] = useState({email: '', password: ''});
  const {firebase} = useContext(FirebaseContext);

  function handleSubmit(e) {
    e.preventDefault();

    firebase.login({email: formValues.email, password: formValues.password});
  }

  function handleInputChange(e) {
    e.persist();
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input value={formValues.email} name="email" onChange={handleInputChange} placeholder="email" type="text" />
        <Input value={formValues.password} name="password" onChange={handleInputChange} placeholder="password" type="password" />
        <Button block type="submit">
          Login
        </Button>
      </Form>
    </div>
  )

}

export default Login
