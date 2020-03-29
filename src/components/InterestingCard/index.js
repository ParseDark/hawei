import React, { useEffect, useRef } from "react"
import styled from "styled-components"

const Box = styled.div`
  /*perspective  是css透视属性 这个效果实现的关键 而且要加在父级*/
  perspective: ${props => props.perspective}px;
`

const InterestingCard = ({ children, perspective }) => {
  const boxRef = useRef(null)
  const bodyRef = useRef(null)

  const mousemoveFn = (e, body) => {
    //获取banner的X轴的中心 和 y轴的中心
    var centerX = body.offsetLeft + body.offsetWidth / 2
    var centerY = body.offsetTop + body.offsetHeight / 2

    //获取鼠标到中心的位置距离
    //e.page指鼠标到banner到边缘的位置
    var deltaX = e.clientX - centerX
    var deltaY = e.clientY - centerY

    //获取鼠标到中心距离与中心长度的比率 距离中心越远比越大 倾斜角度越大
    var percentageX = deltaX / centerX
    var percentageY = deltaY / centerY
    //常数
    var deg = 10

    //个人觉得X轴旋转用Y轴的比率 y轴的旋转倾斜角度用X轴的比率  这样可用无视正负 都是有向下倾斜的感觉
    body.style.transform =
      "rotateX(" +
      percentageY * -deg +
      "deg)" +
      "rotateY(" +
      percentageX * deg +
      "deg)"
  }

  const mouseLeaveFn = (e, body) => {
    body.style.transform = ""
  }

  useEffect(() => {
    const box = boxRef.current
    const body = bodyRef.current
    box.onmousemove = e => {
      mousemoveFn(e, body)
    }
    box.onmouseleave = e => {
      mouseLeaveFn(e, body)
    }

    return () => {
      box.onmousemove = null
      box.onmouseleave = null
    }
  }, [mouseLeaveFn, mousemoveFn, boxRef, bodyRef])

  return (
    <>
      <Box ref={boxRef} perspective={perspective}>
        <div ref={bodyRef}>{children}</div>
      </Box>
    </>
  )
}

export default InterestingCard
