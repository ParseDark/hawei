import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Container = styled.div`
    background: #fff;
    border-radius: .5rem;
    margin-bottom: 1rem;
`;

const ImageContainer = styled.div`
    background: url(${(props) => props.banner}) no-repeat center center;
    height: 18rem;
    border-radius: .5rem .5rem 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
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

const BanerTitle = styled.div`
    flex-flow: column nowrap;
    font-family: 'Oswald', sans-serif;
    color: #000;
    font-size: 1.5rem;
    min-height: 8rem;
    min-width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 20px double;
    border-color: rgba(255, 255, 255, .8);
`;

const BannerText = styled.div`
    padding: 2rem;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, .8);
    width: 100%;
`;

const ArticleCard = ({ list }) => {
    return (
        <>
            {
                list.map(({ node }) => (
                    <Container>
                        <ImageContainer banner={node.frontmatter.banner}>
                            <BanerTitle>
                                <BannerText>
                                    {node.frontmatter.title}
                                </BannerText>
                            </BanerTitle>
                        </ImageContainer>
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