import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Login from './auth/Login'

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
const SignUpButton = styled.button`
  width: 100px;
`

function Index() {
  const navigate = useNavigate()
  const handleSignUp = () => {
    navigate('/auth/signup' + location.search)
  }
  return (
    <IndexContainer>
      <Login />
      <SignUpButtonWrap>
        <SignUpButton
          type="button"
          onClick={() => {
            handleSignUp()
          }}
        >
          회원가입하기
        </SignUpButton>
      </SignUpButtonWrap>
    </IndexContainer>
  )
}

export default Index
