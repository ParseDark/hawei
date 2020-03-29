import React, { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.2);
`
const Body = styled.div`
  background: #fff;
  min-width: 15em;
  height: 100%;
  display: inline-block;
`

const Drawer = ({ children, visibility, onClose }) => {
  const stopEvent = e => {
    e.stopPropagation()
  }
  return (
    <>
      {visibility && (
        <Container onClick={onClose}>
          <Body onClick={stopEvent}>{children}</Body>
        </Container>
      )}
    </>
  )
}

export default Drawer
