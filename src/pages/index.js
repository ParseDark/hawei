import React from "react";
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout/index.js';
import { rhythm } from '../utils/typography';

const Title = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`;

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <h4>all of {data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link
            to={node.fields.slug}
          >
            <Title>
              {node.frontmatter.title}{" "}
              <span>
                — {node.frontmatter.date}
              </span>
            </Title>
          </Link>
          <p>{node.excerpt}</p>
        </div>
      ))
      }
    </Layout >
  )
}


export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`