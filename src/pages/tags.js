import React from 'react';
import { graphql, useStaticQuery } from "gatsby";
import styled from 'styled-components';
import Layout from '../components/layout/index.js';
import Tags from '../components/Tags/index.js';
import { unit } from '../utils/utils';

const TagsTitle = styled.h3`
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid #C8C8C8;
  display: inline;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
`;

export default ({ data }) => {
  const allTag = unit(data.allTags.edges.map(({ node }) => (node.frontmatter.tag)));

  const onClickTag = (tag) => {
    debugger
  }

  return (
    <Layout>
      <Container>
        <TagsTitle onClick={onClickTag}>All Tags</TagsTitle>
        <Tags list={allTag} clickEvent={onClickTag} />
      </Container>
    </Layout>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allTags:   allMarkdownRemark(filter: {frontmatter: {tag: {ne: null}}}) {
      totalCount
      edges {
        node {
          id
          excerpt
          frontmatter {
            tag
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
              slug
          }
        }
      }
    }
  }
`