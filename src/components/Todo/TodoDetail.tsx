import React, { useState } from 'react'
import styled from 'styled-components'
import { todosFetcher } from '../../Api/fetcher'
import { InputWrap, TodoListProps } from './TodoList'

const TodoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`

interface TodoDetailProps {
  item: TodoListProps
  onGetTodoList: () => void
  onCloseDetail: () => void
}

function TodoDetail({ item, onGetTodoList, onCloseDetail }: TodoDetailProps) {
  const [openUpdate, setOpenUpdate] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const token = localStorage.getItem('token')
  const [items, setItems] = useState<TodoListProps>(item)

  const updateTodoList = async () => {
    if (openUpdate) {
      if (token)
        try {
          const result = await todosFetcher({
            method: 'put',
            url: `todos/${item.id}`,
            authorization: token,
            requset: {
              title,
              content
            }
          })
          if (result) {
            onGetTodoList()
            setOpenUpdate(false)
            setItems(result)
            onCloseDetail()
          }
        } catch (error) {
          console.log(error)
        }
    }
    if (!openUpdate) setOpenUpdate(true)
  }
  const deleteTodoList = async () => {
    if (token)
      try {
        const result = await todosFetcher({
          method: 'delete',
          url: `todos/${item.id}`,
          authorization: token
        })
        if (result) {
          onGetTodoList()
          setOpenUpdate(false)
          onCloseDetail()
        }
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <TodoContainer>
      <div>--- 상세 보기---</div>
      {!openUpdate && (
        <div>
          <div>{item.title}</div>
          <div>{item.content}</div>
        </div>
      )}
      {openUpdate && (
        <div>
          <InputWrap>
            <input
              type="text"
              defaultValue={items.title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </InputWrap>
          <br />
          <InputWrap>
            <input
              type="text"
              defaultValue={items.content}
              onChange={(e) => {
                setContent(e.target.value)
              }}
            />
          </InputWrap>
        </div>
      )}

      <button
        type="submit"
        onClick={() => {
          updateTodoList()
        }}
      >
        수정
      </button>
      <button
        type="submit"
        onClick={() => {
          setOpenUpdate(false)
        }}
      >
        뒤로
      </button>
      <button
        type="submit"
        onClick={() => {
          deleteTodoList()
        }}
      >
        삭제
      </button>
    </TodoContainer>
  )
}

export default TodoDetail
