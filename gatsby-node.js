/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions;

  const bookTemplate = path.resolve('./src/templates/bookTemplate.js');

  return graphql(`
    {
      allBook {
        edges {
          node {
            id
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    result.data.allBook.edges.forEach(book => {
      createPage({
        path: `/book/${book.node.id}`,
        component: bookTemplate,
        // we have to do this, instead of just getting node, in order to use GatsbyImageSharpFixed
        // https://www.udemy.com/course/gatsby-js-firebase-hybrid-realtime-static-sites/learn/lecture/15777138#questions
        context: {
          bookId: book.node.id
        }
      })
    })
  })
}
