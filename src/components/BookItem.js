import styled from 'styled-components';
import React from 'react';

const BookItemWrapper = styled.article`
  
  border: 1px solid mediumpurple;
  padding: 1rem;
  margin-bottom: 1rem;

  header {
    margin-bottom: 1.5rem;
    
    span {
      color: #555
    }
  }
`;

const BookItem = ({authorName, bookTitle, bookSummary, children}) => {
  return (
    <BookItemWrapper>
      <header>
        <h1>{bookTitle}</h1>
        <span>{authorName}</span>
      </header>
      <div>
          <p>{bookSummary}</p>
          {children}
      </div>
    </BookItemWrapper>
  )
}

export default BookItem;
