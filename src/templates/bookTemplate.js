import React, {useContext} from 'react';
import BookItem from '../components/BookItem';
import {graphql} from 'gatsby';
import {BookComments} from '../components/common';
import {FirebaseContext} from '../components/firebase';

const BookTemplate = (props) => {
  const {firebase} = useContext(FirebaseContext);
  return (
    <div>
      <BookItem
        bookCover={props.data.book.localImage.childImageSharp.fixed}
        bookTitle={props.data.book.title}
        bookSummary={props.data.book.summary}
        authorName={props.data.book.author.name}
      />
      {!!firebase &&
        <BookComments firebase={firebase} bookId={props.data.book.id} />
      }
    </div>
  )
}

// https://www.udemy.com/course/gatsby-js-firebase-hybrid-realtime-static-sites/learn/lecture/15777138#questions
// $bookId is provided by the pageContext (from gatsby-node)
// the query returns what we want in props.data
export const query = graphql`
  query BookQuery($bookId: String!) {
    book(id: {eq: $bookId}){
      id
      localImage {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      summary
      title
      author {
        name
      }
    }
  }
`;

export default BookTemplate;
