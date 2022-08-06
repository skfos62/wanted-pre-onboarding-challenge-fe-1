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
const TodoDetailContainer = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  background: #fff;
  border-radius: 20px;
  padding: 30px 0;
`

const ButtonWrap = styled.div`
  display: flex;
  gap: 10px;
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
      <TodoDetailContainer>
        <h3>상세 보기</h3>
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
        <ButtonWrap>
          <button
            type="submit"
            onClick={() => {
              updateTodoList()
            }}
          >
            수정
          </button>
          {openUpdate && (
            <button
              type="submit"
              onClick={() => {
                setOpenUpdate(false)
              }}
            >
              뒤로
            </button>
          )}

          <button
            type="submit"
            onClick={() => {
              deleteTodoList()
            }}
          >
            삭제
          </button>
        </ButtonWrap>
        <button
          type="submit"
          onClick={() => {
            onCloseDetail()
          }}
        >
          닫기
        </button>
      </TodoDetailContainer>
    </TodoContainer>
  )
}

export default TodoDetail
