import React from 'react';
import styled from 'styled-components';
import { Link } from "gatsby";

const NavContainer = styled.div`
    display: flex;
    flex-flow: column;
`;

const NavItem = styled.div`
    height: 3rem;
    display: flex;
    align-items: center;
    padding-left: 1rem;

    :hover {
        background: rgb(238,207,85);
    }
`;

const NavMenu = () => {
    const menuConfig = [
        {
            url: '/allArticles/',
            title: '所有博客',
            icon: <i class="fa fa-newspaper"></i>,
        },
        {
            url: '/allArticles/',
            title: '标签',
            icon: <i class="fa fa-tags"></i>,
        },
        {
            url: '/allArticles/',
            title: '系列',
            icon: <i class="fab fa-cube"></i>,
        },
        {
            url: '/allArticles/',
            title: '关于大可',
            icon: <i class="fab fa-connectdevelop"></i>,
        },
    ]
    return (
        <>
            <NavContainer>
                {
                    menuConfig.map(({ url, title, icon }, index) => (
                        <NavItem>
                            <Link to={url} style={{ width: '100%' }}>
                                <span style={{ marginRight: '1rem' }}>
                                    {icon}
                                </span>
                                {title}
                            </Link>
                        </NavItem>
                    ))
                }
            </NavContainer>
        </>
    )
}

export default NavMenu;
