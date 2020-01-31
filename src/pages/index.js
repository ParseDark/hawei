import React from "react";
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout/layout';
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
          <Title>
            {node.frontmatter.title}{" "}
            <span>
              — {node.frontmatter.date}
            </span>
          </Title>
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
          excerpt
        }
      }
    }
  }
`