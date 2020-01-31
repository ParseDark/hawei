import React from 'react';
import { useStaticQuery, Link, graphql } from "gatsby"
import {
    Container,
    Header,
    WebsiteHeaderText,
} from './styles.js';


// 文章布局， 带导航栏
const ListLink = props => (
    <li style={{ marginRight: '10px' }}>
        <Link to={props.to}>{props.children}</Link>
    </li>
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
                    <h3>{data.site.siteMetadata.title}</h3>
                </WebsiteHeaderText>
                <ul style={{ listStyle: `none`, display: 'flex' }}>
                    <ListLink to="/">Home</ListLink>
                    <ListLink to="/all/">Articles</ListLink>
                    <ListLink to="/about/">About</ListLink>
                    <ListLink to="/contact/">Contact</ListLink>

                </ul>
            </Header>
            {children}
        </Container>
    )
}

export default Layout;
