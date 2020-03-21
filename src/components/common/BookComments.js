import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Input} from './Input';
import {Button} from './Button';

const CommentSection = styled.section`
  margin-top: 1.5rem;
`;

const CommentForm = styled.form`
  display:flex;
  
  input {
    margin: 0;
  }
  
  button {
    white-space: nowrap;
  }
`;

const CommentList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const CommentListItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 1rem 0;
  border-top: 1px solid #ccc;
  strong {
    color: rebeccapurple;
  }
  p {
    padding-left: 1rem;
  }
`;

export const BookComments = ({firebase, bookId}) => {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.subscribeToBookComments({
      bookId,
      onSnapshot: (snapshot) => {
        console.log('snapshot', snapshot);
        const snapshotComments = [];
        snapshot.forEach(doc => {
          snapshotComments.push({
            id: doc.id,
            ...doc.data()
          });
        });

        setComments(snapshotComments);
      }
    })

    return () => {
      if(unsubscribe) {
        unsubscribe();
      }
    }
  }, [bookId, firebase, setComments]);

  console.log('comments', comments);

  return (
    <CommentSection>
      <h2>Comments</h2>
      <CommentForm>
        <Input />
        <Button>
          Post comment
        </Button>
      </CommentForm>
      <CommentList>
        {comments.map(comment => (
          <CommentListItem key={comment.id}>
            <strong>{comment.username}</strong>
            <p>{comment.text}</p>
          </CommentListItem>
        ))}
      </CommentList>
    </CommentSection>
  );
};

