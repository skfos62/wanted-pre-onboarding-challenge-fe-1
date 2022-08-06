import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { authFetcher } from '../../Api/fetcher'
import { handleDisabled } from '../../Helper/validationHelper'
import { ActionButton, CloseButton } from '../Common/ActionButton'

const SignUpContainer = styled.div`
  display: flex;
  background: #f6f6f6;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ButtonWrap = styled.div`
  display: flex;
  gap: 10px;
`

function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await authFetcher({
        method: 'post',
        url: 'users/create',
        requset: {
          email,
          password
        }
      })
      if (result) {
        navigate('/auth' + location.search)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleLogin = () => {
    navigate('/' + location.search)
  }

  return (
    <SignUpContainer>
      <h1>회원가입</h1>
      <form
        onSubmit={(e) => {
          handleSignUp(e)
        }}
      >
        <InputWrap>
          <p>email </p>
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
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </InputWrap>
        <br />
        <ButtonWrap>
          <ActionButton
            type="submit"
            disabled={handleDisabled(email, password)}
          >
            회원가입하기
          </ActionButton>
          <CloseButton
            type="submit"
            onClick={() => {
              handleLogin()
            }}
          >
            뒤로가기
          </CloseButton>
        </ButtonWrap>
      </form>
    </SignUpContainer>
  )
}

export default SignUp
