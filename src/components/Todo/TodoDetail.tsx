import React from 'react'
import styled from 'styled-components'

const TodoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`

function TodoDetail() {
  return (
    <TodoContainer>
      <div>상세</div>
    </TodoContainer>
  )
}

export default TodoDetail
