import styled from 'styled-components';
import { rhythm } from "../../utils/typography";
import "@fortawesome/fontawesome-free/css/all.css";

export const Container = styled.div`
    margin: 0 auto;
    max-width: 60rem;
    padding: ${rhythm(1)};
    padding-top: ${rhythm(1.5)};
`;

export const Header = styled.header`
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
`;

export const WebsiteHeaderText = styled.div`
    text-shadow: none; 
    background-Image: none;
    display: flex; 
`;

export const activeLink = {
    borderBottom: '3px solid rgb(238,207,85)',
};

export const LinkStyle = styled.li`
    text-transform: uppercase;
    margin-right: ${rhythm(1.5)};
    position: relative;

    ::after{
        content: '';
        border-bottom: 3px solid ${props => props.activeColor || 'rgb(238,207,85)'};
        width: 0;
        display: flex;
        transition: all .2s;
    };

    :hover{
        ::after{
            width: 100%;
        } 
    }
`;
export const Body = styled.div`
    width: 100%;
    display: flex;
`;

export const UlBox = styled.ul`
    list-style: none;
    display: flex ;

    @media (max-width: 800px) {
        display: none;
    }
`;

export const BreadMenuContainer = styled.div`
    display: none;

    @media (max-width: 800px) {
        display: inline-block;
    }
`