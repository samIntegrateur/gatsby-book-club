/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// persist layout in each page
// https://www.udemy.com/course/gatsby-js-firebase-hybrid-realtime-static-sites/learn/lecture/15903212#overview
const React = require('react');
const Layout = require('./src/components/layout').default;

exports.wrapPageElement = ({element, props}) => {
  return <Layout {...props}>{element}</Layout>
};
