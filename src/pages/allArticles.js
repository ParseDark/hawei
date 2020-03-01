import React from 'react';
import Layout from '../components/Layout/index.js';
import { graphql } from "gatsby"
import styled from 'styled-components';

import ArticleCard from '../components/ArticleCard/index.js';
import LeftNavCard from '../components/LeftNavCard/index.js';

const ArticleContainer = styled.div`
    flex: 1;
    margin-left: 1rem;
`;

const AuthorInfo = styled.div`
   /* @media (max-width: 800px) {
      display: none;
    } */
`;



export default ({ data }) => {
  return (
    <Layout>
      <AuthorInfo>
        <LeftNavCard data={data} />
      </AuthorInfo>
      <ArticleContainer>
        <ArticleCard list={data.allMarkdownRemark.edges} />
      </ArticleContainer>
    </Layout>
  )
}

export const query = graphql`
  query {
        site {
            siteMetadata {
                title
                author {
                    name
                    github
                    juejin
                    twitter
                    email
                }
            }

         
        }
        allMarkdownRemark(limit: 10) {
            totalCount
            edges {
              node {
                id
                frontmatter {
                  title
                  date(formatString: "DD MMMM, YYYY")
                  tag
                  banner
                }
                fields {
                  slug
                }
                excerpt
              }
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