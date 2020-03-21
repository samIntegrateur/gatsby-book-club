import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Input} from './Input';
import {Button} from './Button';
import moment from 'moment';

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
  small {
    color: #666;
    font-family: Arial;
    font-style: italic;
  }
`;

export const BookComments = ({firebase, bookId}) => {

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

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

  function handlePostComment(e) {
    e.preventDefault();
    console.log(commentText);
    firebase.postComment({
      text: commentText,
      bookId
    })
  }

  return (
    <CommentSection onSubmit={handlePostComment}>
      <h2>Comments</h2>
      <CommentForm>
        <Input value={commentText} onChange={e => {
          e.persist(); // we need it when we do asynchronous stuff
          setCommentText(e.target.value);
        }} />
        <Button type="submit">
          Post comment
        </Button>
      </CommentForm>
      <CommentList>
        {comments.map(comment => (
          <CommentListItem key={comment.id}>
            <strong>
              {comment.username}
            </strong>
            <small>
              &nbsp;-&nbsp;{moment(comment.dateCreated.toDate()).format('HH:mm Do MMM YYYY')}
            </small>
            <p>{comment.text}</p>
          </CommentListItem>
        ))}
      </CommentList>
    </CommentSection>
  );
};

