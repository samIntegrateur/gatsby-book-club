import React, {useContext, useEffect, useState} from 'react';
import {Form, Input, Button} from '../components/common';
import {FirebaseContext} from '../components/firebase';

const AddAuthor = () => {
  const {firebase} = useContext(FirebaseContext);
  const [authorName, setAuthorName] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    firebase.createAuthor({
      authorName
    }).then(() => {
      if (isMounted) {
        setSuccess(true);
        setAuthorName('');
      }
    }).catch((e) => {
      if (isMounted) {
        setError(e.message);
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Add author</h1>
      <Input onChange={(e) => {
        e.persist();
        setSuccess(false);
        setError('');
        setAuthorName(e.target.value);
      }} value={authorName} placeholder="author name" />
      {!!success &&
        <p>
          Author created successfully !
        </p>
      }
      {!!error &&
        <p>
          Error<br/>
          <i>{error}</i>
        </p>
      }
      <Button type="submit" block>
        Add author
      </Button>
    </Form>
  );
};

export default AddAuthor;
