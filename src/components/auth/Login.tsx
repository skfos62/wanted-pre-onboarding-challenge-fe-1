import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { authFetcher, AuthType } from '../../Api/fetcher'
import { handleDisabled } from '../../Helper/validationHelper'
import { ActionButton } from '../Common/ActionButton'

const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async () => {
    try {
      const result = await authFetcher({
        method: 'post',
        url: 'users/login',
        requset: {
          email,
          password
        }
      })
      if (result) {
        const data = result as AuthType
        navigate('/todo' + location.search)
        localStorage.setItem('token', data.token)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LoginContainer>
      <h1>Login </h1>
      <InputWrap>
        <p>id </p>
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
      </InputWrap>
      <InputWrap>
        <p>password </p>
        <input
          type="text"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </InputWrap>
      <ActionButton
        type="submit"
        onClick={handleLogin}
        disabled={handleDisabled(email, password)}
      >
        로그인 하기
      </ActionButton>
    </LoginContainer>
  )
}

export default Login
