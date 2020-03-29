import React from "react"
import Layout from "../components/Layout/index.js"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { connect } from "react-redux"

import ArticleCard from "../components/ArticleCard/index.js"
import LeftNavCard from "../components/LeftNavCard/index.js"

import { toggleDarkMode } from "../state/app"

const ArticleContainer = styled.div`
  flex: 1;
  margin-left: 1rem;
`

const AuthorInfo = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`

const Index = ({ data, isDarkMode, dispatch, articles }) => {
  console.log(isDarkMode, dispatch);
  return (
    <>
      <Layout>
        <AuthorInfo>
          <LeftNavCard data={data} />
        </AuthorInfo>
        <ArticleContainer>
          <ArticleCard list={articles} />
        </ArticleContainer>
      </Layout>
    </>
  )
}

const mapDispatchToProps = null


const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isDarkMode: state.app.isDarkMode,
    articles: state._allArticles.articles,
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index)
