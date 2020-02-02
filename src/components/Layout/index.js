import React from 'react';
import { useStaticQuery, Link, graphql } from "gatsby"
import Button from '../Button/index.js'
import {
    Container,
    Header,
    WebsiteHeaderText,
    LinkStyle,
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
                    <h3> {data.site.siteMetadata.title} </h3> </WebsiteHeaderText>
                <ul style={
                    { listStyle: `none`, display: 'flex' }
                } >
                    <ListLink to="/" > Home </ListLink>
                    <ListLink to="/all/" > Articles </ListLink>
                    <ListLink to="/about/" > About </ListLink>
                    <Button> Connect </Button>
                </ul>

            </Header >
            <div>
                <div>banner text</div>
                <div>banner description</div>
                <div>random</div>
            </div>
            {children}
        </Container>
    )
            }            


export default Layout;