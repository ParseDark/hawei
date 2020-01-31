import React from 'react';
import Layout from '../components/layout/index';
import { graphql } from "gatsby"


export default ({ data }) => (
    <Layout>
        <div>
            <h1>About { data.site.siteMetadata.title }</h1>
            <span>description</span>
        </div>
    </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`