import React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components';
import Layout from "../components/layout"
import BookItem from '../components/BookItem';

const Btn = styled.div`

  a {
    background-color: rebeccapurple;
    color: white;
    text-decoration: none;
    padding: 0.5rem 0.7rem;
    border-radius: 3px;
    
    :hover,
    :focus {
      text-decoration: none;
      background-color: #4e2b79;
    }
  }
    
`;

const IndexPage = (props) => {
  // console.log('props', props);
  return (
    <Layout>
      {props.data.allBook.edges.map(edge => (
        <BookItem
          key={edge.node.id}
          bookCover={edge.node.localImage.childImageSharp.fixed}
          bookTitle={edge.node.title}
          bookSummary={edge.node.summary}
          authorName={edge.node.author.name}
        >
          <Btn>
            <Link to={`/book/${edge.node.id}`}>
              Join conversation
            </Link>
          </Btn>
        </BookItem>
      ))}
    </Layout>
  );

}

export const query = graphql`
  {
    allBook {
      edges {
        node {
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
    }
  }
`;

export default IndexPage
