import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from '../components/firebase';
import {Form, Input, Select, Button} from '../components/common';
import styled from 'styled-components';

const FormField = styled.div`
  margin-bottom: 1.2rem;
`;

let fileReader;
// fix for netlify
// https://www.udemy.com/course/gatsby-js-firebase-hybrid-realtime-static-sites/learn/lecture/16186367#questions
if (typeof window !== 'undefined') {
  fileReader = new FileReader()
}

const AddBook = () => {
  const {firebase} = useContext(FirebaseContext);
  const [authors, setAuthors] = useState([]);
  const [bookCover, setBookCover] = useState('');
  const [bookName, setBookName] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [summary, setSummary] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    }
  }, []);

  useEffect(() => {
    fileReader.addEventListener('load', () => {
      setBookCover(fileReader.result);
    })
  }, []);

  useEffect(() => {
    // query all authors
    if (firebase) {
      firebase.getAuthors().then(snapshot => {
        if (isMounted) {
          const availableAuthors = [];
          snapshot.forEach(doc => {
            availableAuthors.push({
              id: doc.id,
              ...doc.data()
            })
          });

          setAuthors(availableAuthors);
          // set a default choice
          setAuthorId(availableAuthors[0].id);
        }
      })
    }
  }, [firebase]);

  function handleSubmit(e) {
    e.preventDefault();
    firebase.createBook({bookName, authorId, bookCover, summary})
      .then(() => {
        if (isMounted) {
          setSuccess(true);
        }
      }).catch((e) => {
        if (isMounted) {
          setError(e.message);
        }
      })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField>
        <label htmlFor="book-name">Book name</label>
        <Input id="book-name" placeholder="Book name" value={bookName} onChange={e => {
          e.persist();
          setSuccess(false);
          setError('');
          setBookName(e.target.value);
        }} />
      </FormField>
      <FormField>
        <label htmlFor="book-name">Author</label>
        <Select id="author" value={authorId} onChange={e => {
          e.persist();
          setSuccess(false);
          setError('');
          setAuthorId(e.target.value);
        }}>
          {authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </Select>
      </FormField>
      <FormField>
        <label htmlFor="summary">Summary</label>
        <Input id="summary" type="text" value={summary} onChange={e => {
          e.persist();
          setSuccess(false);
          setError('');
          setSummary(e.target.value);
        }}/>
      </FormField>
      <FormField>
        <label htmlFor="cover">Cover</label>
        <Input id="cover" type="file" onChange={e => {
          e.persist();
          setSuccess(false);
          setError('');
          fileReader.readAsDataURL(e.target.files[0]);
        }}/>
      </FormField>
      {!!success &&
      <p>
        Book created successfully !
      </p>
      }
      {!!error &&
      <p>
        Error<br/>
        <i>{error}</i>
      </p>
      }
      <Button type="submit" block>
        Add book
      </Button>
    </Form>

  );
};

export default AddBook;
