import React from 'react';
import styled from 'styled-components';
import LeftNavCard from '../components/LeftNavCard/index.js';
import Layout from '../components/Layout/index.js';

const Contaner = styled.div`
    width: 100%;
`;

const Connect = ({ data }) => {

  return (
    <Layout>
      <Contaner>
        <LeftNavCard data={data} />
      </Contaner>
    </Layout>
  )
}

export default Connect;


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
