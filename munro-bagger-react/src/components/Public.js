import { Link } from "react-router-dom"

import React from 'react'

const Public = () => {
  return (
    <>
      <h1>Public Page</h1>
      <h2>We will be adding in the munro map hereeeeee</h2>
      <Link to="/login">
        <h2>log in here</h2>
      </Link>
      <Link to="/user/users">
        <h2>user page here</h2>
      </Link>
      <Link to="/munrosbagged">
        <h2>munros page here</h2>
      </Link>
    </>
  )
}

export default Public
