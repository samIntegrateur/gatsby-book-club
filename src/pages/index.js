import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const IndexPage = (props) => {
  // console.log('props', props);
  return (
    <Layout>
      {props.data.allBook.edges.map(edge => (
        <article key={edge.node.id}>
          <h2>
            {edge.node.title} - <small>{edge.node.author.name}</small>
          </h2>
          <div>
            {edge.node.summary}
          </div>
          <Link to={`/book/${edge.node.id}`}>
            Join conversation
          </Link>
        </article>
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
