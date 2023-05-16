import React from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import { FiEdit } from 'react-icons/fi';


const User = ({ userId }) => {
  const user = useSelector(state => selectUserById(state, userId))

  const navigate = useNavigate()

  if (user) {
      const handleEdit = () => navigate(`/user/users/${userId}`)

      const userRolesString = user.role.toString().replaceAll(',', ', ')

      return (
        <tr className="border-b transition duration-300 ease-in-out hover:bg-emerald-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
            <td className="whitespace-nowrap px-6 py-4">{user.username}</td>
            <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
            <td className="whitespace-nowrap px-6 py-4">{userRolesString}</td>
            <td className="whitespace-nowrap px-6 py-4">
                <button
                    className=""
                    onClick={handleEdit}
                >
                    <FiEdit/>
                </button>
            </td>
        </tr>
      )
  } else return null
}

export default User
