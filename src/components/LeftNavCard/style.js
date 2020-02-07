import styled from 'styled-components';

export const Atver = styled.div`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background: url(${props => props.src}) no-repeat;
    background-size:100% 100%;
    margin: 1rem 0 2rem 0;
    position: relative;
    border: .1rem rgb(238,207,85) solid;
`;

export const NavContainer = styled.div`
    background: rgb(255, 255, 255);
    min-width: 15rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    border-radius: .3rem;
    padding: 2rem 1rem;

    max-height: 90vh;
    position: sticky;
    top: 1rem;    
`;

export const AuthorText = styled.div`
    margin-bottom: 1rem;
`;

export const IconContainer = styled.div`
    display: flex;
`;

export const Circle = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgb(238, 207, 85);
    margin: .5rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    transition: all .2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    

    i {
        transition: all .2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        color: #fff;
    }

    :hover {
        background: #fff;
    }

    :hover i {
        color: ${(props) => props.iconColor};
        transform: scale(2);
    }
`;

