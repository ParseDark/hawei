import React from 'react';
import styled from 'styled-components';

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

const ArticleCard = () => {
    return (
        <>
            {
                [1, 2, 3, 4, 5].map(item => (
                    <Container>
                        <ImageContainer />
                        <TextContainer>
                            <Title>了解TypeScript中的任何未知内容。Never和void之间的区别</Title>
                            <Description>在我们的项目中实现TypeScript时，我们会努力编写出最好的类型。我们可能经常会觉得使用  any  类型违反了TypeScript的目的，这是理所当然的。还有其他一些值得了解的类型，当尝试不使用任何其他类型时，例如  unknown，我们可能会发现它们很有用  。在本文中，我们[…]</Description>
                        </TextContainer>
                        <ArticleFooter>
                            <Line />
                            <DateText>
                                2020年1月27日
                            </DateText>
                        </ArticleFooter>
                    </Container>
                ))
            }
        </>
    );
}

export default ArticleCard;