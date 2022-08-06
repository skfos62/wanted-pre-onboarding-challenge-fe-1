import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { authFetcher } from '../../Api/fetcher'
import { handleDisabled } from '../../Helper/validationHelper'

const SignUpContainer = styled.div`
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

  return (
    <SignUpContainer>
      회원가입
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
        <button type="submit" disabled={handleDisabled(email, password)}>
          회원가입하기
        </button>
      </form>
    </SignUpContainer>
  )
}

export default SignUp
