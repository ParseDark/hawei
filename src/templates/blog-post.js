import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout/index.js"
import "./style.css"

const Container = styled.div`
  width: 100%;
  overflow: auto;
`

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <Container>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
