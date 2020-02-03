import React from 'react';
import styled from 'styled-components';
import { rhythm } from "../../utils/typography";


const Header = styled.h5`
    height: ${ rhythm(1)};
    position: relative;
    margin: 0 0 .8rem 0;
    padding: 0 0 .5rem .6rem;
    border-bottom: solid .05rem #ececec;
    font-size: 18px;
    font-size: 1.125rem;
    text-transform: uppercase;

    ::before {
        background: #decb4c;
        content: '';
        width: 1px;

        content: "";
        display: inline-block;
        width: .16rem;
        height: 1.1rem;
        position: absolute;
        top: 0;
        left: 0;
    }
`;

const CardBody = styled.div`

`;

const Container = styled.div`
    width: 100%;
    margin: 1rem 0;
`;

const Card = ({ header, children }) => {
    return (
        <Container>
            <Header>
                {header}
            </Header>
            <CardBody>
                {children}
            </CardBody>
        </Container>
    );
}


export default Card;