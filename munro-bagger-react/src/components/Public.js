import { Link } from "react-router-dom"

import React from 'react'

const Public = () => {
  return (
    <>
      <h1>public</h1>
      <Link to="/login">
        <h2>log in here</h2>
      </Link>
    </>
  )
}

export default Public
