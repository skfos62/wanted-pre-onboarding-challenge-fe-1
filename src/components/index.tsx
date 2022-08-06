import React from 'react'
import { Link } from 'react-router-dom'

function Index() {
  return (
    <div>
      <Link to="/auth">Invoices</Link> | <Link to="/todo">로그인</Link>
    </div>
  )
}

export default Index
