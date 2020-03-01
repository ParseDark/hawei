import React, { useState } from 'react';
import { useStaticQuery, Link, graphql } from "gatsby"
import 'pace-progressbar';
import 'pace-progressbar/themes/blue/pace-theme-minimal.css';
import NavMenu from '../NavMenu/index.js';
import {
    Container,
    Header,
    WebsiteHeaderText,
    LinkStyle,
    Body,
    UlBox,
    BreadMenuContainer,
    activeLink,
} from './styles.js';
import Drawer from '../Drawer/index.js';

// 文章布局， 带导航栏
const ListLink = props => (
    <LinkStyle>
        <Link activeStyle={activeLink} to={props.to} > {props.children} </Link>
    </LinkStyle >
)


const Layout = ({ children }) => {
    const [navMenuStatus, setNavMenuStatus] = useState(false);
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
                <UlBox>
                    <ListLink to="/tags/">标签</ListLink>
                    <ListLink to="/allArticles/">系列</ListLink>
                    <ListLink to="/connect/">call他</ListLink>
                    <ListLink to="/about/">关于大可</ListLink>
                </UlBox>
                <BreadMenuContainer>
                    <i class="fas fa-bars" onClick={() => { setNavMenuStatus(true); }}></i>
                </BreadMenuContainer>
                <Drawer visibility={navMenuStatus} onClose={(() => { setNavMenuStatus(false); })}>
                    <NavMenu />
                </Drawer>
            </Header>
            <Body>
                {children}
            </Body>
        </Container>
    )
}


export default Layout;