import React from 'react';
import Layout from '../components/Layout/index.js';
import { graphql } from "gatsby"
import styled from 'styled-components';
import { connect } from 'react-redux';

import ArticleCard from '../components/ArticleCard/index.js';
import LeftNavCard from '../components/LeftNavCard/index.js';

import { toggleDarkMode } from '../state/app';

const ArticleContainer = styled.div`
    flex: 1;
    margin-left: 1rem;
`;

const AuthorInfo = styled.div`
   @media (max-width: 800px) {
      display: none;
    }
`;

const Index = ({ data, isDarkMode, dispatch }) => {
  console.log(isDarkMode, dispatch)
  return (
    <>
      {/* <Layout> */}
        <AuthorInfo>
          <LeftNavCard data={data} />
        </AuthorInfo>
        <ArticleContainer>
          <ArticleCard list={data.allMarkdownRemark.edges} />
        </ArticleContainer>
      {/* </Layout> */}
    </>
  )
}


export default connect(state => ({
  isDarkMode: state.app.isDarkMode
}), null)(Index);

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