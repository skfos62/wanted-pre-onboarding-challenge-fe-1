import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AuthType, todosFetcher } from '../../Api/fetcher'

const TodoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`

interface TodoListProps {
  title: string
  content: string
  id: string
  createdAt: string
  updatedAt: string
}

interface TodoListResponse {
  data: TodoListProps[]
}

function TodoList() {
  const [items, setItems] = useState<TodoListProps[]>([])
  const getTodoList = async () => {
    const token = localStorage.getItem('token')
    if (token)
      try {
        const result = await todosFetcher({
          method: 'get',
          url: 'todos',
          authorization: token
        })
        if (result) {
          const data = result as TodoListResponse
          setItems(data.data)
          console.log({ result })
        }
      } catch (error) {
        console.log(error)
      }
  }
  const createToDoList = async () => {
    const token = localStorage.getItem('token')
    if (token)
      try {
        const result = await todosFetcher({
          method: 'post',
          url: 'todos',
          authorization: token,
          requset: {
            title: '테스트 1',
            content: '테스트 1'
          }
        })
        if (result) {
          getTodoList()
        }
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(() => {
    getTodoList()
  }, [])
  return (
    <TodoContainer>
      <div>목록</div>
      {items.length > 0 &&
        items.map((item) => <h3 key={item.id}>{item.title}</h3>)}
      {items.length === 0 && <div>목록이 없습니다</div>}
      <button
        type="submit"
        onClick={() => {
          createToDoList()
        }}
      >
        목록 추가하기
      </button>
    </TodoContainer>
  )
}

export default TodoList
