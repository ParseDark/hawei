import React from "react"
import styled from "styled-components"

const Tag = styled.div`
  background: rgba(22, 22, 22, 0.2);
  padding: 0.2rem 0.3rem;
  display: inline;
  margin: 0 0.3rem 0.4rem 0;
`

const TagsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const Tags = ({ list, clickEvent }) => {
  return (
    <TagsContainer>
      {list.map(item => (
        <Tag onClick={() => clickEvent && clickEvent(item)}>{item}</Tag>
      ))}
    </TagsContainer>
  )
}

export default Tags
