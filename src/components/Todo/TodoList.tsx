import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AuthType, todosFetcher } from '../../Api/fetcher'
import { ActionButton, CloseButton } from '../Common/ActionButton'
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  background: #fff;
  border-radius: 20px;
  padding: 30px 0;
`
export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`

const SectionTitle = styled.h3`
  padding: 0;
  margin: 0;
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
  const navigate = useNavigate()
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
  const logout = () => {
    localStorage.setItem('token', '')
    navigate('/' + location.search)
  }

  useEffect(() => {
    getTodoList()
  }, [])
  return (
    <TodoContainer>
      <h1>??????</h1>
      {openCreateTodo && (
        <TodoListContainer>
          <SectionTitle>?????? ??????</SectionTitle>
          <InputWrap>
            <p>?????? </p>
            <input
              type="text"
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </InputWrap>
          <InputWrap>
            <p>?????? </p>
            <input
              type="text"
              required
              onChange={(e) => {
                setContent(e.target.value)
              }}
            />
          </InputWrap>
          <ButtonWrap>
            <CloseButton
              type="submit"
              onClick={() => {
                setOpenCreateTodo(false)
              }}
            >
              ??????
            </CloseButton>
            <ActionButton
              type="submit"
              onClick={() => {
                createToDoList()
              }}
            >
              ??????
            </ActionButton>
          </ButtonWrap>
        </TodoListContainer>
      )}
      {!openCreateTodo && (
        <ActionButton
          type="submit"
          onClick={() => {
            setOpenCreateTodo(true)
          }}
        >
          ?????? ????????????
        </ActionButton>
      )}

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
      {items.length === 0 && <div>????????? ????????????</div>}
      <CloseButton
        type="submit"
        onClick={() => {
          logout()
        }}
      >
        ????????????
      </CloseButton>
    </TodoContainer>
  )
}

export default TodoList
