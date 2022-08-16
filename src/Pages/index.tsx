import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Login from '../components/auth/Login'
import { CloseButton } from '../components/Common/ActionButton'

const IndexContainer = styled.div`
  background: #f6f6f6;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const SignUpButtonWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
`

function Index() {
  const navigate = useNavigate()
  const handleSignUp = () => {
    navigate('/auth/signup' + location.search)
  }
  const token = localStorage.getItem('token')
  const handleAutoLogin = () => {
    if (token) navigate('/todo' + location.search)
  }
  useEffect(() => {
    handleAutoLogin()
  }, [])

  return (
    <IndexContainer>
      <Login />
      <SignUpButtonWrap>
        <CloseButton
          type="button"
          onClick={() => {
            handleSignUp()
          }}
        >
          회원가입하기
        </CloseButton>
      </SignUpButtonWrap>
    </IndexContainer>
  )
}

export default Index
