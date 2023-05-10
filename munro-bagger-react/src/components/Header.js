import React from 'react'
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="bg-emerald-600 text-slate-100 w-full flex justify-between">
      <div className="flex font-bebas">
        <Link to="/">
          <h1 className="text-4xl p-5 tracking-wide">
            ⛰ Munro Bagger
          </h1>
        </Link>
        <h5 className="tracking-wide py-5 mt-3">by shelley timmins</h5>
      </div>
      <div className="flex-col space-y-2 p-5 mt-1">
        <span className="block h-1 w-8 bg-slate-100 rounded"></span>
        <span className="block h-1 w-8 bg-slate-100 rounded"></span>
        <span className="block h-1 w-8 bg-slate-100 rounded"></span>
      </div>
    </div>
  )
}

export default Header
