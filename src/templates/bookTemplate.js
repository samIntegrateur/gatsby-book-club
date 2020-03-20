import React from 'react';
import Layout from '../components/layout';
import BookItem from '../components/BookItem';
import {graphql} from 'gatsby';

const BookTemplate = (props) => {
  return (
    <Layout>
      <BookItem
        bookCover={props.data.book.localImage.childImageSharp.fixed}
        bookTitle={props.data.book.title}
        bookSummary={props.data.book.summary}
        authorName={props.data.book.author.name}
      />
    </Layout>
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
