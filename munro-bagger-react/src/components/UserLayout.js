import React from 'react'
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

const UserLayout = () => {
  return (
    <>
      <h1>LOGGING IN OR LOGGED IN</h1>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default UserLayout
