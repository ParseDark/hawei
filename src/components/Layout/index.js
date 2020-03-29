import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { connect } from 'react-redux'
import NavMenu from "../NavMenu/index.js"
import {
  Container,
  Header,
  WebsiteHeaderText,
  LinkStyle,
  Body,
  UlBox,
  BreadMenuContainer,
  activeLink,
} from "./styles.js"
import { setArticles } from '../../state/allArticles/index'
import { setAuthorInfo } from '../../state/siteMeta/index'
import Drawer from "../Drawer/index.js"

// 文章布局， 带导航栏
const ListLink = props => (
  <LinkStyle>
    <Link activeStyle={activeLink} to={props.to}>
      {" "}
      {props.children}{" "}
    </Link>
  </LinkStyle>
)

const Layout = (props) => {
  const { children, setAllArticles } = props;
  const [navMenuStatus, setNavMenuStatus] = useState(false)
  const data = useStaticQuery(
    graphql`
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
    }
    `
  )
  setAllArticles(data.allMarkdownRemark.edges)
  setAuthorInfo(data.site.siteMetadata.author)

  return (
    <Container>
      <Header>
        <WebsiteHeaderText>
          <Link to="/">
            <h3> {data.site.siteMetadata.title} </h3>
          </Link>
        </WebsiteHeaderText>
        <UlBox>
          <ListLink to="/tags/">标签</ListLink>
          <ListLink to="/allArticles/">系列</ListLink>
          <ListLink to="/about/">关于大可</ListLink>
        </UlBox>
        <BreadMenuContainer>
          <i
            class="fas fa-bars"
            onClick={() => {
              setNavMenuStatus(true)
            }}
          ></i>
        </BreadMenuContainer>
        <Drawer
          visibility={navMenuStatus}
          onClose={() => {
            setNavMenuStatus(false)
          }}
        >
          <NavMenu />
        </Drawer>
      </Header>
      <Body>{children}</Body>
    </Container>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setAllArticles: articles => {
      dispatch(setArticles(articles))
    },
    setAuthorInfo: authorInfo => {
      dispatch(setAuthorInfo(authorInfo))
    }
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    articles: state._allArticles.articles,
  }
}

const ConnectLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)

export default ConnectLayout;

