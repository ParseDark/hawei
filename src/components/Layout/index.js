import React from 'react';
import { useStaticQuery, Link, graphql } from "gatsby"
import {
    Container,
    Header,
    WebsiteHeaderText,
    LinkStyle,
    Body,
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
                <ul style={
                    { listStyle: `none`, display: 'flex' }
                } >
                    <ListLink to="/allArticles/">博客</ListLink>
                    <ListLink to="/about/">关于</ListLink>
                    <ListLink to="/connect/">联系我</ListLink>
                </ul>
            </Header >
            <Body>
                {children}
            </Body>
        </Container>
    )
}


export default Layout;