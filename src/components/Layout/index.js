import React from 'react';
import { useStaticQuery, Link, graphql } from "gatsby"
import {
    Container,
    Header,
    WebsiteHeaderText,
    LinkStyle,
    Body,
    UlBox,
} from './styles.js';

// 文章布局， 带导航栏
const ListLink = props => (
    <LinkStyle >
        <Link to={props.to} > {props.children} </Link>
    </LinkStyle >
)


const Layout = ({ children }) => {
    const data = useStaticQuery(
        graphql`
          query {
                site {
                siteMetadata {
                title
            }
            }
          }
        `
    )
    return (
        <Container>
            <Header>
                <WebsiteHeaderText>
                    <Link to="/">
                        <h3> {data.site.siteMetadata.title} </h3>
                    </Link>
                </WebsiteHeaderText>
                <UlBox >
                    <ListLink to="/allArticles/">所有博客</ListLink>
                    <ListLink to="/allArticles/">标签</ListLink>
                    <ListLink to="/allArticles/">系列</ListLink>
                    <ListLink to="/about/">关于大可</ListLink>
                    <ListLink to="/connect/">call他</ListLink>
                </UlBox>
            </Header >
            <Body>
                {children}
            </Body>
        </Container>
    )
}


export default Layout;