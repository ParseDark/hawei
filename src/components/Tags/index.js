import React from 'react';
import styled from 'styled-components';

const Tag = styled.div`
    background: rgba(22, 22, 22, .2);
    padding: .2rem .3rem;
    display: inline;
    margin: 0 .3rem .4rem 0;
`;

const TagsContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
`;


const Tags = ({ list, clickEvent }) => {
    return (
        <TagsContainer>
            {
                list.map(item => (
                    <Tag onClick={() => (clickEvent && clickEvent(item))} >{item}</Tag>
                ))
            }
        </TagsContainer>
    );
}

export default Tags;