import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AuthType, todosFetcher } from '../../Api/fetcher'
import TodoDetail from './TodoDetail'

const TodoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  background: #f6f6f6;
  padding: 40px;
`
const TodoListContainer = styled.div`
  display: flex;
  width: 300px;
  height: 150px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  background: #fff;
  border-radius: 20px;
`
export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export interface TodoListProps {
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
  const [listItem, setListItem] = useState<TodoListProps>()

  const [openCreateTodo, setOpenCreateTodo] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const token = localStorage.getItem('token')
  const handleCloseDetail = () => setListItem(undefined)

  const getTodoList = async () => {
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
    if (token)
      try {
        const result = await todosFetcher({
          method: 'post',
          url: 'todos',
          authorization: token,
          requset: {
            title,
            content
          }
        })
        if (result) {
          getTodoList()
          setOpenCreateTodo(false)
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
      <h1>목록</h1>
      {openCreateTodo && (
        <div>
          <InputWrap>
            <p>제목 </p>
            <input
              type="text"
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </InputWrap>
          <InputWrap>
            <p>내용 </p>
            <input
              type="text"
              required
              onChange={(e) => {
                setContent(e.target.value)
              }}
            />
          </InputWrap>
          <button
            type="submit"
            onClick={() => {
              setOpenCreateTodo(false)
            }}
          >
            닫기
          </button>
          <button
            type="submit"
            onClick={() => {
              createToDoList()
            }}
          >
            등록
          </button>
        </div>
      )}
      <button
        type="submit"
        onClick={() => {
          setOpenCreateTodo(true)
        }}
      >
        목록 추가하기
      </button>
      {items.length > 0 &&
        items.map((item) => (
          <>
            <TodoListContainer
              key={item.id}
              tabIndex={0}
              onClick={() => {
                setListItem(item)
              }}
              onKeyDown={() => {
                setListItem(item)
              }}
              role="button"
            >
              <div>{item.title}</div>
              <div>{item.content}</div>
            </TodoListContainer>
            {listItem && listItem.id === item.id && (
              <TodoDetail
                item={listItem}
                onGetTodoList={getTodoList}
                onCloseDetail={handleCloseDetail}
              />
            )}
          </>
        ))}

      {items.length === 0 && <div>목록이 없습니다</div>}
    </TodoContainer>
  )
}

export default TodoList
