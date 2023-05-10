import React from 'react'
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

const UserLayout = () => {
  return (
    <>
      <h1>Welcome you are logged in!</h1>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default UserLayout
