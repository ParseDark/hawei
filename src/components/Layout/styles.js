import styled from 'styled-components';
import { rhythm } from "../../utils/typography";

export const Container = styled.div`
    margin: 0 auto;
    max-width: 70rem;
    padding: ${rhythm(1)};
    padding-top: ${rhythm(1.5)};
`

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

export const LinkStyle = styled.li`
    text-transform: uppercase;
    margin-right: ${rhythm(1.5)};
    position: relative;

    ::after{
        content: '';
        border-bottom: 3px solid #333;
        width: 0;
        display: flex;
        transition: all .2s;
        position: absolute;
        transform: translate(-50%, 0);
        left: 50%;
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