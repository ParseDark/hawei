import styled from 'styled-components';
import { rhythm } from "../../utils/typography";

export const Container = styled.div`
    margin: 3rem auto;
    max-width: 650;
    padding: ${rhythm(2)};
    padding-top: ${rhythm(1.5)};
`

export const Header = styled.header`
    margin-bottom: 1.5rem;
    display: flex;
`;

export const WebsiteHeaderText = styled.div`
    text-shadow: none; 
    background-Image: none;
    flex: 1;
    display: flex; 
`;
