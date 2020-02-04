import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Container = styled.div`
    background: #fff;
    border-radius: .5rem;
    margin-bottom: 1rem;
`;

const ImageContainer = styled.div`
    background: #222;
    height: 18rem;
    border-radius: .5rem .5rem 0 0;
`;

const TextContainer = styled.div`
    padding: .5rem 2rem;
    display: flex;
    flex-flow: column nowrap;
`;

const Title = styled.div`
    font-size: 2rem;
    line-height: 2.5rem;
    position: relative;
    padding: 1rem 0;
    cursor: pointer;

    ::after{
        content: '';
        background: #decb4c;
        content: "";
        display: inline-block;
        width: 2rem;
        height: .1rem;
        position: absolute;
        bottom: 0;
        left: 0;
        margin-bottom: 1rem;
    }

    :hover {
         text-decoration: underline
     }
`;

const Description = styled.div`
    font-size: .8rem;
    overflow: hidden;
    flex: 1;
`;
const ArticleFooter = styled.div`
    padding: 0 2rem .5rem 2rem;
`;

const Line = styled.div`
    border-top: 1px solid #ececec;
`;

const DateText = styled.div`
    color: #989b9d;
    padding: 1rem 0;
    font-size: .8rem;
`;

const ArticleCard = ({ list }) => {
    debugger

    return (
        <>
            {
                list.map(({ node }) => (
                    <Container>
                        <ImageContainer />
                        <TextContainer>
                            <Link
                                to={node.fields.slug} 
                            >
                                <Title>
                                    {node.frontmatter.title}
                                </Title>
                            </Link>
                            <Description>
                                {node.excerpt}
                            </Description>
                        </TextContainer>
                        <ArticleFooter>
                            <Line />
                            <DateText>
                                {node.frontmatter.date}
                            </DateText>
                        </ArticleFooter>
                    </Container>
                ))
            }
        </>
    );
}

export default ArticleCard;