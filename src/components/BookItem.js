import styled from 'styled-components';
import React from 'react';
import Img from "gatsby-image";

const BookItemWrapper = styled.article`
  
  border: 1px solid mediumpurple;
  padding: 1rem;
  margin-bottom: 1rem;
  display:flex;

  header {
    margin-bottom: 1.5rem;
    
    span {
      color: #555
    }
  }
`;

const BookItemImageWrapper = styled.figure`
  max-width: 25vw;
  margin: 0 1rem 0 0;
  flex: 0 1 180px;
  
  img {
    width: 100%;
    margin: 0;
  }
`;
const BookItemContentWrapper = styled.div`
  flex: 1 0 1%;
`;

const BookItem = ({authorName, bookTitle, bookSummary, bookCover, children}) => {
  return (
    <BookItemWrapper>
      <BookItemImageWrapper>
        <Img fixed={bookCover} />
      </BookItemImageWrapper>
      <BookItemContentWrapper>
        <header>
          <h1>{bookTitle}</h1>
          <span>{authorName}</span>
        </header>
        <div>
          <p>{bookSummary}</p>
          {children}
        </div>
      </BookItemContentWrapper>
    </BookItemWrapper>
  )
}

export default BookItem;
